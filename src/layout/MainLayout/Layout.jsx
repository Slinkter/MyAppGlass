/**
 * @file Layout.jsx
 * @description Root layout wrapper with glassmorphism background effect.
 */

import { Suspense, lazy } from "react";
import {
  Box,
  useBreakpointValue,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";

const FloatingWhatsApp = lazy(() =>
  import("../FloatingActions").then((module) => ({
    default: module.FloatingWhatsApp,
  })),
);

const Layout = ({ children }) => {
  const showFloatingWhatsApp = useBreakpointValue({ base: false, md: true });

  const bgGradient = useColorModeValue(
    "linear-gradient(135deg, blue.50 0%, white 50%, blue.100 100%)",
    "linear-gradient(135deg, gray.900 0%, gray.800 50%, blue.900 100%)"
  );

  return (
    <Box minH="100dvh" position="relative" bgGradient={bgGradient}>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={0}
        backdropFilter="blur(100px)"
        bg={useColorModeValue(
          "rgba(255, 255, 255, 0.7)",
          "rgba(0, 0, 0, 0.5)"
        )}
        pointerEvents="none"
      />

      <Box position="relative" zIndex={1}>
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
          maxW="7xl"
          mx="auto"
          px={{ base: 3, md: 4 }}
          pb={{ base: "80px", md: 0 }}
        >
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </Box>
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
