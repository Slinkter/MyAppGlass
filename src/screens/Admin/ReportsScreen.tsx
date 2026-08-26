"use client";

import React, { useState, useMemo, useCallback } from "react";
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
  Spinner,
} from "@chakra-ui/react";
import {
  FileSpreadsheet,
  Printer,
  Search,
  DollarSign,
  TrendingUp,
  Package,
  ChevronDown,
  ChevronUp,
  FileCheck,
} from "lucide-react";
import { useRealtimeOrders } from "@/features/products/hooks/useRealtimeOrders";
import { Order } from "@/shared/schemas/ecommerce-schemas";
import { exportOrdersToExcel } from "@/shared/utils/excel-export";
import { AdminNav } from "@/widgets/AdminNav/AdminNav";
import { companyData } from "@/shared/config/company-data";

export const ReportsScreen: React.FC = () => {
  const { orders, loading } = useRealtimeOrders();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [selectedOrderForPrint, setSelectedOrderForPrint] = useState<Order | null>(null);

  // Métricas
  const stats = useMemo(() => {
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((acc, o) => acc + (o.total || 0), 0);
    const avgTicket = totalOrders > 0 ? totalRevenue / totalOrders : 0;
    const totalItemsSold = orders.reduce(
      (acc, o) => acc + o.items.reduce((sum, item) => sum + item.quantity, 0),
      0
    );

    return {
      totalOrders,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      avgTicket: Math.round(avgTicket * 100) / 100,
      totalItemsSold,
    };
  }, [orders]);

  // Filtrado
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        o.orderNumber.toLowerCase().includes(q) ||
        o.clientName.toLowerCase().includes(q) ||
        (o.clientDniRuc && o.clientDniRuc.includes(q)) ||
        o.paymentMethod.toLowerCase().includes(q);
      return matchesSearch;
    });
  }, [orders, searchQuery]);

  const toggleExpand = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const handlePrint = useCallback(() => {
    window.print();
  }, []);

  return (
    <Box maxW="1350px" mx="auto" py="8" px={{ base: "4", md: "6" }}>
      <AdminNav />

      {/* Encabezado */}
      <HStack justify="space-between" align="center" wrap="wrap" gap="4" mb="8">
        <VStack align="start" gap="1">
          <Heading size="2xl" color="text.heading" letterSpacing="-0.02em">
            Historial de Ventas y Reportes
          </Heading>
          <Text color="text.muted" fontSize="sm">
            Auditoría de órdenes despachadas, análisis financiero, exportación a Excel y comprobantes A4.
          </Text>
        </VStack>

        <Button
          variant="outline"
          colorPalette="green"
          borderRadius="xl"
          onClick={() => exportOrdersToExcel(orders)}
          size="md"
        >
          <FileSpreadsheet size={16} style={{ marginRight: 6 }} />
          Exportar Ventas a Excel
        </Button>
      </HStack>

      {/* Métricas Resumen */}
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
                Ventas Totales
              </Text>
              <Heading size="xl" color="#34d399">
                S/. {stats.totalRevenue.toLocaleString("es-PE", { minimumFractionDigits: 2 })}
              </Heading>
              <Text fontSize="xs" color="text.muted">
                {stats.totalOrders} órdenes registradas
              </Text>
            </VStack>
            <Box p="3" borderRadius="xl" bg="rgba(52, 211, 153, 0.1)" color="#34d399">
              <DollarSign size={22} />
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
                Ticket Promedio
              </Text>
              <Heading size="xl" color="text.heading">
                S/. {stats.avgTicket.toFixed(2)}
              </Heading>
              <Text fontSize="xs" color="text.muted">
                Por transacción
              </Text>
            </VStack>
            <Box p="3" borderRadius="xl" bg="rgba(56, 189, 248, 0.1)" color="#38bdf8">
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
                Unidades Movilizadas
              </Text>
              <Heading size="xl" color="text.heading">
                {stats.totalItemsSold}
              </Heading>
              <Text fontSize="xs" color="text.muted">
                Vidrios, barras y accesorios
              </Text>
            </VStack>
            <Box p="3" borderRadius="xl" bg="rgba(167, 139, 250, 0.1)" color="#a78bfa">
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
                Estado de Despacho
              </Text>
              <Heading size="xl" color="#34d399">
                100%
              </Heading>
              <Text fontSize="xs" color="text.muted">
                Todos confirmados
              </Text>
            </VStack>
            <Box p="3" borderRadius="xl" bg="rgba(52, 211, 153, 0.1)" color="#34d399">
              <FileCheck size={22} />
            </Box>
          </HStack>
        </Box>
      </SimpleGrid>

      {/* Buscador */}
      <Box p="4" borderRadius="2xl" bg="surface.card" border="1px solid" borderColor="border.default" mb="6">
        <HStack gap="2">
          <Box color="text.muted" pl="2">
            <Search size={18} />
          </Box>
          <Input
            placeholder="Buscar por correlativo (ORD-2026-XXXX), cliente, DNI/RUC o método de pago..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="subtle"
            size="md"
            borderRadius="xl"
          />
        </HStack>
      </Box>

      {/* Listado de Órdenes */}
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
              Cargando historial de órdenes...
            </Text>
          </Box>
        ) : filteredOrders.length === 0 ? (
          <Box p="16" textAlign="center">
            <Text color="text.muted">No se encontraron órdenes registradas.</Text>
          </Box>
        ) : (
          <VStack align="stretch" gap="0">
            {filteredOrders.map((ord) => {
              const isExpanded = expandedOrderId === (ord.id || ord.orderNumber);
              const orderDate = ord.createdAt
                ? typeof ord.createdAt === "object" && "toDate" in ord.createdAt
                  ? (ord.createdAt as { toDate: () => Date }).toDate().toLocaleDateString("es-PE")
                  : new Date(ord.createdAt as string | number).toLocaleDateString("es-PE")
                : "Hoy";

              return (
                <Box
                  key={ord.id || ord.orderNumber}
                  borderBottom="1px solid"
                  borderColor="border.default"
                  _hover={{ bg: "bg.subtle" }}
                  transition="background-color 0.15s ease"
                >
                  <Box p="5">
                    <HStack justify="space-between" align="center" wrap="wrap" gap="3">
                      <HStack gap="3">
                        <Button
                          size="xs"
                          variant="ghost"
                          onClick={() => toggleExpand(ord.id || ord.orderNumber)}
                        >
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </Button>
                        <VStack align="start" gap="0.5">
                          <HStack gap="2">
                            <Text fontWeight="700" color="text.heading" fontSize="sm" fontFamily="mono">
                              {ord.orderNumber}
                            </Text>
                            <Badge colorPalette="green" variant="subtle" size="xs" borderRadius="md">
                              {ord.status}
                            </Badge>
                          </HStack>
                          <Text fontSize="xs" color="text.muted">
                            Cliente: <strong>{ord.clientName}</strong> · RUC/DNI: {ord.clientDniRuc || "N/A"}
                          </Text>
                        </VStack>
                      </HStack>

                      <HStack gap="4">
                        <VStack align="end" gap="0">
                          <Text fontSize="2xs" color="text.muted">
                            {orderDate} · {ord.paymentMethod.replace(/_/g, " ")}
                          </Text>
                          <Heading size="sm" color="#34d399">
                            S/. {ord.total.toFixed(2)}
                          </Heading>
                        </VStack>

                        <Button
                          size="xs"
                          variant="outline"
                          borderRadius="lg"
                          onClick={() => setSelectedOrderForPrint(ord)}
                        >
                          <Printer size={14} style={{ marginRight: 4 }} />
                          Guía A4
                        </Button>
                      </HStack>
                    </HStack>

                    {/* Detalle Expandible de Partidas */}
                    {isExpanded && (
                      <Box mt="4" pt="4" borderTop="1px dashed" borderColor="border.default">
                        <Text fontSize="2xs" color="text.muted" textTransform="uppercase" fontWeight="bold" mb="2">
                          Partidas Despachadas ({ord.items.length} ítems):
                        </Text>
                        <VStack align="stretch" gap="1.5">
                          {ord.items.map((item, idx) => (
                            <HStack
                              key={idx}
                              p="2.5"
                              borderRadius="lg"
                              bg="bg.page"
                              justify="space-between"
                              fontSize="xs"
                              border="1px solid"
                              borderColor="border.default"
                            >
                              <Text fontWeight="500">
                                {item.quantity} {item.unit} — {item.name} <span style={{ color: "gray", fontSize: "11px" }}>({item.sku})</span>
                              </Text>
                              <Text fontWeight="bold">S/. {item.totalPrice.toFixed(2)}</Text>
                            </HStack>
                          ))}
                        </VStack>
                        {ord.notes && (
                          <Text fontSize="2xs" color="text.muted" mt="2">
                            <strong>Notas:</strong> {ord.notes}
                          </Text>
                        )}
                      </Box>
                    )}
                  </Box>
                </Box>
              );
            })}
          </VStack>
        )}
      </Box>

      {/* Modal de Impresión / Guía de Despacho A4 */}
      {selectedOrderForPrint && (
        <Box
          position="fixed"
          top="0"
          left="0"
          w="100vw"
          h="100vh"
          bg="rgba(0, 0, 0, 0.8)"
          backdropFilter="blur(16px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex="1000"
          p="4"
          overflowY="auto"
        >
          <Box
            bg="white"
            color="#0f172a"
            p="8"
            borderRadius="2xl"
            maxW="720px"
            w="full"
            boxShadow="0 25px 50px rgba(0,0,0,0.5)"
            id="printable-order-guide"
          >
            {/* Cabecera del Documento */}
            <HStack justify="space-between" align="start" borderBottom="2px solid #0f172a" pb="4" mb="4">
              <VStack align="start" gap="0">
                <Heading size="lg" color="#0f172a">
                  {companyData.companyName}
                </Heading>
                <Text fontSize="2xs" color="#475569">
                  {companyData.razonSocial} · RUC {companyData.ruc}
                </Text>
                <Text fontSize="2xs" color="#475569">
                  {companyData.direccion} · Tel: {companyData.contactPhone}
                </Text>
              </VStack>

              <VStack align="end" gap="1">
                <Badge bg="#0f172a" color="white" px="3" py="1" fontSize="xs">
                  GUÍA DE SALIDA
                </Badge>
                <Text fontSize="sm" fontWeight="bold" fontFamily="mono">
                  {selectedOrderForPrint.orderNumber}
                </Text>
              </VStack>
            </HStack>

            {/* Datos del Cliente y Despacho */}
            <SimpleGrid columns={2} gap="3" bg="#f8fafc" p="3.5" borderRadius="lg" mb="4" fontSize="xs">
              <VStack align="start" gap="0.5">
                <Text><strong>Cliente / Razón Social:</strong> {selectedOrderForPrint.clientName}</Text>
                <Text><strong>DNI / RUC:</strong> {selectedOrderForPrint.clientDniRuc || "N/A"}</Text>
                <Text><strong>Teléfono:</strong> {selectedOrderForPrint.clientPhone || "N/A"}</Text>
              </VStack>
              <VStack align="start" gap="0.5">
                <Text><strong>Dirección Entrega:</strong> {selectedOrderForPrint.clientAddress || "Taller GYA"}</Text>
                <Text><strong>Distrito:</strong> {selectedOrderForPrint.clientDistrict || "La Molina"}</Text>
                <Text><strong>Método de Pago:</strong> {selectedOrderForPrint.paymentMethod.replace(/_/g, " ")}</Text>
              </VStack>
            </SimpleGrid>

            {/* Tabla de Partidas */}
            <Box as="table" w="full" mb="4" fontSize="xs" style={{ borderCollapse: "collapse" }}>
              <Box as="thead" bg="#0f172a" color="white">
                <Box as="tr">
                  <Box as="th" p="2" textAlign="left">SKU</Box>
                  <Box as="th" p="2" textAlign="left">Descripción del Material</Box>
                  <Box as="th" p="2" textAlign="center">Cant.</Box>
                  <Box as="th" p="2" textAlign="right">P. Unit</Box>
                  <Box as="th" p="2" textAlign="right">Total</Box>
                </Box>
              </Box>
              <Box as="tbody">
                {selectedOrderForPrint.items.map((item, idx) => (
                  <Box as="tr" key={idx} borderBottom="1px solid #e2e8f0">
                    <Box as="td" p="2" fontFamily="mono">{item.sku}</Box>
                    <Box as="td" p="2">{item.name}</Box>
                    <Box as="td" p="2" textAlign="center">{item.quantity} {item.unit}</Box>
                    <Box as="td" p="2" textAlign="right">S/. {item.unitPrice.toFixed(2)}</Box>
                    <Box as="td" p="2" textAlign="right" fontWeight="bold">S/. {item.totalPrice.toFixed(2)}</Box>
                  </Box>
                ))}
              </Box>
            </Box>

            {/* Totales */}
            <HStack justify="end" mb="6">
              <VStack align="end" gap="1" w="220px" fontSize="xs">
                <HStack justify="space-between" w="full">
                  <Text>Subtotal:</Text>
                  <Text>S/. {selectedOrderForPrint.subtotal.toFixed(2)}</Text>
                </HStack>
                <HStack justify="space-between" w="full">
                  <Text>IGV (18%):</Text>
                  <Text>S/. {selectedOrderForPrint.igv.toFixed(2)}</Text>
                </HStack>
                <HStack justify="space-between" w="full" pt="1" borderTop="1px solid #0f172a">
                  <Text fontWeight="bold">TOTAL:</Text>
                  <Text fontWeight="bold" fontSize="sm">S/. {selectedOrderForPrint.total.toFixed(2)}</Text>
                </HStack>
              </VStack>
            </HStack>

            {/* Firmas de Conformidad */}
            <SimpleGrid columns={2} gap="8" pt="6" borderTop="1px dashed #cbd5e1" textAlign="center" fontSize="2xs">
              <VStack gap="1">
                <Box h="30px" />
                <Box borderTop="1px solid #0f172a" w="80%" pt="1">
                  <Text fontWeight="bold">Despachado por (Taller GYA)</Text>
                  <Text color="#64748b">Firma y Sello Almacén</Text>
                </Box>
              </VStack>

              <VStack gap="1">
                <Box h="30px" />
                <Box borderTop="1px solid #0f172a" w="80%" pt="1">
                  <Text fontWeight="bold">Recibido Conforme (Cliente)</Text>
                  <Text color="#64748b">Nombre, DNI y Firma</Text>
                </Box>
              </VStack>
            </SimpleGrid>

            {/* Botonera modal */}
            <HStack justify="end" gap="2" mt="6" pt="4" borderTop="1px solid #e2e8f0" className="no-print">
              <Button variant="outline" size="sm" onClick={() => setSelectedOrderForPrint(null)}>
                Cerrar
              </Button>
              <Button colorPalette="blue" size="sm" onClick={handlePrint}>
                <Printer size={16} style={{ marginRight: 6 }} />
                Imprimir Documento
              </Button>
            </HStack>
          </Box>
        </Box>
      )}
    </Box>
  );
};
