/**
 * @file budgetFunctions.ts
 * @description Escrituras del presupuesto formal a través de las Cloud Functions callables.
 * Los totales y el correlativo los calcula el servidor; aquí solo se envía la entrada.
 * @module entities/budget/api
 */
import { getFirebaseFunctions, storage } from "@/shared/lib/firebase";
import type {
  CambiarEstadoInput,
  CambiarEstadoOutput,
  GenerarPdfOutput,
  GuardarPresupuestoInput,
  GuardarPresupuestoOutput,
} from "../model";

async function call<TInput, TOutput>(name: string, input: TInput): Promise<TOutput> {
  const [{ httpsCallable }, functions] = await Promise.all([import("firebase/functions"), getFirebaseFunctions()]);
  const result = await httpsCallable<TInput, TOutput>(functions, name)(input);
  return result.data;
}

/** Crea un borrador (sin `numero`) o guarda los cambios de uno existente. */
export const saveBudget = (input: GuardarPresupuestoInput): Promise<GuardarPresupuestoOutput> =>
  call("guardarPresupuesto", input);

/** borrador → enviado → aprobado | rechazado. */
export const changeBudgetStatus = (input: CambiarEstadoInput): Promise<CambiarEstadoOutput> =>
  call("cambiarEstadoPresupuesto", input);

/** Genera el PDF en el servidor y lo archiva en Storage. */
export const generateBudgetPdf = (numero: string): Promise<GenerarPdfOutput> =>
  call("generarPresupuestoPdf", { numero });

/** Enlace de descarga del PDF archivado (solo lo obtiene un admin). */
export const getBudgetPdfUrl = async (path: string): Promise<string> => {
  const { ref, getDownloadURL } = await import("firebase/storage");
  return getDownloadURL(ref(storage, path));
};

const MESSAGES_BY_CODE: Record<string, string> = {
  "functions/unauthenticated": "Su sesión venció. Vuelva a iniciar sesión.",
  "functions/permission-denied": "Su cuenta no tiene permiso de administrador.",
  "functions/unavailable": "No hay conexión con el servidor. Revise su internet e inténtelo nuevamente.",
  "functions/deadline-exceeded": "El servidor tardó demasiado. Inténtelo nuevamente.",
};

/** Mensaje para mostrar al admin a partir de un error de una callable. */
export function budgetErrorMessage(error: unknown): string {
  const code = typeof error === "object" && error !== null ? String((error as { code?: unknown }).code ?? "") : "";
  if (MESSAGES_BY_CODE[code]) return MESSAGES_BY_CODE[code];
  // Los HttpsError de las functions ya traen un mensaje pensado para el usuario.
  const message = error instanceof Error ? error.message : "";
  if (message && code.startsWith("functions/") && code !== "functions/internal") return message;
  return "No se pudo completar la operación. Inténtelo nuevamente.";
}
