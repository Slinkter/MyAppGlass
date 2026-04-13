import { Flex, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { useGallery } from "@shared/hooks/ui/useGallery";
import GalleryViewer from "./gallery/GalleryViewer";
import GalleryThumbnails from "./gallery/GalleryThumbnails";

/**
 * @component Gallery
 * @description Fully integrated image gallery with a seamless thumbnail strip.
 */
const Gallery = React.memo(({ images }) => {
  const {
    selectedIndex,
    setSelectedIndex,
    handlePrevious,
    handleNext,
    currentImage,
    imageCount,
  } = useGallery(images);

  // Pre-load adjacent images in the background
  useEffect(() => {
    if (!images || imageCount === 0) return;

    const preloadImage = (src) => {
      if (!src) return;
      const img = new window.Image();
      img.src = src;
    };

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

  // Keyboard navigation
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
          gap={{ base: 4, md: 8 }} // Enhanced gap for separation
          h="100%"
          w="100%"
          minW={0}
        >
          {/* 1. Main Viewer */}
          <Box 
            flex="1" 
            minH="0" 
            position="relative"
            borderRadius="3xl"
            overflow="hidden"
            boxShadow="2xl"
          >
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

          {/* 2. Thumbnails (Right on desktop, bottom on mobile) */}
          <Box
            w={{ base: "100%", md: "120px", lg: "135px" }}
            h={{ base: "100px", md: "100%" }}
            order={{ base: 2, md: 1 }}
            flexShrink={0}
            minH="0"
            // Removed bg, borderRadius, and p to merge with viewer
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
