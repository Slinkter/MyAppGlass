import { useCallback, useEffect } from "react";
import { mainStore } from "../components/map/mapConfig";
import type { MapProject } from "./useMapProjects";

export const useMapBounds = (
  map: google.maps.Map | null,
  google: typeof window.google | undefined,
  projects: MapProject[]
) => {
  const fitBounds = useCallback(() => {
    if (map && google) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(mainStore.position);
      projects.forEach((p) => bounds.extend(p.position));
      map.fitBounds(bounds);
    }
  }, [map, projects, google]);

  useEffect(() => {
    if (projects.length > 0) {
      fitBounds();
    }
  }, [fitBounds, projects.length]);

  return fitBounds;
};
