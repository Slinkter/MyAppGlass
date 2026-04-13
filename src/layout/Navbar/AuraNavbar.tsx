"use client";

/**
 * @file AuraNavbar.tsx
 * @description Premium responsive navigation header with Aura Liquid Glass effects.
 * @module layout/navbar
 */
import React, { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import AuraDesktopNav from "./AuraDesktopNav";
import MobileNav from "./MobileNav";

/**
 * @component AuraNavbar
 * @description Header con estética "Liquid Glass" para MyAppGlass.
 */
const AuraNavbar = React.memo(() => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const glassBg = useColorModeValue(
    "rgba(255, 255, 255, 0.75)", 
    "rgba(24, 24, 27, 0.65)"
  );
  const blurAmount = "12px";

  // Evita la hidratación mismatch renderizando un placeholder o nada hasta que el cliente esté listo
  if (!mounted) {
    return <Box as="header" position="sticky" top="phi_lg" zIndex="sticky" display={{ base: "none", md: "block" }} h="58px" />;
  }

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

      {/* MOBILE NAVBAR (Hamburger Menu) */}
      <Box display={{ base: "block", md: "none" }}>
        {/* @ts-ignore */}
        <MobileNav />
      </Box>
    </>
  );
});

AuraNavbar.displayName = "AuraNavbar";

export default AuraNavbar;
