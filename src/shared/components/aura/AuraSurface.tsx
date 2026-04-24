/**
 * @file AuraSurface.tsx
 * @description Flexible glassmorphism surface using the Aura system recipe.
 */

"use client";

import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

interface AuraSurfaceProps extends BoxProps {
  variant?: 'interactive' | 'strong' | string;
  align?: BoxProps['alignItems'];
  justify?: BoxProps['justifyContent'];
}

/**
 * @component AuraSurface
 * @param {string} variant - 'interactive', 'strong', or default.
 */
const AuraSurface = React.memo(React.forwardRef<HTMLDivElement, AuraSurfaceProps>(({ children, variant, ...props }, ref) => {
  return (
    <Box 
      ref={ref}
      // @ts-expect-error - recipe is a custom property for glassmorphism
      recipe="glass" 
      variant={variant}
      {...props}
    >
      {children}
    </Box>
  );
}));

AuraSurface.displayName = "AuraSurface";

export default AuraSurface;
