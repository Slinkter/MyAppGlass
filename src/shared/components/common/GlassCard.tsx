"use client";

import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";

/**
 * @component GlassCard
 * @description Componente base para crear tarjetas con efecto de "liquid glass" (glassmorphism).
 */
const GlassCard: React.FC<BoxProps> = React.memo(({ children, ...props }) => {
  return (
    <Box
      bg="surface.card"
      borderRadius="2xl"
      boxShadow="sm"
      transition="box-shadow 0.3s ease, transform 0.3s ease"
      borderWidth="1px"
      borderStyle="solid"
      borderColor="glass.border"
      _light={{
        borderTopColor: "whiteAlpha.500",
        borderBottomColor: "blackAlpha.100",
      }}
      _dark={{
        borderTopColor: "whiteAlpha.200",
        borderBottomColor: "whiteAlpha.50",
      }}
      {...props}
    >
      {children}
    </Box>
  );
});

GlassCard.displayName = "GlassCard";

export default GlassCard;
