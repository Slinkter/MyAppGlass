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
      bg="bg.subtle"
      borderRadius="xl"
    >
      <VStack gap={4}>
        <Spinner
          size="xl"
          thickness="4px"
          speed="0.65s"
          color="text.accent"
          emptyColor="border.glass"
        />
        <Text
          fontSize="sm"
          fontWeight="bold"
          color="text.muted"
          textTransform="uppercase"
          letterSpacing="widest"
        >
          Cargando Entorno 3D...
        </Text>
      </VStack>
    </Box>
  );
};

export default MapLoader;
