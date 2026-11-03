"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/shared/schemas/ecommerce-schemas";
import { productService } from "@/features/products/services/productService";
import { INITIAL_PRODUCTS } from "@/features/products/data/initial-products";
import { logger } from "@/shared/utils/logger";

/** Catálogo público (lectura abierta en reglas): activos, con fallback al catálogo base. */
export function useShopProducts() {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS.filter((p) => p.isActive));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    productService
      .getAllProducts()
      .then((all) => {
        if (alive) setProducts(all.filter((p) => p.isActive !== false));
      })
      .catch((e) => logger.warn("Catálogo público no disponible", e))
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return { products, loading };
}
