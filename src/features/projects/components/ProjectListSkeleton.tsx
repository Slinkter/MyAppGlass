import React from "react";
import { Container, SimpleGrid, VStack, HStack, Box } from "@chakra-ui/react";
import { Skeleton } from "@/components/ui/skeleton";
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
            mt={{ base: "5", md: "14" }}
            pb="14"
        >
            <VStack gap={{ base: "5", md: "14" }} w="full">
                {/* Header Section Skeleton (matches ItemGridLayout) */}
                <VStack gap="2">
                    <Skeleton height={{ base: "32px", md: "48px" }} width="300px" mx="auto" />
                    <Skeleton height={{ base: "20px", md: "24px" }} width="400px" mx="auto" mt="5" />
                </VStack>

                {/* Filter Pills Skeleton */}
                <Box w="full">
                    <HStack gap="2" justify="center" flexWrap="wrap" pb="5">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Skeleton key={i} height="32px" width="80px" borderRadius="full" mt="2" />
                        ))}
                    </HStack>
                </Box>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: "5", md: "8" }} w="full">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <ProjectCardSkeleton key={index} />
                    ))}
                </SimpleGrid>
            </VStack>
        </Container>
    );
};

export default ProjectListSkeleton;
