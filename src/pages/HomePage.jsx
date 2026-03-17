/**
 * @file HomePage.jsx
 * @description Root view component for the landing page, orchestrating main marketing sections.
 * @module pages
 */

import React, { lazy, Suspense } from "react";
import { VStack } from "@chakra-ui/react";
import HelmetWrapper from "@shared/components/HelmetWrapper";
import LoadingFallback from "@shared/components/common/LoadingFallback";

// Critical LCP Component (Eager load via direct import avoiding barrel files)
import LandingPageSection from "@features/home/components/LandingPageSection";

// Below the fold components (Lazy load + avoiding barrel files)
const ClientsSection = lazy(() => import("@features/home/components/ClientsSection"));
const FeaturesSection = lazy(() => import("@features/home/components/FeaturesSection"));
const StoreSection = lazy(() => import("@features/home/components/StoreSection"));

const HomeView = React.memo(() => {
  return (
    <>
      <HelmetWrapper
        title="Vidriería y Servicios en La Molina - GYA Company"
        description="GYA Company: Expertos en vidriería y aluminio. Ofrecemos servicios de instalación y fabricación de ventanas, mamparas, duchas y más en La Molina."
        canonicalUrl="https://www.gyacompany.com/"
      ></HelmetWrapper>
      <VStack spacing={{ base: 8, md: 24 }} pb={{ base: 8, md: 24 }} align="stretch" w="full">
        <LandingPageSection />
        <Suspense fallback={<LoadingFallback />}>
          <ClientsSection />
          <FeaturesSection />
          <StoreSection />
        </Suspense>
      </VStack>
    </>
  );
});

HomeView.displayName = "HomeView";

export default HomeView;
