"use client";

import { useEffect, useState, useCallback } from "react";
import type { WindowQuoteItem } from "@/entities/quote";

export const QUOTE_CART_STORAGE_KEY = "gya_quote_cart_v1";

export interface StoredQuoteCart {
  items: WindowQuoteItem[];
  outsideLaMolina: boolean;
}

const DEFAULT_STATE: StoredQuoteCart = {
  items: [],
  outsideLaMolina: false,
};

function readStorage(): StoredQuoteCart {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(QUOTE_CART_STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.items)) {
      return {
        items: parsed.items,
        outsideLaMolina: Boolean(parsed.outsideLaMolina),
      };
    }
  } catch {
    // Si falla localStorage (modo incógnito estricto o JSON corrupto), fallback silencioso
  }
  return DEFAULT_STATE;
}

function writeStorage(state: StoredQuoteCart): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(QUOTE_CART_STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Si localStorage está deshabilitado o lleno, no romper la UI
  }
}

export function useQuoteCart() {
  const [cart, setCart] = useState<StoredQuoteCart>(DEFAULT_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setCart(readStorage());
    setIsLoaded(true);
  }, []);

  const addItem = useCallback((item: WindowQuoteItem) => {
    setCart((prev) => {
      const next = { ...prev, items: [...prev.items, item] };
      writeStorage(next);
      return next;
    });
  }, []);

  const updateItem = useCallback((id: string, updated: WindowQuoteItem) => {
    setCart((prev) => {
      const next = {
        ...prev,
        items: prev.items.map((i) => (i.id === id ? updated : i)),
      };
      writeStorage(next);
      return next;
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => {
      const next = {
        ...prev,
        items: prev.items.filter((i) => i.id !== id),
      };
      writeStorage(next);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    const next = { items: [], outsideLaMolina: false };
    setCart(next);
    writeStorage(next);
  }, []);

  const setOutsideLaMolina = useCallback((outside: boolean) => {
    setCart((prev) => {
      const next = { ...prev, outsideLaMolina: outside };
      writeStorage(next);
      return next;
    });
  }, []);

  return {
    items: cart.items,
    outsideLaMolina: cart.outsideLaMolina,
    isLoaded,
    addItem,
    updateItem,
    removeItem,
    clearCart,
    setOutsideLaMolina,
  };
}
