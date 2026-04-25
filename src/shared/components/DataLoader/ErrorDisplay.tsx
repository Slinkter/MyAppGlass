import React from "react";
import { Text, VStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { ERROR_MESSAGES } from "@shared/utils/constants";

interface ErrorDisplayProps {
  message?: string;
  onRetry?: () => void;
}

/**
 * @component ErrorDisplay
 * @description Componente para mostrar mensajes de error de forma amigable, utilizando la paleta de colores principal para mantener la consistencia.
 * Opcionalmente puede incluir un botón de reintento.
 */
const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  return (
    <VStack
      gap="phi_md"
      p="phi_md"
      bg="whiteAlpha.200"
      border="1px solid"
      borderColor="whiteAlpha.300"
      boxShadow="lg"
      borderRadius="xl"
      color="white"
    >
      <Text fontSize="lg" fontWeight="bold" color="primary.300">
        Error:
      </Text>
      <Text>{message || ERROR_MESSAGES.UNEXPECTED_ERROR}</Text>
      {onRetry && (
        <Button
          variant="subtle"
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
