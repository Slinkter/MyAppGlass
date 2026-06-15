import { useColorMode } from "@/components/ui/color-mode-hooks";
import React, { useMemo, useCallback } from "react";
import { Box } from "@chakra-ui/react";
import { GoogleMap } from "@react-google-maps/api";
import { useGoogleMapsLoader, useMapIcons, useMapState } from "@/features/home/hooks";
import { mapStyles } from "@/features/home/components/store/map/mapStyles";
import CustomMarker from "@/features/home/components/store/map/CustomMarker";
import MapLoader from "@/features/home/components/store/map/MapLoader";
import MapError from "@/features/home/components/store/map/MapError";
import MapControls from "@/features/home/components/store/map/MapControls";
import { Project } from "@/shared/types/project";
import type { MapProject } from "@/features/home/hooks/useMapProjects";

const containerStyle = {
  width: "100%",
  height: "100%",
};

interface MapViewerProps {
  lat: number;
  lng: number;
  projectData?: Partial<Project>;
}

const MapViewer: React.FC<MapViewerProps> = ({ lat, lng, projectData }) => {
  const { colorMode } = useColorMode();
  const { isLoaded, loadError } = useGoogleMapsLoader();
  const { map, onLoad, onUnmount } = useMapState();
  const google = window.google;
  const icons = useMapIcons(isLoaded, google);

  const center = useMemo(() => ({ lat, lng }), [lat, lng]);
  
  const currentMapStyle = useMemo(
    () => (colorMode === "light" 
      ? (mapStyles as { light: google.maps.MapTypeStyle[] }).light 
      : (mapStyles as { dark: google.maps.MapTypeStyle[] }).dark),
    [colorMode]
  );

  const handleFitBounds = useCallback(() => {
    if (map) {
      map.panTo(center);
      map.setZoom(15);
    }
  }, [map, center]);

  const mapOptions = useMemo(
    () => ({
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: false, 
      styles: currentMapStyle,
      disableDefaultUI: false,
    }),
    [currentMapStyle]
  );

  if (loadError) return <MapError />;
  if (!isLoaded || !google || !icons) return <MapLoader />;

  const projectMarker: MapProject = {
    id: "detail-project",
    name: projectData?.name || "Project",
    residencial: projectData?.name || "",
    address: projectData?.address || "",
    year: projectData?.year || "",
    type: "project" as const,
    client: projectData?.name || "Client",
    position: { lat, lng },
    ...projectData as Record<string, unknown>
  };

  return (
    <Box w="100%" h="100%" position="relative">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={mapOptions}
      >
        <CustomMarker
          marker={projectMarker}
          isSelected={true}
          onToggleSelect={() => {}} 
          iconContent={icons.project.iconContent}
          isSvg={icons.project.isSvg}
          iconSize={icons.project.size}
          map={map}
          google={google}
        />
      </GoogleMap>
      <MapControls onFitBounds={handleFitBounds} />
    </Box>
  );
};

export default React.memo(MapViewer);
