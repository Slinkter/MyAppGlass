import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  VStack,
  SkeletonText,
  Skeleton,
  Flex,
  Spacer,
  Box,
  useColorModeValue
} from '@chakra-ui/react';

/**
 * @component ModalSkeleton
 * @description Un componente esqueleto visual para el modal de detalles del proyecto,
 * que se muestra mientras el contenido real del modal se carga de forma diferida.
 * Simula la estructura básica del modal, incluyendo un visor de imagen/mapa y un panel de información.
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
    <Modal
      isOpen={true} // Siempre abierto para el esqueleto
      onClose={() => {}} // No funcional para el esqueleto
      motionPreset="slideInBottom"
      size={{ base: "full", md: "5xl", lg: "6xl" }}
      scrollBehavior="inside"
      isCentered
      preserveScrollBarGap
    >
      <ModalOverlay backdropFilter={"blur(10px)"} />
      <ModalContent
        borderRadius={{ base: 0, md: "2xl" }}
        bg={modalBg}
        backdropFilter="blur(20px)"
        border="1px solid"
        borderColor={borderColor}
        boxShadow="2xl"
        color={textColor}
      >
        <ModalBody p={{ base: 4, md: 6 }} pb={{ base: 6, md: 8 }}>
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
              spacing={4}
            >
              <SkeletonText mt="2" noOfLines={1} spacing="4" width="70%" />
              <SkeletonText mt="2" noOfLines={1} spacing="4" width="50%" />
              <SkeletonText mt="4" noOfLines={3} spacing="4" width="full" />
              <Spacer />
              <Flex w="full" justify="space-between" mt={4}>
                <Skeleton height="40px" width="45%" rounded="md" />
                <Skeleton height="40px" width="45%" rounded="md" />
              </Flex>
            </VStack>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalSkeleton;