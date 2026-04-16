import React from "react";
import { Box, Spinner, Text, VStack } from "@chakra-ui/react";

/**
 * @component MapLoader
 * @description Estado de carga visual para el componente de mapa.
 */
const MapLoader = () => {
  return (
    <Box
      w="full"
      h="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Spinner
        size="lg"
        thickness="2px"
        speed="0.8s"
        color="primary.500"
        emptyColor="border.glass"
      />
    </Box>
  );
};

export default MapLoader;
