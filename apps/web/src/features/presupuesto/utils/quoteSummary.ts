import type { BudgetItem } from "@/shared/schemas/ecommerce-schemas";
import type { QuoteLineInput } from "../types";
import { quoteCalculator } from "./quoteCalculator";

export interface QuoteLineResult {
  line: QuoteLineInput;
  items: BudgetItem[];
  subtotal: number;
  installationCost: number;
  igv: number;
  total: number;
  pricePending: boolean;
}

export interface QuoteSummary {
  lines: QuoteLineResult[];
  /** Partidas planas de todas las líneas (para la hoja impresa). */
  items: BudgetItem[];
  subtotal: number;
  installationCost: number;
  igv: number;
  total: number;
  /** true si alguna línea usa un sistema sin precio definido: el total es referencial. */
  pricePending: boolean;
}

const round2 = (n: number) => Number(n.toFixed(2));

/**
 * Suma las partidas de todas las líneas. Cada línea se calcula con `quoteCalculator`
 * (los precios viven solo en `config/pricing.ts`); aquí no hay tarifas ni reglas de precio.
 */
export function summarizeQuote(lines: QuoteLineInput[]): QuoteSummary {
  const results: QuoteLineResult[] = lines.map((line) => ({ line, ...quoteCalculator.calculateQuote(line) }));
  const sum = (pick: (r: QuoteLineResult) => number) => round2(results.reduce((acc, r) => acc + pick(r), 0));

  return {
    lines: results,
    items: results.flatMap((r) => r.items),
    subtotal: sum((r) => r.subtotal),
    installationCost: sum((r) => r.installationCost),
    igv: sum((r) => r.igv),
    total: sum((r) => r.total),
    pricePending: results.some((r) => r.pricePending),
  };
}
