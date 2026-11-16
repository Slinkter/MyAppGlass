/**
 * @file presupuesto-totales.ts
 * @description Cálculo de totales del presupuesto formal (PRES-0001). Es la única fórmula:
 * la usa la Cloud Function (resultado que se guarda) y la web (solo vista previa).
 * Se calcula en céntimos enteros para no arrastrar errores de coma flotante.
 */

/** IGV vigente en Perú. */
export const IGV_RATE = 0.18;

export interface LineaCalculable {
  cantidad: number;
  precioUnitario: number;
}

export interface TotalesPresupuesto {
  /** Importe de cada línea (cantidad × precio unitario), en soles, sin IGV. */
  importes: number[];
  subtotal: number;
  igv: number;
  total: number;
}

/** Redondea a céntimos enteros tolerando el error binario (1.005 × 100 = 100.4999…). */
function aCentimos(soles: number): number {
  return Math.round(Number((soles * 100).toFixed(4)));
}

/**
 * Subtotal, IGV y total de un presupuesto. Los precios unitarios van sin IGV.
 */
export function calcularTotales(
  items: readonly LineaCalculable[],
  igvRate: number = IGV_RATE
): TotalesPresupuesto {
  const importesCent = items.map((item) => aCentimos(item.cantidad * item.precioUnitario));
  const subtotalCent = importesCent.reduce((suma, importe) => suma + importe, 0);
  const igvCent = Math.round(Number((subtotalCent * igvRate).toFixed(4)));
  return {
    importes: importesCent.map((c) => c / 100),
    subtotal: subtotalCent / 100,
    igv: igvCent / 100,
    total: (subtotalCent + igvCent) / 100,
  };
}

/** Correlativo corrido del presupuesto formal: 1 → "PRES-0001". */
export function formatNumeroPresupuesto(seq: number): string {
  return `PRES-${String(seq).padStart(4, "0")}`;
}
