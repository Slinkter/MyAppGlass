import React, { useState, useEffect } from "react";
FadingImage.displayName = "FadingImage";
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

    useEffect(() => {
        setIsLoaded(false); // Restablece el estado cuando la imagen cambia
    }, [props.src]);

    return (
        <Skeleton
            borderRadius="lg"
            mb={4}
            isLoaded={isLoaded} // El esqueleto se desvanecerá solo cuando isLoaded sea true
            w="100%"
            h="100%" // Ocupa la altura del contenedor (GridItem)
            fadeDuration={1} // Controla la velocidad de la transición
        >
            <Image
                onLoad={() => setIsLoaded(true)} // Cuando la imagen carga, actualiza el estado
                {...props} // Pasa todos los props originales (src, onClick, etc.)
            />
        </Skeleton>
    );
});

export default FadingImage;
