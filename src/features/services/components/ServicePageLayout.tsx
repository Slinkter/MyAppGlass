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
import { BentoCTA, UnifiedTechnicalCard } from "./ServiceBentoGrid";



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
        <VStack gap={{ base: "6", lg: "8" }} align="stretch">
          <ServiceHeader 
            title={seo.title}
            systems={systems}
            activeIndex={activeIndex}
            onSelect={handleSelect}
          />

          <Grid
            templateColumns={{ base: "1fr", lg: "repeat(12, 1fr)" }}
            gap={{ base: "6", lg: "8" }}
            alignItems="stretch"
            h={{ lg: "530px", xl: "550px" }}
          >
            {/* Columna Derecha en Desktop / Superior en Móvil: Galería de fotos */}
            <GridItem colSpan={{ base: 1, lg: 7 }} order={{ base: 1, lg: 2 }} display="flex" flexDirection="column" minW={0}>
              <Skeleton
                loading={isPending}
                borderRadius="3xl"
                height="100%"
                w="full"
                flex="1"
              >
                <Box
                  h={{ base: "320px", md: "500px", lg: "530px", xl: "550px" }}
                  position="relative"
                  w="full"
                  overflow="hidden"
                  borderRadius="3xl"
                >
                  <Box
                    key={`gallery-${activeIndex}`}
                    w="full"
                    h="full"
                    animation="scaleIn 0.5s cubic-bezier(0, 0.55, 0.45, 1)"
                    overflow="hidden"
                    borderRadius="3xl"
                  >
                    {activeImageList.length > 0 ? (
                      <Gallery images={activeImageList}>
                        <Flex
                          direction={{ base: "column", md: "row" }}
                          gap={{ base: "4", md: "8" }}
                          h="100%"
                          w="100%"
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

            {/* Columna Izquierda en Desktop / Inferior en Móvil: Concepto Técnico + Ventajas, CTA */}
            <GridItem colSpan={{ base: 1, lg: 5 }} order={{ base: 2, lg: 1 }} display="flex" flexDirection="column" minW={0}>
              <VStack gap="5" align="stretch" h="100%" flex="1">
                {about && (
                  <UnifiedTechnicalCard description={about.description} />
                )}

                <Box flex="1" display="flex" flexDirection="column">
                  <BentoCTA systemName={activeSystem?.label || seo.title} />
                </Box>
              </VStack>
            </GridItem>
          </Grid>
        </VStack>
      </Container>
    </Box>
  );
};

export default ServicePageLayout;
