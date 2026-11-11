"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import { Building2 } from "lucide-react";
import ResponsiveImage from "@shared/components/Image/ResponsiveImage";
import { ImageRevealSkeleton } from "@shared/components/Image/ImageReveal";
import { useImageReveal } from "@shared/components/Image/useImageReveal";

export interface CoverProps {
  src?: string;
  alt: string;
}

/** Portada con skeleton y revelado. Ocupa todo el padre (`position: relative`, `overflow: hidden`). */
export const Cover: React.FC<CoverProps> = ({ src, alt }) => {
  const { loaded, onLoad, reveal } = useImageReveal();

  if (!src) {
    return (
      <Box position="absolute" inset={0} bg="bg.subtle" display="flex" alignItems="center" justifyContent="center" color="text.muted">
        <Building2 size={20} aria-hidden="true" style={{ flexShrink: 0 }} />
      </Box>
    );
  }

  return (
    <>
      <ImageRevealSkeleton loaded={loaded} />
      <Box position="absolute" inset={0} {...reveal}>
        <ResponsiveImage src={src} alt={alt} sizes="48px" w="full" h="full" objectFit="cover" loading="lazy" onLoad={onLoad} />
      </Box>
    </>
  );
};

export default Cover;
