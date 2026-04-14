import React from "react";
import { Box } from "@chakra-ui/react";

/**
 * @component GlassCard
 * @description Componente base para crear tarjetas con efecto de "liquid glass" (glassmorphism).
 * Proporciona un estilo visual consistente que se adapta al modo claro/oscuro de la interfaz.
 * Utiliza el token semántico surface.card definido en el sistema.
 */
const GlassCard = ({ children, ...props }) => {
  return (
    <Box
      bg="surface.card"
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
