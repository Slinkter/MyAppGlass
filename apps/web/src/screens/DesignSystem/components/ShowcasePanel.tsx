"use client";

import React from "react";
import { Box, type BoxProps } from "@chakra-ui/react";

export type ShowcasePanelProps = BoxProps;

export const ShowcasePanel: React.FC<ShowcasePanelProps> = ({
  bg = "bg.page",
  children,
  ...rest
}) => (
  <Box
    p={{ base: "3", md: "5" }}
    borderRadius="xl"
    borderWidth="1px"
    borderColor="border.subtle"
    bg={bg}
    {...rest}
  >
    {children}
  </Box>
);
