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
  const isInteractive = variant === "interactive";
  const isStrong = variant === "strong";
  const isGlass = variant === "glass";
  
  return (
    <Box
      ref={ref}
      bg={isStrong ? "bg.glass" : isGlass ? { _light: "rgba(255,255,255,0.25)", _dark: "rgba(10,10,12,0.35)" } : "surface.card"}
      backdropFilter={isGlass ? "blur(24px) saturate(180%)" : undefined}
      css={isGlass ? { WebkitBackdropFilter: "blur(24px) saturate(180%)" } : undefined}
      borderWidth="1px"
      borderColor="border.default"
      borderRadius="card"
      boxShadow={isGlass ? "0 4px 20px rgba(0,0,0,0.06)" : "sm"}
      alignItems={align}
      justifyContent={justify}
      transition="background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={isInteractive ? {
        bg: { _light: "rgba(255,255,255,0.35)", _dark: "rgba(24,24,27,0.5)" },
        boxShadow: "lg",
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
