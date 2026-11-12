"use client";

import React from "react";
import { Box } from "@chakra-ui/react";

export const TabFadeV2: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Box
    animation="fadeIn 200ms cubic-bezier(0.22, 1, 0.36, 1)"
    _motionReduce={{ animation: "none" }}
  >
    {children}
  </Box>
);
