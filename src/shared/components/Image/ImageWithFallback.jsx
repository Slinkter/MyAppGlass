import React, { useState, useEffect } from "react";
import { Image, Box, Skeleton, useColorModeValue } from "@chakra-ui/react";

/**
 * @component ImageWithFallback
 * @description Componente base para imagen con manejo de fallback y carga
 * @param {Object} props - Props del componente
 * @param {string} props.src - URL de la imagen
 * @param {string} props.fallbackSrc - URL de fallback
 * @param {Function} props.onLoad - Callback al cargar
 * @param {Function} props.onError - Callback en error
 * @param {string} props.w - Ancho
 * @param {string} props.h - Altura
 * @param {Object} props.restProps - Otros props
 */
const imgF = "https://placehold.co/300x300?text=Imagen+no+disponible";

const ImageWithFallback = React.memo(
  ({
    src,
    fallbackSrc,
    onLoad,
    onError,
    w,
    h,
    srcSet,
    sizes,
    ...restProps
  }) => {
    const [imageSrc, setImageSrc] = useState(src);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
      if (src) {
        setImageSrc(src);
        setIsLoaded(false);
      } else {
        setImageSrc(fallbackSrc || imgF);
        // Let the fallback load naturally
        setIsLoaded(false);
      }
    }, [src, fallbackSrc]);

    const handleImageError = () => {
      if (onError) onError();
      // If we are already on fallback/placeholder, don't loop
      if (imageSrc === (fallbackSrc || imgF)) {
        setIsLoaded(true); // Force show to avoid eternal skeleton if fallback fails
        return;
      }
      setImageSrc(fallbackSrc || imgF);
      // Don't set isLoaded(true) here, wait for fallback to load
      // ensuring handleLoad fires and notifies parent
    };

    const handleLoad = (e) => {
      setIsLoaded(true);
      if (onLoad) onLoad(e);
    };

    return (
      <Box
        w={w}
        h={h}
        position="relative"
        overflow="hidden"
        rounded="md"
        bg={useColorModeValue("gray.100", "gray.700")}
      >
        <Skeleton
          isLoaded={isLoaded}
          w="100%"
          h="100%"
          startColor={useColorModeValue("gray.100", "gray.700")}
          endColor={useColorModeValue("gray.300", "gray.600")}
        >
          <Image
            onError={handleImageError}
            onLoad={handleLoad}
            src={imageSrc || undefined}
            w="100%"
            h="100%"
            objectFit="cover"
            loading="lazy"
            decoding="async"
            transition="transform 0.4s ease-in-out, opacity 0.3s ease-in-out"
            opacity={isLoaded ? 1 : 0}
            srcSet={srcSet}
            sizes={sizes}
            {...restProps}
          />
        </Skeleton>
      </Box>
    );
  },
);

ImageWithFallback.displayName = "ImageWithFallback";

export default ImageWithFallback;
