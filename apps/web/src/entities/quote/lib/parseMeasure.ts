/**
 * @file parseMeasure.ts
 * @description Convierte lo que escribe el cliente ("1,45", "1.45", " 1,2 ") en metros.
 * Función pura. Devuelve NaN si el texto no es una medida clara (vacío, texto, varios
 * separadores, signo negativo); el motor (`validateWindow`) decide el mensaje.
 * @module entities/quote
 */

const MEASURE = /^(\d+([.,]\d+)?|[.,]\d+)$/;

export function parseMeasure(text: string): number {
  const clean = text.trim();
  if (!MEASURE.test(clean)) return Number.NaN;
  return Number(clean.replace(",", "."));
}
