"use client";

import React from "react";
import { Box, VStack, HStack, Heading, Text, Button, Badge, Spinner } from "@chakra-ui/react";
import { Printer, ChevronDown, ChevronUp } from "lucide-react";
import type { Order } from "@/shared/schemas/ecommerce-schemas";

interface OrdersListProps {
  orders: Order[];
  loading: boolean;
  expandedOrderId: string | null;
  onToggleExpand: (id: string) => void;
  onPrint: (order: Order) => void;
}

export const OrdersList: React.FC<OrdersListProps> = ({ orders, loading, expandedOrderId, onToggleExpand, onPrint }) => {
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
            Cargando historial de órdenes...
          </Text>
        </Box>
      ) : orders.length === 0 ? (
        <Box p="16" textAlign="center">
          <Text color="text.muted">No se encontraron órdenes registradas.</Text>
        </Box>
      ) : (
        <VStack align="stretch" gap="0">
          {orders.map((ord) => {
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
                        onClick={() => onToggleExpand(ord.id || ord.orderNumber)}
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
                        onClick={() => onPrint(ord)}
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
  );
};
