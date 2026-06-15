import React, { lazy, Suspense } from "react";
import { VStack } from "@chakra-ui/react";
import LandingPageSection from "@features/home/components/hero/LandingPageSection";
import { SectionSkeleton } from "@shared/components/aura/AuraSkeleton";

const ClientsSection = lazy(
    () => import("@features/home/components/clients/ClientsSection"),
);
const FeaturesSection = lazy(
    () => import("@features/home/components/features/FeaturesSection"),
);
const StoreSection = lazy(
    () => import("@features/home/components/store/StoreSection"),
);

const HomeView: React.FC = React.memo(() => {
    return (
        <VStack gap="16" w="full" align="stretch">
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
