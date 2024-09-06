import React from "react";
import { Box, Button, useColorMode } from "@chakra-ui/react";
import Tienda from "../components/HomePage/Tienda";
import Feature from "../components/HomePage/Feature";
import Clients from "../components/HomePage/Clients";
import LandPage from "../components/HomePage/LandPage";

const HomeView = () => {
    window.document.title =
        "Vidriería en La Molina |instalación de ventanas, mamparas, puertas de ducha y más. Servicios de mantenimiento y calidad garantizada.";
    return (
        <Box>
            <LandPage />
            <Clients />
            <Feature />
            <Tienda />
        </Box>
    );
};

export default HomeView;
