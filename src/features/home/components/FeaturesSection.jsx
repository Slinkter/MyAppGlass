/**
 * @file FeaturesSection.jsx
 * @description Container component that renders the list of company services/benefits using staggered animations.
 * @module home/components
 */

import React from "react";
import { Icon, Center, Spinner } from "@chakra-ui/react";
import ItemGridLayout from "@/shared/components/Layout/ItemGridLayout";
import { getFeatures } from "../services/featureService";
import FeatureCard from "./FeatureCard";
import { useAsyncData } from "@/shared/hooks/data/useAsyncData";
import DataLoader from "@/shared/components/DataLoader/DataLoader";

/**
 * @component FeaturesSection
 * @description Sección de "Beneficios" o características en la página principal.
 * Carga dinámicamente las características y sus iconos asociados.
 *
 * @returns {JSX.Element} Sección de beneficios renderizada.
 */

const FeaturesSection = React.memo(() => {
  const { data, isLoading, error } = useAsyncData(getFeatures, { features: [], iconMap: {} });
  const { features, iconMap } = data;

  return (
    <DataLoader
      isLoading={isLoading}
      error={error}
      loadingComponent={
        <Center py={12}>
          <Spinner size="xl" color="primary.500" />
        </Center>
      }
    >
      <ItemGridLayout
        title="BENEFICIOS"
        subtitle="¿Por Qué Elegirnos?"
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
    </DataLoader>
  );
});

FeaturesSection.displayName = "FeaturesSection";

export default FeaturesSection;
