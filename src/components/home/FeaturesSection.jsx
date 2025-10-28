import React, { useEffect } from "react";
import FeatureCard from "./FeatureCard";
import { Box, Container, SimpleGrid, Icon, Flex, Text, Spinner } from "@chakra-ui/react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchFeatures } from '../../features/features/featuresSlice';
import Franja from "../common/Franja";

// Import all icons needed and map them to a dictionary
import {
    IoIosCalculator,
    IoIosCalendar,
    IoIosKeypad,
    IoIosPaper,
    IoMdConstruct,
    IoMdPricetags,
    IoMdSwap,
} from "react-icons/io";
import { HiOutlineBanknotes } from "react-icons/hi2";

const iconMap = {
    IoIosCalculator: IoIosCalculator,
    IoIosCalendar: IoIosCalendar,
    IoIosKeypad: IoIosKeypad,
    IoMdConstruct: IoMdConstruct,
    IoMdSwap: IoMdSwap,
    HiOutlineBanknotes: HiOutlineBanknotes,
    IoIosPaper: IoIosPaper,
    IoMdPricetags: IoMdPricetags,
};

const FeaturesSection = React.memo(() => {
    const dispatch = useDispatch();
    const features = useSelector((state) => state.features.items);
    const featureStatus = useSelector((state) => state.features.status);
    const error = useSelector((state) => state.features.error);

    useEffect(() => {
        if (featureStatus === 'idle') {
            dispatch(fetchFeatures());
        }
    }, [featureStatus, dispatch]);

    if (featureStatus === 'loading') {
        return (
            <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (featureStatus === 'failed') {
        return <Text>Error: {error}</Text>;
    }

    return (
        <Box minHeight="100vh">
            <Franja
                title={"BENEFICIOS"}
                text={"¿Por Qué Elegirnos?"}
                minHeight={"20vh"}
            />
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
                        {features.map((feature, index) => {
                            const FeatureIcon = iconMap[feature.icon];
                            return (
                                <FeatureCard
                                    key={index}
                                    heading={feature.heading}
                                    icon={FeatureIcon ? <Icon as={FeatureIcon} w={10} h={10} /> : null}
                                    description={feature.description}
                                />
                            );
                        })}
                    </SimpleGrid>
                </Flex>
            </Container>
        </Box>
    );
});

export default FeaturesSection;
