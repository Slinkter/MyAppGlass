"use client";

import React, { useState } from "react";
import { VStack, HStack, Text, Input, Button, Badge, IconButton } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { Plus, Trash2 } from "lucide-react";

interface FeaturesEditorProps {
  features: string[];
  onChange: (features: string[]) => void;
}

/** Editor de viñetas (características técnicas / ventajas) con tags removibles. */
export const FeaturesEditor: React.FC<FeaturesEditorProps> = ({ features, onChange }) => {
  const [newFeature, setNewFeature] = useState("");

  const handleAddFeature = () => {
    if (!newFeature.trim()) return;
    onChange([...features, newFeature.trim()]);
    setNewFeature("");
  };

  const handleRemoveFeature = (idx: number) => {
    onChange(features.filter((_, i) => i !== idx));
  };

  return (
    <VStack align="stretch" gap="2">
      <Field
        label="Características Técnicas / Ventajas"
        helperText="Presiona enter o haz clic en '+' para agregar viñetas"
      >
        <HStack gap="2">
          <Input
            placeholder="Ej. Aislamiento acústico de hasta 35dB"
            value={newFeature}
            onChange={(e) => setNewFeature(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddFeature();
              }
            }}
          />
          <Button
            size="sm"
            variant="outline"
            borderColor="border.default"
            onClick={handleAddFeature}
            type="button"
          >
            <Plus size={16} style={{ flexShrink: 0 }} />
          </Button>
        </HStack>
      </Field>

      {features.length > 0 && (
        <HStack wrap="wrap" gap="2" pt="1">
          {features.map((feat, idx) => (
            <Badge
              key={idx}
              size="md"
              variant="subtle"
              colorPalette="blue"
              px="2.5"
              py="1"
              borderRadius="md"
            >
              <Text as="span" mr="1.5">
                {feat}
              </Text>
              <IconButton
                aria-label="Remover característica"
                size="2xs"
                variant="ghost"
                color="text.muted"
                _hover={{ color: "red.500" }}
                onClick={() => handleRemoveFeature(idx)}
              >
                <Trash2 size={12} style={{ flexShrink: 0 }} />
              </IconButton>
            </Badge>
          ))}
        </HStack>
      )}
    </VStack>
  );
};
