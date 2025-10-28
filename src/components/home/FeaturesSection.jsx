import React from "react";
import FeatureCard from "./FeatureCard";
import { Box, Container, SimpleGrid, Icon, Flex } from "@chakra-ui/react";
import Franja from "../common/Franja";
import { useFeatures } from "@/hooks/useFeatures";
import DataLoader from "@/components/common/DataLoader";
import FeatureListSkeleton from "./FeatureListSkeleton";
import { iconMap } from "@/data/features.js"; // Import iconMap from the centralized data file

const FeaturesSection = React.memo(() => {
    const { features, isLoading, error } = useFeatures();

    return (
        <Box minHeight="100vh">
            <Franja
                title={"BENEFICIOS"}
                text={"¿Por Qué Elegirnos?"}
                minHeight={"20vh"}
            />
            <DataLoader
                isLoading={isLoading}
                error={error}
                loadingComponent={<FeatureListSkeleton />}
            >
                <Container maxW={"8xl"} mt={6} mb={6}>
                    <Flex
                        alignItems={"center"}
                        justifyContent={"center"}
                        minHeight={"80vh"}
                    >
                        <SimpleGrid
                            columns={{ base: 1, md: 4 }}
                            spacingX={{ base: "20px", md: "30px" }}
                            spacingY={{ base: "20px", md: "30px" }}
                        >
                            {features.map((feature) => {
                                const FeatureIcon = iconMap[feature.iconName]; // Use iconName from data
                                return (
                                    <FeatureCard
                                        key={feature.id}
                                        heading={feature.heading}
                                        icon={FeatureIcon ? <Icon as={FeatureIcon} w={10} h={10} /> : null}
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
