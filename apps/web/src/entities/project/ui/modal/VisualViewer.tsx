import React, { useMemo } from "react";
import dynamic from "next/dynamic";
import { Box, useBreakpointValue } from "@chakra-ui/react";
import GalleryWithThumbnails from "@shared/components/common/GalleryWithThumbnails";
import ComingSoonDisplay from "@shared/components/common/ComingSoonDisplay";
import MapLoader from "@/shared/components/map/MapLoader";
import type { Project } from "@shared/types/project";
import type { ProjectPhoto } from "@shared/types/project";
import { GalleryItem } from "@/shared/types/gallery";

const MapViewer = dynamic(() => import("./MapViewer"), {
  ssr: false,
  loading: () => <MapLoader />,
});

interface VisualViewerProps {
  viewMode: "map" | "gallery";
  lat?: number | null;
  lng?: number | null;
  photos?: (GalleryItem | string | ProjectPhoto)[];
  projectData?: Partial<Project>;
}

const toResponsiveUrl = (url: string, isMobile: boolean): string => {
  if (!isMobile || !url) return url;
  return url.replace("%2Fweb%2F", "%2Fmobile%2F").replace("/web/", "/mobile/");
};

/**
 * @component VisualViewer
 * @description Performance-optimized visual panel for the project modal.
 */
const VisualViewer: React.FC<VisualViewerProps> = React.memo(({ viewMode, lat, lng, photos, projectData }) => {
  const hasValidCoords = typeof lat === "number" && typeof lng === "number";
  const isMobile = useBreakpointValue({ base: true, md: false }) ?? false;

  const galleryImages = useMemo<GalleryItem[]>(() => {
    if (!photos) return [];
    return photos.map((photo, index) => {
      if (typeof photo === "string") {
        return {
          id: index,
          src: toResponsiveUrl(photo, isMobile),
          title: projectData?.residencial || "Project Photo",
        };
      }
      
      // Handle ProjectPhoto (from data/projects.ts) OR GalleryItem
      const p = photo as { id?: string | number; src?: string; image?: string; title?: string; name?: string };
      return {
        id: p.id ?? index,
        src: toResponsiveUrl(p.src ?? p.image ?? "", isMobile),
        title: p.title ?? p.name ?? projectData?.residencial ?? "Project Photo",
      };
    });
  }, [photos, projectData?.residencial, isMobile]);

  return (
    <Box
      w="100%"
      h={{ base: "350px", md: "500px", lg: "100%" }}
      position="relative"
    >
      <Box position="absolute" inset="0">
        {viewMode === "map" && hasValidCoords ? (
          <Box
            key="map-view"
            animation="fadeIn 0.2s ease"
            _motionReduce={{ animation: "none", transition: "none" }}
            w="full"
            h="full"
          >
            <Box
              w="full"
              h="full"
              borderRadius="3xl"
              overflow="hidden"
              boxShadow="2xl"
              border="1px solid"
              borderColor="border.default"
              bg="bg.subtle"
            >
              <MapViewer lat={lat!} lng={lng!} projectData={projectData} />
            </Box>
          </Box>
        ) : (
          <Box
            key="gallery-view"
            animation="scaleIn 0.2s ease"
            _motionReduce={{ animation: "none", transition: "none" }}
            w="full"
            h="full"
          >
            {galleryImages.length > 0 ? (
              <GalleryWithThumbnails images={galleryImages} />
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
