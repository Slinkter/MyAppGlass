import React from "react";
import { Text, VStack } from "@chakra-ui/react";
import { Button } from "@/components/ui/button";
import { ERROR_MESSAGES } from "@shared/utils/constants";

interface ErrorDisplayProps {
  message?: string;
  onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
  return (
    <VStack
      gap="6"
      p="6"
      bg="surface.card"
      borderWidth="1px"
      borderColor="border.default"
      boxShadow="lg"
      borderRadius="xl"
    >
      <Text fontSize="lg" fontWeight="bold" color="text.accent">
        Error:
      </Text>
      <Text color="text.body">{message || ERROR_MESSAGES.UNEXPECTED_ERROR}</Text>
      {onRetry && (
        <Button
          variant="subtle"
          onClick={onRetry}
        >
          Reintentar
        </Button>
      )}
    </VStack>
  );
};

export default ErrorDisplay;
