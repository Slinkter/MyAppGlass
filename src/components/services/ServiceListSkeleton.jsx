import React from "react";
import {
    Container,
    Flex,
    Skeleton,
    SkeletonText,
    Box,
    Stack,
} from "@chakra-ui/react";

/**
 * @component ServiceListSkeleton
 * @description Muestra una cuadrícula de esqueletos de tarjetas de servicio para indicar el estado de carga.
 * @returns {JSX.Element}
 */
const ServiceListSkeleton = () => {
    const renderSkeletons = () => {
        return Array.from({ length: 6 }).map((_, index) => (
            <Box
                key={index}
                w="375px"
                maxW={{ base: "full", md: "375px" }}
                mb={4}
                bg="whiteAlpha.200"
                backdropFilter="blur(10px)"
                border="1px solid"
                borderColor="whiteAlpha.300"
                shadow="lg"
                rounded="xl"
                overflow="hidden"
                p={4}
            >
                <Skeleton height="320px" borderRadius="lg" mb="4" />
                <Stack mt="2" spacing="2">
                    <Flex justifyContent="space-between" alignItems="center">
                        <Box>
                            <SkeletonText
                                noOfLines={1}
                                skeletonHeight="20px"
                                width="100px"
                            />
                        </Box>
                        <Skeleton height="40px" width="100px" />
                    </Flex>
                </Stack>
            </Box>
        ));
    };

    return (
        <Container maxW={"8xl"} my={6} textAlign="center">
            {/* Title Skeleton */}
            <Skeleton height="40px" width="200px" mx="auto" mb={2} mt={4} />
            {/* Subtitle Skeleton */}
            <Skeleton height="24px" width="300px" mx="auto" mb={10} />

            <Flex
                direction={{ base: "column", md: "row" }}
                flexWrap={"wrap"}
                justifyContent={"center"}
                alignItems={"center"}
                mx={"auto"}
                gap={6}
            >
                {renderSkeletons()}
            </Flex>
        </Container>
    );
};

export default ServiceListSkeleton;
