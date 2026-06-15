/**
 * @file ServicesView.tsx
 * @description Parent route view for the services section.
 */

import React from "react";
import { Box } from "@chakra-ui/react";

const ServicesView: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box as="section" pt={{ base: "14", md: "20" }} pb="6">
      {children}
    </Box>
  );
};

export default ServicesView;
