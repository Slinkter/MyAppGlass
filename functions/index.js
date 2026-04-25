const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const cors = require("cors")({ origin: true });
const admin = require("firebase-admin");

admin.initializeApp();

const { sendEmailLogic, sendContactEmailLogic } = require("./emailSender");

/**
 * Función HTTP para procesar el Libro de Reclamaciones.
 */
exports.submitReclamo = onRequest(
  {
    timeoutSeconds: 60,
    memory: "256MiB",
    secrets: ["RESEND_API_KEY", "ADMIN_EMAIL"],
    cors: [/gyacompany\.com$/, /gya-app-4c8a9\.web\.app$/],
  },
  async (request, response) => {
    if (request.method !== "POST") {
      response.status(405).send("Método no permitido.");
      return;
    }

    try {
      const result = await sendEmailLogic(request.body, admin);
      response.status(200).json({ success: true, data: result });
    } catch (error) {
      logger.error("Error en submitReclamo:", error);
      response.status(error.code === "invalid-argument" ? 400 : 500).json({
        success: false,
        message: error.message || "Error interno del servidor.",
      });
    }
  }
);

/**
 * Función HTTP para procesar Contacto General.
 */
exports.submitContacto = onRequest(
  {
    timeoutSeconds: 60,
    memory: "256MiB",
    secrets: ["RESEND_API_KEY", "ADMIN_EMAIL"],
    cors: [/gyacompany\.com$/, /gya-app-4c8a9\.web\.app$/],
  },
  async (request, response) => {
    if (request.method !== "POST") {
      response.status(405).send("Método no permitido.");
      return;
    }

    try {
      const result = await sendContactEmailLogic(request.body, admin);
      response.status(200).json({
        success: true,
        message: "Consulta enviada exitosamente.",
        data: result,
      });
    } catch (error) {
      logger.error("Error en submitContacto:", error);
      response.status(error.code === "invalid-argument" ? 400 : 500).json({
        success: false,
        message: error.message || "Error interno del servidor.",
      });
    }
  }
);

/**
 * Función HTTP para consultar estado de una solicitud (Contacto o Reclamo).
 */
exports.checkStatus = onRequest(
  {
    timeoutSeconds: 30,
    memory: "256MiB",
    cors: [/gyacompany\.com$/, /gya-app-4c8a9\.web\.app$/],
  },
  async (request, response) => {
    if (request.method !== "GET" && request.method !== "POST") {
      response.status(405).send("Método no permitido.");
      return;
    }

    const { id } = request.query.id ? request.query : request.body;

    if (!id) {
      response.status(400).json({ success: false, message: "ID de seguimiento requerido." });
      return;
    }

    try {
      const db = admin.firestore();
      
      // Buscamos en ambas colecciones por si acaso
      let doc = await db.collection("contact_submissions").doc(id).get();
      let type = "Consulta de Contacto";

      if (!doc.exists) {
        doc = await db.collection("libro_de_reclamaciones").doc(id).get();
        type = "Libro de Reclamaciones";
      }

      if (!doc.exists) {
        response.status(404).json({ success: false, message: "No se encontró ninguna solicitud con ese código." });
        return;
      }

      const data = doc.data();
      response.status(200).json({
        success: true,
        data: {
          id: doc.id,
          type,
          status: data.status || "RECIBIDO",
          createdAt: data.createdAt?.toDate() || null,
          name: data.nombreCompleto || data.name,
        }
      });

    } catch (error) {
      logger.error("Error en checkStatus:", error);
      response.status(500).json({ success: false, message: "Error al consultar el estado." });
    }
  }
);
