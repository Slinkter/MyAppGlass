"use client";
import React from "react";
import { ColorModeButton } from "@/components/ui/color-mode";
import { Box } from "@chakra-ui/react";

export const ThemeToggle: React.FC = () => {
  return (
    <Box
      position="fixed"
      bottom={6}
      right={6}
      zIndex="popover"
      display={{ base: "none", md: "flex" }}
      bg="surface.card"
      borderRadius="full"
      borderWidth="1px"
      borderColor="border.default"
      boxShadow="md"
      p={1}
    >
      <ColorModeButton aria-label="Cambiar tema de color" />
    </Box>
  );
};

