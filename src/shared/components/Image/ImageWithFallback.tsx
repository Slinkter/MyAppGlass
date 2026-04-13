"use client";

import React, { useState, useMemo, useCallback, useRef } from "react";
import { Image, Box, BoxProps } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { keyframes } from "@emotion/react";

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

export interface ImageWithFallbackProps extends BoxProps {
  src: string;
  fallbackSrc?: string;
  onLoad?: (_e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onError?: () => void;
  srcSet?: string;
  sizes?: string;
  forceShow?: boolean;
  alt?: string;
  loading?: "lazy" | "eager";
  decoding?: "async" | "sync" | "auto";
  objectFit?: any; // Fix for v3 compatibility often requires explicit any or specific union
}

const ImageWithFallback = React.memo(
  (props: ImageWithFallbackProps) => {
    const {
      src,
      alt,
      fallbackSrc,
      onLoad,
      onError,
      w,
      h,
      srcSet,
      sizes,
      forceShow,
      ...restProps
    } = props;
    const [isLoaded, setIsLoaded] = useState(forceShow || false);
    const [isLoading, setIsLoading] = useState(!forceShow);
    const imageRef = useRef<HTMLImageElement>(null);

    const imageSrc = useMemo(() => {
      return src || fallbackSrc || imgF;
    }, [src, fallbackSrc]);

    const placeholderBg = useColorModeValue("gray.100", "gray.800");
    const shimmerBg = useColorModeValue(
      "linear-gradient(90deg, rgba(200,200,200,0) 0%, rgba(200,200,200,0.3) 50%, rgba(200,200,200,0) 100%)",
      "linear-gradient(90deg, rgba(100,100,100,0) 0%, rgba(100,100,100,0.3) 50%, rgba(100,100,100,0) 100%)"
    );

    const handleImageError = useCallback(() => {
      if (onError) onError();
      if (imageSrc !== (fallbackSrc || imgF)) {
        setIsLoaded(true);
        setIsLoading(false);
      }
    }, [imageSrc, fallbackSrc, onError]);

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
        borderRadius="md"
        bg={placeholderBg}
      >
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

        <Image
          ref={imageRef}
          onError={handleImageError}
          onLoad={handleLoad}
          src={imageSrc || undefined}
          alt={alt || ""}
          w="100%"
          h="100%"
          objectFit="cover"
          loading="lazy"
          decoding="async"
          opacity={isLoaded ? 1 : 0}
          transform={isLoaded ? "scale(1)" : "scale(1.02)"}
          transition="opacity 0.4s ease, transform 0.4s ease"
          filter={isLoaded ? "blur(0)" : "blur(8px)"}
          srcSet={srcSet}
          sizes={sizes}
          {...restProps}
        />
      </Box>
    );
  },
);

ImageWithFallback.displayName = "ImageWithFallback";

export default ImageWithFallback;
