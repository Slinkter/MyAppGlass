import {
  Box,
  Image,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Flex,
  useColorModeValue,
  IconButton,
  Text,
  HStack,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import FadingImage from "./FadingImage";

/**
 * Gallery Premium - Galería de producto de alta calidad
 * Diseño inspirado en configuradores de lujo (Apple, Tesla)
 * Con navegación, contador, dots y transiciones suaves.
 */
const Gallery = React.memo(({ images }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (images && images.length > 0) {
      setSelectedIndex(0);
    }
  }, [images]);

  const onOpenModal = () => setIsModalOpen(true);
  const onCloseModal = () => setIsModalOpen(false);

  const handlePrevious = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const activeBorderColor = useColorModeValue("blue.500", "blue.300");
  const dotColor = useColorModeValue("gray.300", "whiteAlpha.400");
  const dotActiveColor = useColorModeValue("blue.600", "blue.300");

  if (!images || images.length === 0) {
    return null;
  }

  const currentImage = images[selectedIndex];

  return (
    <>
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={{ base: 3, md: 4 }}
        h="100%"
        w="100%"
      >
        {/* 1. Visor Principal con Controles */}
        <Box
          flex="1"
          h={{ base: "400px", md: "100%" }}
          w="100%"
          position="relative"
          borderRadius="xl"
          overflow="hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          role="group"
        >
          {/* Imagen Principal */}
          <Box
            w="100%"
            h="100%"
            cursor="zoom-in"
            onClick={onOpenModal}
            position="relative"
            overflow="hidden"
          >
            <FadingImage
              src={currentImage.image}
              alt={currentImage.name || "Vista principal"}
              w="100%"
              h="100%"
              objectFit="cover"
              transition="transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
              transform={isHovered ? "scale(1.05)" : "scale(1)"}
            />
          </Box>

          {/* Controles de Navegación (solo si hay más de 1 imagen) */}
          {images.length > 1 && (
            <>
              {/* Botón Anterior */}
              <IconButton
                icon={<ChevronLeftIcon boxSize={6} />}
                position="absolute"
                left={4}
                top="50%"
                transform="translateY(-50%)"
                onClick={handlePrevious}
                opacity={isHovered ? 1 : 0}
                transition="opacity 0.3s ease"
                bg="blackAlpha.600"
                color="white"
                size="lg"
                rounded="full"
                _hover={{
                  bg: "blackAlpha.800",
                  transform: "translateY(-50%) scale(1.1)",
                }}
                aria-label="Imagen anterior"
                zIndex={2}
              />

              {/* Botón Siguiente */}
              <IconButton
                icon={<ChevronRightIcon boxSize={6} />}
                position="absolute"
                right={4}
                top="50%"
                transform="translateY(-50%)"
                onClick={handleNext}
                opacity={isHovered ? 1 : 0}
                transition="opacity 0.3s ease"
                bg="blackAlpha.600"
                color="white"
                size="lg"
                rounded="full"
                _hover={{
                  bg: "blackAlpha.800",
                  transform: "translateY(-50%) scale(1.1)",
                }}
                aria-label="Imagen siguiente"
                zIndex={2}
              />

              {/* Contador de Imágenes */}
              <Box
                position="absolute"
                top={4}
                right={4}
                bg="blackAlpha.700"
                backdropFilter="blur(8px)"
                px={3}
                py={1}
                borderRadius="full"
                zIndex={2}
              >
                <Text fontSize="sm" color="white" fontWeight="medium">
                  {selectedIndex + 1} / {images.length}
                </Text>
              </Box>

              {/* Indicadores de Navegación (Dots) */}
              <HStack
                position="absolute"
                bottom={4}
                left="50%"
                transform="translateX(-50%)"
                spacing={2}
                zIndex={2}
              >
                {images.map((_, index) => (
                  <Box
                    key={index}
                    w={selectedIndex === index ? "24px" : "8px"}
                    h="8px"
                    bg={selectedIndex === index ? dotActiveColor : dotColor}
                    borderRadius="full"
                    cursor="pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedIndex(index);
                    }}
                    transition="all 0.3s ease"
                    _hover={{ bg: dotActiveColor, transform: "scale(1.2)" }}
                  />
                ))}
              </HStack>
            </>
          )}
        </Box>

        {/* 2. Carrusel de Miniaturas */}
        <Flex
          direction={{ base: "row", md: "column" }}
          gap={2}
          w={{ base: "100%", md: "120px" }}
          h={{ base: "90px", md: "100%" }}
          overflowX={{ base: "auto", md: "hidden" }}
          overflowY={{ base: "hidden", md: "auto" }}
          pr={{ base: 0, md: 1 }}
          pb={{ base: 2, md: 0 }}
          css={{
            "&::-webkit-scrollbar": {
              width: "6px",
              height: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(255, 255, 255, 0.2)",
              borderRadius: "24px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "rgba(255, 255, 255, 0.3)",
            },
          }}
        >
          {images.map((img, index) => (
            <Box
              key={img.id}
              flexShrink={0}
              w={{ base: "90px", md: "100%" }}
              h={{ base: "100%", md: "90px" }}
              cursor="pointer"
              borderRadius="lg"
              overflow="hidden"
              border="3px solid"
              borderColor={
                selectedIndex === index ? activeBorderColor : "transparent"
              }
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              _hover={{
                borderColor: activeBorderColor,
                transform: "scale(1.05)",
                boxShadow: "lg",
              }}
              onClick={() => setSelectedIndex(index)}
              position="relative"
            >
              <Image
                src={img.image}
                alt={`Miniatura ${index + 1}`}
                w="100%"
                h="100%"
                objectFit="cover"
                loading="lazy"
                opacity={selectedIndex === index ? 1 : 0.6}
                transition="opacity 0.3s ease"
                _hover={{ opacity: 1 }}
              />
            </Box>
          ))}
        </Flex>
      </Flex>

      {/* Modal de Zoom Premium */}
      <Modal
        isOpen={isModalOpen}
        onClose={onCloseModal}
        isCentered
        size="full"
        motionPreset="scale"
      >
        <ModalOverlay backdropFilter="blur(20px)" bg="blackAlpha.900" />
        <ModalContent bg="transparent" boxShadow="none" m={0}>
          <ModalCloseButton
            color="white"
            zIndex={10}
            size="lg"
            bg="blackAlpha.600"
            rounded="full"
            pos="absolute"
            top={6}
            right={6}
            _hover={{ bg: "blackAlpha.800", transform: "scale(1.1)" }}
          />
          <ModalBody
            p={0}
            display="flex"
            justifyContent="center"
            alignItems="center"
            h="100vh"
          >
            <Image
              src={currentImage.image}
              alt="Imagen ampliada"
              maxH="95%"
              maxW="95%"
              objectFit="contain"
              borderRadius="lg"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});

Gallery.displayName = "Gallery";
export default Gallery;
