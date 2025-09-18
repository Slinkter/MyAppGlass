import { extendTheme } from "@chakra-ui/react";
import "@fontsource/open-sans";
import "@fontsource/raleway";

const theme = extendTheme({
    fonts: {
        heading: `"Lora", serif;`,
        body: `"Lora", serif;`,
    },

    config: {
        initialColorMode: "system",
        useSystemColorMode: false,
    },

    colors: {
        textsecond: "#6c757d",
        textthird: "red",
        colorredglass: "#ff5757",
    },
    styles: {
        global: (props) => ({
            body: {
                bg: props.colorMode === "dark" ? "gray.900" : "white",
                color: props.colorMode === "dark" ? "gray.100" : "gray.800",
            },
        }),
    },
});

export default theme;
