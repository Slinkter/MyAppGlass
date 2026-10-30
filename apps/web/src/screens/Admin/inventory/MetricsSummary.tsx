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
      color: "status.info",
      bg: "status.infoSoft",
      icon: <Package size={22} />,
    },
    {
      label: "Stock Crítico",
      value: metrics.criticalStock,
      subtitle: "Productos agotados (0 stock)",
      color: metrics.criticalStock > 0 ? "status.danger" : "status.success",
      bg: "status.dangerSoft",
      icon: <AlertTriangle size={22} />,
      iconColor: "status.danger",
    },
    {
      label: "Stock Bajo",
      value: metrics.lowStock,
      subtitle: "Bajo umbral de alerta mínima",
      color: metrics.lowStock > 0 ? "status.warning" : "status.success",
      bg: "status.warningSoft",
      icon: <TrendingUp size={22} />,
      iconColor: "status.warning",
    },
    {
      label: "Valorización de Stock",
      value: `S/. ${metrics.totalInventoryValue.toLocaleString("es-PE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`,
      subtitle: "Valor de venta comercial",
      color: "status.success",
      bg: "status.successSoft",
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
          boxShadow="adminCard"
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
