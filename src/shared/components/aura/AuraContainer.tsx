"use client";
/**
 * @file AuraContainer.tsx
 * @description Standardized page container with Aura spacing and motion entry.
 */

import React from "react";
import { Container, Box, ContainerProps } from "@chakra-ui/react";

interface AuraContainerProps extends ContainerProps {
  children: React.ReactNode;
  animate?: boolean;
}

/**
 * @component AuraContainer
 * @param {React.ReactNode} children
 * @param {boolean} animate - Whether to apply entry animation.
 */
const AuraContainer: React.FC<AuraContainerProps> = ({ children, animate = true, ...props }) => {
  return (
    <Box 
      bg="bg.page" 
      minH="100vh" 
      pb={{ base: "20", md: "36" }}
      animation={animate ? "fadeIn 0.5s ease-out" : undefined}
    >
      <Container 
        maxW="7xl" 
        pt={{ base: "14", md: "20" }} 
        {...props}
      >
        {children}
      </Container>
    </Box>
  );
};

export default React.memo(AuraContainer);