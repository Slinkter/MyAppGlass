/** Correlativo de presupuestos: GYA-AAAA-XXXX (año calendario de Lima, secuencia con ceros a la izquierda). */
export const QUOTE_NUMBER_REGEX = /^GYA-\d{4}-\d{4,}$/;

export function limaYear(now: Date = new Date()): number {
  return Number(new Intl.DateTimeFormat("en-US", { timeZone: "America/Lima", year: "numeric" }).format(now));
}

export function formatQuoteNumber(year: number, seq: number): string {
  return `GYA-${year}-${String(seq).padStart(4, "0")}`;
}

export function counterDocId(year: number): string {
  return `presupuesto-${year}`;
}
