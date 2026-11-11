"use client";
import React, { useLayoutEffect } from "react";
import { Flex, Image, chakra } from "@chakra-ui/react";
import { ScrollAreaRoot, ScrollAreaViewport, ScrollAreaScrollbar } from "@/shared/ui/scroll-area";
import { GalleryItem } from "@/shared/types/gallery";
import { ImageRevealSkeleton, useImageReveal } from "@shared/components/Image/ImageReveal";

interface GalleryThumbnailItemProps {
  img: GalleryItem;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}

const GalleryThumbnailItem = React.memo(
  ({ img, index, isSelected, onClick }: GalleryThumbnailItemProps) => {
    // Skeleton hasta que la miniatura carga: ya no "saltan" al llegar cada una a su ritmo.
    const { loaded, onLoad } = useImageReveal();
    return (
      <chakra.button
        type="button"
        aria-label={img.title || `Miniatura ${index + 1}`}
        aria-current={isSelected ? "true" : undefined}
        flexShrink={0}
        w={{ base: "80px", sm: "88px", md: "100%" }}
        h={{ base: "64px", sm: "70px", md: "80px", lg: "90px" }}
        minW="11"
        minH="11"
        cursor="pointer"
        borderRadius="xl"
        borderWidth="2px"
        borderStyle="solid"
        borderColor={isSelected ? "text.heading" : "border.subtle"}
        boxShadow="none"
        _focusVisible={{ outline: "2px solid", outlineColor: "ring.primary", outlineOffset: "2px" }}
        onClick={onClick}
        position="relative"
        overflow="hidden"
        className="group"
        transition="border-color 0.2s ease-out, transform 0.2s ease-out"
        _hover={{
          borderColor: isSelected ? "text.heading" : "border.strong",
        }}
      >
        <ImageRevealSkeleton loaded={loaded} borderRadius="xl" />
        <Image
          w="100%"
          h="100%"
          src={img.src}
          alt={img.title || `Miniatura ${index + 1}`}
          objectFit="cover"
          loading="lazy"
          decoding="async"
          // Las miniaturas usan la foto grande: prioridad baja para no competir con el visor.
          fetchPriority="low"
          onLoad={onLoad}
          opacity={loaded ? (isSelected ? 1 : 0.6) : 0}
          transition="transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.4s ease"
          _groupHover={{
            opacity: 1,
            transform: "scale(1.1)",
          }}
        />
      </chakra.button>
    );
  },
);

GalleryThumbnailItem.displayName = "GalleryThumbnailItem";

interface GalleryThumbnailsProps {
  images: GalleryItem[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

const GalleryThumbnails: React.FC<GalleryThumbnailsProps> = ({ images, selectedIndex, setSelectedIndex }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleThumbnailClick = React.useCallback(
    (index: number) => {
      setSelectedIndex(index);
    },
    [setSelectedIndex],
  );

  const createClickHandler = React.useCallback(
    (index: number) => () => handleThumbnailClick(index),
    [handleThumbnailClick],
  );

  useLayoutEffect(() => {
    const activeItem = containerRef.current?.children[selectedIndex] as HTMLElement | undefined;
    const viewport = activeItem?.closest<HTMLElement>("[data-radix-scroll-area-viewport]");
    if (!activeItem || !viewport) return;
    // Centra la miniatura dentro del viewport sin desplazar la página (clamp automático en scrollTo).
    const itemRect = activeItem.getBoundingClientRect();
    const viewportRect = viewport.getBoundingClientRect();
    const left = viewport.scrollLeft + (itemRect.left - viewportRect.left) - (viewport.clientWidth - itemRect.width) / 2;
    const top = viewport.scrollTop + (itemRect.top - viewportRect.top) - (viewport.clientHeight - itemRect.height) / 2;
    viewport.scrollTo({ left, top, behavior: "smooth" });
  }, [selectedIndex]);

  return (
    <ScrollAreaRoot h={{ base: "96px", md: "full" }} w="full">
      <ScrollAreaViewport h="full" w="full">
        <Flex
          ref={containerRef}
          direction={{ base: "row", md: "column" }}
          gap="4"
          p="2"
          h={{ base: "auto", md: "full" }}
          w={{ base: "max-content", md: "full" }}
          minW="full"
        >
          {images.map((img, index) => (
            <GalleryThumbnailItem
              key={img.id}
              img={img}
              index={index}
              isSelected={selectedIndex === index}
              onClick={createClickHandler(index)}
            />
          ))}
        </Flex>
      </ScrollAreaViewport>
      {/* Mobile: horizontal scrollbar */}
      <ScrollAreaScrollbar orientation="horizontal" display={{ base: "flex", md: "none" }} />
      {/* Desktop: vertical scrollbar */}
      <ScrollAreaScrollbar orientation="vertical" display={{ base: "none", md: "flex" }} />
    </ScrollAreaRoot>
  );
};

export default GalleryThumbnails;
