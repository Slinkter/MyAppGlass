import React, { useState, useEffect } from "react";
import { Box, Container, SimpleGrid, Icon } from "@chakra-ui/react";
import { getFeatures } from "@/services/featureService";
import DataLoader from "@/components/common/DataLoader";
import FeatureListSkeleton from "./FeatureListSkeleton";
import Franja from "@/components/common/Franja";
import FeatureCard from "./FeatureCard";

const FeaturesSection = React.memo(() => {
    const [featuresData, setFeaturesData] = useState({
        features: [],
        iconMap: {},
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return (
        <Box>
            <Franja title={"BENEFICIOS"} text={"¿Por Qué Elegirnos?"} />
            <DataLoader
                isLoading={isLoading}
                error={error}
                loadingComponent={<FeatureListSkeleton />}
            >
                <Container maxW={"7xl"} mt={12} mb={12} mx={0} px={0}>
                    <SimpleGrid
                        columns={{ base: 1, md: 2, lg: 3 }} // Adjusted as per instruction
                        spacing={10} // As per instruction
                    >
                        {features.map((feature) => {
                            const FeatureIcon = iconMap[feature.iconName]; // Use iconName from data
                            return (
                                <FeatureCard
                                    key={feature.id}
                                    heading={feature.heading}
                                    icon={
                                        FeatureIcon ? (
                                            <Icon
                                                as={FeatureIcon}
                                                w={10}
                                                h={10}
                                            />
                                        ) : null
                                    }
                                    description={feature.description}
                                />
                            );
                        })}
                    </SimpleGrid>
                </Container>
            </DataLoader>
        </Box>
    );
});

FeaturesSection.displayName = "FeaturesSection";

export default FeaturesSection;
