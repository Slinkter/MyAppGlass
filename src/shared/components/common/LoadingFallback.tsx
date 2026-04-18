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
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    <Spinner
      borderWidth="2px"
      speed="0.6s"
      // @ts-expect-error - emptyColor exists in SpinnerProps but some versions/configs might complain
      emptyColor="whiteAlpha.100"
      color="text.accent"
      size="xl"
    />
  </Center>
);

export default LoadingFallback;
