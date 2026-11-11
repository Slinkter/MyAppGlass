/**
 * @file index.ts
 * @description Public API for the Product entity.
 * @module entities/product
 */

// API
export { productService } from "./api/productService";
export { useRealtimeProducts } from "./api/useRealtimeProducts";

// Data
export { INITIAL_PRODUCTS } from "./data/initial-products";

// Model
export type { Product } from "./model";
