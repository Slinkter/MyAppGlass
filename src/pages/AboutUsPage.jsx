import { Box } from "@chakra-ui/react";
import StoreSection from "../components/home/StoreSection";
import FeaturesSection from "../components/home/FeaturesSection";
import ClientsSection from "../components/home/ClientsSection";
import LandingPageSection from "../components/home/LandingPageSection";

const UsView = () => {
    return (
        <Box>
            <LandingPageSection />
            <ClientsSection />
            <FeaturesSection />
            <StoreSection />
        </Box>
    );
};

export default UsView;
