import { describe, it, expect, vi, beforeEach } from "vitest";

const updateDocMock = vi.fn();
const incrementMock = vi.fn((n: number) => ({ __inc: n }));

vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  doc: vi.fn(() => ({})),
  getDocs: vi.fn(),
  getDoc: vi.fn(),
  addDoc: vi.fn(async () => ({ id: "abc123" })),
  updateDoc: (...args: unknown[]) => updateDocMock(...args),
  deleteDoc: vi.fn(),
  query: vi.fn(),
  onSnapshot: vi.fn(),
  increment: (n: number) => incrementMock(n),
  serverTimestamp: vi.fn(() => "ts"),
  writeBatch: vi.fn(),
}));
vi.mock("@/shared/lib/firebase", () => ({ db: {} }));

import { productService } from "@/features/products/services/productService";
import { productSchema } from "@/shared/schemas/ecommerce-schemas";

const base = {
  sku: "VID-01",
  name: "Vidrio Templado 8mm Incoloro",
  category: "vidrio",
  unit: "m2",
  stock: 10,
  minStockAlert: 5,
  unitPrice: 100,
  costPrice: 60,
};

describe("inventory-crud: stock", () => {
  beforeEach(() => {
    updateDocMock.mockReset();
    incrementMock.mockClear();
  });

  it("replenishStock incrementa con valor positivo", async () => {
    await productService.replenishStock("p1", 5);
    expect(incrementMock).toHaveBeenCalledWith(5);
    expect(updateDocMock).toHaveBeenCalledTimes(1);
  });

  it("updateStock descuenta con valor negativo", async () => {
    await productService.updateStock("p1", 3);
    expect(incrementMock).toHaveBeenCalledWith(-3);
  });

  it("rechaza cantidades <= 0", async () => {
    await expect(productService.replenishStock("p1", 0)).rejects.toThrow();
    await expect(productService.updateStock("p1", -2)).rejects.toThrow();
    expect(updateDocMock).not.toHaveBeenCalled();
  });
});

describe("inventory-crud: validación Zod", () => {
  it("createProduct devuelve el id y valida el esquema", async () => {
    await expect(productService.createProduct({ ...base, isActive: true } as never)).resolves.toBe("abc123");
  });

  it("createProduct rechaza stock negativo", async () => {
    await expect(
      productService.createProduct({ ...base, stock: -1, isActive: true } as never)
    ).rejects.toThrow();
  });

  it("productSchema rechaza precio negativo", () => {
    expect(productSchema.safeParse({ ...base, unitPrice: -1 }).success).toBe(false);
  });
});
