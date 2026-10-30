"use client";

import React from "react";
import { VStack, Text } from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";

interface PublishedCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description: string;
}

export const PublishedCheckbox: React.FC<PublishedCheckboxProps> = ({ checked, onChange, label, description }) => (
  <Checkbox checked={checked} onCheckedChange={(details) => onChange(Boolean(details.checked))}>
    <VStack align="start" gap="0">
      <Text fontSize="sm" fontWeight="medium">
        {label}
      </Text>
      <Text fontSize="xs" color="text.muted">
        {description}
      </Text>
    </VStack>
  </Checkbox>
);
