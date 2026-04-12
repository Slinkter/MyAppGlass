/**
 * @file AuraNavbar.jsx
 * @description Premium responsive navigation header with Aura Liquid Glass effects.
 * @module layout/navbar
 */
import React from "react";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import AuraDesktopNav from "./AuraDesktopNav";
import AuraBottomNav from "./AuraBottomNav";

/**
 * @component AuraNavbar
 * @description Header con estética "Liquid Glass" para MyAppGlass.
 */
const AuraNavbar = () => {
  // ... (keeping previous glassBg and blurAmount)
  const glassBg = useColorModeValue(
    "rgba(255, 255, 255, 0.75)", 
    "rgba(24, 24, 27, 0.65)"
  );
  const blurAmount = "12px";

  return (
    <>
      {/* DESKTOP NAVBAR (Aura Liquid Glass) */}
      <Box
        as="header"
        position="sticky"
        top="phi_lg"
        zIndex="sticky"
        display={{ base: "none", md: "block" }}
        transition="all 0.5s ease"
      >
        <Flex
          as="nav"
          bg={glassBg}
          backdropFilter={`blur(${blurAmount}) saturate(1.8)`}
          minH="58px"
          py="phi_xs"
          px="phi_lg"
          align="center"
          justifyContent="center"
          position="relative"
          maxW="fit-content"
          mx="auto"
          // Aura Liquid Border & Glow
          border="1px solid"
          borderColor="border.glass"
          borderRadius="full"
          boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.12)"
          _hover={{
            boxShadow: "0 12px 42px 0 rgba(0, 0, 0, 0.18)",
            transform: "translateY(-1px)",
          }}
          transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
        >
          <Flex flex={{ base: 1 }} justifyContent="center" alignItems="center">
            <AuraDesktopNav />
          </Flex>
        </Flex>
      </Box>

      {/* MOBILE NAVBAR (Aura Mobile Dock) */}
      <Box display={{ base: "block", md: "none" }}>
        <AuraBottomNav />
      </Box>
    </>
  );
};

export default AuraNavbar;
