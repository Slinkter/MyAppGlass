/**
 * @file AuraContainer.jsx
 * @description Standardized page container with Aura spacing and motion entry.
 */

import React from "react";
import { Container, Box } from "@chakra-ui/react";
import { m } from "framer-motion";

/**
 * @component AuraContainer
 * @param {React.ReactNode} children
 * @param {boolean} animate - Whether to apply entry animation.
 */
const AuraContainer = ({ children, animate = true, ...props }) => {
  const motionProps = animate ? {
    as: m.div,
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" }
  } : {};

  return (
    <Box 
      bg="bg.page" 
      minH="100vh" 
      pb={{ base: "phi_2xl", md: "phi_3xl" }}
      {...motionProps}
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
