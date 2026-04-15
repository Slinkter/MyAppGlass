/**
 * @file LoadingFallback.jsx
 * @description Smooth glass loading state for global route transitions.
 * Refactored to use semantic tokens.
 */

import React from "react";
import { Box, Spinner, Center } from "@chakra-ui/react";

const LoadingFallback = () => (
  <Center h="100dvh" w="100vw" bg="bg.page">
    <Box
      p={8}
      bg="bg.section"
      borderRadius="2xl"
      borderWidth="1px"
      borderColor="border.glass"
      boxShadow="xl"
      backdropFilter="blur(10px)"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={4}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="bg.subtle"
        color="text.accent"
        size="xl"
      />
    </Box>
  </Center>
);

export default LoadingFallback;
