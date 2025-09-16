
const {onDocumentCreated} = require("firebase-functions/v2/firestore");
const {setGlobalOptions} = require("firebase-functions/v2");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail"); // Moved this line up

// Inicializa Firebase para poder acceder a la base de datos
admin.initializeApp();

// Configura la región global para las funciones
setGlobalOptions({region: "southamerica-west1"});

// Configura la API Key de SendGrid usando Secret Manager
sgMail.setApiKey(process.env.SENDGRID_KEY);


exports.enviarCorreoReclamo = onDocumentCreated(
    {
      document: "reclamaciones/{reclamoId}",
      secrets: ["SENDGRID_KEY"], // Carga el secreto SENDGRID_KEY
    },
    async (event) => {
      const snap = event.data;
      if (!snap) {
        console.log("No hay datos asociados al evento.");
        return;
      }

      const data = snap.data();
      const reclamoId = event.params.reclamoId;

      console.log(`Iniciando envío para reclamo: ${reclamoId}`);

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>Hola ${data.nombreCompleto},</h2>
          <p>
            Hemos recibido tu <strong>${data.tipoSolicitud}</strong>
            y le hemos asignado el N° de  <strong>${reclamoId}</strong>.
          </p>
          <p>Resumen:</p>
          <ul>
            <li><strong>Tipo:</strong> ${data.tipoSolicitud}</li>
            <li><strong>Detalle:</strong> ${data.detalle}</li>
            <li><strong>Pedido:</strong> ${data.pedido}</li>
          </ul>
          <p>
            Recibirás una respuesta en un plazo no mayor a
            <strong>15 días hábiles</strong>.
          </p>
          <p>Atentamente,<br>El equipo de Glass & Aluminum Company</p>
        </div>
      `;

      const msg = {
        to: [data.email, "acueva@gyacompany.com"], // Added company email
        from: {
          name: "Glass Aluminum Company",
          email: "acueva@gyacompany.com",
        },
        subject: `Confirmación de Reclamo/Queja N° ${reclamoId}`,
        html: htmlBody,
      };

      try {
        await sgMail.send(msg);
        console.log(`Correo enviado a: ${data.email}`);
      } catch (error) {
        console.error("Error al enviar correo:", error);
        if (error.response) {
          console.error(error.response.body);
        }
      }
    },

);

