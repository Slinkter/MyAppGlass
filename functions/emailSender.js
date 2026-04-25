const { HttpsError } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { Resend } = require("resend");
const { FieldValue } = require("firebase-admin/firestore");

/**
 * Crea HTML del correo detallado para el administrador.
 */
const createAdminEmailHtml = (data) => `
  <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 10px; max-width: 600px;">
    <h2 style="color: #18181b;">Nuevo Registro: Libro de Reclamaciones</h2>
    <p>Se ha generado una nueva solicitud de tipo: <strong>${data.tipoSolicitud}</strong></p>
    
    <h3 style="border-bottom: 2px solid #f4f4f5; padding-bottom: 5px; margin-top: 30px; color: #71717a;">1. DATOS DEL CONSUMIDOR</h3>
    <ul style="list-style: none; padding: 0;">
      <li><strong>Nombre:</strong> ${data.nombreCompleto}</li>
      <li><strong>Documento:</strong> ${data.tipoDocumento} ${data.numeroDocumento}</li>
      <li><strong>Domicilio:</strong> ${data.domicilio}</li>
      <li><strong>Email:</strong> ${data.email}</li>
      <li><strong>Teléfono:</strong> ${data.telefono}</li>
    </ul>

    <h3 style="border-bottom: 2px solid #f4f4f5; padding-bottom: 5px; margin-top: 30px; color: #71717a;">2. DETALLES DEL BIEN</h3>
    <ul style="list-style: none; padding: 0;">
      <li><strong>Tipo:</strong> ${data.tipoBien}</li>
      <li><strong>Monto:</strong> S/. ${data.montoReclamado || "0.00"}</li>
      <li><strong>Descripción:</strong> ${data.descripcionBien}</li>
    </ul>

    <h3 style="border-bottom: 2px solid #f4f4f5; padding-bottom: 5px; margin-top: 30px; color: #71717a;">3. RECLAMO / QUEJA</h3>
    <div style="background: #fafafa; padding: 15px; border-radius: 8px; margin-top: 10px;">
      <strong>Detalle:</strong><br/>
      <p style="white-space: pre-wrap;">${data.detalle}</p>
      <strong>Pedido:</strong><br/>
      <p style="white-space: pre-wrap;">${data.pedido}</p>
    </div>
  </div>
`;

/**
 * Crea HTML del correo de confirmación para el cliente.
 */
const createClientEmailHtml = (data, reclamoId) => `
  <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 10px; max-width: 600px;">
    <h2 style="color: #18181b;">Confirmación de Recepción</h2>
    <p>Hola <strong>${data.nombreCompleto}</strong>,</p>
    <p>Hemos recibido tu <strong>${data.tipoSolicitud}</strong> correctamente en GYA Company.</p>
    <div style="background: #f4f4f5; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
      <p style="margin: 0; font-size: 0.9em; color: #71717a;">CÓDIGO DE SEGUIMIENTO</p>
      <p style="margin: 5px 0 0 0; font-size: 1.5em; font-weight: bold; color: #18181b;">${reclamoId}</p>
    </div>
    <p>De acuerdo a ley, daremos respuesta a tu solicitud en un plazo no mayor a 15 días hábiles.</p>
    <br/>
    <p style="font-size: 0.9em; color: #a1a1aa;">Atentamente,<br/><strong>El equipo de GYA Glass & Aluminum</strong></p>
  </div>
`;

/**
 * Lógica de negocio para enviar correos y guardar en Firestore.
 * @param {object} reclamoData Datos del formulario.
 * @param {object} admin Instancia de firebase-admin.
 */
async function sendEmailLogic(reclamoData, admin) {
  logger.info("INIT: Iniciando sendEmailLogic", { email: reclamoData.email });
  
  // Inicializamos Resend usando la variable de entorno protegida
  const resend = new Resend(process.env.RESEND_API_KEY);
  const db = admin.firestore();
  const ADMIN_RECIPIENT = process.env.ADMIN_EMAIL;

  if (!ADMIN_RECIPIENT) {
    logger.error("MISSING_SECRET: ADMIN_EMAIL is not defined in Secret Manager.");
    throw new HttpsError("failed-precondition", "Configuración de servidor incompleta.");
  }

  logger.info("STEP 1: Validando campos obligatorios...");
  if (!reclamoData.email || !reclamoData.nombreCompleto) {
    logger.warn("VALIDATION_ERROR: Faltan datos críticos", { 
      hasEmail: !!reclamoData.email, 
      hasNombre: !!reclamoData.nombreCompleto 
    });
    throw new HttpsError("invalid-argument", "Faltan datos críticos del contacto.");
  }

  try {
    // 1. Enviar correo al Administrador
    logger.info(`STEP 2: Intentando enviar notificación a Admin: ${ADMIN_RECIPIENT}`);
    const adminEmail = await resend.emails.send({
      from: "GYA Libro Reclamaciones <noreply@gyacompany.com>",
      to: ADMIN_RECIPIENT,
      subject: `NUEVO RECLAMO - ${reclamoData.nombreCompleto}`,
      html: createAdminEmailHtml(reclamoData),
    });

    if (adminEmail.error) {
      logger.error("RESEND_ADMIN_ERROR: Falló el envío al administrador", adminEmail.error);
      throw new Error(`Resend Admin Error: ${adminEmail.error.message}`);
    }
    const reclamoId = adminEmail.data.id;
    logger.info(`SUCCESS: Correo Admin enviado. ID: ${reclamoId}`);

    // 2. Enviar confirmación al Cliente
    logger.info(`STEP 3: Intentando enviar confirmación al Cliente: ${reclamoData.email}`);
    const clientEmail = await resend.emails.send({
      from: "GYA Glass & Aluminum <noreply@gyacompany.com>",
      to: reclamoData.email,
      subject: `Confirmación de Recepción - Reclamo ${reclamoId}`,
      html: createClientEmailHtml(reclamoData, reclamoId),
    });

    if (clientEmail.error) {
      logger.warn("RESEND_CLIENT_WARNING: No se pudo enviar copia al cliente, pero el reclamo se procesará", clientEmail.error);
    } else {
      logger.info("SUCCESS: Correo Cliente enviado.");
    }

    // 3. Persistir en base de datos para cumplimiento legal
    logger.info(`STEP 4: Guardando reclamo ${reclamoId} en Firestore...`);
    await db.collection("libro_de_reclamaciones").doc(reclamoId).set({
      ...reclamoData,
      status: "RECIBIDO",
      createdAt: FieldValue.serverTimestamp(),
      resendId: reclamoId,
      source: "PROD_WEB"
    });
    logger.info("SUCCESS: Reclamo persistido en Firestore.");

    return { id: reclamoId };
  } catch (error) {
    logger.error("CRITICAL_ERROR: Fallo total en el proceso de envío/guardado", {
      message: error.message,
      stack: error.stack
    });
    throw new HttpsError("internal", `Error técnico: ${error.message}`);
  }
}

module.exports = {
  sendEmailLogic,
};
