"use strict";

// Pruebas de sendEmailLogic (Libro de Reclamaciones).
// Reglas del flujo vigente: validar -> persistir (código propio GYA-REC-) -> notificar -> registrar resultado.

const { describe, test, beforeEach, afterEach } = require("node:test");
const assert = require("node:assert/strict");
const h = require("./helpers");
const { sendEmailLogic } = h.cargarEmailSender();
const { resendCtl, FAKE_RESEND_ID, ADMIN_FALSO, PATRON_CODIGO } = h;

const COLECCION = "libro_de_reclamaciones";
const EVENTO_CREATE = `firestore.create:${COLECCION}`;
const EVENTO_UPDATE = `firestore.update:${COLECCION}`;

let ctx;
beforeEach(() => {
  ctx = h.preparar();
});
afterEach(() => {
  ctx.restaurar();
});

describe("sendEmailLogic (reclamo)", () => {
  test("camino feliz: 2 correos (admin y luego cliente) y 1 documento persistido", async () => {
    const antes = new Date();
    const resultado = await sendEmailLogic(h.reclamoValido(), ctx.admin, "203.0.113.7");

    assert.equal(resendCtl.llamadas.length, 2);
    const [correoAdmin, correoCliente] = resendCtl.llamadas;
    assert.equal(correoAdmin.to, ADMIN_FALSO);
    assert.equal(correoCliente.to, "cliente.prueba@example.com");

    assert.equal(ctx.admin.escrituras.length, 1);
    const { coleccion, id, datos } = ctx.admin.escrituras[0];
    assert.equal(coleccion, COLECCION);
    assert.match(id, PATRON_CODIGO.REC);
    assert.equal(id, resultado.id);
    assert.equal(datos.id, resultado.id);
    assert.equal(datos.status, "RECIBIDO");
    assert.equal(datos.source, "PROD_WEB");
    assert.equal(datos.clientIp, "203.0.113.7");
    // Retención legal de 2 años
    assert.equal(new Date(datos.legalRetentionUntil).getFullYear(), antes.getFullYear() + 2);

    assert.match(resultado.id, PATRON_CODIGO.REC);
    assert.equal(typeof resultado.createdAt, "string");
    assert.ok(!Number.isNaN(Date.parse(resultado.createdAt)));
  });

  test("honeypot middleName completo => GHOST_BLOCKED sin enviar ni guardar", async () => {
    const r = await sendEmailLogic(h.reclamoValido({ middleName: "bot" }), ctx.admin);
    assert.equal(r.id, "GHOST_BLOCKED");
    assert.equal(resendCtl.llamadas.length, 0);
    assert.equal(ctx.admin.escrituras.length, 0);
  });

  test("honeypot website_hp => GHOST_BLOCKED", async () => {
    const r = await sendEmailLogic(h.reclamoValido({ website_hp: "http://spam.example" }), ctx.admin);
    assert.equal(r.id, "GHOST_BLOCKED");
    assert.equal(resendCtl.llamadas.length, 0);
    assert.equal(ctx.admin.escrituras.length, 0);
  });

  test("_ts reciente (500 ms) => GHOST_BLOCKED", async () => {
    const r = await sendEmailLogic(h.reclamoValido({ _ts: Date.now() - 500 }), ctx.admin);
    assert.equal(r.id, "GHOST_BLOCKED");
    assert.equal(resendCtl.llamadas.length, 0);
    assert.equal(ctx.admin.escrituras.length, 0);
  });

  test("texto basura tipo DESjGMdhHribOHrqXR en el nombre => GHOST_BLOCKED", async () => {
    const r = await sendEmailLogic(h.reclamoValido({ nombreCompleto: "DESjGMdhHribOHrqXR" }), ctx.admin);
    assert.equal(r.id, "GHOST_BLOCKED");
    assert.equal(resendCtl.llamadas.length, 0);
    assert.equal(ctx.admin.escrituras.length, 0);
  });

  test("payload inválido (falta pedido) => invalid-argument", async () => {
    const payload = h.reclamoValido();
    delete payload.pedido;
    const err = await h.capturarError(sendEmailLogic(payload, ctx.admin));
    assert.equal(err.code, "invalid-argument");
    assert.match(err.message, /pedido/);
    assert.equal(resendCtl.llamadas.length, 0);
  });

  test("captcha matemático ausente => invalid-argument", async () => {
    const err = await h.capturarError(sendEmailLogic(h.reclamoValido({ mathToken: undefined }), ctx.admin));
    assert.equal(err.code, "invalid-argument");
    assert.equal(err.message, "Token de seguridad matemática ausente.");
  });

  test("captcha matemático con respuesta incorrecta => invalid-argument", async () => {
    const err = await h.capturarError(sendEmailLogic(h.reclamoValido({ mathAnswer: 999 }), ctx.admin));
    assert.equal(err.code, "invalid-argument");
    assert.equal(err.message, "La respuesta a la pregunta matemática es incorrecta.");
  });

  test("captcha matemático expirado (16 min) => invalid-argument", async () => {
    const payload = h.reclamoValido({ ...h.tokenMatematico({ ts: Date.now() - 16 * 60 * 1000 }) });
    const err = await h.capturarError(sendEmailLogic(payload, ctx.admin));
    assert.equal(err.code, "invalid-argument");
    assert.equal(err.message, "El reto de seguridad ha expirado. Por favor, intente nuevamente.");
  });

  test("captcha matemático con firma alterada => invalid-argument", async () => {
    const payload = h.reclamoValido({ ...h.tokenMatematico({ sigOverride: "deadbeef" }) });
    const err = await h.capturarError(sendEmailLogic(payload, ctx.admin));
    assert.equal(err.code, "invalid-argument");
    assert.equal(err.message, "Firma de seguridad matemática no válida.");
    // El captcha matemático se valida antes que reCAPTCHA: no hay llamada a Google
    assert.equal(ctx.fetch.llamadas.length, 0);
  });

  test("reCAPTCHA: token ausente => permission-denied", async () => {
    const err = await h.capturarError(sendEmailLogic(h.reclamoValido({ recaptchaToken: undefined }), ctx.admin));
    assert.equal(err.code, "permission-denied");
    assert.equal(ctx.fetch.llamadas.length, 0);
  });

  test("reCAPTCHA: score 0.3 (< 0.5) => permission-denied", async () => {
    h.fijarRecaptcha({ success: true, score: 0.3, action: "reclamation_submit" });
    const err = await h.capturarError(sendEmailLogic(h.reclamoValido(), ctx.admin));
    assert.equal(err.code, "permission-denied");
    assert.equal(err.message, "Validación de seguridad no superada (puntuación insuficiente).");
    assert.equal(resendCtl.llamadas.length, 0);
  });

  test("reCAPTCHA: success false => permission-denied", async () => {
    h.fijarRecaptcha({ success: false, score: 0.9, action: "reclamation_submit" });
    const err = await h.capturarError(sendEmailLogic(h.reclamoValido(), ctx.admin));
    assert.equal(err.code, "permission-denied");
  });

  test("reCAPTCHA: acción distinta => permission-denied", async () => {
    h.fijarRecaptcha({ success: true, score: 0.9, action: "contact_submit" });
    const err = await h.capturarError(sendEmailLogic(h.reclamoValido(), ctx.admin));
    assert.equal(err.code, "permission-denied");
    assert.equal(err.message, "Acción de seguridad no válida para este formulario.");
    assert.equal(resendCtl.llamadas.length, 0);
  });

  test("reCAPTCHA: fetch lanza excepción => permission-denied", async () => {
    h.fijarRecaptcha(new Error("red caída (doble de prueba)"));
    const err = await h.capturarError(sendEmailLogic(h.reclamoValido(), ctx.admin));
    assert.equal(err.code, "permission-denied");
    assert.equal(err.message, "No se pudo validar el token de seguridad.");
  });

  test("DNI con 7 dígitos => invalid-argument", async () => {
    const err = await h.capturarError(sendEmailLogic(h.reclamoValido({ numeroDocumento: "1234567" }), ctx.admin));
    assert.equal(err.code, "invalid-argument");
    assert.equal(err.message, "El DNI debe contener exactamente 8 dígitos numéricos.");
    assert.equal(resendCtl.llamadas.length, 0);
  });

  test("RUC válido de 11 dígitos con prefijo 20 => ok", async () => {
    const r = await sendEmailLogic(h.reclamoValido({ tipoDocumento: "RUC", numeroDocumento: "20601542407" }), ctx.admin);
    assert.match(r.id, PATRON_CODIGO.REC);
    assert.equal(resendCtl.llamadas.length, 2);
    assert.equal(ctx.admin.escrituras.length, 1);
  });

  test("escape HTML: & y comillas del nombre aparecen escapados en el correo al admin y al cliente", async () => {
    const nombre = `Tom & Jerry's "Taller"`;
    await sendEmailLogic(h.reclamoValido({ nombreCompleto: nombre }), ctx.admin);
    const [correoAdmin, correoCliente] = resendCtl.llamadas;
    const escapado = "Tom &amp; Jerry&#039;s &quot;Taller&quot;";
    assert.ok(correoAdmin.html.includes(escapado), "el HTML del admin debe contener el nombre escapado");
    assert.ok(correoCliente.html.includes(escapado), "el HTML del cliente debe contener el nombre escapado");
    assert.ok(!correoAdmin.html.includes("Tom & Jerry"), "no debe quedar el & crudo en el HTML");
  });

  test("el correo a la empresa lleva el código real y no TEMP_ID", async () => {
    const r = await sendEmailLogic(h.reclamoValido(), ctx.admin);
    const [correoAdmin, correoCliente] = resendCtl.llamadas;
    assert.ok(correoAdmin.html.includes(r.id), "el correo al admin debe contener el código real");
    assert.ok(!correoAdmin.html.includes("TEMP_ID"));
    assert.ok(correoCliente.html.includes(r.id), "el correo al cliente debe contener el código real");
    assert.ok(!correoCliente.html.includes("TEMP_ID"));
    assert.ok(correoAdmin.subject.endsWith(` - ${r.id}`), "el asunto del admin termina en el código");
    assert.ok(correoCliente.subject.includes(r.id), "el asunto del cliente incluye el código");
  });

  test("persiste en Firestore antes de enviar correos", async () => {
    await sendEmailLogic(h.reclamoValido(), ctx.admin);
    assert.deepEqual(ctx.eventos, [EVENTO_CREATE, "resend.send:admin", "resend.send:cliente", EVENTO_UPDATE]);
  });

  test("el documento guardado tiene id, status RECIBIDO y notifications con SENT y resendId, y no tiene resendId de nivel superior", async () => {
    const r = await sendEmailLogic(h.reclamoValido(), ctx.admin);
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
    const err = await h.capturarError(sendEmailLogic(h.reclamoValido(), ctx.admin));
    assert.equal(err.code, "internal");
    assert.match(err.message, /^Error al procesar el reclamo: /);
    assert.ok(!err.message.includes("Firestore no disponible"), "no debe filtrar el detalle interno al cliente");
    assert.equal(resendCtl.llamadas.length, 0, "no debe enviarse ningún correo");
    assert.deepEqual(ctx.eventos, [EVENTO_CREATE]);
    assert.equal(ctx.admin.escrituras.length, 0);
  });

  test("acepta paréntesis en textos libres", async () => {
    const detalle = "Compré la ventana (factura 123) y llegó rota.";
    const r = await sendEmailLogic(h.reclamoValido({ detalle }), ctx.admin);
    assert.match(r.id, PATRON_CODIGO.REC);
    assert.equal(resendCtl.llamadas.length, 2);
    assert.equal(ctx.admin.documento(COLECCION, r.id).detalle, detalle);
  });

  test("sigue rechazando < > { }", async () => {
    for (const caracter of ["<", ">", "{", "}"]) {
      const err = await h.capturarError(
        sendEmailLogic(h.reclamoValido({ detalle: `Compré la ventana ${caracter} y llegó rota.` }), ctx.admin)
      );
      assert.equal(err.code, "invalid-argument", `debe rechazar ${caracter}`);
      assert.match(err.message, /detalle: Caracteres no permitidos/);
    }
    assert.equal(resendCtl.llamadas.length, 0);
    assert.equal(ctx.admin.escrituras.length, 0);
  });

  test("si falla el correo al cliente responde éxito y deja notifications.client FAILED", async () => {
    resendCtl.fallos.cliente = "rebote simulado";
    const r = await sendEmailLogic(h.reclamoValido(), ctx.admin);
    assert.match(r.id, PATRON_CODIGO.REC);
    const doc = ctx.admin.documento(COLECCION, r.id);
    assert.deepEqual(doc.notifications.client, { status: "FAILED", error: "rebote simulado" });
    assert.deepEqual(doc.notifications.admin, { status: "SENT", resendId: FAKE_RESEND_ID });
  });

  test("si fallan ambos correos el registro queda guardado y responde éxito", async () => {
    resendCtl.fallos.admin = "rebote admin";
    resendCtl.fallos.cliente = "rebote cliente";
    const r = await sendEmailLogic(h.reclamoValido(), ctx.admin);
    assert.match(r.id, PATRON_CODIGO.REC);
    const doc = ctx.admin.documento(COLECCION, r.id);
    assert.ok(doc, "el registro debe quedar guardado");
    assert.equal(doc.status, "RECIBIDO");
    assert.deepEqual(doc.notifications.admin, { status: "FAILED", error: "rebote admin" });
    assert.deepEqual(doc.notifications.client, { status: "FAILED", error: "rebote cliente" });
  });

  test("si falla el update de notifications responde igualmente éxito", async () => {
    ctx.admin.fallaUpdate = true;
    const r = await sendEmailLogic(h.reclamoValido(), ctx.admin);
    assert.match(r.id, PATRON_CODIGO.REC);
    assert.equal(resendCtl.llamadas.length, 2, "los correos sí se enviaron");
    const doc = ctx.admin.documento(COLECCION, r.id);
    assert.ok(doc, "el documento sigue guardado");
    assert.deepEqual(doc.notifications.admin, { status: "PENDING" });
    assert.deepEqual(doc.notifications.client, { status: "PENDING" });
  });

  test("el asunto no contiene saltos de línea aunque el nombre los traiga", async () => {
    const r = await sendEmailLogic(h.reclamoValido({ nombreCompleto: "Tom &\nJerry\r\nPérez" }), ctx.admin);
    const [correoAdmin, correoCliente] = resendCtl.llamadas;
    assert.equal(correoAdmin.subject, `HOJA DE RECLAMACIÓN - RECLAMO - Tom & Jerry Pérez - ${r.id}`);
    assert.doesNotMatch(correoAdmin.subject, /[\r\n]/);
    assert.doesNotMatch(correoCliente.subject, /[\r\n]/);
  });

  test("el asunto conserva el nombre sin escapar HTML (el escape es solo para el cuerpo)", async () => {
    const r = await sendEmailLogic(h.reclamoValido({ nombreCompleto: "Tom & Jerry" }), ctx.admin);
    assert.equal(resendCtl.llamadas[0].subject, `HOJA DE RECLAMACIÓN - RECLAMO - Tom & Jerry - ${r.id}`);
  });
});
