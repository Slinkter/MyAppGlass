/**
 * @file actions.ts
 * @description Client-side wrapper for the reclamations service.
 * Refactored to remove "use server" for static export compatibility.
 */

import { ReclamoData, reclamoService } from "@/api/reclamoService";

/**
 * Server Action to handle the submission of the "Libro de Reclamaciones" form.
 * This encapsulates the API call on the server side, providing better security 
 * and allowing for future server-side only integrations.
 * 
 * @param formData - The validated complaint data.
 * @returns An object indicating success and the resulting ID, or an error message.
 */
export async function submitReclamoAction(formData: ReclamoData) {
  try {
    const id = await reclamoService.submitReclamo(formData);
    return { success: true, id };
  } catch (error: unknown) {
    console.error("Server Action Error [submitReclamoAction]:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Hubo un error inesperado en el servidor al procesar su reclamo." 
    };
  }
}
