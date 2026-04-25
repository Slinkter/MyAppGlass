import React from "react";
import { SimpleGrid, Skeleton, Box, VStack } from "@chakra-ui/react";
import ItemGridLayout from "@shared/components/Layout/ItemGridLayout";

/**
 * @component ServiceListSkeleton
 * @description Muestra una cuadrícula de esqueletos de tarjetas de servicio.
 * Respeta la estructura de ServiceCard (imagen de fondo con overlay).
 */
const ServiceListSkeleton: React.FC = () => {
    return (
        <ItemGridLayout
            title="SERVICIOS"
            subtitle="Soluciones en Vidrio y Aluminio"
            columns={{ base: 1, sm: 2, md: 3 }}
        >
            {/* Filter Pills Skeleton */}
            <Box gridColumn="1 / -1" w="full" mb="phi_lg">
                <SimpleGrid columns={{ base: 2, md: 4 }} gap="phi_sm" maxW="600px" mx="auto">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} height="36px" borderRadius="full" />
                    ))}
                </SimpleGrid>
            </Box>

            {/* Grid of Cards Skeletons */}
            {Array.from({ length: 6 }).map((_, index) => (
                <Box
                    key={index}
                    position="relative"
                    h={{ base: "320px", md: "500px" }}
                    w="full"
                    borderRadius="xl"
                    overflow="hidden"
                    bg="bg.subtle"
                >
                    <Skeleton h="full" w="full" />
                    
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
                    >
                        {/* Title Skeleton */}
                        <Skeleton height="24px" width="60%" mb="phi_lg" borderRadius="full" />

                        {/* Button Skeleton (Ver Catálogo) */}
                        <VStack gap="phi_sm" w="full">
                            <Skeleton 
                                height="36px" 
                                width="70%" 
                                borderRadius="full" 
                                maxW="200px"
                            />
                        </VStack>
                    </Box>
                </Box>
            ))}
        </ItemGridLayout>
    );
};

export default ServiceListSkeleton;
