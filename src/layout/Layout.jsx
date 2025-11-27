import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import FloatWhatsapp from "./floating-whatsapp";

// ✅ Importamos las nuevas imágenes generadas
import bg_desktop from "../assets/common/glass_bg_desktop.png";
import bg_mobile from "../assets/common/glass_bg_mobile.png";

const Layout = ({ children }) => {
  // Overlay para mejorar legibilidad y efecto glass
  const overlayColor = useColorModeValue(
    "rgba(255, 255, 255, 0.4)", // Modo claro: Capa blanca suave
    "rgba(0, 0, 0, 0.6)" // Modo oscuro: Capa oscura
  );

  return (
    <Box
      minH="100dvh"
      // 🚀 RESPONSIVE BACKGROUND
      backgroundImage={{
        base: `url(${bg_mobile})`, // Móvil: Usa imagen vertical
        md: `url(${bg_desktop})`, // Desktop: Usa imagen horizontal
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
        bg: overlayColor,
        zIndex: 0,
        // Efecto de desenfoque sutil en el fondo para resaltar el contenido
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
      }}
    >
      <Box
        maxW="7xl"
        mx="auto"
        px={{ base: 4, md: 8 }}
        position="relative"
        zIndex={1}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
      </Box>

      <FloatWhatsapp />
    </Box>
  );
};

export default Layout;
