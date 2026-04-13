/**
 * @file firebaseErrorHandler.ts
 * @description Standardized error handler for Firebase and related services.
 * @module utils
 */

import { FirebaseError } from "firebase/app";

/**
 * Standardized error structure for the application.
 */
export interface AppError {
  message: string;
  code?: string;
  details?: any;
}

/**
 * Handles Firebase specific errors and standardizes them for UI consumption.
 * @param error - The error to handle.
 * @returns An AppError object.
 */
export const handleFirebaseError = (error: unknown): AppError => {
  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/invalid-email":
        return { message: "El correo electrónico no es válido.", code: error.code };
      case "auth/user-not-found":
        return { message: "El usuario no existe.", code: error.code };
      case "auth/wrong-password":
        return { message: "Contraseña incorrecta.", code: error.code };
      case "permission-denied":
        return { message: "No tienes permisos para realizar esta acción.", code: error.code };
      default:
        return { message: error.message, code: error.code };
    }
  }

  if (error instanceof Error) {
    return { message: error.message };
  }

  return { message: "Ocurrió un error inesperado." };
};
