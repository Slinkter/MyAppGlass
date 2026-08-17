/* eslint-disable no-control-regex */
/**
 * @file sanitizer.ts
 * @description Utilities for sanitizing and validating user inputs in the Reclamation Book feature.
 */

import { ReclamationData } from "@/shared/api/reclamoService";
import { TipoDocumento, TipoBien, TipoSolicitud } from "@features/reclamation-book/types";

const VALID_TIPO_DOCUMENTO: ReadonlyArray<TipoDocumento> = ["DNI", "CE", "PASAPORTE"];
const VALID_TIPO_BIEN: ReadonlyArray<TipoBien> = ["producto", "servicio"];
const VALID_TIPO_SOLICITUD: ReadonlyArray<TipoSolicitud> = ["Reclamo", "Queja"];

/**
 * Type guard for TipoDocumento.
 */
export function isValidTipoDocumento(val: string): val is TipoDocumento {
  return (VALID_TIPO_DOCUMENTO as ReadonlyArray<string>).includes(val);
}

/**
 * Type guard for TipoBien.
 */
export function isValidTipoBien(val: string): val is TipoBien {
  return (VALID_TIPO_BIEN as ReadonlyArray<string>).includes(val);
}

/**
 * Type guard for TipoSolicitud.
 */
export function isValidTipoSolicitud(val: string): val is TipoSolicitud {
  return (VALID_TIPO_SOLICITUD as ReadonlyArray<string>).includes(val);
}

/**
 * Removes control characters, strips HTML/script tags, converts newlines to spaces, and trims.
 */
export function sanitizeSingleLine(input: string | undefined | null): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, "")
    .replace(/<[^>]*>?/gm, "")
    .replace(/[\r\n]+/g, " ")
    .trim();
}

/**
 * Removes control characters and strips HTML/script tags from multi-line text fields.
 */
export function sanitizeMultilineText(input: string | undefined | null): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/g, "")
    .replace(/<[^>]*>?/gm, "")
    .trim();
}

/**
 * Sanitizes and normalizes an email string.
 */
export function sanitizeEmail(email: string | undefined | null): string {
  if (typeof email !== "string") return "";
  return email.toLowerCase().replace(/[\u0000-\u001F\u007F-\u009F]/g, "").replace(/<[^>]*>?/gm, "").trim();
}

/**
 * Sanitizes phone string keeping numbers, spaces, hyphens, and leading plus sign.
 */
export function sanitizePhone(phone: string | undefined | null): string {
  if (typeof phone !== "string") return "";
  return phone.replace(/[^\d\s\-+()]/g, "").trim();
}

/**
 * Sanitizes document number keeping alphanumeric characters and hyphens.
 */
export function sanitizeDocumentNumber(doc: string | undefined | null): string {
  if (typeof doc !== "string") return "";
  return doc.replace(/[^a-zA-Z0-9-]/g, "").trim();
}

/**
 * Sanitizes monetary amount string keeping numeric values and up to one decimal point.
 * Strips currency prefixes such as S/., S/, $, commas, and invalid multiple dots.
 */
export function sanitizeAmount(amount: string | undefined | null): string {
  if (typeof amount !== "string") return "";
  // Strip standard currency symbols first
  const noCurrency = amount.replace(/S\/\.?|\$|€|,/gi, "").trim();
  const cleaned = noCurrency.replace(/[^0-9.]/g, "");
  const parts = cleaned.split(".");
  if (parts.length > 1) {
    const intPart = parts[0] || "0";
    const decPart = parts.slice(1).join("");
    return `${intPart}.${decPart}`;
  }
  return cleaned;
}

/**
 * Thoroughly sanitizes an entire ReclamationData payload before transmission.
 */
export function sanitizeReclamationData(raw: ReclamationData): ReclamationData {
  return {
    nombreCompleto: sanitizeSingleLine(raw.nombreCompleto),
    domicilio: sanitizeSingleLine(raw.domicilio),
    email: sanitizeEmail(raw.email),
    telefono: sanitizePhone(raw.telefono),
    tipoDocumento: isValidTipoDocumento(raw.tipoDocumento) ? raw.tipoDocumento : sanitizeSingleLine(raw.tipoDocumento),
    numeroDocumento: sanitizeDocumentNumber(raw.numeroDocumento),
    nombrePadreMadre: sanitizeSingleLine(raw.nombrePadreMadre),
    tipoBien: isValidTipoBien(raw.tipoBien) ? raw.tipoBien : sanitizeSingleLine(raw.tipoBien),
    montoReclamado: sanitizeAmount(raw.montoReclamado),
    descripcionBien: sanitizeMultilineText(raw.descripcionBien),
    tipoSolicitud: isValidTipoSolicitud(raw.tipoSolicitud) ? raw.tipoSolicitud : sanitizeSingleLine(raw.tipoSolicitud),
    detalle: sanitizeMultilineText(raw.detalle),
    pedido: sanitizeMultilineText(raw.pedido),
    aceptaTerminos: Boolean(raw.aceptaTerminos),
    autorizaEmail: Boolean(raw.autorizaEmail),
    middleName: raw.middleName ? sanitizeSingleLine(raw.middleName) : "",
    recaptchaToken: raw.recaptchaToken ? String(raw.recaptchaToken) : undefined,
    mathAnswer: raw.mathAnswer ? sanitizeSingleLine(raw.mathAnswer) : undefined,
    mathToken: raw.mathToken ? String(raw.mathToken) : undefined,
    _ts: typeof raw._ts === "number" && !isNaN(raw._ts) ? raw._ts : undefined,
  };
}
