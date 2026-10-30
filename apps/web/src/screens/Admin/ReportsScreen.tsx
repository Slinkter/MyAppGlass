"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Box, VStack, HStack, Heading, Text, Button, Input } from "@chakra-ui/react";
import { FileSpreadsheet, Search } from "lucide-react";
import { useRealtimeOrders } from "@/features/products/hooks/useRealtimeOrders";
import { Order } from "@/shared/schemas/ecommerce-schemas";
import { exportOrdersToExcel } from "@/shared/utils/excel-export";
import { AdminNav } from "@/widgets/AdminNav/AdminNav";
import { ReportsMetrics } from "./reports/ReportsMetrics";
import { OrdersList } from "./reports/OrdersList";
import { PrintOrderModal } from "./reports/PrintOrderModal";

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
      <ReportsMetrics stats={stats} />

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
      <OrdersList
        orders={filteredOrders}
        loading={loading}
        expandedOrderId={expandedOrderId}
        onToggleExpand={toggleExpand}
        onPrint={setSelectedOrderForPrint}
      />

      {selectedOrderForPrint && (
        <PrintOrderModal order={selectedOrderForPrint} onPrint={handlePrint} onClose={() => setSelectedOrderForPrint(null)} />
      )}
    </Box>
  );
};
