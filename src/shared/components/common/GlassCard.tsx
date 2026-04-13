"use client";

import React from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

export interface GlassCardProps extends BoxProps {
  children: React.ReactNode;
}

const GlassCard = ({ children, ...props }: GlassCardProps) => {
  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.15)",
    "rgba(0, 0, 0, 0.15)",
  );

  return (
    <Box
      bg={bgColor}
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
