"use client";
import React from "react";
import { useParams } from "next/navigation";
import {
  Box,
  Flex,
  VStack,
  Container,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Skeleton } from "@/components/ui/skeleton";
import Gallery from "@shared/components/common/Gallery";
import ComingSoonDisplay from "@shared/components/common/ComingSoonDisplay";
import { ServicePageData } from "@features/services/services/serviceService";
import ServiceHeader from "./ServiceHeader";
import { UnifiedTechnicalCard } from "./ServiceBentoGrid";
import { ServiceFaqSection } from "./ServiceFaqSection";
import { serviceFaqsMap, defaultServiceFaqs } from "../data/serviceFaqs";

import dynamic from "next/dynamic";

const AuraARViewer = dynamic(
  () => import("@/shared/components/3d/AuraARViewer").then(mod => mod.AuraARViewer),
  { ssr: false, loading: () => <Skeleton height={{ base: "340px", sm: "400px", lg: "500px" }} w="full" borderRadius={{ base: "none", md: "3xl" }} /> }
);

const VentanaConfigurador3DCard = dynamic(
  () => import("./VentanaConfigurador3DCard"),
  { ssr: false, loading: () => <Skeleton height={{ base: "500px", lg: "500px" }} w="full" borderRadius={{ base: "none", md: "3xl" }} /> }
);

const GLBModelCard = dynamic(
  () => import("@/shared/components/3d/GLBModelCard").then(mod => mod.GLBModelCard),
  { ssr: false, loading: () => <Skeleton height="460px" w="full" borderRadius="2xl" /> }
);

import { SERVICE_AR_MODELS_MAP } from "../data/serviceArModels";

export interface ServicePageLayoutProps {
  pageData: ServicePageData & { about?: { description: string } };
}

const ServicePageLayout: React.FC<ServicePageLayoutProps> = ({ pageData }) => {
  const { seo, about, systems, imageLists } = pageData;
  const params = useParams();
  const serviceSlug = params?.serviceSlug as string | undefined;
  
  const faqs = serviceSlug && serviceFaqsMap[serviceSlug] 
    ? serviceFaqsMap[serviceSlug] 
    : defaultServiceFaqs;

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isPending, startTransition] = React.useTransition();

  const activeImageList = React.useMemo(() => imageLists[activeIndex] || [], [imageLists, activeIndex]);
  const activeSystem = React.useMemo(() => systems[activeIndex], [systems, activeIndex]);

  // Obtener modelo AR específico para este slug y sistema activo
  const activeSystemLabel = activeSystem?.label || "Sistema Nova";
  const systemAR = (serviceSlug && (SERVICE_AR_MODELS_MAP[serviceSlug]?.[activeSystemLabel] || Object.values(SERVICE_AR_MODELS_MAP[serviceSlug] || {})[0])) || {
    systemLabel: `${activeSystemLabel} (${seo.title.split("|")[0].trim()})`,
    category: seo.title.split("|")[0].trim(),
    glbModelUrl: "/models/ventana-nova.glb",
    usdzModelUrl: "/models/ventana-nova.glb",
    description: "Proyección 3D a escala real para visualizar el acabado y dimensiones antes de instalar.",
  };

  const handleSelect = React.useCallback((index: number) => {
    startTransition(() => {
      setActiveIndex(index);
    });
  }, []);

  // Mapear sistema activo al ID del catalogo si estamos en ventana
  const activeVentanaSystemId = React.useMemo(() => {
    const label = (activeSystem?.label || "").toLowerCase();
    if (label.includes("25")) return "serie-25";
    if (label.includes("35")) return "serie-35";
    if (label.includes("62")) return "serie-62";
    return "sistema-nova";
  }, [activeSystem]);

  // Título dinámico simplificado para el configurador 3D
  const dynamicViewerTitle = `Modelos de ${serviceSlug?.replace("-", " ") || "estructuras"} 3d`;

  return (
    <Box animation="fadeIn 0.4s ease-out">
      <Container maxW="7xl" px={{ base: "3", sm: "4", lg: "0" }} pt={{ base: "3", md: "5" }} pb={{ base: "12", lg: "8" }}>
        <VStack gap={{ base: "4", sm: "5", lg: "8" }} align="stretch">
          <ServiceHeader 
            title={seo.title}
            systems={systems}
            activeIndex={activeIndex}
            onSelect={handleSelect}
          />

          <Grid
            templateColumns={{ base: "1fr", lg: "repeat(12, 1fr)" }}
            gap={{ base: "4", sm: "5", lg: "6" }}
            alignItems="stretch"
          >
            {/* Columna Galería */}
            <GridItem colSpan={{ base: 1, lg: 7 }} order={{ base: 1, lg: 2 }} display="flex" flexDirection="column" minW={0}>
              <Skeleton
                loading={isPending}
                borderRadius={{ base: "2xl", lg: "3xl" }}
                height="100%"
                w="full"
                flex="1"
              >
                <Box
                  h={{ base: "380px", sm: "440px", md: "420px", lg: "460px" }}
                  position="relative"
                  w="full"
                  overflow="hidden"
                  borderRadius={{ base: "2xl", lg: "3xl" }}
                  role="region"
                  aria-label="Galería de imágenes del servicio"
                >
                  <Box
                    key={`gallery-${activeIndex}`}
                    w="full"
                    h="full"
                    animation="scaleIn 0.5s cubic-bezier(0, 0.55, 0.45, 1)"
                    overflow="hidden"
                    borderRadius={{ base: "2xl", lg: "3xl" }}
                  >
                    {activeImageList.length > 0 ? (
                      <Gallery 
                        images={activeImageList}
                      >
                        <Flex
                          direction={{ base: "column", md: "row" }}
                          gap={{ base: "2", md: "4" }}
                          h="100%"
                          w="100%"
                          p={{ base: "0", md: "2" }}
                          minW={0}
                          overflow="hidden"
                        >
                          <Gallery.Viewer />
                          <Gallery.Thumbnails />
                        </Flex>
                      </Gallery>
                    ) : (
                      <ComingSoonDisplay />
                    )}
                  </Box>
                </Box>
              </Skeleton>
            </GridItem>

            {/* Columna Información + CTA Integrado */}
            <GridItem colSpan={{ base: 1, lg: 5 }} order={{ base: 2, lg: 1 }} display="flex" flexDirection="column" minW={0} h={{ lg: "460px" }}>
              {about && (
                <UnifiedTechnicalCard 
                  description={about.description} 
                  features={pageData.features} 
                  systemName={activeSystem?.label || seo.title}
                />
              )}
            </GridItem>
          </Grid>

          {/* MÓDULO 3D AUTÓNOMO E INDEPENDIENTE */}
          <Box id="ar-viewer-section" pt="2">
            {serviceSlug === "ventana" ? (
              <VentanaConfigurador3DCard initialSystemId={activeVentanaSystemId} />
            ) : (
              <AuraARViewer
                title={dynamicViewerTitle}
                category={systemAR.category}
                glbModelUrl={systemAR.glbModelUrl}
                usdzModelUrl={systemAR.usdzModelUrl}
              />
            )}
          </Box>

          {/* VISOR .GLB DETALLADO (debajo del configurador) */}
          {serviceSlug && SERVICE_AR_MODELS_MAP[serviceSlug] && (
            <Box pt="2">
              <GLBModelCard
                modelUrl={systemAR.glbModelUrl}
                title={`${seo.title} — Modelo 3D`}
              />
            </Box>
          )}

          {/* Sección de Preguntas Frecuentes (FAQ / Rich Snippets) */}
          <ServiceFaqSection faqs={faqs} serviceTitle={seo.title} />
        </VStack>
      </Container>
    </Box>
  );
};

export default ServicePageLayout;
