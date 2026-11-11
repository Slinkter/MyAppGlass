const limaYearFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "America/Lima",
  year: "numeric",
});

export function limaYear(now: Date = new Date()): number {
  return Number(limaYearFormatter.format(now));
}

export function formatQuoteNumber(year: number, seq: number): string {
  return `GYA-${year}-${String(seq).padStart(4, "0")}`;
}

export function counterDocId(year: number): string {
  return `presupuesto-${year}`;
}
