import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useGallery } from "@shared/hooks/ui/useGallery";
import GalleryViewer from "./gallery/GalleryViewer";
import GalleryThumbnails from "./gallery/GalleryThumbnails";

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
  const {
    selectedIndex,
    setSelectedIndex,
    isHovered,
    setIsHovered,
    handlePrevious,
    handleNext,
    currentImage,
    imageCount,
  } = useGallery(images);

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        handlePrevious();
      } else if (event.key === "ArrowRight") {
        handleNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handlePrevious, handleNext]); // Depend on memoized handlers

  if (!images || imageCount === 0) {
    return null;
  }

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      gap={{ base: 2, md: 3, lg: 4 }}
      h="100%"
      w="100%"
      minW={0}
      maxW="100%"
    >
      {/* 1. Visor Principal con Controles */}
      <GalleryViewer
        currentImage={currentImage}
        imageCount={imageCount}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        isHovered={isHovered}
        setIsHovered={setIsHovered}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
      />

      {/* 2. Carrusel de Miniaturas */}
      <GalleryThumbnails
        images={images}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </Flex>
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
