import React from "react";
import {
    Box,
    Container,
    SimpleGrid,
    Icon,
} from "@chakra-ui/react";
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
                <Container maxW="7xl" mt={6} mb={6}> {/* Changed maxW to 7xl */}
                    <SimpleGrid
                        columns={{ base: 1, md: 2, lg: 3 }} // Adjusted as per instruction
                        spacing={10} // As per instruction
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
                </Container>
            </DataLoader>
        </Box>
    );
});

FeaturesSection.displayName = "FeaturesSection";

export default FeaturesSection;
