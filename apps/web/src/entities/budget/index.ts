/**
 * @file index.ts
 * @description API pública de la entidad `budget`: presupuesto formal PRES-0001 que arma el admin.
 * No confundir con `entities/quote`, que es el cotizador público (/presupuesto, GYA-AAAA-XXXX).
 * @module entities/budget
 */

export * from "./model";
export { subscribeToBudgets, subscribeToBudget, getBudget } from "./api/budgetsRepository";
export {
  saveBudget,
  changeBudgetStatus,
  generateBudgetPdf,
  getBudgetPdfUrl,
  budgetErrorMessage,
} from "./api/budgetFunctions";
export { toDate, formatBudgetDate, isBudgetExpired } from "./lib/budgetDates";
export { BudgetStatusBadge } from "./ui/BudgetStatusBadge";
export { BudgetTotals } from "./ui/BudgetTotals";
