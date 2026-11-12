/**
 * @file index.ts
 * @description Public API for the Quote entity: pricing table, calculators and quote sheet.
 * @module entities/quote
 */

// Config
export { QUOTE_PRICING, WINDOW_PRICING, type Difficulty } from "./config/pricing";

// Lib
export { quoteCalculator, type QuoteCalculationInput } from "./lib/quoteCalculator";
export {
  computeSashes,
  priceWindow,
  quoteTotals,
  splitBodies,
  temperedPerM2,
  validateWindow,
  type QuoteTotals,
  type SashResult,
  type WindowBody,
  type WindowFinish,
  type WindowGlass,
  type WindowInput,
  type WindowPrice,
  type WindowValidation,
} from "./lib/windowRules";
export { createQuoteLine, parseSystemParam } from "./lib/quoteLines";
export { summarizeQuote, type QuoteLineResult, type QuoteSummary } from "./lib/quoteSummary";
export { counterDocId, formatQuoteNumber, limaYear } from "./lib/quoteNumber";

// Model
export type { QuoteCustomer, QuoteLineInput, QuoteRequestParams } from "./model";

// UI
export { QuoteSheet } from "./ui/QuoteSheet";
