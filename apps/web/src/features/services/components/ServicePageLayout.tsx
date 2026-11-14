"use client";

import React from "react";
import { preconnect, preload } from "react-dom";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { companyData } from "@/shared/config/company-data";
import { quoteEntryHref } from "@/entities/quote";
import type { ServicePageData } from "@/entities/service/model";
import ServiceHeader from "./ServiceHeader";
import { ServiceHeroStage } from "./ServiceHeroStage";
import { ServiceSpecsSection } from "./ServiceSpecsSection";
import { ServiceFaqSection } from "./ServiceFaqSection";

export interface ServicePageLayoutProps {
  pageData: ServicePageData & { about?: { description: string; shortDescription?: string } };
  /** Slug del servicio; decide si el CTA va al cotizador o a WhatsApp. */
  serviceSlug?: string;
}

const ServicePageLayout: React.FC<ServicePageLayoutProps> = ({
  pageData,
  serviceSlug,
}) => {
  const {
    seo,
    about,
    systems,
    imageLists,
    faqs,
    specs,
    systemSheets,
    coverImage,
  } = pageData;

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [, startTransition] = React.useTransition();

  const activeImageList = React.useMemo(
    () => imageLists[activeIndex] || [],
    [imageLists, activeIndex],
  );
  const activeSystem = React.useMemo(
    () => systems[activeIndex],
    [systems, activeIndex],
  );
  const activeSystemSheet = React.useMemo(() => {
    if (!activeSystem?.label || !systemSheets?.length) return undefined;
    const target = activeSystem.label.trim().toLowerCase();
    return systemSheets.find(
      (sheet) => sheet.nombre.trim().toLowerCase() === target,
    );
  }, [activeSystem, systemSheets]);

  const firstImageSrc = activeImageList[0]?.src || coverImage;
  if (firstImageSrc) {
    preconnect("https://firebasestorage.googleapis.com");
    preload(firstImageSrc, { as: "image", fetchPriority: "high" });
  }

  const handleSelect = React.useCallback((index: number) => {
    startTransition(() => {
      setActiveIndex(index);
    });
  }, []);

  const pageTitle = about.title || seo.title;
  const activeSystemLabel = activeSystem?.label || pageTitle;
  const ctaWhatsappUrl = `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(
    `Hola, quisiera asesoría y presupuesto para ${pageTitle} (${activeSystemLabel}).`,
  )}`;

  return (
    <Box
      bg="bg.page"
      animation="fadeIn 0.4s ease-out"
      _motionReduce={{ animation: "none", transition: "none" }}
    >
      <Container
        maxW="7xl"
        px={{ base: "3", sm: "4", lg: "0" }}
        pt={{ base: "3", md: "5" }}
        pb={{ base: "12", lg: "10" }}
      >
        <VStack gap={{ base: "5", md: "7" }} align="stretch">
          <ServiceHeader
            title={pageTitle}
            systems={systems}
            activeIndex={activeIndex}
            onSelect={handleSelect}
          />

          <ServiceHeroStage
            serviceSlug={serviceSlug}
            serviceTitle={pageTitle}
            systemLabel={activeSystemLabel}
            systemDescription={activeSystem?.description}
            shortDescription={about.shortDescription}
            fullDescription={about.description}
            images={activeImageList}
            coverImage={coverImage}
            activeSystemSheet={activeSystemSheet}
            quoteHref={quoteEntryHref(serviceSlug, activeSystem?.label)}
          />

          {/* Ficha técnica del sistema activo: sin repetir el párrafo resumen ya mostrado arriba */}
          {activeSystemSheet &&
            ((activeSystemSheet.usos && activeSystemSheet.usos.length > 0) ||
              (activeSystemSheet.specs && activeSystemSheet.specs.length > 0)) && (
              <Box
                id="ficha-sistema"
                w="full"
                p={{ base: "4", md: "6" }}
                borderRadius="card"
                borderWidth="1px"
                borderColor="border.default"
                bg="bg.page"
              >
                <VStack align="stretch" gap="5">
                  {activeSystemSheet.usos && activeSystemSheet.usos.length > 0 && (
                    <VStack align="flex-start" gap="2.5">
                      <Heading
                        as="h2"
                        fontSize={{ base: "sm", md: "md" }}
                        fontWeight="700"
                        color="text.heading"
                      >
                        Usos recomendados de {activeSystemSheet.nombre}
                      </Heading>
                      <Grid
                        templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }}
                        gap="2"
                        w="full"
                      >
                        {activeSystemSheet.usos.map((uso, idx) => (
                          <HStack key={`${uso}-${idx}`} gap="2" align="flex-start">
                            <Box
                              as={CheckCircle2}
                              color="text.heading"
                              boxSize="4"
                              mt="0.5"
                              flexShrink={0}
                              aria-hidden="true"
                            />
                            <Text fontSize="sm" color="text.body">
                              {uso}
                            </Text>
                          </HStack>
                        ))}
                      </Grid>
                    </VStack>
                  )}

                  {activeSystemSheet.specs && activeSystemSheet.specs.length > 0 && (
                    <VStack align="flex-start" gap="2.5">
                      <Heading
                        as="h3"
                        fontSize={{ base: "sm", md: "md" }}
                        fontWeight="700"
                        color="text.heading"
                      >
                        Especificaciones de {activeSystemSheet.nombre}
                      </Heading>
                      <Grid
                        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                        gap="2.5"
                        w="full"
                      >
                        {activeSystemSheet.specs.map((item, idx) => (
                          <Box
                            key={`${item.label}-${idx}`}
                            p="3.5"
                            borderRadius="lg"
                            borderWidth="1px"
                            borderColor="border.subtle"
                            bg="bg.subtle"
                          >
                            <Text fontSize="xs" fontWeight="700" color="text.heading">
                              {item.label}
                            </Text>
                            <Text
                              fontSize="sm"
                              color="text.body"
                              fontVariantNumeric="tabular-nums"
                              mt="0.5"
                            >
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

          <ServiceSpecsSection specs={specs} serviceTitle={pageTitle} />

          <ServiceFaqSection faqs={faqs} serviceTitle={pageTitle} />

          {/* Banda de cierre directo por WhatsApp */}
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            gap="4"
            p={{ base: "5", md: "7" }}
            borderRadius="card"
            bg="brand.ink"
            color="white"
          >
            <VStack align="flex-start" gap="1">
              <Heading
                as="h2"
                fontFamily="heading"
                fontWeight="700"
                fontSize={{ base: "xl", md: "2xl" }}
                color="white"
              >
                ¿Necesita asesoría técnica para su proyecto?
              </Heading>
              <Text fontSize="sm" color="whiteAlpha.900">
                Atendemos obras en La Molina, Surco, San Borja, San Isidro y Miraflores.
              </Text>
            </VStack>
            <Button
              asChild
              variant="whatsapp"
              size="md"
              minH="11"
              px="6"
              borderRadius="full"
              flexShrink={0}
            >
              <a href={ctaWhatsappUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={18} aria-hidden="true" />
                Consultar por WhatsApp
              </a>
            </Button>
          </Flex>
        </VStack>
      </Container>
    </Box>
  );
};

export default ServicePageLayout;
