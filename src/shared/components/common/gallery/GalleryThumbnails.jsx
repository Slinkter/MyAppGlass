import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Image, useColorModeValue } from "@chakra-ui/react";

/**
 * @component GalleryThumbnails
 * @description Carrusel de miniaturas para la galería de imágenes.
 * Muestra una lista de imágenes pequeñas que permiten navegar al hacer clic.
 * Es responsivo: horizontal en móvil, vertical en escritorio.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Array<Object>} props.images - Lista de imágenes.
 * @param {number} props.selectedIndex - Índice de la imagen seleccionada actualmente.
 * @param {function} props.setSelectedIndex - Función para actualizar el índice seleccionado.
 * @returns {JSX.Element} Carrusel de miniaturas.
 */
const GalleryThumbnailItem = React.memo(
    ({ img, index, isSelected, onClick, activeBorderColor }) => (
        <Box
            flexShrink={0}
            w={{ base: "60px", sm: "70px", md: "90%" }}
            h={{ base: "100%", md: "80px", lg: "90px" }}
            cursor="pointer"
            borderRadius={{ base: "lg", md: "lg" }}
            transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)" // Más rápido
            border={isSelected ? "2px solid" : "1px solid transparent"}
            borderColor={isSelected ? activeBorderColor : "transparent"}
            boxShadow={isSelected ? "md" : "none"}
            onClick={onClick}
            position="relative"
            overflow="hidden"
            _hover={{
                borderColor: activeBorderColor,
                boxShadow: "lg",
                transform: "scale(1.05)", // Pequeño zoom en hover
            }}
        >
            <Image
                w="100%"
                h="100%"
                src={img.image}
                overflow="hidden"
                alt={`Miniatura ${index + 1}`}
                objectFit="cover"
                loading="lazy"
                decoding="async"
                opacity={isSelected ? 1 : 0.6} // Más contraste
                transition="opacity 0.2s ease, transform 0.2s ease"
                _hover={{ opacity: 1 }}
                style={{
                    transform: "translateZ(0)", // GPU acceleration
                }}
            />
        </Box>
    )
);

GalleryThumbnailItem.displayName = "GalleryThumbnailItem";

const GalleryThumbnails = ({ images, selectedIndex, setSelectedIndex }) => {
    const activeBorderColor = useColorModeValue("primary.500", "primary.300");

    return (
        <Flex
            direction={{ base: "row", md: "column" }}
            gap={{ base: 2, md: 2 }}
            w={{ base: "100%", md: "100px", lg: "100px" }}
            h={{ base: "60px", sm: "70px", md: "100%" }}
            minW={0}
            maxW="100%"
            scrollBehavior="smooth"
            overflowX={{ base: "auto", md: "hidden" }}
            overflowY={{ base: "hidden", md: "scroll" }}
        >
            {images.map((img, index) => (
                <GalleryThumbnailItem
                    key={img.id}
                    img={img}
                    index={index}
                    isSelected={selectedIndex === index}
                    onClick={() => setSelectedIndex(index)}
                    activeBorderColor={activeBorderColor}
                />
            ))}
        </Flex>
    );
};

GalleryThumbnails.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            image: PropTypes.string.isRequired,
            name: PropTypes.string,
        })
    ).isRequired,
    selectedIndex: PropTypes.number.isRequired,
    setSelectedIndex: PropTypes.func.isRequired,
};

export default GalleryThumbnails;
