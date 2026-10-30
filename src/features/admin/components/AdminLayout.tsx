"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Badge,
} from "@chakra-ui/react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Users,
  Calculator,
  Layers,
  Building2,
  Globe,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { AdminRouteGuard } from "@/features/auth/components/AdminRouteGuard";

export interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  badge?: string;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  children,
  title,
  subtitle,
  badge = "Control Center",
}) => {
  const pathname = usePathname();
  const { user } = useAuth();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Servicios", href: "/admin/servicios", icon: Layers },
    { label: "Proyectos", href: "/admin/proyectos", icon: Building2 },
    { label: "Inventario", href: "/admin/inventario", icon: Package },
    { label: "Ventas", href: "/admin/ventas", icon: ShoppingCart },
    { label: "Reportes", href: "/admin/reportes", icon: BarChart3 },
    { label: "Clientes", href: "/admin/clientes", icon: Users },
    { label: "Cotizador", href: "/presupuesto", icon: Calculator },
  ];

  return (
    <AdminRouteGuard>
      <Box minH="100vh" bg="bg.canvas" py="8" px={{ base: "4", md: "8" }}>
        <Container maxW="7xl">
          {/* Barra de navegación administrativa */}
          <Box
            mb="8"
            p="2.5"
            borderRadius="2xl"
            bg="surface.card"
            border="1px solid"
            borderColor="border.default"
            backdropFilter="blur(20px)"
            boxShadow="0 10px 30px rgba(0, 0, 0, 0.06)"
          >
            <HStack justify="space-between" wrap="wrap" gap="3">
              <HStack gap="1.5" wrap="wrap">
                {/* Botón Volver al Sitio Web */}
                <Box
                  asChild
                  display="inline-flex"
                  alignItems="center"
                  gap="1.5"
                  px="3"
                  py="2"
                  borderRadius="xl"
                  fontSize="xs"
                  fontWeight="500"
                  color="text.muted"
                  border="1px solid"
                  borderColor="border.default"
                  bg="bg.subtle"
                  transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                  _hover={{
                    color: "text.primary",
                    borderColor: "brand.primary",
                    bg: "surface.card",
                    transform: "translateY(-1px)",
                  }}
                >
                  <Link href="/">
                    <Globe size={14} style={{ flexShrink: 0 }} />
                    <Text as="span" display={{ base: "none", sm: "inline" }}>
                      Ver Sitio Web
                    </Text>
                  </Link>
                </Box>

                <Box w="1px" h="5" bg="border.default" mx="1" />

                {/* Items de Navegación de Admin */}
                {navItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;

                  return (
                    <Box
                      key={item.href}
                      asChild
                      display="inline-flex"
                      alignItems="center"
                      gap="2"
                      px="3.5"
                      py="2"
                      borderRadius="xl"
                      fontSize="xs"
                      fontWeight={isActive ? "600" : "500"}
                      color={isActive ? "brand.primary" : "text.muted"}
                      bg={isActive ? "bg.subtle" : "transparent"}
                      border="1px solid"
                      borderColor={isActive ? "border.default" : "transparent"}
                      boxShadow={isActive ? "0 2px 8px rgba(0, 0, 0, 0.04)" : "none"}
                      transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                      _hover={{
                        color: "brand.primary",
                        bg: "bg.subtle",
                      }}
                    >
                      <Link href={item.href}>
                        <Icon size={15} style={{ flexShrink: 0 }} />
                        {item.label}
                      </Link>
                    </Box>
                  );
                })}
              </HStack>

              {/* Info de Administrador */}
              <HStack gap="2.5">
                <Badge
                  display="inline-flex"
                  alignItems="center"
                  gap="1.5"
                  px="2.5"
                  py="1"
                  borderRadius="full"
                  fontSize="2xs"
                  fontWeight="600"
                  colorPalette="blue"
                  variant="subtle"
                >
                  <ShieldCheck size={12} style={{ flexShrink: 0 }} />
                  ADMIN GYA
                </Badge>
                {user?.email && (
                  <Text
                    fontSize="xs"
                    color="text.muted"
                    display={{ base: "none", md: "inline" }}
                  >
                    {user.email}
                  </Text>
                )}
              </HStack>
            </HStack>
          </Box>

          {/* Encabezado de página si se especifica title */}
          {title && (
            <VStack align="start" gap="1" mb="6">
              <HStack gap="2">
                <Heading size="lg" fontWeight="bold" color="text.primary">
                  {title}
                </Heading>
                {badge && (
                  <Badge size="sm" colorPalette="blue" variant="subtle">
                    {badge}
                  </Badge>
                )}
              </HStack>
              {subtitle && (
                <Text fontSize="sm" color="text.muted">
                  {subtitle}
                </Text>
              )}
            </VStack>
          )}

          {/* Contenido principal inyectado */}
          {children}
        </Container>
      </Box>
    </AdminRouteGuard>
  );
};
