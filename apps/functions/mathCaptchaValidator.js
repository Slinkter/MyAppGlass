// Shim de compatibilidad: re-exporta el captcha matemático (la implementación vive en src/guards/captcha.js).
const { validateMathCaptcha, computeSignature } = require("./src/guards/captcha");

module.exports = {
  validateMathCaptcha,
  computeSignature,
};
