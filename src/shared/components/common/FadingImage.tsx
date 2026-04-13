"use client";

import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import ImageWithFallback from "@shared/components/Image/ImageWithFallback";

export interface FadingImageProps extends BoxProps {
  src: string;
  placeholderImageUrl?: string;
  onImageError?: () => void;
  onLoad?: () => void;
  srcSet?: string;
  sizes?: string;
  forceShow?: boolean;
  alt?: string;
  objectFit?: any;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  showOverlay?: boolean;
}

const FadingImage = React.memo((props: FadingImageProps) => {
  const {
    src,
    placeholderImageUrl,
    onImageError,
    w,
    h,
    onLoad,
    srcSet,
    sizes,
    forceShow,
    alt,
    ...restProps
  } = props;

  return (
    <Box
      w={w}
      h={h}
      position="relative"
      overflow="hidden"
      borderRadius="md"
      role="group"
      {...restProps}
    >
      <ImageWithFallback
        src={src}
        fallbackSrc={placeholderImageUrl}
        onLoad={onLoad}
        onError={onImageError}
        w="100%"
        h="100%"
        srcSet={srcSet}
        sizes={sizes}
        forceShow={forceShow}
        alt={alt}
      />
    </Box>
  );
});

FadingImage.displayName = "FadingImage";

export default FadingImage;
