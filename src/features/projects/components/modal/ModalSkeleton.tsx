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
      size={{ base: "full", md: "xl" }}
    >
      <DialogContent
        borderRadius={{ base: 0, md: "2xl" }}
        bg={modalBg}
        border="1px solid"
        borderColor={borderColor}
        boxShadow="2xl"
        color={textColor}
      >
        <DialogBody p={{ base: "phi_md", md: "phi_md" }} pb={{ base: "phi_md", md: "phi_lg" }}>
          <Flex
            w="full"
            h={{ base: "auto", lg: "full" }}
            flexDirection={{ base: "column", lg: "row" }}
            gap={{ base: "phi_md", lg: "phi_lg" }}
          >
            {/* Skeleton para VisualViewer */}
            <Box flex={{ base: "none", lg: 1 }} w="full">
              <Skeleton height={{ base: "250px", lg: "500px" }} borderRadius="md" />
              <Flex mt="phi_md" justify="center" gap="phi_xs">
                <Skeleton width="80px" height="30px" borderRadius="md" />
                <Skeleton width="80px" height="30px" borderRadius="md" />
              </Flex>
            </Box>

            {/* Skeleton para ProjectInfo */}
            <VStack flex={{ base: "none", lg: 1 }} w="full" align="flex-start" gap="phi_md">
              <SkeletonText mt="2" lineClamp={1} gap="phi_md" width="70%" />
              <SkeletonText mt="2" lineClamp={1} gap="phi_md" width="50%" />
              <SkeletonText mt="4" lineClamp={3} gap="phi_md" width="full" />
              <Spacer />
              <Flex w="full" justify="space-between" mt="phi_md">
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
