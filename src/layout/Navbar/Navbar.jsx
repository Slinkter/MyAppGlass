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
        top="phi_lg"
        zIndex="sticky"
        py="phi_lg"
        px={{ base: "phi_lg", md: 0 }}
        display={{ base: "none", md: "block" }}
      >
        <Flex
          as="nav"
          bg={useColorModeValue(
            "white",
            "primary.800",
          )}
          color={textColor}
          minH="60px"
          py="phi_xs"
          px="phi_lg"
          align="center"
          justifyContent="center"
          position="relative"
          maxW="1440px"
          mx="auto"
          // Solid effects
          border="1px solid"
          borderColor={borderColor}
          borderRadius="card"
          boxShadow="md"
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
