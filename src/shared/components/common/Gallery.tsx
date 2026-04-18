"use client";

import { Box } from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useMemo } from "react";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { useGallery, UseGalleryReturn } from "@shared/hooks/ui/useGallery";
import InternalViewer from "./gallery/GalleryViewer";
import InternalThumbnails from "./gallery/GalleryThumbnails";
import { GalleryItem } from "@/shared/types/gallery";

// 1. Context definition
interface GalleryContextValue extends Omit<UseGalleryReturn, 'isModalOpen' | 'onOpenModal' | 'onCloseModal' | 'isHovered' | 'setIsHovered'> {
  images: GalleryItem[];
}

const GalleryContext = createContext<GalleryContextValue | null>(null);

const useGalleryContext = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error("Gallery compound components must be used within Gallery.Root");
  }
  return context;
};

// 2. Compound Components
const GalleryRoot: React.FC<{ images: GalleryItem[]; children: React.ReactNode }> = ({ images, children }) => {
  const gallery = useGallery(images);
  
  const value = useMemo(() => ({
    ...gallery,
    images,
  }), [gallery, images]);

  // Pre-load adjacent images in the background
  useEffect(() => {
    if (!images || gallery.imageCount === 0) return;

    const preloadImage = (src: string) => {
      if (!src) return;
      const img = new window.Image();
      img.src = src;
    };

    const indicesToPreload = [
      gallery.selectedIndex,
      (gallery.selectedIndex - 1 + gallery.imageCount) % gallery.imageCount,
      (gallery.selectedIndex + 1) % gallery.imageCount,
    ];

    indicesToPreload.forEach((idx) => {
      if (images[idx]?.src) {
        preloadImage(images[idx].src);
      }
    });
  }, [gallery.selectedIndex, images, gallery.imageCount]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") gallery.handlePrevious();
      if (event.key === "ArrowRight") gallery.handleNext();
    };
    window.addEventListener("keydown", handleKeyDown, { passive: true });
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gallery]);

  if (!images || gallery.imageCount === 0 || !gallery.currentImage) return null;

  return (
    <GalleryContext.Provider value={value}>
      <LazyMotion features={domAnimation}>
        <Box
          as={m.div}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          h="100%"
          w="100%"
        >
          {children}
        </Box>
      </LazyMotion>
    </GalleryContext.Provider>
  );
};

const GalleryViewer: React.FC = () => {
  const { currentImage, imageCount, selectedIndex, setSelectedIndex, handlePrevious, handleNext } = useGalleryContext();
  
  return (
    <Box 
      flex="1" 
      minH="0" 
      position="relative"
      borderRadius="3xl"
      overflow="hidden"
      boxShadow="2xl"
    >
      <InternalViewer
        currentImage={currentImage!}
        imageCount={imageCount}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
        handlePrevious={handlePrevious}
        handleNext={handleNext}
        isPriority={selectedIndex === 0}
      />
    </Box>
  );
};

const GalleryThumbnails: React.FC = () => {
  const { images, selectedIndex, setSelectedIndex } = useGalleryContext();
  
  return (
    <Box
      w={{ base: "100%", md: "120px", lg: "135px" }}
      h={{ base: "100px", md: "100%" }}
      order={{ base: 2, md: 1 }}
      flexShrink={0}
      minH="0"
    >
      <InternalThumbnails
        images={images}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </Box>
  );
};

/**
 * @component Gallery
 * @description Fully integrated image gallery refactored with Compound Components pattern.
 */
export const Gallery = Object.assign(GalleryRoot, {
  Root: GalleryRoot,
  Viewer: GalleryViewer,
  Thumbnails: GalleryThumbnails,
});

export default Gallery;
