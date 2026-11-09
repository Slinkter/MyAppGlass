import type { QuoteCalculationInput } from "./utils/quoteCalculator";

/** Una partida del presupuesto: un ambiente/abertura con sus medidas y acabados. */
export interface QuoteLineInput extends QuoteCalculationInput {
  /** Identificador local (React key); no se interpreta en el cálculo. */
  id: string;
  /** Ambiente o referencia ("Sala", "Dormitorio 1", "V1"...). Opcional. */
  ambiente: string;
}

/** Formato `params` guardado en `presupuestos_solicitados` (las reglas solo exigen que sea un map). */
export interface QuoteRequestParams {
  version: 2;
  items: QuoteLineInput[];
}

export interface QuoteCustomer {
  fullName: string;
  dniRuc: string;
  email: string;
  phone: string;
  address: string;
  district: string;
}
