/**
 * @file AuraSkeleton.jsx
 * @description Premium skeleton loader with Aura Glassmorphism and pulsating animations.
 */
import React from "react";
import { Box, Skeleton, SkeletonCircle, SkeletonText, VStack, HStack, SimpleGrid } from "@chakra-ui/react";
import AuraSurface from "./AuraSurface";

/**
 * @component AuraSkeleton
 * @description Base primitive for Aura loading states.
 */
const AuraSkeleton = ({ variant = "default", ...props }) => {
  return (
    <Skeleton
      variant={variant}
      borderRadius="phi"
      startColor="bg.subtle"
      endColor="border.glass"
      {...props}
    />
  );
};

/**
 * @component CardSkeleton
 * @description Specialized skeleton for bank accounts and service cards.
 */
export const CardSkeleton = ({ hasIcon = true }) => (
  <AuraSurface p="phi_md" w="full" h="120px">
    <HStack gap="phi_md" h="full" align="center">
      {hasIcon && <SkeletonCircle size="12" startColor="bg.subtle" endColor="border.glass" />}
      <VStack align="flex-start" flex="1" gap="phi_xs">
        <AuraSkeleton h="12px" w="40%" />
        <AuraSkeleton h="20px" w="80%" />
      </VStack>
    </HStack>
  </AuraSurface>
);

/**
 * @component SectionHeaderSkeleton
 */
export const SectionHeaderSkeleton = () => (
  <VStack align="flex-start" gap="phi_md" py="phi_lg">
    <AuraSkeleton h="14px" w="100px" />
    <AuraSkeleton h="40px" w={{ base: "full", md: "400px" }} />
    <AuraSkeleton h="16px" w={{ base: "full", md: "600px" }} />
  </VStack>
);

/**
 * @component BannerSkeleton
 * @description Skeleton for large interactive areas like the QR Digital Wallet section.
 */
export const BannerSkeleton = () => (
  <AuraSurface p="phi_lg" w="full">
    <Stack direction={{ base: "column", md: "row" }} gap="phi_lg" align="center">
      <AuraSkeleton w={{ base: "full", md: "280px" }} h="280px" borderRadius="2xl" />
      <VStack align="flex-start" flex="1" gap="phi_md">
        <HStack gap="phi_sm">
          <AuraSkeleton h="24px" w="60px" borderRadius="full" />
          <AuraSkeleton h="24px" w="60px" borderRadius="full" />
        </HStack>
        <AuraSkeleton h="32px" w="70%" />
        <AuraSkeleton h="16px" w="90%" />
        <AuraSkeleton h="16px" w="80%" />
        <AuraSkeleton h="60px" w="full" borderRadius="xl" />
      </VStack>
    </Stack>
  </AuraSurface>
);

/**
 * @component SectionSkeleton
 * @description Flexible container for large feature blocks.
 */
export const SectionSkeleton = ({ h = "500px" }) => (
  <VStack gap="phi_md" w="full" py="phi_xl">
    <AuraSkeleton h="32px" w="200px" />
    <AuraSkeleton h={h} w="full" borderRadius="3xl" />
  </VStack>
);

/**
 * @component GridSkeleton
 */
export const GridSkeleton = ({ columns = { base: 1, md: 2 }, count = 4, gap = "phi_md" }) => (
  <SimpleGrid columns={columns} gap={gap} w="full">
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </SimpleGrid>
);

export default AuraSkeleton;
