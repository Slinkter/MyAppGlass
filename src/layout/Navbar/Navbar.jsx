/**
 * @file Navbar.jsx
 * @description Responsive navigation header that switches between desktop and mobile views.
 * @module layout/navbar
 */
import React from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import DesktopNav from "./DesktopNav";
import BottomNav from "./BottomNav";

export default function Navbar() {
  // Estilos High Performance Solid
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.100");
  const textColor = useColorModeValue("gray.800", "gray.100");

  return (
    <>
      {/* DESKTOP NAVBAR */}
      <Box
        as="header"
        position="sticky"
        top="6"
        zIndex="sticky"
        py={6}
        px={{ base: 4, md: 0 }}
        display={{ base: "none", md: "block" }}
      >
        <Flex
          as="nav"
          bg={useColorModeValue(
            "rgba(255, 255, 255, 0.8)",
            "rgba(15, 15, 15, 0.8)",
          )}
          backdropFilter="blur(12px)"
          color={textColor}
          minH="60px"
          py={{ base: 2 }}
          px={{ base: 4 }}
          align="center"
          justifyContent="center"
          position="relative"
          maxW="7xl"
          mx="auto"
          // Solid effects
          border="1px solid"
          borderColor={borderColor}
          borderRadius="2xl"
          boxShadow="xl"
        >
          <Flex flex={{ base: 1 }} justifyContent="center" alignItems="center">
            <DesktopNav />
          </Flex>
        </Flex>
      </Box>

      {/* MOBILE NAVBAR */}
      <BottomNav />
    </>
  );
}
