/**
 * @file index.ts
 * @description Feature Reclamation Book - Barrel exports
 */

// Components
export { default as ReclamationForm } from "./components/ReclamationForm";
export { default as PersonalInfoSection } from "./components/PersonalInfoSection";
export { default as ProductSection } from "./components/ProductSection";
export { default as ClaimDetailSection } from "./components/ClaimDetailSection";
export { default as DeclarationSection } from "./components/DeclarationSection";
export { default as SuccessModal } from "./components/SuccessModal";

// Hooks
export { useReclamationForm } from "./hooks/useReclamationForm";
export { useReclamationFormContext, ReclamationFormProvider } from "./components/ReclamationFormContext";

// Actions & Utils
export * from "./actions";
export * from "./utils/sanitizer";

// Types
export * from "./types";
