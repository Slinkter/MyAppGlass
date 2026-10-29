"use strict";

const { describe, test } = require("node:test");
const assert = require("node:assert/strict");
const { getClientIp } = require("../src/guards/clientIp");

/** Construye un request mínimo. xff undefined => sin cabecera; remote undefined => sin socket. */
function req(xff, remote) {
  return {
    headers: xff === undefined ? {} : { "x-forwarded-for": xff },
    socket: remote === undefined ? undefined : { remoteAddress: remote },
  };
}

describe("getClientIp: X-Forwarded-For", () => {
  test("ignora la IP forjada al inicio y usa la última entrada (cadena de 2)", () => {
    assert.equal(getClientIp(req("1.1.1.1, 2.2.2.2")), "2.2.2.2");
  });

  test("cadena de 3 entradas devuelve la última", () => {
    assert.equal(getClientIp(req("9.9.9.9, 8.8.8.8, 7.7.7.7")), "7.7.7.7");
  });

  test("una sola entrada válida se devuelve tal cual", () => {
    assert.equal(getClientIp(req("5.5.5.5")), "5.5.5.5");
  });

  test("IPv6 en la última posición", () => {
    assert.equal(getClientIp(req("1.1.1.1, 2001:db8::5")), "2001:db8::5");
  });

  test("IPv6 en otras posiciones de la cadena se trata igual", () => {
    assert.equal(getClientIp(req("2001:db8::1, ::1")), "::1");
  });

  test("entradas inválidas intercaladas se descartan antes de elegir", () => {
    // Válidas: 1.1.1.1, 2.2.2.2, 3.3.3.3. Se elige la última válida: 3.3.3.3.
    assert.equal(getClientIp(req("1.1.1.1, basura, 2.2.2.2, , 999.1.1.1, 3.3.3.3, otra")), "3.3.3.3");
  });

  test("solo entradas inválidas en la cabecera: usa el socket", () => {
    assert.equal(getClientIp(req("basura, 999.999.1.1", "10.0.0.7")), "10.0.0.7");
  });

  test("espacios alrededor de las comas se recortan", () => {
    assert.equal(getClientIp(req("  4.4.4.4 ,   5.5.5.5   ")), "5.5.5.5");
  });

  test("cabecera como arreglo se une por comas", () => {
    assert.equal(getClientIp(req(["1.1.1.1", "2.2.2.2, 3.3.3.3"])), "3.3.3.3");
  });

  test("arreglo con la IP forjada en la primera posición no la usa", () => {
    assert.equal(getClientIp(req(["6.6.6.6, 7.7.7.7"])), "7.7.7.7");
  });

  test("cabecera válida tiene prioridad sobre el socket", () => {
    assert.equal(getClientIp(req("1.1.1.1, 2.2.2.2", "10.0.0.1")), "2.2.2.2");
  });
});

describe("getClientIp: fallback al socket", () => {
  test("sin cabecera usa socket.remoteAddress", () => {
    assert.equal(getClientIp(req(undefined, "10.0.0.8")), "10.0.0.8");
  });

  test("cabecera vacía usa socket.remoteAddress", () => {
    assert.equal(getClientIp(req("", "10.0.0.9")), "10.0.0.9");
  });

  test("socket IPv6 válido se devuelve", () => {
    assert.equal(getClientIp(req(undefined, "2001:db8::9")), "2001:db8::9");
  });

  test("socket con valor inválido devuelve \"unknown\"", () => {
    assert.equal(getClientIp(req(undefined, "no-es-ip")), "unknown");
  });

  test("sin cabecera ni socket devuelve \"unknown\"", () => {
    assert.equal(getClientIp(req(undefined, undefined)), "unknown");
  });

  test("request sin headers ni socket devuelve \"unknown\"", () => {
    assert.equal(getClientIp({}), "unknown");
    assert.equal(getClientIp(undefined), "unknown");
  });
});
