// Envoltorio reutilizable de handler HTTP: método permitido + IP del cliente + rate limit.
const admin = require("firebase-admin");
const logger = require("firebase-functions/logger");
const { getClientIp } = require("./clientIp");
const { checkRateLimitFirestore } = require("./rateLimit");

/**
 * @param {{ name: string, methods: string[] }} options nombre de la función (para logs) y métodos HTTP permitidos
 * @param {(request: object, response: object, ctx: { clientIp: string, db: object }) => Promise<void>} handler
 */
function withGuards({ name, methods }, handler) {
  return async (request, response) => {
    if (!methods.includes(request.method)) {
      response.status(405).send("Método no permitido.");
      return;
    }

    const clientIp = getClientIp(request);

    const db = admin.firestore();
    const allowed = await checkRateLimitFirestore(db, clientIp);
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
