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
export { parseMeasure } from "./lib/parseMeasure";
export { formatMeasure } from "./lib/formatMeasure";
export { formatSoles } from "./lib/formatSoles";
export { createQuoteLine, parseSystemParam } from "./lib/quoteLines";
export { QUOTE_ENTRY_ROUTES, parseQuoteEntry, quoteEntryHref, type QuoteEntry } from "./lib/quoteEntry";
export { summarizeQuote, type QuoteLineResult, type QuoteSummary } from "./lib/quoteSummary";
export { counterDocId, formatQuoteNumber, limaYear } from "./lib/quoteNumber";

// Model
export type {
  QuoteCustomer,
  QuoteLineInput,
  QuoteRequestParams,
  WindowGlassColor,
  WindowProfileColor,
  WindowQuoteItem,
} from "./model";

// UI
export { QuoteSheet } from "./ui/QuoteSheet";
export { NovaQuoteSheet, type NovaQuoteSheetProps } from "./ui/NovaQuoteSheet";
export { Window2DPreview, type Window2DPreviewProps } from "./ui/Window2DPreview";
