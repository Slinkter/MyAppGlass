import React from "react";
import { Box, useColorModeValue } from "@chakra-ui/react";
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";
import FloatWhatsapp from "./floating-whatsapp";

// ✅ Importamos las nuevas imágenes generadas
import bg_desktop from "@/assets/common/mainland.jpg";
import bg_mobile from "@/assets/common/glass_bg_desktop.png";

/**
 * Componente: Layout
 * --------------------------------------------------------------------
 * @description
 * Envoltorio principal (Wrapper) de la aplicación que define la estructura visual base.
 *
 * Características principales:
 * 1. Fondo Responsivo: Cambia dinámicamente entre `bg_mobile` y `bg_desktop`
 *    según el breakpoint, optimizando la carga y composición visual.
 * 2. Efecto Glassmorphism Global: Aplica un overlay (`_before`) con desenfoque
 *    y color semitransparente para garantizar que el texto sea legible sobre el fondo.
 * 3. Estructura Semántica: Organiza el contenido en Navbar, Main y Footer.
 * 4. Botón Flotante: Incluye el widget de WhatsApp global.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - El contenido de la página actual (vistas).
 */
const Layout = ({ children }) => {
  // Overlay para mejorar legibilidad y efecto glass
  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.4)", // Modo claro: Capa blanca suave
    "rgba(0, 0, 0, 0.6)" // Modo oscuro: Capa oscura
  );

  return (
    <Box
      minH="100dvh"
      backgroundImage={{
        base: `url(${bg_mobile})`, // Móvil: Usa imagen vertical
        md: `url(${bg_desktop})`, // Desktop: Usa imagen horizontal
      }}
      backgroundSize="cover"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundAttachment={{ base: "scroll", md: "fixed" }} // Fixed solo en desktop para performance
      // bg={useColorModeValue("gray.50", "gray.900")}
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
    >
      <Box
        position="relative"
        maxW="7xl"
        mx="auto"
        px={{ base: 2, md: 4 }}
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
