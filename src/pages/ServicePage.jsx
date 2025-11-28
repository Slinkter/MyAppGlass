import React from "react";
import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const ServicePage = () => {
  return (
    <Box as="section" py={4}>
      <Outlet />
    </Box>
  );
};

export default ServicePage;
