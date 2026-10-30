// Función HTTP: Contacto General y Cotizaciones.
const { onRequest, HttpsError } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const { ALLOWED_ORIGINS } = require("../config/cors");
const { withGuards } = require("../guards/withGuards");
const { RATE_LIMITS } = require("../config/limits");
const { sendContactEmailLogic } = require("../services/contactoService");

/**
 * Función HTTP para procesar Contacto General y Cotizaciones.
 */
exports.submitContacto = onRequest(
  {
    timeoutSeconds: 60,
    memory: "256MiB",
    maxInstances: 10,
    secrets: ["RESEND_API_KEY", "ADMIN_EMAIL", "RECAPTCHA_SECRET_KEY"],
    cors: ALLOWED_ORIGINS,
  },
  withGuards({ name: "submitContacto", methods: ["POST"], limit: RATE_LIMITS.submitContacto, failOpen: false }, async (request, response, { clientIp }) => {
    try {
      const result = await sendContactEmailLogic(request.body, admin, clientIp);
      response.status(200).json({
        success: true,
        message: "Consulta enviada exitosamente.",
        data: result,
      });
    } catch (error) {
      logger.error("Error en submitContacto:", error);
      response
        .status(error.code === "invalid-argument" ? 400 : error.code === "permission-denied" ? 403 : 500)
        .json({ success: false, message: error instanceof HttpsError ? error.message : "Error interno del servidor." });
    }
  })
);
