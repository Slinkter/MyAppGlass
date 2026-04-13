"use client";

import React from "react";
import {
    Container,
    Flex,
    Skeleton,
    Box,
    Stack,
} from "@chakra-ui/react";

const ClientListSkeleton = () => {
    const renderSkeletons = () => {
        return Array.from({ length: 3 }).map((_, index) => (
            <Box
                key={index}
                w="full"
                maxW={{ base: "full", md: "md" }}
                h={{ base: "auto", md: "xl" }}
                p={{ base: 3, md: 6 }}
                bg='whiteAlpha.200'
                border='1px solid'
                borderColor='whiteAlpha.300'
                shadow='lg'
                borderRadius='xl'
            >
                <Box height={{ base: "260px", md: "375px" }} mb={5}>
                    <Skeleton h="full" w="full" borderRadius="lg" />
                </Box>
                <Stack gap={3}>
                    <Box height="28px" width="60%" mx="auto">
                        <Skeleton h="full" w="full" />
                    </Box>
                    <Box mt={2} display="flex" flexDirection="column" gap={2}>
                        <Box height="20px" width="80%" mx="auto">
                            <Skeleton h="full" w="full" />
                        </Box>
                        <Box height="20px" width="80%" mx="auto">
                            <Skeleton h="full" w="full" />
                        </Box>
                    </Box>
                </Stack>
            </Box>
        ));
    };

    return (
        <Container maxW="8xl" mt={6} mb={6}>
            <Flex
                minHeight="80vh"
                justifyContent="space-evenly"
                alignItems="center"
                flexDir={{ base: "column", md: "row" }}
                gap={6}
            >
                {renderSkeletons()}
            </Flex>
        </Container>
    );
};

export default ClientListSkeleton;
