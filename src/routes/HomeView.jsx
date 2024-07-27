import React from "react";
import { Box, Button, useColorMode } from "@chakra-ui/react";
import Tienda from "../components/HomePage/Tienda";
import Feature from "../components/HomePage/Feature";
import Clients from "../components/HomePage/Clients";
import LandPage from "../components/HomePage/LandPage";

const HomeView = () => {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Box>
            <LandPage />
            <Clients />
            <Feature />
            <Tienda />
            <Box p={4}>
                <Button onClick={toggleColorMode}>
                    Cambiar a {colorMode === "light" ? "oscuro" : "claro"}
                </Button>
            </Box>
        </Box>
    );
};

export default HomeView;
