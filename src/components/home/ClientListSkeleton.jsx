import React from 'react';
import {
    Container,
    Flex,
    Skeleton,
    SkeletonText,
    Box,
    Stack
} from "@chakra-ui/react";

/**
 * @component ClientListSkeleton
 * @description Muestra una cuadrícula de esqueletos de tarjetas de cliente para indicar el estado de carga.
 * @returns {JSX.Element}
 */
const ClientListSkeleton = () => {
    const renderSkeletons = () => {
        return Array.from({ length: 3 }).map((_, index) => (
            <Box
                key={index}
                w={"full"}
                maxW={{ base: "full", md: "475px" }}
                h={{ base: "auto", md: "xl" }}
                p={{ base: 3, md: 6 }}
                boxShadow={{ base: "base", md: "lg" }}
                border={"1px solid"}
                borderColor={"gray.200"}
                rounded={"lg"}
            >
                <Skeleton height={{ base: "260px", md: "375px" }} borderRadius="lg" mb={5} />
                <Stack spacing={3}>
                    <SkeletonText noOfLines={1} skeletonHeight="28px" width="60%" mx="auto" />
                    <SkeletonText noOfLines={2} skeletonHeight="20px" width="80%" mx="auto" mt={2} />
                </Stack>
            </Box>
        ));
    };

    return (
        <Container maxW={"8xl"} mt={6} mb={6}>
            <Flex
                minHeight={"80vh"}
                justifyContent={"space-evenly"}
                alignItems={"center"}
                flexDir={{ base: "column", md: "row" }}
                gap={6}
            >
                {renderSkeletons()}
            </Flex>
        </Container>
    );
};

export default ClientListSkeleton;
