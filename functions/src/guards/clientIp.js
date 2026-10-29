// Guard de IP: obtiene la IP del cliente de forma resistente a la falsificación de X-Forwarded-For.
const net = require("node:net");
const { TRUSTED_PROXY_HOPS } = require("../config/limits");

/**
 * Obtiene la IP del cliente.
 *
 * SUPOSICIÓN: la función corre detrás de Cloud Run / Google Front End, que AÑADE la IP real del
 * cliente al FINAL de X-Forwarded-For (`<lo que envió el cliente>, <IP real>`). Todo lo que está
 * antes lo controla el atacante, por eso NO se usa el primer valor sino la entrada
 * `entries[entries.length - TRUSTED_PROXY_HOPS]`.
 * TRUSTED_PROXY_HOPS = 1 debe CONFIRMARSE empíricamente tras el despliegue (enviar una petición con
 * un X-Forwarded-For forjado y verificar en los logs cuál entrada coincide con la IP real).
 *
 * Función pura: acepta un objeto request mínimo `{ headers, socket }`.
 * @param {{ headers?: object, socket?: { remoteAddress?: string } }} request
 * @returns {string} IP válida o "unknown"
 */
function getClientIp(request) {
  const header = request && request.headers ? request.headers["x-forwarded-for"] : undefined;
  const raw = Array.isArray(header) ? header.join(",") : header;

  if (typeof raw === "string") {
    const entries = raw
      .split(",")
      .map((e) => e.trim())
      .filter((e) => net.isIP(e) !== 0);
    const idx = entries.length - TRUSTED_PROXY_HOPS;
    if (entries.length > 0 && idx >= 0) return entries[idx];
  }

  const remote = request && request.socket ? request.socket.remoteAddress : undefined;
  if (typeof remote === "string" && net.isIP(remote) !== 0) return remote;

  return "unknown";
}

module.exports = { getClientIp };
