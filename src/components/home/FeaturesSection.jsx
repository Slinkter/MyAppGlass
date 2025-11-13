import React from "react";
import { Box, Container, SimpleGrid, Icon, Flex } from "@chakra-ui/react";
import { features, iconMap } from "@/data/features.js";
import DataLoader from "@/components/common/DataLoader";
import FeatureListSkeleton from "./FeatureListSkeleton";
import Franja from "../common/Franja";
import FeatureCard from "./FeatureCard";

const FeaturesSection = React.memo(() => {
    const featuresData = features;

    return (
        <Box minHeight="100dvh">
            <Franja
                title={"BENEFICIOS"}
                text={"¿Por Qué Elegirnos?"}
                minHeight="20vh"
            />
            <DataLoader loadingComponent={<FeatureListSkeleton />}>
                <Container maxW="8xl" mt={6} mb={6}>
                    <Flex
                        alignItems="center"
                        justifyContent="center"
                        minHeight="80vh"
                    >
                        <SimpleGrid
                            columns={{ base: 1, md: 4 }}
                            spacingX={{ base: 5, md: 8 }} // Standardized spacingX to Chakra tokens
                            spacingY={{ base: 5, md: 8 }} // Standardized spacingY to Chakra tokens
                        >
                            {featuresData.map((feature) => {
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
                    </Flex>
                </Container>
            </DataLoader>
        </Box>
    );
});

FeaturesSection.displayName = "FeaturesSection";

export default FeaturesSection;
