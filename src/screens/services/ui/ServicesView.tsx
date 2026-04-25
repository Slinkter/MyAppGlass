/**
 * @file ServicesView.tsx
 * @description Parent route view for the services section.
 */

import React from "react";
import { Box } from "@chakra-ui/react";

const ServicesView: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box as="section" pt={{ base: "phi_xl", md: "phi_2xl" }} pb="phi_md">
      {children}
    </Box>
  );
};

export default ServicesView;
