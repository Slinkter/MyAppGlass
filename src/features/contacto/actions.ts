import { env } from "@/shared/config/env";

/**
 * @file actions.ts
 * @description Client-side actions for the contact feature.
 */

export interface ContactData {
  name: string;
  email: string;
  message: string;
  acceptedTerms?: boolean;
  hp_confirm?: string;
  _ts?: number;
}

/**
 * Sends a contact inquiry to the Firebase Functions backend.
 */
export async function submitContactAction(formData: ContactData) {
  try {
    // Anti-Bot Protection: Honeypot check
    if (formData.hp_confirm && formData.hp_confirm.trim() !== "") {
      console.warn("Honeypot triggered in submitContactAction. Rejected.");
      return { success: true, id: "CNT-PROTECTED" };
    }

    // Minimum load time protection (bots submit in under 1.5 seconds)
    if (formData._ts && Date.now() - formData._ts < 1500) {
      console.warn("Bot detected by fast submission time (< 1.5s). Rejected.");
      return { success: true, id: "CNT-PROTECTED" };
    }

    const sanitizedData = {
      name: formData.name.replace(/<[^>]*>?/gm, "").trim(),
      email: formData.email.toLowerCase().trim(),
      message: formData.message.replace(/<[^>]*>?/gm, "").trim(),
    };

    const response = await fetch(env.NEXT_PUBLIC_CONTACT_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sanitizedData),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Error del servidor.");
    }

    return { success: true, id: result.data.id };
  } catch (error: unknown) {
    console.error("submitContactAction Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error al enviar el mensaje."
    };
  }
}

/**
 * Checks the status of a submission using its tracking ID.
 */
export async function checkStatusAction(id: string) {
  try {
    const response = await fetch(`${env.NEXT_PUBLIC_STATUS_API_URL}?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "No se pudo encontrar la solicitud.");
    }

    return { success: true, data: result.data };
  } catch (error: unknown) {
    console.error("checkStatusAction Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Error al consultar el estado."
    };
  }
}
