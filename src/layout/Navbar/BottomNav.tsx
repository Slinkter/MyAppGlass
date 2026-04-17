import { useColorMode, useColorModeValue } from "@/components/ui/color-mode-hooks";
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
 * @component BottomNav
 * @description Barra de navegación inferior flotante con diseño de "píldora".
 * Distribuye uniformemente los items usando flexbox.
 */
const BottomNav = () => {
  const location = useLocation();
  const { colorMode, toggleColorMode } = useColorMode();

  // Aura Design System Tokens
  const activeIconColor = "white"; 
  const inactiveIconColor = useColorModeValue("gray.500", "gray.400");

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
    // Añadimos el componente de Tema como elemento accionado por evento
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
        bg="surface.nav"
        backdropFilter="blur(10px)"
        px={1}
        py={1.5}
        borderRadius="full"
        shadow="xl"
        w="full"
        maxW="400px"
        border="1px solid"
        borderColor="border.glass"
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
            >
              {isActive && (
                <m.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "9999px",
                    backgroundColor: "var(--chakra-colors-primary-500)",
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                  }}
                />
              )}

              <Icon
                as={item.icon}
                w={{ base: 6, sm: 6 }}
                h={{ base: 6, sm: 6 }}
                position="relative"
                zIndex={1}
                color={isActive ? activeIconColor : inactiveIconColor}
                strokeWidth={isActive ? 2.5 : 2}
                transition="all 0.3s ease"
                transform={isActive ? "scale(1.1)" : "scale(1)"}
                _active={{ transform: "scale(0.9)" }}
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
                minH="44px"
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
              _focusVisible={{ outline: "none", boxShadow: "none" }}
              flex={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
              onClick={() => {
                if (isActive && !item.isExternal) {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              minH="44px"
            >
              {innerContent}
            </Link>
          );
        })}
      </Flex>
    </Box>
  );
};

export default BottomNav;
