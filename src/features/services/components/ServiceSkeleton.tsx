"use client";
import React from "react";
import { 
    Box, 
    VStack, 
    HStack, 
    Skeleton, 
    SkeletonCircle, 
    Container, 
    SimpleGrid, 
    Grid, 
    GridItem, 
    Flex 
} from "@chakra-ui/react";

/**
 * @component ServiceSkeleton
 * @description Skeleton de carga para la página de detalle de servicios.
 * Respeta rigurosamente el layout de ServicePageLayout (Bento Grid, Spacing, Container).
 */
const ServiceSkeleton: React.FC = () => {
    return (
        <Container maxW="7xl" pt={{ base: 4, md: 8 }} pb={32}>
            <VStack gap={{ base: 12, lg: 16 }} align="stretch">
                
                {/* Header Section Skeleton */}
                <Flex 
                    direction={{ base: "column", md: "row" }} 
                    justify="space-between" 
                    align={{ base: "flex-start", md: "flex-end" }} 
                    gap={8}
                >
                    <VStack gap={4} align="flex-start">
                        {/* Back Button Skeleton */}
                        <Skeleton height="24px" width="80px" borderRadius="full" />
                        {/* Main Heading Skeleton */}
                        <Skeleton height={{ base: "40px", md: "60px" }} width={{ base: "280px", md: "500px" }} borderRadius="md" />
                    </VStack>
                    
                    {/* System Selector (Filter Pills) Skeleton */}
                    <HStack gap={2} justify="center" flexWrap="wrap">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <Skeleton key={i} height="36px" width="100px" borderRadius="full" />
                        ))}
                    </HStack>
                </Flex>

                {/* Main Gallery Skeleton */}
                <Skeleton
                    borderRadius="3xl"
                    height={{ base: "350px", md: "500px", lg: "65vh" }}
                    minH={{ md: "500px" }}
                    maxH={{ lg: "800px" }}
                    width="100%"
                />

                {/* Bento Grid Skeleton */}
                <Grid
                    templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
                    templateRows={{ base: "auto", lg: "minmax(380px, auto)" }}
                    gap={{ base: 8, lg: 12 }}
                >
                    {/* About Section */}
                    <GridItem colSpan={{ base: 1, lg: 2 }}>
                        <Box p={{ base: "phi_md", lg: "phi_lg" }} h="full" bg="bg.subtle" borderRadius="3xl" border="1px solid" borderColor="border.glass">
                            <Skeleton height="12px" width="100px" mb={6} borderRadius="full" />
                            <VStack align="stretch" gap={4}>
                                <Skeleton height="20px" width="100%" borderRadius="md" />
                                <Skeleton height="20px" width="95%" borderRadius="md" />
                                <Skeleton height="20px" width="40%" borderRadius="md" />
                            </VStack>
                        </Box>
                    </GridItem>

                    {/* CTA Card Section */}
                    <GridItem colSpan={1}>
                        <Box p={{ base: "phi_md", lg: "phi_lg" }} h="full" bg="primary.900" borderRadius="3xl" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                            <SkeletonCircle size="12" mb={6} />
                            <Skeleton height="24px" width="60%" mb={4} borderRadius="md" />
                            <Skeleton height="14px" width="80%" mb={8} borderRadius="md" />
                            <Skeleton height="48px" width="full" borderRadius="full" />
                        </Box>
                    </GridItem>

                    {/* Benefits Section */}
                    <GridItem colSpan={{ base: 1, lg: 3 }}>
                        <Box p={{ base: "phi_md", lg: "phi_lg" }} h="full" bg="bg.subtle" borderRadius="3xl" border="1px solid" borderColor="border.glass">
                            <Skeleton height="12px" width="150px" mb={8} borderRadius="full" />
                            <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={{ base: 4, lg: 8 }}>
                                {Array.from({ length: 6 }).map((_, i) => (
                                    <HStack key={i} p={5} bg="bg.page" borderRadius="xl" border="1px solid" borderColor="border.glass">
                                        <SkeletonCircle size="5" />
                                        <Skeleton height="14px" width="70%" borderRadius="md" />
                                    </HStack>
                                ))}
                            </SimpleGrid>
                        </Box>
                    </GridItem>
                </Grid>

            </VStack>
        </Container>
    );
};

export default ServiceSkeleton;
