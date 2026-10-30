/**
 * @file ServicesListView.tsx
 * @description View component for the services section, rendering the list of available services.
 * @module views/services
 */

import React from "react";
import { Box } from "@chakra-ui/react";
import type { Service } from "@/shared/api/firebase/types";
import ServiceList from "@/features/services/components/ServiceList";

interface ServicesListViewProps {
  /** Servicios leídos de Firestore en build (primer render, para el HTML exportado). */
  initialData?: Service[];
}

const ServicesListView: React.FC<ServicesListViewProps> = ({ initialData }) => {
  return (
    <Box as="section">
      <ServiceList initialData={initialData} />
    </Box>
  );
};

export default ServicesListView;
