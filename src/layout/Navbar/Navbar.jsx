/**
 * @file Navbar.jsx
 * @description Responsive navigation header that switches between desktop and mobile views.
 * @module layout/navbar
 */
import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import DesktopNav from "./DesktopNav";
import BottomNav from "./BottomNav";

export default function Navbar() {
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
          bg="surface.nav"
          color="text.body"
          minH="60px"
          py={{ base: 2 }}
          px={{ base: 4 }}
          align="center"
          justifyContent="center"
          position="relative"
          maxW="7xl"
          mx="auto"
          border="1px solid"
          borderColor="border.nav"
          borderRadius="2xl"
          boxShadow="none"
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
