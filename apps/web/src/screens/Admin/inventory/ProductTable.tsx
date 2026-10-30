import React from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Badge,
  Button,
  Spinner,
} from "@chakra-ui/react";
import {
  PlusCircle,
  Edit2,
  Trash2,
} from "lucide-react";
import { Product } from "@/shared/schemas/ecommerce-schemas";

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  onEdit: (product: Product) => void;
  onReplenish: (product: Product) => void;
  onDelete: (id: string, name: string) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  loading,
  onEdit,
  onReplenish,
  onDelete,
}) => {
  return (
    <Box
      borderRadius="2xl"
      bg="surface.card"
      border="1px solid"
      borderColor="border.default"
      backdropFilter="blur(20px)"
      overflow="hidden"
      boxShadow="0 8px 30px rgba(0, 0, 0, 0.04)"
    >
      {loading ? (
        <Box p="16" textAlign="center">
          <Spinner size="xl" color="brand.primary" />
          <Text mt="4" color="text.muted" fontSize="sm">
            Sincronizando existencias de almacén en tiempo real...
          </Text>
        </Box>
      ) : products.length === 0 ? (
        <Box p="16" textAlign="center">
          <Text color="text.muted">No se encontraron productos coincidentes con los filtros.</Text>
        </Box>
      ) : (
        <Box overflowX="auto">
          <Box as="table" w="full" textAlign="left" style={{ borderCollapse: "collapse" }}>
            <Box as="thead" bg="bg.subtle" borderBottom="1px solid" borderColor="border.default">
              <Box as="tr">
                <Box as="th" p="4" fontSize="2xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider">
                  SKU & Producto
                </Box>
                <Box as="th" p="4" fontSize="2xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider">
                  Categoría
                </Box>
                <Box as="th" p="4" fontSize="2xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider">
                  Unidad
                </Box>
                <Box as="th" p="4" fontSize="2xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider">
                  Stock Disponible
                </Box>
                <Box as="th" p="4" fontSize="2xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider">
                  Precio Venta
                </Box>
                <Box as="th" p="4" fontSize="2xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider">
                  Costo & Margen
                </Box>
                <Box as="th" p="4" fontSize="2xs" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="wider" textAlign="right">
                  Acciones
                </Box>
              </Box>
            </Box>
            <Box as="tbody">
              {products.map((p) => {
                const isCritical = p.stock === 0;
                const isLow = p.stock > 0 && p.stock <= p.minStockAlert;
                const marginPct =
                  p.costPrice && p.unitPrice ? Math.round(((p.unitPrice - p.costPrice) / p.unitPrice) * 100) : 0;

                return (
                  <Box
                    as="tr"
                    key={p.id || p.sku}
                    borderBottom="1px solid"
                    borderColor="border.default"
                    _hover={{ bg: "bg.subtle" }}
                    transition="background-color 0.15s ease"
                  >
                    <Box as="td" p="4">
                      <VStack align="start" gap="0.5">
                        <Text fontWeight="600" color="text.heading" fontSize="sm">
                          {p.name}
                        </Text>
                        <Text fontSize="2xs" color="text.muted" fontFamily="mono" letterSpacing="wider">
                          {p.sku}
                        </Text>
                      </VStack>
                    </Box>

                    <Box as="td" p="4">
                      <Badge
                        variant="subtle"
                        fontSize="2xs"
                        px="2"
                        py="0.5"
                        borderRadius="md"
                        textTransform="capitalize"
                        bg="rgba(56, 189, 248, 0.08)"
                        color="#38bdf8"
                        border="1px solid rgba(56, 189, 248, 0.2)"
                      >
                        {p.category}
                      </Badge>
                    </Box>

                    <Box as="td" p="4">
                      <Text fontSize="xs" color="text.muted">
                        {p.unit}
                      </Text>
                    </Box>

                    <Box as="td" p="4">
                      <HStack gap="2">
                        <Box
                          w="8px"
                          h="8px"
                          borderRadius="full"
                          bg={isCritical ? "#f87171" : isLow ? "#fbbf24" : "#34d399"}
                          boxShadow={`0 0 8px ${isCritical ? "#f87171" : isLow ? "#fbbf24" : "#34d399"}`}
                        />
                        <Text fontWeight="bold" fontSize="sm" color="text.heading">
                          {p.stock}
                        </Text>
                        {isCritical ? (
                          <Badge bg="rgba(239, 68, 68, 0.15)" color="#f87171" fontSize="2xs" px="1.5" borderRadius="sm">
                            Agotado
                          </Badge>
                        ) : isLow ? (
                          <Badge bg="rgba(245, 158, 11, 0.15)" color="#fbbf24" fontSize="2xs" px="1.5" borderRadius="sm">
                            Mínimo ({p.minStockAlert})
                          </Badge>
                        ) : null}
                      </HStack>
                    </Box>

                    <Box as="td" p="4">
                      <Text fontWeight="600" color="text.heading" fontSize="sm">
                        S/. {p.unitPrice.toFixed(2)}
                      </Text>
                    </Box>

                    <Box as="td" p="4">
                      <VStack align="start" gap="0">
                        <Text fontSize="2xs" color="text.muted">
                          Costo: S/. {(p.costPrice || 0).toFixed(2)}
                        </Text>
                        <Text fontSize="2xs" color={marginPct >= 30 ? "#34d399" : "#fbbf24"} fontWeight="bold">
                          Margen: {marginPct}%
                        </Text>
                      </VStack>
                    </Box>

                    <Box as="td" p="4" textAlign="right">
                      <HStack justify="end" gap="1.5">
                        <Button
                          size="2xs"
                          variant="outline"
                          borderRadius="md"
                          colorPalette="green"
                          onClick={() => onReplenish(p)}
                          title="Entrada rápida de stock"
                        >
                          <PlusCircle size={13} style={{ marginRight: 4 }} />
                          + Stock
                        </Button>
                        <Button
                          size="2xs"
                          variant="ghost"
                          borderRadius="md"
                          onClick={() => onEdit(p)}
                          title="Editar producto"
                        >
                          <Edit2 size={13} />
                        </Button>
                        {p.id && (
                          <Button
                            size="2xs"
                            variant="ghost"
                            colorPalette="red"
                            borderRadius="md"
                            onClick={() => onDelete(p.id!, p.name)}
                            title="Eliminar producto"
                          >
                            <Trash2 size={13} />
                          </Button>
                        )}
                      </HStack>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
