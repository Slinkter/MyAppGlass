import React from "react";
import { Box } from "@chakra-ui/react"; // Import Box
import ServiceList from "../components/services/ServiceList"; // Import ServiceList

const ServiceView = () => {
    return (
        <Box as="section" p={4}>
            <ServiceList />
        </Box>
    );
};

export default ServiceView;
