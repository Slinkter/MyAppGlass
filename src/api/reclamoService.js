/**
 * @file reclamoService.js
 * @description Servicio para interactuar con la API de reclamos, específicamente para enviar
 * los datos del libro de reclamaciones al backend.
 */

// 1. Obtenemos la URL de la función desde las variables de entorno de Vite.
const SUBMIT_RECLAMO_URL = import.meta.env.VITE_API_URL;

// Importar el typedef si estuviera exportado, o definirlo aquí para claridad
/**
 * @typedef {Object} ReclamoFormData - Estructura de datos del formulario de reclamo.
 * @property {string} nombreCompleto
 * @property {string} domicilio
 * @property {string} email
 * @property {string} telefono
 * @property {string} tipoDocumento
 * @property {string} numeroDocumento
 * @property {string} nombrePadreMadre
 * @property {string} tipoBien
 * @property {string} montoReclamado
 * @property {string} descripcionBien
 * @property {string} tipoSolicitud
 * @property {string} detalle
 * @property {string} pedido
 * @property {boolean} aceptaTerminos
 * @property {boolean} autorizaEmail
 */

export const reclamoService = {
  /**
   * Envía un nuevo reclamo al backend a través de la API configurada.
   * Este método gestiona la comunicación HTTP POST y el manejo de respuestas y errores.
   *
   * @param {ReclamoFormData} reclamoData - Los datos completos del formulario de reclamo a enviar.
   * @returns {Promise<string>} Una promesa que resuelve con el ID del mensaje enviado por Resend si la solicitud es exitosa.
   * @throws {Error} Si la respuesta del servidor no es OK, o si `result.success` es falso,
   *                  o si ocurre un error durante la llamada a la función de envío de correo.
   *                  El mensaje de error proporcionará detalles sobre el fallo.
   *
   * @example
   * // Ejemplo de cómo usar submitReclamo:
   * import { reclamoService } from '@/api/reclamoService';
   *
   * async function handleSubmit() {
   *   const dataToSend = {
   *     nombreCompleto: "Jane Doe",
   *     email: "jane.doe@example.com",
   *     // ... otros campos del formulario
   *   };
   *   try {
   *     const messageId = await reclamoService.submitReclamo(dataToSend);
   *     console.log("Reclamo enviado con ID:", messageId);
   *     // Mostrar mensaje de éxito o redirigir
   *   } catch (error) {
   *     console.error("Fallo al enviar el reclamo:", error.message);
   *     // Mostrar mensaje de error al usuario
   *   }
   * }
   */
  submitReclamo: async (reclamoData) => {
    // La función de backend ahora espera el objeto reclamoData completo.
    // Los campos 'to', 'from', 'subject' y el HTML del correo se generan en el backend.

    try {
      const response = await fetch(SUBMIT_RECLAMO_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reclamoData), // Enviar el objeto reclamoData completo
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || `Error del servidor: ${response.status}`
        );
      }

      // Devolvemos el ID que nos da Resend para mostrarlo en el modal de éxito.
      return result.data.id;
    } catch (error) {
      console.error("Error al llamar la función de envío de correo: ", error);
      throw new Error(error.message || "No se pudo enviar la solicitud.");
    }
  },
};