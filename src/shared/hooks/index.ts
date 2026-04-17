/**
 * @file index.ts
 * @description Shared hooks - Barrel exports
 * @module shared/hooks
 */

// UI Hooks
export { default as useGallery } from "./ui/useGallery";
export { default as useIsMobile } from "./ui/useIsMobile";

// Observer Hooks
export { default as useIntersectionObserver } from "./observers/useIntersectionObserver";

// Data Hooks
export { useAsyncData } from "./data/useAsyncData";
