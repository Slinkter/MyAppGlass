import React, { useState, useEffect } from "react";
import {
    Image,
    Box,
    Heading,
    Button,
    Stack,
    useColorModeValue,
    Skeleton,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

/**
 * @component FadingImage
 * @description Muestra una imagen con un efecto de fundido y un overlay interactivo.
 * Al pasar el ratón por encima, se revela un título y un botón de catálogo,
 * creando un efecto visual atractivo para productos o proyectos.
 * El componente maneja estados de carga, errores de imagen y es compatible con modos claro/oscuro.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.name - Título o nombre asociado a la imagen, que se muestra en el overlay.
 * @param {string} props.plink - URL de destino para el botón "Catálogo".
 * @param {string} props.src - URL de la imagen principal a mostrar.
 * @param {string} [props.placeholderImageUrl] - URL de una imagen de respaldo a mostrar si `src` falla. Por defecto, usa `imgF`.
 * @param {function} [props.onImageError] - Función de callback que se ejecuta cuando la imagen principal falla al cargar.
 * @param {string|number} [props.w] - Ancho del contenedor de la imagen. Acepta valores de Chakra UI (ej. "100%", "200px").
 * @param {string|number} [props.h] - Altura del contenedor de la imagen. Acepta valores de Chakra UI (ej. "100%", "150px").
 * @param {boolean} [props.showOverlay=true] - Si es `true`, muestra el overlay interactivo al hacer hover.
 * @param {function} [props.onLoad] - Función de callback que se ejecuta cuando la imagen principal carga exitosamente.
 * @param {Object} [props.restProps] - Cualquier otra propiedad pasada se aplica directamente al componente `Image` de Chakra UI.
 * @returns {JSX.Element} Componente de imagen con efecto de fundido y overlay.
 *
 * @example
 * // Ejemplo de uso básico de FadingImage
 * <FadingImage
 *   name="Producto Destacado"
 *   plink="/productos/destacado"
 *   src="https://example.com/imagen-destacada.jpg"
 *   w="300px"
 *   h="200px"
 * />
 *
 * @example
 * // FadingImage con imagen de placeholder y manejo de error
 * <FadingImage
 *   name="Proyecto Especial"
 *   plink="/proyectos/especial"
 *   src="/assets/projects/special-project.jpg"
 *   placeholderImageUrl="/assets/common/placeholder.png"
 *   onImageError={() => console.error("Error al cargar imagen del proyecto")}
 *   showOverlay={false} // Deshabilita el overlay si solo se quiere la imagen con efecto de carga
 * />
 */

const imgF = "https://placehold.co/300x300?text=Imagen+no+disponible";

const FadingImage = React.memo((props) => {
    const {
        name,
        plink,
        src,
        placeholderImageUrl,
        onImageError,
        w,
        h,
        showOverlay = true, // Default to true to maintain existing behavior
        onLoad, // Destructure onLoad to handle it internally
        ...restProps
    } = props;

    // Estado interno para manejar la URL de la imagen y el estado de carga.
    const [imageSrc, setImageSrc] = useState(src);
    const [isLoaded, setIsLoaded] = useState(false);

    // Sincroniza el estado si la prop 'src' cambia.
    useEffect(() => {
        setImageSrc(src);
        setIsLoaded(false); // Reset loaded state when src changes
    }, [src]);

    // Manejador para cuando la imagen principal falla al cargar.
    const handleImageError = () => {
        if (onImageError) onImageError();
        setImageSrc(placeholderImageUrl || imgF);
        setIsLoaded(true); // Ensure skeleton disappears on error to show fallback
    };

    const handleLoad = (e) => {
        setIsLoaded(true);
        if (onLoad) onLoad(e);
    };

    // Estilos dinámicos para compatibilidad con modos claro y oscuro.
    const overlayBg = useColorModeValue(
        "linear-gradient(to top, rgba(240, 240, 240, 0.95), rgba(255,255,255,0))", // Gradiente claro para light mode
        "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0))" // Gradiente oscuro para dark mode
    );
    const headingColor = useColorModeValue("gray.800", "white");
    const buttonStyles = {
        bg: useColorModeValue("whiteAlpha.900", "whiteAlpha.200"),
        color: useColorModeValue("primary.600", "primary.300"),
        _hover: {
            bg: useColorModeValue("primary.600", "primary.500"),
            color: "white",
        },
    };

    return (
        <Box
            w={w}
            h={h}
            position="relative"
            overflow="hidden"
            rounded="md"
            role="group"
            bg={useColorModeValue("gray.100", "gray.700")} // Background placeholder
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
                    opacity={isLoaded ? 1 : 0} // Fade in effect
                    _groupHover={{ transform: "scale(1.1)" }}
                    {...restProps}
                />
            </Skeleton>

            {/* Renderizar overlay y contenido solo si showOverlay es true */}
            {showOverlay && (
                <>
                    <Box
                        position="absolute"
                        top="0"
                        left="0"
                        w="100%"
                        h="100%"
                        bg={overlayBg}
                        zIndex={1}
                        opacity={0}
                        transition="opacity 0.3s ease-in-out"
                        _groupHover={{ opacity: 0.9 }}
                    />

                    <Stack
                        p={{ base: 4, md: 6 }}
                        spacing={3}
                        textAlign="center"
                        position="absolute"
                        bottom="0"
                        left="0"
                        w="100%"
                        zIndex={2}
                    >
                        <Heading
                            as="h3"
                            size="md"
                            fontWeight="600"
                            textTransform="uppercase"
                            color={headingColor}
                            opacity={0}
                            transform="translateY(20px)"
                            transition="all 0.3s ease-out"
                            _groupHover={{
                                opacity: 1,
                                transform: "translateY(0)",
                            }}
                        >
                            {name}
                        </Heading>

                        <Button
                            as={RouterLink}
                            to={plink}
                            rightIcon={<ArrowForwardIcon />}
                            aria-label={`Ver catálogo de ${name}`}
                            width="full"
                            opacity={0}
                            transform="translateY(20px)"
                            transition="all 0.3s ease-out 0.1s"
                            bg={buttonStyles.bg}
                            color={buttonStyles.color}
                            _hover={buttonStyles._hover}
                            _groupHover={{
                                opacity: 1,
                                transform: "translateY(0)",
                            }}
                        >
                            Catálogo
                        </Button>
                    </Stack>
                </>
            )}
        </Box>
    );
});

FadingImage.displayName = "FadingImage";

export default FadingImage;
