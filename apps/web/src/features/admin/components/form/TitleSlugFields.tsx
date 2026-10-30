"use client";

import React from "react";
import { Input, Text, SimpleGrid } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";

interface TitleSlugFieldsProps {
  titleLabel: string;
  titlePlaceholder: string;
  title: string;
  onTitleChange: (value: string) => void;
  slugLabel: string;
  slugPlaceholder: string;
  slug: string;
  onSlugChange: (value: string) => void;
  /** Prefijo de la ruta pública, ej. "/servicios/". */
  routePrefix: string;
  /** Texto mostrado en la ruta cuando el slug está vacío. */
  slugFallback: string;
}

/** Par de campos título + slug (con ruta web de ayuda) compartido por los modales de admin. */
export const TitleSlugFields: React.FC<TitleSlugFieldsProps> = ({
  titleLabel,
  titlePlaceholder,
  title,
  onTitleChange,
  slugLabel,
  slugPlaceholder,
  slug,
  onSlugChange,
  routePrefix,
  slugFallback,
}) => (
  <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
    <Field label={titleLabel} required>
      <Input
        placeholder={titlePlaceholder}
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        required
      />
    </Field>

    <Field
      label={slugLabel}
      required
      helperText={
        <Text fontSize="2xs" color="text.muted">
          Ruta web: {routePrefix}
          {slug || slugFallback}
        </Text>
      }
    >
      <Input
        placeholder={slugPlaceholder}
        value={slug}
        onChange={(e) => onSlugChange(e.target.value)}
        required
      />
    </Field>
  </SimpleGrid>
);
