// Guards de las functions callables: sesión con custom claim role=admin y validación Zod de la entrada.
const { HttpsError } = require("firebase-functions/v2/https");

/**
 * Exige un usuario autenticado con el custom claim `role: 'admin'`.
 * @param {{ auth?: { uid: string, token: object } }} request
 * @return {{ uid: string, email: string }}
 */
function requireAdmin(request) {
  if (!request || !request.auth) {
    throw new HttpsError("unauthenticated", "Inicie sesión para continuar.");
  }
  if (!request.auth.token || request.auth.token.role !== "admin") {
    throw new HttpsError("permission-denied", "Esta acción es solo para administradores.");
  }
  return { uid: request.auth.uid, email: request.auth.token.email || "" };
}

/**
 * Valida la entrada con un schema Zod; el primer error sale como `invalid-argument`.
 * @param {import("zod").ZodType} schema
 * @param {unknown} data
 * @return {object}
 */
function validarEntrada(schema, data) {
  const resultado = schema.safeParse(data);
  if (!resultado.success) {
    const primero = resultado.error.issues[0];
    throw new HttpsError("invalid-argument", primero ? primero.message : "Datos no válidos.");
  }
  return resultado.data;
}

module.exports = { requireAdmin, validarEntrada };
