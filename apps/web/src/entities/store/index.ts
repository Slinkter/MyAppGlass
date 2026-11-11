/**
 * @file index.ts
 * @description Public API for the Store entity (sede, horario y ubicación).
 * @module entities/store
 */

// Data
export { center, containerStyle, mainStore } from "./data/mapConfig";

// Lib
export { useIsStoreOpen } from "./lib/useIsStoreOpen";

// Model
export type { StoreLocation } from "./model";
