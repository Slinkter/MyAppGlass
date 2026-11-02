"use client";

import React from "react";
import {
  Box,
  Heading,
  VStack,
  HStack,
  Table,
  Badge,
  Skeleton,
} from "@chakra-ui/react";
import { ShowcaseCard, ShowcasePanel, ShowcaseStack, SubsectionLabel } from "../components";
import { EmptyState } from "@/components/ui/empty-state";
import { DataListRoot, DataListItem } from "@/components/ui/data-list";
import { Layers } from "lucide-react";

export const DataDisplayShowcase: React.FC = () => {
  return (
    <ShowcaseStack>
      {/* 1. Tablas Administrativas de Servicios / Proyectos */}
      <ShowcaseCard
        title="Estructura de Tabla Administrativa (Admin Table)"
        description="Diseño utilizado en `/admin/servicios` y `/admin/proyectos` para gestionar colecciones de Firestore."
      >
          <Box overflowX="auto" borderWidth="1px" borderColor="border.subtle" borderRadius="xl">
            <Table.Root size={{ base: "sm", md: "md" }} variant="line" minW="560px">
              <Table.Header bg="surface.container">
                <Table.Row>
                  <Table.ColumnHeader whiteSpace="nowrap" color="text.muted">Orden</Table.ColumnHeader>
                  <Table.ColumnHeader whiteSpace="nowrap" color="text.muted">Servicio</Table.ColumnHeader>
                  <Table.ColumnHeader whiteSpace="nowrap" color="text.muted">Sistema Principal</Table.ColumnHeader>
                  <Table.ColumnHeader whiteSpace="nowrap" color="text.muted">Fotos</Table.ColumnHeader>
                  <Table.ColumnHeader whiteSpace="nowrap" color="text.muted">Estado</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {[
                  { order: 1, name: "Ventanas de Aluminio", system: "Serie 62", photos: 12, published: true },
                  { order: 2, name: "Mamparas de Baño", system: "Sistema Nova", photos: 8, published: true },
                  { order: 3, name: "Techos de Policarbonato", system: "Serie 35", photos: 6, published: false },
                ].map((row) => (
                  <Table.Row key={row.name} _hover={{ bg: "bg.subtle" }}>
                    <Table.Cell whiteSpace="nowrap" fontWeight="bold">{row.order}</Table.Cell>
                    <Table.Cell whiteSpace="nowrap" fontWeight="medium">{row.name}</Table.Cell>
                    <Table.Cell whiteSpace="nowrap">
                      <Badge colorPalette="gray" size="sm">{row.system}</Badge>
                    </Table.Cell>
                    <Table.Cell whiteSpace="nowrap" color="text.muted">{row.photos} imágenes</Table.Cell>
                    <Table.Cell whiteSpace="nowrap">
                      {row.published ? (
                        <Badge colorPalette="green" size="sm">Publicado</Badge>
                      ) : (
                        <Badge colorPalette="orange" size="sm">Borrador</Badge>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </ShowcaseCard>

      {/* Badges: catálogo de variantes y estados */}
      <ShowcaseCard
        title="Badges"
        description="Variantes neutras (gray) y estados semánticos para etiquetas de catálogo y tablas."
      >
          <ShowcaseStack gap="4">
            <ShowcasePanel bg="surface.container">
              <Heading size="sm" mb="4" color="text.heading">Variantes</Heading>
              <HStack gap="2" wrap="wrap">
                <Badge colorPalette="gray" variant="solid">Solid</Badge>
                <Badge colorPalette="gray" variant="subtle">Subtle</Badge>
                <Badge colorPalette="gray" variant="outline">Outline</Badge>
              </HStack>
            </ShowcasePanel>
            <ShowcasePanel bg="surface.container">
              <Heading size="sm" mb="4" color="text.heading">Estados</Heading>
              <HStack gap="2" wrap="wrap">
                <Badge colorPalette="green" variant="subtle">Success</Badge>
                <Badge colorPalette="orange" variant="subtle">Warning</Badge>
                <Badge colorPalette="red" variant="subtle">Error</Badge>
              </HStack>
            </ShowcasePanel>
          </ShowcaseStack>
        </ShowcaseCard>

      {/* 2. Ficha Técnica (DataList) & EmptyState */}
      <ShowcaseCard
        title="Fichas Técnicas (DataList) & Estados de Vacío (EmptyState)"
        description="Componentes especializados para metadatos y pantallas sin registros."
      >
          <ShowcaseStack>
            {/* DataList */}
            <ShowcasePanel bg="surface.container">
              <Heading size="sm" mb="4" color="text.heading">Ficha Técnica de Fabricación</Heading>
              <DataListRoot orientation={{ base: "vertical", md: "horizontal" }}>
                <DataListItem
                  label="Razón Social:"
                  value="GLASS & ALUMINUM COMPANY S.A.C."
                />
                <DataListItem
                  label="RUC:"
                  value="20606432870"
                />
                <DataListItem
                  label="Sistemas Certificados:"
                  value="Sistema Nova, Serie 25, Serie 35, Serie 62"
                />
                <DataListItem
                  label="Norma de Seguridad:"
                  value="RNE Norma E.040 Vidrio"
                />
              </DataListRoot>
            </ShowcasePanel>

            {/* EmptyState y Skeletons */}
            <ShowcasePanel>
              <EmptyState
                icon={<Layers style={{ flexShrink: 0 }} />}
                title="Sin presupuestos pendientes"
                description="Todos los pedidos de carpintería y cotizaciones han sido atendidos."
              />
            </ShowcasePanel>

            {/* Skeletons de Carga */}
            <Box>
              <SubsectionLabel mb="2">
                Placeholders de carga (Skeletons)
              </SubsectionLabel>
              <VStack gap="2" align="stretch">
                <Skeleton height="20px" borderRadius="md" />
                <Skeleton height="20px" width="80%" borderRadius="md" />
                <Skeleton height="20px" width="60%" borderRadius="md" />
              </VStack>
            </Box>
          </ShowcaseStack>
        </ShowcaseCard>
    </ShowcaseStack>
  );
};
