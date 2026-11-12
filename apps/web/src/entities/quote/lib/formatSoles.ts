/**
 * @file formatSoles.ts
 * @description Importe en soles con el formato del presupuesto (RF17): `S/ 1 234,56`.
 * Siempre 2 decimales, coma decimal y espacio no separable (U+00A0) tras "S/" y como separador de miles,
 * para que el importe no se parta al final de la línea.
 * @module entities/quote
 */

export function formatSoles(n: number): string {
  const safe = Number.isFinite(n) ? n : 0;
  const [int, dec] = Math.abs(safe).toFixed(2).split(".");
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0");
  const sign = safe < 0 && Number(`${int}.${dec}`) > 0 ? "-" : "";
  return `${sign}S/\u00A0${grouped},${dec}`;
}
