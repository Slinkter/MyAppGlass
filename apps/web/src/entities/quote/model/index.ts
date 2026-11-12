import type { QuoteCalculationInput } from "../lib/quoteCalculator";
import type { WindowFinish, WindowGlass } from "../lib/windowRules";

export type WindowGlassColor = "incoloro" | "bronce" | "gris";
export type WindowProfileColor = "negro" | "mate" | "blanco" | "madera" | "champagne";

/**
 * Línea del carrito del cotizador (Ventana · Sistema Nova). Solo datos de entrada:
 * hojas, cuerpos y precio se derivan siempre del motor y no se guardan.
 */
export interface WindowQuoteItem {
  id: string;
  widthM: number;
  heightM: number;
  glass: WindowGlass;
  finish: WindowFinish;
  glassColor: WindowGlassColor;
  profileColor: WindowProfileColor;
}

/** Una partida del presupuesto: un ambiente/abertura con sus medidas y acabados. */
export interface QuoteLineInput extends QuoteCalculationInput {
  /** Identificador local (React key); no se interpreta en el cálculo. */
  id: string;
  /** Ambiente o referencia ("Sala", "Dormitorio 1", "V1"...). Opcional. */
  ambiente: string;
}

/** Formato `params` guardado en `presupuestos_solicitados` (las reglas solo exigen que sea un map). */
export interface QuoteRequestParamsV2 {
  version: 2;
  items: QuoteLineInput[];
}

export interface QuoteRequestParamsV3 {
  version: 3;
  category: string;
  system: string;
  outsideLaMolina: boolean;
  items: WindowQuoteItem[];
}

export type QuoteRequestParams = QuoteRequestParamsV2 | QuoteRequestParamsV3;

export interface QuoteCustomer {
  fullName: string;
  dniRuc: string;
  email: string;
  phone: string;
  address: string;
  district: string;
}
