import React from "react";
import {
    Box,
    VStack,
    HStack,
    Skeleton,
} from "@chakra-ui/react";

/**
 * @component ProjectCardSkeleton
 * @description Componente de carga (Skeleton) para las tarjetas de proyecto.
 * Respeta la estructura exacta de ProjectCardContent para evitar saltos visuales.
 */
const ProjectCardSkeleton: React.FC = () => {
    return (
        <Box
            position="relative"
            h={{ base: "320px", md: "500px" }}
            w="full"
            borderRadius="xl"
            overflow="hidden"
            bg="bg.subtle"
        >
            {/* Imagen de fondo / Área principal */}
            <Skeleton h="full" w="full" />

            {/* Contenido superpuesto (espejo de ProjectCardContent) */}
            <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                p="phi_md"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="flex-end"
                zIndex={2}
            >
                {/* Título (Residencial) */}
                <Skeleton height="24px" width="60%" mb="phi_lg" borderRadius="full" />

                {/* Info (Address & Year) */}
                <VStack gap="phi_md" w="full">
                    <HStack justify="center" gap="phi_sm" w="full">
                        <Skeleton height="14px" width="40%" borderRadius="full" />
                        <Box w="1px" h="3" bg="whiteAlpha.400" />
                        <Skeleton height="14px" width="15%" borderRadius="full" />
                    </HStack>

                    {/* Botón EXPLORAR PROYECTO */}
                    <Skeleton 
                        height="40px" 
                        width="80%" 
                        borderRadius="full" 
                        maxW="240px"
                    />
                </VStack>
            </Box>
        </Box>
    );
};

export default ProjectCardSkeleton;
