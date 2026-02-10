import React from "react";
import { Box, Container, SimpleGrid, Icon } from "@chakra-ui/react";
import { getFeatures } from "../services/featureService";
import Franja from "@shared/components/common/Franja";
import FeatureCard from "./FeatureCard";
import ScrollReveal from "@shared/components/common/ScrollReveal";

/**
 * @component FeaturesSection
 * @description Sección de "Beneficios" o características en la página principal.
 * Carga dinámicamente las características y sus iconos asociados.
 * Implementa Infinite Scroll para prevenir sobrecarga de renderizado.
 *
 * @returns {JSX.Element} Sección de beneficios renderizada.
 */
const FeaturesSection = React.memo(() => {
  // Get data synchronously
  const { features, iconMap } = getFeatures();

  return (
    <Box>
      <Franja title={"BENEFICIOS"} text={"¿Por Qué Elegirnos?"} />

      <Container maxW={"7xl"} mt={12} mb={12} mx={0} px={0}>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {features.map((feature) => {
            const FeatureIcon = iconMap[feature.iconName];
            return (
              <ScrollReveal key={feature.id} width="100%">
                <FeatureCard
                  heading={feature.heading}
                  icon={
                    FeatureIcon ? <Icon as={FeatureIcon} w={10} h={10} /> : null
                  }
                  description={feature.description}
                />
              </ScrollReveal>
            );
          })}
        </SimpleGrid>
      </Container>
    </Box>
  );
});

FeaturesSection.displayName = "FeaturesSection";

export default FeaturesSection;
