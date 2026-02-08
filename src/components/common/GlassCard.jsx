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
