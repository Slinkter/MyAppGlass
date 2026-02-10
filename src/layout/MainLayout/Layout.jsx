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
  useColorModeValue,
  useBreakpointValue,
  Link,
} from "@chakra-ui/react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
const FloatingWhatsApp = lazy(() =>
  import("../FloatingActions").then((module) => ({
    default: module.FloatingWhatsApp,
  })),
);

// ✅ Importamos las nuevas imágenes generadas
import bg_desktop from "@/assets/common/mainland.jpg";

/**
 * @component Layout
 * @description Root layout wrapper for the application.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered layout component.
 */
const Layout = ({ children }) => {
  // Overlay para mejorar legibilidad y efecto glass
  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.4)", // Modo claro: Capa blanca suave
    "rgba(0, 0, 0, 0.6)", // Modo oscuro: Capa oscura
  );

  const showFloatingWhatsApp = useBreakpointValue({ base: false, md: true });

  return (
    <Box
      minH="100dvh"
      backgroundImage={{
        base: `url(${bg_desktop})`, // Use desktop image for both
        md: `url(${bg_desktop})`,
      }}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundAttachment={{ base: "scroll", md: "fixed" }} // Fixed solo en desktop para performance
      position="relative"
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bg: bgColor,
        zIndex: 0,
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
      }}
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
        maxW="7xl"
        mx="auto"
        px={{ base: 2, md: 4 }}
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
    </Box>
  );
};

export default Layout;
