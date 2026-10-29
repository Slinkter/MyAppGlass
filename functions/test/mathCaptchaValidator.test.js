"use strict";

const { describe, test } = require("node:test");
const assert = require("node:assert/strict");
const { validateMathCaptcha } = require("../mathCaptchaValidator");
const { tokenMatematico } = require("./helpers");

const MIN = 60 * 1000;

describe("validateMathCaptcha", () => {
  test("token válido con respuesta correcta", () => {
    const { mathAnswer, mathToken } = tokenMatematico({ a: 7, op: "+", b: 5 });
    assert.deepEqual(validateMathCaptcha(mathAnswer, mathToken), { valid: true });
  });

  test("acepta la respuesta como texto con espacios", () => {
    const { mathToken } = tokenMatematico({ a: 7, op: "+", b: 5 });
    assert.deepEqual(validateMathCaptcha(" 12 ", mathToken), { valid: true });
  });

  test("respuesta incorrecta", () => {
    const { mathToken } = tokenMatematico({ a: 7, op: "+", b: 5 });
    const r = validateMathCaptcha(13, mathToken);
    assert.equal(r.valid, false);
    assert.equal(r.message, "La respuesta a la pregunta matemática es incorrecta.");
  });

  test("token ausente", () => {
    const r = validateMathCaptcha(12, undefined);
    assert.equal(r.valid, false);
    assert.equal(r.message, "Token de seguridad matemática ausente.");
  });

  test("firma inválida", () => {
    const { mathAnswer, mathToken } = tokenMatematico({ a: 7, op: "+", b: 5, sigOverride: "deadbeef" });
    const r = validateMathCaptcha(mathAnswer, mathToken);
    assert.equal(r.valid, false);
    assert.equal(r.message, "Firma de seguridad matemática no válida.");
  });

  test("token expirado (hace 16 minutos)", () => {
    const { mathAnswer, mathToken } = tokenMatematico({ ts: Date.now() - 16 * MIN });
    const r = validateMathCaptcha(mathAnswer, mathToken);
    assert.equal(r.valid, false);
    assert.equal(r.message, "El reto de seguridad ha expirado. Por favor, intente nuevamente.");
  });

  test("ts del futuro (+2 minutos)", () => {
    // CARACTERIZACIÓN: el rechazo por ts futuro reutiliza el mensaje de "expirado".
    // Es engañoso para el usuario, pero se fija tal cual está hoy.
    const { mathAnswer, mathToken } = tokenMatematico({ ts: Date.now() + 2 * MIN });
    const r = validateMathCaptcha(mathAnswer, mathToken);
    assert.equal(r.valid, false);
    assert.equal(r.message, "El reto de seguridad ha expirado. Por favor, intente nuevamente.");
  });

  test("operación resta (-)", () => {
    const { mathAnswer, mathToken } = tokenMatematico({ a: 9, op: "-", b: 4 });
    assert.equal(mathAnswer, 5);
    assert.deepEqual(validateMathCaptcha(mathAnswer, mathToken), { valid: true });
    assert.equal(validateMathCaptcha(9 + 4, mathToken).valid, false);
  });
});
