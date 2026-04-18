"use client";
import React from "react";
import {
  Box,
  VStack,
  Container,
  Skeleton,
} from "@chakra-ui/react";
import { LazyMotion, m, domAnimation, AnimatePresence } from "framer-motion";
import Gallery from "@shared/components/common/Gallery";
import ComingSoonDisplay from "@shared/components/common/ComingSoonDisplay";
import { ServicePageData, ServicePageFeature } from "../services/serviceService";
import ServiceHeader from "./ServiceHeader";
import ServiceBentoGrid from "./ServiceBentoGrid";

export interface ServicePageLayoutProps {
  pageData: ServicePageData & { about?: { description: string }, benefits?: ServicePageFeature[] };
}

/**
 * @component ServicePageLayout
 * @description Clean orchestrator for service detail pages.
 */
const ServicePageLayout: React.FC<ServicePageLayoutProps> = ({ pageData }) => {
  const { seo, about, benefits, systems, imageLists } = pageData;
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
    <LazyMotion features={domAnimation}>
      <Box
        as={m.div}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <Container maxW="7xl" pt={{ base: 4, md: 8 }} pb={32}>
          <VStack gap={{ base: 12, lg: 16 }} align="stretch">
            
            <ServiceHeader 
              title={seo.title}
              systems={systems}
              activeIndex={activeIndex}
              onSelect={handleSelect}
            />

            <Skeleton
              loading={isPending}
              borderRadius="3xl"
              startColor="bg.subtle"
              endColor="bg.section"
              _dark={{ startColor: "whiteAlpha.50", endColor: "whiteAlpha.100" }}
            >
              <Box
                h={{ base: "350px", md: "500px", lg: "65vh" }}
                minH={{ md: "500px" }}
                maxH={{ lg: "800px" }}
                position="relative"
              >
                <AnimatePresence mode="wait">
                  <m.div
                    key={`gallery-${activeIndex}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    style={{ width: "100%", height: "100%" }}
                  >
                    {activeImageList.length > 0 ? (
                      <Gallery images={activeImageList} />
                    ) : (
                      <ComingSoonDisplay />
                    )}
                  </m.div>
                </AnimatePresence>
              </Box>
            </Skeleton>

            <ServiceBentoGrid 
              activeIndex={activeIndex}
              about={about}
              benefits={benefits}
              systemName={activeSystem?.label || seo.title}
            />

          </VStack>
        </Container>
      </Box>
    </LazyMotion>
  );
};

export default ServicePageLayout;
