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
import { Navbar } from "../Navbar";
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
      m={0}
      p={0}
    >
      {/* Skip Link */}
      <Link
        href="#main-content"
        sx={{
          position: "absolute",
          top: "-1000px",
          left: "-1000px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          ":focus": {
            position: "static",
            width: "auto",
            height: "auto",
            display: "inline-block",
            p: "8px",
            m: "8px",
            border: "2px solid",
            borderColor: "blue.500",
            borderRadius: "md",
            bg: "white",
            color: "blue.700",
            zIndex: "9999",
          },
        }}
      >
        Saltar al contenido principal
      </Link>
      <Box
        position="relative"
        maxW="1440px"
        mx="auto"
        px={{ base: "phi_lg", md: "phi_xl" }}
        pb={{ base: "84px", md: 0 }}
        zIndex={1}
      >
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </Box>

      {showFloatingWhatsApp && (
        <Suspense fallback={null}>
          <FloatingWhatsApp />
        </Suspense>
      )}

      {/* Theme Toggle is always visible and natively supported by Chakra */}
      <ThemeToggle />
    </Box>
  );
};

export default Layout;
