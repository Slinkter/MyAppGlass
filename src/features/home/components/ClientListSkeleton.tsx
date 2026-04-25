import React from "react";
import {
    Container,
    SimpleGrid,
    Skeleton,
    Box,
    VStack,
} from "@chakra-ui/react";

/**
 * @component ClientCardSkeleton
 * @description Skeleton for a single client card.
 */
const ClientCardSkeleton: React.FC = () => {
    return (
        <Box
            position="relative"
            w="full"
            h={{ base: "320px", md: "520px" }}
            borderRadius="3xl"
            overflow="hidden"
            bg="bg.subtle"
        >
            <Skeleton h="full" w="full" />
            
            {/* Content Overlay Skeleton */}
            <VStack
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                p="phi_lg"
                gap="phi_xs"
                align="center"
                justify="flex-end"
                zIndex={2}
            >
                {/* Client Name */}
                <Skeleton height={{ base: "24px", md: "32px" }} width="70%" borderRadius="full" />
                
                {/* Separator */}
                <Box w="60px" h="2px" bg="whiteAlpha.300" mt="phi_xs" />
                
                {/* Client Description */}
                <Skeleton height="16px" width="85%" borderRadius="full" mt="phi_xs" />
                <Skeleton height="16px" width="60%" borderRadius="full" />
            </VStack>
        </Box>
    );
};

/**
 * @component ClientListSkeleton
 * @description Muestra una cuadrícula de esqueletos de tarjetas de cliente para indicar el estado de carga.
 */
const ClientListSkeleton: React.FC = () => {
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
                    <Skeleton height={{ base: "32px", md: "48px" }} width="380px" mx="auto" />
                    <Skeleton height={{ base: "20px", md: "24px" }} width="420px" mx="auto" mt={{ base: "phi_sm", md: "phi_md" }} />
                </VStack>

                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 3 }}
                    gap={{ base: "phi_md", md: "phi_lg" }}
                    w="full"
                >
                    {Array.from({ length: 3 }).map((_, index) => (
                        <ClientCardSkeleton key={index} />
                    ))}
                </SimpleGrid>
            </VStack>
        </Container>
    );
};

export default ClientListSkeleton;
