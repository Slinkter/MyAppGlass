"use client";
import React from "react";
import { 
    Box, 
    VStack, 
    HStack, 
    Container, 
    SimpleGrid, 
    Grid, 
    GridItem, 
    Flex 
} from "@chakra-ui/react";
import { Skeleton, SkeletonCircle } from "@/components/ui/skeleton";

/**
 * @component ServiceSkeleton
 * @description Skeleton de carga para la página de detalle de servicios.
 * Respeta rigurosamente el layout de ServicePageLayout (Bento Grid, Spacing, Container).
 */
const ServiceSkeleton: React.FC = () => {
    return (
        <Container maxW="7xl" px="0" pt={{ base: 4, md: 8 }} pb={{ base: "16", lg: "10" }}>
            <VStack gap={{ base: "6", lg: "8" }} align="stretch">
                
                {/* Header Section Skeleton */}
                <Flex 
                    direction={{ base: "column", md: "row" }} 
                    justify="space-between" 
                    align={{ base: "flex-start", md: "flex-end" }} 
                    gap="4"
                >
                    <VStack gap="2" align="flex-start">
                        {/* Back Button Skeleton */}
                        <Skeleton height="20px" width="80px" borderRadius="full" />
                        {/* Main Heading Skeleton */}
                        <Skeleton height={{ base: "32px", md: "48px" }} width={{ base: "260px", md: "450px" }} borderRadius="md" />
                    </VStack>
                    
                    {/* System Selector (Filter Pills) Skeleton */}
                    <HStack gap="2" justify="center" flexWrap="wrap">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} height="36px" width="120px" borderRadius="full" />
                        ))}
                    </HStack>
                </Flex>

                {/* 2-Column Grid Skeleton (Matches ServicePageLayout.tsx) */}
                <Grid
                    templateColumns={{ base: "1fr", lg: "repeat(12, 1fr)" }}
                    gap={{ base: "6", lg: "8" }}
                    alignItems="stretch"
                    h={{ lg: "530px", xl: "550px" }}
                >
                    {/* Columna Derecha en Desktop / Superior en Móvil: Galería de fotos */}
                    <GridItem colSpan={{ base: 1, lg: 7 }} order={{ base: 1, lg: 2 }} display="flex" flexDirection="column">
                        <Skeleton
                            borderRadius="3xl"
                            height="100%"
                            w="full"
                            flex="1"
                        >
                            <Box
                                h={{ base: "320px", md: "500px", lg: "530px", xl: "550px" }}
                                w="full"
                                bg="bg.subtle"
                                borderRadius="3xl"
                             />
                        </Skeleton>
                    </GridItem>

                    {/* Columna Izquierda en Desktop / Inferior en Móvil: Detalle y CTA */}
                    <GridItem colSpan={{ base: 1, lg: 5 }} order={{ base: 2, lg: 1 }} display="flex" flexDirection="column">
                        <VStack gap="5" align="stretch" h="100%" flex="1">
                            {/* Unified Technical Card Skeleton */}
                            <Box 
                                bg="bg.subtle" 
                                borderRadius="3xl" 
                                borderWidth="1px" 
                                borderColor="border.subtle"
                                p="6"
                                w="full"
                            >
                                <Skeleton height="14px" width="100px" mb="3" borderRadius="full" />
                                <VStack align="stretch" gap="2.5" mb="4">
                                    <Skeleton height="12px" width="100%" borderRadius="md" />
                                    <Skeleton height="12px" width="95%" borderRadius="md" />
                                    <Skeleton height="12px" width="45%" borderRadius="md" />
                                </VStack>

                                <Box h="1px" bg="border.default" my="4" opacity={0.6} />

                                <Skeleton height="14px" width="130px" mb="4" borderRadius="full" />
                                <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3">
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <HStack key={i} gap="2.5" align="center">
                                            <SkeletonCircle size="3.5" />
                                            <Skeleton height="10px" width="75%" borderRadius="md" />
                                        </HStack>
                                    ))}
                                </SimpleGrid>
                            </Box>

                            {/* Bento CTA Skeleton */}
                            <Box 
                                flex="1" 
                                display="flex" 
                                flexDirection="column"
                                bg="bg.subtle"
                                _dark={{ bg: "black", borderColor: "border.subtle" }}
                                borderRadius="3xl" 
                                p="5"
                                borderWidth="1px"
                                borderColor="transparent"
                                alignItems="center"
                                justifyContent="center"
                                minH="120px"
                            >
                                <SkeletonCircle size="7" mb="3" />
                                <Skeleton height="16px" width="50%" mb="2" borderRadius="md" />
                                <Skeleton height="10px" width="75%" borderRadius="md" />
                            </Box>
                        </VStack>
                    </GridItem>
                </Grid>

            </VStack>
        </Container>
    );
};

export default ServiceSkeleton;
