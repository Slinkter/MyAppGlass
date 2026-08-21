import React from "react";
import { VStack } from "@chakra-ui/react";
import LandingPageSection from "@features/home/components/hero/LandingPageSection";
import ClientsSection from "@features/home/components/clients/ClientsSection";
import FeaturesSection from "@features/home/components/features/FeaturesSection";
import StoreSection from "@features/home/components/store/StoreSection";

const HomeView: React.FC = React.memo(() => {
    return (
        <VStack gap="16" w="full" align="stretch">
            <LandingPageSection />
            <ClientsSection />
            <FeaturesSection />
            <StoreSection />
        </VStack>
    );
});

HomeView.displayName = "HomeView";

export default HomeView;
