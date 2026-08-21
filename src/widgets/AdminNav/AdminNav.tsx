"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HStack, Box, Text, Badge } from "@chakra-ui/react";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  BarChart3,
  Calculator,
  Users,
  ShieldCheck,
  Globe,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";

export const AdminNav: React.FC = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Inventario", href: "/admin/inventario", icon: Package },
    { label: "Ventas", href: "/admin/ventas", icon: ShoppingCart },
    { label: "Reportes", href: "/admin/reportes", icon: BarChart3 },
    { label: "Clientes", href: "/admin/clientes", icon: Users },
    { label: "Cotizador", href: "/presupuesto", icon: Calculator },
  ];

  return (
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
              color: "text.heading",
              bg: "surface.card",
              borderColor: "border.strong",
              transform: "translateY(-1px)",
            }}
          >
            <Link href="/" title="Volver al Sitio Web">
              <Globe size={14} />
              <span>Sitio Web</span>
            </Link>
          </Box>

          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.href;
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
                fontWeight={isActive ? "700" : "500"}
                letterSpacing="0.02em"
                bg={isActive ? "text.heading" : "transparent"}
                color={isActive ? "bg.page" : "text.muted"}
                border="1px solid"
                borderColor={isActive ? "text.heading" : "transparent"}
                transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{
                  color: isActive ? "bg.page" : "text.heading",
                  bg: isActive ? "text.heading" : "bg.subtle",
                  transform: "translateY(-1px)",
                }}
                _active={{ transform: "translateY(0)" }}
              >
                <Link href={item.href}>
                  <IconComponent size={15} strokeWidth={isActive ? 2.2 : 1.8} />
                  <span>{item.label}</span>
                </Link>
              </Box>
            );
          })}
        </HStack>

        <HStack gap="3" pr="2">
          <Badge
            variant="subtle"
            px="2.5"
            py="1"
            borderRadius="full"
            fontSize="2xs"
            fontWeight="bold"
            letterSpacing="wider"
            bg="rgba(56, 189, 248, 0.12)"
            color="#38bdf8"
            border="1px solid rgba(56, 189, 248, 0.25)"
          >
            <ShieldCheck size={12} style={{ display: "inline", marginRight: 4 }} />
            ADMIN GYA
          </Badge>
          {user?.email && (
            <Text fontSize="2xs" color="text.muted" fontFamily="mono" display={{ base: "none", md: "block" }}>
              {user.email}
            </Text>
          )}
        </HStack>
      </HStack>
    </Box>
  );
};
