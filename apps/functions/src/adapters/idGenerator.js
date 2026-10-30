// Adaptador de códigos propios de seguimiento (GYA-REC-AAAA-XXXXXX / GYA-CON-AAAA-XXXXXX).
const crypto = require("node:crypto");
const { HttpsError } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // sin 0/O/1/I
const SUFFIX_LENGTH = 6;
const MAX_ATTEMPTS = 5;

function limaYear(now) {
  return new Intl.DateTimeFormat("en-US", { timeZone: "America/Lima", year: "numeric" }).format(now);
}

/**
 * @param {"REC"|"CON"} kind
 * @param {{ now?: Date, randomInt?: (max: number) => number }} [options] reloj y aleatoriedad inyectables
 */
function generateCode(kind, { now = new Date(), randomInt = crypto.randomInt } = {}) {
  let suffix = "";
  for (let i = 0; i < SUFFIX_LENGTH; i++) suffix += ALPHABET[randomInt(ALPHABET.length)];
  return `GYA-${kind}-${limaYear(now)}-${suffix}`;
}

function isAlreadyExists(error) {
  return Boolean(error) && (error.code === 6 || error.code === "already-exists");
}

/**
 * Crea el documento con `.doc(code).create(...)` (falla si existe). Ante `already-exists`
 * regenera el código, hasta `maxAttempts` intentos. Otros errores se propagan.
 * @param {{ db: object, collection: string, kind: "REC"|"CON", buildData: (code: string) => object,
 *   now?: Date, randomInt?: Function, maxAttempts?: number }} options
 * @returns {Promise<string>} código con el que quedó guardado
 */
async function createWithUniqueCode({ db, collection, kind, buildData, now, randomInt, maxAttempts = MAX_ATTEMPTS }) {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const code = generateCode(kind, { now, randomInt });
    try {
      await db.collection(collection).doc(code).create(buildData(code));
      return code;
    } catch (error) {
      if (!isAlreadyExists(error)) throw error;
      logger.warn("ID_COLLISION", { collection, attempt });
    }
  }
  throw new HttpsError("internal", "No se pudo generar un código de seguimiento único. Por favor, inténtelo nuevamente.");
}

module.exports = { generateCode, createWithUniqueCode, ALPHABET, MAX_ATTEMPTS };
