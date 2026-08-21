"use client";

import React from "react";
import { Box } from "@chakra-ui/react";
import { servicePageDataMap } from "@/features/services/data/servicePageDataMap";
import ServicePageLayout from "@/features/services/components/ServicePageLayout";

interface ServiceDetailViewProps {
  serviceSlug: string;
}

const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({ serviceSlug }) => {
  const pageData = serviceSlug ? servicePageDataMap[serviceSlug] : null;
  if (!pageData) return null;
  return (
    <Box as="section" py={1}>
      <ServicePageLayout pageData={pageData} />
    </Box>
  );
};

export default ServiceDetailView;

