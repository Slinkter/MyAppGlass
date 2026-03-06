import React from "react";
import {
  Box,
  Flex,
  Text,
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
import { m } from "framer-motion";
import { companyData } from "@/config/company-data";

/**
 * @component BottomNav
 * @description Barra de navegación inferior flotante con diseño de "píldora".
 * Distribuye uniformemente los items usando flexbox.
 */
const BottomNav = () => {
  const location = useLocation();

  // Configuración de Colores
  const containerBg = useColorModeValue("rgba(255, 255, 255, 0.7)", "rgba(15, 15, 15, 0.8)");
  const containerBorder = useColorModeValue("whiteAlpha.600", "whiteAlpha.200");
  const activeIconBg = useColorModeValue("black", "white");
  const activeIconColor = useColorModeValue("white", "black");
  const inactiveColor = useColorModeValue("gray.500", "gray.400");
  const activeTextColor = useColorModeValue("black", "white");

  // Items de Navegación
  const navItems = [
    {
      label: "Inicio",
      icon: HomeIcon,
      path: "/",
      isExternal: false,
    },
    {
      label: "Servicios",
      icon: WrenchScrewdriverIcon,
      path: "/servicios",
      isExternal: false,
    },
    {
      label: "Proyectos",
      icon: BuildingOffice2Icon,
      path: "/proyectos",
      isExternal: false,
    },
    {
      label: "Contacto",
      icon: FaWhatsapp,
      path: `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(companyData.whatsappMessage)}`,
      isExternal: true,
    },
  ];

  return (
    <Box
      position="fixed"
      bottom={8}
      left={0}
      right={0}
      display={{ base: "flex", md: "none" }}
      justifyContent="center"
      px={6}
      zIndex="sticky"
    >
      <Flex
        as={m.nav}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        align="center"
        justify="space-between"
        bg={containerBg}
        backdropFilter="blur(20px) saturate(180%)"
        px={3}
        py={3}
        borderRadius="full"
        shadow="2xl"
        w="full"
        maxW="md"
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
              flex={1}
              display="flex"
              justifyContent="center"
              textDecoration="none"
              _hover={{ textDecoration: "none" }}
            >
              <Flex
                as={m.div}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                direction="column"
                align="center"
                gap={1.5}
                role="group"
                cursor="pointer"
                w="full"
              >
                {/* Icon Container with High-Contrast Active Indicator */}
                <Flex
                  align="center"
                  justify="center"
                  p={2}
                  borderRadius="full"
                  bg={isActive ? activeIconBg : "transparent"}
                  color={isActive ? activeIconColor : inactiveColor}
                  transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
                  boxShadow={isActive ? "0 8px 20px -5px rgba(0,0,0,0.4)" : "none"}
                  w="44px"
                  h="44px"
                >
                  <Icon as={item.icon} w={5} h={5} strokeWidth={isActive ? 2.5 : 2} />
                </Flex>

                {/* Text Label */}
                <Text
                  fontSize="11px"
                  fontWeight={isActive ? "800" : "600"}
                  color={isActive ? activeTextColor : inactiveColor}
                  transition="all 0.3s ease"
                  textAlign="center"
                  noOfLines={1}
                  letterSpacing="0.05em"
                  opacity={isActive ? 1 : 0.7}
                >
                  {item.label}
                </Text>
              </Flex>
            </Link>
          );
        })}
      </Flex>
    </Box>
  );
};

export default BottomNav;
