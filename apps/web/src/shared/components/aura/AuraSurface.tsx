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
      bg={isStrong ? "bg.section" : isGlass ? "bg.surface" : "surface.card"}
      backdropFilter={isGlass ? "blur(24px) saturate(180%)" : undefined}
      css={isGlass ? { WebkitBackdropFilter: "blur(24px) saturate(180%)" } : undefined}
      borderWidth="1px"
      borderColor="border.default"
      borderRadius="card"
      boxShadow={isGlass ? "adminCard" : "sm"}
      alignItems={align}
      justifyContent={justify}
      transition="background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s cubic-bezier(0.4, 0, 0.2, 1), transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
      _hover={isInteractive ? { boxShadow: "lg" } : undefined}
      {...props}
    >
      {children}
    </Box>
  );
}));

AuraSurface.displayName = "AuraSurface";

export default AuraSurface;
