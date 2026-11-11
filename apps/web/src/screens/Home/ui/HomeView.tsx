import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import type { Project, Service } from "@/shared/api/firebase/types";
import LandingPageSection from "@features/home/components/hero/LandingPageSection";
import FeaturesSection from "@features/home/components/features/FeaturesSection";
import ServiceList from "@/features/services/components/ServiceList";
import ClientsSection from "@features/home/components/clients/ClientsSection";
// Import directo al segmento `ui`: `HomeView` es Server Component y el barrel de la
// entidad también expone hooks de cliente y modales con `dynamic(ssr: false)`.
import ProjectsList from "@/entities/project/ui/ProjectsList";
import StoreSection from "@features/home/components/store/StoreSection";

export interface HomeViewProps {
    initialServices?: Service[];
    initialProjects?: Project[];
}

const HomeView: React.FC<HomeViewProps> = React.memo(({ initialServices, initialProjects }) => {
    return (
        <VStack gap={{ base: "16", md: "24" }} w="full" align="stretch">
            {/* 1. Hero */}
            <LandingPageSection />

            {/* 2. Beneficios (8 tarjetas) */}
            <Box id="beneficios" as="section" scrollMarginTop={{ base: "6.5rem", md: "7.5rem" }}>
                <FeaturesSection />
            </Box>

            {/* 3. Servicios */}
            <Box id="servicios" as="section" scrollMarginTop={{ base: "6.5rem", md: "7.5rem" }}>
                <ServiceList initialData={initialServices} headingAs="h2" motion="cine" />
            </Box>

            {/* 4. Proyectos (portafolio de obras) */}
            <Box id="proyectos" as="section" scrollMarginTop={{ base: "6.5rem", md: "7.5rem" }}>
                <ProjectsList initialData={initialProjects} headingAs="h2" motion="cine" />
            </Box>

            {/* 5. Clientes */}
            <Box id="clientes" as="section" scrollMarginTop={{ base: "6.5rem", md: "7.5rem" }}>
                <ClientsSection />
            </Box>

            {/* 6. Ubicación */}
            <Box id="ubicacion" as="section" scrollMarginTop={{ base: "6.5rem", md: "7.5rem" }}>
                <StoreSection initialProjects={initialProjects} />
            </Box>
        </VStack>
    );
});

HomeView.displayName = "HomeView";

export default HomeView;
