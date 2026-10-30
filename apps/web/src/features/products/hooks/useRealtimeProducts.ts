"use client";

import { useState, useEffect } from "react";
import { Product } from "@/shared/schemas/ecommerce-schemas";
import { productService } from "@/features/products/services/productService";
import { INITIAL_PRODUCTS } from "@/features/products/data/initial-products";

export function useRealtimeProducts() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = productService.listenToProducts(
      (updatedProducts) => {
        setProducts(updatedProducts);
        setLoading(false);
        setError(null);
      },
      (err: unknown) => {
        setError(err instanceof Error ? err.message : "Error al sincronizar productos");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { products, loading, error };
}
