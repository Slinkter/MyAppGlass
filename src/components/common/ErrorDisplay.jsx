import React from 'react';
import { Text, Button, VStack } from '@chakra-ui/react';
import { ERROR_MESSAGES } from '../../utils/constants';

/**
 * @component ErrorDisplay
 * @description A component to display error messages in a user-friendly format, utilizing the application's primary color palette for consistency.
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
    <VStack spacing={4} p={4} borderWidth="1px" borderRadius="lg" borderColor="primary.300" bg="primary.50">
      <Text fontSize="lg" fontWeight="bold" color="primary.600">
        Error:
      </Text>
      <Text color="primary.500">
        {message || ERROR_MESSAGES.UNEXPECTED_ERROR}
      </Text>
      {onRetry && (
        <Button colorScheme="primary" onClick={onRetry}>
          Reintentar
        </Button>
      )}
    </VStack>
  );
};

export default ErrorDisplay;
