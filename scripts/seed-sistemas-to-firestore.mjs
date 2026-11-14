/**
 * Sincroniza los 52 sistemas curados desde `apps/web/src/entities/system/data/`
 * hacia Firestore (`sistemas` y su espejo limpio `sistemas_publicos`).
 *
 * Uso:
 *   node scripts/seed-sistemas-to-firestore.mjs [--dry-run] [--apply] [--prod] [--only=id1,id2] [--all-draft]
 *
 * Regla de publicación por defecto:
 *   - Publica (`estado: "publicado"` + espejo en `sistemas_publicos`) los sistemas cuya ficha
 *     está completa (`serviceSlug !== "por-definir"` y sin `"Dato pendiente"` en `descripcion`).
 *   - Deja en `borrador` los sistemas incompletos o en `por-definir` para revisión en `/admin/sistemas`.
 *   - `sistemas_publicos` nunca incluye `aliases`, `perfiles`, `accesorios` con SKU ni `fuente`.
 */
import { createRequire } from "node:module";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA_DIR = path.join(ROOT_DIR, "apps", "web", "src", "entities", "system", "data");
const BACKUP_DIR = path.join(ROOT_DIR, "docs", "proveedores");
const PROJECT_ID = "gya-app-4c8a9";
const COLLECTION = "sistemas";
const PUBLIC_COLLECTION = "sistemas_publicos";
const DEFAULT_EMULATOR_HOST = "127.0.0.1:8081";
const PROD_WAIT_MS = 5000;

const DATA_FILES = ["systemsAluminio.ts", "systemsTempladoAcero.ts", "systemsOtros.ts"];

function parseCliArgs(argv) {
  let hasApply = false;
  let isProd = false;
  let allDraft = false;
  let only = null;

  for (const arg of argv) {
    if (arg === "--apply") hasApply = true;
    else if (arg === "--prod") isProd = true;
    else if (arg === "--all-draft") allDraft = true;
    else if (arg.startsWith("--only=")) {
      only = new Set(
        arg
          .slice("--only=".length)
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      );
    }
  }

  return { isDryRun: !hasApply, isApply: hasApply, isProd, allDraft, only };
}

let dbCache = null;
function getDb() {
  if (dbCache) return dbCache;
  const admin = require(path.join(ROOT_DIR, "apps", "functions", "node_modules", "firebase-admin"));
  if (!admin.apps.length) {
    admin.initializeApp({ projectId: PROJECT_ID });
  }
  dbCache = admin.firestore();
  return dbCache;
}

async function loadSeedSystems() {
  const ts = require(path.join(ROOT_DIR, "apps", "web", "node_modules", "typescript"));
  const systems = [];

  for (const file of DATA_FILES) {
    const src = await readFile(path.join(DATA_DIR, file), "utf8");
    const js = ts.transpileModule(src, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
    }).outputText;
    const mod = { exports: {} };
    new Function("exports", "require", "module", js)(mod.exports, require, mod);
    const list = Object.values(mod.exports)[0];
    if (Array.isArray(list)) systems.push(...list);
  }

  return systems;
}

function toPublic(system) {
  return {
    serviceSlug: system.serviceSlug,
    nombre: system.nombre,
    descripcion: system.descripcion,
    tipoApertura: system.tipoApertura,
    vidrio: system.vidrio ?? [],
    pricePending: system.pricePending !== false,
    ...(typeof system.order === "number" ? { order: system.order } : {}),
  };
}

function computeTargetState(system, allDraft) {
  if (allDraft) return "borrador";
  const hasPending = system.descripcion.includes("Dato pendiente");
  if (system.serviceSlug !== "por-definir" && !hasPending) {
    return "publicado";
  }
  return "borrador";
}

function formatStamp(date = new Date()) {
  const pad = (n) => String(n).padStart(2, "0");
  return (
    `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}-` +
    `${pad(date.getHours())}${pad(date.getMinutes())}`
  );
}

async function writeBackup(db) {
  await mkdir(BACKUP_DIR, { recursive: true });
  const [sysSnap, pubSnap] = await Promise.all([
    db.collection(COLLECTION).get(),
    db.collection(PUBLIC_COLLECTION).get(),
  ]);
  const backupPath = path.join(BACKUP_DIR, `backup-sistemas-${formatStamp()}.json`);
  const payload = {
    exportedAt: new Date().toISOString(),
    projectId: PROJECT_ID,
    sistemas: Object.fromEntries(sysSnap.docs.map((d) => [d.id, d.data()])),
    sistemas_publicos: Object.fromEntries(pubSnap.docs.map((d) => [d.id, d.data()])),
  };
  await writeFile(backupPath, JSON.stringify(payload, null, 2), "utf8");
  return backupPath;
}

async function main() {
  const { isDryRun, isApply, isProd, allDraft, only } = parseCliArgs(process.argv.slice(2));
  const emulatorHost = process.env.FIRESTORE_EMULATOR_HOST || DEFAULT_EMULATOR_HOST;

  if (!isProd && isApply) {
    process.env.FIRESTORE_EMULATOR_HOST = emulatorHost;
  }

  const allSystems = await loadSeedSystems();
  const selected = only ? allSystems.filter((s) => only.has(s.id)) : allSystems;

  const plan = selected.map((system) => ({
    system,
    estado: computeTargetState(system, allDraft),
  }));

  const pubCount = plan.filter((p) => p.estado === "publicado").length;
  const draftCount = plan.filter((p) => p.estado === "borrador").length;

  console.log(`Modo: ${isDryRun ? "DRY-RUN (solo lectura)" : "APPLY (escritura)"}`);
  console.log(`Destino: ${isProd ? "PRODUCCIÓN" : `emulador (${emulatorHost})`}`);
  console.log(`Total sistemas: ${plan.length} (publicado: ${pubCount}, borrador: ${draftCount})\n`);

  for (const { system, estado } of plan) {
    console.log(
      `${estado.padEnd(10)} | ${system.serviceSlug.padEnd(18)} | ${system.id.padEnd(32)} | ${system.nombre}`,
    );
  }

  if (isDryRun) return;

  if (isProd) {
    console.log(`\nEsperando ${PROD_WAIT_MS / 1000} s antes de escribir en PRODUCCIÓN...`);
    await new Promise((r) => setTimeout(r, PROD_WAIT_MS));
  }

  const db = getDb();
  const backupPath = await writeBackup(db);
  console.log(`\nBackup guardado en: ${backupPath}`);

  let written = 0;
  let published = 0;
  for (const { system, estado } of plan) {
    const { id, ...data } = system;
    await db.collection(COLLECTION).doc(id).set({ ...data, estado });
    if (estado === "publicado") {
      await db.collection(PUBLIC_COLLECTION).doc(id).set(toPublic(system));
      published++;
    } else {
      await db.collection(PUBLIC_COLLECTION).doc(id).delete();
    }
    written++;
  }

  console.log(`\n=== Resumen ===`);
  console.log(`Escritos en '${COLLECTION}': ${written}`);
  console.log(`Publicados en '${PUBLIC_COLLECTION}': ${published}`);
  console.log(`En borrador: ${written - published}`);
}

main().catch((err) => {
  console.error("[error]", err?.message || err);
  process.exit(1);
});
