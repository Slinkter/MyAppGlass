import { QUOTE_PRICING } from "../config/pricing";
import type { SystemType } from "@/entities/window/model";
import type { QuoteLineInput } from "../model";

let lineSeq = 0;

/** Crea una partida con los valores por defecto del cotizador. */
export function createQuoteLine(patch: Partial<QuoteLineInput> = {}): QuoteLineInput {
  lineSeq += 1;
  return {
    id: `linea-${lineSeq}`,
    ambiente: "",
    systemType: "mampara_serie25",
    width: 2.0,
    height: 2.1,
    glassType: "8mm_incoloro",
    aluminumColor: "negro_mate",
    difficulty: "primer_piso",
    includeInstallation: true,
    ...patch,
  };
}

/** Devuelve el sistema si el valor (p. ej. de un query param) existe en el catálogo del cotizador. */
export function parseSystemParam(value: string | null): SystemType | null {
  return value && Object.prototype.hasOwnProperty.call(QUOTE_PRICING.systems, value) ? (value as SystemType) : null;
}
