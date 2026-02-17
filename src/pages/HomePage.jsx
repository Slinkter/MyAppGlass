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
        title="Vidriería en La Molina | GYA Company"
        description="Vidriería en La Molina especializada en ventanas y mamparas de vidrio templado, puertas de ducha y estructuras de vidrio.Atendemos proyectos comerciales y residenciales en Lima. tel.974-278-303"
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
