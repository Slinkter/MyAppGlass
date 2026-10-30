"use strict";

const { describe, test, beforeEach, afterEach } = require("node:test");
const assert = require("node:assert/strict");
const { verifyRecaptcha } = require("../src/guards/captcha");

const SECRETO = "SECRETO_INVENTADO_SOLO_TESTS";
let envPrevio;
let fetchPrevio;
beforeEach(() => {
  envPrevio = process.env.RECAPTCHA_SECRET_KEY;
  fetchPrevio = global.fetch;
  process.env.RECAPTCHA_SECRET_KEY = SECRETO;
});
afterEach(() => {
  if (envPrevio === undefined) delete process.env.RECAPTCHA_SECRET_KEY;
  else process.env.RECAPTCHA_SECRET_KEY = envPrevio;
  global.fetch = fetchPrevio;
});

function fetchEspia(respuesta) {
  const llamadas = [];
  global.fetch = async (url, opciones) => {
    llamadas.push({ url, opciones });
    if (respuesta instanceof Error) throw respuesta;
    return { json: async () => respuesta };
  };
  return llamadas;
}

describe("verifyRecaptcha: forma de la llamada", () => {
  test("el secreto y el token van en el cuerpo (form-urlencoded), nunca en la URL", async () => {
    const llamadas = fetchEspia({ success: true, score: 0.9, action: "a" });
    await verifyRecaptcha("  token valor&raro  ", "a");
    assert.equal(llamadas.length, 1);
    const { url, opciones } = llamadas[0];
    assert.equal(url, "https://www.google.com/recaptcha/api/siteverify");
    assert.ok(!String(url).includes(SECRETO));
    assert.ok(!String(url).includes("?"));
    assert.equal(opciones.method, "POST");
    assert.equal(opciones.headers["Content-Type"], "application/x-www-form-urlencoded");
    assert.ok(opciones.body instanceof URLSearchParams);
    assert.equal(opciones.body.get("secret"), SECRETO);
    assert.equal(opciones.body.get("response"), "token valor&raro");
  });

  test("lleva un AbortSignal de timeout", async () => {
    const llamadas = fetchEspia({ success: true, score: 0.9, action: "a" });
    await verifyRecaptcha("tok", "a");
    assert.ok(llamadas[0].opciones.signal instanceof AbortSignal);
    assert.equal(llamadas[0].opciones.signal.aborted, false);
  });
});

describe("verifyRecaptcha: validación (sin cambios)", () => {
  test("score bajo, success false y acción distinta => permission-denied", async () => {
    for (const [resp, msg] of [
      [{ success: true, score: 0.3, action: "a" }, "Validación de seguridad no superada (puntuación insuficiente)."],
      [{ success: false, score: 0.9, action: "a" }, "Validación de seguridad no superada (puntuación insuficiente)."],
      [{ success: true, score: 0.9, action: "otra" }, "Acción de seguridad no válida para este formulario."],
    ]) {
      fetchEspia(resp);
      await assert.rejects(verifyRecaptcha("tok", "a"), (e) => e.code === "permission-denied" && e.message === msg);
    }
  });

  test("timeout/abort de la petición => permission-denied con mensaje genérico", async () => {
    for (const nombre of ["TimeoutError", "AbortError"]) {
      const err = new Error("operación abortada");
      err.name = nombre;
      fetchEspia(err);
      await assert.rejects(
        verifyRecaptcha("tok", "a"),
        (e) => e.code === "permission-denied" && e.message === "No se pudo validar el token de seguridad."
      );
    }
  });
});
