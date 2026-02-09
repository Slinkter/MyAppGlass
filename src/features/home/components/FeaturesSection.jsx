import React, { useState, useEffect, useMemo, useRef } from "react";
import { Box, Container, SimpleGrid, Icon, Spinner } from "@chakra-ui/react";
import { useAsyncData } from "@shared/hooks/data/useAsyncData";
import { getFeatures } from "../services/featureService";
import DataLoader from "@shared/components/DataLoader/DataLoader";
import FeatureListSkeleton from "./FeatureListSkeleton";
import Franja from "@/components/common/Franja";
import FeatureCard from "./FeatureCard";
import useIntersectionObserver from "@shared/hooks/observers/useIntersectionObserver";
import ScrollReveal from "@/components/common/ScrollReveal";

/**
 * @component FeaturesSection
 * @description Sección de "Beneficios" o características en la página principal.
 * Carga dinámicamente las características y sus iconos asociados.
 * Implementa Infinite Scroll para prevenir sobrecarga de renderizado.
 *
 * @returns {JSX.Element} Sección de beneficios renderizada.
 */
const FeaturesSection = React.memo(() => {
  const {
    data: featuresData,
    isLoading,
    error,
  } = useAsyncData(getFeatures, { features: [], iconMap: {} });

  // Infinite Scroll State
  const sentinelRef = useRef(null);
  const isSentinelVisible = useIntersectionObserver(sentinelRef, {
    threshold: 0.1,
  });
  const [visibleCount, setVisibleCount] = useState(4); // Start with 4

  // Infinite scroll: load more when sentinel is visible
  useEffect(() => {
    if (isSentinelVisible && featuresData?.features?.length > 0) {
      setVisibleCount((prev) =>
        Math.min(prev + 4, featuresData.features.length),
      );
    }
  }, [isSentinelVisible, featuresData]);

  return (
    <Box>
      <Franja title={"BENEFICIOS"} text={"¿Por Qué Elegirnos?"} />
      <DataLoader
        isLoading={isLoading}
        error={error}
        loadingComponent={<FeatureListSkeleton />}
      >
        {featuresData && ( // Only render if featuresData is available
          <>
            {/* Destructure features and iconMap here */}
            <Container maxW={"7xl"} mt={12} mb={0} mx={0} px={0}>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
                {featuresData.features.slice(0, visibleCount).map((feature) => {
                  const FeatureIcon = featuresData.iconMap[feature.iconName];
                  return (
                    <ScrollReveal key={feature.id} width="100%">
                      <FeatureCard
                        heading={feature.heading}
                        icon={
                          FeatureIcon ? (
                            <Icon as={FeatureIcon} w={10} h={10} />
                          ) : null
                        }
                        description={feature.description}
                      />
                    </ScrollReveal>
                  );
                })}
              </SimpleGrid>
            </Container>

            {/* Sentinel & Spinner */}
            {!isLoading && visibleCount < featuresData.features.length && (
              <Box
                ref={sentinelRef}
                h="60px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                mb={12}
              >
                <Spinner size="md" color="primary.500" thickness="3px" />
              </Box>
            )}

            {/* Spacer if done */}
            {!(visibleCount < featuresData.features.length) && !isLoading && (
              <Box h="3rem" />
            )}
          </>
        )}
      </DataLoader>
    </Box>
  );
});

FeaturesSection.displayName = "FeaturesSection";

export default FeaturesSection;
