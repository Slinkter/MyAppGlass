"use client";

import React from 'react';
import {
  Dialog,
  VStack,
  Skeleton,
  Flex,
  Spacer,
  Box,
} from '@chakra-ui/react';
import { useColorModeValue } from '@/components/ui/color-mode';

/**
 * @component ModalSkeleton
 * @description Un componente esqueleto visual para el modal de detalles del proyecto,
 * que se muestra mientras el contenido real del modal se carga de forma diferida.
 * Simula la estructura básica del modal, incluyendo un visor de imagen/mapa y un panel de información.
 * Migrado a Chakra UI v3 Dialog.
 *
 * @returns {JSX.Element} Un esqueleto de modal de proyecto.
 */
const ModalSkeleton = () => {
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
    <Dialog.Root open={true} onOpenChange={() => {}} placement="center">
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content
          borderRadius={{ base: 0, md: "2xl" }}
          bg={modalBg}
          border="1px solid"
          borderColor={borderColor}
          boxShadow="2xl"
          color={textColor}
        >
          <Dialog.Body p={{ base: 4, md: 6 }} pb={{ base: 6, md: 8 }}>
            <Flex
              w="full"
              h={{ base: "auto", lg: "full" }}
              flexDirection={{ base: "column", lg: "row" }}
              gap={{ base: 6, lg: 8 }}
            >
              {/* Esqueleto para el VisualViewer (mapa/galería) */}
              <Box flex={{ base: "none", lg: 1 }} w="full">
                <Skeleton height={{ base: "250px", lg: "500px" }} rounded="md" />
                <Flex mt={4} justify="center" gap={2}>
                  <Skeleton width="80px" height="30px" rounded="md" />
                  <Skeleton width="80px" height="30px" rounded="md" />
                </Flex>
              </Box>

              {/* Esqueleto para ProjectInfo */}
              <VStack
                flex={{ base: "none", lg: 1 }}
                w="full"
                align="flex-start"
                gap={4}
              >
                {/* Fallback for SkeletonText from v2 */}
                <Box w="70%"><Skeleton height="20px" rounded="md" /></Box>
                <Box w="50%"><Skeleton height="20px" rounded="md" mt={2} /></Box>
                <Box w="100%"><Skeleton height="60px" rounded="md" mt={4} /></Box>
                <Spacer />
                <Flex w="full" justify="space-between" mt={4}>
                  <Skeleton height="40px" width="45%" rounded="md" />
                  <Skeleton height="40px" width="45%" rounded="md" />
                </Flex>
              </VStack>
            </Flex>
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default ModalSkeleton;
