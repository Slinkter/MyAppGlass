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

  const activeBorderColor = useColorModeValue("red.500", "red.300");
  const dotColor = useColorModeValue("gray.300", "whiteAlpha.400");
  const dotActiveColor = useColorModeValue("blue.600", "blue.300");

  if (!images || images.length === 0) {
    return null;
  }

  // Validación de seguridad: Asegurar que el índice esté dentro de los límites
  // Esto previene crashes cuando cambiamos de una lista larga a una corta
  const safeIndex = selectedIndex >= images.length ? 0 : selectedIndex;
  const currentImage = images[safeIndex];

  if (!currentImage) return null;

  return (
    <>
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={{ base: 2, md: 3, lg: 4 }}
        h="100%"
        w="100%"
        minW={0}
        maxW="100%"
      >
        {/* 1. Visor Principal con Controles */}
        <Box
          flex="1"
          h={{ base: "280px", sm: "320px", md: "100%" }}
          w="100%"
          minW={0}
          position="relative"
          borderRadius={{ base: "lg", md: "xl" }}
          overflow="hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          role="group"
        >
          {/* Imagen Principal */}
          <Box
            w="100%"
            h="100%"
            cursor="select"
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
                icon={<ChevronLeftIcon boxSize={{ base: 5, md: 6 }} />}
                position="absolute"
                left={{ base: 2, md: 4 }}
                top="50%"
                transform="translateY(-50%)"
                onClick={handlePrevious}
                opacity={isHovered ? 1 : 0}
                transition="opacity 0.3s ease"
                bg="blackAlpha.600"
                color="white"
                size={{ base: "md", md: "lg" }}
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
                icon={<ChevronRightIcon boxSize={{ base: 5, md: 6 }} />}
                position="absolute"
                right={{ base: 2, md: 4 }}
                top="50%"
                transform="translateY(-50%)"
                onClick={handleNext}
                opacity={isHovered ? 1 : 0}
                transition="opacity 0.3s ease"
                bg="blackAlpha.600"
                color="white"
                size={{ base: "md", md: "lg" }}
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
                top={{ base: 2, md: 4 }}
                right={{ base: 2, md: 4 }}
                bg="blackAlpha.700"
                backdropFilter="blur(8px)"
                px={{ base: 2, md: 3 }}
                py={1}
                borderRadius="full"
                zIndex={2}
              >
                <Text
                  fontSize={{ base: "xs", md: "sm" }}
                  color="white"
                  fontWeight="medium"
                >
                  {selectedIndex + 1} / {images.length}
                </Text>
              </Box>

              {/* Indicadores de Navegación (Dots) */}
              <HStack
                position="absolute"
                bottom={{ base: 2, md: 4 }}
                left="50%"
                transform="translateX(-50%)"
                spacing={{ base: 1.5, md: 2 }}
                zIndex={2}
              >
                {images.map((_, index) => (
                  <Box
                    key={index}
                    w={
                      selectedIndex === index
                        ? { base: "20px", md: "24px" }
                        : { base: "6px", md: "8px" }
                    }
                    h={{ base: "6px", md: "8px" }}
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
          gap={{ base: 2, md: 2 }}
          w={{ base: "100%", md: "100px", lg: "100px" }}
          h={{ base: "60px", sm: "70px", md: "100%" }}
          minW={0}
          maxW="100%"
          scrollBehavior="smooth"
          overflowX={{ base: "auto", md: "hidden" }}
          overflowY={{ base: "hidden", md: "scroll" }}
        >
          {images.map((img, index) => (
            <Box
              key={img.id}
              flexShrink={0}
              w={{ base: "60px", sm: "70px", md: "90%" }}
              h={{ base: "100%", md: "80px", lg: "90px" }}
              cursor="pointer"
              borderRadius={{ base: "lg", md: "lg" }}
              borderColor={
                selectedIndex === index ? "transparent" : activeBorderColor
              }
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              onClick={() => setSelectedIndex(index)}
              position="relative"
              overflow="hidden"
              _hover={{
                borderColor: activeBorderColor,
                boxShadow: "lg",
                border: "1px solid",
              }}
            >
              <Image
                w="100%"
                h="100%"
                src={img.image}
                overflow="hidden"
                alt={`Miniatura ${index + 1}`}
                objectFit="cover"
                loading="lazy"
                opacity={selectedIndex === index ? 1 : 0.5}
                transition="opacity 0.3s ease"
                _hover={{ opacity: 1 }}
              />
            </Box>
          ))}
        </Flex>
      </Flex>
    </>
  );
});

Gallery.displayName = "Gallery";
export default Gallery;
