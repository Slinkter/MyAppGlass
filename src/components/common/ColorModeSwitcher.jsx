import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const ColorModeSwitcher = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const bgColor = useColorModeValue("gray.200", "blackAlpha.500");

    return (
        <IconButton
            size="md"
            fontSize="lg"
            aria-label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
            variant="ghost"
            color="current"
            marginLeft="2"
            onClick={toggleColorMode}
            icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            bg={bgColor}
            rounded="full"
            w={10}
            h={10}
            justify={"center"}
            align={"center"}
        />
    );
};

ColorModeSwitcher.displayName = 'ColorModeSwitcher';

export default ColorModeSwitcher;
