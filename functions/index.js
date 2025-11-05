const functions = require("firebase-functions");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin"); // Necesario para Firestore

// Inicializar el SDK de Admin (necesario para interactuar con Firestore)
admin.initializeApp();
const db = admin.firestore();

// 1. Cargar la clave de Resend de forma segura desde las variables de entorno
// (La configuraste con: firebase functions:config:set resend.apikey="TU_CLAVE...")
const RESEND_API_KEY = functions.config().resend.apikey;

// --- Configuración de Correo ---
// IMPORTANTE: Estas direcciones DEBEN estar verificadas en tu panel de Resend
const EMAIL_REMITENTE_VERIFICADO = "acueva@gyacompany.com";
const EMAIL_ADMIN_NOTIFICACIONES = "acueva@gyacompany.com";
const NOMBRE_REMITENTE = "Libro de Reclamaciones GYA";

// 2. Configurar el transportador de Nodemailer (Conexión a Resend)
const transporter = nodemailer.createTransport({
    host: "smtp.resend.com", // Servidor SMTP de Resend
    port: 465, // Puerto seguro
    secure: true, // Usa SSL/TLS
    auth: {
        user: "resend", // El nombre de usuario SMTP es siempre "resend"
        pass: RESEND_API_KEY, // Tu clave API de Resend actúa como la contraseña
    },
});

/**
 * @function submitReclamo
 * @description Cloud Function Invocable (onCall) que:
 * 1. Valida los datos recibidos de React.
 * 2. Guarda el reclamo en la colección "reclamaciones" de Firestore.
 * 3. Envía un correo de confirmación (vía Resend) al cliente y al administrador.
 * @param {object} formData - Todos los datos del formulario (ej. formData.nombreCompleto).
 * @returns {object} - Objeto con el ID del reclamo (ej. { success: true, reclamoId: "..." })
 */
exports.submitReclamo = functions.https.onCall(async (formData, context) => {
    // Validación de datos mínimos (ajusta según los campos de tu formulario)
    if (
        !formData.nombreCompleto ||
        !formData.email ||
        !formData.detalle ||
        !formData.tipoSolicitud
    ) {
        throw new functions.https.HttpsError(
            "invalid-argument",
            "Faltan datos esenciales (nombre, email, detalle o tipo de solicitud)."
        );
    }

    let reclamoId = null;

    try {
        // --- PASO 1: GUARDAR EL DOCUMENTO EN FIRESTORE ---

        const refReclamos = db.collection("reclamaciones");
        const docRef = await refReclamos.add({
            ...formData, // Guarda todos los datos del formulario
            fechaReclamo: admin.firestore.FieldValue.serverTimestamp(), // Agrega la fecha del servidor
            estado: "Pendiente", // Estado inicial
        });

        reclamoId = docRef.id;
        functions.logger.log(
            `Reclamo ${reclamoId} guardado exitosamente en Firestore.`
        );

        // --- PASO 2: ENVIAR CORREO DE CONFIRMACIÓN (Usando Resend) ---

        const htmlBody = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <h2 style="color: #D9304F;">Confirmación de Recepción - N° ${reclamoId}</h2>
              <p>
                Estimado(a) <strong>${formData.nombreCompleto}</strong>,
              </p>
              <p>
                Hemos recibido tu <strong>${formData.tipoSolicitud}</strong>
                y le hemos asignado el N° de seguimiento <strong>${reclamoId}</strong>.
              </p>
              
              <div style="background-color: #f9f9f9; border-left: 4px solid #D9304F; padding: 15px; margin: 20px 0;">
                <h4 style="margin-top: 0;">Detalle de tu Solicitud:</h4>
                <p><strong>Tipo:</strong> ${formData.tipoSolicitud}</p>
                <p><strong>Detalle:</strong> ${formData.detalle}</p>
                <p><strong>Pedido:</strong> ${formData.pedido}</p>
              </div>
              
              <p style="margin-top: 20px;">
                Recibirás una respuesta formal en un plazo no mayor a
                <strong>15 días hábiles</strong>.
              </p>
              <p style="font-size: 0.9em; color: #777;">
                Atentamente,<br>El equipo de Glass & Aluminum Company
              </p>
            </div>
        `;

        const mailOptions = {
            from: `${NOMBRE_REMITENTE} <${EMAIL_REMITENTE_VERIFICADO}>`,
            // Enviar copia al cliente Y al administrador
            to: [formData.email, EMAIL_ADMIN_NOTIFICACIONES],
            subject: `CONFIRMACIÓN: ${formData.tipoSolicitud} N° ${reclamoId}`,
            html: htmlBody,
        };

        const info = await transporter.sendMail(mailOptions);
        functions.logger.log(
            `Correo para Reclamo N° ${reclamoId} enviado exitosamente.`,
            info.messageId
        );

        // --- PASO 3: RETORNO DE ÉXITO AL CLIENTE (REACT) ---
        // Devuelve el ID del reclamo al frontend
        return {
            success: true,
            reclamoId: reclamoId,
            message: "Reclamo guardado y correo de notificación enviado.",
        };
    } catch (error) {
        functions.logger.error("Error FATAL en submitReclamo:", error);

        const msg = reclamoId
            ? `Reclamo N° ${reclamoId} guardado, pero falló el envío del correo.`
            : "Fallo al guardar el reclamo en Firestore.";

        // Devuelve un error que el frontend de React pueda manejar
        throw new functions.https.HttpsError("internal", msg, error.message);
    }
});
