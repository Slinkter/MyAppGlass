"use client";

import React from "react";
import { Box, Button, HStack, IconButton, Input, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import type { ServiceSpec } from "@/shared/api/firebase/types";

export interface SpecsEditorProps {
  specs: ServiceSpec[];
  onChange: (specs: ServiceSpec[]) => void;
  addButtonLabel?: string;
}

function moveSpec(list: ServiceSpec[], from: number, to: number): ServiceSpec[] {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

/** Editor de especificaciones técnicas ({ grupo?, label, value }) con reordenamiento. */
export const SpecsEditor: React.FC<SpecsEditorProps> = ({
  specs,
  onChange,
  addButtonLabel = "Agregar especificación",
}) => {
  const handleAdd = () => {
    onChange([...specs, { grupo: "", label: "", value: "" }]);
  };

  const handleUpdate = (index: number, patch: Partial<ServiceSpec>) => {
    onChange(specs.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  const handleRemove = (index: number) => {
    onChange(specs.filter((_, i) => i !== index));
  };

  return (
    <VStack align="stretch" gap="3">
      {specs.length === 0 ? (
        <Box
          p="3"
          borderRadius="xl"
          border="1px dashed"
          borderColor="border.default"
          bg="bg.subtle"
        >
          <Text fontSize="xs" color="text.muted">
            Sin especificaciones técnicas registradas.
          </Text>
        </Box>
      ) : (
        <VStack align="stretch" gap="2.5">
          {specs.map((spec, idx) => (
            <Box
              key={idx}
              p="3"
              borderRadius="xl"
              border="1px solid"
              borderColor="border.default"
              bg="surface.card"
              transition="border-color 0.2s ease, background-color 0.2s ease"
            >
              <VStack align="stretch" gap="2">
                <SimpleGrid columns={{ base: 1, md: 3 }} gap="2">
                  <Input
                    size="sm"
                    placeholder="Grupo (opcional, ej. Perfilería)"
                    value={spec.grupo ?? ""}
                    onChange={(e) => handleUpdate(idx, { grupo: e.target.value })}
                  />
                  <Input
                    size="sm"
                    placeholder="Etiqueta (ej. Espesor de vidrio)"
                    value={spec.label}
                    onChange={(e) => handleUpdate(idx, { label: e.target.value })}
                  />
                  <Input
                    size="sm"
                    placeholder="Valor (ej. 6 mm / 8 mm templado)"
                    value={spec.value}
                    onChange={(e) => handleUpdate(idx, { value: e.target.value })}
                  />
                </SimpleGrid>

                <HStack justify="space-between">
                  <Text fontSize="xs" color="text.muted">
                    Especificación #{idx + 1}
                  </Text>
                  <HStack gap="1">
                    <IconButton
                      type="button"
                      aria-label={`Subir especificación ${idx + 1}`}
                      size="sm"
                      minW="11"
                      minH="11"
                      variant="outline"
                      borderColor="border.subtle"
                      onClick={() => onChange(moveSpec(specs, idx, idx - 1))}
                      disabled={idx === 0}
                    >
                      <ArrowUp size={14} style={{ flexShrink: 0 }} />
                    </IconButton>
                    <IconButton
                      type="button"
                      aria-label={`Bajar especificación ${idx + 1}`}
                      size="sm"
                      minW="11"
                      minH="11"
                      variant="outline"
                      borderColor="border.subtle"
                      onClick={() => onChange(moveSpec(specs, idx, idx + 1))}
                      disabled={idx === specs.length - 1}
                    >
                      <ArrowDown size={14} style={{ flexShrink: 0 }} />
                    </IconButton>
                    <IconButton
                      type="button"
                      aria-label={`Eliminar especificación ${idx + 1}`}
                      size="sm"
                      minW="11"
                      minH="11"
                      variant="ghost"
                      color="status.dangerText"
                      onClick={() => handleRemove(idx)}
                    >
                      <Trash2 size={14} style={{ flexShrink: 0 }} />
                    </IconButton>
                  </HStack>
                </HStack>
              </VStack>
            </Box>
          ))}
        </VStack>
      )}

      <Box>
        <Button
          type="button"
          size="sm"
          minH="11"
          variant="outline"
          borderColor="border.default"
          onClick={handleAdd}
        >
          <Plus size={16} style={{ flexShrink: 0 }} />
          {addButtonLabel}
        </Button>
      </Box>
    </VStack>
  );
};
