// Adaptador de correo: cliente de Resend (se instancia por llamada) y envío de las dos notificaciones.
const { Resend } = require("resend");
const logger = require("firebase-functions/logger");

function createMailer(apiKey) {
  return new Resend(apiKey);
}

/** Quita saltos de línea de un valor usado en un asunto (hardening de cabeceras). */
function cleanSubject(value) {
  return String(value).replace(/[\r\n]+/g, " ").trim();
}

async function sendOne(resend, payload) {
  const result = await resend.emails.send(payload);
  if (result.error) throw new Error(result.error.message);
  return result.data.id;
}

function toNotification(settled) {
  if (settled.status === "fulfilled") return { status: "SENT", resendId: settled.value };
  // Mensaje corto y sin PII: se enmascaran direcciones de correo y se trunca.
  const msg = String((settled.reason && settled.reason.message) || "error").replace(/\S+@\S+/g, "[email]").slice(0, 120);
  return { status: "FAILED", error: msg };
}

/**
 * Envía el correo a la empresa y al cliente en paralelo (Promise.allSettled).
 * @returns {Promise<{ admin: object, client: object }>} estado de cada notificación
 */
async function sendNotifications(resend, adminPayload, clientPayload, code) {
  const [adminRes, clientRes] = await Promise.allSettled([sendOne(resend, adminPayload), sendOne(resend, clientPayload)]);
  const admin = toNotification(adminRes);
  const client = toNotification(clientRes);
  if (admin.status === "FAILED") logger.error("EMAIL_FAILED", { code, destino: "admin" });
  if (client.status === "FAILED") logger.error("EMAIL_FAILED", { code, destino: "client" });
  return { admin, client };
}

module.exports = { createMailer, sendNotifications, cleanSubject };
