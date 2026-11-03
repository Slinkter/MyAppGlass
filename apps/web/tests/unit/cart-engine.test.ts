import { describe, it, expect } from "vitest";
import {
  addToCart,
  updateQuantity,
  removeFromCart,
  computeTotals,
  clampQuantity,
  reconcileWithCatalog,
  getCrossSells,
} from "@/features/tienda/cart-engine";
import { INITIAL_PRODUCTS } from "@/features/products/data/initial-products";

const perfil = INITIAL_PRODUCTS.find((p) => p.sku === "ALU-SERIE25-NEGRO")!;

describe("cart-engine", () => {
  it("agrega y acumula sin exceder el stock", () => {
    let lines = addToCart([], perfil, 2);
    lines = addToCart(lines, perfil, 9999);
    expect(lines).toHaveLength(1);
    expect(lines[0].quantity).toBe(perfil.stock);
  });
  it("clampQuantity maneja valores inválidos", () => {
    expect(clampQuantity(NaN, 5)).toBe(0);
    expect(clampQuantity(-3, 5)).toBe(0);
    expect(clampQuantity(2.9, 5)).toBe(2);
  });
  it("updateQuantity a 0 elimina la línea y removeFromCart también", () => {
    const lines = addToCart([], perfil, 2);
    expect(updateQuantity(lines, perfil.id!, 0)).toHaveLength(0);
    expect(removeFromCart(lines, perfil.id!)).toHaveLength(0);
  });
  it("calcula subtotal, IGV 18% y total", () => {
    const t = computeTotals(addToCart([], perfil, 3));
    expect(t.subtotal).toBe(Math.round(perfil.unitPrice * 3 * 100) / 100);
    expect(t.igv).toBe(Math.round(t.subtotal * 18) / 100);
    expect(t.total).toBeCloseTo(t.subtotal + t.igv, 2);
    expect(t.units).toBe(3);
  });
  it("reconcile elimina productos agotados", () => {
    const lines = addToCart([], perfil, 2);
    expect(reconcileWithCatalog(lines, [{ ...perfil, stock: 0 }])).toHaveLength(0);
  });
  it("cross-selling sugiere rodaje y cerradura para Serie 25", () => {
    const skus = getCrossSells(addToCart([], perfil, 1), INITIAL_PRODUCTS).map((p) => p.sku);
    expect(skus).toContain("ACC-RODAJE-SERIE25");
    expect(skus).toContain("ACC-CHAPA-PICO-LORO");
  });
});
