"use client";

import React from "react";
import { Flex, type FlexProps } from "@chakra-ui/react";
import Gallery from "@shared/components/common/Gallery";
import type { GalleryItem } from "@/shared/types/gallery";

interface GalleryWithThumbnailsProps {
  images: GalleryItem[];
  gap?: FlexProps["gap"];
  p?: FlexProps["p"];
}

/**
 * @component GalleryWithThumbnails
 * @description Composición estándar Gallery.Viewer + Gallery.Thumbnails.
 */
export const GalleryWithThumbnails: React.FC<GalleryWithThumbnailsProps> = ({
  images,
  gap = { base: "3", md: "4" },
  p = { base: "1", md: "2" },
}) => (
  <Gallery images={images}>
    <Flex direction={{ base: "column", md: "row" }} gap={gap} h="100%" w="100%" p={p} minW={0} overflow="hidden">
      <Gallery.Viewer />
      <Gallery.Thumbnails />
    </Flex>
  </Gallery>
);

export default GalleryWithThumbnails;
