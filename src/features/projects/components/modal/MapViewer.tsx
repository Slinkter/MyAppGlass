"use client";

import React, { useMemo } from "react";
import { Flex, Spinner, Box } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useGoogleMapsLoader } from "@/features/home/hooks"; // Reusing the hook we just created
import { mapStyles } from "@/features/home/components/map/mapStyles"; // Reusing styles

const containerStyle = {
  width: "100%",
  height: "100%",
};

export interface MapViewerProps {
  lat: number;
  lng: number;
}

const MapViewer = ({ lat, lng }: MapViewerProps) => {
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
        <Spinner size="xl" color={spinnerColor} />
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

export default MapViewer;
