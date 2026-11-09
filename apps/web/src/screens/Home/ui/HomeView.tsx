import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import type { Project, Service } from "@/shared/api/firebase/types";
import LandingPageSection from "@features/home/components/hero/LandingPageSection";
import FeaturesSection from "@features/home/components/features/FeaturesSection";
import ServiceList from "@/features/services/components/ServiceList";
import ClientsSection from "@features/home/components/clients/ClientsSection";
import { ProjectsList } from "@features/projects";
import StoreSection from "@features/home/components/store/StoreSection";
import { Reveal } from "@shared/components/motion/Reveal";

export interface HomeViewProps {
    initialServices?: Service[];
    initialProjects?: Project[];
}

const HomeView: React.FC<HomeViewProps> = React.memo(({ initialServices, initialProjects }) => {
    return (
        <VStack gap={{ base: "16", md: "24" }} w="full" align="stretch">
            {/* Sección 1: Hero / Portada */}
            <LandingPageSection />

            {/* Sección 2: SERVICIO */}
            <Box id="servicios" as="section" scrollMarginTop={{ base: "100px", md: "120px" }}>
                <Reveal><ServiceList initialData={initialServices} headingAs="h2" /></Reveal>
            </Box>

            {/* Sección 3: Proyectos */}
            <Box id="proyectos" as="section" scrollMarginTop={{ base: "100px", md: "120px" }}>
                <Reveal><ProjectsList initialData={initialProjects} headingAs="h2" /></Reveal>
            </Box>

            {/* Sección 4: Nuestros Clientes */}
            <Box id="clientes" as="section" scrollMarginTop={{ base: "100px", md: "120px" }}>
                <Reveal><ClientsSection /></Reveal>
            </Box>

            {/* Sección 5: Ubicación / Mapa */}
            <Box id="ubicacion" as="section" scrollMarginTop={{ base: "100px", md: "120px" }}>
                <StoreSection initialProjects={initialProjects} />
            </Box>

            {/* Sección 6: Calidad Superior (Iconos a 2 filas estilo Skills) */}
            <Box id="beneficios" as="section" scrollMarginTop={{ base: "100px", md: "120px" }}>
                <Reveal><FeaturesSection /></Reveal>
            </Box>
        </VStack>
    );
});

HomeView.displayName = "HomeView";

export default HomeView;
