import React, { lazy, Suspense } from "react";
import { VStack } from "@chakra-ui/react";
import LandingPageSection from "@features/home/components/LandingPageSection";
import { SectionSkeleton } from "@shared/components/aura/AuraSkeleton";

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
        <VStack gap="phi_2xl" w="full" align="stretch">
            <LandingPageSection />
            
            <Suspense fallback={<SectionSkeleton h="300px" />}>
                <ClientsSection />
            </Suspense>

            <Suspense fallback={<SectionSkeleton h="600px" />}>
                <FeaturesSection />
            </Suspense>

            <Suspense fallback={<SectionSkeleton h="450px" />}>
                <StoreSection />
            </Suspense>
        </VStack>
    );
});

HomeView.displayName = "HomeView";

export default HomeView;
