import React, { Suspense } from "react";
import { Metadata } from "next";
import { VStack } from "@chakra-ui/react";
import LandingPageSection from "@/features/home/components/LandingPageSection";
import ClientsSection from "@/features/home/components/ClientsSection";
import FeaturesSection from "@/features/home/components/FeaturesSection";
import StoreSection from "@/features/home/components/StoreSection";
import { SectionSkeleton } from "@/shared/components/aura/AuraSkeleton";

export const metadata: Metadata = {
    title: "GYA Glass & Aluminum | Innovación en Cerramientos de Vidrio",
    description: "Líderes en diseño e instalación de soluciones premium en vidrio y aluminio. Ventanas, mamparas y estructuras a medida en La Molina, Lima.",
    alternates: {
        canonical: "https://www.gyacompany.com",
    },
};

export default function Page() {
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
}
