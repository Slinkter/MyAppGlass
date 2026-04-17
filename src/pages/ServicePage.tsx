/**
 * @file ServicePage.tsx
 * @description Parent route component for the services section, providing a container for sub-routes.
 * @module pages
 */

import React from "react";
import { Box } from "@chakra-ui/react";
;

const ServicePage: React.FC = () => {
  return (
    <Box as="section" py={1}>
      {children}
    </Box>
  );
};

export default ServicePage;
