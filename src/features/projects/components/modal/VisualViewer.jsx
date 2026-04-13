import React from "react";
import PropTypes from "prop-types";
import { Box } from "@chakra-ui/react";
import { m, AnimatePresence } from "framer-motion";
import Gallery from "@shared/components/common/Gallery";
import MapViewer from "./MapViewer";

/**
 * @component VisualViewer
 * @description Performance-optimized visual panel for the project modal.
 */
const VisualViewer = React.memo(({ viewMode, lat, lng, photos }) => {
  const hasValidCoords = typeof lat === "number" && typeof lng === "number";

  return (
    <Box
      flex={{ base: "none", lg: "3" }}
      w="100%"
      h={{ base: "50dvh", sm: "450px", md: "500px", lg: "auto" }}
      position="relative"
      borderRadius={{ base: "0", lg: "2xl" }}
      overflow="hidden"
      boxShadow="lg"
      bg="bg.subtle"
    >
      <Box position="absolute" top="0" left="0" w="100%" h="100%">
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
              <MapViewer lat={lat} lng={lng} />
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
              <Gallery images={photos} />
            </m.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
});

VisualViewer.propTypes = {
  viewMode: PropTypes.oneOf(["map", "gallery"]).isRequired,
  lat: PropTypes.number,
  lng: PropTypes.number,
  photos: PropTypes.array,
};

VisualViewer.displayName = "VisualViewer";

export default VisualViewer;
