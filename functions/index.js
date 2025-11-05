const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.submitReclamo = functions.https.onCall(async (data, context) => {
  if (!data.nombreCompleto || !data.email || !data.detalle) {
    throw new functions.https.HttpsError(
      "invalid-argument",
      "El formulario contiene campos requeridos que están vacíos."
    );
  }

  const reclamoData = data;

  try {
    const writeResult = await admin
      .firestore()
      .collection("reclamaciones")
      .add({
        ...reclamoData,
        fechaReclamo: admin.firestore.FieldValue.serverTimestamp(),
      });

    console.log(`Nuevo reclamo ${writeResult.id} creado exitosamente.`);

    // TODO: Implementar la lógica de envío de correo aquí con Resend.

    return { id: writeResult.id };

  } catch (error) {
    console.error("Error al guardar en Firestore:", error);
    throw new functions.https.HttpsError(
      "internal",
      "Ocurrió un error interno al procesar el reclamo."
    );
  }
});