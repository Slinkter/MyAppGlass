"use client";

/**
 * @file usePublishedSystems.ts
 * @description Sistemas publicados de un servicio para las páginas públicas.
 * Si la lectura falla devuelve una lista vacía: la página sigue mostrando lo que ya tenía.
 * @module entities/system/api
 */
import { useEffect, useState } from "react";
import type { PublicSystem } from "../model";
import { getPublishedByService } from "./systemsRepository";

export function usePublishedSystems(serviceSlug: string | undefined): PublicSystem[] {
  const [systems, setSystems] = useState<PublicSystem[]>([]);

  useEffect(() => {
    let cancelled = false;
    if (!serviceSlug) return;
    getPublishedByService(serviceSlug)
      .then((list) => {
        if (!cancelled) setSystems(list);
      })
      .catch(() => {
        if (!cancelled) setSystems([]);
      });
    return () => {
      cancelled = true;
    };
  }, [serviceSlug]);

  return systems;
}
