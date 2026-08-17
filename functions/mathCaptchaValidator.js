/**
 * @file mathCaptchaValidator.js
 * @description Validador de Captcha Matemático para Cloud Functions (Node.js).
 */

const MATH_SALT = "GYA_MATH_SECURE_SALT_2026";

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

module.exports = {
  validateMathCaptcha,
  computeSignature,
};
