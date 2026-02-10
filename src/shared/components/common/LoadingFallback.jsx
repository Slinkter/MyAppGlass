/**
 * @file LoadingFallback.jsx
 * @description Simple loading indicator used as a fallback for `Suspense` boundaries.
 * @module shared/common
 */

import React from "react";
import { Flex, Spinner } from "@chakra-ui/react";

/**
 * @component LoadingFallback
 * @description Componente de fallback para Suspense, muestra un spinner de carga centrado.
 * @returns {JSX.Element} Un contenedor flex con un spinner centrado.
 */
const LoadingFallback = () => {
  return (
    <Flex w="full" h="80vh" justifyContent="center" alignItems="center">
      <Spinner size="xl" />
    </Flex>
  );
};

export default LoadingFallback;
