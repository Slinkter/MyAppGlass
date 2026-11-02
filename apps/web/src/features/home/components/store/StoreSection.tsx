"use client";

import React from "react";
import { SITE_URL } from "@/shared/config/company-data";
import ItemGridLayout from "@/shared/components/Layout/ItemGridLayout";
import { PrototypeImmersive } from "@/screens/DesignSystemUbicacion/prototypes/PrototypeImmersive";

/**
 * Sección de ubicación del home: mapa inmersivo minimalista (prototipo B del design system).
 * El mapa ocupa el escenario; la sede, las obras entregadas y el dock inferior flotan encima.
 * @component
 */
const StoreSection: React.FC = React.memo(() => (
    <ItemGridLayout
        title="UBICACIÓN"
        subtitle="SEDE PRINCIPAL | PROYECTOS ENTREGADOS"
        seoTitle="Ubicaciones - GYA Company"
        seoDescription="Encuentra nuestra tienda principal en Lima y explora la ubicación de nuestros proyectos de vidriería y aluminio."
        seoCanonicalUrl={`${SITE_URL}/ubicaciones`}
        columns={{ base: 1 }}
        gap="6"
        containerProps={{
            mt: 0,
            py: "14",
        }}
    >
        <ItemGridLayout.Item>
            <PrototypeImmersive />
        </ItemGridLayout.Item>
    </ItemGridLayout>
));

StoreSection.displayName = "StoreSection";

export default StoreSection;
