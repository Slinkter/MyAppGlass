import React, { useState, useEffect } from "react";
import {
    Image,
    Box,
    Heading,
    Button,
    Stack,
    useColorModeValue,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";

/**
 * @component FadingImage
 * @description Muestra una imagen con un overlay y texto que aparecen al hacer hover.
 * Maneja errores de carga de imagen y es compatible con modos claro/oscuro.
 * @param {Object} props - Props del componente.
 * @returns {JSX.Element}
 */

const imgF = "https://via.placeholder.com/300?text=Imagen+no+disponible";

const FadingImage = React.memo((props) => {
    const {
        name,
        plink,
        src,
        placeholderImageUrl,
        onImageError,
        w,
        h,
        ...restProps
    } = props;

    // Estado interno para manejar la URL de la imagen, permitiendo un fallback en caso de error.
    const [imageSrc, setImageSrc] = useState(src);

    // Sincroniza el estado si la prop 'src' cambia.
    useEffect(() => {
        setImageSrc(src);
    }, [src]);

    // Manejador para cuando la imagen principal falla al cargar.
    const handleImageError = () => {
        if (onImageError) onImageError();
        setImageSrc(placeholderImageUrl || imgF);
    };

    // Estilos dinámicos para compatibilidad con modos claro y oscuro.
    const overlayBg = useColorModeValue(
        "linear-gradient(to top, rgba(240, 240, 240, 0.95), rgba(255,255,255,0))", // Gradiente claro para light mode
        "linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0))" // Gradiente oscuro para dark mode
    );
    const headingColor = useColorModeValue("gray.800", "white");
    const buttonStyles = {
        bg: useColorModeValue("whiteAlpha.900", "whiteAlpha.200"),
        color: useColorModeValue("red.600", "red.300"),
        _hover: {
            bg: useColorModeValue("red.600", "red.500"),
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
        >
            <Image
                onError={handleImageError}
                src={imageSrc || undefined}
                w="100%"
                h="100%"
                objectFit="cover"
                loading="lazy"
                transition="transform 0.4s ease-in-out"
                _groupHover={{ transform: "scale(1.1)" }}
                {...restProps}
            />
            {/* Overlay que se muestra al hacer hover */}
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
                _groupHover={{ opacity: 1 }}
            />

            <Stack
                p={{ base: 4, md: 6 }}
                spacing={3}
                textAlign="center"
                position="absolute"
                bottom="0" // Alineado abajo
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
                    _groupHover={{ opacity: 1, transform: "translateY(0)" }}
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
                    _groupHover={{ opacity: 1, transform: "translateY(0)" }}
                    bg={buttonStyles.bg}
                    color={buttonStyles.color}
                    _hover={buttonStyles._hover}
                >
                    Catálogo
                </Button>
            </Stack>
        </Box>
    );
});

FadingImage.displayName = "FadingImage";

export default FadingImage;
