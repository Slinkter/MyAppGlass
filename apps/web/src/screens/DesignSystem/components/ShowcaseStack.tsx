"use client";

import React from "react";
import { VStack, type StackProps } from "@chakra-ui/react";

export type ShowcaseStackProps = StackProps;

export const ShowcaseStack: React.FC<ShowcaseStackProps> = ({
  children,
  ...rest
}) => (
  <VStack align="stretch" gap={{ base: "5", md: "8" }} {...rest}>
    {children}
  </VStack>
);
