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

interface ResponsiveImageProps extends Omit<BoxProps, 'onLoad'> {
  src?: string;
  alt?: string;
  isLCP?: boolean;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  sizes?: string;
}

/**
 * @component ResponsiveImage
 * @description Componente de imagen responsive optimizado con next/image
 */
const ResponsiveImage: React.FC<ResponsiveImageProps> = React.memo(
  ({
    src,
    alt = "",
    sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
    isLCP = false,
    onLoad,
    objectFit = "cover",
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
      <Box position="relative" overflow="hidden" {...restProps}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={isLCP}
          sizes={sizes}
          style={{ objectFit }}
          onLoad={handleLoad}
        />
      </Box>
    );
  }
);

ResponsiveImage.displayName = "ResponsiveImage";

export default ResponsiveImage;
