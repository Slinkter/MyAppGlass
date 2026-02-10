/**
 * @file Navbar.jsx
 * @description Responsive navigation header that switches between desktop and mobile views.
 * @module layout/navbar
 */

import React from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
export default function Navbar() {
  // Estilos Glassmorphism para Desktop
  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.1)",
    "rgba(0, 0, 0, 0.1)",
  );
  const textColor = useColorModeValue("gray.800", "gray.100");

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <Box
        as="header"
        position="sticky"
        top="6"
        zIndex="sticky"
        py={4}
        px={{ base: 4, md: 0 }}
        display={{ base: "none", md: "block" }}
      >
        <Flex
          as="nav"
          bg={bgColor}
          color={textColor}
          minH="60px"
          py={{ base: 2 }}
          px={{ base: 4 }}
          align="center"
          justifyContent="center"
          position="relative"
          maxW="7xl"
          mx="auto"
          // Glassmorphism effects
          backdropFilter="blur(10px)"
          border="none"
          borderRadius="2xl"
          boxShadow="sm"
        >
          <Flex flex={{ base: 1 }} justifyContent="center" alignItems="center">
            <DesktopNav />
          </Flex>
        </Flex>
      </Box>

      {/* MOBILE NAVBAR */}
      <MobileNav />
    </>
  );
}
