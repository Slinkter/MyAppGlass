import React from "react";
import PropTypes from "prop-types";
import { Box, useColorModeValue } from "@chakra-ui/react";
import { LazyMotion, m, domAnimation, AnimatePresence } from "framer-motion";
import Gallery from "@shared/components/common/Gallery";
import MapViewer from "./MapViewer";

/**
 * Componente: VisualViewer
 * --------------------------------------------------------------------
 * @description
 * Este componente es el contenedor visual principal del lado izquierdo del modal.
 * Su responsabilidad clave es mantener la estructura y las dimensiones correctas
 * para que el contenido (Mapa o Galería) se visualice sin romper el layout.
 *
 * Características Técnicas:
 * - Implementa un layout responsivo con alturas específicas para móviles (`380px`) y
 *   altura automática (`auto`) para escritorio, emparejándose con el panel de información.
 * - Usa `position: absolute` en su hijo interno para asegurar que el contenido (mapa/galería)
 *   ocupe el 100% del espacio disponible sin forzar el desbordamiento del contenedor padre.
 * - Renderiza condicionalmente `MapViewer` o `Gallery` basado en `viewMode`.
 *
 * @param {Object} props
 * @param {string} props.viewMode - El modo de visualización actual ('map' o 'gallery').
 * @param {number} props.lat - Latitud del proyecto.
 * @param {number} props.lng - Longitud del proyecto.
 * @param {Array} props.photos - Datos de imágenes para la galería.
 */
const VisualViewer = ({ viewMode, lat, lng, photos }) => {
  const spinnerBg = useColorModeValue("gray.100", "gray.800");
  const hasValidCoords = typeof lat === "number" && typeof lng === "number";

  return (
    <LazyMotion features={domAnimation}>
    <Box
      flex={{ base: "none", lg: "3" }}
      w="100%"
      h={{ base: "50dvh", sm: "420px", md: "450px", lg: "auto" }}
      position="relative"
      borderRadius={{ base: "0", lg: "2xl" }}
      overflow="hidden"
      boxShadow="lg"
      bg={spinnerBg}
    >
      <Box position="absolute" top="0" left="0" w="100%" h="100%">
        <AnimatePresence mode="wait">
          {viewMode === "map" && hasValidCoords ? (
            <m.div
              key="map"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              style={{ width: "100%", height: "100%" }}
            >
              <MapViewer lat={lat} lng={lng} />
            </m.div>
          ) : (
            <m.div
              key="gallery"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              style={{ width: "100%", height: "100%" }}
            >
              <Box p={{ base: 4, md: 8 }} w="100%" h="100%">
                <Gallery images={photos} />
              </Box>
            </m.div>
          )}
        </AnimatePresence>
      </Box>
    </Box>
    </LazyMotion>
  );
};

VisualViewer.propTypes = {
  viewMode: PropTypes.oneOf(["map", "gallery"]).isRequired,
  lat: PropTypes.number,
  lng: PropTypes.number,
  photos: PropTypes.array,
};

export default VisualViewer;
