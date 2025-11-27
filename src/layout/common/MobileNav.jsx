import React from "react";
import { Flex, IconButton, Link, useColorModeValue } from "@chakra-ui/react";

import { Link as RouterLink, useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { BsBuildings } from "react-icons/bs";
import { MdHomeRepairService } from "react-icons/md";
import { ColorModeToggle } from "./ColorModeToggle";
import { motion } from "framer-motion";

// Creamos un componente Flex animado
const MotionFlex = motion(Flex);

/**
 * @component MobileNav
 * @description Barra de navegación inferior fija para dispositivos móviles.
 * Incluye animación de entrada usando framer-motion.
 */
const MobileNav = () => {
  const location = useLocation();

  // Estilos Glassmorphism
  const bgColor = useColorModeValue(
    "rgba(255, 255, 255, 0.1)",
    "rgba(0, 0, 0, 0.1)"
  );
  const activeColor = useColorModeValue("primary.600", "primary.300");
  const inactiveColor = useColorModeValue("gray.600", "gray.400");

  const mobileNavItems = [
    { label: "Inicio", icon: AiFillHome, href: "/" },
    { label: "Servicios", icon: MdHomeRepairService, href: "/servicios" },
    { label: "Proyectos", icon: BsBuildings, href: "/proyectos" },
  ];

  return (
    <MotionFlex
      display={{ base: "flex", md: "none" }}
      position="fixed"
      bottom="4"
      left="4"
      right="4"
      zIndex="sticky"
      bg={bgColor}
      backdropFilter="blur(10px)"
      border="none"
      boxShadow="lg" // Agregué un poco de sombra para resaltar
      borderRadius="2xl"
      py={2}
      px={2}
      minH="50px"
      justifyContent="space-around"
      alignItems="center"
      // 🚀 ANIMACIÓN DE ENTRADA
      initial={{ y: 100, opacity: 0 }} // Empieza abajo y invisible
      animate={{ y: 0, opacity: 1 }} // Sube a su posición y se hace visible
      transition={{
        duration: 0.5,
        ease: "easeOut",
        delay: 0.2, // Pequeño retraso para que se vea elegante
      }}
    >
      {mobileNavItems.map((item) => (
        <RouterLink to={item.href} key={item.label}>
          <IconButton
            variant="ghost"
            aria-label={item.label}
            icon={<item.icon size="24" />}
            color={
              location.pathname === item.href ? activeColor : inactiveColor
            }
            _hover={{ bg: "transparent", color: activeColor }}
            // También podemos animar los iconos si quieres
            as={motion.button}
            whileTap={{ scale: 0.9 }} // Efecto al pulsar
          />
        </RouterLink>
      ))}

      {/* WhatsApp Icon */}
      <Link
        href="https://wa.me/51974278303?text=Quisiera una cotización para ...."
        isExternal
      >
        <IconButton
          variant="ghost"
          aria-label="WhatsApp"
          icon={<FaWhatsapp size="24" />}
          color={inactiveColor}
          _hover={{ bg: "transparent", color: activeColor }}
          as={motion.button}
          whileTap={{ scale: 0.9 }}
        />
      </Link>

      <ColorModeToggle as={motion.button} whileTap={{ scale: 0.9 }} />
    </MotionFlex>
  );
};

export default MobileNav;
