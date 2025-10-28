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
                <title>Vidriería en La Molina | GYA Company - Servicios de Calidad</title>
                <meta
                    name="description"
                    content="Servicios de vidriería en La Molina, Lima. Expertos en instalación y diseño. ¡Cotiza con nosotros y transforma tu espacio con GYA Company!"
                />
                <link rel="canonical" href="https://www.gyacompany.com/" />
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
