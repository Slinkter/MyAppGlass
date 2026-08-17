const { onRequest } = require("firebase-functions/v2/https");
const { FieldValue } = require("firebase-admin/firestore");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

admin.initializeApp();

const { sendEmailLogic, sendContactEmailLogic } = require("./emailSender");

// ─── Configuración de Rate Limiting ──────────────────────────────────────────
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutos
const MAX_REQUESTS_PER_WINDOW = 8; // Máximo 8 envíos por IP cada 15 min

/**
 * Rate Limiter persistido en Firestore.
 * A diferencia de un Map() en memoria, funciona correctamente en arquitecturas
 * Serverless donde Firebase puede levantar múltiples contenedores paralelos.
 * @param {FirebaseFirestore.Firestore} db
 * @param {string} ip
 * @returns {Promise<boolean>} true si se permite, false si se debe bloquear
 */
async function checkRateLimitFirestore(db, ip) {
  if (!ip || ip === "unknown") return true;

  const now = Date.now();
  const docRef = db.collection("rate_limits").doc(ip.replace(/[:.]/g, "_"));

  try {
    const doc = await docRef.get();
    const data = doc.exists ? doc.data() : { timestamps: [] };
    const validTimestamps = (data.timestamps || []).filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

    if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      return false;
    }

    // Actualizar con el nuevo timestamp (merge para no sobreescribir concurrencias)
    await docRef.set(
      {
        timestamps: [...validTimestamps, now],
        updatedAt: FieldValue.serverTimestamp(),
        ip: ip,
      },
      { merge: true }
    );

    return true;
  } catch (err) {
    // Si Firestore falla, permitir el request para no bloquear usuarios legítimos
    logger.error("RATE_LIMIT_FIRESTORE_ERROR:", err);
    return true;
  }
}

// ─── CORS: separado por entorno ───────────────────────────────────────────────
const IS_PROD = process.env.NODE_ENV === "production";
const ALLOWED_ORIGINS = IS_PROD
  ? [/gyacompany\.com$/, /gya-app-4c8a9\.web\.app$/]
  : [/gyacompany\.com$/, /gya-app-4c8a9\.web\.app$/, /localhost/];

/**
 * Función HTTP para procesar el Libro de Reclamaciones (Indecopi D.S. N° 011-2011-PCM & Ley N° 29571 / 31435).
 */
exports.submitReclamo = onRequest(
  {
    timeoutSeconds: 60,
    memory: "256MiB",
    secrets: ["RESEND_API_KEY", "ADMIN_EMAIL", "RECAPTCHA_SECRET_KEY"],
    cors: ALLOWED_ORIGINS,
  },
  async (request, response) => {
    if (request.method !== "POST") {
      response.status(405).send("Método no permitido.");
      return;
    }

    const rawIp = request.headers["x-forwarded-for"] || request.socket.remoteAddress || "unknown";
    const clientIp = typeof rawIp === "string" ? rawIp.split(",")[0].trim() : "unknown";

    const db = admin.firestore();
    const allowed = await checkRateLimitFirestore(db, clientIp);
    if (!allowed) {
      logger.warn("RATE_LIMIT_EXCEEDED: submitReclamo", { ip: clientIp });
      response.status(429).json({
        success: false,
        message: "Demasiadas solicitudes desde esta dirección. Por favor, inténtelo más tarde.",
      });
      return;
    }

    try {
      const result = await sendEmailLogic(request.body, admin, clientIp);
      response.status(200).json({ success: true, data: result });
    } catch (error) {
      logger.error("Error en submitReclamo:", error);
      response
        .status(error.code === "invalid-argument" ? 400 : error.code === "permission-denied" ? 403 : 500)
        .json({ success: false, message: error.message || "Error interno del servidor." });
    }
  }
);

/**
 * Función HTTP para procesar Contacto General y Cotizaciones.
 */
exports.submitContacto = onRequest(
  {
    timeoutSeconds: 60,
    memory: "256MiB",
    secrets: ["RESEND_API_KEY", "ADMIN_EMAIL", "RECAPTCHA_SECRET_KEY"],
    cors: ALLOWED_ORIGINS,
  },
  async (request, response) => {
    if (request.method !== "POST") {
      response.status(405).send("Método no permitido.");
      return;
    }

    const rawIp = request.headers["x-forwarded-for"] || request.socket.remoteAddress || "unknown";
    const clientIp = typeof rawIp === "string" ? rawIp.split(",")[0].trim() : "unknown";

    const db = admin.firestore();
    const allowed = await checkRateLimitFirestore(db, clientIp);
    if (!allowed) {
      logger.warn("RATE_LIMIT_EXCEEDED: submitContacto", { ip: clientIp });
      response.status(429).json({
        success: false,
        message: "Demasiadas solicitudes desde esta dirección. Por favor, inténtelo más tarde.",
      });
      return;
    }

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
        .json({ success: false, message: error.message || "Error interno del servidor." });
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
    cors: ALLOWED_ORIGINS,
  },
  async (request, response) => {
    if (request.method !== "GET" && request.method !== "POST") {
      response.status(405).send("Método no permitido.");
      return;
    }

    const { id } = request.query.id ? request.query : request.body;

    if (!id || typeof id !== "string") {
      response.status(400).json({ success: false, message: "ID de seguimiento requerido." });
      return;
    }

    try {
      const db = admin.firestore();

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
        },
      });
    } catch (error) {
      logger.error("Error en checkStatus:", error);
      response.status(500).json({ success: false, message: "Error al consultar el estado." });
    }
  }
);


