"use client";

import React from "react";
import { Box, Container, VStack } from "@chakra-ui/react";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

/** Tarjetas fantasma de la lista de proyectos. */
export const ProjectCardSkeletons: React.FC<{ count?: number }> = ({ count = 6 }) => (
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

/** Esqueleto de la página de detalle de proyecto. */
export const ProjectDetailSkeleton: React.FC = () => (
  <Box bg="bg.page" minH="100vh" pt={{ base: 4, md: 6 }} pb={{ base: 16, md: 24 }}>
    <Container maxW="7xl" px={{ base: 4, sm: 6, md: 8 }}>
      <VStack gap={{ base: 6, md: 8 }} align="stretch">
        <Skeleton h="12" w={{ base: "full", md: "50%" }} borderRadius="xl" />
        <Skeleton h={{ base: "320px", sm: "380px", md: "480px" }} w="full" borderRadius="3xl" />
        <SkeletonText noOfLines={3} />
      </VStack>
    </Container>
  </Box>
);
