"use client";

import React from "react";
import { Box, Container, Grid, GridItem, VStack } from "@chakra-ui/react";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

/** Tarjetas fantasma de la lista de servicios (misma altura que ServiceCard). */
export const ServiceCardSkeletons: React.FC<{ count?: number }> = ({ count = 6 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <Skeleton
        key={i}
        w="full"
        h={{ base: "260px", sm: "280px", md: "310px" }}
        borderRadius="3xl"
      />
    ))}
  </>
);

/** Esqueleto de la página de detalle de servicio. */
export const ServiceDetailSkeleton: React.FC = () => (
  <Container maxW="7xl" px={{ base: "3", sm: "4", lg: "0" }} pt={{ base: "3", md: "5" }} pb="12">
    <VStack gap={{ base: "4", lg: "8" }} align="stretch">
      <Skeleton h="10" w={{ base: "full", md: "50%" }} borderRadius="xl" />
      <Grid templateColumns={{ base: "1fr", lg: "repeat(12, 1fr)" }} gap={{ base: "4", lg: "6" }}>
        <GridItem colSpan={{ base: 1, lg: 7 }} order={{ base: 1, lg: 2 }}>
          <Skeleton h={{ base: "380px", lg: "460px" }} w="full" borderRadius={{ base: "2xl", lg: "3xl" }} />
        </GridItem>
        <GridItem colSpan={{ base: 1, lg: 5 }} order={{ base: 2, lg: 1 }}>
          <Box p="4">
            <SkeletonText noOfLines={6} />
          </Box>
        </GridItem>
      </Grid>
    </VStack>
  </Container>
);
