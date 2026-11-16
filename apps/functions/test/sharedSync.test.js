"use strict";

// Falla si `apps/functions/src/shared/` quedó desactualizado respecto de `packages/shared/src`.
// Arreglo: `pnpm run shared:sync` desde la raíz.

const { test } = require("node:test");
const assert = require("node:assert/strict");
const path = require("node:path");
const { spawnSync } = require("node:child_process");

test("la copia de @gya/shared en functions está al día", () => {
  const raiz = path.resolve(__dirname, "..", "..", "..");
  const r = spawnSync(process.execPath, [path.join(raiz, "scripts", "sync-shared-to-functions.mjs"), "--check"], {
    cwd: raiz,
    encoding: "utf8",
  });
  assert.equal(r.status, 0, r.stderr || r.stdout);
});
