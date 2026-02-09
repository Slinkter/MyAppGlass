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
        title="Vidriería y Servicios en La Molina - GYA Company"
        description="GYA Company: Expertos en vidriería y aluminio. Ofrecemos servicios de instalación y fabricación de ventanas, mamparas, duchas y más en La Molina."
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
