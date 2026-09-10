import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import LandingPageSection from "@features/home/components/hero/LandingPageSection";
import FeaturesSection from "@features/home/components/features/FeaturesSection";
import ServiceList from "@/features/services/components/ServiceList";
import ClientsSection from "@features/home/components/clients/ClientsSection";
import { ProjectsList } from "@features/projects";
import StoreSection from "@features/home/components/store/StoreSection";

const HomeView: React.FC = React.memo(() => {
    return (
        <VStack gap={{ base: "16", md: "24" }} w="full" align="stretch">
            {/* Sección 1: Hero / Portada */}
            <LandingPageSection />

            {/* Sección 2: Nuestros Clientes */}
            <Box id="clientes" as="section" scrollMarginTop={{ base: "100px", md: "120px" }}>
                <ClientsSection />
            </Box>

            {/* Sección 3: SERVICIO */}
            <Box id="servicios" as="section" scrollMarginTop={{ base: "100px", md: "120px" }}>
                <ServiceList />
            </Box>

            {/* Sección 4: Proyectos */}
            <Box id="proyectos" as="section" scrollMarginTop={{ base: "100px", md: "120px" }}>
                <ProjectsList />
            </Box>

            {/* Sección 5: Ubicación / Mapa */}
            <Box id="ubicacion" as="section" scrollMarginTop={{ base: "100px", md: "120px" }}>
                <StoreSection />
            </Box>

            {/* Sección 6: Calidad Superior (Iconos a 2 filas estilo Skills) */}
            <Box id="beneficios" as="section" scrollMarginTop={{ base: "100px", md: "120px" }}>
                <FeaturesSection />
            </Box>
        </VStack>
    );
});

HomeView.displayName = "HomeView";

export default HomeView;
