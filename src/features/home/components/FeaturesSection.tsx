"use client";

import React from "react";
import { Icon } from "@chakra-ui/react";
import ItemGridLayout from "@/shared/components/Layout/ItemGridLayout";
import { getFeatures } from "../services/featureService";
import FeatureCard from "./FeatureCard";

const FeaturesSection = React.memo(() => {
  const { features, iconMap } = getFeatures();

  return (
    <ItemGridLayout
      title="BENEFICIOS"
      subtitle="¿Por Qué Elegirnos?"
      containerProps={{ mt: 0, pt: 8 }}
    >
      {features.map((feature: any) => {
        const FeatureIcon = (iconMap as any)[feature.iconName];
        return (
          <ItemGridLayout.Item key={feature.id}>
            <FeatureCard
              heading={feature.heading}
              icon={
                FeatureIcon ? (
                  <Icon
                    as={FeatureIcon}
                    w={{ base: 8, md: 10 }}
                    h={{ base: 8, md: 10 }}
                  />
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
