// Servicio de Contacto/Cotización: valida, persiste en Firestore y luego notifica por correo.
const { HttpsError } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { FieldValue } = require("firebase-admin/firestore");
const { createMailer, sendNotifications, cleanSubject } = require("../adapters/mailer");
const { createWithUniqueCode } = require("../adapters/idGenerator");
const { buildSafeContactPayload } = require("../adapters/sanitize");
const { contactSchema } = require("../schemas/contacto");
const { isGibberishOrSpamText, isHoneypotFilled, isSubmissionTooFast } = require("../guards/antiBot");
const { validateMathCaptcha, verifyRecaptcha } = require("../guards/captcha");
const { createContactEmailHtml, createContactClientEmailHtml } = require("../templates/contactoEmails");

/**
 * Lógica de negocio para procesar y enviar formularios de contacto y cotizaciones.
 */
async function sendContactEmailLogic(contactData, admin, clientIp = "unknown") {
  logger.info("INIT: sendContactEmailLogic");

  const resend = createMailer(process.env.RESEND_API_KEY);
  const db = admin.firestore();
  const ADMIN_RECIPIENT = process.env.ADMIN_EMAIL;

  if (!ADMIN_RECIPIENT) {
    throw new HttpsError("failed-precondition", "Configuración de servidor incompleta.");
  }

  // 1. Silent Drop: Anti-bot Honeypot
  if (isHoneypotFilled(contactData)) {
    logger.warn("BOT_BLOCKED: Contact honeypot triggered");
    return { id: "GHOST_BLOCKED", createdAt: new Date().toISOString() };
  }

  // 2. Silent Drop: Envíos sobrehumanos (< 1.8 segundos)
  if (isSubmissionTooFast(contactData)) {
    logger.warn("BOT_BLOCKED: Contact submission too fast", { durationMs: Date.now() - Number(contactData._ts) });
    return { id: "GHOST_BLOCKED", createdAt: new Date().toISOString() };
  }

  // 3. Silent Drop: Textos basura / gibberish identificados
  if (isGibberishOrSpamText(contactData.name) || isGibberishOrSpamText(contactData.message)) {
    logger.warn("BOT_BLOCKED: Gibberish text detected in Contact");
    return { id: "GHOST_BLOCKED", createdAt: new Date().toISOString() };
  }

  // 4. Verificación de Captcha Matemático (Reto Humano)
  const mathValidation = validateMathCaptcha(contactData.mathAnswer, contactData.mathToken);
  if (!mathValidation.valid) {
    logger.warn("MATH_CAPTCHA_FAILED (Contacto):", { reason: mathValidation.message });
    throw new HttpsError("invalid-argument", mathValidation.message);
  }

  // 5. Verificación Obligatoria de Google reCAPTCHA v3
  await verifyRecaptcha(contactData.recaptchaToken, "contact_submit");

  // 6. Validación estricta del schema Zod en el Backend (nunca confiar en el cliente)
  const contactParseResult = contactSchema.safeParse(contactData);
  if (!contactParseResult.success) {
    const issues = contactParseResult.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(" | ");
    logger.warn("ZOD_VALIDATION_FAILED (Contacto):", { issues });
    throw new HttpsError("invalid-argument", `Datos inválidos: ${issues}`);
  }

  const now = new Date();
  const timestampFormatted = now.toLocaleString("es-PE", { timeZone: "America/Lima" });

  // 1. Persistir PRIMERO (solo campos validados y sanitizados: whitelist, no raw request.body)
  const safeContactPayload = buildSafeContactPayload(contactData);
  let code;
  try {
    code = await createWithUniqueCode({
      db,
      collection: "contact_submissions",
      kind: "CON",
      buildData: (id) => ({
        ...safeContactPayload,
        id,
        status: "RECIBIDO",
        createdAt: FieldValue.serverTimestamp(),
        createdAtIso: now.toISOString(),
        source: "PROD_WEB",
        clientIp: clientIp,
        notifications: { admin: { status: "PENDING" }, client: { status: "PENDING" } },
      }),
    });
  } catch (error) {
    logger.error("Error en sendContactEmailLogic:", error);
    if (error instanceof HttpsError) throw error;
    // El detalle técnico queda en el log; al cliente solo se le devuelve un mensaje genérico.
    throw new HttpsError("internal", "Error al procesar la consulta. Por favor, inténtelo nuevamente.");
  }

  // 2. Notificaciones en paralelo con el código real; un fallo de correo no invalida el registro.
  const notifications = await sendNotifications(
    resend,
    {
      from: "GYA Contacto <noreply@gyacompany.com>",
      to: ADMIN_RECIPIENT,
      subject: `NUEVA CONSULTA - ${cleanSubject(contactData.name)}`,
      html: createContactEmailHtml(contactData, code, timestampFormatted),
      reply_to: contactData.email,
    },
    {
      from: "GLASS & ALUMINUM COMPANY S.A.C. <noreply@gyacompany.com>",
      to: contactData.email,
      subject: `Confirmación de Recepción - Código ${code}`,
      html: createContactClientEmailHtml(contactData, code),
    },
    code
  );

  // 3. Registrar el resultado de las notificaciones; si falla solo se loguea.
  try {
    await db.collection("contact_submissions").doc(code).update({
      "notifications.admin": notifications.admin,
      "notifications.client": notifications.client,
    });
  } catch (error) {
    logger.error("NOTIFICATIONS_UPDATE_FAILED", { code, message: error.message });
  }

  return { id: code, createdAt: now.toISOString() };
}

module.exports = { sendContactEmailLogic };
