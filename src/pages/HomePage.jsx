import React from "react";
import { Box } from "@chakra-ui/react";
import HelmetWrapper from "@/components/HelmetWrapper";
import LandingPageSection from "@/components/home/LandingPageSection";
import ClientsSection from "@/components/home/ClientsSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import StoreSection from "@/components/home/StoreSection";

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
