/**
 * @file ServiceDetailView.tsx
 * @description View component for the individual service detail page.
 * @module views/services
 */

import React from "react";
import { Box } from "@chakra-ui/react";
import ServicePageContainer from "@/features/services/components/ServicePageContainer";

const ServiceDetailView: React.FC = () => {
  return (
    <Box as="section" py={1}>
      <ServicePageContainer />
    </Box>
  );
};

export default ServiceDetailView;
