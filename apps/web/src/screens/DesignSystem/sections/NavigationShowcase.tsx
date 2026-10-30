"use client";

import React from "react";
import {
  Box,
  Text,
  VStack,
  HStack,
  Card,
  Badge,
} from "@chakra-ui/react";
import AuraDesktopNav from "@/widgets/Navbar/AuraDesktopNav";
import { AdminNav } from "@/widgets/AdminNav/AdminNav";

export const NavigationShowcase: React.FC = () => {
  return (
    <VStack gap="8" align="stretch">
      {/* 1. Navbar Público en Cápsula (AuraDesktopNav) */}
      <Card.Root bg="bg.surface" borderColor="border.default" p="6" borderRadius="card">
        <Card.Header pb="4">
          <HStack justify="space-between" wrap="wrap">
            <Box>
              <Card.Title fontSize="xl">AuraDesktopNav — Barra Pública en Cápsula Flotante</Card.Title>
              <Card.Description>
                Componente real de producción (`widgets/Navbar/AuraDesktopNav.tsx`) con desenfoque de cristal (backdrop-blur) y sombra `navDesktop`.
              </Card.Description>
            </Box>
            <Badge colorPalette="blue" px="3" py="1" borderRadius="full">Web Pública</Badge>
          </HStack>
        </Card.Header>
        <Card.Body>
          <Box
            p={{ base: "6", md: "10" }}
            bg="bg.page"
            borderRadius="2xl"
            borderWidth="1px"
            borderColor="border.subtle"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minH="180px"
            position="relative"
            overflow="hidden"
          >
            {/* Fondo simulando el hero de cristal */}
            <Box
              position="absolute"
              inset="0"
              bg="radial-gradient(ellipse at center, rgba(56, 189, 248, 0.08) 0%, transparent 70%)"
              pointerEvents="none"
            />
            <Text fontSize="xs" color="text.muted" mb="4" fontWeight="medium">
              VISTA PREVIA INTERACTIVA (SCROLL SPY & ROUTING)
            </Text>
            <AuraDesktopNav />
          </Box>
        </Card.Body>
      </Card.Root>

      {/* 2. AdminNav del Dashboard */}
      <Card.Root bg="bg.surface" borderColor="border.default" p="6" borderRadius="card">
        <Card.Header pb="4">
          <HStack justify="space-between" wrap="wrap">
            <Box>
              <Card.Title fontSize="xl">AdminNav — Barra de Navegación del Dashboard Backoffice</Card.Title>
              <Card.Description>
                Componente real de administración (`widgets/AdminNav/AdminNav.tsx`) con selector de módulos e iconos Lucide nativos.
              </Card.Description>
            </Box>
            <Badge colorPalette="purple" px="3" py="1" borderRadius="full">Backoffice Admin</Badge>
          </HStack>
        </Card.Header>
        <Card.Body>
          <Box
            p={{ base: "4", md: "6" }}
            bg="bg.page"
            borderRadius="2xl"
            borderWidth="1px"
            borderColor="border.subtle"
          >
            <AdminNav />
            <Text fontSize="xs" color="text.muted" textAlign="center" mt="2">
              Barra fija con acceso a Servicios, Proyectos, Inventario, Clientes y Ventas.
            </Text>
          </Box>
        </Card.Body>
      </Card.Root>
    </VStack>
  );
};
