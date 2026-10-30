"use client";

import React, { createContext, useContext, useState, useMemo, useCallback } from "react";
import { OrderItem, Product } from "@/shared/schemas/ecommerce-schemas";
import { orderService } from "@/features/products/services/orderService";

export interface OrderClientData {
  id: string;
  name: string;
  dniRuc?: string;
  phone?: string;
  address?: string;
  district?: string;
}

export type PaymentMethod =
  | "EFECTIVO"
  | "TRANSFERENCIA_BCP"
  | "TRANSFERENCIA_INTERBANK"
  | "YAPE_PLIN"
  | "TARJETA"
  | "CREDITO";

interface OrderDraftContextType {
  client: OrderClientData | null;
  items: OrderItem[];
  paymentMethod: PaymentMethod;
  notes: string;
  subtotal: number;
  igv: number;
  total: number;
  totalUnits: number;
  isSubmitting: boolean;
  setClient: (client: OrderClientData | null) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setNotes: (notes: string) => void;
  addItem: (product: Product, quantity: number) => { success: boolean; message?: string };
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number, maxStock: number) => { success: boolean; message?: string };
  clearDraft: () => void;
  submitOrder: (adminUid: string, adminName: string) => Promise<{ success: boolean; orderId?: string; error?: string }>;
}

const OrderDraftContext = createContext<OrderDraftContextType | undefined>(undefined);

export const OrderDraftProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [client, setClient] = useState<OrderClientData | null>(null);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("TRANSFERENCIA_BCP");
  const [notes, setNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const subtotal = useMemo(() => {
    const raw = items.reduce((acc, item) => acc + item.totalPrice, 0);
    return Math.round(raw * 100) / 100;
  }, [items]);

  const igv = useMemo(() => {
    return Math.round(subtotal * 0.18 * 100) / 100;
  }, [subtotal]);

  const total = useMemo(() => {
    return Math.round((subtotal + igv) * 100) / 100;
  }, [subtotal, igv]);

  const totalUnits = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const addItem = useCallback(
    (product: Product, quantity: number) => {
      if (!product.id) return { success: false, message: "Producto no identificado" };
      if (quantity <= 0) return { success: false, message: "La cantidad debe ser mayor a 0" };

      const existingIndex = items.findIndex((i) => i.productId === product.id);
      const currentQtyInDraft = existingIndex >= 0 ? items[existingIndex].quantity : 0;
      const newTotalQty = currentQtyInDraft + quantity;

      if (newTotalQty > product.stock) {
        return {
          success: false,
          message: `Stock insuficiente. Stock actual: ${product.stock}, ya en orden: ${currentQtyInDraft}`,
        };
      }

      if (existingIndex >= 0) {
        const updated = [...items];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          totalPrice: Math.round(newQty * updated[existingIndex].unitPrice * 100) / 100,
        };
        setItems(updated);
      } else {
        const newItem: OrderItem = {
          productId: product.id,
          sku: product.sku,
          name: product.name,
          category: product.category,
          unit: product.unit,
          unitPrice: product.unitPrice,
          quantity: quantity,
          totalPrice: Math.round(quantity * product.unitPrice * 100) / 100,
        };
        setItems([...items, newItem]);
      }

      return { success: true };
    },
    [items],
  );

  const removeItem = useCallback(
    (productId: string) => {
      setItems((prev) => prev.filter((i) => i.productId !== productId));
    },
    [],
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number, maxStock: number) => {
      if (quantity <= 0) {
        setItems((prev) => prev.filter((i) => i.productId !== productId));
        return { success: true };
      }

      if (quantity > maxStock) {
        return {
          success: false,
          message: `No puede exceder el stock disponible de ${maxStock} unidades`,
        };
      }

      setItems((prev) =>
        prev.map((item) =>
          item.productId === productId
            ? {
                ...item,
                quantity,
                totalPrice: Math.round(quantity * item.unitPrice * 100) / 100,
              }
            : item
        )
      );
      return { success: true };
    },
    [],
  );

  const clearDraft = useCallback(() => {
    setClient(null);
    setItems([]);
    setPaymentMethod("TRANSFERENCIA_BCP");
    setNotes("");
  }, []);

  const submitOrder = useCallback(
    async (adminUid: string, adminName: string) => {
      if (!client) {
        return { success: false, error: "Debe seleccionar o registrar un cliente para emitir la orden" };
      }
      if (items.length === 0) {
        return { success: false, error: "La orden debe contener al menos un producto" };
      }

      setIsSubmitting(true);
      try {
        const orderId = await orderService.saveOrderAndDecreaseStock({
          adminUid,
          adminName,
          clientId: client.id,
          clientName: client.name,
          clientDniRuc: client.dniRuc,
          clientPhone: client.phone,
          clientAddress: client.address,
          clientDistrict: client.district,
          items,
          subtotal,
          igv,
          total,
          paymentMethod,
          notes,
        });

        setClient(null);
        setItems([]);
        setPaymentMethod("TRANSFERENCIA_BCP");
        setNotes("");
        return { success: true, orderId };
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : "Error desconocido al procesar la orden";
        return { success: false, error: errorMsg };
      } finally {
        setIsSubmitting(false);
      }
    },
    [client, items, subtotal, igv, total, paymentMethod, notes],
  );

  const contextValue = useMemo(
    () => ({
      client,
      items,
      paymentMethod,
      notes,
      subtotal,
      igv,
      total,
      totalUnits,
      isSubmitting,
      setClient,
      setPaymentMethod,
      setNotes,
      addItem,
      removeItem,
      updateQuantity,
      clearDraft,
      submitOrder,
    }),
    [client, items, paymentMethod, notes, subtotal, igv, total, totalUnits, isSubmitting, addItem, removeItem, updateQuantity, clearDraft, submitOrder],
  );

  return (
    <OrderDraftContext.Provider value={contextValue}>
      {children}
    </OrderDraftContext.Provider>
  );
};

export const useOrderDraft = () => {
  const context = useContext(OrderDraftContext);
  if (!context) {
    throw new Error("useOrderDraft debe ser usado dentro de un OrderDraftProvider");
  }
  return context;
};
