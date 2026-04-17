import { IconButton, Box } from "@chakra-ui/react";
import { Sun, Moon } from "lucide-react";
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode-hooks";

export const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const btnBg = useColorModeValue(
    "rgba(255, 255, 255, 0.8)",
    "rgba(24, 24, 27, 0.9)"
  );
  const iconColor = useColorModeValue("primary.900", "primary.100");
  const hoverBg = useColorModeValue(
    "rgba(255, 255, 255, 0.95)",
    "rgba(39, 39, 42, 0.95)"
  );
  const borderColor = useColorModeValue(
    "rgba(228, 228, 231, 0.6)",
    "rgba(63, 63, 70, 0.6)"
  );

  return (
    <IconButton
      aria-label={`Cambiar a modo ${colorMode === "dark" ? "claro" : "oscuro"}`}
      onClick={toggleColorMode}
      position="fixed"
      bottom={{ base: "phi_xl", md: "phi_md" }}
      left="phi_md"
      zIndex="banner"
      display={{ base: "none", md: "inline-flex" }}
      size="lg"
      w={14}
      h={14}
      borderRadius="full"
      bg={btnBg}
      color={iconColor}
      borderWidth="1px"
      borderColor={borderColor}
      backdropFilter="blur(12px)"
      boxShadow="0 8px 32px rgba(0, 0, 0, 0.15)"
      _hover={{
        bg: hoverBg,
        transform: "scale(1.08)",
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2)",
      }}
      _active={{
        transform: "scale(0.95)",
      }}
      transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
    >
      <Box
        as={colorMode === "dark" ? Sun : Moon}
        size="20px"
        transition="all 0.3s ease"
        fill={iconColor}
      />
    </IconButton>
  );
};
