import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

/**
 * @component GlassCard
 * @description Componente base para crear tarjetas con efecto de "liquid glass" (glassmorphism).
 */
const GlassCard: React.FC<BoxProps> = ({ children, ...props }) => {
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
