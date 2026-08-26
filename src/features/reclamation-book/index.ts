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
export { submitReclamationAction } from "./actions";
export type { ReclamationActionResult } from "./actions";
export {
  sanitizeSingleLine,
  sanitizeMultilineText,
  sanitizeEmail,
  sanitizePhone,
  sanitizeDocumentNumber,
  sanitizeAmount,
  sanitizeReclamationData,
  isValidTipoDocumento,
  isValidTipoBien,
  isValidTipoSolicitud,
} from "./utils/sanitizer";

// Types
export type {
  TipoDocumento,
  TipoBien,
  TipoSolicitud,
  ReclamationFormState,
  FormErrors,
  ModalProps,
  InputChangeEvent,
  ReclamationFormContextValue,
} from "./types";
