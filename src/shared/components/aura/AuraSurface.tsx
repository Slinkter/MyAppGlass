/**
 * @file AuraSurface.tsx
 * @description Flexible surface component using the Aura design system.
 */

"use client";

import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

interface AuraSurfaceProps extends BoxProps {
  align?: BoxProps['alignItems'];
  justify?: BoxProps['justifyContent'];
  variant?: "interactive" | "strong" | "solid" | "glass";
}

/**
 * @component AuraSurface
 */
const AuraSurface = React.memo(React.forwardRef<HTMLDivElement, AuraSurfaceProps>(({ children, align, justify, variant, ...props }, ref) => {
  // Configurar estilos basados en la variante
  const isInteractive = variant === "interactive";
  const isStrong = variant === "strong";
  
  return (
    <Box
      ref={ref}
      bg={isStrong ? "glass.bg" : "surface.card"}
      borderWidth="1px"
      borderColor="border.default"
      borderRadius="card"
      boxShadow="sm"
      alignItems={align}
      justifyContent={justify}
      transition="background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={isInteractive ? {
        bg: { _light: "rgba(255,255,255,0.35)", _dark: "rgba(24,24,27,0.5)" },
        boxShadow: "glassHover",
        transform: "translateY(-2px)",
      } : undefined}
      {...props}
    >
      {children}
    </Box>
  );
}));

AuraSurface.displayName = "AuraSurface";

export default AuraSurface;
