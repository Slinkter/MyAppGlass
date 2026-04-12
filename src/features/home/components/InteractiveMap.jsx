import React, { useState, useCallback } from "react";
import { GoogleMap } from "@react-google-maps/api";
import { Box, useColorMode, useColorModeValue } from "@chakra-ui/react";

// --- HOOKS ---
import {
  useMapProjects,
  useMapIcons,
  useMapState,
  useMapBounds,
  useGoogleMapsLoader,
} from "../hooks";

// --- COMPONENTS ---
import CustomMarker from "./map/CustomMarker";
import MapLoader from "./map/MapLoader";
import MapError from "./map/MapError";
import MapControls from "./map/MapControls";

// --- CONFIG & STYLES ---
import { containerStyle, center, mainStore } from "./map/mapConfig";
import { mapStyles } from "./map/mapStyles";

function InteractiveMapComponent() {
  const projects = useMapProjects();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const { colorMode } = useColorMode();
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const { isLoaded, loadError } = useGoogleMapsLoader();

  const google = window.google;

  const { map, onLoad, onUnmount } = useMapState();
  const fitBounds = useMapBounds(map, google, projects);
  const icons = useMapIcons(isLoaded, google);

  const handleMarkerToggle = useCallback((marker) => {
    setSelectedMarker((prev) => (prev?.id === marker?.id ? null : marker));
  }, []);

  const currentMapStyle = colorMode === "light" ? mapStyles.light : mapStyles.dark;

  if (loadError) return <MapError />;

  if (!isLoaded || !google || !icons) {
    return <MapLoader />;
  }

  return (
    <Box
      position="relative"
      w="100%"
      mx="auto"
      h={{ base: "400px", md: "600px" }}
      rounded={{ base: "xl", md: "2xl" }}
      overflow="hidden"
      boxShadow="lg"
      border={{ base: "none", md: "1px solid" }}
      borderColor={borderColor}
      padding={2}
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
        <MapControls onFitBounds={fitBounds} />

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
    </Box>
  );
}

const InteractiveMap = React.memo(InteractiveMapComponent);
export default InteractiveMap;
