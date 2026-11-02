"use strict";

// Detecta que docs/api/openapi.json quedó desactualizado respecto de los schemas Zod del backend.
// Si falla: ejecutar `pnpm run contract:generate` desde la raíz y revisar el cambio del contrato.

const { describe, test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const generador = require(path.join(__dirname, "..", "..", "..", "scripts", "generate-openapi.cjs"));

describe("openapi.json", () => {
  test("coincide con lo que generan los schemas Zod del backend", () => {
    const esperado = generador.serialize(generador.buildOpenApi());
    const actual = fs.readFileSync(generador.OUTPUT, "utf8");
    assert.equal(actual, esperado, "docs/api/openapi.json está desactualizado: ejecuta `pnpm run contract:generate`.");
  });

  test("documenta los tres endpoints y los campos que el backend persiste", () => {
    const doc = JSON.parse(fs.readFileSync(generador.OUTPUT, "utf8"));
    assert.deepEqual(Object.keys(doc.paths).sort(), ["/checkStatus", "/submitContacto", "/submitReclamo"]);
    const props = doc.components.schemas.ReclamoRequest.properties;
    for (const campo of ["nombrePadreMadre", "aceptaTerminos", "autorizaEmail", "mathToken", "recaptchaToken"]) {
      assert.ok(campo in props, `ReclamoRequest debe documentar ${campo}`);
    }
  });
});
