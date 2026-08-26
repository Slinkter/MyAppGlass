"use client";

import React, { useState, useMemo } from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Input,
  Badge,
  NativeSelectRoot,
  NativeSelectField,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import {
  Plus,
  FileSpreadsheet,
  Search,
  Package,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  DollarSign,
  Edit2,
  Trash2,
  PlusCircle,
  X,
  Layers,
  Filter,
} from "lucide-react";
import { useRealtimeProducts } from "@/features/products/hooks/useRealtimeProducts";
import { productService } from "@/features/products/services/productService";
import { Product } from "@/shared/schemas/ecommerce-schemas";
import { exportInventoryToExcel } from "@/shared/utils/excel-export";
import { AdminNav } from "@/widgets/AdminNav/AdminNav";

export const InventoryDashboardScreen: React.FC = () => {
  const { products, loading } = useRealtimeProducts();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");

  // Estados de modales
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isReplenishModalOpen, setIsReplenishModalOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [replenishQty, setReplenishQty] = useState<number>(10);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Formulario de Producto (Nuevo / Editar)
  const [formData, setFormData] = useState<{
    id?: string;
    sku: string;
    name: string;
    description: string;
    category: "vidrio" | "aluminio" | "accesorio" | "servicio" | "consumible";
    unit: "m2" | "barra" | "unidad" | "kg" | "servicio" | "plancha";
    stock: number;
    minStockAlert: number;
    unitPrice: number;
    costPrice: number;
    imageUrl: string;
  }>({
    sku: "",
    name: "",
    description: "",
    category: "vidrio",
    unit: "m2",
    stock: 0,
    minStockAlert: 5,
    unitPrice: 0,
    costPrice: 0,
    imageUrl: "",
  });

  // Métricas
  const metrics = useMemo(() => {
    const totalItems = products.length;
    const totalUnits = products.reduce((acc, p) => acc + (p.stock || 0), 0);
    const criticalStock = products.filter((p) => p.stock === 0).length;
    const lowStock = products.filter((p) => p.stock > 0 && p.stock <= p.minStockAlert).length;
    const totalInventoryValue = products.reduce((acc, p) => acc + (p.stock || 0) * p.unitPrice, 0);

    return {
      totalItems,
      totalUnits,
      criticalStock,
      lowStock,
      totalInventoryValue: Math.round(totalInventoryValue * 100) / 100,
    };
  }, [products]);

  // Filtrado de productos
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      const matchesCat = selectedCategory === "todos" || p.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [products, searchQuery, selectedCategory]);

  const openCreateModal = (productToEdit?: Product) => {
    if (productToEdit) {
      setSelectedProduct(productToEdit);
      setFormData({
        id: productToEdit.id,
        sku: productToEdit.sku,
        name: productToEdit.name,
        description: productToEdit.description || "",
        category: productToEdit.category,
        unit: productToEdit.unit,
        stock: productToEdit.stock,
        minStockAlert: productToEdit.minStockAlert,
        unitPrice: productToEdit.unitPrice,
        costPrice: productToEdit.costPrice || 0,
        imageUrl: productToEdit.imageUrl || "",
      });
    } else {
      setSelectedProduct(null);
      setFormData({
        sku: `GYA-${Math.floor(100 + Math.random() * 900)}`,
        name: "",
        description: "",
        category: "vidrio",
        unit: "m2",
        stock: 10,
        minStockAlert: 5,
        unitPrice: 120,
        costPrice: 75,
        imageUrl: "",
      });
    }
    setIsCreateModalOpen(true);
    setStatusMessage(null);
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setStatusMessage(null);

    try {
      if (selectedProduct && selectedProduct.id) {
        await productService.updateProduct(selectedProduct.id, {
          sku: formData.sku,
          name: formData.name,
          description: formData.description,
          category: formData.category,
          unit: formData.unit,
          stock: Number(formData.stock),
          minStockAlert: Number(formData.minStockAlert),
          unitPrice: Number(formData.unitPrice),
          costPrice: Number(formData.costPrice),
          imageUrl: formData.imageUrl,
        });
        setStatusMessage({ type: "success", text: "Producto actualizado correctamente." });
      } else {
        await productService.createProduct({
          sku: formData.sku,
          name: formData.name,
          description: formData.description,
          category: formData.category,
          unit: formData.unit,
          stock: Number(formData.stock),
          minStockAlert: Number(formData.minStockAlert),
          unitPrice: Number(formData.unitPrice),
          costPrice: Number(formData.costPrice),
          imageUrl: formData.imageUrl,
          isActive: true,
        });
        setStatusMessage({ type: "success", text: "Nuevo producto registrado con éxito." });
      }
      setTimeout(() => setIsCreateModalOpen(false), 1000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al guardar el producto";
      setStatusMessage({ type: "error", text: msg });
    } finally {
      setActionLoading(false);
    }
  };

  const openReplenishModal = (product: Product) => {
    setSelectedProduct(product);
    setReplenishQty(10);
    setIsReplenishModalOpen(true);
    setStatusMessage(null);
  };

  const handleReplenishStock = async () => {
    if (!selectedProduct?.id || replenishQty <= 0) return;
    setActionLoading(true);
    setStatusMessage(null);

    try {
      await productService.replenishStock(selectedProduct.id, Number(replenishQty));
      setStatusMessage({
        type: "success",
        text: `Se añadieron +${replenishQty} ${selectedProduct.unit} a "${selectedProduct.name}" exitosamente.`,
      });
      setTimeout(() => setIsReplenishModalOpen(false), 1000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al ingresar stock";
      setStatusMessage({ type: "error", text: msg });
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string, name: string) => {
    if (!window.confirm(`¿Está seguro de eliminar "${name}" del catálogo?`)) return;
    try {
      await productService.deleteProduct(id);
    } catch (err: unknown) {
      alert("Error al eliminar producto: " + (err instanceof Error ? err.message : String(err)));
    }
  };

  return (
    <Box maxW="1350px" mx="auto" py="8" px={{ base: "4", md: "6" }}>
      <AdminNav />

      {/* Encabezado Principal */}
      <HStack justify="space-between" align="center" wrap="wrap" gap="4" mb="8">
        <VStack align="start" gap="1">
          <Heading size="2xl" color="text.heading" letterSpacing="-0.02em">
            Gestión y Control de Inventario
          </Heading>
          <Text color="text.muted" fontSize="sm">
            Catálogo en tiempo real de vidrios templados, perfiles de aluminio y accesorios con mutaciones atómicas.
          </Text>
        </VStack>

        <HStack gap="3">
          <Button
            variant="outline"
            onClick={() => exportInventoryToExcel(products)}
            size="md"
            borderRadius="xl"
          >
            <FileSpreadsheet size={16} style={{ marginRight: 6 }} />
            Exportar Excel
          </Button>
          <Button
            colorPalette="cyan"
            onClick={() => openCreateModal()}
            size="md"
            borderRadius="xl"
          >
            <Plus size={16} style={{ marginRight: 6 }} />
            Nuevo Producto
          </Button>
        </HStack>
      </HStack>

      {/* Tarjetas de Métricas Resumen */}
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="4" mb="8">
        <Box
          p="5"
          borderRadius="2xl"
          bg="surface.card"
          border="1px solid"
          borderColor="border.default"
          backdropFilter="blur(16px)"
          boxShadow="0 4px 20px rgba(0, 0, 0, 0.04)"
        >
          <HStack justify="space-between" align="start">
            <VStack align="start" gap="1">
              <Text fontSize="2xs" color="text.muted" textTransform="uppercase" fontWeight="bold" letterSpacing="wider">
                Total Productos
              </Text>
              <Heading size="xl" color="text.heading">
                {metrics.totalItems}
              </Heading>
              <Text fontSize="xs" color="text.muted">
                {metrics.totalUnits} unidades en stock
              </Text>
            </VStack>
            <Box p="3" borderRadius="xl" bg="rgba(56, 189, 248, 0.1)" color="#38bdf8">
              <Package size={22} />
            </Box>
          </HStack>
        </Box>

        <Box
          p="5"
          borderRadius="2xl"
          bg="surface.card"
          border="1px solid"
          borderColor="border.default"
          backdropFilter="blur(16px)"
          boxShadow="0 4px 20px rgba(0, 0, 0, 0.04)"
        >
          <HStack justify="space-between" align="start">
            <VStack align="start" gap="1">
              <Text fontSize="2xs" color="text.muted" textTransform="uppercase" fontWeight="bold" letterSpacing="wider">
                Stock Crítico
              </Text>
              <Heading size="xl" color={metrics.criticalStock > 0 ? "#f87171" : "#34d399"}>
                {metrics.criticalStock}
              </Heading>
              <Text fontSize="xs" color="text.muted">
                Productos agotados (0 stock)
              </Text>
            </VStack>
            <Box p="3" borderRadius="xl" bg="rgba(239, 68, 68, 0.1)" color="#f87171">
              <AlertTriangle size={22} />
            </Box>
          </HStack>
        </Box>

        <Box
          p="5"
          borderRadius="2xl"
          bg="surface.card"
          border="1px solid"
          borderColor="border.default"
          backdropFilter="blur(16px)"
          boxShadow="0 4px 20px rgba(0, 0, 0, 0.04)"
        >
          <HStack justify="space-between" align="start">
            <VStack align="start" gap="1">
              <Text fontSize="2xs" color="text.muted" textTransform="uppercase" fontWeight="bold" letterSpacing="wider">
                Stock Bajo
              </Text>
              <Heading size="xl" color={metrics.lowStock > 0 ? "#fbbf24" : "#34d399"}>
                {metrics.lowStock}
              </Heading>
              <Text fontSize="xs" color="text.muted">
                Bajo umbral de alerta mínima
              </Text>
            </VStack>
            <Box p="3" borderRadius="xl" bg="rgba(245, 158, 11, 0.1)" color="#fbbf24">
              <TrendingUp size={22} />
            </Box>
          </HStack>
        </Box>

        <Box
          p="5"
          borderRadius="2xl"
          bg="surface.card"
          border="1px solid"
          borderColor="border.default"
          backdropFilter="blur(16px)"
          boxShadow="0 4px 20px rgba(0, 0, 0, 0.04)"
        >
          <HStack justify="space-between" align="start">
            <VStack align="start" gap="1">
              <Text fontSize="2xs" color="text.muted" textTransform="uppercase" fontWeight="bold" letterSpacing="wider">
                Valorización de Stock
              </Text>
              <Heading size="xl" color="#34d399">
                S/. {metrics.totalInventoryValue.toLocaleString("es-PE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </Heading>
              <Text fontSize="xs" color="text.muted">
                Valor de venta comercial
              </Text>
            </VStack>
            <Box p="3" borderRadius="xl" bg="rgba(52, 211, 153, 0.1)" color="#34d399">
              <DollarSign size={22} />
            </Box>
          </HStack>
        </Box>
      </SimpleGrid>

      {/* Controles de Búsqueda y Filtro */}
      <Box
        p="4"
        borderRadius="2xl"
        bg="surface.card"
        border="1px solid"
        borderColor="border.default"
        backdropFilter="blur(16px)"
        mb="6"
      >
        <HStack wrap="wrap" justify="space-between" gap="4">
          <HStack flex="1" minW="260px" gap="2">
            <Box color="text.muted" pl="2">
              <Search size={18} />
            </Box>
            <Input
              placeholder="Buscar por SKU, nombre del producto o especificación..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              variant="subtle"
              size="md"
              borderRadius="xl"
            />
          </HStack>

          <HStack gap="1.5" wrap="wrap">
            {["todos", "vidrio", "aluminio", "accesorio", "consumible", "servicio"].map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <Button
                  key={cat}
                  size="xs"
                  borderRadius="lg"
                  variant={isSelected ? "solid" : "ghost"}
                  colorPalette={isSelected ? "cyan" : "gray"}
                  onClick={() => setSelectedCategory(cat)}
                  textTransform="capitalize"
                  fontWeight={isSelected ? "bold" : "medium"}
                >
                  {cat}
                </Button>
              );
            })}
          </HStack>
        </HStack>
      </Box>

      {/* Tabla de Inventario de Precisión */}
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
        ) : filteredProducts.length === 0 ? (
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
                {filteredProducts.map((p) => {
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
                            onClick={() => openReplenishModal(p)}
                            title="Entrada rápida de stock"
                          >
                            <PlusCircle size={13} style={{ marginRight: 4 }} />
                            + Stock
                          </Button>
                          <Button
                            size="2xs"
                            variant="ghost"
                            borderRadius="md"
                            onClick={() => openCreateModal(p)}
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
                              onClick={() => handleDeleteProduct(p.id!, p.name)}
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

      {/* Modal Entrada Rápida de Stock (+Stock) */}
      {isReplenishModalOpen && selectedProduct && (
        <Box
          position="fixed"
          top="0"
          left="0"
          w="100vw"
          h="100vh"
          bg="rgba(0, 0, 0, 0.75)"
          backdropFilter="blur(12px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="1000"
          p="4"
        >
          <Box
            bg="surface.card"
            p="6"
            borderRadius="2xl"
            maxW="440px"
            w="full"
            border="1px solid"
            borderColor="border.default"
            boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.5)"
          >
            <HStack justify="space-between" mb="4">
              <Heading size="md" color="text.heading">
                Entrada Rápida de Stock
              </Heading>
              <Button size="xs" variant="ghost" onClick={() => setIsReplenishModalOpen(false)}>
                <X size={18} />
              </Button>
            </HStack>

            <VStack align="stretch" gap="4">
              <Box p="3.5" borderRadius="xl" bg="bg.subtle" border="1px solid" borderColor="border.default">
                <Text fontSize="sm" fontWeight="bold" color="text.heading">
                  {selectedProduct.name}
                </Text>
                <Text fontSize="xs" color="text.muted" mt="0.5">
                  SKU: <span style={{ fontFamily: "monospace" }}>{selectedProduct.sku}</span> · Stock actual: <strong>{selectedProduct.stock} {selectedProduct.unit}</strong>
                </Text>
              </Box>

              <VStack align="start" gap="1.5">
                <Text fontSize="xs" fontWeight="bold" color="text.heading">
                  Cantidad a Ingresar ({selectedProduct.unit}):
                </Text>
                <Input
                  type="number"
                  min="1"
                  borderRadius="xl"
                  value={replenishQty}
                  onChange={(e) => setReplenishQty(Number(e.target.value))}
                />
              </VStack>

              {statusMessage && (
                <Box
                  p="3"
                  borderRadius="xl"
                  bg={statusMessage.type === "success" ? "rgba(52, 211, 153, 0.1)" : "rgba(239, 68, 68, 0.1)"}
                  color={statusMessage.type === "success" ? "#34d399" : "#f87171"}
                  border={`1px solid ${statusMessage.type === "success" ? "rgba(52, 211, 153, 0.25)" : "rgba(239, 68, 68, 0.25)"}`}
                  fontSize="xs"
                >
                  {statusMessage.text}
                </Box>
              )}

              <HStack justify="end" gap="2" pt="2">
                <Button variant="outline" size="sm" borderRadius="xl" onClick={() => setIsReplenishModalOpen(false)}>
                  Cancelar
                </Button>
                <Button
                  colorPalette="green"
                  size="sm"
                  borderRadius="xl"
                  loading={actionLoading}
                  onClick={handleReplenishStock}
                >
                  <PlusCircle size={16} style={{ marginRight: 6 }} />
                  Confirmar Ingreso
                </Button>
              </HStack>
            </VStack>
          </Box>
        </Box>
      )}

      {/* Modal Crear / Editar Producto */}
      {isCreateModalOpen && (
        <Box
          position="fixed"
          top="0"
          left="0"
          w="100vw"
          h="100vh"
          bg="rgba(0, 0, 0, 0.75)"
          backdropFilter="blur(12px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="1000"
          p="4"
          overflowY="auto"
        >
          <Box
            as="form"
            onSubmit={handleSaveProduct}
            bg="surface.card"
            p="7"
            borderRadius="2xl"
            maxW="580px"
            w="full"
            border="1px solid"
            borderColor="border.default"
            boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.5)"
          >
            <HStack justify="space-between" mb="5">
              <Heading size="md" color="text.heading">
                {selectedProduct ? "Editar Producto" : "Nuevo Producto en Catálogo"}
              </Heading>
              <Button size="xs" variant="ghost" onClick={() => setIsCreateModalOpen(false)}>
                <X size={18} />
              </Button>
            </HStack>

            <VStack align="stretch" gap="3.5">
              <SimpleGrid columns={2} gap="3">
                <VStack align="start" gap="1">
                  <Text fontSize="xs" fontWeight="bold" color="text.heading">
                    SKU / Código: *
                  </Text>
                  <Input
                    required
                    borderRadius="xl"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value.toUpperCase() })}
                  />
                </VStack>

                <VStack align="start" gap="1">
                  <Text fontSize="xs" fontWeight="bold" color="text.heading">
                    Categoría: *
                  </Text>
                  <NativeSelectRoot size="md" w="full">
                    <NativeSelectField
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value as Product["category"] })}
                    >
                      <option value="vidrio">Vidrio</option>
                      <option value="aluminio">Aluminio</option>
                      <option value="accesorio">Accesorio</option>
                      <option value="consumible">Consumible</option>
                      <option value="servicio">Servicio</option>
                    </NativeSelectField>
                  </NativeSelectRoot>
                </VStack>
              </SimpleGrid>

              <VStack align="start" gap="1">
                <Text fontSize="xs" fontWeight="bold" color="text.heading">
                  Nombre del Producto: *
                </Text>
                <Input
                  required
                  borderRadius="xl"
                  placeholder="ej. Vidrio Templado 8mm Incoloro"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </VStack>

              <VStack align="start" gap="1">
                <Text fontSize="xs" fontWeight="bold" color="text.heading">
                  Descripción o Detalle Técnico:
                </Text>
                <Input
                  borderRadius="xl"
                  placeholder="ej. Cristal de seguridad para mamparas y balcones..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </VStack>

              <SimpleGrid columns={3} gap="3">
                <VStack align="start" gap="1">
                  <Text fontSize="xs" fontWeight="bold" color="text.heading">
                    Unidad:
                  </Text>
                  <NativeSelectRoot size="md" w="full">
                    <NativeSelectField
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value as Product["unit"] })}
                    >
                      <option value="m2">m²</option>
                      <option value="barra">Barra (6m)</option>
                      <option value="unidad">Unidad</option>
                      <option value="kg">Kilogramo</option>
                      <option value="plancha">Plancha</option>
                      <option value="servicio">Servicio</option>
                    </NativeSelectField>
                  </NativeSelectRoot>
                </VStack>

                <VStack align="start" gap="1">
                  <Text fontSize="xs" fontWeight="bold" color="text.heading">
                    Stock Inicial:
                  </Text>
                  <Input
                    type="number"
                    min="0"
                    borderRadius="xl"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                  />
                </VStack>

                <VStack align="start" gap="1">
                  <Text fontSize="xs" fontWeight="bold" color="text.heading">
                    Alerta Mínima:
                  </Text>
                  <Input
                    type="number"
                    min="1"
                    borderRadius="xl"
                    value={formData.minStockAlert}
                    onChange={(e) => setFormData({ ...formData, minStockAlert: Number(e.target.value) })}
                  />
                </VStack>
              </SimpleGrid>

              <SimpleGrid columns={2} gap="3">
                <VStack align="start" gap="1">
                  <Text fontSize="xs" fontWeight="bold" color="text.heading">
                    Precio Venta (S/.): *
                  </Text>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    borderRadius="xl"
                    value={formData.unitPrice}
                    onChange={(e) => setFormData({ ...formData, unitPrice: Number(e.target.value) })}
                  />
                </VStack>

                <VStack align="start" gap="1">
                  <Text fontSize="xs" fontWeight="bold" color="text.heading">
                    Precio Costo (S/.):
                  </Text>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    borderRadius="xl"
                    value={formData.costPrice}
                    onChange={(e) => setFormData({ ...formData, costPrice: Number(e.target.value) })}
                  />
                </VStack>
              </SimpleGrid>

              {statusMessage && (
                <Box
                  p="3"
                  borderRadius="xl"
                  bg={statusMessage.type === "success" ? "rgba(52, 211, 153, 0.1)" : "rgba(239, 68, 68, 0.1)"}
                  color={statusMessage.type === "success" ? "#34d399" : "#f87171"}
                  border={`1px solid ${statusMessage.type === "success" ? "rgba(52, 211, 153, 0.25)" : "rgba(239, 68, 68, 0.25)"}`}
                  fontSize="xs"
                >
                  {statusMessage.text}
                </Box>
              )}

              <HStack justify="end" gap="2" pt="3">
                <Button variant="outline" size="sm" borderRadius="xl" type="button" onClick={() => setIsCreateModalOpen(false)}>
                  Cancelar
                </Button>
                <Button colorPalette="cyan" size="sm" borderRadius="xl" type="submit" loading={actionLoading}>
                  <CheckCircle2 size={16} style={{ marginRight: 6 }} />
                  {selectedProduct ? "Guardar Cambios" : "Crear Producto"}
                </Button>
              </HStack>
            </VStack>
          </Box>
        </Box>
      )}
    </Box>
  );
};
