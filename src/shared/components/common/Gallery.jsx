import { Flex, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useGallery } from "@shared/hooks/ui/useGallery";
import GalleryViewer from "./gallery/GalleryViewer";
import GalleryThumbnails from "./gallery/GalleryThumbnails";
import { useIsMobile } from "@shared/hooks/ui/useIsMobile";

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

        {/* 2. Miniaturas */}
        <Box
          w={{ base: "100%", md: "110px" }}
          h={{ base: "80px", md: "100%" }}
          order={{ base: 2, md: isMobile ? 2 : 1 }}
          flexShrink={0}
          minH="0"
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
