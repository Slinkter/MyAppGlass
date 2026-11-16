/**
 * @file budgetDates.ts
 * @description Fechas del presupuesto formal: llegan como Timestamp de Firestore.
 * @module entities/budget/lib
 */
import type { Presupuesto } from "../model";

/** Convierte un Timestamp de Firestore, un Date o un ISO en Date; null si no hay fecha. */
export function toDate(value: unknown): Date | null {
  if (!value) return null;
  if (value instanceof Date) return value;
  if (typeof value === "object" && value !== null) {
    const v = value as { toDate?: () => Date; seconds?: number };
    if (typeof v.toDate === "function") return v.toDate();
    if (typeof v.seconds === "number") return new Date(v.seconds * 1000);
  }
  if (typeof value === "string" || typeof value === "number") {
    const d = new Date(value);
    return Number.isNaN(d.getTime()) ? null : d;
  }
  return null;
}

const dateFormatter = new Intl.DateTimeFormat("es-PE", {
  timeZone: "America/Lima",
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

/** Fecha corta (dd/mm/aaaa, hora de Lima) o una raya si no hay fecha. */
export function formatBudgetDate(value: unknown): string {
  const d = toDate(value);
  return d ? dateFormatter.format(d) : "—";
}

/** Un presupuesto enviado cuya validez ya pasó. Los aprobados y rechazados no vencen. */
export function isBudgetExpired(budget: Pick<Presupuesto, "estado" | "venceEl">, now: Date = new Date()): boolean {
  if (budget.estado !== "enviado") return false;
  const vence = toDate(budget.venceEl);
  return vence !== null && vence.getTime() < now.getTime();
}
