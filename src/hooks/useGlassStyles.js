import { useColorModeValue } from "@chakra-ui/react";

/**
 * Hook personalizado para estilos Glassmorphism Premium
 * Centraliza la paleta de colores y efectos para mantener consistencia.
 * @returns {Object} Objeto con los estilos definidos
 */
export const useGlassStyles = () => {
  return {
    bg: useColorModeValue("rgba(255, 255, 255, 0.7)", "rgba(20, 20, 20, 0.7)"),
    border: useColorModeValue(
      "rgba(255, 255, 255, 0.5)",
      "rgba(255, 255, 255, 0.1)"
    ),
    text: useColorModeValue("gray.700", "gray.300"),
    headingColor: useColorModeValue("gray.900", "white"),
    accent: useColorModeValue("blue.600", "blue.300"),
    cardBg: useColorModeValue("whiteAlpha.600", "blackAlpha.500"),
  };
};
