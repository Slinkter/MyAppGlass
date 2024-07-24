import { extendTheme } from "@chakra-ui/react";
import "@fontsource/open-sans";
import "@fontsource/raleway";

const theme = extendTheme({
    config: {
        initialColorMode: "system",
        useSystemColorMode: true,
    },
    fonts: {
        heading: `"Lora", serif;`,
        body: `"Lora", serif;`,
    },
    colors: {
        textsecond: "#6c757d",
        textthird: "red",
        colorredglass: "#ff5757",
    },
});

export default theme;
