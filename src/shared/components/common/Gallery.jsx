import { Flex, Box, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { useGallery } from "@shared/hooks/ui/useGallery";
import GalleryViewer from "./gallery/GalleryViewer";
import GalleryThumbnails from "./gallery/GalleryThumbnails";

/**
 * @component Gallery
 * @description Galeria de imagenes con pre-carga y skeleton de carga
 */
const Gallery = React.memo(({ images }) => {
  const bgColor = useColorModeValue("blackAlpha.50", "whiteAlpha.50");
  const {
    selectedIndex,
    setSelectedIndex,
    handlePrevious,
    handleNext,
    currentImage,
    imageCount,
  } = useGallery(images);

  const preloadRef = useRef(null);

  // Pre-cargar imágenes adyacentes en segundo plano
  useEffect(() => {
    if (!images || imageCount === 0) return;

    const preloadImage = (src) => {
      if (!src) return;
      const img = new window.Image();
      img.src = src;
    };

    // Pre-cargar imagen actual, anterior y siguiente
    const indicesToPreload = [
      selectedIndex,
      (selectedIndex - 1 + imageCount) % imageCount,
      (selectedIndex + 1) % imageCount,
    ];

    indicesToPreload.forEach((idx) => {
      if (images[idx]?.image) {
        preloadImage(images[idx].image);
      }
    });
  }, [selectedIndex, images, imageCount]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") handlePrevious(event);
      if (event.key === "ArrowRight") handleNext(event);
    };
    window.addEventListener("keydown", handleKeyDown, { passive: true });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevious, handleNext]);

  if (!images || imageCount === 0) return null;

  return (
    <LazyMotion features={domAnimation}>
    <Box
      as={m.div}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      h="100%"
      w="100%"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={{ base: 2, md: 3, lg: 3 }}
        h="100%"
        w="100%"
        minW={0}
      >
        {/* 1. Visor Principal */}
        <Box flex="1" minH="0" position="relative">
          <GalleryViewer
            currentImage={currentImage}
            imageCount={imageCount}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            handlePrevious={handlePrevious}
            handleNext={handleNext}
            isPriority={selectedIndex === 0}
          />
        </Box>

        {/* 2. Miniaturas (Derecha en desktop, abajo en mobile) */}
        <Box
          w={{ base: "100%", md: "120px", lg: "135px" }}
          h={{ base: "100px", md: "100%" }}
          order={{ base: 2, md: 1 }}
          flexShrink={0}
          minH="0"
          bg={bgColor}
          borderRadius="2xl"
          p={1}
        >
          <GalleryThumbnails
            images={images}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
          />
        </Box>
      </Flex>
    </Box>
    </LazyMotion>
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
