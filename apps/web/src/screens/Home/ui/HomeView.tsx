import React from "react";
import { Box, VStack } from "@chakra-ui/react";
import type { Project, Service } from "@/shared/api/firebase/types";
import LandingPageSection from "@features/home/components/hero/LandingPageSection";
import FeaturesSection from "@features/home/components/features/FeaturesSection";
import ClientsSection from "@features/home/components/clients/ClientsSection";
import StoreSection from "@features/home/components/store/StoreSection";
import ServicesFeatured from "@features/home/components/featured/ServicesFeatured";
import ProjectsFeatured from "@features/home/components/featured/ProjectsFeatured";
import ProcessSection from "@features/home/components/process/ProcessSection";
import WhatsAppBand from "@features/home/components/cta/WhatsAppBand";
import { Reveal } from "@shared/components/motion/Reveal";

export interface HomeViewProps {
    initialServices?: Service[];
    initialProjects?: Project[];
}

/** Ancla de sección: el margen superior evita que la barra fija tape el título al navegar. */
const anchor = { scrollMarginTop: { base: "100px", md: "120px" } } as const;

/**
 * Landing: una narrativa en ritmo único (96 px escritorio / 64 px móvil entre secciones).
 * Hero → servicios → proceso → proyectos → llamada a la acción → clientes → ubicación → calidad.
 * Servicios y proyectos muestran 6 destacados (rejilla 3×2 / 2×3, tira en celular) y enlazan al resto.
 */
const HomeView: React.FC<HomeViewProps> = React.memo(({ initialServices, initialProjects }) => {
    return (
        <VStack gap={{ base: "16", md: "24" }} w="full" align="stretch">
            <LandingPageSection />

            <Box id="servicios" as="section" {...anchor}>
                <ServicesFeatured initialData={initialServices} />
            </Box>

            <Box id="proceso" as="section" {...anchor}>
                <ProcessSection />
            </Box>

            <Box id="proyectos" as="section" {...anchor}>
                <ProjectsFeatured initialData={initialProjects} />
            </Box>

            <Box id="contacto-rapido" as="section" {...anchor}>
                <WhatsAppBand />
            </Box>

            <Box id="clientes" as="section" {...anchor}>
                <Reveal><ClientsSection /></Reveal>
            </Box>

            <Box id="ubicacion" as="section" {...anchor}>
                <StoreSection initialProjects={initialProjects} />
            </Box>

            <Box id="beneficios" as="section" {...anchor}>
                <Reveal><FeaturesSection /></Reveal>
            </Box>
        </VStack>
    );
});

HomeView.displayName = "HomeView";

export default HomeView;
