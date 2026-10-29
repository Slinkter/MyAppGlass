// Parámetros del rate limit por IP y por función (ventana, máximos, proxies de confianza y TTL).
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutos

// Máximo de solicitudes por IP dentro de la ventana, POR FUNCIÓN (cada una tiene su propio bucket).
const RATE_LIMITS = {
  submitReclamo: 8,
  submitContacto: 8,
  checkStatus: 30,
};

// Cantidad de proxies de confianza que añaden su entrada al FINAL de X-Forwarded-For.
// Ver guards/clientIp.js: debe confirmarse empíricamente tras el despliegue.
const TRUSTED_PROXY_HOPS = 1;

// Horas de vida del documento de rate limit (campo expireAt; la política TTL se activa en la consola).
const RATE_LIMIT_TTL_HOURS = 24;

module.exports = { RATE_LIMIT_WINDOW_MS, RATE_LIMITS, TRUSTED_PROXY_HOPS, RATE_LIMIT_TTL_HOURS };
