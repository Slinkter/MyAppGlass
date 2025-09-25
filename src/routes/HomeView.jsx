import { Box } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import Tienda from "../components/HomePage/Tienda";
import Feature from "../components/HomePage/Feature";
import Clients from "../components/HomePage/Clients";
import LandPage from "../components/HomePage/LandPage";

const HomeView = () => {
    return (
        <>
            <Helmet>
                <title> GYA Company - Empresa de vidrios y Aluminio ...</title>
                <meta
                    name="description"
                    content="Especialistas en la venta e instalación de ventanas de alta calidad, incluyendo modelos Nova y series personalizadas para tu hogar y oficina."
                />
            </Helmet>
            <Box>
                <LandPage />
                <Clients />
                <Feature />
                <Tienda />
            </Box>
        </>
    );
};

export default HomeView;
