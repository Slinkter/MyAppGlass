"use client";

import React from "react";
import type { Project as FirestoreProject } from "@/shared/api/firebase/types";
import { SITE_URL } from "@/shared/config/company-data";
import ItemGridLayout from "@/shared/components/Layout/ItemGridLayout";
import { ImmersiveLocationMap } from "@/features/location/ImmersiveLocationMap";

export interface StoreSectionProps {
    initialProjects?: FirestoreProject[];
}

/**
 * Sección de ubicación del home: mapa inmersivo minimalista (antes prototipo B del design system).
 * El mapa ocupa el escenario; la sede, las obras entregadas y el dock inferior flotan encima.
 * @component
 */
const StoreSection: React.FC<StoreSectionProps> = React.memo(({ initialProjects }) => (
    <ItemGridLayout
        eyebrow="Ubicación"
        title="Visítanos en La Molina"
        subtitle="SEDE PRINCIPAL | PROYECTOS ENTREGADOS"
        seoTitle="Ubicaciones - GYA Company"
        seoDescription="Encuentra nuestra tienda principal en Lima y explora la ubicación de nuestros proyectos de vidriería y aluminio."
        seoCanonicalUrl={`${SITE_URL}/ubicaciones`}
        columns={{ base: 1 }}
        gap="6"
        containerProps={{
            mt: 0,
            pt: 0,
            pb: 0,
        }}
    >
        <ItemGridLayout.Item>
            <ImmersiveLocationMap initialProjects={initialProjects} />
        </ItemGridLayout.Item>
    </ItemGridLayout>
));

StoreSection.displayName = "StoreSection";

export default StoreSection;
