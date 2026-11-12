/** Tabla de precios parametrizable del cotizador (S/ sin IGV). Editar aquí, no en los componentes. */
import type { AluminumColor, GlassType, SystemType } from "@/entities/window/model";

export type Difficulty = "primer_piso" | "piso_alto_sin_andamio" | "piso_alto_con_andamio";

export const QUOTE_PRICING = {
  igvRate: 0.18,
  minAreaM2: 0.1,
  minPerimeterM: 0.5,
  glass: {
    "6mm_incoloro": { label: "Templado 6mm Incoloro", pricePerM2: 95 },
    "8mm_incoloro": { label: "Templado 8mm Incoloro", pricePerM2: 135 },
    "10mm_incoloro": { label: "Templado 10mm Incoloro", pricePerM2: 165 },
    "8mm_laminado": { label: "Laminado de Seguridad 8mm", pricePerM2: 190 },
  } satisfies Record<GlassType, { label: string; pricePerM2: number }>,
  aluminum: {
    negro_mate: { label: "Negro Mate Anodizado", pricePerMeter: 45 },
    aluminio_mate: { label: "Aluminio Mate Natural", pricePerMeter: 38 },
    blanco: { label: "Blanco Esmaltado", pricePerMeter: 40 },
    champagne: { label: "Champagne Titanio", pricePerMeter: 48 },
  } satisfies Record<AluminumColor, { label: string; pricePerMeter: number }>,
  systems: {
    mampara_serie25: {
      label: "Mampara Corrediza Serie 25 (2 o 4 Hojas)",
      kitDescription: "Kit de Cerradura Pico Loro, Tirador y Rodajes Serie 25",
      kitCost: 160,
      noiseReductionPct: 50,
    },
    ventana_nova: {
      label: "Ventana Corrediza Sistema Nova Hermética",
      kitDescription: "Kit de Accesorios y Rodajes Sistema Nova",
      kitCost: 85,
    },
    ducha_cristal: {
      label: "Puerta / Box de Ducha en Cristal Templado",
      kitDescription: "Kit de Accesorios en Acero Inoxidable para Puerta de Ducha",
      kitCost: 220,
    },
    techo_policarbonato: {
      label: "Techo de Policarbonato / Cobertura de Vidrio",
      kitDescription: "Kit de Perfilería Unión H y Selladores Estructurales",
      kitCost: 140,
    },
    // Incorporados al catálogo el 2026-11-08 (decisión del dueño). Precios y % antirruido por confirmar:
    // hasta cargar los valores reales (fase de cálculos) el cotizador los marca como "Precio a definir".
    ventana_acustica: {
      label: "Ventana Acústica",
      kitDescription: "Kit de Accesorios Ventana Acústica",
      kitCost: 0,
      pricePending: true,
      noiseReductionPct: 80,
    },
    ventana_pvc_abatible: {
      label: "Ventana PVC Abatible",
      kitDescription: "Kit de Accesorios Ventana PVC Abatible",
      kitCost: 0,
      pricePending: true,
      noiseReductionPct: 80,
    },
  } satisfies Record<
    SystemType,
    {
      label: string;
      kitDescription: string;
      kitCost: number;
      /** true = precio aún no definido por el negocio; la UI muestra "Precio a definir". */
      pricePending?: boolean;
      /** % de reducción de ruido (insignia antirruido de la hoja). Solo si está confirmado. */
      noiseReductionPct?: number;
    }
  >,
  installation: {
    ratePerM2: 80,
    minCost: 150,
    surcharge: {
      primer_piso: { label: "Instalación en Primer Piso / Fácil Acceso", amount: 0 },
      piso_alto_sin_andamio: { label: "Piso Alto (Ascensor / Escalera Amplia)", amount: 100 },
      piso_alto_con_andamio: { label: "Piso Alto con Andamio / Fachada Exterior", amount: 250 },
    } satisfies Record<Difficulty, { label: string; amount: number }>,
  },
} as const;

/**
 * Precios y reglas de la ventana corrediza Nova (flujo "por m²"), todo en S/ sin IGV.
 * Fuente: dueño, 2026-11-11 (spec `docs/claude/specs/cotizador-presupuesto/spec.md`).
 * El precio por m² es costo total: vidrio + perfiles + accesorios + instalación en La Molina.
 * Editar aquí, no en los componentes. El único valor por confirmar es el ancho mínimo.
 */
export const WINDOW_PRICING = {
  igvRate: QUOTE_PRICING.igvRate,
  /** Área mínima cobrada (m²). */
  minAreaM2: 0.1,
  /** Vidrio crudo, S/ por m². */
  rawPerM2: 240,
  /** Recargo del vidrio templado sobre el precio crudo (%). */
  temperedSurchargePct: 30,
  /** Arenado o laminado (opcional), S/ por m². Mismo precio para ambos. */
  finishPerM2: 80,
  /** Flete fuera de La Molina, S/ sin IGV, estándar para todo Lima. */
  freightOutsideLaMolina: 120,
  /** Comisión de tarjeta incluida en el precio de lista (%). El pago en efectivo o QR paga el total sin ella. */
  cardSurchargePct: 5,
  /** Espesor fijo del vidrio de ventana (mm): los perfiles están diseñados para 6 mm. */
  glassMm: 6,
  limits: {
    widthMinM: 0.4, // por confirmar: el dueño fijó el alto mínimo (0,40 m), no el ancho mínimo
    widthMaxM: 2.8, // dueño, spec §11, pregunta 1
    heightMinM: 0.4, // dueño, spec §11, pregunta 1
    heightMaxM: 2.4, // sobre 2,40 m va por visita técnica (dueño, spec §11, preguntas 1 y 10)
  },
  sash: {
    minCm: 60,
    maxCm: 80,
    /** Margen por vanos no exactos. */
    marginCm: 5,
    minCount: 2,
    maxCount: 4,
  },
  bodies: {
    /**
     * Sobre este alto la ventana se divide en cuerpos (m). Con el alto máximo en 2,40 m la web
     * no llega a dividir en cuerpos; queda para presupuestos armados en tienda.
     */
    splitAboveHeightM: 2.4,
    /** Paño fijo inferior de seguridad (m). */
    fixedBottomM: 1.1,
    /** Cuerpo corredizo central (m). */
    slidingM: 1.2,
  },
} as const;
