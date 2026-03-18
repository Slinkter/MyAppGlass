/**
 * @file Layout.jsx
 * @description Root layout wrapper with parallax background effect.
 */

import { Suspense, lazy, useState, useEffect } from "react";
import {
  Box,
  useBreakpointValue,
  useColorModeValue,
  Link,
  Image,
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

  const bgImage = useBreakpointValue({
    base: mainlandBgMobile,
    md: mainlandBg,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.3;

  return (
    <Box minH="100dvh" position="relative" m={0} p={0}>
      <Box
        position="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        zIndex={0}
        overflow="hidden"
      >
        <Image
          src={bgImage}
          alt=""
          position="absolute"
          top={-parallaxOffset}
          left={0}
          w="100%"
          h="calc(100% + 300px)"
          objectFit="cover"
          objectPosition="center"
          pointerEvents="none"
        />
        <Box
          position="absolute"
          inset={0}
          bgGradient="linear(to-b, blackAlpha.600, blackAlpha.400, blackAlpha.700)"
        />
      </Box>

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
        px={{ base: 3, md: 4 }}
        pb={{ base: "80px", md: 0 }}
        zIndex={1}
      >
        <Navbar />
        <Box
          bg={useColorModeValue(
            "rgba(255, 255, 255, 0.88)",
            "rgba(26, 26, 26, 0.85)"
          )}
          borderRadius="2xl"
          p={{ base: 4, md: 6 }}
          minH="calc(100dvh - 200px)"
        >
          <main id="main-content">{children}</main>
        </Box>
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
