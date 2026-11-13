"use client";

import { useMemo, useState } from "react";
import { Box, Flex, HStack, Input, Spinner, Stack, Text, VStack } from "@chakra-ui/react";
import { Search } from "lucide-react";
import { SUPPLIER_LABELS, SupplierProductImage } from "@/entities/supplier";
import type { SupplierId, SupplierProduct } from "@/entities/supplier";
import { Button } from "@/shared/ui/button";
import { NativeSelectField, NativeSelectRoot } from "@/shared/ui/native-select";

interface SupplierProductPickerProps {
  products: SupplierProduct[];
  loading: boolean;
  error: string | null;
  /** IDs ya agregados al pedido, para marcar el botón. */
  addedIds: string[];
  onAdd: (product: SupplierProduct) => void;
}

const MAX_VISIBLE = 60;
const SIN_CATEGORIA = "__sin_categoria__";

/** Minúsculas y sin tildes, para comparar textos sin distinguir acentos. */
function normalizar(texto: string): string {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

export function SupplierProductPicker({
  products,
  loading,
  error,
  addedIds,
  onAdd,
}: SupplierProductPickerProps) {
  const [busqueda, setBusqueda] = useState("");
  const [proveedor, setProveedor] = useState<"" | SupplierId>("");
  const [categoria, setCategoria] = useState("");

  const categorias = useMemo(() => {
    const unicas = new Set<string>();
    let haySinCategoria = false;
    for (const p of products) {
      if (p.categoria) unicas.add(p.categoria);
      else haySinCategoria = true;
    }
    const items: Array<{ label: string; value: string }> = [
      { label: "Todas las categorías", value: "" },
      ...[...unicas].sort((a, b) => a.localeCompare(b, "es")).map((c) => ({ label: c, value: c })),
    ];
    if (haySinCategoria) items.push({ label: "Sin categoría", value: SIN_CATEGORIA });
    return items;
  }, [products]);

  const proveedores = useMemo(
    () => [
      { label: "Todos los proveedores", value: "" },
      ...(Object.keys(SUPPLIER_LABELS) as SupplierId[]).map((id) => ({
        label: SUPPLIER_LABELS[id],
        value: id,
      })),
    ],
    [],
  );

  const filtrados = useMemo(() => {
    const termino = normalizar(busqueda);
    return products.filter((p) => {
      if (proveedor && p.proveedor !== proveedor) return false;
      if (categoria === SIN_CATEGORIA && p.categoria) return false;
      if (categoria && categoria !== SIN_CATEGORIA && p.categoria !== categoria) return false;
      if (!termino) return true;
      return normalizar(p.cod).includes(termino) || normalizar(p.descripcion).includes(termino);
    });
  }, [products, busqueda, proveedor, categoria]);

  const visibles = filtrados.slice(0, MAX_VISIBLE);
  const added = useMemo(() => new Set(addedIds), [addedIds]);

  const renderLista = () => {
    if (loading) {
      return (
        <Box p={{ base: "5", md: "8" }} textAlign="center">
          <Spinner size="md" color="brand.primary" />
          <Text fontSize="xs" color="text.muted" mt="2">
            Cargando catálogo...
          </Text>
        </Box>
      );
    }
    if (error) {
      return (
        <Text fontSize="sm" color="status.danger">
          {error}
        </Text>
      );
    }
    if (products.length === 0) {
      return (
        <Text fontSize="sm" color="text.muted">
          Todavía no hay productos de proveedores. Pida que se actualice el catálogo.
        </Text>
      );
    }
    if (filtrados.length === 0) {
      return (
        <Text fontSize="sm" color="text.muted">
          No se encontró ningún producto con esa búsqueda.
        </Text>
      );
    }
    return (
      <VStack align="stretch" gap="2.5" maxH="96" overflowY="auto" pr="1">
        {visibles.map((p) => {
          const yaAgregado = added.has(p.id);
          return (
            <Flex
              key={p.id}
              p="3"
              borderRadius="xl"
              bg="bg.subtle"
              border="1px solid"
              borderColor="border.default"
              gap="3"
              align="center"
              direction={{ base: "column", sm: "row" }}
            >
              <HStack gap="3" flex="1" minW="0" align="center" w="full">
                <Box flexShrink={0} w="14" h="14" borderRadius="lg" overflow="hidden">
                  <SupplierProductImage path={p.imagenPath} alt={p.descripcion} />
                </Box>
                <VStack align="start" gap="0.5" minW="0">
                  <Text fontSize="xs" fontWeight="bold" color="text.heading" fontFamily="mono">
                    {p.cod}
                  </Text>
                  <Text fontSize="sm" color="text.heading" lineClamp={2}>
                    {p.descripcion}
                  </Text>
                  <Text fontSize="xs" color="text.muted">
                    {SUPPLIER_LABELS[p.proveedor]}
                    {p.categoria ? ` · ${p.categoria}` : ""}
                  </Text>
                </VStack>
              </HStack>
              <Button
                size="sm"
                minH="11"
                w={{ base: "full", sm: "auto" }}
                flexShrink={0}
                disabled={yaAgregado}
                onClick={() => onAdd(p)}
              >
                {yaAgregado ? "Agregado" : "Agregar"}
              </Button>
            </Flex>
          );
        })}
        {filtrados.length > MAX_VISIBLE && (
          <Text fontSize="xs" color="text.muted" textAlign="center" pt="1">
            Mostrando {MAX_VISIBLE} de {filtrados.length}. Afine la búsqueda.
          </Text>
        )}
      </VStack>
    );
  };

  return (
    <Box
      p={{ base: "4", md: "6" }}
      borderRadius="2xl"
      bg="surface.card"
      border="1px solid"
      borderColor="border.default"
      boxShadow="md"
    >
      <Stack gap="4" mb="4">
        <Text fontSize="md" fontWeight="semibold" color="text.heading">
          Buscar producto
        </Text>

        <HStack gap="2" color="text.muted">
          <Search size={16} style={{ flexShrink: 0 }} />
          <Input
            placeholder="Buscar por código o nombre"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            minH="11"
            borderRadius="lg"
          />
        </HStack>

        <Stack direction={{ base: "column", md: "row" }} gap="3">
          <Box flex="1">
            <Text fontSize="xs" color="text.muted" mb="1">
              Proveedor
            </Text>
            <NativeSelectRoot size="md">
              <NativeSelectField
                aria-label="Proveedor"
                value={proveedor}
                onChange={(e) => setProveedor(e.target.value as "" | SupplierId)}
                items={proveedores}
              />
            </NativeSelectRoot>
          </Box>
          <Box flex="1">
            <Text fontSize="xs" color="text.muted" mb="1">
              Categoría
            </Text>
            <NativeSelectRoot size="md">
              <NativeSelectField
                aria-label="Categoría"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                items={categorias}
              />
            </NativeSelectRoot>
          </Box>
        </Stack>

        {!loading && !error && (
          <Text fontSize="xs" color="text.muted">
            {filtrados.length} productos
          </Text>
        )}
      </Stack>

      {renderLista()}
    </Box>
  );
}
