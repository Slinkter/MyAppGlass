/**
 * @file HomePage.jsx
 * @description Root view component for the landing page, orchestrating main marketing sections.
 * @module pages
 */

import React from "react";
import { Box } from "@chakra-ui/react";
import HelmetWrapper from "@shared/components/HelmetWrapper";
import {
  LandingPageSection,
  ClientsSection,
  FeaturesSection,
  StoreSection,
} from "@features/home";

const HomeView = React.memo(() => {
  return (
    <>
      <HelmetWrapper
        title="Vidriería en La Molina | Ventanas, Mamparas y Aluminio - GYA Company"
        description="Líderes en vidriería en La Molina. Fabricación e instalación experta de ventanas, mamparas, duchas y estructuras de aluminio. Cotiza tu proyecto en La Molina hoy."
        canonicalUrl="https://www.gyacompany.com/"
      ></HelmetWrapper>
      <Box>
        <LandingPageSection />
        <ClientsSection />
        <FeaturesSection />
        <StoreSection />
      </Box>
    </>
  );
});

HomeView.displayName = "HomeView";

export default HomeView;
