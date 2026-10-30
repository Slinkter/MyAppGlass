import { useMemo } from "react";
import { useProjects } from "@/features/projects/hooks/useProjects";
import type { Project } from "@/shared/types/project";
import type { MapProject } from "@/shared/types/map";

export type { MapProject } from "@/shared/types/map";

/** Proyectos de Firestore con coordenadas, listos para el mapa interactivo del home. */
export const useMapProjects = (): MapProject[] => {
  const { data } = useProjects();

  return useMemo(
    () =>
      (data ?? [])
        .map((project: Project) => {
          if (project.lat != null && project.lng != null) {
            return {
              ...project,
              type: "project" as const,
              client: project.name,
              // La tarjeta del mapa lee `photosObra`; en Firestore las fotos viven en `gallery`.
              photosObra: (project.photos ?? []).flatMap((photo, idx) =>
                typeof photo === "object" && "src" in photo
                  ? [{ id: idx, image: photo.src }]
                  : []
              ),
              position: { lat: project.lat, lng: project.lng },
            } as unknown as MapProject;
          }
          return null;
        })
        .filter((p): p is MapProject => p !== null),
    [data]
  );
};
