/**
 * @file ServicePageLayout.jsx
 * @description Main structure for the detailed service page, splitting view between a sidebar and a gallery.
 * @module services/components
 */

import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Box, Grid, GridItem } from "@chakra-ui/react";
import Gallery from "@shared/components/common/Gallery";
import GlassCard from "@shared/components/common/GlassCard";
import ServiceSidebar from "./ServiceSidebar";
const ServicePageLayout = ({ pageData }) => {
  const { seo, systems, features, imageLists } = pageData;

  // Estado local para la selección de sistemas
  // Nota: Podría extraerse a un hook useServiceLogic si crece la complejidad
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImageList = imageLists[activeIndex] || [];
  const activeSystem = systems[activeIndex];

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Helmet>

      <Box p={{ base: 0, md: 4, lg: 2 }} w="100%" overflowX="hidden">
        <Grid
          templateColumns={{ base: "minmax(0, 1fr)", lg: "1fr 3fr" }}
          maxW="100%"
          mx="auto"
          gap={{ base: 3, md: 5, lg: 6 }}
          alignItems="start"
          px={{ base: 3, md: 0 }}
          py={{ base: 3, md: 0 }}
        >
          {/* CARD 1: PANEL DE CONTROL */}
          <GridItem w="100%" minW={0}>
            <ServiceSidebar
              seo={seo}
              systems={systems}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              activeSystem={activeSystem}
              features={features}
            />
          </GridItem>

          {/* CARD 2: GALERÍA DE IMÁGENES */}
          <GridItem w="100%" minW={0}>
            <GlassCard
              h={{ base: "360px", sm: "410px", md: "500px", lg: "85vh" }}
              overflow="hidden"
              p={{ base: 2, md: 4, lg: 6 }}
            >
              <Box h="100%" w="100%" minW={0} maxW="100%">
                <Gallery images={activeImageList} />
              </Box>
            </GlassCard>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default ServicePageLayout;
