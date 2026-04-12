import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Flex, Spinner, useColorModeValue, Box } from "@chakra-ui/react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useGoogleMapsLoader } from "@/features/home/hooks"; // Reusing the hook we just created
import { mapStyles } from "@/features/home/components/map/mapStyles"; // Reusing styles

const containerStyle = {
  width: "100%",
  height: "100%",
};

const MapViewer = ({ lat, lng }) => {
  const spinnerBg = useColorModeValue("gray.100", "gray.800");
  const spinnerColor = "text.accent";
  const { isLoaded, loadError } = useGoogleMapsLoader();

  const center = useMemo(() => ({ lat, lng }), [lat, lng]);

  const options = useMemo(
    () => ({
      disableDefaultUI: false,
      zoomControl: true,
      mapTypeControl: false,
      streetViewControl: false,
      styles: mapStyles.light, // Or dynamic based on theme if passed
    }),
    []
  );

  if (loadError) {
    return (
      <Flex
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        align="center"
        justify="center"
        bg={spinnerBg}
        zIndex={1}
      >
        <Box color="red.500">Error loading map</Box>
      </Flex>
    );
  }

  if (!isLoaded) {
    return (
      <Flex
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        align="center"
        justify="center"
        bg={spinnerBg}
        zIndex={1}
      >
        <Spinner size="xl" color={spinnerColor} thickness="4px" />
      </Flex>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={15}
      options={options}
    >
      <MarkerF position={center} />
    </GoogleMap>
  );
};

MapViewer.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default MapViewer;
