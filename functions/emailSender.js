const { HttpsError } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { Resend } = require("resend");
const { FieldValue } = require("firebase-admin/firestore");
const { z } = require("zod");
const { validateMathCaptcha } = require("./mathCaptchaValidator");

// ─── Schema Zod: Libro de Reclamaciones ──────────────────────────────────────
const reclamoSchema = z.object({
  nombreCompleto: z.string().min(3, "Nombre muy corto").max(120).regex(/^[^<>{}()]+$/, "Caracteres no permitidos"),
  email: z.string().email("Email inválido").max(200),
  tipoDocumento: z.enum(["DNI", "CE", "Carné de Extranjería", "PASAPORTE", "Pasaporte", "RUC"], { message: "Tipo de documento no válido" }),
  numeroDocumento: z.string().min(6).max(15).regex(/^[a-zA-Z0-9]+$/, "Número de documento inválido"),
  domicilio: z.string().min(5, "Domicilio muy corto").max(300).regex(/^[^<>{}()]+$/, "Caracteres no permitidos"),
  telefono: z.string().min(7).max(20).regex(/^\+?[0-9 \-()]+$/, "Teléfono inválido"),
  tipoSolicitud: z.enum(["Reclamo", "Queja"], { message: "Tipo de solicitud no válido" }),
  tipoBien: z.enum(["producto", "servicio"], { message: "Tipo de bien no válido" }),
  montoReclamado: z.union([z.string(), z.number()]).optional().default(0).transform((v) => Number(v || 0)).refine((n) => !isNaN(n) && n >= 0 && n <= 999999, "Monto inválido"),
  descripcionBien: z.string().min(3).max(500).regex(/^[^<>{}()]+$/, "Caracteres no permitidos"),
  detalle: z.string().min(10, "El detalle es muy corto").max(2000).regex(/^[^<>{}()]+$/, "Caracteres no permitidos"),
  pedido: z.string().min(10, "El pedido es muy corto").max(1000).regex(/^[^<>{}()]+$/, "Caracteres no permitidos"),
});

// ─── Schema Zod: Formulario de Contacto ──────────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(2, "Nombre muy corto").max(100).regex(/^[^<>{}()]+$/, "Caracteres no permitidos"),
  email: z.string().email("Email inválido").max(200),
  phone: z.string().max(20).regex(/^\+?[0-9 \-()]*$/, "Teléfono inválido").optional().default(""),
  message: z.string().min(5, "Mensaje muy corto").max(2000).regex(/^[^<>{}()]+$/, "Caracteres no permitidos"),
});

/**
 * Elimina tags HTML de un string para almacenamiento seguro.
 */
function stripHtml(str) {
  if (typeof str !== "string") return String(str ?? "");
  return str.replace(/<[^>]*>?/gm, "").trim();
}

/**
 * Construye un objeto seguro con solo los campos permitidos para Firestore (whitelist).
 * Sanitiza todos los strings eliminando tags HTML.
 */
function buildSafeReclamoPayload(data) {
  return {
    nombreCompleto: stripHtml(data.nombreCompleto),
    email: String(data.email ?? "").toLowerCase().trim(),
    tipoDocumento: stripHtml(data.tipoDocumento),
    numeroDocumento: stripHtml(data.numeroDocumento),
    domicilio: stripHtml(data.domicilio),
    telefono: stripHtml(data.telefono),
    tipoSolicitud: stripHtml(data.tipoSolicitud),
    tipoBien: stripHtml(data.tipoBien),
    montoReclamado: Number(data.montoReclamado ?? 0),
    descripcionBien: stripHtml(data.descripcionBien),
    detalle: stripHtml(data.detalle),
    pedido: stripHtml(data.pedido),
  };
}

/**
 * Construye un objeto seguro con solo los campos permitidos para Firestore (whitelist).
 * Sanitiza todos los strings eliminando tags HTML.
 */
function buildSafeContactPayload(data) {
  return {
    name: stripHtml(data.name),
    email: String(data.email ?? "").toLowerCase().trim(),
    phone: stripHtml(data.phone ?? ""),
    message: stripHtml(data.message),
  };
}

/**
 * Escapa caracteres HTML para prevenir inyecciones XSS en correos.
 */
function sanitizeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Plantilla HTML formal para el Administrador (Libro de Reclamaciones).
 */
const createAdminEmailHtml = (data, reclamoId, timestampFormatted) => `
  <div style="font-family: Arial, sans-serif; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 650px; color: #1e293b; line-height: 1.5;">
    <div style="border-bottom: 2px solid #0f172a; padding-bottom: 12px; margin-bottom: 20px;">
      <h2 style="margin: 0; color: #0f172a; font-size: 20px;">HOJA DE RECLAMACIÓN VIRTUAL</h2>
      <p style="margin: 4px 0 0 0; color: #64748b; font-size: 13px;">Razón Social: <strong>GLASS & ALUMINUM COMPANY S.A.C.</strong> | RUC: <strong>20601542407</strong></p>
      <p style="margin: 4px 0 0 0; color: #64748b; font-size: 13px;">Código de Hoja: <strong style="color: #0f172a;">${sanitizeHtml(reclamoId)}</strong> | Fecha: <strong>${timestampFormatted}</strong></p>
    </div>

    <div style="background-color: #f8fafc; padding: 12px 16px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #cc0202;">
      <p style="margin: 0; font-size: 14px; font-weight: bold; color: #0f172a;">
        Tipo de Solicitud: <span style="color: #cc0202; text-transform: uppercase;">${sanitizeHtml(data.tipoSolicitud)}</span>
      </p>
    </div>
    
    <h3 style="font-size: 14px; text-transform: uppercase; color: #475569; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 20px;">
      1. Identificación del Consumidor Reclamante
    </h3>
    <table style="width: 100%; font-size: 13px; margin-bottom: 16px;">
      <tr><td style="width: 35%; color: #64748b; padding: 4px 0;">Nombre / Razón Social:</td><td style="font-weight: 600;">${sanitizeHtml(data.nombreCompleto)}</td></tr>
      <tr><td style="color: #64748b; padding: 4px 0;">Documento:</td><td>${sanitizeHtml(data.tipoDocumento)} ${sanitizeHtml(data.numeroDocumento)}</td></tr>
      <tr><td style="color: #64748b; padding: 4px 0;">Domicilio:</td><td>${sanitizeHtml(data.domicilio)}</td></tr>
      <tr><td style="color: #64748b; padding: 4px 0;">Teléfono:</td><td>${sanitizeHtml(data.telefono)}</td></tr>
      <tr><td style="color: #64748b; padding: 4px 0;">Email:</td><td>${sanitizeHtml(data.email)}</td></tr>
    </table>

    <h3 style="font-size: 14px; text-transform: uppercase; color: #475569; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 20px;">
      2. Identificación del Bien Contratado
    </h3>
    <table style="width: 100%; font-size: 13px; margin-bottom: 16px;">
      <tr><td style="width: 35%; color: #64748b; padding: 4px 0;">Tipo de Bien:</td><td style="font-weight: 600;">${sanitizeHtml(data.tipoBien)}</td></tr>
      <tr><td style="color: #64748b; padding: 4px 0;">Monto Reclamado:</td><td>S/. ${sanitizeHtml(String(data.montoReclamado || "0.00"))}</td></tr>
      <tr><td style="color: #64748b; padding: 4px 0;">Descripción:</td><td>${sanitizeHtml(data.descripcionBien)}</td></tr>
    </table>

    <h3 style="font-size: 14px; text-transform: uppercase; color: #475569; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; margin-top: 20px;">
      3. Detalle de la Reclamación y Pedido del Consumidor
    </h3>
    <div style="background-color: #f8fafc; padding: 14px; border-radius: 6px; font-size: 13px; margin-bottom: 12px; border: 1px solid #e2e8f0;">
      <strong style="color: #0f172a;">Detalle de los hechos:</strong>
      <p style="margin: 6px 0 12px 0; white-space: pre-wrap; color: #334155;">${sanitizeHtml(data.detalle)}</p>
      <strong style="color: #0f172a;">Pedido concreto:</strong>
      <p style="margin: 6px 0 0 0; white-space: pre-wrap; color: #334155;">${sanitizeHtml(data.pedido)}</p>
    </div>

    <div style="margin-top: 24px; padding-top: 12px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8;">
      <p style="margin: 0;">Registro legal conforme a la Ley N° 29571 y D.S. N° 011-2011-PCM modificado por Ley N° 31435. Plazo legal de respuesta: 15 días hábiles improrrogables.</p>
    </div>
  </div>
`;

/**
 * Plantilla HTML oficial de copia al Consumidor (Libro de Reclamaciones).
 */
const createClientEmailHtml = (data, reclamoId, timestampFormatted) => `
  <div style="font-family: Arial, sans-serif; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 650px; color: #1e293b; line-height: 1.5;">
    <div style="border-bottom: 2px solid #cc0202; padding-bottom: 14px; margin-bottom: 20px; text-align: center;">
      <h2 style="margin: 0; color: #0f172a; font-size: 22px;">CONSTANCIA DE HOJA DE RECLAMACIÓN VIRTUAL</h2>
      <p style="margin: 6px 0 0 0; color: #475569; font-size: 13px;"><strong>GLASS & ALUMINUM COMPANY S.A.C.</strong> | RUC: <strong>20601542407</strong></p>
      <p style="margin: 2px 0 0 0; color: #64748b; font-size: 12px;">Calle Los Cedros Mz. E Lt. 7, Huertos de La Molina, Lima - Perú</p>
    </div>

    <p style="font-size: 14px;">Estimado(a) <strong>${sanitizeHtml(data.nombreCompleto)}</strong>,</p>
    <p style="font-size: 14px; color: #334155;">
      Confirmamos la recepción de su <strong>${sanitizeHtml(data.tipoSolicitud)}</strong> a través de nuestro Libro de Reclamaciones Virtual.
    </p>

    <div style="background-color: #f1f5f9; padding: 16px; border-radius: 8px; text-align: center; margin: 20px 0; border: 1px dashed #cbd5e1;">
      <p style="margin: 0; font-size: 11px; font-weight: bold; color: #64748b; letter-spacing: 0.1em; text-transform: uppercase;">CÓDIGO CORRELATIVO DE SEGUIMIENTO</p>
      <p style="margin: 6px 0 0 0; font-size: 20px; font-weight: bold; color: #cc0202; font-family: monospace;">${sanitizeHtml(reclamoId)}</p>
      <p style="margin: 4px 0 0 0; font-size: 12px; color: #64748b;">Fecha y Hora de Registro: ${timestampFormatted}</p>
    </div>

    <h3 style="font-size: 13px; text-transform: uppercase; color: #475569; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px;">Resumen del Registro</h3>
    <table style="width: 100%; font-size: 13px; margin-bottom: 16px;">
      <tr><td style="width: 35%; color: #64748b; padding: 3px 0;">Documento:</td><td>${sanitizeHtml(data.tipoDocumento)} ${sanitizeHtml(data.numeroDocumento)}</td></tr>
      <tr><td style="color: #64748b; padding: 3px 0;">Bien Contratado:</td><td>${sanitizeHtml(data.tipoBien)} - ${sanitizeHtml(data.descripcionBien)}</td></tr>
      <tr><td style="color: #64748b; padding: 3px 0;">Monto Reclamado:</td><td>S/. ${sanitizeHtml(String(data.montoReclamado || "0.00"))}</td></tr>
    </table>

    <div style="background-color: #f8fafc; padding: 14px; border-radius: 6px; font-size: 12px; margin-bottom: 16px; border: 1px solid #e2e8f0;">
      <strong style="color: #0f172a;">Detalle del ${sanitizeHtml(data.tipoSolicitud)}:</strong>
      <p style="margin: 4px 0 8px 0; color: #334155;">${sanitizeHtml(data.detalle)}</p>
      <strong style="color: #0f172a;">Pedido del Consumidor:</strong>
      <p style="margin: 4px 0 0 0; color: #334155;">${sanitizeHtml(data.pedido)}</p>
    </div>

    <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 12px 16px; border-radius: 4px; margin: 20px 0;">
      <p style="margin: 0; font-size: 12px; color: #1e3a8a; line-height: 1.4;">
        <strong>Información Legal al Consumidor (Ley N° 29571 & Ley N° 31435):</strong><br/>
        De acuerdo con la normativa vigente de protección al consumidor de Indecopi, la empresa brindará respuesta formal a su reclamo o queja en un plazo máximo e improrrogable de <strong>quince (15) días hábiles</strong> contados a partir del día siguiente de la presente notificación.
      </p>
    </div>

    <p style="font-size: 12px; color: #64748b; margin-top: 24px;">
      Atentamente,<br/>
      <strong>Área de Atención al Cliente y Cumplimiento Normativo</strong><br/>
      Glass & Aluminum Company S.A.C.
    </p>
  </div>
`;

/**
 * Plantilla HTML para notificación al Administrador (Contacto/Cotización).
 */
const createContactEmailHtml = (data, contactId, timestampFormatted) => `
  <div style="font-family: Arial, sans-serif; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 600px; color: #1e293b;">
    <div style="border-bottom: 2px solid #cc0202; padding-bottom: 10px; margin-bottom: 16px;">
      <h2 style="margin: 0; color: #0f172a; font-size: 18px;">NUEVA SOLICITUD DE CONTACTO / COTIZACIÓN</h2>
      <p style="margin: 4px 0 0 0; color: #64748b; font-size: 12px;">ID: <strong>${sanitizeHtml(contactId)}</strong> | Fecha: <strong>${timestampFormatted}</strong></p>
    </div>

    <table style="width: 100%; font-size: 13px; margin-bottom: 16px;">
      <tr><td style="width: 30%; color: #64748b; padding: 4px 0;">Nombre:</td><td style="font-weight: 600;">${sanitizeHtml(data.name)}</td></tr>
      <tr><td style="color: #64748b; padding: 4px 0;">Email:</td><td>${sanitizeHtml(data.email)}</td></tr>
      <tr><td style="color: #64748b; padding: 4px 0;">Teléfono:</td><td>${sanitizeHtml(data.phone || "No especificado")}</td></tr>
    </table>

    <div style="background-color: #f8fafc; padding: 14px; border-radius: 6px; font-size: 13px; border: 1px solid #e2e8f0;">
      <strong style="color: #0f172a;">Requerimiento / Mensaje:</strong>
      <p style="margin: 6px 0 0 0; white-space: pre-wrap; color: #334155;">${sanitizeHtml(data.message)}</p>
    </div>
  </div>
`;

/**
 * Plantilla HTML de confirmación al Cliente (Contacto/Cotización).
 */
const createContactClientEmailHtml = (data, contactId) => `
  <div style="font-family: Arial, sans-serif; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px; max-width: 600px; color: #1e293b;">
    <div style="border-bottom: 2px solid #cc0202; padding-bottom: 10px; margin-bottom: 16px; text-align: center;">
      <h2 style="margin: 0; color: #0f172a; font-size: 20px;">Hemos recibido tu solicitud</h2>
      <p style="margin: 4px 0 0 0; color: #64748b; font-size: 12px;"><strong>GLASS & ALUMINUM COMPANY S.A.C.</strong></p>
    </div>

    <p style="font-size: 14px;">Hola <strong>${sanitizeHtml(data.name)}</strong>,</p>
    <p style="font-size: 14px; color: #334155;">
      Gracias por contactar con nuestro equipo. Hemos recibido tu requerimiento y un asesor técnico se comunicará contigo en menos de 24 horas hábiles.
    </p>

    <div style="background-color: #f8fafc; padding: 14px; border-radius: 6px; text-align: center; margin: 20px 0; border: 1px solid #e2e8f0;">
      <p style="margin: 0; font-size: 11px; color: #64748b; font-weight: bold; text-transform: uppercase;">CÓDIGO DE SEGUIMIENTO</p>
      <p style="margin: 4px 0 0 0; font-size: 18px; font-weight: bold; color: #0f172a; font-family: monospace;">${sanitizeHtml(contactId)}</p>
    </div>

    <p style="font-size: 12px; color: #64748b;">
      Atentamente,<br/>
      <strong>Equipo Comercial & Proyectos</strong><br/>
      Glass & Aluminum Company S.A.C.
    </p>
  </div>
`;

/**
 * Valida de forma estricta el token de Google reCAPTCHA v3.
 * Lanza un error HttpsError si el token no existe, si falla la verificación o si el score es bajo.
 */
async function verifyRecaptcha(token, expectedAction = null) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    logger.error("MISSING_SECRET: RECAPTCHA_SECRET_KEY is not defined in Secret Manager.");
    throw new HttpsError("failed-precondition", "Configuración de seguridad del servidor incompleta.");
  }

  if (!token || typeof token !== "string" || token.trim() === "") {
    logger.warn("RECAPTCHA_MISSING_TOKEN: Request rejected due to missing recaptchaToken.");
    throw new HttpsError("permission-denied", "Validación de seguridad obligatoria no proporcionada.");
  }

  try {
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${encodeURIComponent(token.trim())}`;
    const recaptchaRes = await fetch(verificationUrl, { method: "POST" });
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success || typeof recaptchaData.score !== "number" || recaptchaData.score < 0.5) {
      logger.warn("RECAPTCHA_FAILED", {
        success: recaptchaData.success,
        score: recaptchaData.score,
        action: recaptchaData.action,
        expectedAction,
        errorCodes: recaptchaData["error-codes"],
      });
      throw new HttpsError("permission-denied", "Validación de seguridad no superada (puntuación insuficiente).");
    }

    return recaptchaData;
  } catch (err) {
    if (err instanceof HttpsError) throw err;
    logger.error("RECAPTCHA_VERIFICATION_ERROR:", err);
    throw new HttpsError("permission-denied", "No se pudo validar el token de seguridad.");
  }
}

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
 * Detección de cadenas aleatorias generadas por bots (p. ej. "DESjGMdhHribOHrqXR").
 */
function isGibberishOrSpamText(text) {
  if (!text || typeof text !== "string") return false;
  const trimmed = text.trim();
  // Palabra única de más de 14 caracteres con mezcla de mayúsculas/minúsculas sin espacios
  if (/^[A-Za-z0-9]{15,}$/.test(trimmed) && /[a-z]/.test(trimmed) && /[A-Z]/.test(trimmed)) {
    return true;
  }
  return false;
}

/**
 * Lógica de negocio para procesar y enviar el Libro de Reclamaciones.
 */
async function sendEmailLogic(reclamoData, admin, clientIp = "unknown") {
  logger.info("INIT: sendEmailLogic", { email: reclamoData.email });

  const resend = new Resend(process.env.RESEND_API_KEY);
  const db = admin.firestore();
  const ADMIN_RECIPIENT = process.env.ADMIN_EMAIL;

  if (!ADMIN_RECIPIENT) {
    logger.error("MISSING_SECRET: ADMIN_EMAIL is not defined in Secret Manager.");
    throw new HttpsError("failed-precondition", "Configuración de servidor incompleta.");
  }

  // 1. Silent Drop: Honeypot check
  if (reclamoData.middleName || reclamoData.website_hp) {
    logger.warn("BOT_BLOCKED: Honeypot filled", { email: reclamoData.email });
    return { id: "GHOST_BLOCKED", createdAt: new Date().toISOString() };
  }

  // 2. Silent Drop: Envíos sobrehumanos (< 1.8 segundos)
  if (reclamoData._ts && (Date.now() - Number(reclamoData._ts)) < 1800) {
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

/**
 * Lógica de negocio para procesar y enviar formularios de contacto y cotizaciones.
 */
async function sendContactEmailLogic(contactData, admin, clientIp = "unknown") {
  logger.info("INIT: sendContactEmailLogic", { email: contactData.email });

  const resend = new Resend(process.env.RESEND_API_KEY);
  const db = admin.firestore();
  const ADMIN_RECIPIENT = process.env.ADMIN_EMAIL;

  if (!ADMIN_RECIPIENT) {
    throw new HttpsError("failed-precondition", "Configuración de servidor incompleta.");
  }

  // 1. Silent Drop: Anti-bot Honeypot
  if (contactData.middleName || contactData.website_hp) {
    logger.warn("BOT_BLOCKED: Contact honeypot triggered", { email: contactData.email });
    return { id: "GHOST_BLOCKED", createdAt: new Date().toISOString() };
  }

  // 2. Silent Drop: Envíos sobrehumanos (< 1.8 segundos)
  if (contactData._ts && (Date.now() - Number(contactData._ts)) < 1800) {
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

module.exports = {
  sendEmailLogic,
  sendContactEmailLogic,
};
