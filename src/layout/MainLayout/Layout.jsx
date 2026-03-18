/**
 * @file Layout.jsx
 * @description Root layout wrapper with geometric pattern background for architecture company.
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

  const bgColor = useColorModeValue("gray.100", "gray.900");
  const lineColor = useColorModeValue("primary.200", "primary.900");

  return (
    <Box minH="100dvh" position="relative" bg={bgColor}>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={0}
        overflow="hidden"
        pointerEvents="none"
      >
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", top: 0, left: 0 }}
        >
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
              patternTransform="rotate(45)"
            >
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke={lineColor}
                strokeWidth="0.5"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgGradient={useColorModeValue(
            "linear-gradient(135deg, white 0%, transparent 50%, white 100%)",
            "linear-gradient(135deg, transparent 0%, gray.800 50%, transparent 100%)"
          )}
          opacity={0.5}
        />
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
