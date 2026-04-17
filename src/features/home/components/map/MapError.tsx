import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import { Alert } from "@/components/ui/alert";

interface MapErrorProps {
  message?: string;
}

/**
 * @component MapError
 * @description Muestra un mensaje de error elegante cuando el mapa no puede cargar.
 */
const MapError: React.FC<MapErrorProps> = ({ message }) => {
  return (
    <Box
      w="full"
      h="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="bg.subtle"
      p={8}
    >
      <VStack gap={3}>
        <Alert
          status="error"
          title="Error al cargar el mapa"
          maxW="md"
        >
          {message || "No se pudo establecer conexión con Google Maps."}
        </Alert>
      </VStack>
    </Box>
  );
};

export default MapError;
