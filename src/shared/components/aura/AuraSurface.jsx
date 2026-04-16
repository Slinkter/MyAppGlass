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
const AuraSurface = ({ children, variant, ...props }) => {
  // Nota: En Chakra v3, si la receta 'glass' está registrada en el sistema,
  // podemos usarla directamente mediante el prop 'recipe'.
  return (
    <Box 
      recipe="glass" 
      variant={variant}
      {...props}
    >
      {children}
    </Box>
  );
};

export default React.memo(AuraSurface);
