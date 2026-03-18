import React from "react";
import PropTypes from "prop-types";
import { Box, Image, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion.create(Box);

/**
 * @component ProjectPhotoAlbum
 * @description Un diseño estilo "Instagram" (Grid 1:1) para visualizar todas las fotos de un proyecto.
 */
const ProjectPhotoAlbum = ({ photos }) => {
  const scrollbarThumb = useColorModeValue("blackAlpha.300", "whiteAlpha.300");

  if (!photos || photos.length === 0) return null;

  return (
    <Box
      w="100%"
      h="100%"
      overflowY="auto"
      p={{ base: 2, md: 4 }}
      pt={{ base: 4, md: 8 }} 
      pb={{ base: 64, md: 72 }} // Padding inferior muy amplio para dejar espacio a la píldora informativa en la parte inferior
      sx={{
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: scrollbarThumb,
          borderRadius: "10px",
        },
      }}
    >
      <Box
        display="grid"
        gridTemplateColumns={{ base: "repeat(3, 1fr)", md: "repeat(4, 1fr)", xl: "repeat(5, 1fr)" }}
        gap={{ base: "2px", md: "4px" }}
      >
        {photos.map((photo, index) => (
          <MotionBox
            key={photo.id || index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
            w="100%"
            aspectRatio="1 / 1"
            overflow="hidden"
            position="relative"
            role="group"
            bg="blackAlpha.200"
          >
            <Image
              src={photo.image}
              alt={photo.name || `Foto de obra ${index + 1}`}
              w="100%"
              h="100%" // Mantiene el aspect ratio 1:1 de la caja
              objectFit="cover"
              loading="lazy"
              transition="transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)"
              _groupHover={{ transform: "scale(1.05)" }}
            />
            
            {/* Gradiente sutil para darle una apariencia más premium al colocar el ratón */}
            <Box
              position="absolute"
              inset="0"
              bgGradient="linear(to-t, blackAlpha.600, transparent)"
              opacity={0}
              transition="opacity 0.3s ease"
              _groupHover={{ opacity: 0.8 }}
              pointerEvents="none"
            />
          </MotionBox>
        ))}
      </Box>
      
      {/* Spacer para que la última foto no se esconda detrás de los controles inferiores */}
      <Box h="120px" w="100%" /> 
    </Box>
  );
};

ProjectPhotoAlbum.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      image: PropTypes.string.isRequired,
      name: PropTypes.string,
    }),
  ).isRequired,
};

export default React.memo(ProjectPhotoAlbum);
