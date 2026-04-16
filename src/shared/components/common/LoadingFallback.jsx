/**
 * @file LoadingFallback.jsx
 * @description Smooth glass loading state for global route transitions.
 * Refactored to use semantic tokens.
 */

import React from "react";
import { Spinner, Center } from "@chakra-ui/react";
import { m } from "framer-motion";

const LoadingFallback = () => (
  <Center 
    h="100dvh" 
    w="100vw" 
    bg="bg.page"
    as={m.div}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <Spinner
      thickness="2px"
      speed="0.8s"
      emptyColor="border.glass"
      color="primary.500"
      size="xl"
    />
  </Center>
);

export default LoadingFallback;
