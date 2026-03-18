/**
 * @file Layout.jsx
 * @description Root layout wrapper with parallax mainland background.
 */

import { Suspense, lazy, useState, useEffect } from "react";
import {
  Box,
  useBreakpointValue,
  Link,
} from "@chakra-ui/react";
import { Navbar } from "../Navbar";
import { Footer } from "../Footer";
import mainlandBg from "@/assets/common/mainland.jpg";
import mainlandBgMobile from "@/assets/common/mainlandMobile.jpg";

const FloatingWhatsApp = lazy(() =>
  import("../FloatingActions").then((module) => ({
    default: module.FloatingWhatsApp,
  })),
);

const Layout = ({ children }) => {
  const showFloatingWhatsApp = useBreakpointValue({ base: false, md: true });
  const [scrollY, setScrollY] = useState(0);
  const [docHeight, setDocHeight] = useState(0);

  const bgImage = useBreakpointValue({
    base: mainlandBgMobile,
    md: mainlandBg,
  });

  useEffect(() => {
    const updateDocHeight = () => {
      setDocHeight(document.body.offsetHeight);
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    updateDocHeight();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateDocHeight);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateDocHeight);
    };
  }, []);

  const parallaxOffset = scrollY * 0.3;
  const bgHeight = Math.max(docHeight, window.innerHeight) + 200;

  return (
    <Box minH="100dvh" position="relative">
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={0}
        overflow="hidden"
      >
        <Box
          as="img"
          src={bgImage}
          alt=""
          position="absolute"
          top={-parallaxOffset}
          left={0}
          w="100%"
          h={`${bgHeight}px`}
          objectFit="cover"
          objectPosition="center top"
          pointerEvents="none"
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
