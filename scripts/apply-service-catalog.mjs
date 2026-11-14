/**
 * Aplica el catálogo oficial de 13 servicios desde `docs/contenido/servicios/*.json`
 * hacia Firestore (colección `services`).
 *
 * Uso:
 *   node scripts/apply-service-catalog.mjs [--dry-run] [--apply] [--only=slug1,slug2] [--prod]
 *
 *   --dry-run            Modo por defecto. No escribe nada; imprime la tabla diff por servicio.
 *                        Si no hay emulador activo (o si se pasa --prod), lee vía REST público
 *                        de Firestore (solo lectura) para calcular el diff.
 *   --apply              Escribe los cambios en Firestore y genera un backup previo en
 *                        `docs/proveedores/backup-services-YYYYMMDD-HHmm.json`.
 *   --only=slug1,slug2   Limita el alcance a los slugs indicados (separados por coma).
 *   --prod               Apunta a Firestore de producción (`gya-app-4c8a9`).
 *                        Sin --prod, apunta al emulador (`FIRESTORE_EMULATOR_HOST` o `127.0.0.1:8081`).
 *
 * Reglas de escritura:
 *   - Solo actualiza (merge) los campos permitidos:
 *     title, shortDescription, fullDescription, specs, features, benefits,
 *     systemSheets, faqs, order, category.
 *   - Nunca toca en documentos existentes: coverImage, gallery, published, createdAt, slug.
 *   - Si un servicio nuevo no existe (espejos, frenos-hidraulicos, mantenimiento), lo crea
 *     con `published: true`, `gallery: []` y `coverImage: "/images/services/{slug}-placeholder.webp"`.
 */
import { createRequire } from "node:module";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SERVICES_DIR = path.join(ROOT_DIR, "docs", "contenido", "servicios");
const BACKUP_DIR = path.join(ROOT_DIR, "docs", "proveedores");

const PROJECT_ID = "gya-app-4c8a9";
const COLLECTION = "services";
const DEFAULT_EMULATOR_HOST = "127.0.0.1:8081";
const PROD_WAIT_MS = 5000;
const REST_TIMEOUT_MS = 3000;

const OFFICIAL_ORDER = [
  "ventana",
  "mampara",
  "ducha",
  "pvidrio",
  "pserie",
  "parapeto",
  "baranda",
  "balcones",
  "techo",
  "celosias",
  "espejos",
  "frenos-hidraulicos",
  "mantenimiento",
];

const ORDER_BY_SLUG = Object.fromEntries(OFFICIAL_ORDER.map((slug, idx) => [slug, idx + 1]));

const DEFAULT_CATEGORIES = {
  ventana: "Aluminio",
  mampara: "Vidrio",
  ducha: "Vidrio",
  pvidrio: "Vidrio",
  pserie: "Aluminio",
  parapeto: "Vidrio",
  baranda: "Vidrio",
  balcones: "Cerramientos",
  techo: "Cerramientos",
  celosias: "Aluminio",
  espejos: "Vidrio procesado",
  "frenos-hidraulicos": "Herrajes y calibración",
  mantenimiento: "Servicio técnico",
};

const NEW_SERVICE_SLUGS = new Set(["espejos", "frenos-hidraulicos", "mantenimiento"]);

const ALLOWED_FIELDS = [
  "title",
  "seoTitle",
  "shortDescription",
  "fullDescription",
  "specs",
  "features",
  "benefits",
  "systemSheets",
  "faqs",
  "order",
  "category",
];

function parseCliArgs(argv) {
  let hasApply = false;
  let hasDryRun = false;
  let isProd = false;
  let only = null;

  for (const arg of argv) {
    if (arg === "--apply") hasApply = true;
    else if (arg === "--dry-run") hasDryRun = true;
    else if (arg === "--prod") isProd = true;
    else if (arg.startsWith("--only=")) {
      const raw = arg.slice("--only=".length).trim();
      only = raw
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (arg === "--help" || arg === "-h") {
      printUsage();
      process.exit(0);
    } else {
      throw new Error(`Argumento no reconocido: ${arg}`);
    }
  }

  // --dry-run es el modo por defecto; si se pasan ambos, gana --dry-run por seguridad.
  const isDryRun = hasDryRun || !hasApply;

  if (only !== null) {
    if (only.length === 0) throw new Error("--only requiere al menos un slug.");
    const unknown = only.filter((s) => !ORDER_BY_SLUG[s]);
    if (unknown.length > 0) {
      throw new Error(`Slugs desconocidos en --only: ${unknown.join(", ")}`);
    }
  }

  return { isDryRun, isApply: !isDryRun, isProd, only: only ? new Set(only) : null };
}

function printUsage() {
  console.log(
    "Uso: node scripts/apply-service-catalog.mjs [--dry-run] [--apply] [--only=slug1,slug2] [--prod]",
  );
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

async function fetchServicesViaRest(baseUrl, timeoutMs = 10000) {
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

async function fetchExistingServices({ isDryRun, isProd, emulatorHost }) {
  if (!isDryRun) {
    const db = getDb();
    const snapshot = await db.collection(COLLECTION).get();
    const map = new Map();
    for (const doc of snapshot.docs) {
      map.set(doc.id, doc.data());
    }
    return { existingMap: map, sourceLabel: isProd ? "producción (Admin SDK)" : `emulador (${emulatorHost})` };
  }

  if (isProd) {
    const map = await fetchServicesViaRest("https://firestore.googleapis.com");
    return { existingMap: map, sourceLabel: "producción (REST público)" };
  }

  try {
    const map = await fetchServicesViaRest(`http://${emulatorHost}`, REST_TIMEOUT_MS);
    return { existingMap: map, sourceLabel: `emulador (${emulatorHost})` };
  } catch {
    console.log(
      `[aviso] Emulador no disponible en ${emulatorHost}; leyendo Firestore público (solo lectura) vía REST para calcular el diff.`,
    );
    const map = await fetchServicesViaRest("https://firestore.googleapis.com");
    return { existingMap: map, sourceLabel: "producción (REST público, fallback)" };
  }
}

async function loadCatalogJsonFiles() {
  const entries = [];
  for (const slug of OFFICIAL_ORDER) {
    const filePath = path.join(SERVICES_DIR, `${slug}.json`);
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw);
    if (parsed.slug && parsed.slug !== slug) {
      throw new Error(`El archivo ${slug}.json tiene slug="${parsed.slug}"`);
    }
    entries.push({ slug, raw: parsed });
  }
  return entries;
}

function buildAllowedPayload(slug, rawJson, existingDoc) {
  const category = rawJson.category ?? existingDoc?.category ?? DEFAULT_CATEGORIES[slug];
  const seoTitle = rawJson.seoTitle ?? existingDoc?.seoTitle ?? `${rawJson.title} | GYA`;
  return {
    title: rawJson.title,
    seoTitle,
    shortDescription: rawJson.shortDescription,
    fullDescription: rawJson.fullDescription,
    specs: Array.isArray(rawJson.specs) ? rawJson.specs : [],
    features: Array.isArray(rawJson.features) ? rawJson.features : [],
    benefits: Array.isArray(rawJson.benefits) ? rawJson.benefits : [],
    systemSheets: Array.isArray(rawJson.systemSheets) ? rawJson.systemSheets : [],
    faqs: Array.isArray(rawJson.faqs) ? rawJson.faqs : [],
    order: ORDER_BY_SLUG[slug],
    category,
  };
}

function isDeepEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;
  if (Array.isArray(a)) {
    if (!Array.isArray(b) || a.length !== b.length) return false;
    return a.every((item, i) => isDeepEqual(item, b[i]));
  }
  if (typeof a === "object") {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every((k) => Object.prototype.hasOwnProperty.call(b, k) && isDeepEqual(a[k], b[k]));
  }
  return false;
}

function formatFieldDiff(field, prev, next) {
  if (field === "order") return `order(${prev ?? "-"}->${next})`;
  if (Array.isArray(next)) {
    const prevLen = Array.isArray(prev) ? prev.length : 0;
    return `${field}(${prevLen}->${next.length})`;
  }
  return field;
}

function computeDiff(slug, payload, existingDoc) {
  if (!existingDoc) {
    if (!NEW_SERVICE_SLUGS.has(slug)) {
      return { action: "OMITIR", reason: "No existe en Firestore y no es uno de los 3 nuevos", changedFields: [] };
    }
    return {
      action: "CREAR",
      changedFields: [...ALLOWED_FIELDS, "slug", "published", "coverImage", "gallery"],
    };
  }

  const changedFields = [];
  for (const field of ALLOWED_FIELDS) {
    if (!isDeepEqual(existingDoc[field], payload[field])) {
      changedFields.push(formatFieldDiff(field, existingDoc[field], payload[field]));
    }
  }

  if (changedFields.length === 0) {
    return { action: "SIN_CAMBIOS", changedFields: [] };
  }
  return { action: "ACTUALIZAR", changedFields };
}

function printDiffTable(rows) {
  console.log("\n=== Tabla Diff (Catálogo 13 Servicios) ===");
  const header = `${"Ord".padEnd(4)} | ${"Slug".padEnd(20)} | ${"Acción".padEnd(12)} | Cambios`;
  console.log(header);
  console.log("-".repeat(90));
  for (const row of rows) {
    const ord = String(row.order).padStart(2, " ").padEnd(4);
    const slug = row.slug.padEnd(20);
    const action = row.action.padEnd(12);
    const details =
      row.action === "CREAR"
        ? `Nuevo doc (published: true, coverImage: /images/services/${row.slug}-placeholder.webp)`
        : row.action === "SIN_CAMBIOS"
          ? "(sin diferencias)"
          : row.action === "OMITIR"
            ? row.reason || "(omitido)"
            : row.changedFields.join(", ");
    console.log(`${ord} | ${slug} | ${action} | ${details}`);
  }
}

function formatBackupTimestamp(date = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  return (
    `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-` +
    `${pad(date.getHours())}${pad(date.getMinutes())}`
  );
}

async function writeBackup(existingMap) {
  await mkdir(BACKUP_DIR, { recursive: true });
  const stamp = formatBackupTimestamp();
  const backupPath = path.join(BACKUP_DIR, `backup-services-${stamp}.json`);
  const docs = {};
  for (const [id, data] of [...existingMap.entries()].sort(([a], [b]) => a.localeCompare(b))) {
    docs[id] = data;
  }
  const payload = {
    exportedAt: new Date().toISOString(),
    projectId: PROJECT_ID,
    collection: COLLECTION,
    count: existingMap.size,
    documents: docs,
  };
  await writeFile(backupPath, JSON.stringify(payload, null, 2), "utf8");
  return backupPath;
}

async function applyChanges(rows) {
  const db = getDb();
  const collection = db.collection(COLLECTION);
  const ts = serverTimestamp();
  let updated = 0;
  let created = 0;

  for (const row of rows) {
    if (row.action === "ACTUALIZAR") {
      await collection.doc(row.slug).set(
        {
          ...row.payload,
          updatedAt: ts,
        },
        { merge: true },
      );
      updated++;
    } else if (row.action === "CREAR") {
      await collection.doc(row.slug).set(
        {
          slug: row.slug,
          ...row.payload,
          published: true,
          coverImage: `/images/services/${row.slug}-placeholder.webp`,
          gallery: [],
          createdAt: ts,
          updatedAt: ts,
        },
        { merge: true },
      );
      created++;
    }
  }

  return { updated, created };
}

async function main() {
  const { isDryRun, isApply, isProd, only } = parseCliArgs(process.argv.slice(2));
  const emulatorHost = process.env.FIRESTORE_EMULATOR_HOST || DEFAULT_EMULATOR_HOST;

  if (!isProd && isApply) {
    process.env.FIRESTORE_EMULATOR_HOST = emulatorHost;
  }

  console.log(`Modo: ${isDryRun ? "DRY-RUN (solo lectura)" : "APPLY (escritura)"}`);
  console.log(`Destino: ${isProd ? "PRODUCCIÓN" : `emulador (${emulatorHost})`}`);
  if (only) console.log(`Filtro --only: ${[...only].join(", ")}`);

  const catalogEntries = await loadCatalogJsonFiles();
  const selectedEntries = only ? catalogEntries.filter((e) => only.has(e.slug)) : catalogEntries;

  if (isApply && isProd) {
    console.log(`Esperando ${PROD_WAIT_MS / 1000} s antes de leer/escribir en PRODUCCIÓN (Ctrl+C para cancelar)...`);
    await new Promise((r) => setTimeout(r, PROD_WAIT_MS));
  }

  const { existingMap, sourceLabel } = await fetchExistingServices({ isDryRun, isProd, emulatorHost });
  console.log(`Fuente leída: ${sourceLabel} (${existingMap.size} documentos existentes)`);

  const rows = selectedEntries.map(({ slug, raw }) => {
    const existingDoc = existingMap.get(slug) ?? null;
    const payload = buildAllowedPayload(slug, raw, existingDoc);
    const diff = computeDiff(slug, payload, existingDoc);
    return {
      order: ORDER_BY_SLUG[slug],
      slug,
      payload,
      ...diff,
    };
  });

  printDiffTable(rows);

  const toUpdate = rows.filter((r) => r.action === "ACTUALIZAR").length;
  const toCreate = rows.filter((r) => r.action === "CREAR").length;
  const skippedByNoChanges = rows.filter((r) => r.action === "SIN_CAMBIOS" || r.action === "OMITIR").length;
  const skippedByOnly = catalogEntries.length - selectedEntries.length;
  const totalOmitted = skippedByNoChanges + skippedByOnly;

  let backupPath = null;
  let updated = 0;
  let created = 0;

  if (isApply) {
    backupPath = await writeBackup(existingMap);
    const result = await applyChanges(rows);
    updated = result.updated;
    created = result.created;
  }

  console.log("\n=== Resumen ===");
  console.log(`Leídos (JSON): ${catalogEntries.length}${only ? ` (seleccionados: ${selectedEntries.length})` : ""}`);
  if (isDryRun) {
    console.log(`Actualizados: 0 (dry-run; ${toUpdate} por actualizar)`);
    console.log(`Creados: 0 (dry-run; ${toCreate} por crear)`);
    console.log(`Omitidos: ${totalOmitted}`);
    console.log("Backup: (no generado en dry-run)");
  } else {
    console.log(`Actualizados: ${updated}`);
    console.log(`Creados: ${created}`);
    console.log(`Omitidos: ${totalOmitted}`);
    console.log(`Backup: ${backupPath}`);
  }
}

main().catch((err) => {
  console.error("[error]", err?.message || err);
  process.exit(1);
});
