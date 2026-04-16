import React from "react";
import { Box, Spinner } from "@chakra-ui/react";

/**
 * @component MapLoader
 * @description Estado de carga visual para el componente de mapa.
 */
const MapLoader = () => {
  return (
    <Box
      w="full"
      h="full"
      minH={{ base: "400px", lg: "700px" }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="bg.section"
    >
      <Spinner
        size="xl"
        thickness="2px"
        speed="0.8s"
        color="text.accent"
        emptyColor="whiteAlpha.100"
      />
    </Box>
  );
};

export default MapLoader;
