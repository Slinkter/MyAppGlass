"use client";

import React from "react";
import { Box, Text, VStack, HStack } from "@chakra-ui/react";
import { ShowcaseCard, ShowcasePanel, ShowcaseStack } from "../components";
import AuraDesktopNav from "@/widgets/Navbar/AuraDesktopNav";
import { AdminNav } from "@/widgets/AdminNav/AdminNav";
import { FloatingWhatsAppButton, ThemeToggleButton } from "@/widgets/FloatingActions";

export const NavigationShowcase: React.FC = () => {
  return (
    <ShowcaseStack>
      {/* 1. Navbar Público en Cápsula (AuraDesktopNav) */}
      <ShowcaseCard
        title="AuraDesktopNav — Barra Pública en Cápsula Flotante"
        description="Componente real de producción (`widgets/Navbar/AuraDesktopNav.tsx`) con desenfoque de cristal (backdrop-blur) y sombra `navDesktop`."
        badge="Web Pública"
      >
        <ShowcasePanel
          p={{ base: "4", md: "8" }}
          borderRadius="2xl"
          minH="180px"
          position="relative"
          maxW="100%"
          minW="0"
        >
          {/* Fondo simulando el hero con tokens cálidos de marca */}
          <Box
            position="absolute"
            inset="0"
            borderRadius="2xl"
            bg="bg.tintNavy"
            border="1px solid"
            borderColor="border.warm"
            pointerEvents="none"
          />
          <Box position="relative" display="flex" flexDirection="column" alignItems="center" justifyContent="center" minH="140px" maxW="full">
            <Text fontSize="xs" color="text.muted" mb="4" fontWeight="medium" textAlign="center">
              VISTA PREVIA INTERACTIVA (SCROLL SPY & ROUTING)
            </Text>
            <Box maxW="full" overflowX="auto" display="flex" justifyContent={{ base: "flex-start", md: "center" }} w="full">
              <AuraDesktopNav />
            </Box>
          </Box>
        </ShowcasePanel>
      </ShowcaseCard>

      {/* 2. AdminNav del Dashboard */}
      <ShowcaseCard
        title="AdminNav — Barra de Navegación del Dashboard Backoffice"
        description="Componente real de administración (`widgets/AdminNav/AdminNav.tsx`) con selector de módulos e iconos Lucide nativos."
        badge="Backoffice Admin"
      >
        <ShowcasePanel p={{ base: "4", md: "8" }} borderRadius="2xl" minW="0">
          <Box maxW="100%" overflowX="auto" mb="-8">
            <AdminNav />
          </Box>
          <Text fontSize="xs" color="text.muted" textAlign="center" mt="2">
            Barra fija con acceso a Servicios, Proyectos, Inventario, Clientes y Ventas.
          </Text>
        </ShowcasePanel>
      </ShowcaseCard>

      {/* 3. FloatingActions (WhatsApp & ThemeToggle Homologados) */}
      <ShowcaseCard
        title="FloatingActions — Acciones Flotantes Homologadas"
        description="Componentes globales (`widgets/FloatingActions/`) con dimensiones simétricas (`w`/`h` 14 en móvil, 16 en escritorio e icono `size={32}`)."
        badge="Global Widgets"
      >
        <ShowcasePanel p={{ base: "4", md: "8" }} borderRadius="2xl">
          <HStack justify="space-around" align="center" wrap="wrap" gap={{ base: "6", md: "8" }}>
            <VStack gap="3">
              <FloatingWhatsAppButton />
              <VStack gap="0.5">
                <Text fontSize="xs" fontWeight="bold" color="text.heading">
                  FloatingWhatsApp
                </Text>
                <Text fontSize="xs" color="text.muted">
                  64×64px (md) · Icono 32px
                </Text>
              </VStack>
            </VStack>

            <VStack gap="3">
              <ThemeToggleButton />
              <VStack gap="0.5">
                <Text fontSize="xs" fontWeight="bold" color="text.heading">
                  ThemeToggle
                </Text>
                <Text fontSize="xs" color="text.muted">
                  64×64px (md) · Icono 32px
                </Text>
              </VStack>
            </VStack>
          </HStack>
        </ShowcasePanel>
      </ShowcaseCard>
    </ShowcaseStack>
  );
};
