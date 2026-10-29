"use strict";

// Pruebas de sendContactEmailLogic (formulario de contacto / cotización).
// Reglas del flujo vigente: validar -> persistir (código propio GYA-CON-) -> notificar -> registrar resultado.

const { describe, test, beforeEach, afterEach } = require("node:test");
const assert = require("node:assert/strict");
const h = require("./helpers");
const { sendContactEmailLogic } = h.cargarEmailSender();
const { resendCtl, FAKE_RESEND_ID, ADMIN_FALSO, PATRON_CODIGO } = h;

const COLECCION = "contact_submissions";
const EVENTO_CREATE = `firestore.create:${COLECCION}`;
const EVENTO_UPDATE = `firestore.update:${COLECCION}`;

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
    assert.equal(coleccion, COLECCION);
    assert.match(id, PATRON_CODIGO.CON);
    assert.equal(id, resultado.id);
    assert.equal(datos.id, resultado.id);
    assert.equal(datos.status, "RECIBIDO");
    assert.equal(datos.clientIp, "203.0.113.9");
    assert.equal(datos.name, "María Soto");

    assert.match(resultado.id, PATRON_CODIGO.CON);
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
    assert.match(r.id, PATRON_CODIGO.CON);
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

  test("el correo a la empresa lleva el código real y no TEMP_ID", async () => {
    const r = await sendContactEmailLogic(h.contactoValido(), ctx.admin);
    const [correoAdmin, correoCliente] = resendCtl.llamadas;
    assert.ok(correoAdmin.html.includes(r.id), "el correo al admin debe contener el código real");
    assert.ok(!correoAdmin.html.includes("TEMP_ID"));
    assert.ok(correoCliente.html.includes(r.id), "el correo al cliente debe contener el código real");
    assert.ok(!correoCliente.html.includes("TEMP_ID"));
    assert.ok(correoCliente.subject.includes(r.id), "el asunto del cliente incluye el código");
  });

  test("persiste en Firestore antes de enviar correos", async () => {
    await sendContactEmailLogic(h.contactoValido(), ctx.admin);
    assert.deepEqual(ctx.eventos, [EVENTO_CREATE, "resend.send:admin", "resend.send:cliente", EVENTO_UPDATE]);
  });

  test("el documento guardado tiene id, status RECIBIDO y notifications con SENT y resendId, y no tiene resendId de nivel superior", async () => {
    const r = await sendContactEmailLogic(h.contactoValido(), ctx.admin);
    const doc = ctx.admin.documento(COLECCION, r.id);
    assert.ok(doc, "el documento debe existir con el código como id");
    assert.equal(doc.id, r.id);
    assert.equal(doc.status, "RECIBIDO");
    assert.deepEqual(doc.notifications.admin, { status: "SENT", resendId: FAKE_RESEND_ID });
    assert.deepEqual(doc.notifications.client, { status: "SENT", resendId: FAKE_RESEND_ID });
    assert.equal("resendId" in doc, false);
  });

  test("si Firestore falla no envía ningún correo y lanza internal", async () => {
    ctx.admin.falla = true;
    const err = await h.capturarError(sendContactEmailLogic(h.contactoValido(), ctx.admin));
    assert.equal(err.code, "internal");
    assert.ok(!err.message.includes("Firestore no disponible"), "no debe filtrar el detalle interno al cliente");
    assert.equal(resendCtl.llamadas.length, 0, "no debe enviarse ningún correo");
    assert.deepEqual(ctx.eventos, [EVENTO_CREATE]);
    assert.equal(ctx.admin.escrituras.length, 0);
  });

  test("si falla el correo al cliente responde éxito y deja notifications.client FAILED", async () => {
    resendCtl.fallos.cliente = "rebote simulado";
    const r = await sendContactEmailLogic(h.contactoValido(), ctx.admin);
    assert.match(r.id, PATRON_CODIGO.CON);
    const doc = ctx.admin.documento(COLECCION, r.id);
    assert.deepEqual(doc.notifications.client, { status: "FAILED", error: "rebote simulado" });
    assert.deepEqual(doc.notifications.admin, { status: "SENT", resendId: FAKE_RESEND_ID });
  });

  test("si fallan ambos correos el registro queda guardado y responde éxito", async () => {
    resendCtl.fallos.admin = "rebote admin";
    resendCtl.fallos.cliente = "rebote cliente";
    const r = await sendContactEmailLogic(h.contactoValido(), ctx.admin);
    assert.match(r.id, PATRON_CODIGO.CON);
    const doc = ctx.admin.documento(COLECCION, r.id);
    assert.ok(doc, "el registro debe quedar guardado");
    assert.deepEqual(doc.notifications.admin, { status: "FAILED", error: "rebote admin" });
    assert.deepEqual(doc.notifications.client, { status: "FAILED", error: "rebote cliente" });
  });

  test("si falla el update de notifications responde igualmente éxito", async () => {
    ctx.admin.fallaUpdate = true;
    const r = await sendContactEmailLogic(h.contactoValido(), ctx.admin);
    assert.match(r.id, PATRON_CODIGO.CON);
    assert.equal(resendCtl.llamadas.length, 2, "los correos sí se enviaron");
    assert.ok(ctx.admin.documento(COLECCION, r.id), "el documento sigue guardado");
  });

  test("el asunto no contiene saltos de línea aunque el nombre los traiga", async () => {
    const r = await sendContactEmailLogic(h.contactoValido({ name: "María\r\nSoto\nLópez" }), ctx.admin);
    const [correoAdmin, correoCliente] = resendCtl.llamadas;
    assert.equal(correoAdmin.subject, "NUEVA CONSULTA - María Soto López");
    assert.doesNotMatch(correoAdmin.subject, /[\r\n]/);
    assert.doesNotMatch(correoCliente.subject, /[\r\n]/);
    assert.ok(correoCliente.subject.includes(r.id));
  });

  test("acepta paréntesis en el mensaje", async () => {
    const message = "Quisiera cotizar (2 ventanas) de aluminio.";
    const r = await sendContactEmailLogic(h.contactoValido({ message }), ctx.admin);
    assert.match(r.id, PATRON_CODIGO.CON);
    assert.equal(ctx.admin.documento(COLECCION, r.id).message, message);
  });

  test("sigue rechazando < > { } en el mensaje", async () => {
    for (const caracter of ["<", ">", "{", "}"]) {
      const err = await h.capturarError(
        sendContactEmailLogic(h.contactoValido({ message: `Quisiera cotizar ${caracter} ventanas.` }), ctx.admin)
      );
      assert.equal(err.code, "invalid-argument", `debe rechazar ${caracter}`);
      assert.match(err.message, /^Datos inválidos: message: Caracteres no permitidos/);
    }
    assert.equal(resendCtl.llamadas.length, 0);
    assert.equal(ctx.admin.escrituras.length, 0);
  });
});
