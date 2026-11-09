"use client";

/**
 * @file useLocationData.ts
 * @description Datos para los prototipos de la sección Ubicación: sede, obras con coordenadas,
 * años, distritos y distancia de cada obra a la sede.
 */

import { useMemo } from "react";
import type { Project as FirestoreProject } from "@/shared/api/firebase/types";
import { useProjects } from "@/features/projects/hooks/useProjects";
import { useMapProjects } from "@features/home/hooks/useMapProjects";
import { mainStore } from "@shared/components/map/mapConfig";
import type { MapProject, StoreLocation } from "@/shared/types/map";

export const STORE_ID = mainStore.id;
export const STORE_SCHEDULE = { days: "Lunes a Sábado", hours: "8:00 am – 6:00 pm" } as const;
export const STORE_DIRECTIONS_URL = "https://maps.app.goo.gl/Nvr7jiQmJdUvQVd36";

export interface LocationProject extends MapProject {
  /** Enlace al detalle (`/proyectos/<id>` o `/proyectos/ver?id=`); llega del proyecto de Firestore. */
  href?: string;
  /** Año numérico extraído de `year` (p. ej. "Junio 2025" → 2025); `null` si no hay. */
  yearNumber: number | null;
  /** Distancia en línea recta a la sede, en km (1 decimal). */
  distanceKm: number;
}

const toRad = (deg: number): number => (deg * Math.PI) / 180;

/** Distancia haversine en km entre dos coordenadas. */
export const distanceBetweenKm = (
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number => {
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

const extractYear = (label: string | undefined): number | null => {
  const match = label?.match(/\d{4}/);
  return match ? Number(match[0]) : null;
};

export interface LocationData {
  store: StoreLocation;
  projects: LocationProject[];
  /** Años con obras, de más reciente a más antiguo. */
  years: number[];
  /** Distritos (campo `address` de la obra) ordenados alfabéticamente. */
  districts: string[];
  /** Estado de carga desde Firestore. */
  isLoading: boolean;
}

export function useLocationData(initialProjects?: FirestoreProject[]): LocationData {
  const raw = useMapProjects(initialProjects);
  const { isLoading } = useProjects(initialProjects);

  return useMemo(() => {
    const projects: LocationProject[] = raw
      .map((project) => ({
        ...project,
        href: (project as LocationProject).href ?? `/proyectos/ver?id=${project.id}`,
        yearNumber: extractYear(project.year),
        distanceKm:
          Math.round(distanceBetweenKm(mainStore.position, project.position) * 10) / 10,
      }))
      .sort((a, b) => (b.yearNumber ?? 0) - (a.yearNumber ?? 0));

    const years = [...new Set(projects.map((p) => p.yearNumber).filter((y): y is number => y !== null))].sort(
      (a, b) => b - a,
    );
    const districts = [...new Set(projects.map((p) => p.address).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b, "es"),
    );

    return { store: mainStore, projects, years, districts, isLoading };
  }, [raw, isLoading]);
}
