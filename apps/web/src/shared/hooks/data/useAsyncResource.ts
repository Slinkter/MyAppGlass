/**
 * @file useAsyncResource.ts
 * @description Hook genérico de lectura remota (Firestore en cliente) con datos iniciales.
 * @module shared/hooks/data
 */

import { useEffect, useRef, useState } from "react";
import { logger } from "@/shared/utils/logger";

/** Tiempo máximo de espera a Firestore antes de conservar los datos iniciales. */
const REMOTE_TIMEOUT_MS = 8000;

/** Mensaje mostrado cuando no hay datos iniciales y la lectura remota falla. */
export const REMOTE_ERROR_MESSAGE =
  "No se pudo cargar la información. Revisa tu conexión e inténtalo nuevamente en unos minutos.";

export type ResourceSource = "remote" | "initial";

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
 * Ejecuta `fetcher` al montar (o cuando cambia `key`). El primer render (servidor y
 * cliente) usa `initialData` —en el export estático son los datos leídos en build—, de
 * modo que el HTML trae el contenido real; luego Firestore lo reemplaza al responder.
 *
 * - Si la lectura falla o expira y hay `initialData`, se conserva `initialData`.
 * - Si falla y no hay `initialData`, `data` queda en `null` y `error` trae un mensaje en español.
 * - `fetcher` devolviendo `null` significa "no existe / no visible" (el remoto manda).
 *
 * @param key - Identifica la consulta; al cambiar se vuelve a consultar.
 * @param fetcher - Lectura remota.
 * @param initialData - Datos con los que se renderiza primero (opcional).
 * @param enabled - Si es `false` no consulta y queda en carga.
 */
export function useAsyncResource<T>(
  key: string,
  fetcher: () => Promise<T | null>,
  initialData?: T | null,
  enabled = true
): AsyncResource<T> {
  const [state, setState] = useState<ResourceState<T> | null>(null);
  const fetcherRef = useRef(fetcher);
  const initialRef = useRef<T | null>(initialData ?? null);

  useEffect(() => {
    fetcherRef.current = fetcher;
    initialRef.current = initialData ?? null;
  });

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;

    withTimeout(fetcherRef.current(), REMOTE_TIMEOUT_MS)
      .then((remote) => {
        if (cancelled) return;
        setState({ key, data: remote, error: null, source: "remote" });
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        const initial = initialRef.current;
        if (initial !== null) {
          logger.warn("Lectura remota fallida, se conservan los datos iniciales", { key, error });
          setState({ key, data: initial, error: null, source: "initial" });
        } else {
          logger.warn("Lectura remota fallida y sin datos iniciales", { key, error });
          setState({ key, data: null, error: new Error(REMOTE_ERROR_MESSAGE), source: "initial" });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [key, enabled]);

  if (!enabled || !state || state.key !== key) {
    const initial = enabled ? (initialData ?? null) : null;
    if (initial !== null) {
      return { data: initial, isLoading: false, error: null, source: "initial" };
    }
    return { data: null, isLoading: true, error: null, source: null };
  }
  return { data: state.data, isLoading: false, error: state.error, source: state.source };
}
