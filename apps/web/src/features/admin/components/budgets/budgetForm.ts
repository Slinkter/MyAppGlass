/**
 * @file budgetForm.ts
 * @description Estado del formulario del presupuesto formal. Cantidad y precio se guardan como
 * texto mientras se escribe (admite coma o punto decimal) y se convierten a número al enviar.
 */
import type { Product } from "@/entities/product";
import {
  calcularTotales,
  type GuardarPresupuestoInput,
  type Presupuesto,
  type PresupuestoItemInput,
  type TotalesPresupuesto,
  type Unidad,
} from "@/entities/budget";

export interface BudgetLineDraft {
  /** Clave estable para React; no se envía. */
  key: string;
  productoId?: string;
  tipo: "producto" | "servicio";
  descripcion: string;
  unidad: Unidad;
  cantidad: string;
  precioUnitario: string;
}

let lineCounter = 0;
const nextKey = (): string => `linea-${Date.now()}-${++lineCounter}`;

/** Convierte "12,5" o "12.5" en número; NaN si no es un número. */
export function parseDecimal(text: string): number {
  const clean = text.trim().replace(",", ".");
  return clean === "" ? Number.NaN : Number(clean);
}

export function newEmptyLine(tipo: BudgetLineDraft["tipo"] = "producto"): BudgetLineDraft {
  return {
    key: nextKey(),
    tipo,
    descripcion: "",
    unidad: tipo === "servicio" ? "servicio" : "unidad",
    cantidad: "1",
    precioUnitario: "",
  };
}

export function newLineFromProduct(product: Product): BudgetLineDraft {
  return {
    key: nextKey(),
    productoId: product.id,
    tipo: product.category === "servicio" ? "servicio" : "producto",
    descripcion: product.name,
    unidad: product.unit,
    cantidad: "1",
    precioUnitario: String(product.unitPrice),
  };
}

export function budgetToLines(budget: Presupuesto): BudgetLineDraft[] {
  return budget.items.map((item) => ({
    key: nextKey(),
    productoId: item.productoId,
    tipo: item.tipo,
    descripcion: item.descripcion,
    unidad: item.unidad,
    cantidad: String(item.cantidad),
    precioUnitario: String(item.precioUnitario),
  }));
}

/** Importe de una línea para la vista previa; 0 si aún no es un número válido. */
function safeNumber(text: string): number {
  const n = parseDecimal(text);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/** Totales de vista previa. El servidor recalcula los definitivos con la misma fórmula. */
export function previewTotals(lines: BudgetLineDraft[]): TotalesPresupuesto {
  return calcularTotales(
    lines.map((line) => ({ cantidad: safeNumber(line.cantidad), precioUnitario: safeNumber(line.precioUnitario) }))
  );
}

function lineToInput(line: BudgetLineDraft): PresupuestoItemInput {
  const item: PresupuestoItemInput = {
    descripcion: line.descripcion,
    unidad: line.unidad,
    cantidad: parseDecimal(line.cantidad),
    precioUnitario: parseDecimal(line.precioUnitario),
  };
  if (line.productoId) item.productoId = line.productoId;
  else item.tipo = line.tipo;
  return item;
}

export interface BudgetFormValues {
  numero?: string;
  clienteId: string;
  lines: BudgetLineDraft[];
  validezDias: string;
  notas: string;
}

/** Entrada para la function `guardarPresupuesto`. No incluye importes ni totales. */
export function toSaveInput(values: BudgetFormValues): GuardarPresupuestoInput {
  const input: GuardarPresupuestoInput = {
    clienteId: values.clienteId,
    items: values.lines.map(lineToInput),
    validezDias: Number(values.validezDias),
    notas: values.notas,
  };
  if (values.numero) input.numero = values.numero;
  return input;
}
