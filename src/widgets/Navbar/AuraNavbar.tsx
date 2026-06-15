"use client";

/**
 * @file AuraNavbar.tsx
 * @description Premium responsive navigation header entry point.
 * @module layout/navbar
 * @remarks
 * Orchestrates the floating island navigation for Desktop and the tactical trigger for Mobile.
 * Navbar only renders when scrolled past 20px (scroll-reveal).
 */
import React from "react";
import { Box } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import AuraDesktopNav from "./AuraDesktopNav";
import MobileNav from "./MobileNav";

/**
 * @component AuraNavbar
 * @description Main navigation orchestrator with scroll-reveal.
 */
const AuraNavbar = React.memo(() => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    setScrolled(false);

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  return (
    <>
      {/* DESKTOP NAVBAR (Aura Floating Island) */}
      <Box
        as="header"
        position="sticky"
        top="6"
        zIndex="sticky"
        display={{ base: "none", md: "flex" }}
        justifyContent="center"
        w="full"
        pointerEvents="none"
        opacity={scrolled ? 1 : 0}
        transform={scrolled ? "translateY(0)" : "translateY(-24px)"}
        transition="opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
      >
        <Box pointerEvents="auto">
          <AuraDesktopNav />
        </Box>
      </Box>

      {/* MOBILE NAVBAR (Tactical Floating Trigger) */}
      <Box
        display={{ base: "block", md: "none" }}
        opacity={scrolled ? 1 : 0}
        transition="opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
      >
        <MobileNav />
      </Box>
    </>
  );
});

AuraNavbar.displayName = "AuraNavbar";

export default AuraNavbar;
