"use client";

import React from "react";
import { Box, VStack, HStack, Heading, Text, Button } from "@chakra-ui/react";
import { CheckCircle2, FileCheck } from "lucide-react";
import Link from "next/link";

interface OrderSuccessBannerProps {
  orderId: string;
  onNewSale: () => void;
}

export const OrderSuccessBanner: React.FC<OrderSuccessBannerProps> = ({ orderId, onNewSale }) => {
  return (
    <Box
      p="8"
      mb="8"
      borderRadius="2xl"
      bg="status.successSoft"
      border="1px solid rgba(52, 211, 153, 0.3)"
      backdropFilter="blur(16px)"
      boxShadow="0 10px 40px rgba(52, 211, 153, 0.12)"
    >
      <HStack justify="space-between" wrap="wrap" gap="4">
        <HStack gap="4">
          <Box p="3" bg="rgba(52, 211, 153, 0.2)" color="var(--chakra-colors-status-success)" borderRadius="full">
            <CheckCircle2 size={36} />
          </Box>
          <VStack align="start" gap="0.5">
            <Heading size="lg" color="var(--chakra-colors-status-success)">
              ¡Orden Despachada Exitosamente!
            </Heading>
            <Text fontSize="sm" color="text.muted">
              ID Transaccional: <strong>{orderId}</strong> · Stock actualizado en tiempo real.
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
          <Button variant="outline" size="md" borderRadius="xl" onClick={() => onNewSale()}>
            Nueva Venta
          </Button>
        </HStack>
      </HStack>
    </Box>
  );
};
