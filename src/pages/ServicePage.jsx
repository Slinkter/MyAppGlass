import React from "react";
import { Box } from "@chakra-ui/react"; // Import Box
// Removed ServiceList import
import { Outlet } from "react-router-dom"; // Import Outlet

const ServiceView = () => {
    return (
        <Box as="section" p={4}>
            <Outlet /> {/* Render child routes here */}
        </Box>
    );
};

export default ServiceView;
