import { useEffect } from "react";
import { useColorMode } from "@chakra-ui/react";

/**
 * @component ColorModeManager
 * @description Gestiona la clase 'light-mode' en el body del documento para estilos globales que dependen del modo de color.
 * No renderiza nada en la UI.
 * @returns {null} No retorna elementos visuales.
 */
const ColorModeManager = () => {
  const { colorMode } = useColorMode();

  useEffect(() => {
    document.body.classList.toggle("light-mode", colorMode === "light");
  }, [colorMode]);

  return null;
};

export default ColorModeManager;
