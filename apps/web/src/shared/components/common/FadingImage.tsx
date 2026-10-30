"use client";

import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import ImageWithFallback from "@shared/components/Image/ImageWithFallback";
interface FadingImageProps extends Omit<BoxProps, 'onLoad' | 'onError'> {
  src: string;
  alt?: string;
  placeholderImageUrl?: string;
  onImageError?: () => void;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  srcSet?: string;
  sizes?: string;
  forceShow?: boolean;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  objectFit?: "cover" | "contain" | "fill" | "none" | "scale-down";
}

/**
 * @component FadingImage
 * @description Componente compuesto que combina ImageWithFallback e ImageOverlay
 * Muestra una imagen con efecto de carga y overlay interactivo opcional
 */
const FadingImage: React.FC<FadingImageProps> = React.memo((props) => {
  const {
    src,
    alt,
    placeholderImageUrl,
    onImageError,
    w,
    h,
    aspectRatio,
    onLoad,
    srcSet,
    sizes,
    forceShow,
    ...restProps
  } = props;

  return (
    <Box
      w={w}
      h={h}
      aspectRatio={aspectRatio}
      position="relative"
      overflow="hidden"
      rounded="md"
      role="group"
    >
      <ImageWithFallback
        src={src}
        alt={alt}
        fallbackSrc={placeholderImageUrl}
        onLoad={onLoad}
        onError={onImageError}
        w="100%"
        h="100%"
        srcSet={srcSet}
        sizes={sizes}
        forceShow={forceShow}
        {...restProps}
      />
    </Box>
  );
});

FadingImage.displayName = "FadingImage";

export default FadingImage;
