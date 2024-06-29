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
import Layout from "./layout/Layout";

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
    element: <HomeView />,
  },
  {
    path: "service",
    element: <ServiceView />,
    children: [{ path: "ventanatest", element: <TestView /> }],
  },
  {
    path: "product",
    element: <ProductView />,
  },
  {
    path: "us",
    element: <UsView />,
  },
  {
    path: "*",
    element: <ErrorView />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Layout>
    <RouterProvider router={router}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </RouterProvider>
  </Layout>
);
