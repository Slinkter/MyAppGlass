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
      p={{ base: "5", md: "8" }}
      mb="8"
      borderRadius="2xl"
      bg="status.successSoft"
      border="1px solid" borderColor="status.successBorder"
      backdropFilter="blur(16px)"
      boxShadow="md"
    >
      <HStack justify="space-between" wrap="wrap" gap="4">
        <HStack gap="4">
          <Box p="3" bg="status.successSoft" color="var(--chakra-colors-status-success)" borderRadius="full">
            <CheckCircle2 size={36} style={{ flexShrink: 0 }} />
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
          <Button asChild size="md" borderRadius="xl">
            <Link href="/admin/reportes">
              <FileCheck size={16} style={{ flexShrink: 0, marginRight: 6 }} />
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
