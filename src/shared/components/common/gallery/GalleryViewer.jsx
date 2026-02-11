import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  IconButton,
  Text,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import FadingImage from "../FadingImage";

/**
 * @component GalleryViewer
 * @description Visor principal de la galería de imágenes.
 * Muestra la imagen seleccionada en grande con controles de navegación (flechas, dots, contador).
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.currentImage - Objeto de la imagen actual a mostrar.
 * @param {number} props.imageCount - Total de imágenes en la galería.
 * @param {number} props.selectedIndex - Índice actual.
 * @param {function} props.setSelectedIndex - Función para cambiar el índice manualmente (dots).
 * @param {function} props.handlePrevious - Función para ir a la imagen anterior.
 * @param {function} props.handleNext - Función para ir a la imagen siguiente.
 * @returns {JSX.Element} Visor de imagen principal.
 */
const GalleryViewer = ({
  currentImage,
  imageCount,
  selectedIndex,
  setSelectedIndex,
  handlePrevious,
  handleNext,
}) => {
  const dotActiveColor = useColorModeValue("primary.500", "primary.300");
  const bgOverlay = useColorModeValue("blackAlpha.50", "blackAlpha.200");

  return (
    <Box
      flex="1"
      h="100%"
      w="100%"
      position="relative"
      borderRadius="2xl"
      overflow="hidden"
      bg={bgOverlay}
      role="group"
    >
      {/* Contenedor Animado para Imágenes */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImage.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{ width: "100%", height: "100%" }}
        >
          <FadingImage
            src={currentImage.image}
            alt={currentImage.name || "Vista principal"}
            w="100%"
            h="100%"
            objectFit="cover"
            showOverlay={false}
            loading="eager"
            fetchpriority="high"
            rounded="none"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradiente sutil inferior para mejorar legibilidad de controles */}
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        h="40%"
        bgGradient="linear(to-t, blackAlpha.600, transparent)"
        pointerEvents="none"
        opacity={0}
        _groupHover={{ opacity: 1 }}
        transition="opacity 0.3s ease"
      />

      {/* Controles de Navegación */}
      {imageCount > 1 && (
        <>
          <IconButton
            icon={<ChevronLeftIcon boxSize={8} />}
            position="absolute"
            left={4}
            top="50%"
            transform="translateY(-50%)"
            onClick={handlePrevious}
            variant="ghost"
            color="white"
            _hover={{
              bg: "whiteAlpha.300",
              transform: "translateY(-50%) scale(1.1)",
            }}
            display={{ base: "none", md: "flex" }}
            aria-label="Anterior"
            zIndex={10}
          />
          <IconButton
            icon={<ChevronRightIcon boxSize={8} />}
            position="absolute"
            right={4}
            top="50%"
            transform="translateY(-50%)"
            onClick={handleNext}
            variant="ghost"
            color="white"
            _hover={{
              bg: "whiteAlpha.300",
              transform: "translateY(-50%) scale(1.1)",
            }}
            display={{ base: "none", md: "flex" }}
            aria-label="Siguiente"
            zIndex={10}
          />

          {/* Contador Flotante */}
          <Box
            position="absolute"
            top={4}
            right={4}
            bg="blackAlpha.700"
            backdropFilter="blur(10px)"
            px={4}
            py={1.5}
            borderRadius="full"
            border="1px solid"
            borderColor="whiteAlpha.300"
          >
            <Text
              fontSize="xs"
              color="white"
              fontWeight="bold"
              letterSpacing="widest"
            >
              {selectedIndex + 1}{" "}
              <Text as="span" opacity={0.5}>
                /
              </Text>{" "}
              {imageCount}
            </Text>
          </Box>

          {/* Dots Premium */}
          <HStack
            position="absolute"
            bottom={6}
            left="50%"
            transform="translateX(-50%)"
            spacing={2.5}
            zIndex={5}
          >
            {Array.from({ length: imageCount }).map((_, index) => (
              <Box
                key={index}
                w={selectedIndex === index ? "32px" : "8px"}
                h="6px"
                bg={selectedIndex === index ? dotActiveColor : "whiteAlpha.400"}
                borderRadius="full"
                cursor="pointer"
                onClick={() => setSelectedIndex(index)}
                transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{ bg: "whiteAlpha.800" }}
              />
            ))}
          </HStack>
        </>
      )}
    </Box>
  );
};

GalleryViewer.propTypes = {
  currentImage: PropTypes.object.isRequired,
  imageCount: PropTypes.number.isRequired,
  selectedIndex: PropTypes.number.isRequired,
  setSelectedIndex: PropTypes.func.isRequired,
  handlePrevious: PropTypes.func.isRequired,
  handleNext: PropTypes.func.isRequired,
};

export default GalleryViewer;
