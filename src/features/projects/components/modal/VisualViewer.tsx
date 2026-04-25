import React, { useMemo } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { m, AnimatePresence } from "framer-motion";
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
        <AnimatePresence mode="wait">
          {viewMode === "map" && hasValidCoords ? (
            <m.div
              key="map"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ width: "100%", height: "100%" }}
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
            </m.div>
          ) : (
            <m.div
              key="gallery"
              initial={{ opacity: 0, scale: 0.99 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ width: "100%", height: "100%" }}
            >
              {galleryImages.length > 0 ? (
                <Gallery images={galleryImages}>
                  <Flex
                    direction={{ base: "column", md: "row" }}
                    gap={{ base: "phi_md", md: "phi_lg" }}
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
            </m.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
});

VisualViewer.displayName = "VisualViewer";

export default VisualViewer;
