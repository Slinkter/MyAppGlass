"use client";

import React from "react";
import { Text, type TextProps } from "@chakra-ui/react";

export type SubsectionLabelProps = TextProps;

/** Etiqueta pequeña en mayúsculas (lenguaje del mapa inmersivo y de scroll-craft). */
export const SubsectionLabel: React.FC<SubsectionLabelProps> = ({
  children,
  ...rest
}) => (
  <Text
    fontSize="xs"
    fontWeight="700"
    color="text.muted"
    textTransform="uppercase"
    letterSpacing="0.12em"
    suppressHydrationWarning
    {...rest}
  >
    {children}
  </Text>
);
