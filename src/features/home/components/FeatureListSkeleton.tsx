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
const FeatureListSkeleton: React.FC = () => {
    const renderSkeletons = () => {
        return Array.from({ length: 4 }).map((_, index) => (
            <Box
                key={index}
                p={{ base: 3, md: 6 }}
                textAlign="center"
                bg='whiteAlpha.200'
                border='1px solid'
                borderColor='whiteAlpha.300'
                shadow='lg'
                rounded='xl'
            >
                <Skeleton w={24} h={24} mx="auto" mb={4} rounded="full" />
                <Stack gap={3}>
                    <SkeletonText
                        lineClamp={1}
                        height="24px"
                        width="70%"
                        mx="auto"
                    />
                    <SkeletonText
                        lineClamp={2}
                        height="20px"
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
                    columnGap={{ base: 5, md: 8 }}
                    rowGap={{ base: 5, md: 8 }}
                >
                    {renderSkeletons()}
                </SimpleGrid>
            </Flex>
        </Container>
    );
};

export default FeatureListSkeleton;