/**
 * @file Layout.jsx
 * @description Root layout wrapper - Warm bone/beige with gray gradient
 */

import { Suspense, lazy } from "react";
import {
  Box,
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

const Layout = ({ children }) => {
  const showFloatingWhatsApp = useBreakpointValue({ base: false, md: true });

  const bgGradient = useBreakpointValue({
    base: "linear-gradient(180deg, gray.700 0%, warmGray.700 25%, warmGray.600 50%, gray.600 75%, warmGray.500 100%)",
    md: "linear-gradient(140deg, gray.700 0%, warmGray.700 15%, warmGray.600 35%, gray.600 55%, warmGray.500 75%, gray.500 100%)",
  });

  return (
    <Box minH="100dvh" position="relative" bgGradient={bgGradient}>
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
