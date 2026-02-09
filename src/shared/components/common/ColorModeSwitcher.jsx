import React from "react";
import { IconButton, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

/**
 * @component ColorModeSwitcher
 * @description Botón flotante o integrado para alternar entre el modo claro y oscuro de la aplicación.
 * Utiliza el hook useColorMode de Chakra UI.
 * @returns {JSX.Element} Botón de alternancia de tema.
 */
const ColorModeSwitcher = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
      variant="ghost"
      color="white"
      marginLeft="2"
      onClick={toggleColorMode}
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      bg="whiteAlpha.200"
      backdropFilter="blur(10px)"
      border="1px solid"
      borderColor="whiteAlpha.300"
      _hover={{ bg: "whiteAlpha.300" }}
      rounded="full"
      w={10}
      h={10}
      justify={"center"}
      align={"center"}
    />
  );
};

ColorModeSwitcher.displayName = "ColorModeSwitcher";

export default ColorModeSwitcher;
