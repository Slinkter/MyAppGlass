// Función HTTP: Libro de Reclamaciones (Indecopi D.S. N° 011-2011-PCM & Ley N° 29571 / 31435).
const { onRequest, HttpsError } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const { ALLOWED_ORIGINS } = require("../config/cors");
const { withGuards } = require("../guards/withGuards");
const { RATE_LIMITS } = require("../config/limits");
const { sendEmailLogic } = require("../services/reclamoService");

/**
 * Función HTTP para procesar el Libro de Reclamaciones (Indecopi D.S. N° 011-2011-PCM & Ley N° 29571 / 31435).
 */
exports.submitReclamo = onRequest(
  {
    timeoutSeconds: 60,
    memory: "256MiB",
    maxInstances: 10,
    secrets: ["RESEND_API_KEY", "ADMIN_EMAIL", "RECAPTCHA_SECRET_KEY"],
    cors: ALLOWED_ORIGINS,
  },
  withGuards(
    {
      name: "submitReclamo",
      methods: ["POST"],
      limit: RATE_LIMITS.submitReclamo,
      failOpen: false,
    },
    async (request, response, { clientIp }) => {
      try {
        const result = await sendEmailLogic(request.body, admin, clientIp);
        response.status(200).json({ success: true, data: result });
      } catch (error) {
        logger.error("Error en submitReclamo:", error);
        response
          .status(
            error.code === "invalid-argument"
              ? 400
              : error.code === "permission-denied"
                ? 403
                : 500,
          )
          .json({
            success: false,
            message:
              error instanceof HttpsError
                ? error.message
                : "Error interno del servidor.",
          });
      }
    },
  ),
);
