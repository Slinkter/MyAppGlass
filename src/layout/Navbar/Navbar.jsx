/**
 * @file Navbar.jsx
 * @description Responsive navigation header that switches between desktop and mobile views.
 * @module layout/navbar
 */
import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

export default function Navbar() {
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
          bg="surface.nav"
          color="text.body"
          backdropFilter="blur(10px)"
          minH="60px"
          py="phi_xs"
          px="phi_lg"
          align="center"
          justifyContent="center"
          position="relative"
          maxW="1440px"
          mx="auto"
          // Aura Glass Effects
          border="1px solid"
          borderColor="border.glass"
          borderRadius="card"
          boxShadow="lg"
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
