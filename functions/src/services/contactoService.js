// Servicio de Contacto/Cotización: valida, envía correos y persiste en Firestore.
const { HttpsError } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { FieldValue } = require("firebase-admin/firestore");
const { createMailer } = require("../adapters/mailer");
const { buildSafeContactPayload } = require("../adapters/sanitize");
const { contactSchema } = require("../schemas/contacto");
const { isGibberishOrSpamText, isHoneypotFilled, isSubmissionTooFast } = require("../guards/antiBot");
const { validateMathCaptcha, verifyRecaptcha } = require("../guards/captcha");
const { createContactEmailHtml, createContactClientEmailHtml } = require("../templates/contactoEmails");

/**
 * Lógica de negocio para procesar y enviar formularios de contacto y cotizaciones.
 */
async function sendContactEmailLogic(contactData, admin, clientIp = "unknown") {
  logger.info("INIT: sendContactEmailLogic", { email: contactData.email });

  const resend = createMailer(process.env.RESEND_API_KEY);
  const db = admin.firestore();
  const ADMIN_RECIPIENT = process.env.ADMIN_EMAIL;

  if (!ADMIN_RECIPIENT) {
    throw new HttpsError("failed-precondition", "Configuración de servidor incompleta.");
  }

  // 1. Silent Drop: Anti-bot Honeypot
  if (isHoneypotFilled(contactData)) {
    logger.warn("BOT_BLOCKED: Contact honeypot triggered", { email: contactData.email });
    return { id: "GHOST_BLOCKED", createdAt: new Date().toISOString() };
  }

  // 2. Silent Drop: Envíos sobrehumanos (< 1.8 segundos)
  if (isSubmissionTooFast(contactData)) {
    logger.warn("BOT_BLOCKED: Contact submission too fast", { durationMs: Date.now() - Number(contactData._ts) });
    return { id: "GHOST_BLOCKED", createdAt: new Date().toISOString() };
  }

  // 3. Silent Drop: Textos basura / gibberish identificados
  if (isGibberishOrSpamText(contactData.name) || isGibberishOrSpamText(contactData.message)) {
    logger.warn("BOT_BLOCKED: Gibberish text detected in Contact", { name: contactData.name });
    return { id: "GHOST_BLOCKED", createdAt: new Date().toISOString() };
  }

  // 4. Verificación de Captcha Matemático (Reto Humano)
  const mathValidation = validateMathCaptcha(contactData.mathAnswer, contactData.mathToken);
  if (!mathValidation.valid) {
    logger.warn("MATH_CAPTCHA_FAILED (Contacto):", { reason: mathValidation.message, email: contactData.email });
    throw new HttpsError("invalid-argument", mathValidation.message);
  }

  // 5. Verificación Obligatoria de Google reCAPTCHA v3
  await verifyRecaptcha(contactData.recaptchaToken, "contact_submit");

  // 6. Validación estricta del schema Zod en el Backend (nunca confiar en el cliente)
  const contactParseResult = contactSchema.safeParse(contactData);
  if (!contactParseResult.success) {
    const issues = contactParseResult.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(" | ");
    logger.warn("ZOD_VALIDATION_FAILED (Contacto):", { issues, email: contactData.email });
    throw new HttpsError("invalid-argument", `Datos inválidos: ${issues}`);
  }

  const now = new Date();
  const timestampFormatted = now.toLocaleString("es-PE", { timeZone: "America/Lima" });

  try {
    const adminEmail = await resend.emails.send({
      from: "GYA Contacto <noreply@gyacompany.com>",
      to: ADMIN_RECIPIENT,
      subject: `NUEVA CONSULTA - ${contactData.name}`,
      html: createContactEmailHtml(contactData, "TEMP_ID", timestampFormatted),
      reply_to: contactData.email,
    });

    if (adminEmail.error) throw new Error(adminEmail.error.message);
    const contactId = adminEmail.data.id;

    const clientEmail = await resend.emails.send({
      from: "GLASS & ALUMINUM COMPANY S.A.C. <noreply@gyacompany.com>",
      to: contactData.email,
      subject: `Confirmación de Recepción - Código ${contactId}`,
      html: createContactClientEmailHtml(contactData, contactId),
    });

    if (clientEmail.error) {
      logger.warn("RESEND_CLIENT_WARNING (Contacto):", clientEmail.error);
    }

    // Solo se guardan campos validados y sanitizados (whitelist — no raw request.body)
    const safeContactPayload = buildSafeContactPayload(contactData);
    await db.collection("contact_submissions").doc(contactId).set({
      ...safeContactPayload,
      status: "RECIBIDO",
      createdAt: FieldValue.serverTimestamp(),
      createdAtIso: now.toISOString(),
      resendId: contactId,
      source: "PROD_WEB",
      clientIp: clientIp,
    });

    return { id: contactId, createdAt: now.toISOString() };
  } catch (error) {
    logger.error("Error en sendContactEmailLogic:", error);
    throw new HttpsError("internal", error.message);
  }
}

module.exports = { sendContactEmailLogic };
