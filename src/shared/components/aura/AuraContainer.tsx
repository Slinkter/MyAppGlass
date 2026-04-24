/**
 * @file AuraContainer.tsx
 * @description Standardized page container with Aura spacing and motion entry.
 */

import React from "react";
import { Container, Box, ContainerProps } from "@chakra-ui/react";
import { m, HTMLMotionProps } from "framer-motion";

interface AuraContainerProps extends ContainerProps {
  children: React.ReactNode;
  animate?: boolean;
}

const AURA_MOTION_PROPS: HTMLMotionProps<"div"> = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" }
};

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
      pb={{ base: "phi_2xl", md: "phi_3xl" }}
      {...(animate ? ({ as: m.div, ...AURA_MOTION_PROPS } as any) : {})}
    >
      <Container 
        maxW="7xl" 
        pt={{ base: "phi_xl", md: "phi_2xl" }} 
        {...props}
      >
        {children}
      </Container>
    </Box>
  );
};

export default React.memo(AuraContainer);
