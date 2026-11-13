/**
 * Migra los posts semilla de `apps/web/src/features/blog/data/blog-posts.ts` y los
 * artículos nuevos de `docs/contenido/blog/articulos-nuevos.json` hacia Firestore
 * (colección `blogPosts`).
 *
 * Uso:
 *   node scripts/migrate-blog-to-firestore.mjs [--dry-run] [--apply] [--prod]
 *
 *   --dry-run   Modo por defecto. No escribe nada; imprime la tabla diff por slug.
 *               Si no hay emulador activo (o si se pasa --prod), lee vía REST público
 *               de Firestore (solo lectura) para calcular el diff.
 *   --apply     Escribe los documentos nuevos en Firestore y genera backup previo en
 *               `docs/proveedores/backup-blog-YYYYMMDD.json`.
 *   --prod      Apunta a Firestore de producción (`gya-app-4c8a9`).
 *               Sin --prod, apunta al emulador (`FIRESTORE_EMULATOR_HOST` o `127.0.0.1:8081`).
 *
 * Reglas:
 *   - Idempotente por `slug`: si el slug ya existe en Firestore (como ID o campo `slug`),
 *     NO sobrescribe (`OMITIR`).
 */
import { createRequire } from "node:module";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const require = createRequire(import.meta.url);

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SEED_TS_PATH = path.join(ROOT_DIR, "apps", "web", "src", "features", "blog", "data", "blog-posts.ts");
const NEW_POSTS_JSON_PATH = path.join(ROOT_DIR, "docs", "contenido", "blog", "articulos-nuevos.json");
const BACKUP_DIR = path.join(ROOT_DIR, "docs", "proveedores");

const PROJECT_ID = "gya-app-4c8a9";
const COLLECTION = "blogPosts";
const DEFAULT_EMULATOR_HOST = "127.0.0.1:8081";
const PROD_WAIT_MS = 5000;
const REST_TIMEOUT_MS = 3000;

function parseCliArgs(argv) {
  let hasApply = false;
  let hasDryRun = false;
  let isProd = false;

  for (const arg of argv) {
    if (arg === "--apply") hasApply = true;
    else if (arg === "--dry-run") hasDryRun = true;
    else if (arg === "--prod") isProd = true;
    else if (arg === "--help" || arg === "-h") {
      printUsage();
      process.exit(0);
    } else {
      throw new Error(`Argumento no reconocido: ${arg}`);
    }
  }

  const isDryRun = hasDryRun || !hasApply;
  return { isDryRun, isApply: !isDryRun, isProd };
}

function printUsage() {
  console.log("Uso: node scripts/migrate-blog-to-firestore.mjs [--dry-run] [--apply] [--prod]");
}

/** Inicializa firebase-admin solo cuando hace falta escribir (nunca en --dry-run). */
let dbCache = null;
function getDb() {
  if (dbCache) return dbCache;
  const admin = require("../apps/functions/node_modules/firebase-admin");
  if (!admin.apps.length) {
    admin.initializeApp({ projectId: PROJECT_ID });
  }
  dbCache = admin.firestore();
  return dbCache;
}

function serverTimestamp() {
  const admin = require("../apps/functions/node_modules/firebase-admin");
  return admin.firestore.FieldValue.serverTimestamp();
}

function fromFirestoreValue(val) {
  if (!val || typeof val !== "object") return null;
  if ("stringValue" in val) return val.stringValue;
  if ("integerValue" in val) return Number(val.integerValue);
  if ("doubleValue" in val) return Number(val.doubleValue);
  if ("booleanValue" in val) return Boolean(val.booleanValue);
  if ("nullValue" in val) return null;
  if ("timestampValue" in val) return val.timestampValue;
  if ("arrayValue" in val) {
    const items = Array.isArray(val.arrayValue?.values) ? val.arrayValue.values : [];
    return items.map(fromFirestoreValue);
  }
  if ("mapValue" in val) {
    const out = {};
    const fields = val.mapValue?.fields || {};
    for (const [k, v] of Object.entries(fields)) {
      out[k] = fromFirestoreValue(v);
    }
    return out;
  }
  return null;
}

function decodeRestDocument(doc) {
  const id = doc.name.split("/").pop();
  const data = {};
  for (const [k, v] of Object.entries(doc.fields || {})) {
    data[k] = fromFirestoreValue(v);
  }
  return { id, data };
}

async function fetchPostsViaRest(baseUrl, timeoutMs = 10000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const url = `${baseUrl}/v1/projects/${PROJECT_ID}/databases/(default)/documents/${COLLECTION}?pageSize=300`;
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) {
      throw new Error(`REST ${url} respondió ${res.status}`);
    }
    const body = await res.json();
    const docs = Array.isArray(body.documents) ? body.documents : [];
    const map = new Map();
    for (const doc of docs) {
      const { id, data } = decodeRestDocument(doc);
      map.set(id, data);
    }
    return map;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchExistingPosts({ isDryRun, isProd, emulatorHost }) {
  if (!isDryRun) {
    const db = getDb();
    const snapshot = await db.collection(COLLECTION).get();
    const map = new Map();
    for (const doc of snapshot.docs) {
      map.set(doc.id, doc.data());
    }
    return {
      existingMap: map,
      sourceLabel: isProd ? "producción (Admin SDK)" : `emulador (${emulatorHost})`,
    };
  }

  if (isProd) {
    const map = await fetchPostsViaRest("https://firestore.googleapis.com");
    return { existingMap: map, sourceLabel: "producción (REST público)" };
  }

  try {
    const map = await fetchPostsViaRest(`http://${emulatorHost}`, REST_TIMEOUT_MS);
    return { existingMap: map, sourceLabel: `emulador (${emulatorHost})` };
  } catch {
    console.log(
      `[aviso] Emulador no disponible en ${emulatorHost}; intentando lectura en Firestore público vía REST para calcular el diff.`,
    );
    try {
      const map = await fetchPostsViaRest("https://firestore.googleapis.com");
      return { existingMap: map, sourceLabel: "producción (REST público, fallback)" };
    } catch (err) {
      console.log(
        `[aviso] No se pudo leer Firestore público vía REST (${err.message}); calculando diff asumiendo colección vacía.`,
      );
      return { existingMap: new Map(), sourceLabel: "sin conexión / 403 (simulación local)" };
    }
  }
}

async function loadSeedPostsFromTs() {
  const raw = await readFile(SEED_TS_PATH, "utf8");
  const startMatch = raw.match(/const\s+BLOG_POSTS(?:\s*:\s*BlogPost\[\])?\s*=\s*\[/);
  const endIndex = raw.lastIndexOf("export default BLOG_POSTS");
  if (!startMatch || startMatch.index === undefined || endIndex === -1) {
    throw new Error(`No se pudo extraer BLOG_POSTS de ${SEED_TS_PATH}`);
  }
  const arrayLiteralStart = startMatch.index + startMatch[0].length - 1;
  let snippet = raw.slice(arrayLiteralStart, endIndex).trim();
  if (snippet.endsWith(";")) snippet = snippet.slice(0, -1);

  const posts = vm.runInNewContext(`(${snippet})`, {}, { timeout: 1000 });
  if (!Array.isArray(posts)) {
    throw new Error("BLOG_POSTS no evaluó a un arreglo.");
  }
  return posts.map((post) => ({ ...post, _source: "semilla" }));
}

async function loadNewPostsFromJson() {
  const raw = await readFile(NEW_POSTS_JSON_PATH, "utf8");
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) {
    throw new Error(`${NEW_POSTS_JSON_PATH} debe contener un arreglo JSON.`);
  }
  return parsed.map((post) => ({ ...post, _source: "nuevo" }));
}

function buildExistingSlugSet(existingMap) {
  const slugs = new Set();
  for (const [docId, data] of existingMap.entries()) {
    slugs.add(docId);
    if (typeof data?.slug === "string" && data.slug) {
      slugs.add(data.slug);
    }
  }
  return slugs;
}

function buildPostPayload(post) {
  const payload = {
    id: post.slug,
    slug: post.slug,
    title: post.title,
    description: post.description,
    excerpt: post.excerpt,
    date: post.date,
    author: post.author,
    image: post.image,
    content: post.content,
    tags: Array.isArray(post.tags) ? post.tags : [],
    published: typeof post.published === "boolean" ? post.published : true,
  };
  if (typeof post.imageAlt === "string" && post.imageAlt.trim()) {
    payload.imageAlt = post.imageAlt.trim();
  }
  return payload;
}

function printDiffTable(rows) {
  console.log("\n=== Tabla Diff (Migración Blog -> Firestore) ===");
  const header = `${"#".padEnd(3)} | ${"Origen".padEnd(8)} | ${"Slug".padEnd(54)} | ${"Acción".padEnd(8)} | Detalle`;
  console.log(header);
  console.log("-".repeat(115));
  rows.forEach((row, idx) => {
    const num = String(idx + 1).padStart(2, " ").padEnd(3);
    const source = row.source.padEnd(8);
    const slug = row.slug.padEnd(54);
    const action = row.action.padEnd(8);
    const detail =
      row.action === "CREAR"
        ? `Nuevo doc (${row.payload.date}, published: ${row.payload.published})`
        : "Ya existe en Firestore (no sobrescribe)";
    console.log(`${num} | ${source} | ${slug} | ${action} | ${detail}`);
  });
}

function formatBackupDate(date = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
}

async function writeBackup(existingMap, allPosts) {
  await mkdir(BACKUP_DIR, { recursive: true });
  const stamp = formatBackupDate();
  const backupPath = path.join(BACKUP_DIR, `backup-blog-${stamp}.json`);
  const existingDocs = {};
  for (const [id, data] of [...existingMap.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    existingDocs[id] = data;
  }
  const payload = {
    exportedAt: new Date().toISOString(),
    projectId: PROJECT_ID,
    collection: COLLECTION,
    existingCount: existingMap.size,
    sourceSlugs: allPosts.map((p) => p.slug),
    existingDocuments: existingDocs,
  };
  await writeFile(backupPath, JSON.stringify(payload, null, 2), "utf8");
  return backupPath;
}

async function applyChanges(rows) {
  const db = getDb();
  const collection = db.collection(COLLECTION);
  const ts = serverTimestamp();
  let created = 0;

  for (const row of rows) {
    if (row.action !== "CREAR") continue;
    await collection.doc(row.slug).set(
      {
        ...row.payload,
        createdAt: ts,
        updatedAt: ts,
      },
      { merge: false },
    );
    created++;
  }

  return { created };
}

async function main() {
  const { isDryRun, isApply, isProd } = parseCliArgs(process.argv.slice(2));
  const emulatorHost = process.env.FIRESTORE_EMULATOR_HOST || DEFAULT_EMULATOR_HOST;

  if (!isProd && isApply) {
    process.env.FIRESTORE_EMULATOR_HOST = emulatorHost;
  }

  console.log(`Modo: ${isDryRun ? "DRY-RUN (solo lectura)" : "APPLY (escritura)"}`);
  console.log(`Destino: ${isProd ? "PRODUCCIÓN" : `emulador (${emulatorHost})`}`);

  const seedPosts = await loadSeedPostsFromTs();
  const newPosts = await loadNewPostsFromJson();
  const allPosts = [...seedPosts, ...newPosts];

  const seenSlugs = new Set();
  for (const post of allPosts) {
    if (!post.slug) throw new Error("Se encontró un post sin slug.");
    if (seenSlugs.has(post.slug)) {
      throw new Error(`Slug duplicado en fuentes locales: ${post.slug}`);
    }
    seenSlugs.add(post.slug);
  }

  if (isApply && isProd) {
    console.log(
      `Esperando ${PROD_WAIT_MS / 1000} s antes de leer/escribir en PRODUCCIÓN (Ctrl+C para cancelar)...`,
    );
    await new Promise((r) => setTimeout(r, PROD_WAIT_MS));
  }

  const { existingMap, sourceLabel } = await fetchExistingPosts({ isDryRun, isProd, emulatorHost });
  console.log(`Fuente leída: ${sourceLabel} (${existingMap.size} documentos existentes)`);

  const existingSlugs = buildExistingSlugSet(existingMap);
  const rows = allPosts.map((post) => {
    const exists = existingSlugs.has(post.slug);
    return {
      slug: post.slug,
      source: post._source,
      action: exists ? "OMITIR" : "CREAR",
      payload: buildPostPayload(post),
    };
  });

  printDiffTable(rows);

  const toCreate = rows.filter((r) => r.action === "CREAR").length;
  const omitted = rows.filter((r) => r.action === "OMITIR").length;

  let backupPath = null;
  let created = 0;

  if (isApply) {
    backupPath = await writeBackup(existingMap, allPosts);
    const result = await applyChanges(rows);
    created = result.created;
  }

  console.log("\n=== Resumen ===");
  console.log(`Leídos (semilla TS): ${seedPosts.length}`);
  console.log(`Leídos (nuevos JSON): ${newPosts.length}`);
  console.log(`Total fuentes: ${allPosts.length}`);
  if (isDryRun) {
    console.log(`Creados: 0 (dry-run; ${toCreate} por crear)`);
    console.log(`Omitidos (ya existentes): ${omitted}`);
    console.log("Backup: (no generado en dry-run)");
  } else {
    console.log(`Creados: ${created}`);
    console.log(`Omitidos (ya existentes): ${omitted}`);
    console.log(`Backup: ${backupPath}`);
  }
}

main().catch((err) => {
  console.error("[error]", err?.message || err);
  process.exit(1);
});
