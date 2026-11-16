/**
 * Copia a `apps/functions/src/shared/` los módulos de `@gya/shared` que usan las Cloud Functions,
 * transpilados a CommonJS con el compilador de TypeScript.
 *
 * Por qué: las functions son CommonJS y se despliegan solas (`firebase.json` → `source: apps/functions`),
 * así que no pueden resolver un paquete del workspace escrito en TypeScript. La fuente sigue siendo
 * `packages/shared/src`; los archivos generados no se editan a mano.
 *
 * Uso:
 *   pnpm run shared:sync           regenera los archivos
 *   node scripts/sync-shared-to-functions.mjs --check   falla si están desactualizados
 *
 * `apps/functions/test/sharedSync.test.js` ejecuta el modo --check.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SOURCE_DIR = join(ROOT, "packages", "shared", "src");
const TARGET_DIR = join(ROOT, "apps", "functions", "src", "shared");

/** Módulos que consumen las functions. No deben importarse entre sí con rutas relativas. */
const MODULES = [
  "company-data.ts",
  "lib/presupuesto-totales.ts",
  "schemas/presupuesto-schema.ts",
  "schemas/cliente-crm-schema.ts",
];

const normalize = (text) => text.replace(/\r\n/g, "\n");

function transpile(relativePath) {
  const source = readFileSync(join(SOURCE_DIR, relativePath), "utf8");
  if (/from\s+["']\.\.?\//.test(source)) {
    throw new Error(`${relativePath} tiene imports relativos: agréguelos a MODULES y ajuste el script.`);
  }
  const { outputText } = ts.transpileModule(source, {
    fileName: relativePath,
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      removeComments: false,
      esModuleInterop: true,
    },
  });
  const header = `/* eslint-disable */\n// GENERADO desde packages/shared/src/${relativePath}. No editar: correr \`pnpm run shared:sync\`.\n`;
  return normalize(header + outputText);
}

const check = process.argv.includes("--check");
const stale = [];

for (const relativePath of MODULES) {
  const fileName = relativePath.split("/").pop().replace(/\.ts$/, ".js");
  const target = join(TARGET_DIR, fileName);
  const output = transpile(relativePath);
  const current = existsSync(target) ? normalize(readFileSync(target, "utf8")) : null;
  if (current === output) continue;
  if (check) {
    stale.push(fileName);
  } else {
    mkdirSync(TARGET_DIR, { recursive: true });
    writeFileSync(target, output, "utf8");
    console.log(`actualizado apps/functions/src/shared/${fileName}`);
  }
}

if (check && stale.length > 0) {
  console.error(`Desactualizados: ${stale.join(", ")}. Corra \`pnpm run shared:sync\`.`);
  process.exit(1);
}
