import { useState } from "react";
import { Skeleton, Image } from "@chakra-ui/react";

const FadingImage = (props) => {
    const [isLoaded, setIsLoaded] = useState(false);
    return (
        <Skeleton
            borderRadius="lg"
            mb={4}
            isLoaded={isLoaded} // El esqueleto se desvanecerá solo cuando isLoaded sea true
            w="100%"
            h="100%" // Ocupa la altura del contenedor (GridItem)
            fadeDuration={0.3} // Controla la velocidad de la transición
        >
            <Image
                onLoad={() => setIsLoaded(true)} // Cuando la imagen carga, actualiza el estado
                {...props} // Pasa todos los props originales (src, onClick, etc.)
            />
        </Skeleton>
    );
};

export default FadingImage;
