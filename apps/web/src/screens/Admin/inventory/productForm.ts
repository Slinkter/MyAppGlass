import type { Product } from "@/shared/schemas/ecommerce-schemas";

export interface ProductFormData {
  id?: string;
  sku: string;
  name: string;
  description: string;
  category: Product["category"];
  unit: Product["unit"];
  stock: number;
  minStockAlert: number;
  unitPrice: number;
  costPrice: number;
  imageUrl: string;
}

export type InventoryStatusMessage = { type: "success" | "error"; text: string } | null;

export const EMPTY_PRODUCT_FORM: ProductFormData = {
  sku: "",
  name: "",
  description: "",
  category: "vidrio",
  unit: "m2",
  stock: 0,
  minStockAlert: 5,
  unitPrice: 0,
  costPrice: 0,
  imageUrl: "",
};
