import React from "react";
import PropTypes from "prop-types";
import { Box, Flex, Image, useColorModeValue } from "@chakra-ui/react";

/**
 * @component GalleryThumbnails
 * @description Carrusel de miniaturas para la galería de imágenes.
 * Muestra una lista de imágenes pequeñas que permiten navegar al hacer clic.
 * Es responsivo: horizontal en móvil, vertical en escritorio.
 */
const GalleryThumbnailItem = React.memo(
  ({ img, index, isSelected, onClick, activeBorderColor }) => {
    // Definir colores para estados inactivos pero en hover
    const hoverBorderColor = useColorModeValue("gray.300", "whiteAlpha.400");

    return (
      <Box
        flexShrink={0}
        w={{ base: "60px", sm: "70px", md: "90%" }}
        h={{ base: "100%", md: "80px", lg: "90px" }}
        cursor="pointer"
        borderRadius="lg"
        // Mantiene el borde constante para evitar saltos de layout
        borderWidth="2px"
        borderStyle="solid"
        borderColor={isSelected ? activeBorderColor : "transparent"}
        // Sombra suave solo cuando está seleccionado
        boxShadow={isSelected ? "md" : "none"}
        onClick={onClick}
        position="relative"
        overflow="hidden"
        role="group" // Permite controlar la imagen interna al hacer hover en el contenedor
        transition="all 0.2s ease-out"
        _hover={{
          // Si ya está seleccionado, no cambia el color. Si no, muestra un borde sutil.
          borderColor: isSelected ? activeBorderColor : hoverBorderColor,
        }}
      >
        <Image
          w="100%"
          h="100%"
          src={img.image}
          alt={`Miniatura ${index + 1}`}
          objectFit="cover"
          loading="lazy"
          decoding="async"
          // Opacidad: 100% si está seleccionado o en hover, 60% si inactivo
          opacity={isSelected ? 1 : 0.6}
          transition="transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.2s ease"
          _groupHover={{
            opacity: 1,
            transform: "scale(1.1)", // Zoom suave interno solo en la imagen
          }}
        />
      </Box>
    );
  },
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
    }),
  ).isRequired,
  selectedIndex: PropTypes.number.isRequired,
  setSelectedIndex: PropTypes.func.isRequired,
};

export default GalleryThumbnails;
