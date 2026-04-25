import React from "react";
import { Container, SimpleGrid, Skeleton, VStack, HStack, Box } from "@chakra-ui/react";
import ProjectCardSkeleton from "./ProjectCardSkeleton";

/**
 * @component ProjectListSkeleton
 * @description Muestra una cuadrícula de tarjetas de proyecto en estado de carga (isLoading).
 * Reutiliza el componente ProjectCardSkeleton para garantizar la consistencia visual exacta.
 */
const ProjectListSkeleton: React.FC = () => {
    return (
        <Container 
            maxW="7xl" 
            textAlign="center" 
            mt={{ base: "phi_lg", md: "phi_2xl" }}
            pb="phi_xl"
        >
            <VStack gap={{ base: "phi_md", md: "phi_xl" }} w="full">
                {/* Header Section Skeleton (matches ItemGridLayout) */}
                <VStack gap="phi_xs">
                    <Skeleton height={{ base: "32px", md: "48px" }} width="300px" mx="auto" />
                    <Skeleton height={{ base: "20px", md: "24px" }} width="400px" mx="auto" mt={{ base: "phi_sm", md: "phi_md" }} />
                </VStack>

                {/* Filter Pills Skeleton */}
                <Box w="full">
                    <HStack gap="phi_xs" justify="center" flexWrap="wrap" pb="phi_md">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} height="32px" width="80px" borderRadius="full" mt="phi_xs" />
                        ))}
                    </HStack>
                </Box>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: "phi_md", md: "phi_lg" }} w="full">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <ProjectCardSkeleton key={index} />
                    ))}
                </SimpleGrid>
            </VStack>
        </Container>
    );
};

export default ProjectListSkeleton;
