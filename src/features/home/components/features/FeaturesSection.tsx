"use client";

/**
 * @file FeaturesSection.tsx
 * @description Container component that renders the list of company services/benefits.
 * @module home/components
 */

import React from "react";
import ItemGridLayout from "@/shared/components/Layout/ItemGridLayout";
import { getFeatures } from "../../services/featureService";
import FeatureCard from "./FeatureCard";

/**
 * @component FeaturesSection
 * @description Sección de "Beneficios" o características en la página principal.
 * Carga dinámicamente las características y sus iconos asociados.
 *
 * @returns {JSX.Element} Sección de beneficios renderizada.
 */

const FeaturesSection: React.FC = React.memo(() => {
  const { features, iconMap } = getFeatures();

  return (
    <ItemGridLayout
      title="CALIDAD SUPERIOR"
      subtitle="Innovación y precisión en cada estructura"
      seoTitle="Nuestros Beneficios - GYA Company"
      seoDescription="Descubre por qué somos los líderes en vidriería y aluminio. Calidad, garantía y puntualidad."
      seoCanonicalUrl="https://www.gyacompany.com/beneficios"
      containerProps={{ mt: 0, pt: 0 }}
    >
      {features.map((feature, index) => {
        const FeatureIcon = iconMap[feature.iconName];
        return (
          <ItemGridLayout.Item key={feature.id} delay={index * 0.1}>
            <FeatureCard
              heading={feature.heading}
              icon={
                FeatureIcon ? (
                  <FeatureIcon />
                ) : null
              }
              description={feature.description}
            />
          </ItemGridLayout.Item>
        );
      })}
    </ItemGridLayout>
  );
});

FeaturesSection.displayName = "FeaturesSection";

export default FeaturesSection;
