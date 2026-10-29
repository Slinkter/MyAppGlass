// Guard de rate limit persistido en Firestore (por IP y por función, con transacción).
const { FieldValue, Timestamp } = require("firebase-admin/firestore");
const logger = require("firebase-functions/logger");
const { RATE_LIMIT_TTL_HOURS } = require("../config/limits");

/**
 * Rate Limiter persistido en Firestore, atómico (lectura + escritura en una transacción).
 * Documento: rate_limits/{name}_{ipSegura}. Si Firestore falla la excepción se PROPAGA;
 * la política (fail-open / fail-closed) la decide withGuards.
 * @param {FirebaseFirestore.Firestore} db
 * @param {string} ip
 * @param {{ name: string, max: number, windowMs: number, now?: number }} options
 * @returns {Promise<boolean>} true si se permite, false si se debe bloquear
 */
async function checkRateLimitFirestore(db, ip, { name, max, windowMs, now = Date.now() }) {
  if (!ip || ip === "unknown") {
    logger.warn("RATE_LIMIT_UNKNOWN_IP", { fn: name });
    return true;
  }

  const safeIp = ip.replace(/[:.]/g, "_");
  const docRef = db.collection("rate_limits").doc(`${name}_${safeIp}`);

  return db.runTransaction(async (tx) => {
    const doc = await tx.get(docRef);
    const stored = doc.exists ? doc.data().timestamps || [] : [];
    const valid = stored.filter((ts) => now - ts < windowMs);

    if (valid.length >= max) return false;

    tx.set(docRef, {
      timestamps: [...valid, now].slice(-max),
      updatedAt: FieldValue.serverTimestamp(),
      ip,
      fn: name,
      expireAt: Timestamp.fromMillis(now + RATE_LIMIT_TTL_HOURS * 3600 * 1000),
    });
    return true;
  });
}

module.exports = { checkRateLimitFirestore };
