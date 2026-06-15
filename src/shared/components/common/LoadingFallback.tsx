/**
 * @file LoadingFallback.tsx
 * @description Smooth glass loading state for global route transitions.
 * Refactored to use semantic tokens.
 */

import React from "react";
import { Spinner, Center } from "@chakra-ui/react";

const LoadingFallback: React.FC = () => (
  <Center 
    position="fixed"
    inset="0"
    h="100dvh" 
    w="100vw" 
    bg="bg.page"
    zIndex="9999"
  >
    <Spinner
      borderWidth="2px"
      css={{ "--spinner-track-color": "colors.whiteAlpha.100" }}
      color="text.accent"
      size="xl"
    />
  </Center>
);

export default LoadingFallback;
