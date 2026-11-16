// Functions callables del panel /admin: presupuestos formales y rol de administrador.
// Todas exigen sesión con custom claim role=admin (requireAdmin).
const crypto = require("node:crypto");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const { ALLOWED_ORIGINS } = require("../config/cors");
const { requireAdmin, validarEntrada } = require("../guards/requireAdmin");
const { guardarPresupuesto, cambiarEstadoPresupuesto, COL_PRESUPUESTOS } = require("../services/presupuestoService");
const { setAdminRole } = require("../services/adminRoleService");
const { generarPdfInputSchema } = require("../shared/presupuesto-schema");
const { renderPresupuestoPdf } = require("../templates/presupuestoPdf");

const OPCIONES = { timeoutSeconds: 60, memory: "256MiB", maxInstances: 10, cors: ALLOWED_ORIGINS };

/** Deja pasar los HttpsError (mensaje para el usuario) y oculta cualquier otro error. */
async function ejecutar(nombre, fn) {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof HttpsError) throw error;
    logger.error(`Error en ${nombre}:`, error);
    throw new HttpsError("internal", "No se pudo completar la operación. Inténtelo nuevamente.");
  }
}

exports.guardarPresupuesto = onCall(OPCIONES, (request) =>
  ejecutar("guardarPresupuesto", () => {
    const actor = requireAdmin(request);
    return guardarPresupuesto(admin.firestore(), request.data, actor);
  })
);

exports.cambiarEstadoPresupuesto = onCall(OPCIONES, (request) =>
  ejecutar("cambiarEstadoPresupuesto", () => {
    const actor = requireAdmin(request);
    return cambiarEstadoPresupuesto(admin.firestore(), request.data, actor);
  })
);

exports.generarPresupuestoPdf = onCall({ ...OPCIONES, memory: "512MiB" }, (request) =>
  ejecutar("generarPresupuestoPdf", async () => {
    const actor = requireAdmin(request);
    const { numero } = validarEntrada(generarPdfInputSchema, request.data);

    const db = admin.firestore();
    const ref = db.collection(COL_PRESUPUESTOS).doc(numero);
    const snap = await ref.get();
    if (!snap.exists) {
      throw new HttpsError("not-found", `No existe el presupuesto ${numero}.`);
    }
    const presupuesto = snap.data();
    const version = (presupuesto.pdf && Number(presupuesto.pdf.version) ? Number(presupuesto.pdf.version) : 0) + 1;
    const path = `presupuestos/${numero}/${numero}-v${version}.pdf`;

    const contenido = await renderPresupuestoPdf(presupuesto);
    await admin.storage().bucket().file(path).save(contenido, {
      resumable: false,
      contentType: "application/pdf",
      metadata: {
        cacheControl: "private, max-age=0",
        contentDisposition: `inline; filename="${numero}.pdf"`,
        // Token de descarga: permite que el panel obtenga el enlace con getDownloadURL.
        metadata: { firebaseStorageDownloadTokens: crypto.randomUUID() },
      },
    });

    await ref.set({ pdf: { path, version, generadoEl: new Date() }, actualizadoPor: actor.uid }, { merge: true });
    return { path, version };
  })
);

exports.setAdminRole = onCall(OPCIONES, (request) =>
  ejecutar("setAdminRole", () => {
    const actor = requireAdmin(request);
    return setAdminRole({ auth: admin.auth(), db: admin.firestore() }, request.data, actor);
  })
);
