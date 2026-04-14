import { useColorModeValue } from "@/components/ui/color-mode";
/**
 * @file SectionSkeleton.jsx
 * @description Theme-aware skeleton loader for sections to prevent layout shifts and provide smooth transitions.
 * @module shared/common
 */

import React from "react";
import { Skeleton, SkeletonCircle, SkeletonText, Box, VStack, Container } from "@chakra-ui/react";

/**
 * @component SectionSkeleton
 * @description Smooth transition skeleton for sections, matching the Aura design language.
 * @param {Object} props
 * @param {string} [props.h="400px"] - Height of the main container.
 * @param {boolean} [props.withCircle=false] - Whether to show a circular skeleton (e.g., for icons/avatars).
 */
const SectionSkeleton = ({ h = "400px", withCircle = false }) => {
  // We use semantic tokens indirectly or direct color modes for fine control over transitions
  const startColor = useColorModeValue("gray.100", "whiteAlpha.100");
  const endColor = useColorModeValue("gray.200", "whiteAlpha.200");

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
          {withCircle && <SkeletonCircle size="12" startColor={startColor} endColor={endColor} />}
          
          {/* Mock Section Title */}
          <Skeleton 
            height="32px" 
            width="40%" 
            startColor={startColor} 
            endColor={endColor} 
            borderRadius="md" 
          />
          
          {/* Mock Content Text */}
          <SkeletonText 
            mt="4" 
            noOfLines={3} 
            gap="4" 
            skeletonHeight="3" 
            startColor={startColor} 
            endColor={endColor} 
          />
          
          {/* Mock Hero Image/Visual Area */}
          <Skeleton 
            mt="auto" 
            height="180px" 
            width="full" 
            startColor={startColor} 
            endColor={endColor} 
            borderRadius="card" 
          />
        </VStack>
      </Box>
    </Container>
  );
};

export default SectionSkeleton;
