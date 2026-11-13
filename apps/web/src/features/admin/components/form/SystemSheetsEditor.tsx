"use client";

import React, { useId, useState } from "react";
import { Box, Button, HStack, IconButton, Input, Text, Textarea, VStack } from "@chakra-ui/react";
import { Badge } from "@/shared/ui/badge";
import { Field } from "@/shared/ui/field";
import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";
import { SpecsEditor } from "./SpecsEditor";
import type { ServiceSystemSheet } from "@/shared/api/firebase/types";

export interface SystemSheetsEditorProps {
  systemSheets: ServiceSystemSheet[];
  onChange: (systemSheets: ServiceSystemSheet[]) => void;
  /** Nombres de sistemas detectados en `gallery[].system` para sugerencias rápidas. */
  availableSystems?: string[];
}

function moveSheet(
  list: ServiceSystemSheet[],
  from: number,
  to: number
): ServiceSystemSheet[] {
  if (to < 0 || to >= list.length) return list;
  const next = [...list];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

interface SystemSheetCardProps {
  sheet: ServiceSystemSheet;
  index: number;
  total: number;
  datalistId: string;
  onUpdate: (next: ServiceSystemSheet) => void;
  onMove: (to: number) => void;
  onRemove: () => void;
}

const SystemSheetCard: React.FC<SystemSheetCardProps> = ({
  sheet,
  index,
  total,
  datalistId,
  onUpdate,
  onMove,
  onRemove,
}) => {
  const [newUso, setNewUso] = useState("");

  const handleAddUso = () => {
    const trimmed = newUso.trim();
    if (!trimmed) return;
    onUpdate({ ...sheet, usos: [...sheet.usos, trimmed] });
    setNewUso("");
  };

  const handleRemoveUso = (usoIdx: number) => {
    onUpdate({ ...sheet, usos: sheet.usos.filter((_, i) => i !== usoIdx) });
  };

  return (
    <Box
      p="4"
      borderRadius="xl"
      border="1px solid"
      borderColor="border.default"
      bg="surface.card"
      transition="border-color 0.2s ease, background-color 0.2s ease"
    >
      <VStack align="stretch" gap="3">
        <HStack justify="space-between" wrap="wrap" gap="2">
          <Text fontSize="sm" fontWeight="semibold" color="text.heading">
            Sistema #{index + 1}
            {sheet.nombre.trim() ? `: ${sheet.nombre.trim()}` : ""}
          </Text>
          <HStack gap="1">
            <IconButton
              type="button"
              aria-label={`Subir ficha de sistema ${index + 1}`}
              size="sm"
              minW="11"
              minH="11"
              variant="outline"
              borderColor="border.subtle"
              onClick={() => onMove(index - 1)}
              disabled={index === 0}
            >
              <ArrowUp size={14} style={{ flexShrink: 0 }} />
            </IconButton>
            <IconButton
              type="button"
              aria-label={`Bajar ficha de sistema ${index + 1}`}
              size="sm"
              minW="11"
              minH="11"
              variant="outline"
              borderColor="border.subtle"
              onClick={() => onMove(index + 1)}
              disabled={index === total - 1}
            >
              <ArrowDown size={14} style={{ flexShrink: 0 }} />
            </IconButton>
            <IconButton
              type="button"
              aria-label={`Eliminar ficha de sistema ${index + 1}`}
              size="sm"
              minW="11"
              minH="11"
              variant="ghost"
              color="status.dangerText"
              onClick={onRemove}
            >
              <Trash2 size={14} style={{ flexShrink: 0 }} />
            </IconButton>
          </HStack>
        </HStack>

        <Field label="Nombre del sistema" helperText="Debe coincidir con el nombre usado en la galería">
          <Input
            size="sm"
            list={datalistId}
            placeholder="Ej. Sistema Nova, Serie 25, Serie 62..."
            value={sheet.nombre}
            onChange={(e) => onUpdate({ ...sheet, nombre: e.target.value })}
          />
        </Field>

        <Field label="Resumen técnico">
          <Textarea
            size="sm"
            rows={2}
            placeholder="Describe el sistema, su aplicación principal y ventajas..."
            value={sheet.resumen}
            onChange={(e) => onUpdate({ ...sheet, resumen: e.target.value })}
          />
        </Field>

        <VStack align="stretch" gap="2">
          <Text fontSize="xs" fontWeight="semibold" color="text.heading">
            Usos recomendados
          </Text>
          <HStack gap="2">
            <Input
              size="sm"
              placeholder="Ej. Dormitorios frente a avenidas"
              value={newUso}
              onChange={(e) => setNewUso(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddUso();
                }
              }}
            />
            <Button
              type="button"
              size="sm"
              minW="11"
              minH="11"
              variant="outline"
              borderColor="border.default"
              onClick={handleAddUso}
              aria-label="Agregar uso recomendado"
            >
              <Plus size={16} style={{ flexShrink: 0 }} />
            </Button>
          </HStack>

          {sheet.usos.length > 0 && (
            <HStack wrap="wrap" gap="2">
              {sheet.usos.map((uso, usoIdx) => (
                <Badge
                  key={`${uso}-${usoIdx}`}
                  size="md"
                  variant="info"
                  px="2.5"
                  py="1"
                  borderRadius="md"
                >
                  <Text as="span" mr="1.5">
                    {uso}
                  </Text>
                  <IconButton
                    type="button"
                    aria-label={`Remover uso ${uso}`}
                    size="sm"
                    minW="11"
                    minH="11"
                    variant="ghost"
                    color="text.muted"
                    onClick={() => handleRemoveUso(usoIdx)}
                  >
                    <Trash2 size={12} style={{ flexShrink: 0 }} />
                  </IconButton>
                </Badge>
              ))}
            </HStack>
          )}
        </VStack>

        <VStack align="stretch" gap="2">
          <Text fontSize="xs" fontWeight="semibold" color="text.heading">
            Especificaciones del sistema
          </Text>
          <SpecsEditor
            specs={sheet.specs}
            onChange={(nextSpecs) => onUpdate({ ...sheet, specs: nextSpecs })}
            addButtonLabel="Agregar especificación del sistema"
          />
        </VStack>
      </VStack>
    </Box>
  );
};

/** Editor de fichas por sistema ({ nombre, resumen, specs[], usos[] }) con sugerencias de galería. */
export const SystemSheetsEditor: React.FC<SystemSheetsEditorProps> = ({
  systemSheets,
  onChange,
  availableSystems = [],
}) => {
  const datalistId = useId();
  const existingNames = new Set(systemSheets.map((s) => s.nombre.trim().toLowerCase()));
  const unaddedSuggestions = availableSystems.filter(
    (name) => name.trim() && !existingNames.has(name.trim().toLowerCase())
  );

  const handleAddSheet = (prefillName = "") => {
    onChange([
      ...systemSheets,
      { nombre: prefillName, resumen: "", specs: [], usos: [] },
    ]);
  };

  const handleUpdate = (index: number, next: ServiceSystemSheet) => {
    onChange(systemSheets.map((item, i) => (i === index ? next : item)));
  };

  const handleRemove = (index: number) => {
    onChange(systemSheets.filter((_, i) => i !== index));
  };

  return (
    <VStack align="stretch" gap="3">
      <datalist id={datalistId}>
        {availableSystems.map((sys) => (
          <option key={sys} value={sys} />
        ))}
      </datalist>

      {unaddedSuggestions.length > 0 && (
        <HStack wrap="wrap" gap="2" align="center">
          <Text fontSize="xs" color="text.muted">
            Sistemas detectados en galería:
          </Text>
          {unaddedSuggestions.map((sys) => (
            <Button
              key={sys}
              type="button"
              size="sm"
              minH="11"
              variant="outline"
              borderColor="border.default"
              onClick={() => handleAddSheet(sys)}
            >
              <Plus size={14} style={{ flexShrink: 0 }} />
              {sys}
            </Button>
          ))}
        </HStack>
      )}

      {systemSheets.length === 0 ? (
        <Box
          p="3"
          borderRadius="xl"
          border="1px dashed"
          borderColor="border.default"
          bg="bg.subtle"
        >
          <Text fontSize="xs" color="text.muted">
            Sin fichas por sistema registradas.
          </Text>
        </Box>
      ) : (
        <VStack align="stretch" gap="3">
          {systemSheets.map((sheet, idx) => (
            <SystemSheetCard
              key={idx}
              sheet={sheet}
              index={idx}
              total={systemSheets.length}
              datalistId={datalistId}
              onUpdate={(next) => handleUpdate(idx, next)}
              onMove={(to) => onChange(moveSheet(systemSheets, idx, to))}
              onRemove={() => handleRemove(idx)}
            />
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
          onClick={() => handleAddSheet("")}
        >
          <Plus size={16} style={{ flexShrink: 0 }} />
          Agregar ficha de sistema
        </Button>
      </Box>
    </VStack>
  );
};
