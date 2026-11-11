"use client";

import React from "react";
import Link from "next/link";
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  SimpleGrid,
  Badge,
} from "@chakra-ui/react";
import {
  Package,
  ShoppingCart,
  BarChart3,
  Calculator,
  Users,
  ArrowUpRight,
  Plus,
  Sparkles,
  CircleAlert,
  CircleCheck,
  Circle,
} from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useRealtimeProducts } from "@/entities/product/api/useRealtimeProducts";
import { useRealtimeOrders } from "@/entities/order/api/useRealtimeOrders";
import { AdminNav } from "@/widgets/AdminNav/AdminNav";

export const AdminHubScreen: React.FC = () => {
  const { user } = useAuth();
  const { products } = useRealtimeProducts();
  const { orders } = useRealtimeOrders();

    const { totalUnits, criticalStock, lowStock } = React.useMemo(() => {
    let units = 0;
    let critical = 0;
    let low = 0;
    for (let i = 0; i < products.length; i++) {
      const p = products[i];
      const stock = p.stock || 0;
      units += stock;
      if (stock === 0) {
        critical++;
      } else if (stock <= p.minStockAlert) {
        low++;
      }
    }
    return { totalUnits: units, criticalStock: critical, lowStock: low };
  }, [products]);
  const totalRevenue = orders.reduce((acc, o) => acc + (o.total || 0), 0);

  const modules = [
    {
      title: "Control de Inventario",
      subtitle: "Stock y Catálogo",
      desc: "Administración integral de vidrios templados, perfiles de aluminio y accesorios. Control de existencias y reposición rápida.",
      icon: Package,
      href: "/admin/inventario",
      stat: `${products.length} productos`,
      statDetail: `${totalUnits} unidades en almacén`,
      accentColor: "var(--chakra-colors-status-info)",
      accentBg: "var(--chakra-colors-status-info-soft)",
    },
    {
      title: "Módulo de Ventas",
      subtitle: "Despacho Atómico",
      desc: "Emisión de órdenes de salida para clientes y obras con descuento atómico de inventario en Firebase en un solo commit.",
      icon: ShoppingCart,
      href: "/admin/ventas",
      stat: "Venta Directa",
      statDetail: "Validación de stock en vivo",
      accentColor: "var(--chakra-colors-status-success)",
      accentBg: "var(--chakra-colors-status-success-soft)",
    },
    {
      title: "Historial & Reportes",
      subtitle: "Auditoría Financiera",
      desc: "Histórico completo de ventas despachadas, exportación a Excel (.xlsx) y generación de Guías de Salida en PDF A4 con QR.",
      icon: BarChart3,
      href: "/admin/reportes",
      stat: `${orders.length} órdenes`,
      statDetail: `S/. ${totalRevenue.toLocaleString("es-PE", { minimumFractionDigits: 2 })} recaudados`,
      accentColor: "var(--chakra-colors-accent-violet-soft)",
      accentBg: "bg.tint",
    },
    {
      title: "Cotizador de Presupuestos",
      subtitle: "Cálculo Paramétrico",
      desc: "Generador de cotizaciones para mamparas, ventanas acústicas y techos con desglose métrico de materiales, mano de obra e IGV.",
      icon: Calculator,
      href: "/presupuesto",
      stat: "Motor de Obra",
      statDetail: "Presupuestos formales con QR",
      accentColor: "var(--chakra-colors-status-info)",
      accentBg: "var(--chakra-colors-status-info-soft)",
    },
    {
      title: "Directorio de Clientes",
      subtitle: "Empresas & Particulares",
      desc: "Base de datos unificada de constructoras, arquitectos e instaladores registrados con contacto directo y emisión de ventas.",
      icon: Users,
      href: "/admin/clientes",
      stat: "Base de Clientes",
      statDetail: "Gestión comercial y obras",
      accentColor: "var(--chakra-colors-status-warning)",
      accentBg: "var(--chakra-colors-status-warning-soft)",
    },
  ];

  return (
    <Box maxW="84rem" mx="auto" py={{ base: "5", md: "8" }} px={{ base: "4", md: "6" }}>
      <AdminNav />

      {/* Hero Administrativo Ejecutivo */}
      <Box
        p={{ base: "6", md: "10" }}
        borderRadius="3xl"
        bg="surface.card"
        border="1px solid"
        borderColor="border.default"
        backdropFilter="blur(24px)"
        boxShadow="lg"
        position="relative"
        overflow="hidden"
        mb="8"
      >
        {/* Glow decorativo de fondo */}
        <Box
          position="absolute"
          top="-40%"
          right="-10%"
          w="96"
          h="96"
          borderRadius="full"
          bg="bg.tint"
          pointerEvents="none"
        />

        <VStack align="stretch" gap={{ base: "4", md: "6" }} position="relative" zIndex="1">
          <HStack justify="space-between" align="start" wrap="wrap" gap="4">
            <VStack align="start" gap="2">
              <HStack gap="2">
                <Badge
                  px="3"
                  py="1"
                  borderRadius="full"
                  fontSize="xs"
                  fontWeight="bold"
                  letterSpacing="widest"
                  bg="status.infoSubtle"
                  color="var(--chakra-colors-status-info)"
                  border="1px solid"
                  borderColor="status.infoBorder"
                >
                  <Sparkles size={12} style={{ flexShrink: 0, display: "inline", marginRight: 5 }} />
                  CENTRO DE COMANDO GYA
                </Badge>
                {criticalStock > 0 ? (
                  <Badge
                    px="3"
                    py="1"
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="bold"
                    bg="status.dangerSoft"
                    color="var(--chakra-colors-status-danger)"
                    border="1px solid"
                    borderColor="status.dangerBorder"
                  >
                    <CircleAlert size={12} aria-hidden /> {criticalStock} AGOTADOS
                  </Badge>
                ) : lowStock > 0 ? (
                  <Badge
                    px="3"
                    py="1"
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="bold"
                    bg="status.warningSoft"
                    color="var(--chakra-colors-status-warning)"
                    border="1px solid"
                    borderColor="status.warningBorder"
                  >
                    <Circle size={12} aria-hidden /> {lowStock} EN ALERTA DE STOCK
                  </Badge>
                ) : (
                  <Badge
                    px="3"
                    py="1"
                    borderRadius="full"
                    fontSize="xs"
                    fontWeight="bold"
                    bg="status.successSoft"
                    color="var(--chakra-colors-status-success)"
                    border="1px solid"
                    borderColor="status.successBorder"
                  >
                    <CircleCheck size={12} aria-hidden /> INVENTARIO EN NIVEL ÓPTIMO
                  </Badge>
                )}
              </HStack>

              <Heading size={{ base: "xl", md: "3xl" }} color="text.heading" letterSpacing="-0.02em">
                Panel de Control y Gestión Operativa
              </Heading>

              <Text color="text.muted" fontSize="sm" maxW="2xl">
                Bienvenido, <strong>{user?.displayName || user?.email}</strong>. Administra existencias de cristales, perfiles de aluminio Serie 25 y Nova, órdenes de despacho en lote y cotizaciones de obra en tiempo real.
              </Text>
            </VStack>

            <HStack gap="3">
              <Button asChild size="md">
                <Link href="/admin/ventas">
                  <ShoppingCart size={16} style={{ flexShrink: 0, marginRight: 6 }} />
                  Nueva Venta
                </Link>
              </Button>
              <Button asChild size="md" variant="outline">
                <Link href="/admin/inventario">
                  <Plus size={16} style={{ flexShrink: 0, marginRight: 6 }} />
                  Ingresar Stock
                </Link>
              </Button>
            </HStack>
          </HStack>

          {/* Mini Tira de Estadísticas del Taller */}
          <SimpleGrid columns={{ base: 2, sm: 4 }} gap="4" pt="4" borderTop="1px solid" borderColor="border.default">
            <VStack align="start" gap="0">
              <Text fontSize="xs" color="text.muted" textTransform="uppercase" fontWeight="bold" letterSpacing="wider">
                Catálogo Activo
              </Text>
              <Heading size="lg" color="text.heading">
                {products.length} <Text as="span" fontSize="sm" color="text.muted" fontWeight="normal">ítems</Text>
              </Heading>
            </VStack>

            <VStack align="start" gap="0">
              <Text fontSize="xs" color="text.muted" textTransform="uppercase" fontWeight="bold" letterSpacing="wider">
                Stock Total
              </Text>
              <Heading size="lg" color="text.heading">
                {totalUnits} <Text as="span" fontSize="sm" color="text.muted" fontWeight="normal">unidades</Text>
              </Heading>
            </VStack>

            <VStack align="start" gap="0">
              <Text fontSize="xs" color="text.muted" textTransform="uppercase" fontWeight="bold" letterSpacing="wider">
                Despachos Realizados
              </Text>
              <Heading size="lg" color="text.heading">
                {orders.length} <Text as="span" fontSize="sm" color="text.muted" fontWeight="normal">órdenes</Text>
              </Heading>
            </VStack>

            <VStack align="start" gap="0">
              <Text fontSize="xs" color="text.muted" textTransform="uppercase" fontWeight="bold" letterSpacing="wider">
                Facturación Total
              </Text>
              <Heading size="lg" color="var(--chakra-colors-status-success)">
                S/. {totalRevenue.toLocaleString("es-PE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </Heading>
            </VStack>
          </SimpleGrid>
        </VStack>
      </Box>

      {/* Grid de Módulos del Sistema */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: "4", md: "6" }}>
        {modules.map((mod) => {
          const IconComp = mod.icon;
          return (
            <Box
              key={mod.href}
              p={{ base: "4", md: "6" }}
              borderRadius="2xl"
              bg="surface.card"
              border="1px solid"
              borderColor="border.default"
              backdropFilter="blur(16px)"
              boxShadow="var(--chakra-shadows-admin-table)"
              transition="transform 0.25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
              _hover={{ borderColor: "border.strong" }}
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
            >
              <VStack align="start" gap="5">
                <HStack justify="space-between" w="full">
                  <Box
                    p="3.5"
                    borderRadius="xl"
                    bg={mod.accentBg}
                    color={mod.accentColor}
                    border={`1px solid ${mod.accentColor}30`}
                  >
                    <IconComp size={26} style={{ flexShrink: 0 }} strokeWidth={1.8} />
                  </Box>

                  <VStack align="end" gap="0">
                    <Text fontSize="xs" fontWeight="bold" color="text.heading">
                      {mod.stat}
                    </Text>
                    <Text fontSize="xs" color="text.muted">
                      {mod.statDetail}
                    </Text>
                  </VStack>
                </HStack>

                <VStack align="start" gap="1.5">
                  <Text fontSize="xs" color="text.muted" textTransform="uppercase" fontWeight="bold" letterSpacing="wider">
                    {mod.subtitle}
                  </Text>
                  <Heading size="md" color="text.heading" letterSpacing="-0.01em">
                    {mod.title}
                  </Heading>
                  <Text fontSize="xs" color="text.muted" lineHeight="tall">
                    {mod.desc}
                  </Text>
                </VStack>
              </VStack>

              <Box pt="6" w="full">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  w="full"
                  borderRadius="xl"
                >
                  <Link href={mod.href}>
                    <span>Ingresar al Módulo</span>
                    <ArrowUpRight size={14} style={{ flexShrink: 0, marginLeft: 6 }} />
                  </Link>
                </Button>
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};
