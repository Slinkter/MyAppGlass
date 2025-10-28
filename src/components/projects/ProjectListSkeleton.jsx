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
 * @component ProjectListSkeleton
 * @description Muestra una cuadrícula de esqueletos de tarjetas de proyecto para indicar el estado de carga.
 * @returns {JSX.Element}
 */
const ProjectListSkeleton = () => {
    const renderSkeletons = () => {
        return Array.from({ length: 6 }).map((_, index) => (
            <Box
                key={index}
                w="375px"
                maxW={{ base: "full", md: "375px" }}
                mb={4}
                boxShadow={"md"}
                rounded="xl"
                overflow="hidden"
                p={4} // Add padding to mimic CardBody
            >
                <Skeleton height="320px" borderRadius="lg" mb="4" />
                <Stack mt="4" spacing="2">
                    <SkeletonText noOfLines={1} skeletonHeight="20px" width="70%" mb="2" />
                    <SkeletonText noOfLines={1} skeletonHeight="20px" width="90%" mb="4" />
                    <Flex alignItems="center" mb="2">
                        <Skeleton height="20px" width="20px" mr="2" />
                        <SkeletonText noOfLines={1} skeletonHeight="15px" width="60%" />
                    </Flex>
                    <Flex alignItems="center" mb="4">
                        <Skeleton height="20px" width="20px" mr="2" />
                        <SkeletonText noOfLines={1} skeletonHeight="15px" width="40%" />
                    </Flex>
                    <Skeleton height="40px" width="full" />
                </Stack>
            </Box>
        ));
    };

    return (
        <Container maxW={"8xl"} my={6} textAlign="center">
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

export default ProjectListSkeleton;
