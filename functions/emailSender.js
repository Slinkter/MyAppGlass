const { HttpsError } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { Resend } = require("resend");

/**
 * Lógica de negocio para enviar un correo.
 * Esta no es la función de Firebase, sino un helper modular y testeable.
 *
 * @param {object} emailData Datos del correo.
 * @param {string} emailData.to Tu correo (el destinatario).
 * @param {string} emailData.from Correo del remitente (debe ser un dominio verificado en Resend, ej: 'noreply@tudominio.com').
 * @param {string} emailData.subject Asunto del correo.
 * @param {string} emailData.html Contenido HTML del correo.
 * @returns {Promise<object>} Respuesta de la API de Resend.
 * @throws {HttpsError} Si la validación o el envío fallan.
 */
async function sendEmailLogic(emailData) {
  // Inicializamos Resend aquí, para que tenga acceso al secreto en runtime.
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { to, from, subject, html } = emailData;

  // --- Validación de Entrada ---
  if (!to || !from || !subject || !html) {
    logger.error("Error de validación: Faltan campos requeridos.", {
      to: to ? "ok" : "falta",
      from: from ? "ok" : "falta",
      subject: subject ? "ok" : "falta",
      html: html ? "ok" : "falta",
    });
    throw new HttpsError(
      "invalid-argument",
      "La función requiere los campos: to, from, subject, html."
    );
  }

  try {
    logger.info(`Intentando enviar correo de ${from} a ${to}...`);
    const { data: responseData, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    if (error) {
      logger.error(`La API de Resend devolvió un error:`, error);
      throw new HttpsError("internal", "La API de Resend no pudo enviar el correo.", error);
    }

    logger.info(`Correo enviado a ${to}. ID del mensaje: ${responseData.id}`);
    return responseData;

  } catch (error) {
    logger.error(`Error inesperado al enviar el correo a ${to}:`, error);
    if (error instanceof HttpsError) {
      throw error; // Re-lanzar errores HttpsError que ya hemos formateado.
    }
    // Envolver errores no esperados en un HttpsError estándar.
    throw new HttpsError("internal", "Ocurrió un error inesperado al procesar el envío.", error);
  }
}

module.exports = {
  sendEmailLogic,
};