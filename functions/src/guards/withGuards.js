// Envoltorio reutilizable de handler HTTP: método permitido + IP del cliente + rate limit por función.
const admin = require("firebase-admin");
const logger = require("firebase-functions/logger");
const { getClientIp } = require("./clientIp");
const { checkRateLimitFirestore } = require("./rateLimit");
const { RATE_LIMIT_WINDOW_MS } = require("../config/limits");

/**
 * @param {{ name: string, methods: string[], limit: number, failOpen?: boolean }} options
 *   nombre de la función (bucket y logs), métodos HTTP permitidos, máximo por ventana y política de
 *   fallo del rate limit (failOpen true: si Firestore falla se permite; false: responde 503)
 * @param {(request: object, response: object, ctx: { clientIp: string, db: object }) => Promise<void>} handler
 */
function withGuards({ name, methods, limit, failOpen = false }, handler) {
  return async (request, response) => {
    if (!methods.includes(request.method)) {
      response.status(405).send("Método no permitido.");
      return;
    }

    const clientIp = getClientIp(request);

    const db = admin.firestore();
    let allowed;
    try {
      allowed = await checkRateLimitFirestore(db, clientIp, { name, max: limit, windowMs: RATE_LIMIT_WINDOW_MS, now: Date.now() });
    } catch (err) {
      logger.error(`RATE_LIMIT_FIRESTORE_ERROR: ${name}`, err);
      if (!failOpen) {
        response.status(503).json({
          success: false,
          message: "Servicio temporalmente no disponible. Por favor, inténtelo nuevamente en unos minutos.",
        });
        return;
      }
      allowed = true;
    }

    if (!allowed) {
      logger.warn(`RATE_LIMIT_EXCEEDED: ${name}`, { ip: clientIp });
      response.status(429).json({
        success: false,
        message: "Demasiadas solicitudes desde esta dirección. Por favor, inténtelo más tarde.",
      });
      return;
    }

    await handler(request, response, { clientIp, db });
  };
}

module.exports = { withGuards };
