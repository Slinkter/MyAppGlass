/** Tabla de precios parametrizable del cotizador (S/ sin IGV). Editar aquí, no en los componentes. */
export type SystemType = "ventana_nova" | "mampara_serie25" | "ducha_cristal" | "techo_policarbonato";
export type GlassType = "8mm_incoloro" | "10mm_incoloro" | "6mm_incoloro" | "8mm_laminado";
export type AluminumColor = "negro_mate" | "aluminio_mate" | "blanco" | "champagne";
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
  } satisfies Record<SystemType, { label: string; kitDescription: string; kitCost: number }>,
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
