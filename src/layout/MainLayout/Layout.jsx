/**
 * @file Layout.jsx
 * @description Root layout wrapper that establishes the visual baseline and global structure of the application.
 * @module layout/Layout
 * @remarks
 * - Implements a responsive background strategy using high-quality assets.
 * - Applies a global glassmorphism overlay to ensure content legibility across all pages.
 * - Integrates core navigation (Navbar) and information (Footer) components into a centered, constrained layout.
 */

import { Suspense, lazy } from "react";
import {
  Box,
  useBreakpointValue,
  Link,
} from "@chakra-ui/react";
import { AuraNavbar as Navbar } from "../Navbar";
import { Footer } from "../Footer";
import { ThemeToggle } from "../FloatingActions/ThemeToggle";
const FloatingWhatsApp = lazy(() =>
  import("../FloatingActions").then((module) => ({
    default: module.FloatingWhatsApp,
  })),
);

/**
 * @component Layout
 * @description Root layout wrapper for the application.
 */
const Layout = ({ children }) => {
  // Overlay para mejorar legibilidad y efecto glass
  const showFloatingWhatsApp = useBreakpointValue({ base: false, md: true });

  return (
    <Box
      minH="100dvh"
      position="relative"
      bg="bg.page"
      _dark={{ bg: "black" }}
    >
      {/* Skip Link for Accessibility */}
      <Link
        href="#main-content"
        position="absolute"
        top="-1000px"
        left="-1000px"
        w="1px"
        h="1px"
        overflow="hidden"
        _focus={{
          position: "static",
          width: "auto",
          height: "auto",
          display: "inline-block",
          p: "phi_sm",
          m: "phi_sm",
          border: "2px solid",
          borderColor: "text.accent",
          borderRadius: "md",
          bg: "bg.page",
          color: "text.heading",
          zIndex: "9999",
        }}
      >
        Saltar al contenido principal
      </Link>
      
      <Box
        position="relative"
        maxW="1440px"
        mx="auto"
        px={{ base: "phi_md", md: "phi_xl" }}
        pb="phi_md"
        zIndex={1}
      >
        <Navbar />
        <Box as="main" id="main-content">
          {children}
        </Box>
        <Footer />
      </Box>

      {showFloatingWhatsApp && (
        <Suspense fallback={null}>
          <FloatingWhatsApp />
        </Suspense>
      )}

      <ThemeToggle />
    </Box>
  );
};

export default Layout;
