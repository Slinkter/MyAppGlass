/**
 * @file AuraNavbar.jsx
 * @description Premium responsive navigation header with Aura Liquid Glass effects.
 * @module layout/navbar
 */
import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import AuraDesktopNav from "./AuraDesktopNav";
import MobileNav from "./MobileNav";

/**
 * @component AuraNavbar
 * @description Header con estética "Liquid Glass" para MyAppGlass.
 */
const AuraNavbar = React.memo(() => {
  return (
    <>
      {/* DESKTOP NAVBAR (Aura Liquid Glass) */}
      <Box
        as="header"
        position="sticky"
        top="phi_md"
        zIndex="sticky"
        display={{ base: "none", md: "block" }}
      >
        <Flex
          as="nav"
          bg="bg.glass"
          backdropFilter="blur(16px) saturate(180%)"
          minH="64px"
          py="phi_xs"
          px="phi_lg"
          align="center"
          justifyContent="center"
          position="relative"
          maxW="fit-content"
          mx="auto"
          border="1px solid"
          borderColor="border.glass"
          borderRadius="full"
          boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.08)"
          transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
          _hover={{
            boxShadow: "0 12px 42px 0 rgba(0, 0, 0, 0.15)",
            transform: "translateY(-1px)",
          }}
        >
          <Flex flex={1} justifyContent="center" alignItems="center">
            <AuraDesktopNav />
          </Flex>
        </Flex>
      </Box>

      {/* MOBILE NAVBAR (Floating Trigger) */}
      <Box display={{ base: "block", md: "none" }}>
        <MobileNav />
      </Box>
    </>
  );
});

AuraNavbar.displayName = "AuraNavbar";

export default AuraNavbar;
