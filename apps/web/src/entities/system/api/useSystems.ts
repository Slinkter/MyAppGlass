"use client";

/**
 * @file useSystems.ts
 * @description Hook de administración que mantiene la lista de sistemas sincronizada
 * con Firestore en tiempo real.
 * @module entities/system/api
 */
import { useEffect, useState } from "react";
import type { CatalogSystem } from "../model";
import { listenAll } from "./systemsRepository";

const LOAD_ERROR_MESSAGE = "No se pudieron cargar los sistemas";

export interface UseSystemsResult {
  systems: CatalogSystem[];
  loading: boolean;
  error: string | null;
}

/**
 * Devuelve todos los sistemas (borradores y publicados) y el estado de carga.
 */
export function useSystems(): UseSystemsResult {
  const [systems, setSystems] = useState<CatalogSystem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = listenAll(
      (data) => {
        setSystems(data);
        setError(null);
        setLoading(false);
      },
      () => {
        setError(LOAD_ERROR_MESSAGE);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, []);

  return { systems, loading, error };
}
