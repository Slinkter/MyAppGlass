import { env } from "@/shared/config/env";

/**
 * @file reclamoService.ts
 * @description Service layer for handling "Libro de Reclamaciones" (complaints book) submissions.
 * @module api
 * @remarks
 * This service directly interacts with the backend API configured via NEXT_PUBLIC_API_URL.
 * It handles raw data transformation and HTTP communication for legal compliance documents.
 */

/**
 * Data structure for the reclamation form.
 */
export interface ReclamationData {
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
 * Response structure from the reclamation service.
 */
export interface ReclamationResponse {
  success: boolean;
  message?: string;
  data: {
    id: string;
  };
}

export const reclamationService = {
  /**
   * Sends a new reclamation to the backend via the configured API.
   * This method manages HTTP POST communication and handles responses and errors.
   *
   * @param reclamationData - The complete data from the reclamation form.
   * @returns A promise that resolves with the ID of the submitted request.
   * @throws If the server response is not OK, or if `result.success` is false.
   */
  submitReclamation: async (reclamationData: ReclamationData): Promise<string> => {
    try {
      const response = await fetch(env.NEXT_PUBLIC_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reclamationData),
      });

      const result: ReclamationResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || `Server error: ${response.status}`,
        );
      }

      return result.data.id;
    } catch (error) {
      console.error("Error calling the reclamation submission service: ", error);
      const errorMessage = error instanceof Error ? error.message : "Could not send request.";
      throw new Error(errorMessage);
    }
  },
};
