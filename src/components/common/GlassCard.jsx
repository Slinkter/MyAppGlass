import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

/**
 * Componente Base para Tarjetas de Vidrio (Glassmorphism)
 * Proporciona un efecto de "liquid glass" consistente con la barra de navegación.
 * @param {Object} props - Props que se pasarán al componente Box de Chakra.
 * @param {React.ReactNode} props.children - Contenido de la tarjeta.
 */
const GlassCard = ({ children, ...props }) => {
  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.1)",
    "rgba(0, 0, 0, 0.1)"
  );

  return (
    <Box
      bg={bgColor}
      backdropFilter="blur(10px)"
      sx={{ WebkitBackdropFilter: "blur(10px)" }}
      borderRadius="2xl"
      boxShadow="sm"
      transition="box-shadow 0.3s ease, transform 0.3s ease"
      border="none"
      {...props}
    >
      {children}
    </Box>
  );
};

export default GlassCard;
