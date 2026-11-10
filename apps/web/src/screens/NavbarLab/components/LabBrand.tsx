"use client";

/**
 * @file LabBrand.tsx
 * @description Logo (SVG oficial) + "GYA" en una sola línea, igual en las 4 variantes de prueba.
 */

import React from "react";
import Image from "next/image";
import { HStack, Text } from "@chakra-ui/react";
import logoGYA from "@/assets/branding/logosvg.svg";
import { companyData } from "@/shared/config/company-data";

export interface LabBrandProps {
  /** Token de color del texto. Por defecto `text.heading`. */
  color?: string;
}

export const LabBrand: React.FC<LabBrandProps> = ({ color = "text.heading" }) => (
  <HStack gap="2.5" align="center" minH="11">
    <Image
      src={logoGYA}
      alt={companyData.companyName}
      width={32}
      height={32}
      unoptimized
      style={{ flexShrink: 0 }}
    />
    <Text
      fontFamily="heading"
      fontWeight="700"
      fontSize="md"
      color={color}
      letterSpacing="tight"
    >
      GYA
    </Text>
  </HStack>
);
