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
            p="phi_xl"
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
            <VStack gap="phi_lg" w="full">
                {/* Icon Skeleton */}
                <Flex
                    w="phi_2xl"
                    h="phi_2xl"
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
                <VStack gap="phi_xs" w="full">
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
            mt={{ base: "phi_lg", md: "phi_2xl" }}
            pt={0}
        >
            <VStack gap={{ base: "phi_md", md: "phi_xl" }} w="full">
                {/* Header Section Skeleton (matches ItemGridLayout) */}
                <VStack gap="phi_xs">
                    <Skeleton height={{ base: "32px", md: "48px" }} width="350px" mx="auto" />
                    <Skeleton height={{ base: "20px", md: "24px" }} width="450px" mx="auto" mt={{ base: "phi_sm", md: "phi_md" }} />
                </VStack>

                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 3 }}
                    gap={{ base: "phi_md", md: "phi_lg" }}
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
