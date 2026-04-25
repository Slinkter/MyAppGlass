const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const cors = require("cors")({ origin: true });
const admin = require("firebase-admin");

admin.initializeApp();

const { sendEmailLogic } = require("./emailSender");

/**
 * Función HTTP para procesar el Libro de Reclamaciones.
 * Expuesta en el endpoint configurado en el frontend.
 */
exports.submitReclamo = onRequest(
  {
    timeoutSeconds: 60,
    memory: "256MiB",
    secrets: ["RESEND_API_KEY", "ADMIN_EMAIL"], // Secretos inyectados desde Firebase Console
    cors: true, // Habilita CORS nativo en v2
  },
  (request, response) => {
    cors(request, response, async () => {
      // Solo aceptamos POST para protección de datos
      if (request.method !== "POST") {
        response.status(405).json({
          success: false,
          message: "Método no permitido.",
        });
        return;
      }

      try {
        logger.info("Procesando nuevo reclamo...");
        const data = request.body;

        // Ejecutar lógica de negocio
        const result = await sendEmailLogic(data, admin);

        response.status(200).json({
          success: true,
          message: "Reclamo procesado y enviado exitosamente.",
          data: result,
        });

      } catch (error) {
        logger.error("Error crítico en submitReclamo:", error);
        
        const statusCode = error.code === "invalid-argument" ? 400 : 500;
        response.status(statusCode).json({
          success: false,
          message: error.message || "Error interno del servidor.",
        });
      }
    });
  }
);
