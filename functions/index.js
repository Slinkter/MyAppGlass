const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const cors = require("cors")({ origin: true });
const admin = require("firebase-admin");

admin.initializeApp();

// Importamos la lógica modular que creamos
// Cosmetic change to force redeployment

const { sendEmailLogic } = require("./emailSender");

/**
 * Función de prueba para verificar que los despliegues funcionan.
 */
exports.helloWorldV2 = onRequest((request, response) => {
  logger.info("Hello logs!", { structuredData: true });
  response.json({
    message: "¡Hola desde Firebase!",
    timestamp: new Date().toISOString(),
  });
});

/**
 * Función HTTP para enviar un correo desde un formulario de contacto.
 */
exports.sendContactEmail = onRequest(
  // --- Opciones de Runtime ---
  {
    timeoutSeconds: 60, // Tiempo de espera
    memory: "256MiB",   // Memoria asignada
    secrets: ["RESEND_API_KEY"], // ¡Crucial! Otorga acceso al secreto
  },
  // --- Lógica de la Función ---
  (request, response) => {
    // Maneja las peticiones CORS (importante para que el frontend pueda llamar a la función)
    cors(request, response, async () => {
      // Nos aseguramos de que la petición sea de tipo POST
      if (request.method !== "POST") {
        response.status(405).json({
          success: false,
          message: "Método no permitido. Por favor, usa POST.",
        });
        return;
      }

      try {
        logger.info("Nueva petición de formulario de contacto recibida.", { body: request.body });

        // Los datos vienen del frontend en el cuerpo de la petición (request.body)
        const emailData = request.body;

        // Llamamos a nuestra lógica modular para enviar el correo
        const result = await sendEmailLogic(emailData, admin);

        response.status(200).json({
          success: true,
          message: "Correo enviado exitosamente.",
          data: result,
        });

      } catch (error) {
        logger.error("Error en la función sendContactEmail:", error);

        // El HttpsError de nuestro módulo tiene un código que podemos usar
        const statusCode = error.code === "invalid-argument" ? 400 : 500;

        response.status(statusCode).json({
          success: false,
          message: error.message,
          details: error.details || null,
        });
      }
    });
  }
);
