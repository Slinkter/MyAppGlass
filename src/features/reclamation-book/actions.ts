/**
 * @file actions.ts
 * @description Client-side wrapper for the reclamations service.
 * Refactored to remove "use server" for static export compatibility.
 */

import { ReclamationData, reclamationService } from "@/shared/api/reclamoService";

/**
 * Handler for the submission of the "Libro de Reclamaciones" form.
 * This encapsulates the API call, providing better security
 * and allowing for future server-side only integrations.
 *
 * @param formData - The validated complaint data.
 * @returns An object indicating success and the resulting ID, or an error message.
 */
export async function submitReclamationAction(formData: ReclamationData) {
  try {
    const id = await reclamationService.submitReclamation(formData);
    return { success: true, id };
  } catch (error: unknown) {
    console.error("Action Error [submitReclamationAction]:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Hubo un error inesperado en el servidor al procesar su reclamo."
    };
  }
}
