import React from "react";
import {
    Container,
    SimpleGrid,
    Skeleton,
    SkeletonText,
    Box,
    Stack,
    Flex,
} from "@chakra-ui/react";

/**
 * @component FeatureListSkeleton
 * @description Muestra una cuadrícula de esqueletos de tarjetas de características para indicar el estado de carga.
 * @returns {JSX.Element}
 */
const FeatureListSkeleton = () => {
    const renderSkeletons = () => {
        return Array.from({ length: 4 }).map((_, index) => (
            <Box
                key={index}
                p={{ base: 3, md: 6 }}
                textAlign="center"
                bg='whiteAlpha.200'
                backdropFilter='blur(10px)'
                border='1px solid'
                borderColor='whiteAlpha.300'
                shadow='lg'
                rounded='xl'
            >
                <Skeleton w={24} h={24} mx="auto" mb={4} rounded="full" />
                <Stack spacing={3}>
                    <SkeletonText
                        noOfLines={1}
                        skeletonHeight="24px"
                        width="70%"
                        mx="auto"
                    />
                    <SkeletonText
                        noOfLines={2}
                        skeletonHeight="20px"
                        width="90%"
                        mx="auto"
                        mt={2}
                    />
                </Stack>
            </Box>
        ));
    };

    return (
        <Container maxW="8xl" mt={6} mb={6}>
            <Flex alignItems="center" justifyContent="center" minHeight="80vh">
                <SimpleGrid
                    columns={{ base: 1, md: 4 }}
                    spacingX={{ base: 5, md: 8 }}
                    spacingY={{ base: 5, md: 8 }}
                >
                    {renderSkeletons()}
                </SimpleGrid>
            </Flex>
        </Container>
    );
};

export default FeatureListSkeleton;