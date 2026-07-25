"use client";
import { useColorMode } from "@/components/ui/color-mode-hooks";
import React, { useMemo, useCallback } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { Box } from "@chakra-ui/react";

import { useMapProjects } from "@features/home/hooks/useMapProjects";
import { useMapIcons } from "@shared/hooks/map/useMapIcons";
import { useMapState } from "@shared/hooks/map/useMapState";
import { useGoogleMapsLoader } from "@shared/hooks/map/useGoogleMapsLoader";

import CustomMarker from "@shared/components/map/CustomMarker";
import MapLoader from "@shared/components/map/MapLoader";
import MapError from "@shared/components/map/MapError";
import MapControls from "@shared/components/map/MapControls";

import { containerStyle, center, mainStore } from "@shared/components/map/mapConfig";
import type { StoreLocation } from "@shared/types/map";
import { mapStyles } from "@shared/components/map/mapStyles";
import { type MapProject } from "@features/home/hooks/useMapProjects";
export type { MapProject };

export type MarkerType = MapProject | StoreLocation;

interface InteractiveMapProps {
  selectedMarker?: MarkerType | null;
  onMarkerToggle: (marker: MarkerType) => void;
}

const InteractiveMapComponent: React.FC<InteractiveMapProps> = ({ 
  selectedMarker, 
  onMarkerToggle 
}) => {
  const projects = useMapProjects();
  const { colorMode } = useColorMode();

  const { isLoaded, loadError } = useGoogleMapsLoader();

  const google = typeof window !== "undefined" ? window.google : undefined;

  const { map, onLoad, onUnmount } = useMapState();
  const icons = useMapIcons(isLoaded, google);

  const currentMapStyle = useMemo(
    () => (colorMode === "light" ? mapStyles.light : mapStyles.dark),
    [colorMode],
  );

  const handleMarkerToggle = useMemo(
    () => (marker: MarkerType) => onMarkerToggle(marker),
    [onMarkerToggle],
  );

  const handleFitBounds = useCallback(() => {
    if (map) {
      map.panTo(center);
      map.setZoom(12);
    }
  }, [map]);

  const mapOptions = useMemo(
    () => ({
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: false,
      styles: currentMapStyle,
      disableDefaultUI: false,
    }),
    [currentMapStyle],
  );

  if (loadError) return <MapError message={loadError.message} />;

  if (!isLoaded || !google || !icons) {
    return <MapLoader />;
  }

  return (
    <Box w="100%" h="100%" position="relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        <CustomMarker
          marker={mainStore}
          isSelected={selectedMarker?.id === mainStore.id}
          onToggleSelect={handleMarkerToggle}
          iconContent={icons.store.iconContent}
          isSvg={icons.store.isSvg}
          iconSize={icons.store.size}
          map={map}
          google={google}
        />

        {projects.map((project) => (
          <CustomMarker
            key={project.id}
            marker={project}
            isSelected={selectedMarker?.id === project.id}
            onToggleSelect={handleMarkerToggle}
            iconContent={icons.project.iconContent}
            isSvg={icons.project.isSvg}
            iconSize={icons.project.size}
            map={map}
            google={google}
          />
        ))}
      </GoogleMap>
      <MapControls onFitBounds={handleFitBounds} />
    </Box>
  );
};

const InteractiveMap = React.memo(InteractiveMapComponent);
export default InteractiveMap;
