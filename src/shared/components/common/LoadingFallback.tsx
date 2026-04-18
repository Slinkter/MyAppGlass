/**
 * @file LoadingFallback.tsx
 * @description Smooth glass loading state for global route transitions.
 * Refactored to use semantic tokens.
 */

import React from "react";
import { Spinner, Center } from "@chakra-ui/react";
import { m } from "framer-motion";

const LoadingFallback: React.FC = () => (
  <Center 
    position="fixed"
    inset="0"
    h="100dvh" 
    w="100vw" 
    bg="bg.page"
    zIndex="9999"
    as={m.div}
    transition={{ duration: 0.4 } as any}
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
