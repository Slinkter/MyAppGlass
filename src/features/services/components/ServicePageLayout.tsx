"use client";
import React from "react";
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
import { ServicePageData } from "../services/serviceService";
import ServiceHeader from "./ServiceHeader";
import { AboutCard, BentoCTA, StructuralFeatures } from "./ServiceBentoGrid";



export interface ServicePageLayoutProps {
  pageData: ServicePageData & { about?: { description: string } };
}

const ServicePageLayout: React.FC<ServicePageLayoutProps> = ({ pageData }) => {
  const { seo, about, systems, imageLists } = pageData;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isPending, startTransition] = React.useTransition();

  const activeImageList = React.useMemo(() => imageLists[activeIndex] || [], [imageLists, activeIndex]);
  const activeSystem = React.useMemo(() => systems[activeIndex], [systems, activeIndex]);

  const handleSelect = React.useCallback((index: number) => {
    startTransition(() => {
      setActiveIndex(index);
    });
  }, []);

  return (
    <Box animation="fadeIn 0.4s ease-out">
      <Container maxW="7xl" px="0" pt={{ base: 4, md: 8 }} pb={{ base: "16", lg: "10" }}>
        <Grid
          templateColumns={{ base: "1fr", lg: "repeat(12, 1fr)" }}
          gap={{ base: "8", lg: "10" }}
          alignItems="stretch"
        >
          {/* Columna Izquierda: Galería de fotos */}
          <GridItem colSpan={{ base: 1, lg: 7 }}>
            <Skeleton
              loading={isPending}
              borderRadius="3xl"
              height="100%"
            >
              <Box
                h={{ base: "320px", md: "500px", lg: "580px" }}
                position="relative"
              >
                <Box
                  key={`gallery-${activeIndex}`}
                  w="full"
                  h="full"
                  animation="scaleIn 0.5s cubic-bezier(0, 0.55, 0.45, 1)"
                >
                  {activeImageList.length > 0 ? (
                    <Gallery images={activeImageList}>
                      <Flex
                        direction={{ base: "column", md: "row" }}
                        gap={{ base: "4", md: "8" }}
                        h="100%"
                        w="100%"
                        minW={0}
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

          {/* Columna Derecha: Título, Selector de Sistema, Concepto Técnico, CTA */}
          <GridItem colSpan={{ base: 1, lg: 5 }}>
            <VStack gap="6" align="stretch" h="100%" justify="space-between">
              <VStack gap="6" align="stretch">
                <ServiceHeader 
                  title={seo.title}
                  systems={systems}
                  activeIndex={activeIndex}
                  onSelect={handleSelect}
                />

                {about && (
                  <AboutCard description={about.description} />
                )}
              </VStack>

              <Box mt="auto" pt="4">
                <BentoCTA systemName={activeSystem?.label || seo.title} />
              </Box>
            </VStack>
          </GridItem>

          {/* Fila Inferior Completa: Ventajas Estructurales */}
          <GridItem colSpan={{ base: 1, lg: 12 }} mt={{ base: "4", lg: "6" }}>
            <StructuralFeatures />
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
};

export default ServicePageLayout;
