"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { Box } from "@chakra-ui/react";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useColorMode } from "@/components/ui/color-mode-hooks";
import { useIsMobile } from "@/shared/hooks/ui/useIsMobile";
import { useGoogleMapsLoader } from "@shared/hooks/map/useGoogleMapsLoader";
import { useMapState } from "@shared/hooks/map/useMapState";
import MapLoader from "@shared/components/map/MapLoader";
import MapError from "@shared/components/map/MapError";
import { containerStyle, center, mainStore } from "@shared/components/map/mapConfig";
import { mapStyles } from "@shared/components/map/mapStyles";
import { createLookupMap } from "@/shared/utils/algorithm-utils";
import LocationMarker from "./LocationMarker";
import type { LocationProject } from "./useLocationData";

/** Ventana en la que se ignora el clic del mapa que sigue al clic de un marcador. */
const MARKER_CLICK_GUARD_MS = 400;

export interface LocationMapProps {
  projects: LocationProject[];
  /** `id` de la obra (o `"store"`) seleccionada; `null` si no hay. */
  selectedId: string | number | null;
  onSelect: (id: string | number | null) => void;
  /** Muestra la sede como marcador (por defecto sí). */
  showStore?: boolean;
  /** Muestra el botón para re-centrar (por defecto sí). */
  showRecenter?: boolean;
  /** Zoom inicial si no se ajusta a los límites (por defecto 12). */
  zoom?: number;
}

/**
 * Mapa de Google reutilizable para los prototipos de Ubicación.
 * - No lee `window` durante el render: `google` entra por estado tras cargar el script.
 * - `gestureHandling: "cooperative"` en móvil para no atrapar el scroll de la página.
 * - Ajusta los límites a sede + obras al cargar y cuando cambia la lista filtrada.
 * - Al seleccionar un marcador desde fuera, centra el mapa en él.
 */
const LocationMap: React.FC<LocationMapProps> = ({
  projects,
  selectedId,
  onSelect,
  showStore = true,
  showRecenter = true,
  zoom = 12,
}) => {
  const { colorMode } = useColorMode();
  const isMobile = useIsMobile();
  const { isLoaded, loadError } = useGoogleMapsLoader();
  const { map, onLoad, onUnmount } = useMapState();
  const [googleReady, setGoogleReady] = useState(false);
  const lastMarkerClickAt = useRef(0);

  const handleMarkerSelect = useCallback(
    (id: string | number) => {
      lastMarkerClickAt.current = Date.now();
      onSelect(id);
    },
    [onSelect],
  );

  useEffect(() => {
    if (isLoaded && typeof window !== "undefined" && window.google?.maps) setGoogleReady(true);
  }, [isLoaded]);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: !isMobile,
      gestureHandling: isMobile ? "cooperative" : "greedy",
      styles: colorMode === "light" ? mapStyles.light : mapStyles.dark,
      clickableIcons: false,
    }),
    [colorMode, isMobile],
  );

  const fitAll = useCallback(() => {
    if (!map || typeof window === "undefined" || !window.google?.maps) return;
    const points = projects.map((p) => p.position);
    if (showStore) points.push(mainStore.position);
    if (points.length === 0) {
      map.panTo(center);
      map.setZoom(zoom);
      return;
    }
    const bounds = new window.google.maps.LatLngBounds();
    points.forEach((point) => bounds.extend(point));
    map.fitBounds(bounds, isMobile ? 36 : 64);
  }, [map, projects, showStore, isMobile, zoom]);

  // Ajusta a todos los puntos al cargar y cuando cambia la lista (filtros).
  useEffect(() => {
    fitAll();
  }, [fitAll]);

  const projectMap = useMemo(() => createLookupMap(projects, (p) => p.id), [projects]);

  // Centra el mapa en la selección hecha desde fuera (lista, carrusel, tarjeta).
  useEffect(() => {
    if (!map || selectedId === null) return;
    const target =
      selectedId === mainStore.id
        ? mainStore.position
        : (selectedId !== null ? projectMap.get(selectedId)?.position : undefined);
    if (target) map.panTo(target);
  }, [map, selectedId, projectMap]);

  if (loadError) return <MapError message={loadError.message} />;
  if (!isLoaded || !googleReady) return <MapLoader />;

  return (
    <Box
      w="100%"
      h="100%"
      position="relative"
      borderRadius="inherit"
      // El contenedor de Google es enfocable: al hacer clic no debe aparecer el marco negro
      // del navegador. El foco por teclado sigue visible con :focus-visible.
      css={{
        "& :focus": { outline: "none" },
        "& :focus-visible": { outline: "2px solid", outlineColor: "primary.500", outlineOffset: "-2px" },
      }}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
        onClick={() => {
          // Google dispara además un clic del mapa (sin `domEvent`) justo tras el del marcador:
          // se ignora para no deseleccionar al instante lo que se acaba de seleccionar.
          if (Date.now() - lastMarkerClickAt.current < MARKER_CLICK_GUARD_MS) return;
          onSelect(null);
        }}
      >
        {showStore && (
          <LocationMarker
            id={mainStore.id}
            name={mainStore.name}
            position={mainStore.position}
            kind="store"
            isSelected={selectedId === mainStore.id}
            onSelect={handleMarkerSelect}
          />
        )}
        {projects.map((project) => (
          <LocationMarker
            key={project.id}
            id={project.id}
            name={project.name}
            position={project.position}
            kind="project"
            isSelected={selectedId === project.id}
            onSelect={handleMarkerSelect}
          />
        ))}
      </GoogleMap>

      {showRecenter && (
        <Box position="absolute" top={{ base: "3", lg: "5" }} right={{ base: "3", lg: "5" }} zIndex={10}>
          <Button
            variant="outline"
            size="sm"
            w="11"
            h="11"
            px="0"
            minW="11"
            minH="11"
            bg="bg.surface/88"
            backdropFilter="blur(24px) saturate(1.4)"
            borderRadius="xl"
            boxShadow="md"
            aria-label="Ver todas las ubicaciones"
            onClick={fitAll}
            css={{
              WebkitBackdropFilter: "blur(24px) saturate(1.4)",
              "@media (prefers-reduced-transparency: reduce), (prefers-contrast: more)": {
                backdropFilter: "none",
                WebkitBackdropFilter: "none",
                background: "var(--chakra-colors-bg\\.surface)",
              },
            }}
          >
            <Compass size={20} style={{ flexShrink: 0 }} />
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default React.memo(LocationMap);
