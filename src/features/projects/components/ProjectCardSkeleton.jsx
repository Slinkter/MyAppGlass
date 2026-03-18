import React from "react";
import {
    Box,
    Stack,
    HStack,
    Skeleton,
} from "@chakra-ui/react";

/**
 * @component ProjectCardSkeleton
 * @description Componente de carga (Skeleton) para las tarjetas de proyecto.
 * Mantiene la misma estructura visual que ProjectCard para evitar saltos de layout.
 */
const ProjectCardSkeleton = () => {
    return (
        <Box
            position="relative"
            h={{ base: "320px", md: "460px" }}
            w="full"
            borderRadius="2xl"
            overflow="hidden"
            bg="bg.subtle"
            boxShadow="sm"
        >
            {/* Main Image Skeleton Area */}
            <Skeleton h="full" w="full" />

            {/* Floating Info Panel Skeleton */}
            <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                m={4}
                p={5}
                bg="surface.footer"
                borderRadius="xl"
                border="1px solid"
                borderColor="border.glass"
                backdropFilter="blur(10px)"
            >
                <Stack spacing={3} align="center">
                    {/* Title Skeleton */}
                    <Skeleton height="24px" width="70%" />

                    {/* Meta Info Skeleton */}
                    <HStack justify="center" spacing={4} w="full">
                        <Skeleton height="14px" width="40%" />
                        <Skeleton height="14px" width="20%" />
                    </HStack>
                </Stack>
            </Box>
        </Box>
    );
};

export default ProjectCardSkeleton;
