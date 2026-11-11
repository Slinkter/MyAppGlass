/**
 * @file index.ts
 * @description Public API for the Order entity.
 * @module entities/order
 */

// API
export { orderService, type CreateOrderPayload } from "./api/orderService";
export { useRealtimeOrders } from "./api/useRealtimeOrders";

// Model
export type { Order, OrderItem } from "./model";
