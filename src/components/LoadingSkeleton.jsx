import React from 'react';
import { Box, SkeletonText, Skeleton, VStack } from '@chakra-ui/react';

const LoadingSkeleton = () => {
  return (
    <VStack spacing={4} align="stretch" p={4}>
      <Skeleton height="40px" width="60%" />
      <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="20px" />
      <Skeleton height="200px" />
      <SkeletonText mt="4" noOfLines={2} spacing="4" skeletonHeight="20px" />
    </VStack>
  );
};

export default LoadingSkeleton;