import { Flex, Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { useGallery } from "@shared/hooks/ui/useGallery";
import GalleryViewer from "./gallery/GalleryViewer";
import GalleryThumbnails from "./gallery/GalleryThumbnails";
import { GalleryItem } from "@/shared/types/gallery";

interface GalleryProps {
  images: GalleryItem[];
}

/**
 * @component Gallery
 * @description Fully integrated image gallery with a seamless thumbnail strip.
 */
const Gallery: React.FC<GalleryProps> = React.memo(({ images }) => {
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

    const preloadImage = (src: string) => {
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
      if (images[idx]?.src) {
        preloadImage(images[idx].src);
      }
    });
  }, [selectedIndex, images, imageCount]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") handlePrevious();
      if (event.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown, { passive: true });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrevious, handleNext]);

  if (!images || imageCount === 0 || !currentImage) return null;

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

Gallery.displayName = "Gallery";
export default Gallery;
