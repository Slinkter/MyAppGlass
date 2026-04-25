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
  // Inicializamos Resend usando la variable de entorno protegida
  const resend = new Resend(process.env.RESEND_API_KEY);
  const db = admin.firestore();
  
  // El email del admin debe estar configurado en las variables de entorno de Firebase
  // o podemos usar un fallback si es necesario para pruebas.
  const ADMIN_RECIPIENT = process.env.ADMIN_EMAIL || "gyacompany.ventas@gmail.com";

  logger.info("Validando datos del reclamo...");
  if (!reclamoData.email || !reclamoData.nombreCompleto) {
    throw new HttpsError("invalid-argument", "Faltan datos críticos del contacto.");
  }

  try {
    // 1. Enviar correo al Administrador
    logger.info(`Enviando notificación a administrador: ${ADMIN_RECIPIENT}`);
    const adminEmail = await resend.emails.send({
      from: "GYA Libro Reclamaciones <noreply@gyacompany.com>",
      to: ADMIN_RECIPIENT,
      subject: `NUEVO RECLAMO - ${reclamoData.nombreCompleto}`,
      html: createAdminEmailHtml(reclamoData),
    });

    if (adminEmail.error) throw new Error(adminEmail.error.message);
    const reclamoId = adminEmail.data.id;

    // 2. Enviar confirmación al Cliente
    logger.info(`Enviando confirmación al cliente: ${reclamoData.email}`);
    await resend.emails.send({
      from: "GYA Glass & Aluminum <noreply@gyacompany.com>",
      to: reclamoData.email,
      subject: `Confirmación de Recepción - Reclamo ${reclamoId}`,
      html: createClientEmailHtml(reclamoData, reclamoId),
    });

    // 3. Persistir en base de datos para cumplimiento legal
    logger.info(`Guardando en Firestore: ${reclamoId}`);
    await db.collection("libro_de_reclamaciones").doc(reclamoId).set({
      ...reclamoData,
      status: "RECIBIDO",
      createdAt: FieldValue.serverTimestamp(),
      resendId: reclamoId
    });

    return { id: reclamoId };
  } catch (error) {
    logger.error("Fallo en el proceso de envío/guardado:", error);
    throw new HttpsError("internal", "No se pudo procesar el reclamo. Intente nuevamente.");
  }
}

module.exports = {
  sendEmailLogic,
};
