import React from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

/**
 * @component ServicePage
 * @description Page component that renders service-related content.
 * Uses React Router's Outlet to render child routes (service list or individual service pages).
 * @returns {JSX.Element} The service page layout with outlet for nested routes
 */
const ServicePage = () => {
  return (
    <Box as="section" p={4}>
      <Outlet />
    </Box>
  );
};

export default ServicePage;
