"use client";

import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Table,
  Badge,
  Card,
  Skeleton,
} from "@chakra-ui/react";
import { EmptyState } from "@/components/ui/empty-state";
import { DataListRoot, DataListItem } from "@/components/ui/data-list";
import { Layers } from "lucide-react";

export const DataDisplayShowcase: React.FC = () => {
  return (
    <VStack gap="8" align="stretch">
      {/* 1. Tablas Administrativas de Servicios / Proyectos */}
      <Card.Root bg="bg.surface" borderColor="border.default" p="6" borderRadius="card">
        <Card.Header pb="4">
          <Card.Title fontSize="xl">Estructura de Tabla Administrativa (Admin Table)</Card.Title>
          <Card.Description>
            Diseño utilizado en `/admin/servicios` y `/admin/proyectos` para gestionar colecciones de Firestore.
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <Box overflowX="auto" borderWidth="1px" borderColor="border.subtle" borderRadius="xl">
            <Table.Root size="md" variant="line">
              <Table.Header bg="surface.container">
                <Table.Row>
                  <Table.ColumnHeader color="text.muted">Orden</Table.ColumnHeader>
                  <Table.ColumnHeader color="text.muted">Servicio</Table.ColumnHeader>
                  <Table.ColumnHeader color="text.muted">Sistema Principal</Table.ColumnHeader>
                  <Table.ColumnHeader color="text.muted">Fotos</Table.ColumnHeader>
                  <Table.ColumnHeader color="text.muted">Estado</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {[
                  { order: 1, name: "Ventanas de Aluminio", system: "Serie 62", photos: 12, published: true },
                  { order: 2, name: "Mamparas de Baño", system: "Templado", photos: 8, published: true },
                  { order: 3, name: "Techos de Policarbonato", system: "Serie 35", photos: 6, published: false },
                ].map((row) => (
                  <Table.Row key={row.name} _hover={{ bg: "bg.subtle" }}>
                    <Table.Cell fontWeight="bold">{row.order}</Table.Cell>
                    <Table.Cell fontWeight="medium">{row.name}</Table.Cell>
                    <Table.Cell>
                      <Badge colorPalette="gray" size="sm">{row.system}</Badge>
                    </Table.Cell>
                    <Table.Cell color="text.muted">{row.photos} imágenes</Table.Cell>
                    <Table.Cell>
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
        </Card.Body>
      </Card.Root>

      {/* Badges: catálogo de variantes y estados */}
      <Card.Root bg="bg.surface" borderColor="border.default" p="6" borderRadius="card">
        <Card.Header pb="4">
          <Card.Title fontSize="xl">Badges</Card.Title>
          <Card.Description>
            Variantes neutras (gray) y estados semánticos para etiquetas de catálogo y tablas.
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <VStack gap="6" align="stretch">
            <Box p="5" bg="surface.container" borderRadius="xl" borderWidth="1px" borderColor="border.subtle">
              <Heading size="sm" mb="4" color="text.heading">Variantes</Heading>
              <HStack gap="3" wrap="wrap">
                <Badge colorPalette="gray" variant="solid">Solid</Badge>
                <Badge colorPalette="gray" variant="subtle">Subtle</Badge>
                <Badge colorPalette="gray" variant="outline">Outline</Badge>
              </HStack>
            </Box>
            <Box p="5" bg="surface.container" borderRadius="xl" borderWidth="1px" borderColor="border.subtle">
              <Heading size="sm" mb="4" color="text.heading">Estados</Heading>
              <HStack gap="3" wrap="wrap">
                <Badge colorPalette="green" variant="subtle">Success</Badge>
                <Badge colorPalette="orange" variant="subtle">Warning</Badge>
                <Badge colorPalette="red" variant="subtle">Error</Badge>
              </HStack>
            </Box>
          </VStack>
        </Card.Body>
      </Card.Root>

      {/* 2. Ficha Técnica (DataList) & EmptyState */}
      <Card.Root bg="bg.surface" borderColor="border.default" p="6" borderRadius="card">
        <Card.Header pb="4">
          <Card.Title fontSize="xl">Fichas Técnicas (DataList) & Estados de Vacío (EmptyState)</Card.Title>
          <Card.Description>
            Componentes especializados para metadatos y pantallas sin registros.
          </Card.Description>
        </Card.Header>
        <Card.Body>
          <VStack gap="8" align="stretch">
            {/* DataList */}
            <Box p="5" bg="surface.container" borderRadius="xl" borderWidth="1px" borderColor="border.subtle">
              <Heading size="sm" mb="4" color="text.heading">Ficha Técnica de Fabricación</Heading>
              <DataListRoot orientation="horizontal">
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
            </Box>

            {/* EmptyState y Skeletons */}
            <Box p="4" borderWidth="1px" borderColor="border.subtle" borderRadius="xl">
              <EmptyState
                icon={<Layers />}
                title="Sin presupuestos pendientes"
                description="Todos los pedidos de carpintería y cotizaciones han sido atendidos."
              />
            </Box>

            {/* Skeletons de Carga */}
            <Box>
              <Text fontSize="xs" fontWeight="semibold" color="text.muted" mb="2">
                PLACEHOLDERS DE CARGA (SKELETONS)
              </Text>
              <VStack gap="2" align="stretch">
                <Skeleton height="20px" borderRadius="md" />
                <Skeleton height="20px" width="80%" borderRadius="md" />
                <Skeleton height="20px" width="60%" borderRadius="md" />
              </VStack>
            </Box>
          </VStack>
        </Card.Body>
      </Card.Root>
    </VStack>
  );
};
