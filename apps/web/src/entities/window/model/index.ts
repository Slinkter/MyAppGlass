/**
 * @file index.ts
 * @description Catálogo de sistemas y acabados de ventana (modelo de la entidad).
 * Los valores comerciales y precios viven en `entities/quote/config/pricing.ts`;
 * este módulo es la frontera estable que consumen simulador y cotizador.
 * @module entities/window/model
 */

/** Sistemas comerciales del cotizador respaldados por catálogos de proveedores. */
export type SystemType =
  | "ventana_nova"
  | "ventana_serie20"
  | "mampara_serie25"
  | "ventana_serie35"
  | "mampara_serie62"
  | "ducha_cristal"
  | "techo_policarbonato"
  | "ventana_acustica"
  | "ventana_pvc_abatible";

/** Tipos de vidrio disponibles en el cotizador. */
export type GlassType = "8mm_incoloro" | "10mm_incoloro" | "6mm_incoloro" | "8mm_laminado";

/** Colores de aluminio disponibles en el cotizador. */
export type AluminumColor = "negro_mate" | "aluminio_mate" | "blanco" | "champagne";
