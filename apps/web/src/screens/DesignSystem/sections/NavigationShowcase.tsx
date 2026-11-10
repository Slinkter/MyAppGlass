"use client";

import React, { useState } from "react";
import { Box, Text, VStack, HStack, SimpleGrid, Tabs } from "@chakra-ui/react";
import {
  ChevronRight,
  ChevronLeft,
  Home,
  Layers,
  FileText,
  Calculator,
  Compass,
} from "lucide-react";
import { DemoLinks, ShowcaseCard, ShowcasePanel, ShowcaseStack } from "../components";
import AuraDesktopNav from "@/widgets/Navbar/AuraDesktopNav";
import { AdminNav } from "@/widgets/AdminNav/AdminNav";
import { FloatingWhatsAppButton, ThemeToggleButton } from "@/widgets/FloatingActions";
import { Button } from "@/components/ui/button";

export const NavigationShowcase: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  return (
    <DemoLinks>
    <ShowcaseStack>
      {/* 1. Barra pública de escritorio (componente real, una sola variante) */}
      <ShowcaseCard
        title="AuraDesktopNav — Barra pública en cápsula"
        description="Componente real del sitio: píldora de vidrio con pastilla negra en el ítem activo y texto en oración. Solo existe una variante (la antigua barra clásica ya no existe). En 360 px la barra real no se muestra; aquí cabe porque el componente se ajusta al ancho."
        badge="Web Pública"
      >
        <ShowcasePanel p={{ base: "4", md: "8" }} borderRadius="card" bg="bg.tint" borderColor="border.warm" minW="0">
          <Box display="flex" justifyContent={{ base: "flex-start", md: "center" }} w="full" minW="0">
            <AuraDesktopNav previewActive="inicio" />
          </Box>
        </ShowcasePanel>
      </ShowcaseCard>

      {/* 2. AdminNav del Dashboard */}
      <ShowcaseCard
        title="AdminNav — Barra de Navegación del Dashboard Backoffice"
        description="Componente real de administración (widgets/AdminNav/AdminNav.tsx) con selector de módulos e iconos Lucide nativos."
        badge="Backoffice Admin"
      >
        <ShowcasePanel p={{ base: "4", md: "8" }} borderRadius="card" minW="0">
          <Box
            maxW="100%"
            mb="-8"
            css={{
              // Garantizar contraste WCAG >= 4.5:1 en claro y oscuro para el badge ADMIN GYA
              "& span:has(svg.lucide-shield-check)": {
                color: "status.infoText !important",
              },
            }}
          >
            <AdminNav />
          </Box>
          <Text fontSize="xs" color="text.muted" textAlign="center" mt="2">
            Barra fija con acceso a Servicios, Proyectos, Inventario, Clientes y Ventas.
          </Text>
        </ShowcasePanel>
      </ShowcaseCard>

      {/* 3. Barras de Pestañas y Segmentos v2 */}
      <ShowcaseCard
        title="Tabs & Barras Segmentadas — Navegación de Contenido"
        description="Pestañas accesibles con targets táctiles >= 44, foco visible (R7) y estado activo inequívoco (aria-selected)."
        badge="Navegación Interna"
      >
        <ShowcasePanel p={{ base: "4", md: "8" }} borderRadius="card">
          <Tabs.Root defaultValue="sistemas" variant="line">
            <Tabs.List overflowX="auto" maxW="full">
              <Tabs.Trigger value="sistemas" minH="11" minW="11" px="4">
                <Layers size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                <span>Sistemas Oficiales</span>
              </Tabs.Trigger>
              <Tabs.Trigger value="fichas" minH="11" minW="11" px="4">
                <FileText size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                <span>Ficha Técnica</span>
              </Tabs.Trigger>
              <Tabs.Trigger value="presupuesto" minH="11" minW="11" px="4">
                <Calculator size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                <span>Presupuesto</span>
              </Tabs.Trigger>
              <Tabs.Trigger value="instalacion" minH="11" minW="11" px="4">
                <Compass size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                <span>Instalación</span>
              </Tabs.Trigger>
              <Tabs.Indicator />
            </Tabs.List>

            <Tabs.Content
              value="sistemas"
              p="4"
              borderRadius="xl"
              bg="bg.section"
              border="1px solid"
              borderColor="border.warm"
              mt="4"
            >
              <Text fontSize="sm" color="text.body" fontWeight="medium">
                Catálogo activo: <strong>Sistemas Oficiales</strong> (Sistema Nova, Serie 25, Serie 35, Serie 62, Acústica y PVC abatible).
              </Text>
            </Tabs.Content>
            <Tabs.Content
              value="fichas"
              p="4"
              borderRadius="xl"
              bg="bg.section"
              border="1px solid"
              borderColor="border.warm"
              mt="4"
            >
              <Text fontSize="sm" color="text.body" fontWeight="medium">
                Especificaciones de perfiles de aluminio y vidrios (Crudo, Laminado y Templado según norma E.040).
              </Text>
            </Tabs.Content>
            <Tabs.Content
              value="presupuesto"
              p="4"
              borderRadius="xl"
              bg="bg.section"
              border="1px solid"
              borderColor="border.warm"
              mt="4"
            >
              <Text fontSize="sm" color="text.body" fontWeight="medium">
                Módulo de cálculo de metraje y valorización formal con membrete para obra.
              </Text>
            </Tabs.Content>
            <Tabs.Content
              value="instalacion"
              p="4"
              borderRadius="xl"
              bg="bg.section"
              border="1px solid"
              borderColor="border.warm"
              mt="4"
            >
              <Text fontSize="sm" color="text.body" fontWeight="medium">
                Protocolo de instalación técnica y sellado acústico hermético en obra residencial y comercial.
              </Text>
            </Tabs.Content>
          </Tabs.Root>
        </ShowcasePanel>
      </ShowcaseCard>

      {/* 4. Miga de Pan (Breadcrumbs) & Paginación */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6">
        {/* Breadcrumbs */}
        <ShowcaseCard
          title="Breadcrumbs — Miga de Pan Jerárquica"
          description="Navegación contextual con aria-current=&quot;page&quot; en el elemento activo e iconos decorativos."
          badge="Jerarquía Web"
        >
          <ShowcasePanel p={{ base: "4", md: "6" }} borderRadius="card">
            <VStack gap="4" align="stretch">
              <Box as="nav" aria-label="Miga de pan del servicio">
                <Box
                  as="ol"
                  display="flex"
                  flexWrap="wrap"
                  alignItems="center"
                  gap="1.5"
                  listStyleType="none"
                  m="0"
                  p="0"
                >
                  <Box as="li" display="inline-flex" alignItems="center">
                    <Button asChild variant="ghost" size="sm" minH="11" px="2">
                      <a href="#inicio">
                        <Home size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                        <span>Inicio</span>
                      </a>
                    </Button>
                  </Box>

                  <Box as="li" display="inline-flex" alignItems="center" color="text.muted">
                    <ChevronRight size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                  </Box>

                  <Box as="li" display="inline-flex" alignItems="center">
                    <Button asChild variant="ghost" size="sm" minH="11" px="2">
                      <a href="#servicios">Servicios</a>
                    </Button>
                  </Box>

                  <Box as="li" display="inline-flex" alignItems="center" color="text.muted">
                    <ChevronRight size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                  </Box>

                  <Box as="li" display="inline-flex" alignItems="center">
                    <Button asChild variant="ghost" size="sm" minH="11" px="2">
                      <a href="#ventanas">Ventanas Antirruido</a>
                    </Button>
                  </Box>

                  <Box as="li" display="inline-flex" alignItems="center" color="text.muted">
                    <ChevronRight size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                  </Box>

                  <Box as="li" display="inline-flex" alignItems="center">
                    <Box
                      as="span"
                      aria-current="page"
                      minH="11"
                      display="inline-flex"
                      alignItems="center"
                      px="2"
                      fontSize="sm"
                      fontWeight="700"
                      color="text.heading"
                    >
                      Serie 62 Acústica
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Text fontSize="xs" color="text.muted">
                Cumple WCAG 2.2: último elemento con <code>aria-current=&quot;page&quot;</code> y separación clara.
              </Text>
            </VStack>
          </ShowcasePanel>
        </ShowcaseCard>

        {/* Pagination */}
        <ShowcaseCard
          title="Pagination — Paginador de Resultados"
          description="Controles numéricos con target >= 44, foco accesible y aria-label descriptivos en español."
          badge="Listados de Obra"
        >
          <ShowcasePanel p={{ base: "4", md: "6" }} borderRadius="card">
            <VStack gap="4" align="stretch">
              <Box as="nav" aria-label="Paginación de catálogo de presupuestos">
                <HStack gap="2" wrap="wrap" justify="center">
                  <Button
                    variant="outline"
                    aria-label="Página anterior"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    minH="11"
                    minW="11"
                    px="3"
                  >
                    <ChevronLeft size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                  </Button>

                  {[1, 2, 3].map((page) => {
                    const isCurrent = currentPage === page;
                    return (
                      <Button
                        key={page}
                        variant={isCurrent ? "primary" : "outline"}
                        aria-label={`Ir a página ${page}`}
                        aria-current={isCurrent ? "page" : undefined}
                        onClick={() => setCurrentPage(page)}
                        minH="11"
                        minW="11"
                        px="3"
                      >
                        {page}
                      </Button>
                    );
                  })}

                  <Box
                    as="span"
                    aria-hidden="true"
                    minH="11"
                    minW="6"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    color="text.muted"
                    fontSize="sm"
                  >
                    …
                  </Box>

                  <Button
                    variant={currentPage === 8 ? "primary" : "outline"}
                    aria-label="Ir a página 8"
                    aria-current={currentPage === 8 ? "page" : undefined}
                    onClick={() => setCurrentPage(8)}
                    minH="11"
                    minW="11"
                    px="3"
                  >
                    8
                  </Button>

                  <Button
                    variant="outline"
                    aria-label="Página siguiente"
                    disabled={currentPage === 8}
                    onClick={() => setCurrentPage((p) => Math.min(8, p + 1))}
                    minH="11"
                    minW="11"
                    px="3"
                  >
                    <ChevronRight size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                  </Button>
                </HStack>
              </Box>

              <Text fontSize="xs" color="text.muted" textAlign="center">
                Página actual: <strong>{currentPage}</strong> de 8. Todos los pulsadores cumplen área táctil <code>&gt;= 44</code>.
              </Text>
            </VStack>
          </ShowcasePanel>
        </ShowcaseCard>
      </SimpleGrid>

      {/* 5. FloatingActions (WhatsApp & ThemeToggle Homologados) */}
      <ShowcaseCard
        title="FloatingActions — Acciones Flotantes Homologadas"
        description="Componentes globales (widgets/FloatingActions/) con dimensiones simétricas (escala 14 en móvil y 16 en escritorio con icono homologado)."
        badge="Global Widgets"
      >
        <ShowcasePanel p={{ base: "4", md: "8" }} borderRadius="card">
          <HStack justify="space-around" align="center" wrap="wrap" gap={{ base: "6", md: "8" }}>
            <VStack gap="3">
              <FloatingWhatsAppButton />
              <VStack gap="0.5">
                <Text fontSize="xs" fontWeight="bold" color="text.heading">
                  FloatingWhatsApp
                </Text>
                <Text fontSize="xs" color="text.muted">
                  Escala 16 en escritorio · Icono centrado
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
                  Escala 16 en escritorio · Icono centrado
                </Text>
              </VStack>
            </VStack>
          </HStack>
        </ShowcasePanel>
      </ShowcaseCard>
    </ShowcaseStack>
    </DemoLinks>
  );
};
