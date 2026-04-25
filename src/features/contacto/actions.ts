"use client";

/**
 * @file actions.ts
 * @description Client-side actions for the contact feature.
 */

const CONTACTO_URL = process.env.NEXT_PUBLIC_CONTACT_API_URL as string;

export interface ContactData {
  name: string;
  email: string;
  message: string;
}

/**
 * Sends a contact inquiry to the Firebase Functions backend.
 */
export async function submitContactoAction(formData: ContactData) {
  try {
    const response = await fetch(CONTACTO_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Error del servidor.");
    }

    return { success: true, id: result.data.id };
  } catch (error: unknown) {
    console.error("submitContactoAction Error:", error);
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
    const STATUS_URL = process.env.NEXT_PUBLIC_STATUS_API_URL;
    const response = await fetch(`${STATUS_URL}?id=${id}`, {
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
