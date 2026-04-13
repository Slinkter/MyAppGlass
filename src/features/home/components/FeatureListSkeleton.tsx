"use client";

import React from "react";
import {
    Container,
    SimpleGrid,
    Skeleton,
    Box,
    Stack,
    Flex,
} from "@chakra-ui/react";

const FeatureListSkeleton = () => {
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
                borderRadius='xl'
            >
                <Box w={24} h={24} mx="auto" mb={4}>
                    <Skeleton h="full" w="full" borderRadius="full" />
                </Box>
                <Stack gap={3}>
                    <Box height="24px" width="70%" mx="auto">
                         <Skeleton h="full" w="full" />
                    </Box>
                    <Box mt={2} display="flex" flexDirection="column" gap={2}>
                        <Box height="20px" width="90%" mx="auto">
                            <Skeleton h="full" w="full" />
                        </Box>
                        <Box height="20px" width="90%" mx="auto">
                            <Skeleton h="full" w="full" />
                        </Box>
                    </Box>
                </Stack>
            </Box>
        ));
    };

    return (
        <Container maxW="8xl" mt={6} mb={6}>
            <Flex alignItems="center" justifyContent="center" minHeight="80vh">
                <SimpleGrid
                    columns={{ base: 1, md: 4 }}
                    gap={{ base: 5, md: 8 }}
                >
                    {renderSkeletons()}
                </SimpleGrid>
            </Flex>
        </Container>
    );
};

export default FeatureListSkeleton;
