/**
 * @file ResponsiveImage.tsx
 * @description Responsive image component optimized with next/image.
 * @module shared/components
 * @remarks
 * Migrated to next/image for automatic optimization and layout stability.
 * Use isLCP prop for above-the-fold images to enable priority loading.
 */

import React, { useCallback } from "react";
import Image from "next/image";
import { Box, BoxProps } from "@chakra-ui/react";
import { getAssetUrl } from "@/shared/utils/asset-utils";

interface ResponsiveImageProps extends Omit<BoxProps, 'onLoad'> {
  src?: string;
  alt?: string;
  isLCP?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  sizes?: string;
  loading?: "eager" | "lazy";
  decoding?: "async" | "auto" | "sync";
  fetchPriority?: "auto" | "high" | "low";
  quality?: number;
}

/**
 * @component ResponsiveImage
 * @description Componente de imagen responsive optimizado con next/image
 */
const ResponsiveImage: React.FC<ResponsiveImageProps> = React.memo(
  ({
    src,
    alt = "",
    sizes = "(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw",
    isLCP = false,
    onLoad,
    objectFit = "cover",
    loading,
    decoding,
    fetchPriority,
    quality = 75,
    ...restProps
  }) => {
    const handleLoad = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        if (onLoad) onLoad(e);
      },
      [onLoad]
    );

    if (!src) return null;

    return (
      <Box position="relative" overflow="hidden" bg="bg.subtle" {...restProps}>
        <Image
          src={getAssetUrl(src || "")}
          alt={alt}
          fill
          priority={isLCP}
          sizes={sizes}
          style={{ objectFit }}
          onLoad={handleLoad}
          loading={isLCP ? undefined : (loading ?? "lazy")}
          decoding={decoding}
          fetchPriority={isLCP ? "high" : (fetchPriority ?? "auto")}
          quality={quality}
        />
      </Box>
    );
  }
);

ResponsiveImage.displayName = "ResponsiveImage";

export default ResponsiveImage;
