import React from "react";
import {
  Box,
  Grid,
  GridItem,
  VStack,
  HStack,
  Skeleton,
  SkeletonCircle,
  Container,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
import GlassCard from "@shared/components/common/GlassCard";

/**
 * @component ServiceSkeleton
 * @description Skeleton de carga para la página de servicios.
 * Imita la estructura visual de ServicePageLayout (Sidebar + Galería) para evitar saltos.
 *
 * @returns {JSX.Element} Estructura de carga.
 */
const ServiceSkeleton = () => {
  return (
    <Container maxW="container.xl" pt={{ base: 4, md: 8 }} pb={20}>
      <VStack spacing={8} align="stretch">
        {/* Header Skeleton */}
        <VStack spacing={2} align={{ base: "center", md: "start" }}>
          <Skeleton height="12px" width="100px" borderRadius="full" />
          <Skeleton height="40px" width={{ base: "80%", md: "40%" }} borderRadius="md" />
        </VStack>

        {/* Pills / Selector Skeleton */}
        <HStack spacing={3} py={2} justify={{ base: "start", md: "center" }} overflow="hidden">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} height="36px" width="120px" borderRadius="full" flexShrink={0} />
          ))}
        </HStack>

        {/* Gallery Mirror Skeleton */}
        <Skeleton
          borderRadius="3xl"
          height={{ base: "400px", md: "600px" }}
          width="100%"
          startColor={useColorModeValue("blackAlpha.50", "whiteAlpha.50")}
          endColor={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
        />

        {/* Bento Grid Skeleton */}
        <Grid
          templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
          templateRows={{ base: "auto", lg: "320px" }}
          gap={6}
        >
          <GridItem colSpan={{ base: 1, lg: 2 }}>
            <GlassCard p={8} h="full">
              <Skeleton height="20px" width="30%" mb={4} borderRadius="full" />
              <VStack align="stretch" spacing={3}>
                <Skeleton height="16px" width="100%" borderRadius="md" />
                <Skeleton height="16px" width="95%" borderRadius="md" />
                <Skeleton height="16px" width="40%" borderRadius="md" />
              </VStack>
            </GlassCard>
          </GridItem>
          <GridItem colSpan={1}>
            <GlassCard p={8} h="full">
              <VStack h="full" justify="center" spacing={4}>
                <SkeletonCircle size="12" />
                <Skeleton height="24px" width="70%" borderRadius="md" />
                <Skeleton height="40px" width="90%" borderRadius="full" />
              </VStack>
            </GlassCard>
          </GridItem>
          <GridItem colSpan={{ base: 1, lg: 3 }}>
            <GlassCard p={8} h="full">
              <Skeleton height="16px" width="20%" mb={6} borderRadius="full" />
              <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={6}>
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} height="20px" borderRadius="md" />
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
