"use strict";

// Pruebas de caracterización de sendContactEmailLogic (formulario de contacto / cotización).
// Fijan el comportamiento ACTUAL, incluidos sus defectos conocidos.

const { describe, test, beforeEach, afterEach } = require("node:test");
const assert = require("node:assert/strict");
const h = require("./helpers");
const { sendContactEmailLogic } = h.cargarEmailSender();
const { resendCtl, FAKE_RESEND_ID, ADMIN_FALSO } = h;

let ctx;
beforeEach(() => {
  ctx = h.preparar();
  // El formulario de contacto exige la acción "contact_submit" de reCAPTCHA.
  h.fijarRecaptcha({ success: true, score: 0.9, action: "contact_submit" });
});
afterEach(() => {
  ctx.restaurar();
});

describe("sendContactEmailLogic (contacto)", () => {
  test("camino feliz: 2 correos (admin y luego cliente) y 1 documento en contact_submissions", async () => {
    const resultado = await sendContactEmailLogic(h.contactoValido(), ctx.admin, "203.0.113.9");

    assert.equal(resendCtl.llamadas.length, 2);
    const [correoAdmin, correoCliente] = resendCtl.llamadas;
    assert.equal(correoAdmin.to, ADMIN_FALSO);
    assert.equal(correoAdmin.reply_to, "maria.prueba@example.com");
    assert.equal(correoCliente.to, "maria.prueba@example.com");

    assert.equal(ctx.admin.escrituras.length, 1);
    const { coleccion, id, datos } = ctx.admin.escrituras[0];
    assert.equal(coleccion, "contact_submissions");
    assert.equal(id, FAKE_RESEND_ID);
    assert.equal(datos.status, "RECIBIDO");
    assert.equal(datos.clientIp, "203.0.113.9");
    assert.equal(datos.name, "María Soto");

    assert.equal(resultado.id, FAKE_RESEND_ID);
    assert.equal(typeof resultado.createdAt, "string");
  });

  test("honeypot middleName => GHOST_BLOCKED sin enviar ni guardar", async () => {
    const r = await sendContactEmailLogic(h.contactoValido({ middleName: "bot" }), ctx.admin);
    assert.equal(r.id, "GHOST_BLOCKED");
    assert.equal(resendCtl.llamadas.length, 0);
    assert.equal(ctx.admin.escrituras.length, 0);
  });

  test("honeypot website_hp => GHOST_BLOCKED", async () => {
    const r = await sendContactEmailLogic(h.contactoValido({ website_hp: "http://spam.example" }), ctx.admin);
    assert.equal(r.id, "GHOST_BLOCKED");
    assert.equal(resendCtl.llamadas.length, 0);
  });

  test("captcha matemático inválido (respuesta incorrecta) => invalid-argument", async () => {
    const err = await h.capturarError(sendContactEmailLogic(h.contactoValido({ mathAnswer: 0 }), ctx.admin));
    assert.equal(err.code, "invalid-argument");
    assert.equal(err.message, "La respuesta a la pregunta matemática es incorrecta.");
    assert.equal(ctx.fetch.llamadas.length, 0);
  });

  test("reCAPTCHA con acción contact_submit => ok", async () => {
    const r = await sendContactEmailLogic(h.contactoValido(), ctx.admin);
    assert.equal(r.id, FAKE_RESEND_ID);
    assert.equal(resendCtl.llamadas.length, 2);
  });

  test("reCAPTCHA con la acción de reclamo (reclamation_submit) en contacto => permission-denied", async () => {
    // El doble se fija en beforeEach con contact_submit; aquí se fuerza la acción de reclamo.
    h.fijarRecaptcha({ success: true, score: 0.9, action: "reclamation_submit" });
    const err = await h.capturarError(sendContactEmailLogic(h.contactoValido(), ctx.admin));
    assert.equal(err.code, "permission-denied");
    assert.equal(err.message, "Acción de seguridad no válida para este formulario.");
    assert.equal(resendCtl.llamadas.length, 0);
  });

  test("payload inválido (nombre de 1 carácter) => invalid-argument", async () => {
    const err = await h.capturarError(sendContactEmailLogic(h.contactoValido({ name: "M" }), ctx.admin));
    assert.equal(err.code, "invalid-argument");
    assert.match(err.message, /^Datos inválidos: name: /);
    assert.equal(resendCtl.llamadas.length, 0);
  });

  test("COMPORTAMIENTO ACTUAL: el HTML del correo al ADMIN contiene el literal TEMP_ID", async () => {
    // CARACTERIZACIÓN: el id de contacto se inserta como "TEMP_ID" porque el correo al admin
    // se envía antes de conocer el id de Resend. Se corregirá en una fase posterior.
    await sendContactEmailLogic(h.contactoValido(), ctx.admin);
    const [correoAdmin, correoCliente] = resendCtl.llamadas;
    assert.ok(correoAdmin.html.includes("TEMP_ID"));
    assert.ok(correoCliente.html.includes(FAKE_RESEND_ID));
  });
});
