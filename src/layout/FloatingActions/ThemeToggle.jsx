import { IconButton } from "@chakra-ui/react";
import { Sun, Moon } from "lucide-react";
import { useColorMode } from "@/components/ui/color-mode";

export const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Alternar tema oscuro / claro"
      onClick={toggleColorMode}
      position="fixed"
      bottom={{ base: "phi_xl", md: "phi_md" }}
      left="phi_md"
      zIndex="popover"
      display={{ base: "none", md: "inline-flex" }}
      size="lg"
      borderRadius="full"
      bg="bg.section"
      color="text.accent"
      variant="outline"
      borderColor="border.glass"
      _hover={{ bg: "bg.muted", transform: "scale(1.1)" }}
      _active={{ transform: "scale(0.9)" }}
      boxShadow="lg"
      transition="all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
    >
      {colorMode === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </IconButton>
  );
};
