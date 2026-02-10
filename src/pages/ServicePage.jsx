/**
 * @file ServicePage.jsx
 * @description Parent route component for the services section, providing a container for sub-routes.
 * @module pages
 */

import React from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const ServicePage = () => {
  return (
    <Box as="section" py={1}>
      <Outlet />
    </Box>
  );
};

export default ServicePage;
