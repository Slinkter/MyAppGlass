// Guard de rate limit persistido en Firestore (por IP).
const { FieldValue } = require("firebase-admin/firestore");
const logger = require("firebase-functions/logger");
const { RATE_LIMIT_WINDOW_MS, MAX_REQUESTS_PER_WINDOW } = require("../config/limits");

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

module.exports = { checkRateLimitFirestore };
