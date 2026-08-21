"use client";

import { useState, useEffect } from "react";
import { Order } from "@/shared/schemas/ecommerce-schemas";
import { orderService } from "@/features/products/services/orderService";

export function useRealtimeOrders(limitCount: number = 50) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = orderService.listenToOrders(
      (updatedOrders) => {
        setOrders(updatedOrders);
        setLoading(false);
        setError(null);
      },
      (err: unknown) => {
        setError(err instanceof Error ? err.message : "Error al sincronizar pedidos");
        setLoading(false);
      },
      limitCount
    );

    return () => unsubscribe();
  }, [limitCount]);

  return { orders, loading, error };
}
