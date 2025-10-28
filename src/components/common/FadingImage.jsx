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
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        setHasError(false); // Reset error state when image changes
    }, [props.src]);

    const handleImageError = (e) => {
        console.log("Image failed to load:", e.target.src);
        setHasError(true);
    };

    const handleImageLoad = (e) => {
        console.log("Image loaded successfully:", e.target.src);
    };

    const defaultImageUrl = "https://via.placeholder.com/150?text=Image+Not+Found"; // Placeholder image

    return (
        <Image
            onLoad={handleImageLoad}
            onError={handleImageError}
            src={hasError ? defaultImageUrl : props.src}
            {...props}
        />
    );
});

FadingImage.displayName = "FadingImage";

export default FadingImage;
