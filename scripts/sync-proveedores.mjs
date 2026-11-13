/**
 * Sincroniza el catálogo de proveedores desde la API local hacia Firestore
 * (colección `proveedores_productos`).
 *
 * Uso:
 *   node scripts/sync-proveedores.mjs [--dry-run] [--prod] [--imagenes] [--docs]
 *
 *   --dry-run    Solo lee la API y muestra el resumen. No inicializa Firebase ni escribe.
 *   --prod       Escribe en Firestore de producción (usa credenciales por defecto).
 *                Sin --prod, escribe en el emulador de Firestore (127.0.0.1:8081).
 *   --imagenes   Sube las fotos de la API a Storage (proveedores/{proveedor}/{archivo}) y
 *                guarda `imagenPath` en cada documento. Sin --prod usa el emulador de
 *                Storage (127.0.0.1:9199). Con --dry-run solo cuenta cuántas subiría.
 *   --docs       Descarga los documentos del asistente a docs/proveedores/. No usa Firebase.
 *                Con --dry-run solo lista archivo y tamaño.
 *
 *   La sincronización de Firestore corre siempre; los flags --imagenes y --docs se suman.
 *
 * Variables:
 *   PROVEEDORES_API_URL  Base de la API de proveedores (por defecto http://localhost:8000).
 *
 * Nunca borra documentos: los que ya no vienen de la API se marcan con activo:false.
 */
import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);

const API_URL = process.env.PROVEEDORES_API_URL || "http://localhost:8000";
const PROJECT_ID = "gya-app-4c8a9";
const COLLECTION = "proveedores_productos";
const EMULATOR_HOST = "127.0.0.1:8081";
const BATCH_SIZE = 400;
const PAGE_SIZE = 100;
const HEALTH_TIMEOUT_MS = 5000;
const PROD_WAIT_MS = 5000;
const PLACEHOLDER_SUFFIX = "placeholder.svg";

const args = new Set(process.argv.slice(2));
const IS_PROD = args.has("--prod");
const IS_DRY_RUN = args.has("--dry-run");
const IS_IMAGES = args.has("--imagenes");
const IS_DOCS = args.has("--docs");
const STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET || "gya-app-4c8a9.firebasestorage.app";
const STORAGE_EMULATOR_HOST = "127.0.0.1:9199";
const IMAGE_CONCURRENCY = 5;
const DOCS_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "docs", "proveedores");
const CONTENT_TYPES = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};
const CAMPOS_TEXTO_DOC = ["contenido", "markdown", "texto"];

/** Inicializa firebase-admin solo cuando hace falta (nunca en --dry-run). */
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

function getBucket() {
  const admin = require("../apps/functions/node_modules/firebase-admin");
  getDb();
  return admin.storage().bucket(STORAGE_BUCKET);
}

async function checkHealth() {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), HEALTH_TIMEOUT_MS);
  try {
    const res = await fetch(`${API_URL}/salud`, { signal: controller.signal });
    if (!res.ok) return false;
    const body = await res.json();
    return body?.ok === true;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchAllProducts() {
  const items = [];
  let offset = 0;
  let total = Infinity;
  while (offset < total) {
    const res = await fetch(`${API_URL}/productos?limit=${PAGE_SIZE}&offset=${offset}`);
    if (!res.ok) throw new Error(`GET /productos offset=${offset} respondió ${res.status}`);
    const page = await res.json();
    total = Number(page.total) || 0;
    const pageItems = Array.isArray(page.items) ? page.items : [];
    if (pageItems.length === 0) break;
    items.push(...pageItems);
    offset += pageItems.length;
  }
  return items;
}

function sanitizeId(raw) {
  return String(raw)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function toDoc(item) {
  const imagen = typeof item.imagen === "string" ? item.imagen : null;
  return {
    id: sanitizeId(`${item.proveedor}_${item.cod}`),
    data: {
      apiId: item.id,
      proveedor: item.proveedor,
      tipo: item.tipo,
      cod: item.cod,
      descripcion: (item.descripcion ?? "").trim(),
      categoria: item.categoria ?? null,
      precio: item.precio ?? null,
      imagenApi: imagen && !imagen.endsWith(PLACEHOLDER_SUFFIX) ? imagen : null,
      url: item.url ?? null,
      paginas: item.paginas ?? null,
      activo: true,
      syncedAt: serverTimestamp(),
    },
  };
}

async function writeDocs(docs) {
  const db = getDb();
  const collection = db.collection(COLLECTION);
  let written = 0;
  for (let i = 0; i < docs.length; i += BATCH_SIZE) {
    const batch = db.batch();
    for (const { id, data } of docs.slice(i, i + BATCH_SIZE)) {
      batch.set(collection.doc(id), data, { merge: true });
    }
    await batch.commit();
    written += Math.min(BATCH_SIZE, docs.length - i);
  }
  return written;
}

async function deactivateMissing(currentIds) {
  const db = getDb();
  const collection = db.collection(COLLECTION);
  const snapshot = await collection.select().get();
  const stale = snapshot.docs.map((d) => d.id).filter((id) => !currentIds.has(id));
  for (let i = 0; i < stale.length; i += BATCH_SIZE) {
    const batch = db.batch();
    for (const id of stale.slice(i, i + BATCH_SIZE)) {
      batch.set(collection.doc(id), { activo: false }, { merge: true });
    }
    await batch.commit();
  }
  return stale.length;
}

function printSummary(items, docs, writtenCount, deactivatedCount) {
  const porProveedor = {};
  let sinPrecio = 0;
  let sinImagen = 0;
  let sinCategoria = 0;
  for (const { data } of docs) {
    porProveedor[data.proveedor] = (porProveedor[data.proveedor] || 0) + 1;
    if (data.precio == null) sinPrecio++;
    if (data.imagenApi == null) sinImagen++;
    if (data.categoria == null) sinCategoria++;
  }
  console.log("\n--- Resumen ---");
  console.log(`Total leído: ${items.length}`);
  console.log("Por proveedor:");
  for (const [prov, n] of Object.entries(porProveedor)) console.log(`  ${prov}: ${n}`);
  console.log(`Sin precio: ${sinPrecio}`);
  console.log(`Sin imagen: ${sinImagen}`);
  console.log(`Sin categoría: ${sinCategoria}`);
  if (writtenCount === null) {
    console.log("Escritos: 0 (dry-run)");
    console.log("Desactivados: 0 (dry-run)");
  } else {
    console.log(`Escritos: ${writtenCount}`);
    console.log(`Desactivados: ${deactivatedCount}`);
  }
}

async function uploadImages(items) {
  const conImagen = items.filter((item) => typeof item.imagen === "string" && !item.imagen.endsWith(PLACEHOLDER_SUFFIX));
  const omitidas = items.length - conImagen.length;

  if (IS_DRY_RUN) {
    console.log("\n--- Imágenes (dry-run) ---");
    console.log(`Subiría: ${conImagen.length}`);
    console.log(`Omitidas (placeholder o sin imagen): ${omitidas}`);
    return;
  }

  const collection = getDb().collection(COLLECTION);
  const bucket = getBucket();
  let subidas = 0;
  let errores = 0;

  for (let i = 0; i < conImagen.length; i += IMAGE_CONCURRENCY) {
    const lote = conImagen.slice(i, i + IMAGE_CONCURRENCY);
    const resultados = await Promise.allSettled(
      lote.map(async (item) => {
        const imagen = item.imagen;
        const nombre = path.posix.basename(imagen.split("?")[0]);
        const storagePath = `proveedores/${item.proveedor}/${nombre}`;
        const res = await fetch(`${API_URL}${imagen}`);
        if (!res.ok) throw new Error(`GET ${imagen} respondió ${res.status}`);
        const buffer = Buffer.from(await res.arrayBuffer());
        const contentType = CONTENT_TYPES[path.posix.extname(nombre).toLowerCase()] || "application/octet-stream";
        await bucket.file(storagePath).save(buffer, { contentType, resumable: false });
        const docId = sanitizeId(`${item.proveedor}_${item.cod}`);
        await collection.doc(docId).set({ imagenPath: storagePath }, { merge: true });
      }),
    );
    for (const [idx, r] of resultados.entries()) {
      if (r.status === "fulfilled") {
        subidas++;
      } else {
        errores++;
        console.error(`Error con ${lote[idx].imagen}: ${r.reason?.message ?? r.reason}`);
      }
    }
  }

  console.log("\n--- Imágenes ---");
  console.log(`Subidas: ${subidas}`);
  console.log(`Omitidas (placeholder o sin imagen): ${omitidas}`);
  console.log(`Errores: ${errores}`);
}

function extraerTextoDoc(cuerpo) {
  if (cuerpo.trimStart().startsWith("{")) {
    try {
      const obj = JSON.parse(cuerpo);
      const campo = CAMPOS_TEXTO_DOC.find((c) => typeof obj[c] === "string");
      if (campo) return obj[campo];
    } catch {
      // No es JSON válido: se guarda el texto tal cual.
    }
  }
  return cuerpo;
}

async function refreshKnowledgeDocs() {
  const res = await fetch(`${API_URL}/asistente/documentos`);
  if (!res.ok) throw new Error(`GET /asistente/documentos respondió ${res.status}`);
  const documentos = await res.json();
  if (!Array.isArray(documentos)) throw new Error("/asistente/documentos no devolvió una lista");

  console.log("\n--- Documentos del asistente ---");
  if (IS_DRY_RUN) {
    for (const d of documentos) console.log(`  ${d.archivo} (${d.tamano_kb} KB)`);
    console.log(`Total: ${documentos.length} (dry-run, no se escribió nada)`);
    return;
  }

  await mkdir(DOCS_DIR, { recursive: true });
  for (const d of documentos) {
    const docRes = await fetch(`${API_URL}${d.url_descarga}`);
    if (!docRes.ok) throw new Error(`GET ${d.url_descarga} respondió ${docRes.status}`);
    const texto = extraerTextoDoc(await docRes.text());
    const nombre = path.basename(d.archivo);
    await writeFile(path.join(DOCS_DIR, nombre), texto, "utf8");
    console.log(`  ${nombre}`);
  }
  console.log(`Escritos: ${documentos.length} en ${DOCS_DIR}`);
}

async function main() {
  if (IS_PROD) {
    console.log("Destino: PRODUCCION");
    console.log(`Esperando ${PROD_WAIT_MS / 1000} s antes de continuar (Ctrl+C para cancelar)...`);
    await new Promise((r) => setTimeout(r, PROD_WAIT_MS));
  } else {
    process.env.FIRESTORE_EMULATOR_HOST = EMULATOR_HOST;
    if (IS_IMAGES) process.env.FIREBASE_STORAGE_EMULATOR_HOST = STORAGE_EMULATOR_HOST;
    console.log("Destino: emulador");
  }

  const healthy = await checkHealth();
  if (!healthy) {
    console.log("La API de proveedores está apagada. No se cambió nada.");
    process.exit(0);
  }

  const items = await fetchAllProducts();
  const docs = items.map(toDoc);

  if (IS_DRY_RUN) {
    printSummary(items, docs, null, null);
  } else {
    const writtenCount = await writeDocs(docs);
    const currentIds = new Set(docs.map((d) => d.id));
    const deactivatedCount = await deactivateMissing(currentIds);
    printSummary(items, docs, writtenCount, deactivatedCount);
  }

  if (IS_IMAGES) await uploadImages(items);
  if (IS_DOCS) await refreshKnowledgeDocs();
}

main().catch((err) => {
  console.error("Error en la sincronización:", err);
  process.exit(1);
});
