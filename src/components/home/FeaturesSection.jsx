import React, { useState, useEffect, useMemo } from "react";
import { Box, Container, SimpleGrid, Icon, Spinner } from "@chakra-ui/react";
import { getFeatures } from "@/services/featureService";
import DataLoader from "@/components/common/DataLoader";
import FeatureListSkeleton from "./FeatureListSkeleton";
import Franja from "@/components/common/Franja";
import FeatureCard from "./FeatureCard";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
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
  const [featuresData, setFeaturesData] = useState({
    features: [],
    iconMap: {},
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Infinite Scroll State
  const [sentinelRef, setSentinelRef] = useState(null);
  const isSentinelVisible = useIntersectionObserver(sentinelRef, {
    threshold: 0.1,
  });
  const [visibleCount, setVisibleCount] = useState(6); // Start with 6

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        setIsLoading(true);
        const data = await getFeatures();
        setFeaturesData(data);
      } catch (err) {
        setError(err.message || "Error al cargar las características.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  const { features, iconMap } = featuresData;
  const visibleFeatures = useMemo(
    () => features.slice(0, visibleCount),
    [features, visibleCount]
  );
  const hasMore = visibleCount < features.length;

  useEffect(() => {
    if (isSentinelVisible && hasMore && !isLoading) {
      setVisibleCount((prev) => Math.min(prev + 6, features.length));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSentinelVisible, hasMore, isLoading]);

  return (
    <Box>
      <Franja title={"BENEFICIOS"} text={"¿Por Qué Elegirnos?"} />
      <DataLoader
        isLoading={isLoading}
        error={error}
        loadingComponent={<FeatureListSkeleton />}
      >
        <Container maxW={"7xl"} mt={12} mb={0} mx={0} px={0}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
            {visibleFeatures.map((feature) => {
              const FeatureIcon = iconMap[feature.iconName];
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
        {!isLoading && hasMore && (
          <Box
            ref={setSentinelRef}
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
        {!hasMore && !isLoading && <Box h="3rem" />}
      </DataLoader>
    </Box>
  );
});

FeaturesSection.displayName = "FeaturesSection";

export default FeaturesSection;
