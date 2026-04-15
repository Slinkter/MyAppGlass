/**
 * @file SectionSkeleton.jsx
 * @description Theme-aware skeleton loader for sections using Chakra v3 optimized components.
 * @module shared/common
 */

import React from "react";
import { Box, VStack, Container } from "@chakra-ui/react";
import { Skeleton, SkeletonCircle, SkeletonText } from "@/components/ui/skeleton";

/**
 * @component SectionSkeleton
 * @description Smooth transition skeleton for sections, matching the Aura design language.
 */
const SectionSkeleton = ({ h = "400px", withCircle = false }) => {
  return (
    <Container maxW="1440px" py="phi_xl">
      <Box
        p="phi_lg"
        borderRadius="card"
        h={h}
        bg="bg.section"
        border="1px solid"
        borderColor="border.glass"
        boxShadow="sm"
        overflow="hidden"
        transition="all 0.3s ease-in-out"
      >
        <VStack align="stretch" gap="phi_md" h="full">
          {withCircle && <SkeletonCircle size="12" />}
          
          {/* Mock Section Title */}
          <Skeleton 
            height="32px" 
            width="40%" 
            borderRadius="md" 
          />
          
          {/* Mock Content Text */}
          <SkeletonText 
            mt="4" 
            noOfLines={3} 
            gap="4" 
          />
          
          {/* Mock Hero Image/Visual Area */}
          <Skeleton 
            mt="auto" 
            height="180px" 
            width="full" 
            borderRadius="card" 
          />
        </VStack>
      </Box>
    </Container>
  );
};

export default SectionSkeleton;
