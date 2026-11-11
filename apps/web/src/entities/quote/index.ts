/**
 * @file index.ts
 * @description Public API for the Quote entity: pricing table, calculators and quote sheet.
 * @module entities/quote
 */

// Config
export { QUOTE_PRICING, type Difficulty } from "./config/pricing";

// Lib
export { quoteCalculator, type QuoteCalculationInput } from "./lib/quoteCalculator";
export { createQuoteLine, parseSystemParam } from "./lib/quoteLines";
export { summarizeQuote, type QuoteLineResult, type QuoteSummary } from "./lib/quoteSummary";
export { counterDocId, formatQuoteNumber, limaYear } from "./lib/quoteNumber";

// Model
export type { QuoteCustomer, QuoteLineInput, QuoteRequestParams } from "./model";

// UI
export { QuoteSheet } from "./ui/QuoteSheet";
