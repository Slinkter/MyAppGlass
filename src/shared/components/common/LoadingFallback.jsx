/**
 * @file LoadingFallback.jsx
 * @description Simple loading indicator used as a fallback for `Suspense` boundaries.
 * @module shared/common
 */

import React from "react";
import { Flex, Spinner, Box, useColorModeValue } from "@chakra-ui/react";

/**
 * @component LoadingFallback
 * @description Premium Aura Loader with Glassmorphism to mask component mounting latency.
 */
const LoadingFallback = () => {
  const bgColor = useColorModeValue("white", "primary.900");
  
  return (
    <Flex 
      position="fixed"
      inset={0}
      w="full" 
      h="100dvh" 
      justifyContent="center" 
      alignItems="center"
      zIndex="popover"
      bg={bgColor}
    >
      <Box textAlign="center">
        <Spinner 
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="accent.solid"
          size="xl" 
        />
      </Box>
    </Flex>
  );
};

export default LoadingFallback;
