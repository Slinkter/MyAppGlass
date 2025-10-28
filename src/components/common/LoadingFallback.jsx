import React from "react";
import { Flex, Spinner } from "@chakra-ui/react";

/**
 * @component
 * @description Componente de fallback para Suspense, muestra un spinner de carga centrado.
 * @returns {JSX.Element}
 */
const LoadingFallback = () => {
    return (
        <Flex
            w="full"
            h="80vh"
            justifyContent="center"
            alignItems="center"
        >
            <Spinner size="xl" />
        </Flex>
    );
};

export default LoadingFallback;
