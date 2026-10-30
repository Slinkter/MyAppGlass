// Saneamiento de texto: stripHtml, escape HTML y whitelists de payload para Firestore.

/**
 * Elimina tags HTML de un string para almacenamiento seguro.
 */
function stripHtml(str) {
  if (typeof str !== "string") return String(str ?? "");
  return str.replace(/<[^>]*>?/gm, "").trim();
}

/**
 * Construye un objeto seguro con solo los campos permitidos para Firestore (whitelist).
 * Sanitiza todos los strings eliminando tags HTML.
 */
function buildSafeReclamoPayload(data) {
  return {
    nombreCompleto: stripHtml(data.nombreCompleto),
    email: String(data.email ?? "").toLowerCase().trim(),
    tipoDocumento: stripHtml(data.tipoDocumento),
    numeroDocumento: stripHtml(data.numeroDocumento),
    domicilio: stripHtml(data.domicilio),
    telefono: stripHtml(data.telefono),
    tipoSolicitud: stripHtml(data.tipoSolicitud),
    tipoBien: stripHtml(data.tipoBien),
    montoReclamado: Number(data.montoReclamado ?? 0),
    descripcionBien: stripHtml(data.descripcionBien),
    detalle: stripHtml(data.detalle),
    pedido: stripHtml(data.pedido),
  };
}

/**
 * Construye un objeto seguro con solo los campos permitidos para Firestore (whitelist).
 * Sanitiza todos los strings eliminando tags HTML.
 */
function buildSafeContactPayload(data) {
  return {
    name: stripHtml(data.name),
    email: String(data.email ?? "").toLowerCase().trim(),
    phone: stripHtml(data.phone ?? ""),
    message: stripHtml(data.message),
  };
}

/**
 * Escapa caracteres HTML para prevenir inyecciones XSS en correos.
 */
function sanitizeHtml(str) {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

module.exports = { stripHtml, buildSafeReclamoPayload, buildSafeContactPayload, sanitizeHtml };
