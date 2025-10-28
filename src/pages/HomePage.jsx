import { Box } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import StoreSection from "../components/home/StoreSection";
import FeaturesSection from "../components/home/FeaturesSection";
import Clients from "../components/home/ClientsSection";
import LandingPageSection from "../components/home/LandingPageSection";

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
                <LandingPageSection />
                <Clients />
                <FeaturesSection />
                <StoreSection />
            </Box>
        </>
    );
};

export default HomeView;
