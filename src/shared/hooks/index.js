/**
 * @file index.js
 * @description Shared hooks - Barrel exports
 * @module shared/hooks
 */

// UI Hooks
export { default as useGallery } from "./ui/useGallery.js";
export { default as useIsMobile } from "./ui/useIsMobile.js";

// Observer Hooks
export { default as useIntersectionObserver } from "./observers/useIntersectionObserver.js";
