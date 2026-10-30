// Función HTTP: consulta pública del estado de una solicitud (Contacto o Reclamo).
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { ALLOWED_ORIGINS } = require("../config/cors");
const { withGuards } = require("../guards/withGuards");
const { RATE_LIMITS } = require("../config/limits");

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
  withGuards({ name: "checkStatus", methods: ["GET", "POST"], limit: RATE_LIMITS.checkStatus, failOpen: true }, async (request, response, { db }) => {
    // body/query pueden faltar (p. ej. GET sin parámetros): se evita desestructurar undefined.
    const { id } = ((request.query && request.query.id) ? request.query : request.body) || {};

    if (!id || typeof id !== "string") {
      response.status(400).json({ success: false, message: "ID de seguimiento requerido." });
      return;
    }

    // Un id con "/" o demasiado largo no puede ser un código válido (y rompería el path del documento).
    if (id.length > 200 || id.includes("/")) {
      response.status(404).json({ success: false, message: "No se encontró ninguna solicitud con ese código." });
      return;
    }

    try {
      // Acepta códigos antiguos (id de Resend) y nuevos (GYA-...): primero tal cual, luego en mayúsculas.
      const candidates = /^gya-/i.test(id) && id.toUpperCase() !== id ? [id, id.toUpperCase()] : [id];
      let doc;
      let type;
      for (const candidate of candidates) {
        doc = await db.collection("contact_submissions").doc(candidate).get();
        type = "Consulta de Contacto";
        if (!doc.exists) {
          doc = await db.collection("libro_de_reclamaciones").doc(candidate).get();
          type = "Libro de Reclamaciones";
        }
        if (doc.exists) break;
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
