/* eslint-disable */
// GENERADO desde packages/shared/src/lib/presupuesto-totales.ts. No editar: correr `pnpm run shared:sync`.
"use strict";
/**
 * @file presupuesto-totales.ts
 * @description Cálculo de totales del presupuesto formal (PRES-0001). Es la única fórmula:
 * la usa la Cloud Function (resultado que se guarda) y la web (solo vista previa).
 * Se calcula en céntimos enteros para no arrastrar errores de coma flotante.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.IGV_RATE = void 0;
exports.calcularTotales = calcularTotales;
exports.formatNumeroPresupuesto = formatNumeroPresupuesto;
/** IGV vigente en Perú. */
exports.IGV_RATE = 0.18;
/** Redondea a céntimos enteros tolerando el error binario (1.005 × 100 = 100.4999…). */
function aCentimos(soles) {
    return Math.round(Number((soles * 100).toFixed(4)));
}
/**
 * Subtotal, IGV y total de un presupuesto. Los precios unitarios van sin IGV.
 */
function calcularTotales(items, igvRate = exports.IGV_RATE) {
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
function formatNumeroPresupuesto(seq) {
    return `PRES-${String(seq).padStart(4, "0")}`;
}
