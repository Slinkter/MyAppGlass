const { HttpsError } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { Resend } = require("resend");
const { FieldValue } = require("firebase-admin/firestore"); // NEW IMPORT

// --- Plantillas de Correo ---

/**
 * Crea  HTML del correo detallado para el administrador.
 */
const createAdminEmailHtml = (data) => `
  <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
    <h2 style="color: #333;">Nuevo Registro en el Libro de Reclamaciones</h2>
    <p>Se ha generado un nuevo ${data.tipoSolicitud} a través de la web.</p>
    
    <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 30px;">1. Datos del Consumidor</h3>
    <ul>
      <li><strong>Nombre Completo:</strong> ${data.nombreCompleto}</li>
      <li><strong>Domicilio:</strong> ${data.domicilio}</li>
      <li><strong>Email:</strong> ${data.email}</li>
      <li><strong>Teléfono:</strong> ${data.telefono}</li>
      <li><strong>Documento:</strong> ${data.tipoDocumento} - ${
  data.numeroDocumento
}</li>
      ${
        data.nombrePadreMadre
          ? `<li><strong>Padre/Madre/Tutor:</strong> ${data.nombrePadreMadre}</li>`
          : ""
      }
    </ul>

    <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 30px;">2. Datos del Bien Contratado</h3>
    <ul>
      <li><strong>Tipo de Bien:</strong> ${data.tipoBien}</li>
      <li><strong>Monto Reclamado:</strong> S/. ${
        data.montoReclamado || "No especificado"
      }</li>
      <li><strong>Descripción:</strong> ${data.descripcionBien}</li>
    </ul>

    <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 30px;">3. Detalle de la Solicitud</h3>
    <ul>
      <li><strong>Tipo de Solicitud:</strong> ${data.tipoSolicitud}</li>
      <li><strong>Detalle:</strong> <p style="white-space: pre-wrap;">${
        data.detalle
      }</p></li>
      <li><strong>Pedido:</strong> <p style="white-space: pre-wrap;">${
        data.pedido
      }</p></li>
    </ul>
  </div>
`;

/**
 * Crea HTML del correo de confirmación para el cliente.
 */
const createClientEmailHtml = (data, reclamoId) => `
  <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
    <h2 style="color: #333;">Confirmación de ${data.tipoSolicitud}</h2>
    <p>Hola ${data.nombreCompleto},</p>
    <p>Hemos recibido tu <strong>${data.tipoSolicitud}</strong> correctamente. Estamos procesando tu solicitud y te contactaremos a la brevedad.</p>
    <p>El código de seguimiento de tu solicitud es: <strong>${reclamoId}</strong></p>
    <p>Gracias por tu paciencia.</p>
    <br>
    <p>Atentamente,</p>
    <p><strong>El equipo de G&A Company</strong></p>
  </div>
`;

/**
 * Lógica de negocio para enviar los correos de reclamo.
 * @param {object} reclamoData - Los datos completos del formulario.
 * @param {object} admin - Instancia de firebase-admin.
 * @returns {Promise<string>} El ID del correo enviado al administrador.
 */
async function sendEmailLogic(reclamoData, admin) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const db = admin.firestore();

  // Validar campos obligatorios para el Libro de Reclamaciones
  const requiredFields = [
    "nombreCompleto",
    "tipoDocumento",
    "numeroDocumento",
    "domicilio",
    "email",
    "telefono",
    "tipoBien",
    "descripcionBien",
    "tipoSolicitud",
    "detalle",
    "pedido",
    "aceptaTerminos",
    "autorizaEmail",
  ];

  const missingFields = requiredFields.filter((field) => !reclamoData[field]);

  if (missingFields.length > 0) {
    logger.error(`Faltan campos obligatorios: ${missingFields.join(", ")}`);
    throw new HttpsError(
      "invalid-argument",
      `Faltan los siguientes campos obligatorios: ${missingFields.join(", ")}`
    );
  }

  // Validar consentimientos explícitos (deben ser true)
  if (
    reclamoData.aceptaTerminos !== true ||
    reclamoData.autorizaEmail !== true
  ) {
    logger.error("El usuario no aceptó los términos o no autorizó el email.");
    throw new HttpsError(
      "permission-denied",
      "Debe aceptar los términos y autorizar el envío de la respuesta por email."
    );
  }

  // --- 1. Preparar el correo para el administrador ---
  const adminEmailPayload = {
    from: "noreply@gyacompany.com", // Dominio verificado en Resend
    to: "acueva@gyacompany.com", // Tu correo
    subject: `Nuevo ${reclamoData.tipoSolicitud} de: ${reclamoData.nombreCompleto}`,
    html: createAdminEmailHtml(reclamoData),
  };

  try {
    // --- 2. Enviar PRIMERO el correo al administrador para obtener un ID ---
    logger.info(`Enviando correo de reclamo a ${adminEmailPayload.to}...`);
    const adminEmailResponse = await resend.emails.send(adminEmailPayload);
    const reclamoId = adminEmailResponse.data.id;
    logger.info(`Correo para admin enviado. ID: ${reclamoId}`);

    // --- 3. Preparar y ENVIAR el correo de confirmación al cliente ---
    const clientEmailPayload = {
      from: "noreply@gyacompany.com",
      to: reclamoData.email, // El correo del cliente
      subject: `Confirmación de tu ${reclamoData.tipoSolicitud}`,
      html: createClientEmailHtml(reclamoData, reclamoId),
    };

    logger.info(`Enviando confirmación al cliente ${clientEmailPayload.to}...`);
    await resend.emails.send(clientEmailPayload);
    logger.info(`Confirmación para cliente enviada.`);

    // --- 4. Guardar el reclamo en Firestore ---
    logger.info(`Guardando reclamo con ID: ${reclamoId} en Firestore...`);
    await db
      .collection("libro_de_reclamaciones")
      .doc(reclamoId)
      .set({
        ...reclamoData,
        reclamoId: reclamoId, // Guardamos el ID de Resend también en Firestore
        timestamp: FieldValue.serverTimestamp(), // Marca de tiempo del servidor
      });
    logger.info(`Reclamo ${reclamoId} guardado exitosamente en Firestore.`);

    // Si todo fue bien, devolvemos el ID original para el modal de éxito.
    return reclamoId;
  } catch (error) {
    logger.error(
      "Ocurrió un error durante el envío de correos o al guardar en Firestore:",
      error
    );
    throw new HttpsError(
      "internal",
      "Una de las operaciones de envío de correo o guardado en Firestore falló.",
      error
    );
  }
}

module.exports = {
  sendEmailLogic,
};
