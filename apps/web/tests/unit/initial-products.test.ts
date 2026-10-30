import { describe, it, expect } from "vitest";
import { INITIAL_PRODUCTS } from "@/features/products/data/initial-products";
import { productSchema } from "@/shared/schemas/ecommerce-schemas";

describe("Initial Products Data Integrity", () => {
  it("todos los productos iniciales deben cumplir estrictamente el esquema de producto", () => {
    expect(INITIAL_PRODUCTS.length).toBeGreaterThan(0);
    for (const prod of INITIAL_PRODUCTS) {
      const result = productSchema.safeParse(prod);
      expect(result.success).toBe(true);
      if (!result.success) {
        console.error("Error en producto:", prod.sku, result.error);
      }
    }
  });

  it("debe contener productos en las tres categorías fundamentales (vidrio, aluminio, accesorio)", () => {
    const categories = INITIAL_PRODUCTS.map((p) => p.category);
    expect(categories).toContain("vidrio");
    expect(categories).toContain("aluminio");
    expect(categories).toContain("accesorio");
  });
});
