"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import LandingPageSection from "@features/home/components/LandingPageSection";
import FeaturesSection from "@features/home/components/FeaturesSection";
import ClientsSection from "@features/home/components/ClientsSection";
import dynamic from "next/dynamic";

const StoreSection = dynamic(() => import("@features/home/components/StoreSection"), {
  ssr: false,
});

/**
 * @page Home
 * @description Página principal de la aplicación.
 * Ensambla las secciones principales del dominio 'home'.
 */
export default function Home() {
  return (
    <Box as="main">
      <LandingPageSection />
      <FeaturesSection />
      <ClientsSection />
      <StoreSection />
    </Box>
  );
}
