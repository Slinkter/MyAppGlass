import React from "react";
import { Box } from "@chakra-ui/react";
import Tienda from "../components/HomePage/Tienda";
import Feature from "../components/HomePage/Feature";
import Clients from "../components/HomePage/Clients";
import LandPage from "../components/HomePage/LandPage";

const HomeView = () => {
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
