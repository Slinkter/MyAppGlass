import React from "react";
import { IconButton } from "@chakra-ui/react";
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bg = useColorModeValue("white", "primary.800");
  const color = useColorModeValue("primary.600", "primary.200");
  const hoverBg = useColorModeValue("gray.100", "primary.700");

  return (
    <IconButton
      aria-label="Alternar tema oscuro / claro"
      icon={
        colorMode === "dark" ? (
          <Sun width="24px" height="24px" />
        ) : (
          <Moon width="24px" height="24px" />
        )
      }
      onClick={toggleColorMode}
      position="fixed"
      bottom={{ base: "90px", md: 4 }}
      left={4}
      zIndex="popover"
      display={{ base: "none", md: "inline-flex" }}
      size="lg"
      isRound
      bg={bg}
      color={color}
      _hover={{ bg: hoverBg, transform: "scale(1.08)" }}
      _active={{ transform: "scale(0.95)" }}
      boxShadow="lg"
      transition="all 0.2s ease"
    />
  );
};
