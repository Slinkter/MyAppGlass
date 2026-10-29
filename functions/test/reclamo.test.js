"use strict";

// Pruebas de caracterización de sendEmailLogic (Libro de Reclamaciones).
// Fijan el comportamiento ACTUAL, incluidos sus defectos conocidos.

const { describe, test, beforeEach, afterEach } = require("node:test");
const assert = require("node:assert/strict");
const h = require("./helpers");
const { sendEmailLogic } = h.cargarEmailSender();
const { resendCtl, FAKE_RESEND_ID, ADMIN_FALSO } = h;

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
    assert.equal(coleccion, "libro_de_reclamaciones");
    assert.equal(id, FAKE_RESEND_ID);
    assert.equal(datos.status, "RECIBIDO");
    assert.equal(datos.source, "PROD_WEB");
    assert.equal(datos.clientIp, "203.0.113.7");
    // Retención legal de 2 años
    assert.equal(new Date(datos.legalRetentionUntil).getFullYear(), antes.getFullYear() + 2);

    assert.equal(resultado.id, FAKE_RESEND_ID);
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
    assert.equal(r.id, FAKE_RESEND_ID);
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

  // ─── CARACTERIZACIÓN DE DEFECTOS ACTUALES (se cambiarán en una fase posterior) ───

  test("COMPORTAMIENTO ACTUAL: el HTML del correo al ADMIN contiene el literal TEMP_ID", async () => {
    // CARACTERIZACIÓN: el correo al admin se envía antes de tener el id de Resend,
    // por eso el código de hoja aparece como "TEMP_ID". Se corregirá en una fase posterior.
    await sendEmailLogic(h.reclamoValido(), ctx.admin);
    const [correoAdmin, correoCliente] = resendCtl.llamadas;
    assert.ok(correoAdmin.html.includes("TEMP_ID"));
    // El correo al cliente sí usa el id real
    assert.ok(correoCliente.html.includes(FAKE_RESEND_ID));
    assert.ok(!correoCliente.html.includes("TEMP_ID"));
  });

  test("COMPORTAMIENTO ACTUAL: los correos se envían ANTES de guardar; si Firestore falla igualmente se envían 2 correos y se lanza internal", async () => {
    // CARACTERIZACIÓN: no hay compensación. El reclamo queda notificado pero sin registro en Firestore.
    ctx.admin.falla = true;
    const err = await h.capturarError(sendEmailLogic(h.reclamoValido(), ctx.admin));
    assert.equal(err.code, "internal");
    assert.match(err.message, /^Error al procesar el reclamo: /);
    assert.equal(resendCtl.llamadas.length, 2, "ya se enviaron ambos correos antes del fallo de Firestore");
    assert.equal(ctx.admin.escrituras.length, 0);
  });

  test("COMPORTAMIENTO ACTUAL: un detalle con paréntesis '(factura 123)' es RECHAZADO con invalid-argument", async () => {
    // CARACTERIZACIÓN: la regex de Zod excluye los caracteres ( ) < > { }; un reclamo real puede
    // mencionar una factura entre paréntesis y será rechazado. Se revisará en una fase posterior.
    const err = await h.capturarError(
      sendEmailLogic(h.reclamoValido({ detalle: "Compré la ventana (factura 123) y llegó rota." }), ctx.admin)
    );
    assert.equal(err.code, "invalid-argument");
    assert.match(err.message, /detalle: Caracteres no permitidos/);
    assert.equal(resendCtl.llamadas.length, 0);
  });

  test("COMPORTAMIENTO ACTUAL: fallo del correo al cliente solo registra advertencia; se guarda y responde OK", async () => {
    // CARACTERIZACIÓN: el error del correo al cliente no se propaga; el cliente puede no recibir su constancia.
    let i = 0;
    resendCtl.respuesta = () => {
      i += 1;
      return i === 1 ? { data: { id: FAKE_RESEND_ID }, error: null } : { data: null, error: { message: "rebote simulado" } };
    };
    const r = await sendEmailLogic(h.reclamoValido(), ctx.admin);
    assert.equal(r.id, FAKE_RESEND_ID);
    assert.equal(ctx.admin.escrituras.length, 1);
  });

  test("COMPORTAMIENTO ACTUAL: el asunto del correo al admin NO escapa el nombre (solo el HTML se escapa)", async () => {
    // CARACTERIZACIÓN: el subject usa el nombre crudo.
    await sendEmailLogic(h.reclamoValido({ nombreCompleto: "Tom & Jerry" }), ctx.admin);
    assert.equal(resendCtl.llamadas[0].subject, "HOJA DE RECLAMACIÓN - RECLAMO - Tom & Jerry");
  });
});
