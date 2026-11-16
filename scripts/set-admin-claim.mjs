/**
 * Asigna (o retira) el custom claim `role: 'admin'` a cuentas de Firebase Auth.
 * Es el arranque del acceso al panel /admin: la function `setAdminRole` solo la puede
 * llamar alguien que ya es admin, así que el primer admin sale de este script.
 *
 * Uso:
 *   node scripts/set-admin-claim.mjs correo1@dominio.com correo2@dominio.com            (simulación, emulador)
 *   node scripts/set-admin-claim.mjs correo@dominio.com --apply                          (emulador de Auth :9099)
 *   node scripts/set-admin-claim.mjs correo@dominio.com --apply --prod                   (producción)
 *   node scripts/set-admin-claim.mjs correo@dominio.com --apply --prod --revoke          (retira el rol)
 *
 * Producción necesita credenciales de Admin SDK: `gcloud auth application-default login`
 * o la variable GOOGLE_APPLICATION_CREDENTIALS apuntando a una cuenta de servicio.
 *
 * Después de asignar el claim, la persona debe cerrar sesión y volver a ingresar.
 * Orden de despliegue: claims → hosting → reglas (ver docs/plan-crm-presupuestos.md §7, Fase 1).
 */
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PROJECT_ID = "gya-app-4c8a9";
const PROD_WAIT_MS = 5000;

const args = process.argv.slice(2);
const flags = new Set(args.filter((a) => a.startsWith("--")));
const emails = args.filter((a) => !a.startsWith("--")).map((e) => e.trim().toLowerCase());
const isApply = flags.has("--apply");
const isProd = flags.has("--prod");
const isRevoke = flags.has("--revoke");

if (emails.length === 0) {
  console.error("Indique al menos un correo. Ejemplo: node scripts/set-admin-claim.mjs correo@dominio.com --apply");
  process.exit(1);
}

if (!isProd) {
  process.env.FIREBASE_AUTH_EMULATOR_HOST ||= "127.0.0.1:9099";
  process.env.FIRESTORE_EMULATOR_HOST ||= "127.0.0.1:8081";
}

const admin = require(path.join(ROOT_DIR, "apps", "functions", "node_modules", "firebase-admin"));
admin.initializeApp({ projectId: PROJECT_ID });

const destino = isProd ? "PRODUCCIÓN" : `emulador (${process.env.FIREBASE_AUTH_EMULATOR_HOST})`;
const accion = isRevoke ? "retirar" : "asignar";
console.log(`${isApply ? "Aplicando" : "Simulación"}: ${accion} role=admin en ${destino}`);

if (isApply && isProd) {
  console.log(`Se escribirá en producción en ${PROD_WAIT_MS / 1000} s. Ctrl+C para cancelar.`);
  await new Promise((resolve) => setTimeout(resolve, PROD_WAIT_MS));
}

let fallos = 0;
for (const email of emails) {
  try {
    const user = await admin.auth().getUserByEmail(email);
    const claims = { ...(user.customClaims || {}) };
    const yaEsAdmin = claims.role === "admin";
    if (isRevoke) delete claims.role;
    else claims.role = "admin";

    if (!isApply) {
      console.log(`  ${email}: uid ${user.uid}, hoy ${yaEsAdmin ? "es admin" : "no es admin"} → quedaría ${isRevoke ? "sin rol" : "admin"}`);
      continue;
    }
    await admin.auth().setCustomUserClaims(user.uid, claims);
    await admin
      .firestore()
      .collection("users")
      .doc(user.uid)
      .set({ uid: user.uid, email: user.email || email, role: isRevoke ? "cliente" : "admin", updatedAt: new Date() }, { merge: true });
    console.log(`  ${email}: ${isRevoke ? "rol retirado" : "ahora es admin"} (uid ${user.uid})`);
  } catch (error) {
    fallos += 1;
    const motivo = error?.code === "auth/user-not-found" ? "no tiene cuenta registrada" : error?.message || String(error);
    console.error(`  ${email}: ERROR, ${motivo}`);
  }
}

if (!isApply) console.log("No se cambió nada. Agregue --apply para aplicar.");
process.exit(fallos > 0 ? 1 : 0);
