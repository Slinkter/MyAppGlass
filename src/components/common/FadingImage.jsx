import React, { useState, useEffect } from "react";
import { Skeleton, Image, Box } from "@chakra-ui/react"; // Import Box

/**
 * Componente FadingImage
 * Muestra una imagen con efecto de fade-in usando Skeleton de Chakra UI.
 * @component
 * @param {Object} props - Props estándar de imagen, incluyendo `w` y `h` para el tamaño.
 * @param {string} [props.placeholderImageUrl] - URL de la imagen de marcador de posición a mostrar en caso de error.
 * @param {() => void} [props.onImageError] - Callback function to execute when the image fails to load.
 * @returns {JSX.Element}
 */
const FadingImage = React.memo((props) => {
    const [hasError, setHasError] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false); // New state for image loaded

    useEffect(() => {
        setHasError(false); // Reset error state when image changes
        setIsImageLoaded(false); // Reset loaded state when image changes
    }, [props.src]);

    const handleImageError = () => {
        setHasError(true);
        setIsImageLoaded(true); // Even if error, consider it "loaded" to hide skeleton
        if (props.onImageError) {
            props.onImageError();
        }
    };

    const handleImageLoad = () => {
        setIsImageLoaded(true); // Image loaded successfully
    };

    const finalPlaceholderImageUrl = props.placeholderImageUrl || "https://via.placeholder.com/150?text=Image+Not+Found"; // Placeholder image

    // Extract width and height from props to apply to Skeleton
    const { w, h, ...restProps } = props;

    return (
        <Box w={w} h={h} position="relative" overflow="hidden" rounded="md">
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
            <Image
                onLoad={handleImageLoad}
                onError={handleImageError}
                src={hasError ? finalPlaceholderImageUrl : props.src}
                opacity={isImageLoaded ? 1 : 0} // Fade in effect
                transition="opacity 0.5s ease-in-out" // Transition for fade in
                w="100%" // Ensure image takes full width of Box
                h="100%" // Ensure image takes full height of Box
                loading="lazy" // Added for lazy loading
                {...restProps} // Pass remaining props
            />
        </Box>
    );
});

FadingImage.displayName = "FadingImage";

export default FadingImage;
