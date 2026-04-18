"use client";

/**
 * @file AuraNavbar.tsx
 * @description Premium responsive navigation header entry point.
 * @module layout/navbar
 * @remarks
 * Orchestrates the floating island navigation for Desktop and the tactical trigger for Mobile.
 */
import React from "react";
import { Box } from "@chakra-ui/react";
import AuraDesktopNav from "./AuraDesktopNav";
import MobileNav from "./MobileNav";

/**
 * @component AuraNavbar
 * @description Main navigation orchestrator for MyAppGlass.
 */
const AuraNavbar = React.memo(() => {
  return (
    <>
      {/* DESKTOP NAVBAR (Aura Floating Island) */}
      <Box
        as="header"
        position="sticky"
        top="phi_md"
        zIndex="sticky"
        display={{ base: "none", md: "flex" }}
        justifyContent="center"
        w="full"
        pointerEvents="none" // Allows clicks through the header area but not the nav itself
      >
        <Box pointerEvents="auto">
          <AuraDesktopNav />
        </Box>
      </Box>

      {/* MOBILE NAVBAR (Tactical Floating Trigger) */}
      <Box display={{ base: "block", md: "none" }}>
        <MobileNav />
      </Box>
    </>
  );
});

AuraNavbar.displayName = "AuraNavbar";

export default AuraNavbar;
