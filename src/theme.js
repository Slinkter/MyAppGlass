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
});

export default theme;
