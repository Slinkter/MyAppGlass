"use client";

import React from "react";
import {
  Box,
  Heading,
  VStack,
  HStack,
  Table,
  Badge as ChakraBadge,
  Skeleton,
} from "@chakra-ui/react";
import { ShowcaseCard, ShowcasePanel, ShowcaseStack, SubsectionLabel } from "../components";
import { EmptyState } from "@/components/ui/empty-state";
import { DataListRoot, DataListItem } from "@/components/ui/data-list";
import { companyData } from "@/shared/config/company-data";
import { Layers } from "lucide-react";
import { QuoteSheet } from "@/screens/Presupuesto/presupuesto/QuoteSheet";
import { summarizeQuote } from "@/features/presupuesto/utils/quoteSummary";

/** Datos de EJEMPLO (no son de un cliente real) para mostrar la hoja de presupuesto. */
const SAMPLE_QUOTE = summarizeQuote([
  {
    id: "demo-1",
    ambiente: "Dormitorio",
    systemType: "ventana_nova",
    width: 1.2,
    height: 1.5,
    glassType: "8mm_laminado",
    aluminumColor: "negro_mate",
    difficulty: "primer_piso",
    includeInstallation: true,
  },
]);
const SAMPLE_CUSTOMER = {
  fullName: "Cliente de ejemplo",
  dniRuc: "00000000",
  email: "ejemplo@correo.com",
  phone: "999 999 999",
  address: "La Molina, Lima",
  district: "La Molina",
};

type BadgeVariant =
  | "solid"
  | "subtle"
  | "outline"
  | "surface"
  | "plain"
  | "neutral"
  | "navy"
  | "navySolid"
  | "success"
  | "warning"
  | "danger"
  | "info";

interface BadgeProps extends Omit<React.ComponentProps<typeof ChakraBadge>, "variant"> {
  variant?: BadgeVariant;
}

const Badge: React.FC<BadgeProps> = ({ variant, ...rest }) => (
  <ChakraBadge {...rest} variant={variant as React.ComponentProps<typeof ChakraBadge>["variant"]} />
);

export const DataDisplayShowcase: React.FC = () => {
  return (
    <ShowcaseStack>
      {/* 1. Tablas Administrativas de Servicios / Proyectos */}
      <ShowcaseCard
        title="Estructura de Tabla Administrativa (Admin Table)"
        description="Diseño utilizado en `/admin/servicios` y `/admin/proyectos` para gestionar colecciones de Firestore."
      >
        <Box overflowX="auto" borderWidth="1px" borderColor="border.subtle" borderRadius="xl">
          <Table.Root size={{ base: "sm", md: "md" }} variant="line" minW="35rem">
            <Table.Header bg="surface.container">
              <Table.Row>
                <Table.ColumnHeader scope="col" whiteSpace="nowrap" color="text.muted" aria-sort="ascending">
                  Orden
                </Table.ColumnHeader>
                <Table.ColumnHeader scope="col" whiteSpace="nowrap" color="text.muted">
                  Servicio
                </Table.ColumnHeader>
                <Table.ColumnHeader scope="col" whiteSpace="nowrap" color="text.muted">
                  Sistema Principal
                </Table.ColumnHeader>
                <Table.ColumnHeader scope="col" whiteSpace="nowrap" color="text.muted">
                  Fotos
                </Table.ColumnHeader>
                <Table.ColumnHeader scope="col" whiteSpace="nowrap" color="text.muted">
                  Estado
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {[
                { order: 1, name: "Ventanas antirruido", system: "Serie 62", photos: 12, published: true },
                { order: 2, name: "Mamparas de cristal", system: "Sistema Nova", photos: 8, published: true },
                { order: 3, name: "Ventanas acústicas", system: "Acústica", photos: 6, published: false },
                { order: 4, name: "Puertas corredizas", system: "Serie 25", photos: 4, published: true },
              ].map((row) => (
                <Table.Row key={row.name}>
                  <Table.Cell whiteSpace="nowrap" fontWeight="bold" fontVariantNumeric="tabular-nums">
                    {row.order}
                  </Table.Cell>
                  <Table.Cell whiteSpace="nowrap" fontWeight="medium">
                    {row.name}
                  </Table.Cell>
                  <Table.Cell whiteSpace="nowrap">
                    <Badge variant="navy" size="sm">
                      {row.system}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell whiteSpace="nowrap" color="text.muted" fontVariantNumeric="tabular-nums">
                    {row.photos} imágenes
                  </Table.Cell>
                  <Table.Cell whiteSpace="nowrap">
                    {row.published ? (
                      <Badge variant="success" size="sm">
                        Publicado
                      </Badge>
                    ) : (
                      <Badge variant="warning" size="sm">
                        Borrador
                      </Badge>
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
            <Heading as="h3" size="sm" mb="4" color="text.heading">
              Variantes de Marca
            </Heading>
            <HStack gap="2" wrap="wrap">
              <Badge variant="navy">Navy</Badge>
              <Badge variant="navySolid">Navy Solid</Badge>
              <Badge variant="neutral">Neutral</Badge>
            </HStack>
          </ShowcasePanel>
          <ShowcasePanel bg="surface.container">
            <Heading as="h3" size="sm" mb="4" color="text.heading">
              Estados Semánticos
            </Heading>
            <HStack gap="2" wrap="wrap">
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="danger">Danger</Badge>
              <Badge variant="info">Info</Badge>
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
            <Heading as="h3" size="sm" mb="4" color="text.heading">
              Ficha Técnica de Fabricación
            </Heading>
            <DataListRoot orientation={{ base: "vertical", md: "horizontal" }}>
              <DataListItem
                label="Razón Social:"
                value={companyData.razonSocial}
              />
              <DataListItem
                label="RUC:"
                value={companyData.ruc}
              />
              <DataListItem
                label="Dirección:"
                value={companyData.direccion}
              />
              <DataListItem
                label="Contacto:"
                value={`${companyData.contactPerson} (${companyData.contactTitle})`}
              />
              <DataListItem
                label="WhatsApp:"
                value={companyData.whatsappDisplay}
              />
              <DataListItem
                label="Sistemas Certificados:"
                value="Sistema Nova, Serie 25, Serie 35, Serie 62, Acústica, PVC abatible"
              />
              <DataListItem
                label="Vidrios Disponibles:"
                value="Crudo, Laminado, Templado"
              />
              <DataListItem
                label="Colores de Aluminio:"
                value="Negro, Mate, Blanco, Madera, Champagne"
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
              icon={<Layers size={20} style={{ flexShrink: 0 }} aria-hidden="true" />}
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
              <Skeleton h="5" borderRadius="md" />
              <Skeleton h="5" width="80%" borderRadius="md" />
              <Skeleton h="5" width="60%" borderRadius="md" />
            </VStack>
          </Box>
        </ShowcaseStack>
      </ShowcaseCard>
      {/* Hoja de presupuesto */}
      <ShowcaseCard
        title="Hoja de presupuesto (concepto C1 renovado)"
        description="Documento en papel claro: membrete con «PRESUPUESTO» en rojo serif, grupos con tinte, cifras tabulares y totales que se apilan en celular. Datos de ejemplo."
        badge="v2"
      >
        <QuoteSheet customer={SAMPLE_CUSTOMER} quote={SAMPLE_QUOTE} formattedDate="09/11/2026" quoteNumber="GYA-2026-EJEMPLO" />
      </ShowcaseCard>
    </ShowcaseStack>
  );
};
