import { ReclamationInput } from "../schemas/reclamation-schema";
import { ContactFormData } from "../schemas/contact-schema";
import { TrackingQueryInput } from "../schemas/tracking-schema";

/**
 * Respuesta genérica estándar del backend
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

/**
 * Respuesta del endpoint submitReclamo
 */
export interface SubmitReclamationResponse {
  id: string;
  createdAt?: string;
}

/**
 * Respuesta del endpoint submitContacto
 */
export interface SubmitContactResponse {
  id: string;
  createdAt?: string;
}

/**
 * Respuesta del endpoint checkStatus
 */
export interface CheckStatusResponse {
  id: string;
  type: string;
  status: "RECIBIDO" | "EN_REVISION" | "EN_PROCESO" | "ATENDIDO" | "CERRADO";
  createdAt: string | null;
  name: string;
}

export type { ReclamationInput, ContactFormData, TrackingQueryInput };
