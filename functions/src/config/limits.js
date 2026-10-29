// Parámetros del rate limit por IP (ventana y máximo de solicitudes).
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutos
const MAX_REQUESTS_PER_WINDOW = 8; // Máximo 8 envíos por IP cada 15 min

module.exports = { RATE_LIMIT_WINDOW_MS, MAX_REQUESTS_PER_WINDOW };
