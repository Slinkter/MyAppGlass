/**
 * @file ServicesListView.tsx
 * @description View component for the services section, rendering the list of available services.
 * @module views/services
 */

import React from "react";
import { Box } from "@chakra-ui/react";
import ServiceList from "@/features/services/components/ServiceList";

const ServicesListView: React.FC = () => {
  return (
    <Box as="section">
      <ServiceList />
    </Box>
  );
};

export default ServicesListView;
