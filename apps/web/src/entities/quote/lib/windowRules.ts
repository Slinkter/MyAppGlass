/**
 * @file windowRules.ts
 * @description Motor de reglas de la ventana corrediza Nova (hojas, cuerpos y precio por m²).
 * Funciones puras: sin React ni Firebase. Precios y límites viven en `WINDOW_PRICING`.
 * @module entities/quote
 */
import { WINDOW_PRICING as W } from "../config/pricing";
import { formatMeasure } from "./formatMeasure";

import type { WindowFinish, WindowGlass } from "../model";

export type { WindowFinish, WindowGlass };

const EPS = 1e-6;

/** Redondea un importe a 2 decimales (sin errores de coma flotante). */
export const round2 = (n: number): number => Math.round((n + Number.EPSILON) * 100) / 100;

/** Precio de vidrio templado por m²: crudo + recargo. */
export const temperedPerM2 = (): number => round2(W.rawPerM2 * (1 + W.temperedSurchargePct / 100));

// ---------------------------------------------------------------------------
// Validación
// ---------------------------------------------------------------------------

export type WindowField = "width" | "height";

export type WindowValidation =
  | { ok: true }
  | {
      ok: false;
      field: WindowField;
      message: string;
      /** true si la medida se pasa de los límites: se ofrece la visita técnica. */
      requiresVisit: boolean;
    };

const fmt = formatMeasure;

/** Valida ancho y alto en metros. */
export function validateWindow(widthM: number, heightM: number): WindowValidation {
  const check = (v: number, field: WindowField, min: number, max: number, label: string): WindowValidation => {
    if (!Number.isFinite(v) || v <= 0) {
      return { ok: false, field, message: `Escriba el ${label} en metros, por ejemplo 1,20.`, requiresVisit: false };
    }
    if (v < min - EPS) {
      return { ok: false, field, message: `El ${label} mínimo es ${fmt(min)} m.`, requiresVisit: false };
    }
    if (v > max + EPS) {
      return {
        ok: false,
        field,
        message: "Esta medida requiere visita técnica. Solicítela y la revisamos en su domicilio.",
        requiresVisit: true,
      };
    }
    return { ok: true };
  };
  const L = W.limits;
  const w = check(widthM, "width", L.widthMinM, L.widthMaxM, "ancho");
  if (!w.ok) return w;
  return check(heightM, "height", L.heightMinM, L.heightMaxM, "alto");
}

// ---------------------------------------------------------------------------
// Hojas
// ---------------------------------------------------------------------------

export interface SashResult {
  /** Número de hojas; 1 = vidrio o ventana fija. */
  count: number;
  /** Ancho de cada hoja (cm). */
  sashWidthCm: number;
  /** Distribución, de izquierda a derecha. */
  layout: ("fija" | "corrediza")[];
  /** true si el ancho es muy chico para una corrediza y se recomienda ventana fija. */
  recommendFixed: boolean;
  /** true si ninguna distribución cumple y debe definirla el técnico. */
  needsTechnician: boolean;
  /** Explicación en lenguaje claro. */
  note: string;
}

const LAYOUTS: Record<number, ("fija" | "corrediza")[]> = {
  2: ["fija", "corrediza"],
  3: ["fija", "corrediza", "corrediza"],
  4: ["fija", "corrediza", "corrediza", "fija"],
};

/**
 * Elige el menor número de hojas (2 a 4) cuyo ancho caiga entre 60 y 80 cm,
 * con 5 cm de margen por vanos no exactos. Ejemplos: 1,20 m → 2; 1,70 m → 2 de 85 cm;
 * 1,80 m → 3; 2,40 m → 3 de 80 cm; 2,60 m → 4.
 */
export function computeSashes(widthM: number): SashResult {
  const widthCm = widthM * 100;
  const lo = W.sash.minCm - W.sash.marginCm;
  const hi = W.sash.maxCm + W.sash.marginCm;

  for (let n = W.sash.minCount; n <= W.sash.maxCount; n++) {
    const sash = widthCm / n;
    if (sash >= lo - EPS && sash <= hi + EPS) {
      return {
        count: n,
        sashWidthCm: Number(sash.toFixed(1)),
        layout: LAYOUTS[n],
        recommendFixed: false,
        needsTechnician: false,
        note: `${n} hojas de unos ${Math.round(sash)} cm: ${LAYOUTS[n].join(" + ")}.`,
      };
    }
  }

  if (widthCm / W.sash.minCount < lo - EPS) {
    return {
      count: 1,
      sashWidthCm: Number(widthCm.toFixed(1)),
      layout: ["fija"],
      recommendFixed: true,
      needsTechnician: false,
      note: "Con este ancho las hojas quedarían muy angostas. Le recomendamos una ventana o vidrio fijo.",
    };
  }

  return {
    count: 0,
    sashWidthCm: 0,
    layout: [],
    recommendFixed: false,
    needsTechnician: true,
    note: "La medida exacta la define el técnico en la visita.",
  };
}

// ---------------------------------------------------------------------------
// Cuerpos (alturas grandes)
// ---------------------------------------------------------------------------

export interface WindowBody {
  kind: "fijo superior" | "corredizo" | "fijo inferior" | "unico";
  widthM: number;
  heightM: number;
}

/**
 * Divide la ventana en cuerpos si el alto supera 2,40 m: paño fijo inferior de 1,10 m (seguridad),
 * cuerpo corredizo central de 1,20 m y paño fijo superior con el resto.
 * Ejemplo: 1,80 × 2,90 → 1,80 × 0,60, 1,80 × 1,20 y 1,80 × 1,10.
 */
export function splitBodies(widthM: number, heightM: number): WindowBody[] {
  const B = W.bodies;
  if (heightM <= B.splitAboveHeightM + EPS) {
    return [{ kind: "unico", widthM, heightM }];
  }
  const top = round2(heightM - B.fixedBottomM - B.slidingM);
  return [
    { kind: "fijo superior", widthM, heightM: top },
    { kind: "corredizo", widthM, heightM: B.slidingM },
    { kind: "fijo inferior", widthM, heightM: B.fixedBottomM },
  ];
}

// ---------------------------------------------------------------------------
// Precio
// ---------------------------------------------------------------------------

export interface WindowInput {
  widthM: number;
  heightM: number;
  glass: WindowGlass;
  finish: WindowFinish;
}

export interface WindowPrice {
  /** Área cobrada (m²), con el mínimo aplicado. Sin redondear. */
  areaM2: number;
  unitPerM2: number;
  /** Vidrio, perfiles, accesorios e instalación en La Molina. */
  baseAmount: number;
  /** Arenado o laminado; 0 si no se pidió. */
  finishAmount: number;
  /** Sin IGV. */
  subtotal: number;
}

/** Precio de una ventana, sin IGV. */
export function priceWindow(input: WindowInput): WindowPrice {
  const areaM2 = Math.max(W.minAreaM2, input.widthM * input.heightM);
  const unitPerM2 = input.glass === "templado" ? temperedPerM2() : W.rawPerM2;
  const baseAmount = round2(areaM2 * unitPerM2);
  const finishAmount = input.finish === "ninguno" ? 0 : round2(areaM2 * W.finishPerM2);
  return { areaM2, unitPerM2, baseAmount, finishAmount, subtotal: round2(baseAmount + finishAmount) };
}

export interface QuoteTotals {
  /** Suma de las ventanas, sin IGV ni flete. */
  windowsSubtotal: number;
  /** Flete fuera de La Molina, sin IGV; 0 dentro de La Molina. */
  freight: number;
  subtotal: number;
  igv: number;
  /** Total con IGV: lo que paga en efectivo o por QR. */
  total: number;
  /** Precio de lista (incluye 5 % de comisión de tarjeta): total × 1,05. */
  listPrice: number;
  /** Lo que se ahorra pagando en efectivo o QR (lista − total). */
  cashSaving: number;
}

/** Totales del presupuesto a partir de los subtotales de cada ventana. */
export function quoteTotals(windowSubtotals: number[], outsideLaMolina: boolean): QuoteTotals {
  const windowsSubtotal = round2(windowSubtotals.reduce((a, b) => a + b, 0));
  const freight = outsideLaMolina && windowsSubtotal > 0 ? W.freightOutsideLaMolina : 0;
  const subtotal = round2(windowsSubtotal + freight);
  const igv = round2(subtotal * W.igvRate);
  const total = round2(subtotal + igv);
  const listPrice = round2(total * (1 + W.cardSurchargePct / 100));
  return { windowsSubtotal, freight, subtotal, igv, total, listPrice, cashSaving: round2(listPrice - total) };
}
