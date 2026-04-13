"use client";

import React from "react";
import {
  Grid,
  GridItem,
  VStack,
  HStack,
  Skeleton,
  Container,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import GlassCard from "@shared/components/common/GlassCard";

/**
 * @component ServiceSkeleton
 * @description Skeleton de carga para la página de servicios.
 */
const ServiceSkeleton = () => {
  return (
    <Container maxW="container.xl" pt={{ base: 4, md: 8 }} pb={20}>
      <VStack gap={8} align="stretch">
        <VStack gap={2} align={{ base: "center", md: "start" }}>
          <Box height="12px" width="100px"><Skeleton h="full" w="full" borderRadius="full" /></Box>
          <Box height="40px" width={{ base: "80%", md: "40%" }}><Skeleton h="full" w="full" borderRadius="md" /></Box>
        </VStack>

        <HStack gap={3} py={2} justify={{ base: "start", md: "center" }} overflow="hidden">
          {["pill-1", "pill-2", "pill-3", "pill-4"].map((key) => (
            <Box key={key} height="36px" width="120px" flexShrink={0}>
              <Skeleton h="full" w="full" borderRadius="full" />
            </Box>
          ))}
        </HStack>

        <Box height={{ base: "400px", md: "600px" }} w="100%">
          <Skeleton
            borderRadius="3xl"
            h="full"
            w="full"
          />
        </Box>

        <Grid
          templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
          templateRows={{ base: "auto", lg: "320px" }}
          gap={6}
        >
          <GridItem colSpan={{ base: 1, lg: 2 }}>
            <GlassCard p={8} h="full">
              <Box height="20px" width="30%" mb={4}><Skeleton h="full" w="full" borderRadius="full" /></Box>
              <VStack align="stretch" gap={3}>
                <Box height="16px" width="100%"><Skeleton h="full" w="full" borderRadius="md" /></Box>
                <Box height="16px" width="95%"><Skeleton h="full" w="full" borderRadius="md" /></Box>
                <Box height="16px" width="40%"><Skeleton h="full" w="full" borderRadius="md" /></Box>
              </VStack>
            </GlassCard>
          </GridItem>
          <GridItem colSpan={1}>
            <GlassCard p={8} h="full">
              <VStack h="full" justify="center" gap={4}>
                <Box height="48px" width="48px"><Skeleton h="full" w="full" borderRadius="full" /></Box>
                <Box height="24px" width="70%"><Skeleton h="full" w="full" borderRadius="md" /></Box>
                <Box height="40px" width="90%"><Skeleton h="full" w="full" borderRadius="full" /></Box>
              </VStack>
            </GlassCard>
          </GridItem>
          <GridItem colSpan={{ base: 1, lg: 3 }}>
            <GlassCard p={8} h="full">
              <Box height="16px" width="20%" mb={6}><Skeleton h="full" w="full" borderRadius="full" /></Box>
              <SimpleGrid columns={{ base: 1, sm: 2 }} gap={6}>
                {["item-1", "item-2", "item-3", "item-4"].map((key) => (
                  <Box key={key} height="20px"><Skeleton h="full" w="full" borderRadius="md" /></Box>
                ))}
              </SimpleGrid>
            </GlassCard>
          </GridItem>
        </Grid>
      </VStack>
    </Container>
  );
};

export default ServiceSkeleton;
