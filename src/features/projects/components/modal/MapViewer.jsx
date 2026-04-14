import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";
import React, { useMemo, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Flex, Spinner, Box } from "@chakra-ui/react";
import { GoogleMap } from "@react-google-maps/api";
import { useGoogleMapsLoader, useMapIcons, useMapState } from "@/features/home/hooks";
import { mapStyles } from "@/features/home/components/map/mapStyles";
import CustomMarker from "@/features/home/components/map/CustomMarker";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const MapViewer = ({ lat, lng, projectData }) => {
  const { colorMode } = useColorMode();
  const [selectedMarker, setSelectedMarker] = useState(null);
  
  const spinnerBg = useColorModeValue("gray.100", "gray.800");
  const spinnerColor = "text.accent";
  
  const { isLoaded, loadError } = useGoogleMapsLoader();
  const { map, onLoad, onUnmount } = useMapState();
  const google = window.google;
  const icons = useMapIcons(isLoaded, google);

  const center = useMemo(() => ({ lat, lng }), [lat, lng]);
  const currentMapStyle = colorMode === "light" ? mapStyles.light : mapStyles.dark;

  const handleMarkerToggle = useCallback((marker) => {
    setSelectedMarker((prev) => (prev?.id === marker?.id ? null : marker));
  }, []);

  const options = useMemo(
    () => ({
      mapTypeControl: false,
      fullscreenControl: false,
      streetViewControl: false,
      zoomControl: true,
      styles: currentMapStyle,
      disableDefaultUI: false,
      mapId: "DEMO_MAP_ID",
    }),
    [currentMapStyle]
  );

  if (loadError) {
    return (
      <Flex position="absolute" inset="0" align="center" justify="center" bg={spinnerBg} zIndex={1}>
        <Box color="red.500">Error loading map</Box>
      </Flex>
    );
  }

  if (!isLoaded || !google || !icons) {
    return (
      <Flex position="absolute" inset="0" align="center" justify="center" bg={spinnerBg} zIndex={1}>
        <Spinner size="xl" color={spinnerColor} thickness="4px" />
      </Flex>
    );
  }

  // Preparamos el objeto de marcador para que sea compatible con CustomMarker
  const projectMarker = {
    id: "detail-project",
    lat,
    lng,
    ...projectData
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={options}
    >
      <CustomMarker
        marker={projectMarker}
        isSelected={selectedMarker?.id === projectMarker.id}
        onToggleSelect={handleMarkerToggle}
        iconContent={icons.project.iconContent}
        isSvg={icons.project.isSvg}
        iconSize={icons.project.size}
        map={map}
        google={google}
      />
    </GoogleMap>
  );
};

MapViewer.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  projectData: PropTypes.object,
};

export default MapViewer;
