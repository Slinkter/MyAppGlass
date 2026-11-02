"use client";

import React from "react";
import { Text, type TextProps } from "@chakra-ui/react";

export type SubsectionLabelProps = TextProps;

export const SubsectionLabel: React.FC<SubsectionLabelProps> = ({
  children,
  ...rest
}) => (
  <Text
    fontSize="xs"
    fontWeight="semibold"
    color="text.muted"
    textTransform="uppercase"
    letterSpacing="wider"
    {...rest}
  >
    {children}
  </Text>
);
