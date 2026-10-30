/**
 * @file actions.ts
 * @description Client-side wrapper for the reclamations service with input sanitization and anti-bot protection.
 * Refactored to remove "use server" for static export compatibility.
 */

import { ReclamationData, reclamationService } from "@/shared/api/reclamoService";
import { sanitizeReclamationData } from "./utils/sanitizer";
import { logger } from "@/shared/utils/logger";

export interface ReclamationActionResult {
  success: boolean;
  id?: string;
  error?: string;
}

/**
 * Handler for the submission of the "Libro de Reclamaciones" form.
 * Encapsulates sanitization, honeypot validation, and backend service dispatch.
 *
 * @param formData - The complaint data to be submitted.
 * @returns An object indicating success and the resulting ID, or an error message.
 */
export async function submitReclamationAction(formData: ReclamationData): Promise<ReclamationActionResult> {
  try {
    // 1. Check honeypot field for bot protection (middleName)
    if (formData.middleName && formData.middleName.trim() !== "") {
      logger.warn("Honeypot triggered in submitReclamationAction. Submission rejected.");
      return { success: true, id: "REC-PROTECTED" };
    }

    // 2. Perform strict sanitization on all fields
    const sanitizedData = sanitizeReclamationData(formData);

    // 3. Payload validation check
    if (
      !sanitizedData.nombreCompleto ||
      !sanitizedData.email ||
      !sanitizedData.numeroDocumento ||
      !sanitizedData.detalle
    ) {
      return {
        success: false,
        error: "Los datos del formulario contienen información malformada o incompleta.",
      };
    }

    // 4. Submit sanitized data to backend service
    const id = await reclamationService.submitReclamation(sanitizedData);
    return { success: true, id };
  } catch (error: unknown) {
    logger.error("Action Error [submitReclamationAction]", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Hubo un error inesperado en el servidor al procesar su reclamo.",
    };
  }
}
