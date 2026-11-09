"use client";

import React from "react";
import { Box, HStack } from "@chakra-ui/react";
import RouterLink from "next/link";
import { Button } from "@/components/ui/button";
import NAV_ITEMS from "@/shared/config/nav-items";
import { glassSurface } from "@/shared/constants/glass";

import { useNavbarActiveSection, type NavbarSection } from "./hooks/useNavbarActiveSection";

export interface AuraDesktopNavProps {
  isScrolled?: boolean;
}

/**
 * @component AuraDesktopNav
 * @description Barra de navegación de escritorio estilo píldora/chip ultra-fluida,
 * basada en el patrón de SystemSelector con soporte completo para SSR, scroll-spy y routing de Next.js.
 */
const AuraDesktopNav: React.FC<AuraDesktopNavProps> = ({ isScrolled = false }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { activeSection, selectSection } = useNavbarActiveSection();

  // Auto-scroll centrado suave si la pantalla es más angosta
  React.useEffect(() => {
    if (!containerRef.current) return;
    const activeBtn = containerRef.current.querySelector<HTMLElement>('[data-active="true"]');
    activeBtn?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, [activeSection]);

  const getItemSectionKey = (item: (typeof NAV_ITEMS)[0]): NavbarSection => {
    if (item.href === "/") return "inicio";
    if (item.href === "/auth" || item.href.startsWith("/auth")) return "auth";
    if (item.href.includes("#servicios")) return "servicios";
    if (item.href.includes("#proyectos")) return "proyectos";
    if (item.href.includes("#ubicacion")) return "ubicacion";
    return "";
  };

  return (
    <HStack
      ref={containerRef}
      as="nav"
      aria-label="Navegación principal"
      {...glassSurface}
      bg={isScrolled ? { base: "whiteAlpha.800", _dark: "blackAlpha.700" } : glassSurface.bg}
      boxShadow={isScrolled ? "navDesktop" : "none"}
      transition="background-color 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s cubic-bezier(0.22, 1, 0.36, 1)"
      _motionReduce={{ transition: "none" }}
      p="2"
      borderRadius="full"
      display="inline-flex"
      maxW="full"
      overflowX="auto"
      gap="1.5"
      css={{
        "&::-webkit-scrollbar": { display: "none" },
        scrollbarWidth: "none",
        ...glassSurface.css,
      }}
    >
      {NAV_ITEMS.map((item) => {
        const itemKey = getItemSectionKey(item);
        const isActive = activeSection === itemKey;

        const handleClick = () => {
          if (itemKey) {
            selectSection(itemKey);
          }
        };

        return (
          <Button
            key={item.label}
            asChild
            className="group"
            data-active={isActive ? "true" : "false"}
            size={{ base: "sm", md: "md" }}
            variant={isActive ? "aura" : "ghost"}
            borderRadius="full"
            w={{ base: "auto", sm: "110px", xl: "130px" }}
            minW="20"
            h="11"
            minH="11"
            px={{ base: "3", sm: "0" }}
            flexShrink={0}
            fontWeight={isActive ? "bold" : "medium"}
            letterSpacing="0.05em"
            textAlign="center"
            justifyContent="center"
            position="relative"
            transition="transform 0.2s ease, background-color 0.2s ease"
            _hover={{
              transform: isActive ? "none" : "translateY(-1px)",
            }}
          >
            <RouterLink 
              href={item.href || "#"} 
              aria-current={isActive ? "page" : undefined}
              transitionTypes={['nav-forward']}
              onClick={handleClick}
            >
              <Box as="span" position="relative" display="inline-flex" alignItems="center" justifyContent="center">
                {item.label}
                <Box
                  as="span"
                  position="absolute"
                  bottom="-4px"
                  left="0"
                  right="0"
                  h="1.5px"
                  bg="brand.navy"
                  _dark={{ bg: "white" }}
                  transformOrigin="left"
                  transform={isActive ? "scaleX(1)" : "scaleX(0)"}
                  transition="transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)"
                  _groupHover={{ transform: "scaleX(1)" }}
                  _motionReduce={{ transition: "none" }}
                />
              </Box>
            </RouterLink>
          </Button>
        );
      })}
    </HStack>
  );
};

export default AuraDesktopNav;
