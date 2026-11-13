/**
 * @file index.ts
 * @description API pública de la entidad Supplier.
 * @module entities/supplier
 */

// Model
export type { SupplierId, SupplierProduct, SupplierProductType } from "./model";
export { SUPPLIER_LABELS } from "./model";

// API
export { supplierProductsRepository } from "./api/supplierProductsRepository";
export { useSupplierProducts } from "./api/useSupplierProducts";

// Pedido de compra
export type {
  PurchaseGroup,
  PurchaseLine,
  PurchaseOrder,
  PurchaseOrderStatus,
} from "./model/purchaseOrder";
export { NO_PRICE_LABEL, PURCHASE_STATUS_LABELS } from "./model/purchaseOrder";
export { groupBySupplier, purchaseTotal } from "./lib/groupBySupplier";
export { formatPurchaseNumber, purchaseCounterDocId } from "./lib/purchaseNumber";
export { purchaseOrderService } from "./api/purchaseOrderService";

// UI
export { SupplierProductImage } from "./ui/SupplierProductImage";
export { PurchaseOrderSheet } from "./ui/PurchaseOrderSheet";
