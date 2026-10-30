/**
 * @file useServices.ts
 * @description Hooks públicos de servicios: leen Firestore en el cliente y caen a los
 * datos locales si falla, expira o no hay documentos.
 * @module services/hooks
 */

import { getServices, getServiceBySlug } from "@/shared/api/firebase/servicesRepository";
import {
  useAsyncResource,
  type AsyncResource,
} from "@/shared/hooks/data/useAsyncResource";
import type { ServicePageData } from "@/features/services/services/serviceService";
import {
  getLocalServiceListItems,
  getLocalServicePageData,
  toServiceListItem,
  toServicePageData,
  type ServiceListItem,
} from "./serviceMappers";

export type { ServiceListItem };

/** Lista de servicios publicados, ordenados por `order`. */
export function useServices(): AsyncResource<ServiceListItem[]> {
  return useAsyncResource<ServiceListItem[]>(
    "services",
    async () => {
      // Se filtra `published` en cliente para no requerir índice compuesto.
      const all = await getServices();
      if (all.length === 0) return null;
      return all.filter((s) => s.published).map(toServiceListItem);
    },
    getLocalServiceListItems
  );
}

/**
 * Datos de la página de detalle de un servicio por slug.
 * `data === null` y `isLoading === false` significa "no encontrado".
 */
export function useService(slug: string | undefined): AsyncResource<ServicePageData> {
  const resource = useAsyncResource<{ pageData: ServicePageData | null }>(
    `service:${slug ?? ""}`,
    async () => {
      const service = await getServiceBySlug(slug ?? "");
      if (!service) return null; // sin documento: usar local
      // Documento oculto desde el admin: no mostrar ni siquiera el local.
      return { pageData: service.published ? toServicePageData(service) : null };
    },
    () => {
      const pageData = slug ? getLocalServicePageData(slug) : null;
      return pageData ? { pageData } : null; // null: slug solo en Firestore, queda en carga
    },
    Boolean(slug)
  );
  return { ...resource, data: resource.data?.pageData ?? null };
}
