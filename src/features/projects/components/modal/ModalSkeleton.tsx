import { useColorModeValue } from "@/components/ui/color-mode-hooks";
import React from 'react';
import { VStack, SkeletonText, Skeleton, Flex, Spacer, Box } from "@chakra-ui/react";
import {
  DialogRoot,
  DialogContent,
  DialogBody,
} from "@/components/ui/dialog";

/**
 * @component ModalSkeleton
 * @description Skeleton visual para el modal de detalles del proyecto.
 * Migrado de Modal (v2) → DialogRoot (v3).
 */
const ModalSkeleton: React.FC = () => {
  const modalBg = useColorModeValue(
    "rgba(255, 255, 255, 0.92)",
    "rgba(20, 20, 20, 0.95)"
  );
  const borderColor = useColorModeValue(
    "rgba(255, 255, 255, 0.35)",
    "rgba(255, 255, 255, 0.15)"
  );
  const textColor = useColorModeValue("gray.800", "gray.100");

  return (
    <DialogRoot
      open={true}
      placement="center"
      size={{ base: "full", md: "5xl", lg: "6xl" }}
    >
      <DialogContent
        borderRadius={{ base: 0, md: "2xl" }}
        bg={modalBg}
        border="1px solid"
        borderColor={borderColor}
        boxShadow="2xl"
        color={textColor}
      >
        <DialogBody p={{ base: 4, md: 6 }} pb={{ base: 6, md: 8 }}>
          <Flex
            w="full"
            h={{ base: "auto", lg: "full" }}
            flexDirection={{ base: "column", lg: "row" }}
            gap={{ base: 6, lg: 8 }}
          >
            {/* Skeleton para VisualViewer */}
            <Box flex={{ base: "none", lg: 1 }} w="full">
              <Skeleton height={{ base: "250px", lg: "500px" }} borderRadius="md" />
              <Flex mt={4} justify="center" gap={2}>
                <Skeleton width="80px" height="30px" borderRadius="md" />
                <Skeleton width="80px" height="30px" borderRadius="md" />
              </Flex>
            </Box>

            {/* Skeleton para ProjectInfo */}
            <VStack flex={{ base: "none", lg: 1 }} w="full" align="flex-start" gap={4}>
              <SkeletonText mt="2" noOfLines={1} gap="4" width="70%" />
              <SkeletonText mt="2" noOfLines={1} gap="4" width="50%" />
              <SkeletonText mt="4" noOfLines={3} gap="4" width="full" />
              <Spacer />
              <Flex w="full" justify="space-between" mt={4}>
                <Skeleton height="40px" width="45%" borderRadius="md" />
                <Skeleton height="40px" width="45%" borderRadius="md" />
              </Flex>
            </VStack>
          </Flex>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default ModalSkeleton;
