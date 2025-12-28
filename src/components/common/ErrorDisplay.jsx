import React from "react";
import { Text, Button, VStack } from "@chakra-ui/react";
import { ERROR_MESSAGES } from "../../utils/constants";

/**
 * @component ErrorDisplay
 * @description Componente para mostrar mensajes de error de forma amigable, utilizando la paleta de colores principal para mantener la consistencia.
 * Opcionalmente puede incluir un botón de reintento.
 *
 * @param {{
 *   message?: string,
 *   onRetry?: () => void
 * }} props - Propiedades del componente.
 * @param {string} [props.message] - Mensaje de error a mostrar. Si no se provee, usa un mensaje por defecto.
 * @param {function} [props.onRetry] - Función opcional a ejecutar al hacer clic en el botón de reintentar.
 * @returns {JSX.Element} Elemento UI de error.
 */
const ErrorDisplay = ({ message, onRetry }) => {
  return (
    <VStack
      spacing={4}
      p={4}
      bg="whiteAlpha.200"
      backdropFilter="blur(10px)"
      border="1px solid"
      borderColor="whiteAlpha.300"
      shadow="lg"
      rounded="xl"
      color="white"
    >
      <Text fontSize="lg" fontWeight="bold" color="primary.300">
        Error:
      </Text>
      <Text>{message || ERROR_MESSAGES.UNEXPECTED_ERROR}</Text>
      {onRetry && (
        <Button
          bg="whiteAlpha.300"
          _hover={{ bg: "whiteAlpha.400" }}
          onClick={onRetry}
        >
          Reintentar
        </Button>
      )}
    </VStack>
  );
};

export default ErrorDisplay;
