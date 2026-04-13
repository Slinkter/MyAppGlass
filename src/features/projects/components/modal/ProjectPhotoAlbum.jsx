import React from "react";
import PropTypes from "prop-types";
import { Box, Image, useColorModeValue } from "@chakra-ui/react";
import { m } from "framer-motion";

/**
 * @component ProjectPhotoAlbum
 * @description Optimized Instagram-style grid for project photos.
 */
const ProjectPhotoAlbum = React.memo(({ photos }) => {
  const scrollbarThumb = useColorModeValue("blackAlpha.300", "whiteAlpha.300");

  if (!photos || photos.length === 0) return null;

  return (
    <Box
      w="100%"
      h="100%"
      overflowY="auto"
      p={{ base: "phi_md", md: "phi_lg" }}
      pb="phi_3xl"
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
        gap="phi_xs"
      >
        {photos.map((photo, index) => (
          <Box
            as={m.div}
            key={photo.id || index}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.03, ease: "easeOut" }}
            w="100%"
            aspectRatio="1 / 1"
            overflow="hidden"
            position="relative"
            role="group"
            bg="blackAlpha.200"
            borderRadius="md"
          >
            <Image
              src={photo.image}
              alt={photo.name || `Foto de obra ${index + 1}`}
              w="100%"
              h="100%"
              objectFit="cover"
              loading="lazy"
              transition="transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1)"
              _groupHover={{ transform: "scale(1.05)" }}
            />
            
            <Box
              position="absolute"
              inset="0"
              bgGradient="linear(to-t, blackAlpha.600, transparent)"
              opacity={0}
              transition="opacity 0.3s ease"
              _groupHover={{ opacity: 0.8 }}
              pointerEvents="none"
            />
          </Box>
        ))}
      </Box>
      
      {/* Spacer for bottom docked controls */}
      <Box h="phi_3xl" w="100%" /> 
    </Box>
  );
});

ProjectPhotoAlbum.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      image: PropTypes.string.isRequired,
      name: PropTypes.string,
    }),
  ).isRequired,
};

ProjectPhotoAlbum.displayName = "ProjectPhotoAlbum";

export default ProjectPhotoAlbum;
