/**
 * @file Layout.jsx
 * @description Root layout wrapper - Solid warm gray background (Opción 1)
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

  const bgColor = useBreakpointValue({
    base: "gray.100",
    md: "gray.200",
  });

  return (
    <Box minH="100dvh" position="relative" bg={bgColor}>
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
