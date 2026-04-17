/**
 * @file AuraSkeleton.tsx
 * @description Premium high-fidelity skeleton loaders that mirror the exact physical structure of Aura components.
 */
import React from "react";
import { Skeleton, VStack, HStack, Box, SimpleGrid, AspectRatio, SkeletonProps, SimpleGridProps } from "@chakra-ui/react";
import AuraSurface from "./AuraSurface";

/**
 * @component AuraSkeleton
 * @description Base pulsating primitive.
 */
const AuraSkeleton: React.FC<SkeletonProps> = ({ ...props }) => {
  return (
    <Skeleton
      borderRadius="phi"
      startColor="bg.subtle"
      endColor="border.glass"
      {...props}
    />
  );
};

interface CenteredProps {
  centered?: boolean;
}

/**
 * @component AuraHeaderSkeleton
 * @description Mirrors the hybrid immersive header exactly.
 */
export const AuraHeaderSkeleton: React.FC<CenteredProps> = ({ centered = true }) => (
  <VStack w="full" gap="phi_lg" pt={{ base: 4, md: 8 }} pb="phi_xl">
    {/* Navigation Row (Left-anchored) */}
    <HStack w="full" justify="flex-start" gap="phi_md">
      <AuraSkeleton h="40px" w="120px" borderRadius="full" />
      <AuraSkeleton h="12px" w="80px" />
    </HStack>
    
    {/* Title Row (Centered) */}
    <VStack w="full" align={centered ? "center" : "flex-start"} gap="phi_sm">
      <AuraSkeleton h={{ base: "32px", md: "48px" }} w={{ base: "80%", md: "500px" }} />
      <AuraSkeleton h="40px" w="160px" borderRadius="full" />
    </VStack>
  </VStack>
);

/**
 * @component ProjectCardSkeleton
 * @description Mirrors the vertical ProjectCard structure with image and text overlay.
 */
export const ProjectCardSkeleton: React.FC = () => (
  <Box
    h={{ base: "320px", md: "500px" }}
    w="full"
    borderRadius="xl"
    overflow="hidden"
    position="relative"
    bg="bg.section"
    // @ts-expect-error - Chakra UI v3 internal type mismatch for _dark syntax
    _dark={{ bg: "whiteAlpha.50" }}
  >
    <AuraSkeleton h="full" w="full" />
    <Box position="absolute" bottom="phi_lg" left="50%" transform="translateX(-50%)" w="full" px="phi_lg">
      <VStack gap="phi_sm" w="full">
        <AuraSkeleton h="24px" w="60%" />
        <AuraSkeleton h="12px" w="40%" />
        <AuraSkeleton h="36px" w="140px" borderRadius="full" mt={4} />
      </VStack>
    </Box>
  </Box>
);

/**
 * @component ServiceCardSkeleton
 * @description Mirrors the horizontal ServiceCard structure.
 */
export const ServiceCardSkeleton: React.FC = () => (
  <AuraSurface p="phi_md" h="140px">
    <HStack gap="phi_md" h="full" align="center">
      <AuraSkeleton boxSize="80px" borderRadius="xl" />
      <VStack align="flex-start" flex="1" gap="phi_xs">
        <AuraSkeleton h="18px" w="70%" />
        <AuraSkeleton h="12px" w="90%" />
        <AuraSkeleton h="12px" w="50%" />
      </VStack>
    </HStack>
  </AuraSurface>
);

/**
 * @component BentoGridSkeleton
 * @description Replicates the Bento layout found in details pages.
 */
export const BentoGridSkeleton: React.FC = () => (
  <SimpleGrid columns={{ base: 1, lg: 3 }} gap="phi_lg" w="full">
    {/* @ts-expect-error - Chakra UI v3 internal type mismatch for colSpan in SimpleGrid */}
    <AuraSkeleton h="380px" borderRadius="3xl" colSpan={{ base: 1, lg: 2 }} />
    <AuraSkeleton h="380px" borderRadius="3xl" />
    {/* @ts-expect-error - Chakra UI v3 internal type mismatch for colSpan in SimpleGrid */}
    <AuraSkeleton h="200px" borderRadius="3xl" colSpan={{ base: 1, lg: 3 }} />
  </SimpleGrid>
);

/**
 * @component GallerySkeleton
 * @description Large viewer skeleton.
 */
export const GallerySkeleton: React.FC = () => (
  <AspectRatio ratio={{ base: 4/3, md: 16/9 }} w="full">
    <AuraSkeleton borderRadius="3xl" />
  </AspectRatio>
);

/**
 * @component BannerSkeleton
 * @description Skeleton for large interactive areas like the QR Digital Wallet section.
 */
export const BannerSkeleton: React.FC = () => (
  <AuraSurface p="phi_lg" w="full">
    {/* @ts-expect-error - Chakra UI v3 internal type mismatch for direction in VStack */}
    <VStack direction={{ base: "column", md: "row" }} gap="phi_lg" align="center">
      <AuraSkeleton w={{ base: "full", md: "280px" }} h="280px" borderRadius="2xl" />
      <VStack align="flex-start" flex="1" gap="phi_md" w="full">
        <HStack gap="phi_sm">
          <AuraSkeleton h="24px" w="60px" borderRadius="full" />
          <AuraSkeleton h="24px" w="60px" borderRadius="full" />
        </HStack>
        <AuraSkeleton h="32px" w="70%" />
        <AuraSkeleton h="16px" w="90%" />
        <AuraSkeleton h="16px" w="80%" />
        <AuraSkeleton h="60px" w="full" borderRadius="xl" />
      </VStack>
    </VStack>
  </AuraSurface>
);

interface GridSkeletonProps {
  columns?: SimpleGridProps["columns"];
  count?: number;
  gap?: string;
}

/**
 * @component GridSkeleton
 */
export const GridSkeleton: React.FC<GridSkeletonProps> = ({ columns = { base: 1, md: 2 }, count = 4, gap = "phi_md" }) => (
  <SimpleGrid columns={columns} gap={gap} w="full">
    {Array.from({ length: count }).map((_, i) => (
      <ServiceCardSkeleton key={i} />
    ))}
  </SimpleGrid>
);

export const SectionSkeleton: React.FC<{ h?: string }> = ({ h = "400px" }) => (
  <VStack w="full" gap="phi_lg" py="phi_xl">
    <AuraSkeleton h="32px" w="200px" />
    <AuraSkeleton h={h} w="full" borderRadius="3xl" />
  </VStack>
);

/**
 * @component ProjectPageSkeleton
 * @description Full silhouette for the portfolio page.
 */
export const ProjectPageSkeleton: React.FC = () => (
  <VStack w="full" gap="phi_lg" p={{ base: "phi_md", md: "phi_xl" }}>
    <AuraHeaderSkeleton centered={false} />
    <HStack gap={4} justify="center" w="full" flexWrap="wrap">
      <AuraSkeleton h="36px" w="80px" borderRadius="full" />
      <AuraSkeleton h="36px" w="60px" borderRadius="full" />
      <AuraSkeleton h="36px" w="60px" borderRadius="full" />
      <AuraSkeleton h="36px" w="60px" borderRadius="full" />
    </HStack>
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="phi_lg" w="full">
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
      <ProjectCardSkeleton />
    </SimpleGrid>
  </VStack>
);

/**
 * @component ServicePageSkeleton
 * @description Full silhouette for the services catalog.
 */
export const ServicePageSkeleton: React.FC = () => (
  <VStack w="full" gap="phi_lg" p={{ base: "phi_md", md: "phi_xl" }}>
    <AuraHeaderSkeleton centered={false} />
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="phi_lg" w="full">
      <ServiceCardSkeleton />
      <ServiceCardSkeleton />
      <ServiceCardSkeleton />
      <ServiceCardSkeleton />
      <ServiceCardSkeleton />
      <ServiceCardSkeleton />
    </SimpleGrid>
  </VStack>
);

export default AuraSkeleton;
