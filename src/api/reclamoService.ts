/**
 * @file reclamoService.ts
 * @description Service layer for handling "Libro de Reclamaciones" (complaints book) submissions.
 * @module api
 * @remarks
 * This service directly interacts with the backend API configured via VITE_API_URL.
 * It handles raw data transformation and HTTP communication for legal compliance documents.
 */

// 1. Obtenemos la URL de la función desde las variables de entorno de Vite.
const SUBMIT_RECLAMO_URL = import.meta.env.VITE_API_URL as string;

/**
 * Estructura de datos del formulario de reclamo.
 */
export interface ReclamoData {
  nombreCompleto: string;
  domicilio: string;
  email: string;
  telefono: string;
  tipoDocumento: string;
  numeroDocumento: string;
  nombrePadreMadre: string;
  tipoBien: string;
  montoReclamado: string;
  descripcionBien: string;
  tipoSolicitud: string;
  detalle: string;
  pedido: string;
  aceptaTerminos: boolean;
  autorizaEmail: boolean;
}

/**
 * Estructura de la respuesta del servicio de reclamo.
 */
export interface ReclamoResponse {
  success: boolean;
  message?: string;
  data: {
    id: string;
  };
}

export const reclamoService = {
  /**
   * Envía un nuevo reclamo al backend a través de la API configurada.
   * Este método gestiona la comunicación HTTP POST y el manejo de respuestas y errores.
   *
   * @param reclamoData - Los datos completos del formulario de reclamo a enviar.
   * @returns Una promesa que resuelve con el ID del mensaje enviado por Resend si la solicitud es exitosa.
   * @throws Si la respuesta del servidor no es OK, o si `result.success` es falso,
   *          o si ocurre un error durante la llamada a la función de envío de correo.
   */
  submitReclamo: async (reclamoData: ReclamoData): Promise<string> => {
    try {
      const response = await fetch(SUBMIT_RECLAMO_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reclamoData),
      });

      const result: ReclamoResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || `Error del servidor: ${response.status}`,
        );
      }

      return result.data.id;
    } catch (error) {
      console.error("Error al llamar la función de envío de correo: ", error);
      const errorMessage = error instanceof Error ? error.message : "No se pudo enviar la solicitud.";
      throw new Error(errorMessage);
    }
  },
};
