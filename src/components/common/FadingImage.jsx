import React, { useState, useEffect } from "react";
import { Skeleton, Image } from "@chakra-ui/react";

/**
 * Componente FadingImage
 * Muestra una imagen con efecto de fade-in usando Skeleton de Chakra UI.
 * @component
 * @param {Object} props - Props estándar de imagen.
 * @returns {JSX.Element}
 */
const FadingImage = React.memo((props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setIsLoaded(false); // Reset state when image changes
        setHasError(false); // Reset error state when image changes
    }, [props.src]);

    const handleImageError = () => {
        setHasError(true);
        setIsLoaded(true); // Mark as loaded even if it's an error, to hide skeleton
    };

    const defaultImageUrl = "https://via.placeholder.com/150?text=Image+Not+Found"; // Placeholder image

    return (
        <Skeleton
            borderRadius="lg"
            mb={4}
            isLoaded={isLoaded} // Skeleton fades when image is loaded or has error
            w="100%"
            h="100%" // Occupy container height
            fadeDuration={1} // Transition speed
        >
            <Image
                onLoad={() => setIsLoaded(true)} // When image loads, update state
                onError={handleImageError} // Handle image loading errors
                src={hasError ? defaultImageUrl : props.src} // Use default image on error
                {...props} // Pass all original props (src, onClick, etc.)
            />
        </Skeleton>
    );
});

FadingImage.displayName = "FadingImage";

export default FadingImage;
