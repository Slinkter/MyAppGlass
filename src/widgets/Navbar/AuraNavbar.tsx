"use client";

/**
 * @file AuraNavbar.tsx
 * @description Punto de entrada del encabezado de navegación responsivo premium.
 * @module layout/navbar
 * @remarks
 * Orquesta la navegación flotante para escritorio y el disparador táctico para móviles.
 * La barra solo se revela al hacer desplazamientos superiores a 20px (scroll-reveal).
 */
import React from "react";
import { Box } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import AuraDesktopNav from "./AuraDesktopNav";
import MobileNav from "./MobileNav";

/**
 * @component AuraNavbar
 * @description Orquestador principal de navegación con revelado por desplazamiento.
 */
const AuraNavbar = React.memo(() => {
  const pathname = usePathname();

  // Esconder el Navbar público en todas las rutas administrativas del dashboard
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const isServicesPage = pathname.startsWith("/servicios");

  return (
    <>
      {/* DESKTOP NAVBAR (Aura Floating Island - Oculto en /servicios para experiencia inmersiva) */}
      {!isServicesPage && (
        <Box
          as="header"
          position="sticky"
          top="6"
          zIndex="sticky"
          display={{ base: "none", md: "flex" }}
          justifyContent="center"
          w="full"
          pointerEvents="auto"
          opacity={1}
          transition="box-shadow 0.3s ease"
        >
          <Box pointerEvents="auto">
            <AuraDesktopNav />
          </Box>
        </Box>
      )}

      {/* MOBILE NAVBAR (Always visible — no scroll-reveal) */}
      <Box display={{ base: "block", md: "none" }}>
        <MobileNav />
      </Box>
    </>
  );
});

AuraNavbar.displayName = "AuraNavbar";

export default AuraNavbar;
