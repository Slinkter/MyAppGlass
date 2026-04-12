import React, { lazy } from "react";
import { VStack } from "@chakra-ui/react";

const LandingPageSection = lazy(
    () => import("@features/home/components/LandingPageSection"),
);
const ClientsSection = lazy(
    () => import("@features/home/components/ClientsSection"),
);
const FeaturesSection = lazy(
    () => import("@features/home/components/FeaturesSection"),
);
const StoreSection = lazy(
    () => import("@features/home/components/StoreSection"),
);

const HomeView = React.memo(() => {
    return (
        <VStack spacing="phi_2xl" w="full" align="stretch">
            <LandingPageSection />
            <ClientsSection />
            <FeaturesSection />
            <StoreSection />
        </VStack>
    );
});

HomeView.displayName = "HomeView";

export default HomeView;
