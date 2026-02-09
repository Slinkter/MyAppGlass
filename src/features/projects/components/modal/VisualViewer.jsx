import React from "react";
import PropTypes from "prop-types";
import { Box, useColorModeValue } from "@chakra-ui/react";
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
 * @param {string} props.googleMapsUrl - URL para el componente de mapa.
 * @param {Array} props.photos - Datos de imágenes para la galería.
 */
const VisualViewer = ({ viewMode, googleMapsUrl, photos }) => {
  const spinnerBg = useColorModeValue("gray.100", "gray.800");

  return (
    <Box
      flex={{ base: "none", lg: "3" }}
      w="100%"
      h={{ base: "380px", sm: "420px", md: "450px", lg: "auto" }}
      position="relative"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="lg"
      bg={spinnerBg}
    >
      <Box position="absolute" top="0" left="0" w="100%" h="100%">
        {viewMode === "map" ? (
          <MapViewer url={googleMapsUrl} />
        ) : (
          <Gallery images={photos} />
        )}
      </Box>
    </Box>
  );
};

VisualViewer.propTypes = {
  viewMode: PropTypes.oneOf(["map", "gallery"]).isRequired,
  googleMapsUrl: PropTypes.string.isRequired,
  photos: PropTypes.array,
};

export default VisualViewer;
