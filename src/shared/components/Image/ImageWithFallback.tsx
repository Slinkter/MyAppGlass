import { useColorModeValue } from "@/components/ui/color-mode-hooks";
/**
 * @file ImageWithFallback.tsx
 * @description Enhanced image component with next/image, skeleton loaders, and fallback handling.
 * @module shared/components
 * @remarks
 * Uses next/image for better performance even in static export mode.
 * Supports blur-up technique and pulse skeleton for better UX.
 */

import React, { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import { Box, BoxProps } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { getAssetUrl } from "@/shared/utils/asset-utils";

const pulse = keyframes`
  0% { opacity: 0.6; }
  50% { opacity: 0.8; }
  100% { opacity: 0.6; }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const imgF = "https://placehold.co/600x600?text=Imagen+no+disponible";

interface ImageWithFallbackProps extends BoxProps {
  src?: string;
  alt?: string;
  fallbackSrc?: string;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onError?: () => void;
  srcSet?: string;
  forceShow?: boolean;
  showOverlay?: boolean;
  priority?: boolean;
  sizes?: string;
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

/**
 * @component ImageWithFallback
 * @description Componente base para imagen con manejo de fallback y carga optimizada
 */
const ImageWithFallback: React.FC<ImageWithFallbackProps> = React.memo(
  ({
    src,
    alt = "",
    fallbackSrc,
    onLoad,
    onError,
    w,
    h,
    sizes = "100vw",
    forceShow,
    showOverlay: _showOverlay,
    priority = false,
    objectFit = "cover",
    srcSet,
    ...restProps
  }) => {
    const [isLoaded, setIsLoaded] = useState(forceShow || false);
    const [isLoading, setIsLoading] = useState(!forceShow);
    const [hasError, setHasError] = useState(false);

    const imageSrc = useMemo(() => {
      if (hasError) return fallbackSrc || imgF;
      return getAssetUrl(src || fallbackSrc || imgF);
    }, [src, fallbackSrc, hasError]);

    const placeholderBg = useColorModeValue("gray.100", "gray.800");
    const shimmerBg = useColorModeValue(
      "linear-gradient(90deg, rgba(200,200,200,0) 0%, rgba(200,200,200,0.3) 50%, rgba(200,200,200,0) 100%)",
      "linear-gradient(90deg, rgba(100,100,100,0) 0%, rgba(100,100,100,0.3) 50%, rgba(100,100,100,0) 100%)"
    );

    const handleImageError = useCallback(() => {
      setHasError(true);
      setIsLoading(false);
      setIsLoaded(true);
      if (onError) onError();
    }, [onError]);

    const handleLoad = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setIsLoaded(true);
        setIsLoading(false);
        if (onLoad) onLoad(e);
      },
      [onLoad]
    );

    return (
      <Box
        w={w}
        h={h}
        position="relative"
        overflow="hidden"
        bg={placeholderBg}
        {...restProps}
      >
        {/* Pulse Skeleton - shown while loading */}
        {isLoading && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg={placeholderBg}
            animation={`${pulse} 1.5s ease-in-out infinite`}
            zIndex={1}
          >
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              background={shimmerBg}
              backgroundSize="200% 100%"
              animation={`${shimmer} 1.5s linear infinite`}
            />
          </Box>
        )}

        {/* Optimized Image using next/image */}
        <Image
          src={imageSrc}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          {...(srcSet ? { srcSet } : {})}
          onLoad={handleLoad}
          onError={handleImageError}
          style={{
            objectFit,
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? "scale(1)" : "scale(1.02)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            filter: isLoaded ? "none" : "blur(10px)",
          }}
        />
      </Box>
    );
  },
);

ImageWithFallback.displayName = "ImageWithFallback";

export default ImageWithFallback;
