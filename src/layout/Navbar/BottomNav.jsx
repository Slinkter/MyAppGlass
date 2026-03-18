import React from "react";
import {
  Box,
  Flex,
  useColorModeValue,
  Icon,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import {
  HomeIcon,
  WrenchScrewdriverIcon,
  BuildingOffice2Icon,
} from "@heroicons/react/24/outline";
import { FaWhatsapp } from "react-icons/fa";
import { LazyMotion, m, domAnimation } from "framer-motion";
import { companyData } from "@/config/company-data";

/**
 * @component BottomNav
 * @description Barra de navegación inferior flotante con diseño de "píldora".
 * Distribuye uniformemente los items usando flexbox.
 */
const BottomNav = () => {
  const location = useLocation();

  // Configuración de Colores (High Performance Solid)
  const containerBg = useColorModeValue(
    "rgba(255, 255, 255, 0.98)", // Blanco sólido
    "rgba(15, 15, 15, 0.98)", // Negro sólido
  );
  const containerBorder = useColorModeValue("gray.200", "whiteAlpha.200");
  const activeIconColor = "white"; // Contraste contra la burbuja
  const inactiveIconColor = useColorModeValue("gray.500", "gray.400");

  // Items de Navegación
  const navItems = [
    { label: "Inicio", icon: HomeIcon, path: "/" },
    { label: "Servicios", icon: WrenchScrewdriverIcon, path: "/servicios" },
    { label: "Proyectos", icon: BuildingOffice2Icon, path: "/proyectos" },
    {
      label: "Contacto",
      icon: FaWhatsapp,
      path: `https://wa.me/${companyData.whatsappNumber}`,
      isExternal: true,
    },
  ];

  return (
    <LazyMotion features={domAnimation}>
    <Box
      position="fixed"
      bottom={6}
      left={0}
      right={0}
      display={{ base: "flex", md: "none" }}
      justifyContent="center"
      px={6}
      zIndex="sticky"
    >
      <Flex
        as={m.nav}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
        align="center"
        justify="space-between"
        bg={containerBg}
        px={2}
        py={2}
        borderRadius="xl"
        shadow="none"
        w="full"
        maxW="340px"
        border="1px solid"
        borderColor={containerBorder}
      >
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.label}
              as={item.isExternal ? "a" : RouterLink}
              to={!item.isExternal ? item.path : undefined}
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
                <Box position="relative" px={5} py={2} borderRadius="xl">
                {/* Burbuja animada (Background Pill) */}
                {isActive && (
                  <m.div
                    layoutId="active-bubble"
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

                {/* Icono (por encima de la burbuja) */}
                <Icon
                  as={item.icon}
                  w={6}
                  h={6}
                  position="relative"
                  zIndex={1}
                  color={isActive ? activeIconColor : inactiveIconColor}
                  strokeWidth={isActive ? 2.5 : 2}
                  transition="color 0.3s ease"
                  // Pequeño pop al ser seleccionado
                  transform={isActive ? "scale(1.1)" : "scale(1)"}
                />
              </Box>
            </Link>
          );
        })}
      </Flex>
    </Box>
    </LazyMotion>


  );
};

export default BottomNav;
