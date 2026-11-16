// Asigna o retira el custom claim role=admin. Es la única vía para dar acceso al panel /admin.
const { HttpsError } = require("firebase-functions/v2/https");
const { setAdminRoleInputSchema } = require("../shared/presupuesto-schema");
const { validarEntrada } = require("../guards/requireAdmin");

/**
 * @param {{ auth: object, db: object }} deps `admin.auth()` y `admin.firestore()`
 * @param {unknown} entrada `{ email, admin }`
 * @param {{ uid: string }} actor administrador que hace el cambio
 * @param {Date} [ahora]
 * @return {Promise<{ uid: string, role: "admin" | "cliente" }>}
 */
async function setAdminRole({ auth, db }, entrada, actor, ahora = new Date()) {
  const datos = validarEntrada(setAdminRoleInputSchema, entrada);

  let usuario;
  try {
    usuario = await auth.getUserByEmail(datos.email);
  } catch (error) {
    if (error && error.code === "auth/user-not-found") {
      throw new HttpsError("not-found", "No hay una cuenta registrada con ese correo.");
    }
    throw error;
  }

  if (!datos.admin && usuario.uid === actor.uid) {
    throw new HttpsError("failed-precondition", "No puede quitarse el rol de administrador a usted mismo.");
  }

  const claims = { ...(usuario.customClaims || {}) };
  if (datos.admin) claims.role = "admin";
  else delete claims.role;
  await auth.setCustomUserClaims(usuario.uid, claims);

  // Espejo informativo: las reglas y el panel solo miran el claim.
  const role = datos.admin ? "admin" : "cliente";
  await db.collection("users").doc(usuario.uid).set(
    { uid: usuario.uid, email: usuario.email || datos.email, role, updatedAt: ahora },
    { merge: true }
  );
  return { uid: usuario.uid, role };
}

module.exports = { setAdminRole };
