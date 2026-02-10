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
    forceShow,
    ...restProps
  }) => {
    const [imageSrc, setImageSrc] = useState(src);
    const [isLoaded, setIsLoaded] = useState(forceShow || false); // Skip loading if forced
    const imageRef = React.useRef(null);

    useEffect(() => {
      if (src) {
        setImageSrc(src);
        // Check if already loaded (cached) by browser
        if (imageRef.current && imageRef.current.complete) {
          setIsLoaded(true);
          // We do NOT call onLoad here to avoid loops or setting state during render phase issues,
          // but we ensure the skeleton is hidden.
          if (onLoad) onLoad();
        } else {
          setIsLoaded(false);
        }
      } else {
        setImageSrc(fallbackSrc || imgF);
        setIsLoaded(false);
      }
    }, [src, fallbackSrc, onLoad]);

    const handleImageError = () => {
      if (onError) onError();
      if (imageSrc === (fallbackSrc || imgF)) {
        setIsLoaded(true);
        return;
      }
      setImageSrc(fallbackSrc || imgF);
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
            ref={imageRef}
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
