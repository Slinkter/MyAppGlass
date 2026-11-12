/**
 * @file formatMeasure.ts
 * @description Medida en metros para mostrar: 2 decimales y coma decimal (1.2 -> "1,20").
 * @module entities/quote
 */

export function formatMeasure(n: number): string {
  return n.toFixed(2).replace(".", ",");
}
