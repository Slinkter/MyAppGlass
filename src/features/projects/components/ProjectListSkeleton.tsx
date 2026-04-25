import React from "react";
import { Container, SimpleGrid, Skeleton } from "@chakra-ui/react";
import ProjectCardSkeleton from "./ProjectCardSkeleton";

/**
 * @component ProjectListSkeleton
 * @description Muestra una cuadrícula de tarjetas de proyecto en estado de carga (isLoading).
 * Reutiliza el componente ProjectCardSkeleton para garantizar la consistencia visual exacta.
 */
const ProjectListSkeleton: React.FC = () => {
    return (
        <Container maxW="7xl" mt="phi_md" mb={0} textAlign="center">
            {/* Title Skeleton */}
            <Skeleton height="50px" width="300px" mx="auto" mb="phi_xs" mt="phi_md" />
            {/* Subtitle Skeleton */}
            <Skeleton height="30px" width="400px" mx="auto" mb="phi_lg" />

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="phi_lg">
                {Array.from({ length: 6 }).map((_, index) => (
                    <ProjectCardSkeleton key={index} />
                ))}
            </SimpleGrid>
        </Container>
    );
};

export default ProjectListSkeleton;
