// Guard de IP: extrae la IP del cliente desde X-Forwarded-For o el socket.

/**
 * Obtiene la IP del cliente (primer valor de X-Forwarded-For, o remoteAddress).
 */
function getClientIp(request) {
  const rawIp = request.headers["x-forwarded-for"] || request.socket.remoteAddress || "unknown";
  const clientIp = typeof rawIp === "string" ? rawIp.split(",")[0].trim() : "unknown";
  return clientIp;
}

module.exports = { getClientIp };
