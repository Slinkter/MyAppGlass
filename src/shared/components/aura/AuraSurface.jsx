/**
 * @file AuraSurface.jsx
 * @description Flexible glassmorphism surface using the Aura system recipe.
 */

import React from "react";
import { Box, useRecipe } from "@chakra-ui/react";

/**
 * @component AuraSurface
 * @param {string} variant - 'interactive', 'strong', or default.
 */
const AuraSurface = React.forwardRef(({ children, variant, ...props }, ref) => {
  return (
    <Box 
      ref={ref}
      recipe="glass" 
      variant={variant}
      {...props}
    >
      {children}
    </Box>
  );
});

AuraSurface.displayName = "AuraSurface";

export default React.memo(AuraSurface);
