/**
 * @file Gallery.jsx
 * @description Premium product gallery component featuring navigation, thumbnails, and keyboard support.
 * @module shared/components
 */

import { Flex, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useGallery } from "@shared/hooks/ui/useGallery";
import GalleryViewer from "./gallery/GalleryViewer";
import GalleryThumbnails from "./gallery/GalleryThumbnails";
import { useIsMobile } from "@shared/hooks/ui/useIsMobile";

/**
 * @typedef {Object} GalleryImage
 * @property {string|number} id - Identificador único de la imagen.
 * @property {string} image - URL o path de la imagen.
 * @property {string} [name] - Nombre opcional de la imagen.
 */

/**
 * @component Gallery
 * @description Galería de producto premium de alta calidad.
 * Diseño inspirado en configuradores de lujo (Apple, Tesla) con navegación, contador, dots y transiciones suaves.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {GalleryImage[]} props.images - Array de objetos de imagen a mostrar.
 * @returns {JSX.Element|null} El componente de galería o null si no hay imágenes.
 *
 * @example
 * // Ejemplo de uso en un componente padre:
 * <Gallery
 *   images={[
 *     { id: 1, image: "/path/to/image1.jpg", name: "Image One" },
 *     { id: 2, image: "/path/to/image2.jpg", name: "Image Two" },
 *   ]}
 * />
 */
const Gallery = React.memo(({ images }) => {
  const isMobile = useIsMobile();
  const {
    selectedIndex,
    setSelectedIndex,
    handlePrevious,
    handleNext,
    currentImage,
    imageCount,
  } = useGallery(images);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") handlePrevious(event);
      if (event.key === "ArrowRight") handleNext(event);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevious, handleNext]);

  if (!images || imageCount === 0) return null;

  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      h="100%"
      w="100%"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={{ base: 4, md: 4, lg: 5 }}
        h="100%"
        w="100%"
        minW={0}
      >
        {/* 1. Visor Principal */}
        <Box flex="1" minW={0} position="relative" h="100%">
          <GalleryViewer
            currentImage={currentImage}
            imageCount={imageCount}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
          />
        </Box>

        {/* 2. Miniaturas */}
        <Box
          w={{ base: "100%", md: "110px" }}
          h={{ base: "80px", md: "100%" }}
          order={{ base: 2, md: isMobile ? 2 : 1 }}
        >
          <GalleryThumbnails
            images={images}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        </Box>
      </Flex>
    </Box>
  );
});

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      image: PropTypes.string.isRequired,
      name: PropTypes.string,
    }),
  ),
};

Gallery.displayName = "Gallery";
export default Gallery;
