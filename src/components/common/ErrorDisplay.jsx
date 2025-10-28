import React from 'react';
import { Text, Button, VStack } from '@chakra-ui/react';

/**
 * @component ErrorDisplay
 * @description A component to display error messages in a user-friendly format.
 * It can optionally include a retry button.
 *
 * @param {{ 
 *   message?: string, 
 *   onRetry?: () => void 
 * }} props - The props for the component.
 * @param {string} [props.message] - The error message to display. Defaults to a generic message.
 * @param {() => void} [props.onRetry] - Callback function to execute when the retry button is clicked.
 * @returns {JSX.Element}
 */
const ErrorDisplay = ({ message, onRetry }) => {
  return (
    <VStack spacing={4} p={4} borderWidth="1px" borderRadius="lg" borderColor="red.300" bg="red.50">
      <Text fontSize="lg" fontWeight="bold" color="red.600">
        Error:
      </Text>
      <Text color="red.500">
        {message || "Ha ocurrido un error inesperado. Por favor, intente de nuevo."}
      </Text>
      {onRetry && (
        <Button colorScheme="red" onClick={onRetry}>
          Reintentar
        </Button>
      )}
    </VStack>
  );
};

export default ErrorDisplay;
