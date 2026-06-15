import React from "react";
import { Skeleton, Box, VStack } from "@chakra-ui/react";
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
            {/* Filter Pills Skeleton - MATCHES ServiceList.tsx */}
            <Box gridColumn="1 / -1" w="full" mb="8">
                <Box display="flex" gap="2" justifyContent="center" flexWrap="wrap">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Skeleton key={i} height="32px" width="100px" borderRadius="full" mt="2" />
                    ))}
                </Box>
            </Box>

            {/* Grid of Cards Skeletons - MATCHES ServiceCard.tsx */}
            {Array.from({ length: 6 }).map((_, index) => (
                <Box
                    key={index}
                    position="relative"
                    h={{ base: "44", md: "52" }}
                    w="full"
                    borderRadius="xl"
                    overflow="hidden"
                    bg="bg.subtle"
                >
                    {/* Background Skeleton */}
                    <Skeleton h="full" w="full" />
                    
                    {/* Card Content Overlay - MATCHES ServiceCard.tsx alignment */}
                    <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        p="6"
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="flex-end"
                    >
                        {/* Title Placeholder */}
                        <Skeleton height="24px" width="60%" borderRadius="md" />

                        {/* Button Area Placeholder - MATCHES VStack mt="6" and gap="4" */}
                        <VStack mt="6" gap="4" w="full">
                            <Skeleton 
                                height="32px" 
                                width="140px" 
                                borderRadius="full" 
                            />
                        </VStack>
                    </Box>
                </Box>
            ))}
        </ItemGridLayout>
    );
};

export default ServiceListSkeleton;
