import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

import theme from "./config/theme";
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <HelmetProvider>
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <RouterProvider router={router} />
        </ChakraProvider>
    </HelmetProvider>
);
