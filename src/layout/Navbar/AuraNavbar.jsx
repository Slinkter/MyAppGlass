/**
 * @file AuraNavbar.jsx
 * @description Premium responsive navigation header with Aura Liquid Glass effects.
 * @module layout/navbar
 */
import React from "react";
import AuraDesktopNav from "./AuraDesktopNav";
import MobileNav from "./MobileNav";
import { ColorModeButton } from "@/components/ui/color-mode";
import { Box, Flex } from "@chakra-ui/react";

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

      {/* MOBILE NAVBAR (Floating Trigger & Theme Toggle) */}
      <Box display={{ base: "block", md: "none" }}>
        {/* Toggle de Tema en lugar de Logo (Esquina Superior Izquierda) */}
        <Box 
          position="fixed" 
          top="phi_md" 
          left="phi_md" 
          zIndex={1100}
        >
          <ColorModeButton 
            size="xl" 
            variant="ghost"
            bg="bg.glass"
            backdropFilter="blur(16px)"
            borderRadius="full"
            border="1px solid"
            borderColor="border.glass"
            boxShadow="glass"
            color="text.accent"
            _hover={{ transform: "scale(1.1)", boxShadow: "2xl" }}
            _active={{ transform: "scale(0.9)" }}
            css={{
              "& svg": { width: "24px", height: "24px" }
            }}
          />
        </Box>
        
        <MobileNav />
      </Box>
    </>
  );
});

AuraNavbar.displayName = "AuraNavbar";

export default AuraNavbar;
