/**
 * @file ComponentErrorBoundary.jsx
 * @description A reusable Error Boundary component to catch errors in child components
 * and display a user-friendly (or developer-friendly) fallback.
 */
import React from 'react';
import { Box, Code, Heading, Text, VStack, Button } from '@chakra-ui/react';

class ComponentErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error in component:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box 
          p={6} 
          m={4} 
          bg="red.50" 
          _dark={{ bg: "rgba(255, 0, 0, 0.05)" }}
          border="1px solid" 
          borderColor="red.200" 
          borderRadius="lg"
          role="alert"
        >
          <VStack align="start" gap={4}>
            <Heading size="md" color="red.600">
              Oops! Component Crash
            </Heading>
            <Text fontSize="sm" fontWeight="bold">
              Error: {this.state.error?.message || "Unknown error"}
            </Text>
            
            {import.meta.env.DEV && (
              <Box w="full" overflow="auto">
                <Text fontSize="xs" mb={2} color="gray.500">Component Stack:</Text>
                <Code 
                  fontSize="xs" 
                  p={3} 
                  borderRadius="md" 
                  w="full" 
                  whiteSpace="pre-wrap"
                  display="block"
                >
                  {this.state.errorInfo?.componentStack}
                </Code>
              </Box>
            )}
            
            <Button 
              size="sm" 
              colorPalette="red" 
              onClick={() => window.location.reload()}
            >
              Reload Page
            </Button>
          </VStack>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ComponentErrorBoundary;
