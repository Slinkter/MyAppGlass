"use client";

/**
 * @file AuraNavbar.tsx
 * @description Punto de entrada del encabezado de navegación responsivo premium.
 * @module layout/navbar
 * @remarks
 * Orquesta la navegación flotante para escritorio y la barra móvil siempre visible.
 * En escritorio la isla flotante ajusta su estado según el desplazamiento; en móvil
 * la barra permanece visible en todo momento (decisión de producto).
 */
import React from "react";
import { Box } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import AuraDesktopNav from "./AuraDesktopNav";
import { MobileNavbarV2 } from "./mobile";

/**
 * @component AuraNavbar
 * @description Orquestador principal de navegación con revelado por desplazamiento.
 */
const AuraNavbar = React.memo(() => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
            <AuraDesktopNav isScrolled={isScrolled} variant="studio" />
          </Box>
        </Box>
      )}

      {/* MOBILE NAVBAR (Always visible — no scroll-reveal).
          Se renderiza directamente, sin wrapper: un contenedor de 60 px de alto
          rompería `position: sticky` del propio header, que controla su display. */}
      <MobileNavbarV2 />
    </>
  );
});

AuraNavbar.displayName = "AuraNavbar";

export default AuraNavbar;
