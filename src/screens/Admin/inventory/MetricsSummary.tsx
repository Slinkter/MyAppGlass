import React, { useMemo } from "react";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  Package,
  AlertTriangle,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { Product } from "@/shared/schemas/ecommerce-schemas";

interface MetricsSummaryProps {
  products: Product[];
}

export const MetricsSummary: React.FC<MetricsSummaryProps> = ({ products }) => {
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

  const cards = [
    {
      label: "Total Productos",
      value: metrics.totalItems,
      subtitle: `${metrics.totalUnits} unidades en stock`,
      color: "#38bdf8",
      bg: "rgba(56, 189, 248, 0.1)",
      icon: <Package size={22} />,
    },
    {
      label: "Stock Crítico",
      value: metrics.criticalStock,
      subtitle: "Productos agotados (0 stock)",
      color: metrics.criticalStock > 0 ? "#f87171" : "#34d399",
      bg: "rgba(239, 68, 68, 0.1)",
      icon: <AlertTriangle size={22} />,
      iconColor: "#f87171",
    },
    {
      label: "Stock Bajo",
      value: metrics.lowStock,
      subtitle: "Bajo umbral de alerta mínima",
      color: metrics.lowStock > 0 ? "#fbbf24" : "#34d399",
      bg: "rgba(245, 158, 11, 0.1)",
      icon: <TrendingUp size={22} />,
      iconColor: "#fbbf24",
    },
    {
      label: "Valorización de Stock",
      value: `S/. ${metrics.totalInventoryValue.toLocaleString("es-PE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      subtitle: "Valor de venta comercial",
      color: "#34d399",
      bg: "rgba(52, 211, 153, 0.1)",
      icon: <DollarSign size={22} />,
    },
  ];

  return (
    <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="4" mb="8">
      {cards.map((card) => (
        <Box
          key={card.label}
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
                {card.label}
              </Text>
              <Heading size="xl" color="text.heading">
                {card.value}
              </Heading>
              <Text fontSize="xs" color="text.muted">
                {card.subtitle}
              </Text>
            </VStack>
            <Box p="3" borderRadius="xl" bg={card.bg} color={card.iconColor ?? card.color}>
              {card.icon}
            </Box>
          </HStack>
        </Box>
      ))}
    </SimpleGrid>
  );
};
