/**
 * @file GlassCard.jsx
 * @description Foundation component for implementing consistent glassmorphism (frosted glass) effects.
 * @module shared/components
 */

import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";

/**
 * @component GlassCard
 * @description Componente base para crear tarjetas con efecto de "liquid glass" (glassmorphism).
 * Proporciona un estilo visual consistente que se adapta al modo claro/oscuro de la interfaz,
 * con un fondo translúcido y efecto de desenfoque.
 *
 * @param {Object} props - Propiedades que se pasarán directamente al componente `Box` de Chakra UI.
 * @param {React.ReactNode} props.children - Contenido que se renderizará dentro de la tarjeta.
 * @returns {JSX.Element} Un componente Box con estilos de glassmorphism aplicados.
 *
 * @example
 * // Ejemplo de uso básico de GlassCard
 * <GlassCard p={4} m={2}>
 *   <Heading size="md">Título de la Tarjeta</Heading>
 *   <Text mt={2}>Este es el contenido de la tarjeta de vidrio.</Text>
 * </GlassCard>
 *
 * @example
 * // GlassCard con propiedades adicionales de Box de Chakra UI
 * <GlassCard width="200px" height="150px" _hover={{ boxShadow: "xl" }}>
 *   <Text textAlign="center" pt={6}>Tarjeta Interactiva</Text>
 * </GlassCard>
 */
const GlassCard = ({ children, ...props }) => {
  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.35)",
    "rgba(15, 15, 15, 0.55)",
  );
  const borderColor = useColorModeValue("whiteAlpha.600", "whiteAlpha.300");
  const reflectionColor = useColorModeValue("whiteAlpha.500", "whiteAlpha.100");

  return (
    <Box
      position="relative"
      bg={bgColor}
      backdropFilter="blur(16px)"
      borderRadius="2xl"
      border="1px solid"
      borderColor={borderColor}
      boxShadow="2xl"
      overflow="hidden"
      transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
      // Gradient Border Reflection (Kept for aesthetic, performance cost is low)
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pointerEvents: "none",
        zIndex: 0,
        borderRadius: "inherit",
        padding: "1px",
        background: `linear-gradient(135deg, ${reflectionColor}, transparent 50%, transparent)`,
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        maskComposite: "exclude",
        WebkitMaskComposite: "destination-out",
      }}
      {...props}
    >
      <Box position="relative" zIndex={1}>
        {children}
      </Box>
    </Box>
  );
};

export default GlassCard;
