"use client";

import React from "react";
import { Box, HStack, VStack, Text, Button, Spinner, Table } from "@chakra-ui/react";
import { Badge } from "@/shared/ui/badge";
import {
  NO_PRICE_LABEL,
  PURCHASE_STATUS_LABELS,
  SUPPLIER_LABELS,
  type PurchaseOrder,
  type PurchaseOrderStatus,
  type SupplierId,
} from "@/entities/supplier";
import { formatSoles } from "@/entities/quote";

interface PurchaseOrdersListProps {
  orders: PurchaseOrder[];
  loading: boolean;
  onView: (order: PurchaseOrder) => void;
  onApprove: (order: PurchaseOrder) => void;
  onReturnToDraft: (order: PurchaseOrder) => void;
}

const STATUS_BADGE_VARIANT: Record<PurchaseOrderStatus, "success" | "warning" | "neutral"> = {
  borrador: "neutral",
  por_aprobar: "warning",
  aprobado: "success",
};

const dateFormatter = new Intl.DateTimeFormat("es-PE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "America/Lima",
});

function formatOrderDate(order: PurchaseOrder): string {
  if (!order.createdAt) return "--";
  return dateFormatter.format(new Date(order.createdAt.seconds * 1000));
}

function supplierNames(order: PurchaseOrder): string {
  const ids = Array.from(new Set<SupplierId>(order.lineas.map((linea) => linea.proveedor)));
  return ids.map((id) => SUPPLIER_LABELS[id]).join(", ");
}

function formatTotal(order: PurchaseOrder): string {
  return order.total === null ? NO_PRICE_LABEL : formatSoles(order.total);
}

function OrderActions({
  order,
  onView,
  onApprove,
  onReturnToDraft,
}: {
  order: PurchaseOrder;
  onView: (order: PurchaseOrder) => void;
  onApprove: (order: PurchaseOrder) => void;
  onReturnToDraft: (order: PurchaseOrder) => void;
}) {
  const pendingApproval = order.estado === "por_aprobar";
  return (
    <HStack gap="2" wrap="wrap">
      <Button size="sm" minH="11" variant="outline" borderRadius="lg" onClick={() => onView(order)}>
        Ver
      </Button>
      {pendingApproval && (
        <Button size="sm" minH="11" variant="solid" borderRadius="lg" onClick={() => onApprove(order)}>
          Aprobar
        </Button>
      )}
      {pendingApproval && (
        <Button size="sm" minH="11" variant="ghost" borderRadius="lg" onClick={() => onReturnToDraft(order)}>
          Devolver a borrador
        </Button>
      )}
    </HStack>
  );
}

export const PurchaseOrdersList: React.FC<PurchaseOrdersListProps> = ({
  orders,
  loading,
  onView,
  onApprove,
  onReturnToDraft,
}) => {
  return (
    <Box
      borderRadius="2xl"
      bg="surface.card"
      border="1px solid"
      borderColor="border.default"
      overflow="hidden"
    >
      <Box p={{ base: "3", md: "5" }} borderBottom="1px solid" borderColor="border.default">
        <Text fontWeight="700" color="text.heading" fontSize="md">
          Pedidos guardados
        </Text>
      </Box>

      {loading ? (
        <Box p="16" textAlign="center">
          <Spinner size="xl" color="brand.primary" />
        </Box>
      ) : orders.length === 0 ? (
        <Box p="16" textAlign="center">
          <Text color="text.muted">Todavía no hay pedidos guardados.</Text>
        </Box>
      ) : (
        <>
          {/* Vista de tabla: md en adelante */}
          <Box display={{ base: "none", md: "block" }} overflowX="visible">
            <Table.Root size="sm" variant="line">
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader color="text.muted">N.º</Table.ColumnHeader>
                  <Table.ColumnHeader color="text.muted">Fecha</Table.ColumnHeader>
                  <Table.ColumnHeader color="text.muted">Creado por</Table.ColumnHeader>
                  <Table.ColumnHeader color="text.muted">Proveedores</Table.ColumnHeader>
                  <Table.ColumnHeader color="text.muted" textAlign="end">Ítems</Table.ColumnHeader>
                  <Table.ColumnHeader color="text.muted" textAlign="end">Total</Table.ColumnHeader>
                  <Table.ColumnHeader color="text.muted">Estado</Table.ColumnHeader>
                  <Table.ColumnHeader color="text.muted">Acciones</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {orders.map((order) => (
                  <Table.Row key={order.id}>
                    <Table.Cell fontFamily="mono" fontWeight="700" color="text.heading">
                      {order.number}
                    </Table.Cell>
                    <Table.Cell color="text.muted">{formatOrderDate(order)}</Table.Cell>
                    <Table.Cell color="text.muted">{order.createdByName}</Table.Cell>
                    <Table.Cell color="text.muted">{supplierNames(order)}</Table.Cell>
                    <Table.Cell textAlign="end">{order.lineas.length}</Table.Cell>
                    <Table.Cell textAlign="end" fontWeight="600" color="text.heading">
                      {formatTotal(order)}
                    </Table.Cell>
                    <Table.Cell>
                      <Badge variant={STATUS_BADGE_VARIANT[order.estado]} size="xs" borderRadius="md">
                        {PURCHASE_STATUS_LABELS[order.estado]}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      <OrderActions
                        order={order}
                        onView={onView}
                        onApprove={onApprove}
                        onReturnToDraft={onReturnToDraft}
                      />
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>

          {/* Vista de tarjetas: base (móvil) */}
          <VStack display={{ base: "flex", md: "none" }} align="stretch" gap="0">
            {orders.map((order) => (
              <Box key={order.id} p="3" borderBottom="1px solid" borderColor="border.default">
                <VStack align="stretch" gap="2">
                  <HStack justify="space-between" align="center" gap="2">
                    <Text fontFamily="mono" fontWeight="700" color="text.heading" fontSize="sm">
                      {order.number}
                    </Text>
                    <Badge variant={STATUS_BADGE_VARIANT[order.estado]} size="xs" borderRadius="md">
                      {PURCHASE_STATUS_LABELS[order.estado]}
                    </Badge>
                  </HStack>
                  <Text fontSize="xs" color="text.muted">
                    {formatOrderDate(order)} · {order.createdByName}
                  </Text>
                  <Text fontSize="xs" color="text.muted">
                    Proveedores: {supplierNames(order)}
                  </Text>
                  <HStack justify="space-between" align="center" gap="2">
                    <Text fontSize="xs" color="text.muted">
                      {order.lineas.length} ítems
                    </Text>
                    <Text fontWeight="600" color="text.heading" fontSize="sm">
                      {formatTotal(order)}
                    </Text>
                  </HStack>
                  <OrderActions
                    order={order}
                    onView={onView}
                    onApprove={onApprove}
                    onReturnToDraft={onReturnToDraft}
                  />
                </VStack>
              </Box>
            ))}
          </VStack>
        </>
      )}
    </Box>
  );
};
