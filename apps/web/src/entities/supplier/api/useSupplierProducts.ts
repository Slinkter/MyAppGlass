"use client";

import { useState, useEffect } from "react";
import type { SupplierProduct } from "../model";
import { supplierProductsRepository } from "./supplierProductsRepository";

/**
 * Catálogo de proveedores en tiempo real (solo productos activos).
 */
export function useSupplierProducts() {
  const [products, setProducts] = useState<SupplierProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = supplierProductsRepository.listen(
      (updatedProducts) => {
        setProducts(updatedProducts);
        setLoading(false);
        setError(null);
      },
      () => {
        setError("No se pudo cargar el catálogo de proveedores");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { products, loading, error };
}
