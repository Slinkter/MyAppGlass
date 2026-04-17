import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";
// @ts-expect-error - ImageWithFallback path
import ImageWithFallback from "@shared/components/Image/ImageWithFallback";

interface FadingImageProps extends BoxProps {
  src: string;
  placeholderImageUrl?: string;
  onImageError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  onLoad?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  srcSet?: string;
  sizes?: string;
  forceShow?: boolean;
}

/**
 * @component FadingImage
 * @description Componente compuesto que combina ImageWithFallback e ImageOverlay
 * Muestra una imagen con efecto de carga y overlay interactivo opcional
 */
const FadingImage: React.FC<FadingImageProps> = React.memo((props) => {
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
    ...restProps
  } = props;

  return (
    <Box
      w={w}
      h={h}
      position="relative"
      overflow="hidden"
      rounded="md"
      role="group"
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
        {...restProps}
      />
    </Box>
  );
});

FadingImage.displayName = "FadingImage";

export default FadingImage;
