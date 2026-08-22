/**
 * @file Gallery.tsx
 * @description Advanced image gallery with compound component pattern for flexible UI composition.
 * @module shared/components/common
 */

"use client";

import { Box } from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useMemo } from "react";

import { useGallery, UseGalleryReturn } from "@shared/hooks/ui/useGallery";
import dynamic from "next/dynamic";

const InternalViewer = dynamic(() => import("./gallery/GalleryViewer"), {
    ssr: false, // Opcional, pero recomendado para galerías pesadas
    loading: () => <Box h="400px" bg="bg.subtle" borderRadius="3xl" />,
});

const InternalThumbnails = dynamic(
    () => import("./gallery/GalleryThumbnails"),
    {
        ssr: false,
        loading: () => <Box h="100px" bg="bg.subtle" borderRadius="xl" />,
    },
);
import { X } from "lucide-react";
import FadingImage from "@shared/components/common/FadingImage";
import { GalleryItem } from "@/shared/types/gallery";

/**
 * Shared state for the Gallery compound components.
 * @description Extends UseGalleryReturn with the provided image set.
 */
interface GalleryContextValue extends UseGalleryReturn {
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
        throw new Error(
            "Gallery compound components must be used within Gallery.Root",
        );
    }
    return context;
};

// 2. Compound Components

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
const GalleryRoot: React.FC<{
    images: GalleryItem[];
    children: React.ReactNode;
    onActiveImageChange?: (image: GalleryItem, index: number) => void;
}> = ({ images, children, onActiveImageChange }) => {
    const gallery = useGallery(images);

    const value = useMemo(
        () => ({
            ...gallery,
            images,
        }),
        [gallery, images],
    );

    // Notify parent about active image change
    useEffect(() => {
        if (gallery.currentImage && onActiveImageChange) {
            onActiveImageChange(gallery.currentImage, gallery.selectedIndex);
        }
    }, [gallery.selectedIndex, gallery.currentImage, onActiveImageChange]);

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
            (gallery.selectedIndex - 1 + gallery.imageCount) %
                gallery.imageCount,
            (gallery.selectedIndex + 1) % gallery.imageCount,
        ];

        indicesToPreload.forEach((idx) => {
            if (images[idx]?.src) {
                preloadImage(images[idx].src);
            }
        });
    }, [gallery.selectedIndex, images, gallery.imageCount]);

    const { handlePrevious, handleNext } = gallery;

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "ArrowLeft") handlePrevious();
            if (event.key === "ArrowRight") handleNext();
        };
        window.addEventListener("keydown", handleKeyDown, { passive: true });
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handlePrevious, handleNext]);

    if (!images || gallery.imageCount === 0 || !gallery.currentImage)
        return null;

    return (
        <GalleryContext.Provider value={value}>
            <Box h="100%" w="100%" minW={0} overflow="hidden">
                {children}
            </Box>
        </GalleryContext.Provider>
    );
};

/**
 * Main viewer component that displays the currently selected image.
 * @description Automatically connects to the shared Gallery state via context.
 */
const GalleryViewer: React.FC = () => {
    const {
        currentImage,
        imageCount,
        selectedIndex,
        setSelectedIndex,
        handlePrevious,
        handleNext,
        isModalOpen,
        onOpenModal,
        onCloseModal,
    } = useGalleryContext();

    return (
        <Box
            flex="1"
            minH="0"
            w="100%"
            position="relative"
            borderRadius="3xl"
            overflow="hidden"
        >
            <InternalViewer
                currentImage={currentImage!}
                imageCount={imageCount}
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                handlePrevious={handlePrevious}
                handleNext={handleNext}
                isPriority={selectedIndex === 0}
                onOpenModal={onOpenModal}
            />

            {/* Modal de Imagen Completa (Desktop & Mobile) */}
            {isModalOpen && currentImage && (
                <Box
                    position="fixed"
                    inset={0}
                    zIndex={9999}
                    bg="rgba(0, 0, 0, 0.92)"
                    backdropFilter="blur(16px)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    p={{ base: "3", md: "8" }}
                    animation="fadeIn 0.25s ease-out"
                    onClick={onCloseModal}
                >
                    {/* Botón Cerrar */}
                    <Box
                        as="button"
                        onClick={onCloseModal}
                        position="absolute"
                        top={{ base: "4", md: "6" }}
                        right={{ base: "4", md: "6" }}
                        color="white"
                        bg="whiteAlpha.200"
                        w={{ base: "40px", md: "44px" }}
                        h={{ base: "40px", md: "44px" }}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        borderRadius="full"
                        border="1px solid rgba(255, 255, 255, 0.2)"
                        _hover={{
                            bg: "whiteAlpha.400",
                            transform: "scale(1.08)",
                        }}
                        transition="all 0.2s ease"
                        aria-label="Cerrar modal"
                        zIndex={10000}
                    >
                        <X size={22} />
                    </Box>

                    {/* Contenedor de Imagen de Alta Calidad */}
                    <Box
                        w={{ base: "94vw", md: "80vw" }}
                        h={{ base: "75vh", md: "80vh" }}
                        position="relative"
                        borderRadius="2xl"
                        overflow="hidden"
                        boxShadow="0 25px 60px rgba(0, 0, 0, 0.5)"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <FadingImage
                            src={currentImage.src}
                            alt={currentImage.title || "Vista ampliada"}
                            w="100%"
                            h="100%"
                            objectFit="contain"
                            loading="eager"
                            fetchPriority="high"
                            borderRadius="2xl"
                        />
                    </Box>
                </Box>
            )}
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
            h={{ base: "74px", sm: "80px", md: "100%" }}
            order={{ base: 2, md: 1 }}
            flexShrink={0}
            minW={0}
            minH="0"
            overflow="hidden"
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
