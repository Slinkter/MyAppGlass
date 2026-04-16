import { useColorMode } from "@/components/ui/color-mode";
import React, { useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";
import { GoogleMap } from "@react-google-maps/api";
import { useGoogleMapsLoader, useMapIcons, useMapState } from "@/features/home/hooks";
import { mapStyles } from "@/features/home/components/map/mapStyles";
import CustomMarker from "@/features/home/components/map/CustomMarker";
import MapLoader from "@/features/home/components/map/MapLoader";
import MapError from "@/features/home/components/map/MapError";
import MapControls from "@/features/home/components/map/MapControls";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const MapViewer = ({ lat, lng, projectData }) => {
  const { colorMode } = useColorMode();
  const { isLoaded, loadError } = useGoogleMapsLoader();
  const { map, onLoad, onUnmount } = useMapState();
  const google = window.google;
  const icons = useMapIcons(isLoaded, google);

  const center = useMemo(() => ({ lat, lng }), [lat, lng]);
  
  const currentMapStyle = useMemo(
    () => (colorMode === "light" ? mapStyles.light : mapStyles.dark),
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

  const projectMarker = {
    id: "detail-project",
    lat,
    lng,
    ...projectData
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

MapViewer.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  projectData: PropTypes.object,
};

export default React.memo(MapViewer);
