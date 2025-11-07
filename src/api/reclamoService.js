/**
 * @file reclamoService.js
 * @description Servicio para enviar los datos del libro de reclamaciones al backend.
 */

// 1. Obtenemos la URL de la función desde las variables de entorno de Vite.
const SUBMIT_RECLAMO_URL = import.meta.env.VITE_API_URL;

/**
 * Crea un cuerpo de correo HTML a partir de los datos del formulario de reclamo.
 * @param {object} data - Los datos del formulario.
 * @returns {string} Una cadena de texto con el HTML del correo.
 */
const createEmailHtml = (data) => {
  return `
    <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
      <h2 style="color: #333;">Nuevo Registro en el Libro de Reclamaciones</h2>
      <p>Se ha generado un nuevo ${data.tipoSolicitud} a través de la web.</p>
      
      <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 30px;">1. Datos del Consumidor</h3>
      <ul>
        <li><strong>Nombre Completo:</strong> ${data.nombreCompleto}</li>
        <li><strong>Domicilio:</strong> ${data.domicilio}</li>
        <li><strong>Email:</strong> ${data.email}</li>
        <li><strong>Teléfono:</strong> ${data.telefono}</li>
        <li><strong>Documento:</strong> ${data.tipoDocumento} - ${data.numeroDocumento}</li>
        ${data.nombrePadreMadre ? `<li><strong>Padre/Madre/Tutor:</strong> ${data.nombrePadreMadre}</li>` : ''}
      </ul>

      <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 30px;">2. Datos del Bien Contratado</h3>
      <ul>
        <li><strong>Tipo de Bien:</strong> ${data.tipoBien}</li>
        <li><strong>Monto Reclamado:</strong> S/. ${data.montoReclamado || 'No especificado'}</li>
        <li><strong>Descripción:</strong> ${data.descripcionBien}</li>
      </ul>

      <h3 style="border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 30px;">3. Detalle de la Solicitud</h3>
      <ul>
        <li><strong>Tipo de Solicitud:</strong> ${data.tipoSolicitud}</li>
        <li><strong>Detalle:</strong> <p style="white-space: pre-wrap;">${data.detalle}</p></li>
        <li><strong>Pedido:</strong> <p style="white-space: pre-wrap;">${data.pedido}</p></li>
      </ul>
    </div>
  `;
};

export const reclamoService = {
  /**
   * Envía un nuevo reclamo al backend.
   * @param {object} reclamoData - Los datos del formulario.
   * @returns {Promise<string>} El ID del mensaje enviado por Resend.
   */
  submitReclamo: async (reclamoData) => {
    // 2. Creamos el cuerpo HTML con TODOS los datos del formulario.
    const emailHtml = createEmailHtml(reclamoData);

    // 3. Definimos el objeto que nuestra función de backend espera.
    const payload = {
      to: "acueva@gyacompany.com", // Correo donde recibirás los reclamos.
      from: "noreply@gyacompany.com", // Tu dominio verificado en Resend.
      subject: `Nuevo ${reclamoData.tipoSolicitud} de: ${reclamoData.nombreCompleto}`,
      html: emailHtml,
    };

    try {
      const response = await fetch(SUBMIT_RECLAMO_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || `Error del servidor: ${response.status}`);
      }

      // Devolvemos el ID que nos da Resend para mostrarlo en el modal de éxito.
      return result.data.id;

    } catch (error) {
      console.error("Error al llamar la función de envío de correo: ", error);
      throw new Error(error.message || "No se pudo enviar la solicitud.");
    }
  },
};
