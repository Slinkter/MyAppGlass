import React from "react";
import {
    Container,
    SimpleGrid,
    Skeleton,
    Box,
    Stack,
    useColorModeValue,
} from "@chakra-ui/react";

/**
 * @component ServiceListSkeleton
 * @description Muestra una cuadrícula de esqueletos de tarjetas de servicio para indicar el estado de carga.
 * @returns {JSX.Element}
 */
const ServiceListSkeleton = () => {
    // Styles matching ServiceCard
    const cardBorderColor = useColorModeValue(
        "rgba(255, 255, 255, 0.25)",
        "rgba(0, 0, 0, 0.25)"
    );
    const cardBg = useColorModeValue(
        "rgba(255, 255, 255, 0.25)",
        "rgba(0, 0, 0, 0.25)"
    );

    return (
        <Container maxW="7xl" mt={6} mb={0} textAlign="center">
            {/* Title Skeleton */}
            <Skeleton height="50px" width="300px" mx="auto" mb={2} mt={4} />
            {/* Subtitle Skeleton */}
            <Skeleton height="30px" width="400px" mx="auto" mb={10} />

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
                {Array.from({ length: 12 }).map((_, index) => (
                    <Box
                        key={index}
                        w="full"
                        maxW={{ base: "full", md: "md" }}
                        h="auto"
                        mb={4}
                        overflow="hidden"
                        bg={cardBg}
                        backdropFilter="blur(10px)"
                        borderRadius="2xl"
                        boxShadow="lg"
                    >
                        <Box p={2}>
                            <Skeleton
                                height={{ base: "245px", md: "375px" }}
                                w="full"
                                borderRadius="xl"
                            />
                            <Stack p={4} spacing={3}>
                                <Skeleton height="28px" width="70%" mx="auto" />
                                <Skeleton
                                    height="40px"
                                    width="full"
                                    borderRadius="md"
                                    mt={2}
                                />
                            </Stack>
                        </Box>
                    </Box>
                ))}
            </SimpleGrid>
        </Container>
    );
};

export default ServiceListSkeleton;
