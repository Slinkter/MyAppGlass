"use client";
import React, { useLayoutEffect } from "react";
import { Box, Flex, Image } from "@chakra-ui/react";
import { ScrollAreaRoot, ScrollAreaViewport, ScrollAreaScrollbar } from "@/components/ui/scroll-area";
import { GalleryItem } from "@/shared/types/gallery";

interface GalleryThumbnailItemProps {
  img: GalleryItem;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}

const GalleryThumbnailItem = React.memo(
  ({ img, index, isSelected, onClick }: GalleryThumbnailItemProps) => {
    return (
      <Box
        flexShrink={0}
        w={{ base: "60px", sm: "70px", md: "100%" }}
        h={{ base: "100%", md: "80px", lg: "90px" }}
        cursor="pointer"
        borderRadius="lg"
        borderWidth="2px"
        borderStyle="solid"
        borderColor={isSelected ? "text.accent" : "transparent"}
        boxShadow={isSelected ? "md" : "none"}
        onClick={onClick}
        position="relative"
        overflow="hidden"
        role="group"
        transition="all 0.2s ease-out"
        _hover={{
          borderColor: isSelected ? "text.accent" : "border.strong",
        }}
      >
        <Image
          w="100%"
          h="100%"
          src={img.src}
          alt={img.title || `Miniatura ${index + 1}`}
          objectFit="cover"
          loading="lazy"
          decoding="async"
          opacity={isSelected ? 1 : 0.6}
          transition="transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.2s ease"
          _groupHover={{
            opacity: 1,
            transform: "scale(1.1)",
          }}
        />
      </Box>
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
    if (activeItem) {
      activeItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedIndex]);

  return (
    <ScrollAreaRoot h="full" w="full">
      <ScrollAreaViewport>
        <Flex
          ref={containerRef}
          direction={{ base: "row", md: "column" }}
          gap={3}
          p={1}
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
      <ScrollAreaScrollbar orientation={{ base: "horizontal", md: "vertical" }} />
    </ScrollAreaRoot>
  );
};

export default GalleryThumbnails;
