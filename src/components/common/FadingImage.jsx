import React, { useState, useEffect } from "react";
import { Skeleton, Image, Box } from "@chakra-ui/react"; // Re-import Skeleton

/**
 * @component FadingImage
 * @description Muestra una imagen con efecto de fade-in usando Skeleton de Chakra UI.
 * @param {Object} props - Props estándar de imagen, incluyendo `w` y `h` para el tamaño.
 * @param {string} [props.placeholderImageUrl] - URL de la imagen de marcador de posición a mostrar en caso de error.
 * @param {() => void} [props.onImageError] - Callback function to execute when the image fails to load.
 * @returns {JSX.Element}
 */
const FadingImage = React.memo((props) => {
    const { src, placeholderImageUrl, onImageError, w, h, ...restProps } = props;

    const [hasError, setHasError] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false); // Tracks if the actual image has loaded

    useEffect(() => {
        setHasError(false);
        setIsImageLoaded(false);
        // Image loading is now immediate, so src is always set
    }, [src]); // Depend only on src

    const handleImageError = () => {
        setHasError(true);
        if (onImageError) {
            onImageError();
        }
    };

    const handleImageLoad = () => {
        setIsImageLoaded(true); // Image loaded successfully
    };

    // Determine the final src for the Image tag
    const finalSrc = hasError ? (placeholderImageUrl || "https://via.placeholder.com/150?text=Image+Not+Found") : src; // Use original src

    return (
        <Box w={w} h={h} position="relative" overflow="hidden" rounded="md">
            {/* Skeleton is shown if the image is not yet loaded */}
            {!isImageLoaded && (
                <Skeleton
                    w="100%"
                    h="100%"
                    position="absolute"
                    top="0"
                    left="0"
                    startColor="gray.100"
                    endColor="gray.300"
                    fadeDuration={1}
                />
            )}
            {/* Image is always rendered, and src is set immediately */}
            <Image
                onLoad={handleImageLoad}
                onError={handleImageError}
                src={finalSrc || undefined} // Pass undefined if no src to prevent broken image icon
                opacity={isImageLoaded ? 1 : 0} // Fade in effect only when actually loaded
                transition="opacity 0.5s ease-in-out"
                w="100%"
                h="100%"
                loading="lazy" // Keep lazy loading for browser optimization
                {...restProps}
                position="absolute" // Position absolutely to layer over skeleton
                top="0"
                left="0"
            />
        </Box>
    );
});

FadingImage.displayName = "FadingImage";

export default FadingImage;