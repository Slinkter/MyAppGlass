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
  BuildingOffice2Icon 
} from "@heroicons/react/24/outline";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import { companyData } from "@/config/company-data";

/**
 * @component BottomNav
 * @description Barra de navegación inferior flotante con diseño de "píldora".
 * Distribuye uniformemente los items usando flexbox.
 */
const BottomNav = () => {
  const location = useLocation();

  // Configuración de Colores
  const containerBg = useColorModeValue("white", "rgba(20, 20, 20, 0.9)");
  const containerBorder = useColorModeValue("gray.100", "gray.800");
  const activeIconBg = useColorModeValue("black", "white");
  const activeIconColor = useColorModeValue("white", "black");
  const inactiveColor = useColorModeValue("gray.400", "gray.500");
  const activeTextColor = useColorModeValue("black", "white");

  // Items de Navegación
  const navItems = [
    { 
      label: "Inicio", 
      icon: HomeIcon, 
      path: "/",
      isExternal: false
    },
    { 
      label: "Servicios", 
      icon: WrenchScrewdriverIcon, 
      path: "/servicios",
      isExternal: false
    },
    { 
      label: "Proyectos", 
      icon: BuildingOffice2Icon, 
      path: "/proyectos",
      isExternal: false
    },
    { 
      label: "Contacto", 
      icon: FaWhatsapp, 
      path: `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(companyData.whatsappMessage)}`,
      isExternal: true
    },
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
        as={motion.nav}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        align="center"
        justify="space-between" // Mantiene espaciado uniforme
        bg={containerBg}
        px={2} // Reducido para maximizar espacio interno
        py={3}
        borderRadius="35px"
        shadow="xl"
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
              style={{ textDecoration: 'none' }}
              flex={1} // Ocupa espacio igualitario
              w={0}    // Fuerza a flex-grow a trabajar desde 0
              display="flex"
              justifyContent="center"
            >
              <Flex
                direction="column"
                align="center"
                gap={1}
                role="group"
                cursor="pointer"
                w="full"
              >
                {/* Icon Container */}
                <Flex
                  align="center"
                  justify="center"
                  p={2}
                  borderRadius="xl"
                  bg={isActive ? activeIconBg : "transparent"}
                  color={isActive ? activeIconColor : inactiveColor}
                  transition="all 0.3s ease"
                  _groupHover={{
                    color: !isActive && "gray.600",
                  }}
                  w="40px" // Ancho fijo para el contenedor del icono
                  h="40px" // Alto fijo para asegurar círculo/cuadrado perfecto
                >
                  <Icon 
                    as={item.icon} 
                    w={5} 
                    h={5} 
                    strokeWidth={2.5}
                  />
                </Flex>

                {/* Text Label */}
                <Text
                  fontSize="10px"
                  fontWeight={isActive ? "bold" : "medium"}
                  color={isActive ? activeTextColor : inactiveColor}
                  transition="color 0.3s ease"
                  textAlign="center"
                  noOfLines={1}
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
