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
  ShieldCheck,
  ArrowUpRight,
  TrendingUp,
  Plus,
  Layers,
  Sparkles,
} from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useRealtimeProducts } from "@/features/products/hooks/useRealtimeProducts";
import { useRealtimeOrders } from "@/features/products/hooks/useRealtimeOrders";
import { AdminNav } from "@/widgets/AdminNav/AdminNav";

export const AdminHubScreen: React.FC = () => {
  const { user } = useAuth();
  const { products } = useRealtimeProducts();
  const { orders } = useRealtimeOrders();

  const totalUnits = products.reduce((acc, p) => acc + (p.stock || 0), 0);
  const criticalStock = products.filter((p) => p.stock === 0).length;
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= p.minStockAlert).length;
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
      accentColor: "#38bdf8",
      accentBg: "rgba(56, 189, 248, 0.1)",
    },
    {
      title: "Módulo de Ventas",
      subtitle: "Despacho Atómico",
      desc: "Emisión de órdenes de salida para clientes y obras con descuento atómico de inventario en Firebase en un solo commit.",
      icon: ShoppingCart,
      href: "/admin/ventas",
      stat: "Venta Directa",
      statDetail: "Validación de stock en vivo",
      accentColor: "#34d399",
      accentBg: "rgba(52, 211, 153, 0.1)",
    },
    {
      title: "Historial & Reportes",
      subtitle: "Auditoría Financiera",
      desc: "Histórico completo de ventas despachadas, exportación a Excel (.xlsx) y generación de Guías de Salida en PDF A4 con QR.",
      icon: BarChart3,
      href: "/admin/reportes",
      stat: `${orders.length} órdenes`,
      statDetail: `S/. ${totalRevenue.toLocaleString("es-PE", { minimumFractionDigits: 2 })} recaudados`,
      accentColor: "#a78bfa",
      accentBg: "rgba(167, 139, 250, 0.1)",
    },
    {
      title: "Cotizador de Presupuestos",
      subtitle: "Cálculo Paramétrico",
      desc: "Generador de cotizaciones para mamparas, ventanas acústicas y techos con desglose métrico de materiales, mano de obra e IGV.",
      icon: Calculator,
      href: "/presupuesto",
      stat: "Motor de Obra",
      statDetail: "Presupuestos formales con QR",
      accentColor: "#38bdf8",
      accentBg: "rgba(56, 189, 248, 0.1)",
    },
    {
      title: "Directorio de Clientes",
      subtitle: "Empresas & Particulares",
      desc: "Base de datos unificada de constructoras, arquitectos e instaladores registrados con contacto directo y emisión de ventas.",
      icon: Users,
      href: "/admin/clientes",
      stat: "Base de Clientes",
      statDetail: "Gestión comercial y obras",
      accentColor: "#fb923c",
      accentBg: "rgba(251, 146, 60, 0.1)",
    },
  ];

  return (
    <Box maxW="1350px" mx="auto" py="8" px={{ base: "4", md: "6" }}>
      <AdminNav />

      {/* Hero Administrativo Ejecutivo */}
      <Box
        p={{ base: "6", md: "10" }}
        borderRadius="3xl"
        bg="surface.card"
        border="1px solid"
        borderColor="border.default"
        backdropFilter="blur(24px)"
        boxShadow="0 20px 50px rgba(0, 0, 0, 0.08)"
        position="relative"
        overflow="hidden"
        mb="8"
      >
        {/* Glow decorativo de fondo */}
        <Box
          position="absolute"
          top="-40%"
          right="-10%"
          w="400px"
          h="400px"
          borderRadius="full"
          bg="radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, rgba(0,0,0,0) 70%)"
          pointerEvents="none"
        />

        <VStack align="stretch" gap="6" position="relative" zIndex="1">
          <HStack justify="space-between" align="start" wrap="wrap" gap="4">
            <VStack align="start" gap="2">
              <HStack gap="2">
                <Badge
                  px="3"
                  py="1"
                  borderRadius="full"
                  fontSize="2xs"
                  fontWeight="bold"
                  letterSpacing="widest"
                  bg="rgba(56, 189, 248, 0.12)"
                  color="#38bdf8"
                  border="1px solid rgba(56, 189, 248, 0.25)"
                >
                  <Sparkles size={12} style={{ display: "inline", marginRight: 5 }} />
                  CENTRO DE COMANDO GYA
                </Badge>
                {criticalStock > 0 ? (
                  <Badge
                    px="3"
                    py="1"
                    borderRadius="full"
                    fontSize="2xs"
                    fontWeight="bold"
                    bg="rgba(239, 68, 68, 0.15)"
                    color="#f87171"
                    border="1px solid rgba(239, 68, 68, 0.3)"
                  >
                    🔴 {criticalStock} AGOTADOS
                  </Badge>
                ) : lowStock > 0 ? (
                  <Badge
                    px="3"
                    py="1"
                    borderRadius="full"
                    fontSize="2xs"
                    fontWeight="bold"
                    bg="rgba(245, 158, 11, 0.15)"
                    color="#fbbf24"
                    border="1px solid rgba(245, 158, 11, 0.3)"
                  >
                    🟡 {lowStock} EN ALERTA DE STOCK
                  </Badge>
                ) : (
                  <Badge
                    px="3"
                    py="1"
                    borderRadius="full"
                    fontSize="2xs"
                    fontWeight="bold"
                    bg="rgba(52, 211, 153, 0.15)"
                    color="#34d399"
                    border="1px solid rgba(52, 211, 153, 0.3)"
                  >
                    🟢 INVENTARIO EN NIVEL ÓPTIMO
                  </Badge>
                )}
              </HStack>

              <Heading size={{ base: "xl", md: "3xl" }} color="text.heading" letterSpacing="-0.02em">
                Panel de Control y Gestión Operativa
              </Heading>

              <Text color="text.muted" fontSize="sm" maxW="680px">
                Bienvenido, <strong>{user?.displayName || user?.email}</strong>. Administra existencias de cristales, perfiles de aluminio Serie 25 y Nova, órdenes de despacho en lote y cotizaciones de obra en tiempo real.
              </Text>
            </VStack>

            <HStack gap="3">
              <Button asChild size="md" colorPalette="cyan">
                <Link href="/admin/ventas">
                  <ShoppingCart size={16} style={{ marginRight: 6 }} />
                  Nueva Venta
                </Link>
              </Button>
              <Button asChild size="md" variant="outline">
                <Link href="/admin/inventario">
                  <Plus size={16} style={{ marginRight: 6 }} />
                  Ingresar Stock
                </Link>
              </Button>
            </HStack>
          </HStack>

          {/* Mini Tira de Estadísticas del Taller */}
          <SimpleGrid columns={{ base: 2, sm: 4 }} gap="4" pt="4" borderTop="1px solid" borderColor="border.default">
            <VStack align="start" gap="0">
              <Text fontSize="2xs" color="text.muted" textTransform="uppercase" fontWeight="bold" letterSpacing="wider">
                Catálogo Activo
              </Text>
              <Heading size="lg" color="text.heading">
                {products.length} <Text as="span" fontSize="sm" color="text.muted" fontWeight="normal">ítems</Text>
              </Heading>
            </VStack>

            <VStack align="start" gap="0">
              <Text fontSize="2xs" color="text.muted" textTransform="uppercase" fontWeight="bold" letterSpacing="wider">
                Stock Total
              </Text>
              <Heading size="lg" color="text.heading">
                {totalUnits} <Text as="span" fontSize="sm" color="text.muted" fontWeight="normal">unidades</Text>
              </Heading>
            </VStack>

            <VStack align="start" gap="0">
              <Text fontSize="2xs" color="text.muted" textTransform="uppercase" fontWeight="bold" letterSpacing="wider">
                Despachos Realizados
              </Text>
              <Heading size="lg" color="text.heading">
                {orders.length} <Text as="span" fontSize="sm" color="text.muted" fontWeight="normal">órdenes</Text>
              </Heading>
            </VStack>

            <VStack align="start" gap="0">
              <Text fontSize="2xs" color="text.muted" textTransform="uppercase" fontWeight="bold" letterSpacing="wider">
                Facturación Total
              </Text>
              <Heading size="lg" color="#34d399">
                S/. {totalRevenue.toLocaleString("es-PE", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </Heading>
            </VStack>
          </SimpleGrid>
        </VStack>
      </Box>

      {/* Grid de Módulos del Sistema */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="6">
        {modules.map((mod) => {
          const IconComp = mod.icon;
          return (
            <Box
              key={mod.href}
              p="7"
              borderRadius="2xl"
              bg="surface.card"
              border="1px solid"
              borderColor="border.default"
              backdropFilter="blur(16px)"
              boxShadow="0 8px 30px rgba(0, 0, 0, 0.04)"
              transition="all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
              _hover={{
                transform: "translateY(-4px)",
                borderColor: mod.accentColor,
                boxShadow: `0 16px 36px -10px ${mod.accentColor}25`,
              }}
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
                    <IconComp size={26} strokeWidth={1.8} />
                  </Box>

                  <VStack align="end" gap="0">
                    <Text fontSize="xs" fontWeight="bold" color="text.heading">
                      {mod.stat}
                    </Text>
                    <Text fontSize="2xs" color="text.muted">
                      {mod.statDetail}
                    </Text>
                  </VStack>
                </HStack>

                <VStack align="start" gap="1.5">
                  <Text fontSize="2xs" color="text.muted" textTransform="uppercase" fontWeight="bold" letterSpacing="wider">
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
                  _hover={{
                    borderColor: mod.accentColor,
                    color: mod.accentColor,
                    bg: mod.accentBg,
                  }}
                >
                  <Link href={mod.href}>
                    <span>Ingresar al Módulo</span>
                    <ArrowUpRight size={14} style={{ marginLeft: 6 }} />
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
