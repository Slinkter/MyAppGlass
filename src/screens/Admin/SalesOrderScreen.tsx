"use client";

import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Input,
  Badge,
  SimpleGrid,
  NativeSelectRoot,
  NativeSelectField,
  Spinner,
} from "@chakra-ui/react";
import {
  ShoppingCart,
  UserCheck,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Package,
  FileCheck,
  RefreshCw,
  Search,
} from "lucide-react";
import { useRealtimeProducts } from "@/features/products/hooks/useRealtimeProducts";
import { useOrderDraft, PaymentMethod } from "@/features/products/context/OrderDraftContext";
import { useAuth } from "@/features/auth/context/AuthContext";
import { Product } from "@/shared/schemas/ecommerce-schemas";
import { AdminNav } from "@/widgets/AdminNav/AdminNav";
import Link from "next/link";
import { logger } from "@/shared/utils/logger";

export const SalesOrderScreen: React.FC = () => {
  const { user } = useAuth();
  const { products, loading: productsLoading } = useRealtimeProducts();
  const {
    client,
    items,
    paymentMethod,
    notes,
    subtotal,
    igv,
    total,
    totalUnits,
    isSubmitting,
    setClient,
    setPaymentMethod,
    setNotes,
    addItem,
    removeItem,
    clearDraft,
    submitOrder,
  } = useOrderDraft();

  const [clientForm, setClientForm] = useState({
    name: client?.name || "",
    dniRuc: client?.dniRuc || "",
    phone: client?.phone || "",
    address: client?.address || "",
    district: client?.district || "La Molina",
  });

  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [productSearch, setProductSearch] = useState<string>("");
  const [selectedCat, setSelectedCat] = useState<string>("todos");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [completedOrderId, setCompletedOrderId] = useState<string | null>(null);

  const getQty = (id?: string) => (id ? quantities[id] || 1 : 1);
  const setQty = (id: string, delta: number, maxStock: number) => {
    const current = getQty(id);
    const updated = Math.max(1, Math.min(maxStock, current + delta));
    setQuantities({ ...quantities, [id]: updated });
  };

  const handleUpdateClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updated = { ...clientForm, [name]: value };
    setClientForm(updated);
    if (updated.name.trim().length > 0) {
      setClient({
        id: updated.dniRuc ? `cli_${updated.dniRuc}` : `cli_${Date.now()}`,
        name: updated.name,
        dniRuc: updated.dniRuc,
        phone: updated.phone,
        address: updated.address,
        district: updated.district,
      });
    }
  };

  const handleAddItem = (prod: Product) => {
    if (!prod.id) return;
    const qty = getQty(prod.id);
    const result = addItem(prod, qty);
    if (!result.success) {
      setErrorMessage(result.message || "Stock insuficiente");
    } else {
      setErrorMessage(null);
      setQuantities({ ...quantities, [prod.id]: 1 });
    }
  };

  const handleSubmit = async () => {
    if (!clientForm.name.trim()) {
      setErrorMessage("Por favor ingrese el nombre del cliente o empresa receptora");
      return;
    }
    if (items.length === 0) {
      setErrorMessage("La orden debe tener al menos un producto agregado");
      return;
    }

    setErrorMessage(null);
    const adminUid = user?.uid || "admin_system";
    const adminName = user?.displayName || user?.email || "Administrador GYA";

    logger.info("[Venta] Enviando orden de despacho...", {
      cliente: clientForm.name,
      dniRuc: clientForm.dniRuc,
      items: items.map((i) => ({ sku: i.sku, cant: i.quantity })),
      total,
      adminUid,
      adminName,
    });

    const res = await submitOrder(adminUid, adminName);
    if (res.success && res.orderId) {
      logger.info("[Venta Exitosa] Orden procesada con ID: " + res.orderId);
      setCompletedOrderId(res.orderId);
      setErrorMessage(null);
    } else {
      logger.error("Falló el despacho de la orden: " + (res.error || "unknown"));
      setErrorMessage(res.error || "Error al procesar el despacho en Firestore");
    }
  };

  const filteredProducts = products.filter((p) => {
    const q = productSearch.toLowerCase();
    const matchesSearch = p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q);
    const matchesCat = selectedCat === "todos" || p.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <Box maxW="1350px" mx="auto" py="8" px={{ base: "4", md: "6" }}>
      <AdminNav />

      {/* Encabezado */}
      <HStack justify="space-between" align="center" wrap="wrap" gap="4" mb="8">
        <VStack align="start" gap="1">
          <Heading size="2xl" color="text.heading" letterSpacing="-0.02em">
            Emisión de Ventas y Despacho de Stock
          </Heading>
          <Text color="text.muted" fontSize="sm">
            Registro transaccional atómico: descuenta existencias en Firestore en un solo lote commit.
          </Text>
        </VStack>

        {items.length > 0 && (
          <Button variant="ghost" colorPalette="red" size="sm" borderRadius="xl" onClick={clearDraft}>
            <RefreshCw size={14} style={{ marginRight: 6 }} />
            Limpiar Borrador ({items.length} partidas)
          </Button>
        )}
      </HStack>

      {/* Modal de Éxito / Comprobante */}
      {completedOrderId && (
        <Box
          p="8"
          mb="8"
          borderRadius="2xl"
          bg="rgba(52, 211, 153, 0.1)"
          border="1px solid rgba(52, 211, 153, 0.3)"
          backdropFilter="blur(16px)"
          boxShadow="0 10px 40px rgba(52, 211, 153, 0.12)"
        >
          <HStack justify="space-between" wrap="wrap" gap="4">
            <HStack gap="4">
              <Box p="3" bg="rgba(52, 211, 153, 0.2)" color="#34d399" borderRadius="full">
                <CheckCircle2 size={36} />
              </Box>
              <VStack align="start" gap="0.5">
                <Heading size="lg" color="#34d399">
                  ¡Orden Despachada Exitosamente!
                </Heading>
                <Text fontSize="sm" color="text.muted">
                  ID Transaccional: <strong>{completedOrderId}</strong> · Stock actualizado en tiempo real.
                </Text>
              </VStack>
            </HStack>

            <HStack gap="3">
              <Button asChild colorPalette="green" size="md" borderRadius="xl">
                <Link href="/admin/reportes">
                  <FileCheck size={16} style={{ marginRight: 6 }} />
                  Ver Historial de Ventas
                </Link>
              </Button>
              <Button variant="outline" size="md" borderRadius="xl" onClick={() => setCompletedOrderId(null)}>
                Nueva Venta
              </Button>
            </HStack>
          </HStack>
        </Box>
      )}

      {/* Grid Principal de 2 Columnas */}
      <SimpleGrid columns={{ base: 1, lg: 12 }} gap="6">
        {/* Columna Izquierda: Datos del Cliente & Catálogo de Selección (7 cols) */}
        <VStack align="stretch" gap="6" gridColumn={{ lg: "span 7" }}>
          {/* Card 1: Datos del Cliente */}
          <Box
            p="6"
            borderRadius="2xl"
            bg="surface.card"
            border="1px solid"
            borderColor="border.default"
            backdropFilter="blur(16px)"
            boxShadow="0 4px 20px rgba(0, 0, 0, 0.04)"
          >
            <HStack mb="4" gap="2.5">
              <Box p="2" borderRadius="lg" bg="rgba(56, 189, 248, 0.1)" color="#38bdf8">
                <UserCheck size={18} />
              </Box>
              <Heading size="md" color="text.heading">
                1. Datos del Cliente / Empresa
              </Heading>
            </HStack>

            <SimpleGrid columns={{ base: 1, sm: 2 }} gap="3.5">
              <VStack align="start" gap="1">
                <Text fontSize="xs" fontWeight="bold" color="text.heading">
                  Nombre / Razón Social: *
                </Text>
                <Input
                  required
                  borderRadius="xl"
                  name="name"
                  placeholder="ej. Constructora Los Fresnos S.A.C."
                  value={clientForm.name}
                  onChange={handleUpdateClient}
                />
              </VStack>

              <VStack align="start" gap="1">
                <Text fontSize="xs" fontWeight="bold" color="text.heading">
                  DNI o RUC:
                </Text>
                <Input
                  borderRadius="xl"
                  name="dniRuc"
                  placeholder="ej. 20601542407"
                  value={clientForm.dniRuc}
                  onChange={handleUpdateClient}
                />
              </VStack>

              <VStack align="start" gap="1">
                <Text fontSize="xs" fontWeight="bold" color="text.heading">
                  Teléfono / Celular:
                </Text>
                <Input
                  borderRadius="xl"
                  name="phone"
                  placeholder="ej. 974 278 303"
                  value={clientForm.phone}
                  onChange={handleUpdateClient}
                />
              </VStack>

              <VStack align="start" gap="1">
                <Text fontSize="xs" fontWeight="bold" color="text.heading">
                  Distrito de Entrega:
                </Text>
                <Input
                  borderRadius="xl"
                  name="district"
                  placeholder="ej. La Molina, Surco..."
                  value={clientForm.district}
                  onChange={handleUpdateClient}
                />
              </VStack>
            </SimpleGrid>
          </Box>

          {/* Card 2: Selector Rápido de Productos */}
          <Box
            p="6"
            borderRadius="2xl"
            bg="surface.card"
            border="1px solid"
            borderColor="border.default"
            backdropFilter="blur(16px)"
            boxShadow="0 4px 20px rgba(0, 0, 0, 0.04)"
          >
            <VStack align="stretch" gap="4" mb="4">
              <HStack justify="space-between" wrap="wrap" gap="2">
                <HStack gap="2.5">
                  <Box p="2" borderRadius="lg" bg="rgba(56, 189, 248, 0.1)" color="#38bdf8">
                    <Package size={18} />
                  </Box>
                  <Heading size="md" color="text.heading">
                    2. Catálogo & Existencias
                  </Heading>
                </HStack>

                <HStack gap="2">
                  <Box color="text.muted">
                    <Search size={16} />
                  </Box>
                  <Input
                    placeholder="Filtrar catálogo..."
                    w={{ base: "140px", sm: "180px" }}
                    size="xs"
                    borderRadius="lg"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                  />
                </HStack>
              </HStack>

              <HStack gap="1" wrap="wrap">
                {["todos", "vidrio", "aluminio", "accesorio", "consumible", "servicio"].map((cat) => {
                  const isSel = selectedCat === cat;
                  return (
                    <Button
                      key={cat}
                      size="2xs"
                      borderRadius="md"
                      variant={isSel ? "solid" : "ghost"}
                      colorPalette={isSel ? "cyan" : "gray"}
                      onClick={() => setSelectedCat(cat)}
                      textTransform="capitalize"
                    >
                      {cat}
                    </Button>
                  );
                })}
              </HStack>
            </VStack>

            {productsLoading ? (
              <Box p="8" textAlign="center">
                <Spinner size="md" color="brand.primary" />
                <Text fontSize="xs" color="text.muted" mt="2">
                  Cargando inventario disponible...
                </Text>
              </Box>
            ) : (
              <VStack align="stretch" gap="2.5" maxH="400px" overflowY="auto" pr="1">
                {filteredProducts.map((prod) => {
                  const isOutOfStock = prod.stock <= 0;
                  const currentQty = getQty(prod.id);

                  return (
                    <HStack
                      key={prod.id || prod.sku}
                      p="3.5"
                      borderRadius="xl"
                      bg="bg.subtle"
                      justify="space-between"
                      border="1px solid"
                      borderColor="border.default"
                      transition="all 0.2s ease"
                      _hover={{ borderColor: "rgba(56, 189, 248, 0.4)", bg: "surface.card" }}
                    >
                      <VStack align="start" gap="0.5" flex="1">
                        <Text fontSize="sm" fontWeight="600" color="text.heading">
                          {prod.name}
                        </Text>
                        <HStack gap="2">
                          <Text fontSize="2xs" color="text.muted" fontFamily="mono">
                            {prod.sku}
                          </Text>
                          <Badge size="xs" variant="subtle" fontSize="2xs" px="1.5">
                            {prod.category}
                          </Badge>
                          <Text fontSize="2xs" fontWeight="bold" color={isOutOfStock ? "#f87171" : "#34d399"}>
                            Stock: {prod.stock} {prod.unit}
                          </Text>
                        </HStack>
                      </VStack>

                      <HStack gap="3">
                        <Text fontWeight="bold" fontSize="sm" color="text.heading">
                          S/. {prod.unitPrice.toFixed(2)}
                        </Text>

                        {/* Stepper interactivo de cantidad */}
                        {!isOutOfStock && prod.id && (
                          <HStack gap="1" bg="bg.page" p="0.5" borderRadius="lg" border="1px solid" borderColor="border.default">
                            <Button
                              size="2xs"
                              variant="ghost"
                              p="1"
                              h="24px"
                              minW="24px"
                              onClick={() => setQty(prod.id!, -1, prod.stock)}
                            >
                              <Minus size={12} />
                            </Button>
                            <Text fontSize="xs" fontWeight="bold" px="1" minW="18px" textAlign="center">
                              {currentQty}
                            </Text>
                            <Button
                              size="2xs"
                              variant="ghost"
                              p="1"
                              h="24px"
                              minW="24px"
                              onClick={() => setQty(prod.id!, 1, prod.stock)}
                            >
                              <Plus size={12} />
                            </Button>
                          </HStack>
                        )}

                        <Button
                          size="xs"
                          borderRadius="lg"
                          colorPalette="cyan"
                          disabled={isOutOfStock}
                          onClick={() => handleAddItem(prod)}
                        >
                          <Plus size={14} style={{ marginRight: 4 }} />
                          Agregar
                        </Button>
                      </HStack>
                    </HStack>
                  );
                })}
              </VStack>
            )}
          </Box>
        </VStack>

        {/* Columna Derecha: Orden en Construcción (5 cols) */}
        <VStack align="stretch" gap="6" gridColumn={{ lg: "span 5" }}>
          <Box
            p="6"
            borderRadius="2xl"
            bg="surface.card"
            border="1px solid"
            borderColor="border.default"
            backdropFilter="blur(24px)"
            boxShadow="0 10px 40px rgba(0, 0, 0, 0.06)"
          >
            <HStack justify="space-between" mb="4">
              <HStack gap="2.5">
                <Box p="2" borderRadius="lg" bg="rgba(56, 189, 248, 0.1)" color="#38bdf8">
                  <ShoppingCart size={18} />
                </Box>
                <Heading size="md" color="text.heading">
                  Orden de Despacho
                </Heading>
              </HStack>
              <Badge colorPalette="cyan" variant="solid" size="sm" borderRadius="full">
                {totalUnits} unidades
              </Badge>
            </HStack>

            {/* Lista de Ítems en la Orden */}
            {items.length === 0 ? (
              <Box p="8" textAlign="center" borderRadius="xl" bg="bg.subtle" border="1px dashed" borderColor="border.default">
                <Text color="text.muted" fontSize="xs">
                  Selecciona productos del catálogo izquierdo para agregarlos a la orden de despacho.
                </Text>
              </Box>
            ) : (
              <VStack align="stretch" gap="2" mb="4" maxH="260px" overflowY="auto" pr="1">
                {items.map((item) => (
                  <HStack
                    key={item.productId}
                    p="3"
                    borderRadius="xl"
                    bg="bg.subtle"
                    justify="space-between"
                    border="1px solid"
                    borderColor="border.default"
                  >
                    <VStack align="start" gap="0" flex="1">
                      <Text fontSize="xs" fontWeight="bold" color="text.heading">
                        {item.name}
                      </Text>
                      <Text fontSize="2xs" color="text.muted">
                        {item.quantity} {item.unit} x S/. {item.unitPrice.toFixed(2)}
                      </Text>
                    </VStack>

                    <HStack gap="2">
                      <Text fontSize="xs" fontWeight="bold" color="text.heading">
                        S/. {item.totalPrice.toFixed(2)}
                      </Text>
                      <Button
                        size="2xs"
                        variant="ghost"
                        colorPalette="red"
                        onClick={() => removeItem(item.productId)}
                      >
                        <Trash2 size={12} />
                      </Button>
                    </HStack>
                  </HStack>
                ))}
              </VStack>
            )}

            {/* Totales y Cálculo Financiero */}
            <VStack align="stretch" gap="2" py="3" borderTop="1px solid" borderBottom="1px solid" borderColor="border.default" my="3">
              <HStack justify="space-between">
                <Text fontSize="xs" color="text.muted">
                  Subtotal:
                </Text>
                <Text fontSize="xs" fontWeight="medium">
                  S/. {subtotal.toFixed(2)}
                </Text>
              </HStack>
              <HStack justify="space-between">
                <Text fontSize="xs" color="text.muted">
                  IGV (18%):
                </Text>
                <Text fontSize="xs" fontWeight="medium">
                  S/. {igv.toFixed(2)}
                </Text>
              </HStack>
              <HStack justify="space-between" pt="1">
                <Text fontSize="sm" fontWeight="bold" color="text.heading">
                  Total a Pagar:
                </Text>
                <Heading size="md" color="#34d399">
                  S/. {total.toFixed(2)}
                </Heading>
              </HStack>
            </VStack>

            {/* Opciones de Pago y Notas */}
            <VStack align="stretch" gap="3" mb="4">
              <VStack align="start" gap="1">
                <Text fontSize="xs" fontWeight="bold" color="text.heading">
                  Método de Pago:
                </Text>
                <NativeSelectRoot size="sm" w="full">
                  <NativeSelectField
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                  >
                    <option value="TRANSFERENCIA_BCP">Transferencia BCP (Cta Cte)</option>
                    <option value="TRANSFERENCIA_INTERBANK">Transferencia Interbank</option>
                    <option value="YAPE_PLIN">Yape / Plin Corporativo</option>
                    <option value="EFECTIVO">Efectivo en Taller</option>
                    <option value="TARJETA">Tarjeta Débito / Crédito</option>
                    <option value="CREDITO">Línea de Crédito Instalador</option>
                  </NativeSelectField>
                </NativeSelectRoot>
              </VStack>

              <VStack align="start" gap="1">
                <Text fontSize="xs" fontWeight="bold" color="text.heading">
                  Notas de Despacho (Opcional):
                </Text>
                <Input
                  size="sm"
                  borderRadius="xl"
                  placeholder="ej. Entregar en obra con factura..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </VStack>
            </VStack>

            {/* Alerta de Error */}
            {errorMessage && (
              <Box p="3" mb="3" borderRadius="xl" bg="rgba(239, 68, 68, 0.1)" color="#f87171" border="1px solid rgba(239, 68, 68, 0.25)" fontSize="xs">
                <HStack gap="2">
                  <AlertCircle size={14} />
                  <Text>{errorMessage}</Text>
                </HStack>
              </Box>
            )}

            {/* Botón de Emisión Atómica */}
            <Button
              colorPalette="cyan"
              size="lg"
              borderRadius="xl"
              w="full"
              loading={isSubmitting}
              disabled={items.length === 0 || isSubmitting}
              onClick={handleSubmit}
            >
              <CheckCircle2 size={18} style={{ marginRight: 8 }} />
              Emitir Orden y Despachar Stock
            </Button>
          </Box>
        </VStack>
      </SimpleGrid>
    </Box>
  );
};
