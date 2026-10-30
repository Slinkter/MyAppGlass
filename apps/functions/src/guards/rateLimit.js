// Guard de rate limit persistido en Firestore (por IP y por función, con transacción).
const { FieldValue, Timestamp } = require("firebase-admin/firestore");
const logger = require("firebase-functions/logger");
const { RATE_LIMIT_TTL_HOURS } = require("../config/limits");

/**
 * Expande una IPv6 (sin zona) a 8 grupos de 16 bits. Devuelve null si no es válida.
 * Acepta la forma comprimida "::" y un sufijo IPv4 incrustado (p. ej. ::ffff:1.2.3.4).
 * @param {string} addr
 * @returns {number[]|null}
 */
function expandIPv6(addr) {
  let text = addr;
  const v4 = text.match(/^(.*:)(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (v4) {
    const o = v4.slice(2).map(Number);
    if (o.some((n) => n > 255)) return null;
    text = `${v4[1]}${((o[0] << 8) | o[1]).toString(16)}:${((o[2] << 8) | o[3]).toString(16)}`;
  }

  const halves = text.split("::");
  if (halves.length > 2) return null;
  const parse = (part) => (part === "" ? [] : part.split(":"));
  const head = parse(halves[0]);
  const tail = halves.length === 2 ? parse(halves[1]) : [];
  const missing = 8 - head.length - tail.length;
  if (halves.length === 2 ? missing < 1 : missing !== 0) return null;

  const groups = [...head, ...Array(halves.length === 2 ? missing : 0).fill("0"), ...tail];
  if (groups.length !== 8 || !groups.every((g) => /^[0-9a-f]{1,4}$/.test(g))) return null;
  return groups.map((g) => parseInt(g, 16));
}

/**
 * Calcula la clave de rate limit a partir de la IP (solo [0-9a-z_]).
 * - IPv4: octetos separados por "_".
 * - IPv4 mapeada en IPv6 (::ffff:a.b.c.d): se trata como la IPv4.
 * - IPv6: prefijo /64 (4 primeros grupos de 4 hex en minúsculas): v6_xxxx_xxxx_xxxx_xxxx.
 * @param {string} ip
 * @returns {string}
 */
function rateLimitKey(ip) {
  const text = String(ip).trim().toLowerCase().split("%")[0];

  if (/^\d{1,3}(\.\d{1,3}){3}$/.test(text)) return text.replace(/\./g, "_");

  if (text.includes(":")) {
    const groups = expandIPv6(text);
    if (groups) {
      if (groups.slice(0, 5).every((g) => g === 0) && groups[5] === 0xffff) {
        return [groups[6] >> 8, groups[6] & 255, groups[7] >> 8, groups[7] & 255].join("_");
      }
      const hex = groups.slice(0, 4).map((g) => g.toString(16).padStart(4, "0"));
      return `v6_${hex.join("_")}`;
    }
  }

  // Entrada no reconocida: se sanea para que el id del documento sea siempre seguro.
  return `raw_${text.replace(/[^0-9a-z]/g, "_")}`;
}

/**
 * Rate Limiter persistido en Firestore, atómico (lectura + escritura en una transacción).
 * Documento: rate_limits/{name}_{rateLimitKey(ip)}. Si Firestore falla la excepción se PROPAGA;
 * la política (fail-open / fail-closed) la decide withGuards.
 * @param {FirebaseFirestore.Firestore} db
 * @param {string} ip
 * @param {{ name: string, max: number, windowMs: number, now?: number }} options
 * @returns {Promise<boolean>} true si se permite, false si se debe bloquear
 */
async function checkRateLimitFirestore(db, ip, { name, max, windowMs, now = Date.now() }) {
  if (!ip || ip === "unknown") {
    logger.warn("RATE_LIMIT_UNKNOWN_IP", { fn: name });
    return true;
  }

  const docRef = db.collection("rate_limits").doc(`${name}_${rateLimitKey(ip)}`);

  return db.runTransaction(async (tx) => {
    const doc = await tx.get(docRef);
    const stored = doc.exists ? doc.data().timestamps || [] : [];
    const valid = stored.filter((ts) => now - ts < windowMs);

    if (valid.length >= max) return false;

    tx.set(docRef, {
      timestamps: [...valid, now].slice(-max),
      updatedAt: FieldValue.serverTimestamp(),
      ip,
      fn: name,
      expireAt: Timestamp.fromMillis(now + RATE_LIMIT_TTL_HOURS * 3600 * 1000),
    });
    return true;
  });
}

module.exports = { checkRateLimitFirestore, rateLimitKey };
