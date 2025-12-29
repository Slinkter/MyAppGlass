import React from "react";
import {
    Box,
    Stack,
    Heading,
    Button,
    useColorModeValue,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Link as RouterLink } from "react-router-dom";
import FadingImage from "@/components/common/FadingImage";

/**
 * @component ServiceCard
 * @description Muestra una tarjeta individual de servicio con imagen, título y enlace al catálogo.
 * Utiliza estilos de glassmorphism consistentes con el resto de la aplicación, siguiendo el formato de ProjectCard.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {string} props.image - URL de la imagen del servicio.
 * @param {string} props.name - Nombre del servicio.
 * @param {string} props.plink - Enlace a la página de detalle del servicio.
 * @returns {JSX.Element} Tarjeta de servicio renderizada.
 */
const ServiceCard = React.memo(({ image, name, plink }) => {
    const [isImageLoaded, setIsImageLoaded] = React.useState(false);

    // Configuración de colores y estilos para Glassmorphism
    const styles = {
        bg: useColorModeValue(
            "rgba(255, 255, 255, 0.25)",
            "rgba(0, 0, 0, 0.25)"
        ),
        heading: useColorModeValue("primary.700", "primary.300"),
        text: useColorModeValue("gray.800", "gray.100"),
        btnBg: useColorModeValue(
            "rgba(255, 255, 255, 0.4)",
            "rgba(0, 0, 0, 0.4)"
        ),
        btnHover: useColorModeValue(
            "rgba(255, 255, 255, 0.6)",
            "rgba(0, 0, 0, 0.6)"
        ),
    };

    return (
        <Box
            w="full"
            maxW={{ base: "full", md: "md" }}
            h="auto"
            mb={4}
            overflow="hidden"
            bg={styles.bg}
            /*  backdropFilter="blur(10px)" */
            borderRadius="2xl"
            boxShadow="lg"
            color={styles.text}
            transition="transform 0.3s ease, box-shadow 0.3s ease"
            style={{ willChange: "transform, opacity" }} // Optimizacion GPU
            _hover={{
                transform: "scale(1.02)",
                boxShadow: "xl",
            }}
        >
            <Box p={2}>
                <FadingImage
                    w="full"
                    h={{ base: "245px", md: "375px" }}
                    src={image}
                    alt={`Servicio de ${name}`}
                    objectFit="cover"
                    showOverlay={false}
                    onLoad={() => setIsImageLoaded(true)}
                />

                <Stack
                    p={4}
                    spacing={3}
                    opacity={isImageLoaded ? 1 : 0}
                    transition="opacity 0.4s ease-in-out"
                >
                    <Heading
                        size="md"
                        textTransform="uppercase"
                        color={styles.heading}
                        fontWeight="bold"
                        textAlign="center"
                    >
                        {name}
                    </Heading>

                    <Button
                        as={RouterLink}
                        to={plink}
                        rightIcon={<ArrowForwardIcon />}
                        variant="solid"
                        width="full"
                        bg={styles.btnBg}
                        color={styles.text}
                        _hover={{ bg: styles.btnHover }}
                        mt={2}
                    >
                        Catálogo
                    </Button>
                </Stack>
            </Box>
        </Box>
    );
});

ServiceCard.displayName = "ServiceCard";
export default ServiceCard;
