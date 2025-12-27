import React from "react";
import { Text, Button, VStack } from "@chakra-ui/react";
import { ERROR_MESSAGES } from "../../utils/constants";

/**
 * @component ErrorDisplay
 * @description A component to display error messages in a user-friendly format, utilizing the application's primary color palette for consistency.
 * It can optionally include a retry button.
 *
 * @param {{
 *   message?: string,
 *   onRetry?: () => void
 * }} props - The props for the component.
 * @returns {JSX.Element}
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
