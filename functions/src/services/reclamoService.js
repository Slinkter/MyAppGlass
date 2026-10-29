// Servicio del Libro de Reclamaciones: valida, envía correos y persiste en Firestore.
const { HttpsError } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { FieldValue } = require("firebase-admin/firestore");
const { createMailer } = require("../adapters/mailer");
const { buildSafeReclamoPayload } = require("../adapters/sanitize");
const { reclamoSchema } = require("../schemas/reclamo");
const { isGibberishOrSpamText, isHoneypotFilled, isSubmissionTooFast } = require("../guards/antiBot");
const { validateMathCaptcha, verifyRecaptcha } = require("../guards/captcha");
const { createAdminEmailHtml, createClientEmailHtml } = require("../templates/reclamoEmails");

/**
 * Valida documentos de identidad según estándares peruanos.
 */
function validateIdentityDocument(tipoDocumento, numeroDocumento) {
  if (!tipoDocumento || !numeroDocumento) {
    throw new HttpsError("invalid-argument", "El tipo y número de documento son obligatorios.");
  }
  const docNum = String(numeroDocumento).trim();
  const docType = String(tipoDocumento).trim().toUpperCase();

  if (docType === "DNI") {
    if (!/^\d{8}$/.test(docNum)) {
      throw new HttpsError("invalid-argument", "El DNI debe contener exactamente 8 dígitos numéricos.");
    }
  } else if (docType.includes("CE") || docType.includes("EXTRANJER")) {
    if (!/^[a-zA-Z0-9]{8,12}$/.test(docNum)) {
      throw new HttpsError("invalid-argument", "El Carné de Extranjería debe contener entre 8 y 12 caracteres alfanuméricos.");
    }
  } else if (docType.includes("PASAPORTE")) {
    if (!/^[a-zA-Z0-9]{6,12}$/.test(docNum)) {
      throw new HttpsError("invalid-argument", "El Pasaporte debe contener entre 6 y 12 caracteres alfanuméricos.");
    }
  } else if (docType === "RUC") {
    if (!/^(10|20|15|17)\d{9}$/.test(docNum)) {
      throw new HttpsError("invalid-argument", "El RUC debe contener 11 dígitos numéricos válidos.");
    }
  }
}

/**
 * Lógica de negocio para procesar y enviar el Libro de Reclamaciones.
 */
async function sendEmailLogic(reclamoData, admin, clientIp = "unknown") {
  logger.info("INIT: sendEmailLogic", { email: reclamoData.email });

  const resend = createMailer(process.env.RESEND_API_KEY);
  const db = admin.firestore();
  const ADMIN_RECIPIENT = process.env.ADMIN_EMAIL;

  if (!ADMIN_RECIPIENT) {
    logger.error("MISSING_SECRET: ADMIN_EMAIL is not defined in Secret Manager.");
    throw new HttpsError("failed-precondition", "Configuración de servidor incompleta.");
  }

  // 1. Silent Drop: Honeypot check
  if (isHoneypotFilled(reclamoData)) {
    logger.warn("BOT_BLOCKED: Honeypot filled", { email: reclamoData.email });
    return { id: "GHOST_BLOCKED", createdAt: new Date().toISOString() };
  }

  // 2. Silent Drop: Envíos sobrehumanos (< 1.8 segundos)
  if (isSubmissionTooFast(reclamoData)) {
    logger.warn("BOT_BLOCKED: Submission too fast", { durationMs: Date.now() - Number(reclamoData._ts) });
    return { id: "GHOST_BLOCKED", createdAt: new Date().toISOString() };
  }

  // 3. Silent Drop: Textos basura / gibberish identificados
  if (isGibberishOrSpamText(reclamoData.nombreCompleto) || isGibberishOrSpamText(reclamoData.detalle) || isGibberishOrSpamText(reclamoData.pedido)) {
    logger.warn("BOT_BLOCKED: Gibberish text detected", { name: reclamoData.nombreCompleto });
    return { id: "GHOST_BLOCKED", createdAt: new Date().toISOString() };
  }

  // 4. Validación estricta del schema Zod en el Backend (nunca confiar en el cliente)
  const parseResult = reclamoSchema.safeParse(reclamoData);
  if (!parseResult.success) {
    const issues = parseResult.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(" | ");
    logger.warn("ZOD_VALIDATION_FAILED (Reclamo):", { issues, email: reclamoData.email });
    throw new HttpsError("invalid-argument", `Datos inválidos: ${issues}`);
  }

  // 5. Verificación de Captcha Matemático (Reto Humano)
  const mathValidation = validateMathCaptcha(reclamoData.mathAnswer, reclamoData.mathToken);
  if (!mathValidation.valid) {
    logger.warn("MATH_CAPTCHA_FAILED (Reclamo):", { reason: mathValidation.message, email: reclamoData.email });
    throw new HttpsError("invalid-argument", mathValidation.message);
  }

  // 6. Verificación Obligatoria de Google reCAPTCHA v3
  await verifyRecaptcha(reclamoData.recaptchaToken, "reclamation_submit");

  // 5. Validación estricta de documentos peruanos
  validateIdentityDocument(reclamoData.tipoDocumento, reclamoData.numeroDocumento);

  // 6. Validación de campos obligatorios
  if (!reclamoData.email || !reclamoData.nombreCompleto || !reclamoData.detalle || !reclamoData.pedido) {
    throw new HttpsError("invalid-argument", "Faltan campos obligatorios para el Libro de Reclamaciones.");
  }

  const now = new Date();
  const timestampFormatted = now.toLocaleString("es-PE", { timeZone: "America/Lima" });

  try {
    // Notificación al Administrador
    const adminEmail = await resend.emails.send({
      from: "GYA Libro Reclamaciones <noreply@gyacompany.com>",
      to: ADMIN_RECIPIENT,
      subject: `HOJA DE RECLAMACIÓN - ${reclamoData.tipoSolicitud.toUpperCase()} - ${reclamoData.nombreCompleto}`,
      html: createAdminEmailHtml(reclamoData, "TEMP_ID", timestampFormatted),
    });

    if (adminEmail.error) {
      logger.error("RESEND_ADMIN_ERROR:", adminEmail.error);
      throw new Error(`Resend Admin Error: ${adminEmail.error.message}`);
    }

    const reclamoId = adminEmail.data.id;

    // Notificación y Constancia al Consumidor
    const clientEmail = await resend.emails.send({
      from: "GLASS & ALUMINUM COMPANY S.A.C. <noreply@gyacompany.com>",
      to: reclamoData.email,
      subject: `Constancia de Hoja de Reclamación - Código ${reclamoId}`,
      html: createClientEmailHtml(reclamoData, reclamoId, timestampFormatted),
    });

    if (clientEmail.error) {
      logger.warn("RESEND_CLIENT_WARNING:", clientEmail.error);
    }

    // Persistencia legal obligatoria en Firestore (mínimo 2 años)
    // Solo se guardan campos validados y sanitizados (whitelist — no raw request.body)
    const safeReclamoPayload = buildSafeReclamoPayload(reclamoData);
    await db.collection("libro_de_reclamaciones").doc(reclamoId).set({
      ...safeReclamoPayload,
      status: "RECIBIDO",
      createdAt: FieldValue.serverTimestamp(),
      createdAtIso: now.toISOString(),
      resendId: reclamoId,
      source: "PROD_WEB",
      clientIp: clientIp,
      legalRetentionUntil: new Date(now.getFullYear() + 2, now.getMonth(), now.getDate()).toISOString(),
    });

    logger.info(`SUCCESS: Reclamo registrado y persistido con ID: ${reclamoId}`);
    return { id: reclamoId, createdAt: now.toISOString() };
  } catch (error) {
    logger.error("CRITICAL_ERROR in sendEmailLogic:", error);
    throw new HttpsError("internal", `Error al procesar el reclamo: ${error.message}`);
  }
}

module.exports = { sendEmailLogic, validateIdentityDocument };
