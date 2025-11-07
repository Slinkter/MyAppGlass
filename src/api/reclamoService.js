/**
 * @file reclamoService.js
 * @description Servicio para enviar los datos del libro de reclamaciones al backend.
 */

// 1. Obtenemos la URL de la función desde las variables de entorno de Vite.
const SUBMIT_RECLAMO_URL = import.meta.env.VITE_API_URL;



export const reclamoService = {
  /**
   * Envía un nuevo reclamo al backend.
   * @param {object} reclamoData - Los datos del formulario.
   * @returns {Promise<string>} El ID del mensaje enviado por Resend.
   */
  submitReclamo: async (reclamoData) => {
    // La función de backend ahora espera el objeto reclamoData completo.
    // Los campos 'to', 'from', 'subject' y el HTML del correo se generan en el backend.

    try {
      const response = await fetch(SUBMIT_RECLAMO_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reclamoData), // Enviar el objeto reclamoData completo
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
