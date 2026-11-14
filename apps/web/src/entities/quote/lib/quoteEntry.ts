/**
 * @file quoteEntry.ts
 * @description Puntos de entrada al cotizador desde la página de un servicio (funciones puras).
 * @module entities/quote
 */

import type { SystemType } from "@/entities/window/model";
import { parseSystemParam } from "./quoteLines";

export interface QuoteEntry {
  categoria: "ventana";
  sistema: SystemType;
}

interface QuoteEntryRoute {
  /** Slug del servicio en Firestore (`/servicios/ventana`). */
  serviceSlug: string;
  /** Fragmento normalizado (minúsculas, sin tildes) que debe contener el nombre del sistema. */
  systemMatch: string;
  entry: QuoteEntry;
}

/** Servicios y sistemas que ya tienen cotizador. El resto sigue por WhatsApp. */
export const QUOTE_ENTRY_ROUTES: readonly QuoteEntryRoute[] = [
  { serviceSlug: "ventana", systemMatch: "nova", entry: { categoria: "ventana", sistema: "ventana_nova" } },
  { serviceSlug: "ventana", systemMatch: "serie 20", entry: { categoria: "ventana", sistema: "ventana_serie20" } },
  { serviceSlug: "ventana", systemMatch: "serie 35", entry: { categoria: "ventana", sistema: "ventana_serie35" } },
];

const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

/** Devuelve la ruta del cotizador para ese servicio y sistema, o `null` si aún no lo tiene. */
export function quoteEntryHref(serviceSlug: string | undefined, systemLabel: string | undefined): string | null {
  if (!serviceSlug || !systemLabel) return null;
  const label = normalize(systemLabel);
  const route = QUOTE_ENTRY_ROUTES.find((r) => r.serviceSlug === serviceSlug && label.includes(r.systemMatch));
  if (!route) return null;
  const params = new URLSearchParams({ categoria: route.entry.categoria, sistema: route.entry.sistema });
  return `/presupuesto?${params.toString()}`;
}

/** Valida `?categoria=&sistema=`; cualquier valor desconocido devuelve `null`. */
export function parseQuoteEntry(search: string | URLSearchParams): QuoteEntry | null {
  const params = typeof search === "string" ? new URLSearchParams(search) : search;
  if (params.get("categoria") !== "ventana") return null;
  const sistema = parseSystemParam(params.get("sistema"));
  return sistema ? { categoria: "ventana", sistema } : null;
}
