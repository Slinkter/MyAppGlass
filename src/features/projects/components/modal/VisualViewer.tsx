import React, { useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { m, AnimatePresence } from "framer-motion";
import Gallery from "@shared/components/common/Gallery";
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
      flex={{ base: "none", lg: "2" }}
      w="100%"
      h={{ base: "50dvh", md: "500px", lg: "full" }}
      position="relative"
      borderRadius={{ base: "0", lg: "2xl" }}
      overflow="hidden"
      boxShadow="lg"
      bg="bg.subtle"
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
              <MapViewer lat={lat!} lng={lng!} projectData={projectData} />
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
              <Gallery images={galleryImages}>
                <Gallery.Viewer />
              </Gallery>
            </m.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
});

VisualViewer.displayName = "VisualViewer";

export default VisualViewer;
