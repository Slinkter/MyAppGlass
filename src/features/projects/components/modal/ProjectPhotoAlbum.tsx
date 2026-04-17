import React from "react";
import { Box, Image } from "@chakra-ui/react";
import { m } from "framer-motion";
import { ScrollAreaRoot, ScrollAreaViewport, ScrollAreaScrollbar } from "@/components/ui/scroll-area";

export interface ProjectPhoto {
  id: string | number;
  image: string;
  name?: string;
}

interface ProjectPhotoAlbumProps {
  photos: ProjectPhoto[];
}

/**
 * @component ProjectPhotoAlbum
 * @description Optimized Instagram-style grid for project photos.
 */
const ProjectPhotoAlbum: React.FC<ProjectPhotoAlbumProps> = React.memo(({ photos }) => {
  if (!photos || photos.length === 0) return null;

  return (
    <ScrollAreaRoot h="full" w="full" type="hover">
      <ScrollAreaViewport>
        <Box
          p={{ base: "phi_md", md: "phi_lg" }}
          pb="phi_3xl"
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
      </ScrollAreaViewport>
      <ScrollAreaScrollbar orientation="vertical" />
    </ScrollAreaRoot>
  );
});

ProjectPhotoAlbum.displayName = "ProjectPhotoAlbum";

export default ProjectPhotoAlbum;
