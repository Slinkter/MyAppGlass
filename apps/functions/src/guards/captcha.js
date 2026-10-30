// Guard de captcha: reto matemático firmado (HMAC simple) y reCAPTCHA v3 de Google.
const { HttpsError } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Sal de integridad para el reto matemático (defensa en profundidad complementaria a reCAPTCHA v3)
const MATH_SALT = process.env.MATH_CAPTCHA_SALT || "GYA_MATH_SECURE_SALT_2026";

/**
 * Firma determinista usando Math.imul (garantiza 32-bit en todos los entornos JS).
 * DEBE SER IDÉNTICA a la implementada en src/shared/utils/mathCaptcha.ts
 */
function computeSignature(a, op, b, ts) {
  const str = `${a}${op}${b}_${ts}_${MATH_SALT}`;
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return (h >>> 0).toString(16);
}

/**
 * Valida de forma estricta la respuesta del Captcha Matemático.
 * @param {string|number} answer Respuesta dada por el usuario
 * @param {string} token Token base64 generado por el frontend
 * @returns {{ valid: boolean, message?: string }}
 */
function validateMathCaptcha(answer, token) {
  if (!token || typeof token !== "string") {
    return { valid: false, message: "Token de seguridad matemática ausente." };
  }

  if (answer === undefined || answer === null || String(answer).trim() === "") {
    return { valid: false, message: "Debes responder a la pregunta de seguridad matemática." };
  }

  try {
    const raw = Buffer.from(token, "base64").toString("utf-8");
    const { a, op, b, ts, sig } = JSON.parse(raw);

    if (typeof a !== "number" || typeof b !== "number" || (op !== "+" && op !== "-") || typeof ts !== "number" || !sig) {
      return { valid: false, message: "Estructura del token de seguridad inválida." };
    }

    // 1. Validar firma de integridad
    const expectedSig = computeSignature(a, op, b, ts);
    if (sig !== expectedSig) {
      return { valid: false, message: "Firma de seguridad matemática no válida." };
    }

    // 2. Validar expiración (máximo 15 minutos de antigüedad, y no del futuro)
    const now = Date.now();
    if (now - ts > 15 * 60 * 1000 || ts > now + 60000) {
      return { valid: false, message: "El reto de seguridad ha expirado. Por favor, intente nuevamente." };
    }

    // 3. Validar resultado de la operación
    const expectedResult = op === "+" ? a + b : a - b;
    const numericAnswer = Number(String(answer).trim());

    if (isNaN(numericAnswer) || numericAnswer !== expectedResult) {
      return { valid: false, message: "La respuesta a la pregunta matemática es incorrecta." };
    }

    return { valid: true };
  } catch (err) {
    return { valid: false, message: "Error al procesar el reto de seguridad matemática." };
  }
}

/**
 * Valida de forma estricta el token de Google reCAPTCHA v3.
 * Lanza un error HttpsError si el token no existe, si falla la verificación o si el score es bajo.
 */
async function verifyRecaptcha(token, expectedAction = null) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    logger.error("MISSING_SECRET: RECAPTCHA_SECRET_KEY is not defined in Secret Manager.");
    throw new HttpsError("failed-precondition", "Configuración de seguridad del servidor incompleta.");
  }

  if (!token || typeof token !== "string" || token.trim() === "") {
    logger.warn("RECAPTCHA_MISSING_TOKEN: Request rejected due to missing recaptchaToken.");
    throw new HttpsError("permission-denied", "Validación de seguridad obligatoria no proporcionada.");
  }

  try {
    const recaptchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: secretKey, response: token.trim() }),
      signal: AbortSignal.timeout(5000),
    });
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success || typeof recaptchaData.score !== "number" || recaptchaData.score < 0.5) {
      logger.warn("RECAPTCHA_FAILED", {
        success: recaptchaData.success,
        score: recaptchaData.score,
        action: recaptchaData.action,
        expectedAction,
        errorCodes: recaptchaData["error-codes"],
      });
      throw new HttpsError("permission-denied", "Validación de seguridad no superada (puntuación insuficiente).");
    }

    if (expectedAction && recaptchaData.action !== expectedAction) {
      logger.warn("RECAPTCHA_ACTION_MISMATCH", {
        expected: expectedAction,
        received: recaptchaData.action,
      });
      throw new HttpsError("permission-denied", "Acción de seguridad no válida para este formulario.");
    }

    return recaptchaData;
  } catch (err) {
    if (err instanceof HttpsError) throw err;
    logger.error("RECAPTCHA_VERIFICATION_ERROR:", err);
    throw new HttpsError("permission-denied", "No se pudo validar el token de seguridad.");
  }
}

module.exports = { computeSignature, validateMathCaptcha, verifyRecaptcha };
