"use client";

import React, { useMemo, useState } from "react";
import { Box, HStack, Heading, Input, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { ListPlus, Plus, Search, Trash2 } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Field } from "@/shared/ui/field";
import { NativeSelectField, NativeSelectRoot } from "@/shared/ui/native-select";
import { formatSoles } from "@/entities/quote";
import type { Product } from "@/entities/product";
import { MAX_ITEMS_PRESUPUESTO, UNIDAD_LABELS, unidadSchema, type Unidad } from "@/entities/budget";
import { newEmptyLine, newLineFromProduct, previewTotals, type BudgetLineDraft } from "./budgetForm";

interface BudgetItemsEditorProps {
  lines: BudgetLineDraft[];
  onChange: (lines: BudgetLineDraft[]) => void;
  products: Product[];
  loadingProducts: boolean;
}

const MAX_RESULTS = 8;
const UNIDADES = unidadSchema.options;

/** Paso 2 del presupuesto: líneas del catálogo o escritas a mano, con cantidad y precio editables. */
export const BudgetItemsEditor: React.FC<BudgetItemsEditorProps> = ({ lines, onChange, products, loadingProducts }) => {
  const [search, setSearch] = useState("");

  const matches = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter((p) => p.isActive !== false && Boolean(p.id))
      .filter((p) => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q) || p.category.includes(q))
      .slice(0, MAX_RESULTS);
  }, [products, search]);

  const importes = useMemo(() => previewTotals(lines).importes, [lines]);
  const isFull = lines.length >= MAX_ITEMS_PRESUPUESTO;

  const updateLine = (key: string, changes: Partial<BudgetLineDraft>) =>
    onChange(lines.map((line) => (line.key === key ? { ...line, ...changes } : line)));

  const addProduct = (product: Product) => {
    onChange([...lines, newLineFromProduct(product)]);
    setSearch("");
  };

  return (
    <Box p={{ base: "4", md: "6" }} borderRadius="2xl" bg="surface.card" border="1px solid" borderColor="border.default">
      <HStack gap="2.5" mb="4">
        <Box p="2" borderRadius="lg" bg="bg.subtle" color="text.heading">
          <ListPlus size={18} style={{ flexShrink: 0 }} />
        </Box>
        <Heading as="h2" size="md" color="text.heading">
          2. Productos y servicios
        </Heading>
      </HStack>

      {/* Buscador del catálogo */}
      <VStack align="stretch" gap="2" mb="5">
        <HStack gap="2">
          <Box color="text.muted">
            <Search size={18} style={{ flexShrink: 0 }} />
          </Box>
          <Input
            aria-label="Buscar en el catálogo"
            placeholder={loadingProducts ? "Cargando catálogo…" : "Buscar vidrio, perfil, accesorio o servicio"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            disabled={loadingProducts || isFull}
            size="md"
            borderRadius="xl"
          />
        </HStack>

        {search.trim() !== "" && matches.length === 0 && (
          <Text fontSize="sm" color="text.muted">
            No hay ítems activos con ese nombre. Puede escribir la línea a mano.
          </Text>
        )}

        {matches.map((p) => (
          <Button
            key={p.id}
            variant="outline"
            justifyContent="space-between"
            h="auto"
            minH="11"
            py="2"
            px="3"
            borderRadius="xl"
            onClick={() => addProduct(p)}
          >
            <VStack align="start" gap="0" minW="0">
              <Text as="span" textAlign="left" fontWeight="600" lineClamp={1}>
                {p.name}
              </Text>
              <Text as="span" fontSize="xs" color="text.muted">
                {p.sku} · {p.category}
              </Text>
            </VStack>
            <Text as="span" fontSize="sm" flexShrink={0}>
              {formatSoles(p.unitPrice)} / {UNIDAD_LABELS[p.unit] ?? p.unit}
            </Text>
          </Button>
        ))}

        <HStack gap="2" wrap="wrap">
          <Button variant="outline" size="sm" minH="11" disabled={isFull} onClick={() => onChange([...lines, newEmptyLine("producto")])}>
            <Plus size={16} style={{ flexShrink: 0, marginRight: 6 }} />
            Producto a mano
          </Button>
          <Button variant="outline" size="sm" minH="11" disabled={isFull} onClick={() => onChange([...lines, newEmptyLine("servicio")])}>
            <Plus size={16} style={{ flexShrink: 0, marginRight: 6 }} />
            Servicio a mano
          </Button>
        </HStack>
      </VStack>

      {/* Líneas */}
      {lines.length === 0 ? (
        <Box p="6" borderRadius="xl" border="1px dashed" borderColor="border.default" textAlign="center">
          <Text fontSize="sm" color="text.muted">
            Aún no hay ítems. Busque en el catálogo o agregue una línea a mano.
          </Text>
        </Box>
      ) : (
        <VStack align="stretch" gap="3">
          {lines.map((line, index) => (
            <Box key={line.key} p="3" borderRadius="xl" border="1px solid" borderColor="border.default" bg="bg.subtle">
              <HStack justify="space-between" mb="2">
                <Text fontSize="xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider">
                  Ítem {index + 1} · {line.tipo === "servicio" ? "Servicio" : "Producto"}
                  {line.productoId ? "" : " (a mano)"}
                </Text>
                <Button
                  variant="ghost"
                  size="sm"
                  minW="11"
                  minH="11"
                  aria-label={`Quitar ítem ${index + 1}`}
                  onClick={() => onChange(lines.filter((l) => l.key !== line.key))}
                >
                  <Trash2 size={16} style={{ flexShrink: 0 }} />
                </Button>
              </HStack>

              <VStack align="stretch" gap="3">
                <Field label="Descripción">
                  <Input
                    value={line.descripcion}
                    maxLength={300}
                    placeholder="ej. Vidrio templado 8 mm incoloro"
                    onChange={(e) => updateLine(line.key, { descripcion: e.target.value })}
                    borderRadius="xl"
                    bg="surface.card"
                  />
                </Field>

                <SimpleGrid columns={{ base: 2, md: 4 }} gap="3" alignItems="end">
                  <Field label="Unidad">
                    <NativeSelectRoot size="md" bg="surface.card" borderRadius="xl">
                      <NativeSelectField
                        value={line.unidad}
                        onChange={(e) => updateLine(line.key, { unidad: e.target.value as Unidad })}
                      >
                        {UNIDADES.map((u) => (
                          <option key={u} value={u}>
                            {UNIDAD_LABELS[u]}
                          </option>
                        ))}
                      </NativeSelectField>
                    </NativeSelectRoot>
                  </Field>

                  <Field label="Cantidad">
                    <Input
                      inputMode="decimal"
                      value={line.cantidad}
                      onChange={(e) => updateLine(line.key, { cantidad: e.target.value })}
                      borderRadius="xl"
                      bg="surface.card"
                    />
                  </Field>

                  <Field label="Precio unit. (S/, sin IGV)">
                    <Input
                      inputMode="decimal"
                      value={line.precioUnitario}
                      placeholder="0.00"
                      onChange={(e) => updateLine(line.key, { precioUnitario: e.target.value })}
                      borderRadius="xl"
                      bg="surface.card"
                    />
                  </Field>

                  <VStack align={{ base: "start", md: "end" }} gap="0" pb="2">
                    <Text fontSize="xs" color="text.muted">
                      Importe
                    </Text>
                    <Text fontWeight="bold" color="text.heading" css={{ fontVariantNumeric: "tabular-nums" }}>
                      {formatSoles(importes[index] ?? 0)}
                    </Text>
                  </VStack>
                </SimpleGrid>
              </VStack>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};
