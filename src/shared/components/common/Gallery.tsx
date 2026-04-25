/**
 * @file Gallery.tsx
 * @description Advanced image gallery with compound component pattern for flexible UI composition.
 * @module shared/components/common
 */

"use client";

import { Box } from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useMemo } from "react";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { useGallery, UseGalleryReturn } from "@shared/hooks/ui/useGallery";
import dynamic from "next/dynamic";

const InternalViewer = dynamic(() => import("./gallery/GalleryViewer"), {
  ssr: false, // Opcional, pero recomendado para galerías pesadas
  loading: () => <Box h="400px" bg="bg.panel" borderRadius="3xl" />
});

const InternalThumbnails = dynamic(() => import("./gallery/GalleryThumbnails"), {
  ssr: false,
  loading: () => <Box h="100px" bg="bg.panel" borderRadius="xl" />
});
import { GalleryItem } from "@/shared/types/gallery";

/**
 * Shared state for the Gallery compound components.
 * @description Extends UseGalleryReturn with the provided image set.
 */
interface GalleryContextValue extends Omit<UseGalleryReturn, 'isModalOpen' | 'onOpenModal' | 'onCloseModal' | 'isHovered' | 'setIsHovered'> {
  /** The full array of gallery items being displayed */
  images: GalleryItem[];
}

const GalleryContext = createContext<GalleryContextValue | null>(null);

/**
 * Internal hook to consume the gallery context.
 * @throws Error if used outside of Gallery.Root
 * @returns The shared gallery state and handlers
 */
const useGalleryContext = () => {
  const context = useContext(GalleryContext);
  if (!context) {
    throw new Error("Gallery compound components must be used within Gallery.Root");
  }
  return context;
};

// 2. Compound Components

const MotionBox = m.create(Box);

/**
 * Root component of the Gallery that provides state and context.
 * @description Initializes the gallery logic and sets up background pre-loading and keyboard navigation.
 * @param props.images - Array of items to be displayed in the gallery
 * @param props.children - Child components (usually Gallery.Viewer and Gallery.Thumbnails)
 * @remarks
 * - Implements background pre-loading of the current and adjacent images for zero-latency transitions.
 * - Manages keyboard listeners for ArrowLeft/ArrowRight navigation.
 * - Uses `GalleryContext.Provider` to share state with sub-components without prop drilling.
 */
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
        <MotionBox
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          h="100%"
          w="100%"
        >
          {children}
        </MotionBox>
      </LazyMotion>
    </GalleryContext.Provider>
  );
};

/**
 * Main viewer component that displays the currently selected image.
 * @description Automatically connects to the shared Gallery state via context.
 */
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

/**
 * Thumbnail list component for selecting images within the gallery.
 * @description Automatically connects to the shared Gallery state via context.
 */
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
 * Gallery Component using the Compound Component pattern.
 * @description Provides a modular way to compose galleries with synchronized state.
 * @remarks
 * Use `Gallery.Root` to initialize the context, and `Gallery.Viewer`/`Gallery.Thumbnails` to build the UI.
 * This pattern avoids prop drilling and allows for flexible reordering of UI elements.
 * @example
 * ```tsx
 * <Gallery.Root images={myImages}>
 *   <Gallery.Thumbnails />
 *   <Gallery.Viewer />
 * </Gallery.Root>
 * ```
 */
export const Gallery = Object.assign(GalleryRoot, {
  /** Root container that initializes the gallery context */
  Root: GalleryRoot,
  /** Main image viewer with navigation controls */
  Viewer: GalleryViewer,
  /** Carousel of thumbnails for quick selection */
  Thumbnails: GalleryThumbnails,
});

export default Gallery;
