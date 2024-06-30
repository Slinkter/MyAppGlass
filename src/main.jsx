// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomeView from "./routes/HomeView";
import ServiceView from "./routes/ServiceView";
import ProductView from "./routes/ProductView";
import UsView from "./routes/UsView";
import ErrorView from "./routes/ErrorView";
import TestView from "./routes/TestView";
import ProjectView from "./routes/ProjectView";

// Definición del tema con modo oscuro
const theme = extendTheme({
  config: {
    initialColorMode: "system",
    useSystemColorMode: true,
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomeView /> },
      { path: "servicios", element: <ServiceView /> },
      { path: "productos", element: <ProductView /> },
      { path: "proyectos", element: <ProjectView /> },
      { path: "nosotros", element: <UsView /> },
      { path: "add-service", element: <UsView /> },
      { path: "add-product", element: <TestView /> },
      { path: "/:id", element: <TestView /> },
      { path: "product/:id", element: <TestView /> },
    ],
  },
  { path: "*", element: <ErrorView /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <RouterProvider router={router} />
  </ChakraProvider>
);
