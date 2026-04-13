"use client";

import React, { useState, useCallback } from "react";
// @ts-ignore
import { GoogleMap } from "@react-google-maps/api";
import { Box } from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";

// --- HOOKS ---
import {
  useMapProjects,
  useMapIcons,
  useMapState,
  useGoogleMapsLoader,
// @ts-ignore
} from "../hooks";

// --- COMPONENTS ---
import CustomMarker from "./map/CustomMarker";
// @ts-ignore
import MapLoader from "./map/MapLoader";
// @ts-ignore
import MapError from "./map/MapError";

// --- CONFIG & STYLES ---
// @ts-ignore
import { containerStyle, center, mainStore } from "./map/mapConfig";
// @ts-ignore
import { mapStyles } from "./map/mapStyles";

function InteractiveMapComponent() {
  const projects = useMapProjects();
  const [selectedMarker, setSelectedMarker] = useState<any>(null);
  const { colorMode } = useColorMode();

  const { isLoaded, loadError } = useGoogleMapsLoader();

  const google = typeof window !== "undefined" ? window.google : undefined;

  const { map, onLoad, onUnmount } = useMapState();
  const icons = useMapIcons(isLoaded, google);

  const handleMarkerToggle = useCallback((marker: any) => {
    setSelectedMarker((prev: any) => (prev?.id === marker?.id ? null : marker));
  }, []);

  const currentMapStyle = colorMode === "light" ? mapStyles.light : mapStyles.dark;

  if (loadError) return <MapError />;

  if (!isLoaded || !google || !icons) {
    return <MapLoader />;
  }

  return (
    <Box
      w="100%"
      h="100%"
      position="relative"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={{
          mapTypeControl: false,
          fullscreenControl: false,
          streetViewControl: false,
          zoomControl: false,
          styles: currentMapStyle,
          disableDefaultUI: false,
        }}
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

        {projects.map((project: any) => (
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
    </Box>
  );
}

const InteractiveMap = React.memo(InteractiveMapComponent);
export default InteractiveMap;
