/**
 * @file index.ts
 * @description Barrel exports for the contacto feature.
 * @module features/contacto
 */

export { submitContactAction, checkStatusAction } from "./actions";
export type { ContactData } from "./actions";
export { useContactForm } from "./hooks/useContactForm";
export type { TrackingResult } from "./hooks/useContactForm";
