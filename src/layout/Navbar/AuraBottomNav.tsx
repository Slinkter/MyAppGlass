import { useColorMode, useColorModeValue } from "@/components/ui/color-mode-hooks";
/**
 * @file AuraBottomNav.tsx
 * @description Premium mobile navigation dock with Aura Liquid Glass effects and sliding indicators.
 * @module layout/navbar
 */
import React from "react";
import { Box, Flex, Icon, Link } from "@chakra-ui/react";
import RouterLink from "next/link";
import { usePathname as useLocation } from "next/navigation";;
import {
  Home,
  Wrench,
  Building2,
  Phone,
  Sun,
  Moon,
  LucideIcon,
} from "lucide-react";
import { m } from "framer-motion";
import { companyData } from "@/config/company-data";

interface NavItem {
  label: string;
  icon: LucideIcon;
  path?: string;
  isExternal?: boolean;
  isAction?: boolean;
  onClick?: () => void;
}

/**
 * @component AuraBottomNav
 * @description Dock de navegación móvil con estética "Liquid Glass" y animaciones fluidas.
 */
const AuraBottomNav = () => {
  const location = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();

  // Configuración de efectos de vidrio premium para el Dock
  const glassBg = useColorModeValue(
    "rgba(255, 255, 255, 0.75)", 
    "rgba(24, 24, 27, 0.65)"
  );
  const blurAmount = "16px";

  // Items de Navegación
  const navItems: NavItem[] = [
    { label: "Inicio", icon: Home, path: "/" },
    { label: "Servicios", icon: Wrench, path: "/servicios" },
    { label: "Proyectos", icon: Building2, path: "/proyectos" },
    {
      label: "Contacto",
      icon: Phone,
      path: `https://wa.me/${companyData.whatsappNumber}`,
      isExternal: true,
    },
    {
      label: "Tema",
      icon: colorMode === "dark" ? Sun : Moon,
      onClick: toggleColorMode,
      isAction: true,
    }
  ];

  return (
    <Box
      position="fixed"
      bottom={6}
      left={0}
      right={0}
      display={{ base: "flex", md: "none" }}
      justifyContent="center"
      px={4}
      zIndex="sticky"
    >
      <Flex
        as={m.nav}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        align="center"
        justify="space-evenly"
        bg={glassBg}
        backdropFilter={`blur(${blurAmount}) saturate(1.8)`}
        px={1}
        py={1.5}
        borderRadius="full"
        w="full"
        maxW="400px"
        border="1px solid"
        borderColor="border.glass"
        boxShadow="0 8px 32px 0 rgba(0, 0, 0, 0.15)"
      >
        {navItems.map((item) => {
          const isActive = !item.isAction && location === item.path;

          const innerContent = (
            <Flex
              position="relative"
              w={{ base: "44px", sm: "52px" }}
              h={{ base: "44px", sm: "48px" }}
              justify="center"
              align="center"
              borderRadius="full"
              zIndex={1}
            >
              {/* Sliding Active Indicator */}
              {isActive && (
                <Box
                  as={m.div}
                  layoutId="aura-mobile-indicator"
                  position="absolute"
                  inset="2px"
                  bg="surface.icon"
                  borderRadius="full"
                  border="1px solid"
                  borderColor="border.glass"
                  zIndex={-1}
                  transition={{
                    type: "spring",
                    bounce: 0.25,
                    stiffness: 130,
                    damping: 18
                  }}
                />
              )}

              <Icon
                as={item.icon}
                w={5}
                h={5}
                position="relative"
                zIndex={1}
                color={isActive ? "text.accent" : "text.body"}
                strokeWidth={isActive ? 2.5 : 2}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                transform={isActive ? "scale(1.15)" : "scale(1)"}
              />
            </Flex>
          );

          if (item.isAction) {
            return (
              <Box
                key={item.label}
                as="button"
                onClick={item.onClick}
                flex={1}
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{ WebkitTapHighlightColor: "transparent" }}
                _focus={{ outline: "none" }}
                aria-label={`Cambiar a modo ${colorMode === 'dark' ? 'claro' : 'oscuro'}`}
              >
                {innerContent}
              </Box>
            );
          }

          return (
            <Link
              key={item.label}
              as={item.isExternal ? "a" : RouterLink}
              href={!item.isExternal ? item.path : undefined}
              href={item.isExternal ? item.path : undefined}
              isExternal={item.isExternal}
              style={{
                textDecoration: "none",
                WebkitTapHighlightColor: "transparent",
                outline: "none",
              }}
              _focus={{ outline: "none", boxShadow: "none" }}
              flex={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
              onClick={() => {
                if (isActive && !item.isExternal) {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
            >
              {innerContent}
            </Link>
          );
        })}
      </Flex>
    </Box>
  );
};

export default AuraBottomNav;
