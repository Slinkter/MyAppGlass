"use client";
import React from "react";
import { preconnect, preload } from "react-dom";
import {
  Box,
  Heading,
  HStack,
  Text,
  VStack,
  Container,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { CheckCircle2 } from "lucide-react";
import { Skeleton } from "@/shared/ui/skeleton";
import GalleryWithThumbnails from "@shared/components/common/GalleryWithThumbnails";
import ComingSoonDisplay from "@shared/components/common/ComingSoonDisplay";
import { quoteEntryHref } from "@/entities/quote";
import type { ServicePageData } from "@/entities/service/model";
import ServiceHeader from "./ServiceHeader";
import { UnifiedTechnicalCard } from "./ServiceBentoGrid";
import { ServiceSpecsSection } from "./ServiceSpecsSection";
import { ServiceFaqSection } from "./ServiceFaqSection";

export interface ServicePageLayoutProps {
  pageData: ServicePageData & { about?: { description: string } };
  /** Slug del servicio; decide si el CTA va al cotizador o a WhatsApp. */
  serviceSlug?: string;
}

const ServicePageLayout: React.FC<ServicePageLayoutProps> = ({ pageData, serviceSlug }) => {
  const { seo, about, systems, imageLists, faqs, specs, systemSheets } = pageData;

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isPending, startTransition] = React.useTransition();

  const activeImageList = React.useMemo(() => imageLists[activeIndex] || [], [imageLists, activeIndex]);
  const activeSystem = React.useMemo(() => systems[activeIndex], [systems, activeIndex]);
  const activeSystemSheet = React.useMemo(() => {
    if (!activeSystem?.label || !systemSheets?.length) return undefined;
    const target = activeSystem.label.trim().toLowerCase();
    return systemSheets.find((sheet) => sheet.nombre.trim().toLowerCase() === target);
  }, [activeSystem, systemSheets]);

  // El visor se carga con `dynamic(ssr:false)`: sin esto la primera foto no se pide hasta que
  // llegan el JS y el chunk del visor (cascada). React 19 emite estos <link> en el <head> del HTML.
  const firstImageSrc = activeImageList[0]?.src;
  if (firstImageSrc) {
    preconnect("https://firebasestorage.googleapis.com");
    preload(firstImageSrc, { as: "image", fetchPriority: "high" });
  }

  const handleSelect = React.useCallback((index: number) => {
    startTransition(() => {
      setActiveIndex(index);
    });
  }, []);

  return (
    <Box
      animation="fadeIn 0.4s ease-out"
      _motionReduce={{ animation: "none", transition: "none" }}
    >
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
                    _motionReduce={{ animation: "none", transition: "none" }}
                    overflow="hidden"
                    borderRadius={{ base: "2xl", lg: "3xl" }}
                  >
                    {activeImageList.length > 0 ? (
                      <GalleryWithThumbnails images={activeImageList} gap={{ base: "2", md: "4" }} p={{ base: "0", md: "2" }} />
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
                  description={activeSystem?.description || about.description} 
                  features={pageData.features} 
                  systemName={activeSystem?.label || seo.title}
                  quoteHref={quoteEntryHref(serviceSlug, activeSystem?.label)}
                />
              )}
            </GridItem>
          </Grid>

          {/* Ficha del sistema activo (cuando existe en systemSheets) */}
          {activeSystemSheet && (
            <Box
              w="full"
              p={{ base: 4, md: 6 }}
              borderRadius="2xl"
              borderWidth="1px"
              borderColor="border.default"
              bg="bg.subtle"
            >
              <VStack align="stretch" gap={4}>
                <VStack align="flex-start" gap={1.5}>
                  <Heading as="h2" size={{ base: "sm", md: "md" }} fontWeight="700" color="text.heading">
                    {activeSystemSheet.nombre}
                  </Heading>
                  <Text fontSize={{ base: "xs", md: "sm" }} color="text.muted" lineHeight="relaxed">
                    {activeSystemSheet.resumen}
                  </Text>
                </VStack>

                {activeSystemSheet.usos && activeSystemSheet.usos.length > 0 && (
                  <VStack align="flex-start" gap={2}>
                    <Heading as="h3" size="xs" fontWeight="700" color="text.heading">
                      Usos recomendados
                    </Heading>
                    <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap={2} w="full">
                      {activeSystemSheet.usos.map((uso, idx) => (
                        <HStack key={`${uso}-${idx}`} gap={2} align="flex-start">
                          <Box as={CheckCircle2} color="primary.500" _dark={{ color: "primary.300" }} boxSize={4} mt="0.5" flexShrink={0} aria-hidden="true" />
                          <Text fontSize="xs" color="text.muted">
                            {uso}
                          </Text>
                        </HStack>
                      ))}
                    </Grid>
                  </VStack>
                )}

                {activeSystemSheet.specs && activeSystemSheet.specs.length > 0 && (
                  <VStack align="flex-start" gap={2}>
                    <Heading as="h3" size="xs" fontWeight="700" color="text.heading">
                      Especificaciones del sistema
                    </Heading>
                    <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={2.5} w="full">
                      {activeSystemSheet.specs.map((item, idx) => (
                        <Box
                          key={`${item.label}-${idx}`}
                          p={3}
                          borderRadius="xl"
                          borderWidth="1px"
                          borderColor="border.default"
                          bg="bg.page"
                        >
                          <Text fontSize="xs" fontWeight="600" color="text.heading">
                            {item.label}
                          </Text>
                          <Text fontSize="xs" color="text.muted" fontVariantNumeric="tabular-nums">
                            {item.value}
                          </Text>
                        </Box>
                      ))}
                    </Grid>
                  </VStack>
                )}
              </VStack>
            </Box>
          )}

          {/* Ficha técnica general del servicio */}
          <ServiceSpecsSection specs={specs} serviceTitle={seo.title} />

          {/* Sección de Preguntas Frecuentes (FAQ / Rich Snippets) */}
          <ServiceFaqSection faqs={faqs} serviceTitle={seo.title} />
        </VStack>
      </Container>
    </Box>
  );
};

export default ServicePageLayout;
