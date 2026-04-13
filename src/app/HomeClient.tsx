"use client";

import React from "react";
import { VStack } from "@chakra-ui/react";
import LandingPageSection from "@features/home/components/LandingPageSection";
import FeaturesSection from "@features/home/components/FeaturesSection";
import ClientsSection from "@features/home/components/ClientsSection";
import HomeServicesSection from "@features/home/components/HomeServicesSection";
import HomeProjectsSection from "@features/home/components/HomeProjectsSection";
import dynamic from "next/dynamic";

const StoreSection = dynamic(() => import("@features/home/components/StoreSection"), {
  ssr: false,
});

/**
 * @component HomeClient
 * @description Client-side logic and layout for the Home page.
 */
export default function HomeClient() {
  return (
    <VStack as="main" gap="phi_2xl" w="full" align="stretch" pb="phi_3xl">
      <LandingPageSection />
      <HomeServicesSection />
      <HomeProjectsSection />
      <ClientsSection />
      <FeaturesSection />
      <StoreSection />
    </VStack>
  );
}
