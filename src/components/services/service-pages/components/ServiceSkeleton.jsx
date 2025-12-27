import React from "react";
import {
    Box,
    Grid,
    GridItem,
    VStack,
    HStack,
    Skeleton,
    SkeletonCircle,
} from "@chakra-ui/react";
import GlassCard from "@/components/common/GlassCard";

/**
 * Skeleton de carga para la página de servicios.
 * Imita la estructura de ServicePageLayout (Sidebar + Galería).
 */
const ServiceSkeleton = () => {
    return (
        <Box p={{ base: 0, md: 4, lg: 2 }} w="100%" overflowX="hidden">
            <Grid
                templateColumns={{ base: "minmax(0, 1fr)", lg: "1fr 3fr" }}
                maxW="100%"
                mx="auto"
                gap={{ base: 3, md: 5, lg: 6 }}
                alignItems="start"
                px={{ base: 3, md: 0 }}
                py={{ base: 3, md: 0 }}
            >
                {/* CARD 1: SKELETON DEL SIDEBAR */}
                <GridItem w="100%" minW={0}>
                    <GlassCard
                        display="flex"
                        flexDirection="column"
                        h={{ base: "auto", lg: "85vh" }}
                        overflow={{ base: "visible", lg: "hidden" }}
                        w="100%"
                        p={4}
                    >
                        <VStack
                            spacing={{ base: 4, md: 5, lg: 6 }}
                            align="stretch"
                            flex="1"
                        >
                            {/* Título del Servicio */}
                            <Box>
                                <Skeleton
                                    height="24px"
                                    width="60%"
                                    mb={4}
                                    borderRadius="md"
                                />
                                {/* Lista de Sistemas */}
                                <VStack spacing={3}>
                                    {[1, 2, 3].map((i) => (
                                        <HStack key={i} w="full" spacing={3}>
                                            <SkeletonCircle size="8" />
                                            <Skeleton
                                                height="16px"
                                                width="70%"
                                                borderRadius="md"
                                            />
                                        </HStack>
                                    ))}
                                </VStack>
                            </Box>

                            {/* Título del Sistema Activo */}
                            <Box mt={4}>
                                <Skeleton
                                    height="32px"
                                    width="80%"
                                    borderRadius="md"
                                />
                            </Box>

                            {/* Grid de Especificaciones */}
                            <Box>
                                <Skeleton
                                    height="16px"
                                    width="40%"
                                    mb={4}
                                    borderRadius="md"
                                />
                                <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                                    {[1, 2, 3, 4].map((i) => (
                                        <Skeleton
                                            key={i}
                                            height="60px"
                                            borderRadius="lg"
                                        />
                                    ))}
                                </Grid>
                            </Box>

                            {/* Botón CTA */}
                            <Box mt="auto" pt={4}>
                                <Skeleton
                                    height="48px"
                                    width="100%"
                                    borderRadius="md"
                                />
                                <Skeleton
                                    height="12px"
                                    width="50%"
                                    mx="auto"
                                    mt={2}
                                    borderRadius="md"
                                />
                            </Box>
                        </VStack>
                    </GlassCard>
                </GridItem>

                {/* CARD 2: SKELETON DE LA GALERÍA */}
                <GridItem w="100%" minW={0}>
                    <GlassCard
                        h={{
                            base: "360px",
                            sm: "410px",
                            md: "500px",
                            lg: "85vh",
                        }}
                        overflow="hidden"
                        p={{ base: 2, md: 4, lg: 6 }}
                    >
                        <VStack h="100%" spacing={4}>
                            {/* Visor Principal */}
                            <Skeleton
                                flex="1"
                                w="100%"
                                borderRadius={{ base: "lg", md: "xl" }}
                                startColor="whiteAlpha.100"
                                endColor="whiteAlpha.300"
                            />

                            {/* Carrusel de Miniaturas */}
                            <HStack
                                w="100%"
                                h={{ base: "60px", md: "90px" }}
                                spacing={2}
                            >
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Skeleton
                                        key={i}
                                        h="100%"
                                        w={{ base: "60px", md: "100px" }}
                                        borderRadius="lg"
                                        flexShrink={0}
                                    />
                                ))}
                            </HStack>
                        </VStack>
                    </GlassCard>
                </GridItem>
            </Grid>
        </Box>
    );
};

export default ServiceSkeleton;
