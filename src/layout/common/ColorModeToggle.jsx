import React from "react";
import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

/**
 * @component ColorModeToggle
 * @description Botón reutilizable para cambiar entre modo claro y oscuro.
 * @param {Object} props - Props adicionales para el IconButton (ej. positioning)
 */
export const ColorModeToggle = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const activeColor = useColorModeValue("primary.600", "primary.300");
  const inactiveColor = useColorModeValue("gray.600", "gray.400");

  return (
    <IconButton
      aria-label="Toggle Color Mode"
      icon={colorMode === "light" ? <FaMoon size="24" /> : <FaSun size="24" />}
      onClick={toggleColorMode}
      variant="ghost"
      color={inactiveColor}
      _hover={{ bg: "transparent", color: activeColor }}
      {...props}
    />
  );
};
