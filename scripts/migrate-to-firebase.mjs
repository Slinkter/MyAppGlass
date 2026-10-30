#!/usr/bin/env node
/**
 * Migración única de servicios y proyectos a Firebase.
 * - Sube cada imagen local (apps/web/public/images/...) a Storage:
 *   {services|projects}/{id}/cover.<ext> y {services|projects}/{id}/gallery/<archivo>.
 * - Escribe cada documento en Firestore (/services, /projects) con las URLs de Storage.
 *
 * Uso:
 *   node scripts/migrate-to-firebase.mjs --seed <seed.json> --target emulator
 *   node scripts/migrate-to-firebase.mjs --seed <seed.json> --target production
 *
 * `seed.json` = { services: CreateServiceInput[], projects: CreateProjectInput[] } con rutas
 * locales `/images/...` (salida de buildServiceSeedData/buildProjectSeedData).
 * En producción usa la sesión de `firebase login` (dueño del proyecto: omite las reglas).
 * Es idempotente: vuelve a subir y sobrescribir los mismos objetos y documentos.
 *
 * Ejecutado en producción el 2026-10-30 (10 servicios, 14 proyectos, 137 imágenes).
 * Después se borraron los datos e imágenes locales: para repetirlo hay que restaurar
 * `apps/web/public/images` y `features/admin/seed/seedData.ts` desde el historial de git.
 */
import { readFileSync, existsSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);
const { getFirebaseCliAccessToken } = require("./firebase-token.cjs");

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith("--") ? [...acc, [a.slice(2), all[i + 1]]] : acc), [])
);
const TARGET = args.target ?? "emulator";
const SEED = args.seed;
if (!SEED || !["emulator", "production"].includes(TARGET)) {
  console.error("Uso: --seed <seed.json> --target emulator|production");
  process.exit(1);
}

const PROJECT = "gya-app-4c8a9";
const BUCKET = "gya-app-4c8a9.firebasestorage.app";
const PUBLIC_DIR = path.resolve(import.meta.dirname, "../apps/web/public");
const isEmu = TARGET === "emulator";

const FIRESTORE = isEmu
  ? `http://127.0.0.1:8081/v1/projects/${PROJECT}/databases/(default)/documents`
  : `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;
const STORAGE_PUBLIC = isEmu ? "http://127.0.0.1:9199" : "https://firebasestorage.googleapis.com";

const token = isEmu ? "owner" : await getFirebaseCliAccessToken();
const authHeader = { Authorization: `Bearer ${token}` };

const CONTENT_TYPES = { ".webp": "image/webp", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml" };

const downloadUrl = (objectPath, dlToken) =>
  `${STORAGE_PUBLIC}/v0/b/${BUCKET}/o/${encodeURIComponent(objectPath)}?alt=media&token=${dlToken}`;

/** Sube un archivo y devuelve su URL de descarga pública (con token). */
async function upload(localUrl, objectPath) {
  const file = path.join(PUBLIC_DIR, localUrl);
  if (!existsSync(file)) throw new Error(`No existe ${file}`);
  const body = readFileSync(file);
  const contentType = CONTENT_TYPES[path.extname(file).toLowerCase()] ?? "application/octet-stream";
  const dlToken = randomUUID();

  if (isEmu) {
    const r = await fetch(`${STORAGE_PUBLIC}/v0/b/${BUCKET}/o?name=${encodeURIComponent(objectPath)}`, {
      method: "POST",
      headers: { ...authHeader, "Content-Type": contentType },
      body,
    });
    if (!r.ok) throw new Error(`Storage ${r.status} ${objectPath}: ${await r.text()}`);
    const meta = await r.json();
    return downloadUrl(objectPath, meta.downloadTokens ?? dlToken);
  }

  // GCS JSON API (multipart) con el token de descarga que usa Firebase.
  const boundary = `gya-${randomUUID()}`;
  const metadata = { name: objectPath, contentType, cacheControl: "public, max-age=31536000", metadata: { firebaseStorageDownloadTokens: dlToken } };
  const multipart = Buffer.concat([
    Buffer.from(`--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n--${boundary}\r\nContent-Type: ${contentType}\r\n\r\n`),
    body,
    Buffer.from(`\r\n--${boundary}--`),
  ]);
  const r = await fetch(`https://storage.googleapis.com/upload/storage/v1/b/${BUCKET}/o?uploadType=multipart`, {
    method: "POST",
    headers: { ...authHeader, "Content-Type": `multipart/related; boundary=${boundary}` },
    body: multipart,
  });
  if (!r.ok) throw new Error(`Storage ${r.status} ${objectPath}: ${await r.text()}`);
  return downloadUrl(objectPath, dlToken);
}

const toValue = (v) => {
  if (v === null || v === undefined) return { nullValue: null };
  if (typeof v === "string") return { stringValue: v };
  if (typeof v === "boolean") return { booleanValue: v };
  if (typeof v === "number") return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  if (v instanceof Date) return { timestampValue: v.toISOString() };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(toValue) } };
  return { mapValue: { fields: toFields(v) } };
};
const toFields = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined).map(([k, v]) => [k, toValue(v)]));

async function writeDoc(collection, id, data) {
  const r = await fetch(`${FIRESTORE}/${collection}/${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { ...authHeader, "Content-Type": "application/json" },
    body: JSON.stringify({ fields: toFields(data) }),
  });
  if (!r.ok) throw new Error(`Firestore ${r.status} ${collection}/${id}: ${await r.text()}`);
}

/** Sube portada y galería de una entidad, reutilizando subidas repetidas. */
async function migrateEntity(collection, entity, galleryKeyFields) {
  const cache = new Map();
  const put = async (localUrl, objectPath) => {
    if (!localUrl?.startsWith("/images/")) return localUrl; // ya remota
    const key = `${objectPath}|${localUrl}`;
    if (!cache.has(key)) cache.set(key, await upload(localUrl, objectPath));
    return cache.get(key);
  };

  const ext = path.extname(entity.coverImage);
  const coverImage = await put(entity.coverImage, `${collection}/${entity.id}/cover${ext}`);
  const gallery = [];
  for (const item of entity.gallery ?? []) {
    const url = await put(item.url, `${collection}/${entity.id}/gallery/${path.basename(item.url)}`);
    gallery.push({ ...Object.fromEntries(galleryKeyFields.map((k) => [k, item[k]])), url });
  }
  const now = new Date();
  await writeDoc(collection, entity.id, { ...entity, coverImage, gallery, createdAt: now, updatedAt: now });
  return 1 + gallery.length;
}

const seed = JSON.parse(readFileSync(SEED, "utf-8"));
let files = 0;
console.log(`Destino: ${TARGET} (${PROJECT})`);
for (const s of seed.services) {
  files += await migrateEntity("services", s, ["id", "alt", "system"]);
  console.log(`  servicio ${s.id}: ${s.gallery.length} fotos`);
}
for (const p of seed.projects) {
  files += await migrateEntity("projects", p, ["id", "caption"]);
  console.log(`  proyecto ${p.id}: ${p.gallery.length} fotos`);
}
console.log(`Listo: ${seed.services.length} servicios, ${seed.projects.length} proyectos, ${files} imágenes enlazadas.`);
