import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useQuoteCart, QUOTE_CART_STORAGE_KEY } from "@/features/presupuesto/hooks/useQuoteCart";
import type { WindowQuoteItem } from "@/entities/quote";

const sampleItem: WindowQuoteItem = {
  id: "w-1",
  widthM: 1.5,
  heightM: 1.2,
  glass: "crudo",
  finish: "ninguno",
  glassColor: "incoloro",
  profileColor: "negro",
};

describe("useQuoteCart", () => {
  let store: Record<string, string> = {};

  beforeEach(() => {
    store = {};
    const mockStorage = {
      getItem: vi.fn((key: string) => store[key] ?? null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value;
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key];
      }),
      clear: vi.fn(() => {
        store = {};
      }),
      key: vi.fn((i: number) => Object.keys(store)[i] ?? null),
      length: 0,
    };
    Object.defineProperty(window, "localStorage", {
      value: mockStorage,
      writable: true,
    });
    vi.restoreAllMocks();
  });

  it("inicia vacío por defecto", () => {
    const { result } = renderHook(() => useQuoteCart());
    expect(result.current.items).toEqual([]);
    expect(result.current.outsideLaMolina).toBe(false);
  });

  it("permite agregar un item y lo persiste en localStorage", () => {
    const { result } = renderHook(() => useQuoteCart());

    act(() => {
      result.current.addItem(sampleItem);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toEqual(sampleItem);

    const stored = JSON.parse(window.localStorage.getItem(QUOTE_CART_STORAGE_KEY) || "{}");
    expect(stored.items).toHaveLength(1);
  });

  it("permite actualizar un item", () => {
    const { result } = renderHook(() => useQuoteCart());

    act(() => {
      result.current.addItem(sampleItem);
    });
    act(() => {
      result.current.updateItem("w-1", { ...sampleItem, glass: "templado" });
    });

    expect(result.current.items[0].glass).toBe("templado");
  });

  it("permite eliminar un item y limpiar todo", () => {
    const { result } = renderHook(() => useQuoteCart());

    act(() => {
      result.current.addItem(sampleItem);
    });
    expect(result.current.items).toHaveLength(1);

    act(() => {
      result.current.removeItem("w-1");
    });
    expect(result.current.items).toHaveLength(0);

    act(() => {
      result.current.addItem(sampleItem);
      result.current.setOutsideLaMolina(true);
    });
    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.outsideLaMolina).toBe(false);
  });

  it("no se rompe si localStorage arroja un error", () => {
    window.localStorage.setItem = vi.fn(() => {
      throw new Error("QuotaExceeded");
    });

    const { result } = renderHook(() => useQuoteCart());

    expect(() => {
      act(() => {
        result.current.addItem(sampleItem);
      });
    }).not.toThrow();

    expect(result.current.items).toHaveLength(1);
  });
});
