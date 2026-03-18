/**
 * @file Layout.jsx
 * @description Root layout wrapper with gradient and subtle glass texture for architecture company.
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
    "linear-gradient(160deg, blue.50 0%, white 30%, blue.100 70%, gray.100 100%)",
    "linear-gradient(160deg, gray.900 0%, blue.900 40%, gray.800 100%)"
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
        overflow="hidden"
        pointerEvents="none"
        opacity={0.4}
      >
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <defs>
            <filter id="noise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="4"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>
          <rect width="100%" height="100%" filter="url(#noise)" opacity="0.08" />
        </svg>

        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <defs>
            <pattern
              id="lines"
              width="100"
              height="20"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(-5)"
            >
              <line
                x1="0"
                y1="10"
                x2="100"
                y2="10"
                stroke={useColorModeValue("primary.300", "primary.700")}
                strokeWidth="0.3"
                opacity="0.15"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lines)" />
        </svg>
      </Box>

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
