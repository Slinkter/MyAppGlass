const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const cors = require("cors")({ origin: true });
const admin = require("firebase-admin");

admin.initializeApp();

const { sendEmailLogic } = require("./emailSender");

/**
 * Función HTTP para procesar el Libro de Reclamaciones.
 */
exports.submitReclamo = onRequest(
  {
    timeoutSeconds: 60,
    memory: "256MiB",
    secrets: ["RESEND_API_KEY", "ADMIN_EMAIL"],
    cors: [/gyacompany\.com$/, /gya-app-4c8a9\.web\.app$/], // Dominios permitidos (regex)
  },
  async (request, response) => {
    // Las funciones v2 con cors: [...] manejan el preflight automáticamente.
    // Solo validamos que sea POST para la lógica de negocio.
    if (request.method !== "POST") {
      response.status(405).send("Método no permitido.");
      return;
    }

    try {
      logger.info("Procesando nuevo reclamo desde origen permitido...");
      const data = request.body;

      // Ejecutar lógica de negocio modular
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
  }
);
