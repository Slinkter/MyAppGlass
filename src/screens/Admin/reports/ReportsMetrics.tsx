"use client";

import React from "react";
import { Box, VStack, HStack, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import { DollarSign, TrendingUp, Package, FileCheck } from "lucide-react";

export interface ReportsStats {
  totalOrders: number;
  totalRevenue: number;
  avgTicket: number;
  totalItemsSold: number;
}

interface ReportsMetricsProps {
  stats: ReportsStats;
}

export const ReportsMetrics: React.FC<ReportsMetricsProps> = ({ stats }) => {
  return (
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
  );
};
