import React, { useMemo } from "react";
import { Box, Flex } from "@chakra-ui/react";
import Gallery from "@shared/components/common/Gallery";
import ComingSoonDisplay from "@shared/components/common/ComingSoonDisplay";
import MapViewer from "./MapViewer";
import { Project, ProjectPhoto } from "@/features/projects/services/projectService";
import { GalleryItem } from "@/shared/types/gallery";

interface VisualViewerProps {
  viewMode: "map" | "gallery";
  lat?: number | null;
  lng?: number | null;
  photos?: (GalleryItem | string | ProjectPhoto)[];
  projectData?: Partial<Project>;
}

/**
 * @component VisualViewer
 * @description Performance-optimized visual panel for the project modal.
 */
const VisualViewer: React.FC<VisualViewerProps> = React.memo(({ viewMode, lat, lng, photos, projectData }) => {
  const hasValidCoords = typeof lat === "number" && typeof lng === "number";

  const galleryImages = useMemo<GalleryItem[]>(() => {
    if (!photos) return [];
    return photos.map((photo, index) => {
      if (typeof photo === "string") {
        return {
          id: index,
          src: photo,
          title: projectData?.residencial || "Project Photo",
        };
      }
      
      // Handle ProjectPhoto (from data/projects.ts) OR GalleryItem
      const p = photo as { id?: string | number; src?: string; image?: string; title?: string; name?: string };
      return {
        id: p.id ?? index,
        src: p.src ?? p.image ?? "",
        title: p.title ?? p.name ?? projectData?.residencial ?? "Project Photo",
      };
    });
  }, [photos, projectData?.residencial]);

  return (
    <Box
      w="100%"
      h="100%"
      position="relative"
    >
      <Box position="absolute" inset="0">
          {viewMode === "map" && hasValidCoords ? (
            <Box
              w="100%"
              h="100%"
            >
              <Box
                w="full"
                h="full"
                borderRadius="3xl"
                overflow="hidden"
                boxShadow="2xl"
                border="1px solid"
                borderColor="border.glass"
                bg="bg.subtle"
              >
                <MapViewer lat={lat!} lng={lng!} projectData={projectData} />
              </Box>
            </Box>
          ) : (
            <Box
              w="100%"
              h="100%"
            >
              {galleryImages.length > 0 ? (
                <Gallery images={galleryImages}>
                  <Flex
                    direction={{ base: "column", md: "row" }}
                    gap={{ base: "6", md: "8" }}
                    h="100%"
                    w="100%"
                    minW={0}
                  >
                    <Gallery.Viewer />
                    <Gallery.Thumbnails />
                  </Flex>
                </Gallery>
              ) : (
                <ComingSoonDisplay />
              )}
            </Box>
          )}
      </Box>
    </Box>
  );
});

VisualViewer.displayName = "VisualViewer";

export default VisualViewer;
