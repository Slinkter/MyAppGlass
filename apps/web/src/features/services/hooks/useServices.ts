/**
 * @file useServices.ts
 * @description Hooks públicos de servicios: el primer render usa `initialData` (datos de
 * build leídos de Firestore, para el HTML exportado) y luego se refresca desde Firestore
 * en el cliente.
 * @module services/hooks
 */

import { useMemo } from "react";
import type { Service } from "@/shared/api/firebase/types";
import { getServices, getServiceBySlug } from "@/shared/api/firebase/servicesRepository";
import {
  useAsyncResource,
  type AsyncResource,
} from "@/shared/hooks/data/useAsyncResource";
import type { ServicePageData } from "@/features/services/types";
import {
  toServiceListItem,
  toServicePageData,
  type ServiceListItem,
} from "./serviceMappers";

export type { ServiceListItem };

/**
 * Lista de servicios publicados, ordenados por `order`.
 * `initialData` son los servicios leídos en build; sus slugs son los que tienen HTML
 * prerenderizado (el resto enlaza a `/servicios/ver?slug=`).
 */
export function useServices(initialData?: Service[]): AsyncResource<ServiceListItem[]> {
  const prerenderedSlugs = useMemo(
    () => new Set((initialData ?? []).map((s) => s.slug)),
    [initialData]
  );
  const initialItems = useMemo(
    () =>
      initialData && initialData.length > 0
        ? initialData.map((s) => toServiceListItem(s, prerenderedSlugs))
        : null,
    [initialData, prerenderedSlugs]
  );

  return useAsyncResource<ServiceListItem[]>(
    "services",
    async () => {
      // Se filtra `published` en cliente para no requerir índice compuesto.
      const all = await getServices();
      return all.filter((s) => s.published).map((s) => toServiceListItem(s, prerenderedSlugs));
    },
    initialItems
  );
}

/**
 * Datos de la página de detalle de un servicio por slug. `initialData` es el servicio
 * leído en build para ese slug.
 * `data === null` y `isLoading === false` significa "no encontrado".
 */
export function useService(
  slug: string | undefined,
  initialData?: Service
): AsyncResource<ServicePageData> {
  const initialPage = useMemo(
    () =>
      initialData && initialData.slug === slug
        ? { pageData: toServicePageData(initialData) }
        : null,
    [initialData, slug]
  );

  const resource = useAsyncResource<{ pageData: ServicePageData | null }>(
    `service:${slug ?? ""}`,
    async () => {
      const service = await getServiceBySlug(slug ?? "");
      // Sin documento o documento oculto desde el admin: no encontrado.
      return { pageData: service && service.published ? toServicePageData(service) : null };
    },
    initialPage,
    Boolean(slug)
  );
  return { ...resource, data: resource.data?.pageData ?? null };
}
