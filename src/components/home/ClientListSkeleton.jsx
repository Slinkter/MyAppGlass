import {
    Container,
    Flex,
    Skeleton,
    SkeletonText,
    Box,
    Stack,
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
                w="full"
                maxW={{ base: "full", md: "md" }}
                h={{ base: "auto", md: "xl" }}
                p={{ base: 3, md: 6 }}
                bg='whiteAlpha.200'
                backdropFilter='blur(10px)'
                border='1px solid'
                borderColor='whiteAlpha.300'
                shadow='lg'
                rounded='xl'
            >
                <Skeleton
                    height={{ base: "260px", md: "375px" }}
                    rounded="lg"
                    mb={5}
                />
                <Stack spacing={3}>
                    <SkeletonText
                        noOfLines={1}
                        skeletonHeight="28px"
                        width="60%"
                        mx="auto"
                    />
                    <SkeletonText
                        noOfLines={2}
                        skeletonHeight="20px"
                        width="80%"
                        mx="auto"
                        mt={2}
                    />
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