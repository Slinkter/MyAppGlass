"use client";

import { useSyncExternalStore } from "react";
import type { Product } from "@/shared/schemas/ecommerce-schemas";
import { logger } from "@/shared/utils/logger";
import {
  addToCart,
  computeTotals,
  reconcileWithCatalog,
  removeFromCart,
  updateQuantity,
  type CartLine,
} from "./cart-engine";

const STORAGE_KEY = "gya_cart_v1";

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
}

// zustand no está en package.json: store mínimo con useSyncExternalStore + localStorage.
let state: CartState = { lines: [], isOpen: false };
let hydrated = false;
const listeners = new Set<() => void>();
const SERVER_STATE: CartState = { lines: [], isOpen: false };

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
  } catch {
    logger.warn("No se pudo persistir el carrito");
  }
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) state = { ...state, lines: JSON.parse(raw) as CartLine[] };
  } catch {
    state = { ...state, lines: [] };
  }
}

function set(patch: Partial<CartState>) {
  state = { ...state, ...patch };
  if (patch.lines) persist();
  listeners.forEach((l) => l());
}

export const cartActions = {
  add: (product: Product, qty = 1) => set({ lines: addToCart(state.lines, product, qty) }),
  setQuantity: (id: string, qty: number) => set({ lines: updateQuantity(state.lines, id, qty) }),
  remove: (id: string) => set({ lines: removeFromCart(state.lines, id) }),
  clear: () => set({ lines: [] }),
  reconcile: (catalog: Product[]) => {
    const next = reconcileWithCatalog(state.lines, catalog);
    if (JSON.stringify(next) !== JSON.stringify(state.lines)) set({ lines: next });
  },
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
};

function subscribe(cb: () => void) {
  hydrate();
  listeners.add(cb);
  cb();
  return () => {
    listeners.delete(cb);
  };
}

function getSnapshot() {
  hydrate();
  return state;
}

export function useCartStore() {
  const snap = useSyncExternalStore(subscribe, getSnapshot, () => SERVER_STATE);
  return { ...snap, totals: computeTotals(snap.lines), ...cartActions };
}
