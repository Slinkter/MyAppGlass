// Guard anti-bot: predicados de honeypot, envío sobrehumano (_ts) y texto basura.

/**
 * Detección de cadenas aleatorias generadas por bots (p. ej. "DESjGMdhHribOHrqXR").
 */
function isGibberishOrSpamText(text) {
  if (!text || typeof text !== "string") return false;
  const trimmed = text.trim();
  // Palabra única de más de 14 caracteres con mezcla de mayúsculas/minúsculas sin espacios
  if (/^[A-Za-z0-9]{15,}$/.test(trimmed) && /[a-z]/.test(trimmed) && /[A-Z]/.test(trimmed)) {
    return true;
  }
  return false;
}

/**
 * Honeypot: campos señuelo que un humano no rellena.
 */
function isHoneypotFilled(data) {
  return Boolean(data.middleName || data.website_hp);
}

/**
 * Envíos sobrehumanos (< 1.8 segundos desde el render del formulario).
 */
function isSubmissionTooFast(data) {
  return Boolean(data._ts && (Date.now() - Number(data._ts)) < 1800);
}

module.exports = { isGibberishOrSpamText, isHoneypotFilled, isSubmissionTooFast };
