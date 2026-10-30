/**
 * @file useAsyncResource.ts
 * @description Hook genérico de lectura remota con fallback local (Firestore en cliente).
 * @module shared/hooks/data
 */

import { useEffect, useRef, useState } from "react";
import { logger } from "@/shared/utils/logger";

/** Tiempo máximo de espera a Firestore antes de usar el fallback local. */
const REMOTE_TIMEOUT_MS = 8000;

export type ResourceSource = "remote" | "fallback";

export interface AsyncResource<T> {
  data: T | null;
  isLoading: boolean;
  error: unknown;
  source: ResourceSource | null;
}

interface ResourceState<T> {
  key: string;
  data: T | null;
  error: unknown;
  source: ResourceSource;
}

const withTimeout = <T,>(promise: Promise<T>, ms: number): Promise<T> =>
  new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("Tiempo de espera agotado")), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });

/**
 * Ejecuta `fetcher` al montar (o cuando cambia `key`). Si falla, expira o devuelve
 * `null` (vacío), usa `getFallback()`.
 *
 * @param key - Identifica la consulta; al cambiar se vuelve a consultar.
 * @param fetcher - Lectura remota. Devolver `null` significa "vacío, usa fallback".
 * @param getFallback - Datos locales de respaldo.
 * @param enabled - Si es `false` no consulta y queda en carga.
 */
export function useAsyncResource<T>(
  key: string,
  fetcher: () => Promise<T | null>,
  getFallback: () => T | null,
  enabled = true
): AsyncResource<T> {
  const [state, setState] = useState<ResourceState<T> | null>(null);
  const fetcherRef = useRef(fetcher);
  const fallbackRef = useRef(getFallback);

  useEffect(() => {
    fetcherRef.current = fetcher;
    fallbackRef.current = getFallback;
  });

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;

    withTimeout(fetcherRef.current(), REMOTE_TIMEOUT_MS)
      .then((remote) => {
        if (cancelled) return;
        if (remote !== null) {
          setState({ key, data: remote, error: null, source: "remote" });
        } else {
          setState({ key, data: fallbackRef.current(), error: null, source: "fallback" });
        }
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        logger.warn("Lectura remota fallida, usando datos locales", { key, error });
        setState({ key, data: fallbackRef.current(), error, source: "fallback" });
      });

    return () => {
      cancelled = true;
    };
  }, [key, enabled]);

  if (!enabled || !state || state.key !== key) {
    return { data: null, isLoading: true, error: null, source: null };
  }
  return { data: state.data, isLoading: false, error: state.error, source: state.source };
}
