"use client";

import React from "react";
import { HStack } from "@chakra-ui/react";
import RouterLink from "next/link";
import { Button } from "@/shared/ui/button";
import NAV_ITEMS, { ACCOUNT_NAV_ITEM, type NavItem } from "@/shared/config/nav-items";
import { glassSurface } from "@/shared/constants/glass";

import { useNavbarActiveSection, type NavbarSection } from "./hooks/useNavbarActiveSection";

export interface AuraDesktopNavProps {
  isScrolled?: boolean;
  /** Se conserva por compatibilidad: solo existe la variante "studio" (pastilla negra, texto en oración, vidrio). */
  variant?: "studio" | "default";
  /** Solo para vistas previas: fija la sección activa sin depender del scroll. */
  previewActive?: NavbarSection;
}

const DESKTOP_ITEMS: NavItem[] = [...NAV_ITEMS, ACCOUNT_NAV_ITEM];

const getItemSectionKey = (item: NavItem): NavbarSection => {
  if (item.href === "/") return "inicio";
  if (item.href.startsWith("/mi-cuenta") || item.href.startsWith("/auth")) return "auth";
  if (item.href.startsWith("/contacto")) return "contacto";
  if (item.href.includes("#servicios")) return "servicios";
  if (item.href.includes("#proyectos")) return "proyectos";
  if (item.href.includes("#ubicacion")) return "ubicacion";
  return "";
};

/**
 * @component AuraDesktopNav
 * @description Barra de navegación de escritorio en píldora de vidrio con scroll-spy.
 * Ítems de 44 px exactos, pastilla activa en tinta de marca y foco visible explícito.
 */
const AuraDesktopNav: React.FC<AuraDesktopNavProps> = ({ previewActive }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { activeSection: liveSection, selectSection } = useNavbarActiveSection();
  const activeSection = previewActive ?? liveSection;

  // Centra el ítem activo dentro de la barra si la pantalla es angosta.
  // Se desplaza solo el contenedor en horizontal: `scrollIntoView` movía también la página en vertical.
  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const activeBtn = container.querySelector<HTMLElement>('[data-active="true"]');
    if (!activeBtn || container.scrollWidth <= container.clientWidth) return;
    const containerRect = container.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    const left =
      container.scrollLeft + (btnRect.left - containerRect.left) - (container.clientWidth - btnRect.width) / 2;
    container.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [activeSection]);

  return (
    <HStack
      ref={containerRef}
      as="nav"
      aria-label="Navegación principal"
      {...glassSurface}
      borderColor="border.subtle"
      boxShadow="navDesktop"
      p="1.5"
      borderRadius="full"
      display="inline-flex"
      maxW="full"
      overflowX="auto"
      gap="1"
      css={{
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
        ...glassSurface.css,
      }}
    >
      {DESKTOP_ITEMS.map((item) => {
        const itemKey = getItemSectionKey(item);
        const isActive = activeSection === itemKey;

        return (
          <Button
            key={item.href}
            asChild
            data-active={isActive ? "true" : "false"}
            variant={isActive ? "primary" : "ghost"}
            borderRadius="full"
            minW="11"
            minH="11"
            h="11"
            display="inline-flex"
            alignItems="center"
            justifyContent="center"
            px="5"
            flexShrink={0}
            fontFamily="body"
            fontWeight={isActive ? "semibold" : "medium"}
            fontSize="sm"
            letterSpacing="normal"
            textTransform="none"
            whiteSpace="nowrap"
            transition="background-color 0.2s ease, color 0.2s ease"
            _focusVisible={{
              outline: "2px solid",
              outlineColor: "ring.primary",
              outlineOffset: "2px",
            }}
            _motionReduce={{ transition: "none" }}
          >
            <RouterLink
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              transitionTypes={["nav-forward"]}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "44px",
                height: "44px",
              }}
              onClick={() => {
                if (itemKey) selectSection(itemKey);
              }}
            >
              {item.label}
            </RouterLink>
          </Button>
        );
      })}
    </HStack>
  );
};

export default AuraDesktopNav;
