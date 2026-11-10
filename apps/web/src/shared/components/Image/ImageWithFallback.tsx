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
    const [hasError, setHasError] = useState(false);
    const [prevSrc, setPrevSrc] = useState(src);
    const [prevForceShow, setPrevForceShow] = useState(forceShow);
    const imgRef = React.useRef<HTMLImageElement | null>(null);

    const isLoading = !isLoaded;

    if (src !== prevSrc || forceShow !== prevForceShow) {
      setPrevSrc(src);
      setPrevForceShow(forceShow);
      setIsLoaded(forceShow || false);
      setHasError(false);
    }

    const imageSrc = useMemo(() => {
      if (hasError) return fallbackSrc || imgF;
      return getAssetUrl(src || fallbackSrc || imgF);
    }, [src, fallbackSrc, hasError]);

    const placeholderBg = { base: "gray.100", _dark: "gray.800" };
    const shimmerBg = { base: "bg.subtle", _dark: "bg.subtle" };

    const handleImageError = useCallback(() => {
      setHasError(true);
      setIsLoaded(true);
      if (onError) onError();
    }, [onError]);

    const handleLoad = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setIsLoaded(true);
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
        bg={isLoading ? placeholderBg : "transparent"}
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
          ref={(node) => {
            imgRef.current = node;
            if (node && node.complete && !isLoaded) {
              setIsLoaded(true);
            }
          }}
          style={{
            objectFit,
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? "scale(1)" : "scale(1.02)",
            transition: "opacity 0.3s ease-out, transform 0.3s ease-out",
            filter: isLoaded ? "none" : "blur(5px)",
          }}
        />
      </Box>
    );
  },
);

ImageWithFallback.displayName = "ImageWithFallback";

export default ImageWithFallback;
