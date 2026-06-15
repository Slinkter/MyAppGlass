import React from "react";
import {
    Container,
    SimpleGrid,
    Skeleton,
    Box,
    VStack,
    Flex,
} from "@chakra-ui/react";

/**
 * @component FeatureCardSkeleton
 * @description Skeleton for a single feature card.
 */
const FeatureCardSkeleton: React.FC = () => {
    return (
        <Box
            w="full"
            h="full"
            minH={{ base: "auto", md: "320px" }}
            p="14"
            bg="surface.card"
            border="1px solid"
            borderColor="border.glass"
            borderRadius="3xl"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            position="relative"
        >
            <VStack gap="8" w="full">
                {/* Icon Skeleton */}
                <Flex
                    w="20"
                    h="20"
                    align="center"
                    justify="center"
                    borderRadius="full"
                    bg="bg.page"
                    border="1px solid"
                    borderColor="border.default"
                >
                    <Skeleton w="24px" h="24px" borderRadius="full" />
                </Flex>

                {/* Text Skeleton */}
                <VStack gap="2" w="full">
                    <Skeleton height="16px" width="60%" borderRadius="full" />
                    <Skeleton height="14px" width="90%" borderRadius="full" />
                    <Skeleton height="14px" width="80%" borderRadius="full" />
                </VStack>
            </VStack>
        </Box>
    );
};

/**
 * @component FeatureListSkeleton
 * @description Muestra una cuadrícula de esqueletos de tarjetas de características para indicar el estado de carga.
 */
const FeatureListSkeleton: React.FC = () => {
    return (
        <Container 
            maxW="7xl" 
            textAlign="center" 
            mt={{ base: "8", md: "20" }}
            pt={0}
        >
            <VStack gap={{ base: "6", md: "14" }} w="full">
                {/* Header Section Skeleton (matches ItemGridLayout) */}
                <VStack gap="2">
                    <Skeleton height={{ base: "32px", md: "48px" }} width="350px" mx="auto" />
                    <Skeleton height={{ base: "20px", md: "24px" }} width="450px" mx="auto" mt={{ base: "4", md: "6" }} />
                </VStack>

                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 3 }}
                    gap={{ base: "6", md: "8" }}
                    w="full"
                >
                    {Array.from({ length: 3 }).map((_, index) => (
                        <FeatureCardSkeleton key={index} />
                    ))}
                </SimpleGrid>
            </VStack>
        </Container>
    );
};

export default FeatureListSkeleton;
