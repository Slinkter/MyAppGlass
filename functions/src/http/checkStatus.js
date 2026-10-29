// Función HTTP: consulta pública del estado de una solicitud (Contacto o Reclamo).
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { ALLOWED_ORIGINS } = require("../config/cors");
const { withGuards } = require("../guards/withGuards");

/**
 * Función HTTP para consultar estado de una solicitud (Contacto o Reclamo).
 */
exports.checkStatus = onRequest(
  {
    timeoutSeconds: 30,
    memory: "256MiB",
    maxInstances: 10,
    cors: ALLOWED_ORIGINS,
  },
  withGuards({ name: "checkStatus", methods: ["GET", "POST"] }, async (request, response, { db }) => {
    const { id } = request.query.id ? request.query : request.body;

    if (!id || typeof id !== "string") {
      response.status(400).json({ success: false, message: "ID de seguimiento requerido." });
      return;
    }

    try {
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
      const rawName = data.nombreCompleto || data.name || "";
      // Ofuscación de PII (Ley N° 29733) para proteger la privacidad en consultas públicas
      const maskedName = rawName
        ? rawName
            .trim()
            .split(/\s+/)
            .map((part) => (part.length <= 2 ? part.charAt(0) + "*" : part.slice(0, 2) + "***"))
            .join(" ")
        : "Usuario Registrado";

      response.status(200).json({
        success: true,
        data: {
          id: doc.id,
          type,
          status: data.status || "RECIBIDO",
          createdAt: data.createdAt?.toDate?.() || data.createdAtIso || null,
          name: maskedName,
          maskedName: maskedName,
        },
      });
    } catch (error) {
      logger.error("Error en checkStatus:", error);
      response.status(500).json({ success: false, message: "Error al consultar el estado." });
    }
  })
);
