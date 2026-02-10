/**
 * @file FeaturesSection.jsx
 * @description Container component that renders the list of company services/benefits using staggered animations.
 * @module home/components
 */

import React from "react";
import { Icon } from "@chakra-ui/react";
import ItemGridLayout from "@/shared/components/Layout/ItemGridLayout";
import { getFeatures } from "../services/featureService";
import FeatureCard from "./FeatureCard";

/**
 * @component FeaturesSection
 * @description Sección de "Beneficios" o características en la página principal.
 * Carga dinámicamente las características y sus iconos asociados.
 * Optimizado para carga síncrona y consistente con el diseño de rejilla global.
 *
 * @returns {JSX.Element} Sección de beneficios renderizada.
 */

const FeaturesSection = React.memo(() => {
  // Get data synchronously
  const { features, iconMap } = getFeatures();

  return (
    <ItemGridLayout
      title="BENEFICIOS"
      subtitle="¿Por Qué Elegirnos?"
      seoTitle="Nuestros Beneficios - GYA Company"
      seoDescription="Descubre por qué somos los expertos líderes en vidriería y aluminio en La Molina. Calidad, garantía y puntualidad."
      seoCanonicalUrl="https://www.gyacompany.com/beneficios"
      containerProps={{ mt: 0, pt: 8 }}
    >
      {features.map((feature) => {
        const FeatureIcon = iconMap[feature.iconName];
        return (
          <ItemGridLayout.Item key={feature.id}>
            <FeatureCard
              heading={feature.heading}
              icon={
                FeatureIcon ? <Icon as={FeatureIcon} w={10} h={10} /> : null
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
