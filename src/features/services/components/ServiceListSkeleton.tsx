"use client";

import React from "react";
import {
  Container,
  SimpleGrid,
  Skeleton,
  Box,
  VStack,
} from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

/**
 * @component ServiceListSkeleton
 * @description Muestra una cuadrícula de esqueletos de tarjetas de servicio para indicar el estado de carga.
 * @returns {JSX.Element}
 */
const ServiceListSkeleton = () => {
  const cardBg = useColorModeValue(
    "rgba(255, 255, 255, 0.25)",
    "rgba(0, 0, 0, 0.25)"
  );

  return (
    <Container maxW="7xl" mt={6} mb={0} textAlign="center">
      <Box height="50px" width="300px" mx="auto" mb={2} mt={4}>
        <Skeleton h="full" w="full" />
      </Box>
      <Box height="30px" width="400px" mx="auto" mb={10}>
        <Skeleton h="full" w="full" />
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={10}>
        {Array.from({ length: 12 }).map((_, index) => (
          <Box
            key={index}
            w="full"
            maxW={{ base: "full", md: "md" }}
            h="auto"
            mb={4}
            overflow="hidden"
            bg={cardBg}
            borderRadius="2xl"
            boxShadow="lg"
          >
            <Box p={2}>
              <Box height={{ base: "245px", md: "375px" }} w="full">
                <Skeleton h="full" w="full" borderRadius="xl" />
              </Box>
              <VStack p={4} gap={3}>
                <Box height="28px" width="70%" mx="auto">
                  <Skeleton h="full" w="full" />
                </Box>
                <Box height="40px" width="full" mt={2}>
                  <Skeleton h="full" w="full" borderRadius="md" />
                </Box>
              </VStack>
            </Box>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default ServiceListSkeleton;
