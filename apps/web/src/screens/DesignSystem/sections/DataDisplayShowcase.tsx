"use client";

import React from "react";
import { Box, Heading, VStack, HStack, Table, Badge, Skeleton, Text } from "@chakra-ui/react";
import { ShowcaseCard, ShowcasePanel, ShowcaseStack } from "../components";
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


const ADMIN_ROWS = [
  { order: 1, name: "Ventanas antirruido", system: "Serie 62", photos: 12, published: true },
  { order: 2, name: "Mamparas de cristal", system: "Sistema Nova", photos: 8, published: true },
  { order: 3, name: "Ventanas acústicas", system: "Acústica", photos: 6, published: false },
  { order: 4, name: "Puertas corredizas", system: "Serie 25", photos: 4, published: true },
];

export const DataDisplayShowcase: React.FC = () => {
  return (
    <ShowcaseStack>
      {/* 1. Tabla administrativa de servicios / proyectos */}
      <ShowcaseCard
        title="Tabla administrativa"
        description="Patrón de `/admin/servicios` y `/admin/proyectos` para gestionar colecciones. Cabecera discreta, filas con línea fina."
      >
        <Box overflowX="auto" borderWidth="1px" borderColor="border.subtle" borderRadius="xl">
          <Table.Root size={{ base: "sm", md: "md" }} minW="35rem">
            <Table.Caption captionSide="bottom" srOnly>
              Servicios publicados y en borrador, con su sistema principal y número de fotos
            </Table.Caption>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader scope="col" whiteSpace="nowrap" aria-sort="ascending">
                  Orden
                </Table.ColumnHeader>
                <Table.ColumnHeader scope="col" whiteSpace="nowrap">
                  Servicio
                </Table.ColumnHeader>
                <Table.ColumnHeader scope="col" whiteSpace="nowrap">
                  Sistema principal
                </Table.ColumnHeader>
                <Table.ColumnHeader scope="col" whiteSpace="nowrap">
                  Fotos
                </Table.ColumnHeader>
                <Table.ColumnHeader scope="col" whiteSpace="nowrap">
                  Estado
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {ADMIN_ROWS.map((row) => (
                <Table.Row key={row.name}>
                  <Table.Cell whiteSpace="nowrap" fontVariantNumeric="tabular-nums">
                    {row.order}
                  </Table.Cell>
                  <Table.Cell whiteSpace="nowrap" fontWeight="medium">
                    {row.name}
                  </Table.Cell>
                  <Table.Cell whiteSpace="nowrap">
                    <Badge variant={"neutral" as never} size="sm">
                      {row.system}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell whiteSpace="nowrap" color="text.muted" fontVariantNumeric="tabular-nums">
                    {row.photos} imágenes
                  </Table.Cell>
                  <Table.Cell whiteSpace="nowrap">
                    {row.published ? (
                      <Badge variant={"success" as never} size="sm">
                        Publicado
                      </Badge>
                    ) : (
                      <Badge variant={"warning" as never} size="sm">
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

      {/* Badges: variantes y estados */}
      <ShowcaseCard
        title="Etiquetas (Badges)"
        description="Pastillas de 28 px con texto 12/600. Usa la variante neutra para catálogo y las semánticas para estado."
      >
        <ShowcaseStack gap="4">
          <ShowcasePanel>
            <Heading as="h3" size="sm" mb="4" color="text.heading">
              Neutras y de marca
            </Heading>
            <HStack gap="2" wrap="wrap">
              <Badge variant={"neutral" as never}>Neutra</Badge>
              <Badge variant={"inkSolid" as never}>Tinta</Badge>
            </HStack>
          </ShowcasePanel>
          <ShowcasePanel>
            <Heading as="h3" size="sm" mb="4" color="text.heading">
              Estados
            </Heading>
            <HStack gap="2" wrap="wrap">
              <Badge variant={"success" as never}>Publicado</Badge>
              <Badge variant={"warning" as never}>Borrador</Badge>
              <Badge variant={"danger" as never}>Error</Badge>
              <Badge variant={"info" as never}>Información</Badge>
            </HStack>
          </ShowcasePanel>
        </ShowcaseStack>
      </ShowcaseCard>

      {/* 2. Ficha técnica (DataList), estado vacío y carga */}
      <ShowcaseCard
        title="Fichas técnicas, estados vacíos y carga"
        description="Metadatos de empresa y de producto, pantalla sin registros y placeholders mientras cargan los datos."
      >
        <ShowcaseStack>
          <ShowcasePanel>
            <Heading as="h3" size="sm" mb="4" color="text.heading" fontFamily="heading">
              Ficha técnica de fabricación
            </Heading>
            <DataListRoot orientation={{ base: "vertical", md: "horizontal" }}>
              <DataListItem label="Razón social" value={companyData.razonSocial} />
              <DataListItem label="RUC" value={companyData.ruc} />
              <DataListItem label="Dirección" value={companyData.direccion} />
              <DataListItem
                label="Contacto"
                value={`${companyData.contactPerson} (${companyData.contactTitle})`}
              />
              <DataListItem label="WhatsApp" value={companyData.whatsappDisplay} />
              <DataListItem
                label="Sistemas certificados"
                value="Sistema Nova, Serie 25, Serie 35, Serie 62, Acústica, PVC abatible"
              />
              <DataListItem label="Vidrios disponibles" value="Crudo, laminado, templado" />
              <DataListItem label="Colores de aluminio" value="Negro, mate, blanco, madera, champagne" />
              <DataListItem label="Norma de seguridad" value="RNE Norma E.040 Vidrio" />
            </DataListRoot>
          </ShowcasePanel>

          <ShowcasePanel>
            <EmptyState
              icon={<Layers size={20} style={{ flexShrink: 0 }} aria-hidden="true" />}
              title="No hay presupuestos pendientes"
              description="Cuando llegue una nueva solicitud de carpintería o cotización, aparecerá aquí."
            />
          </ShowcasePanel>

          <Box role="status" aria-label="Cargando datos de ejemplo">
            <Text fontSize="sm" color="text.muted" mb="3">
              Cargando los datos del catálogo…
            </Text>
            <VStack gap="2" align="stretch">
              <Skeleton h="5" borderRadius="md" />
              <Skeleton h="5" width="80%" borderRadius="md" />
              <Skeleton h="5" width="60%" borderRadius="md" />
            </VStack>
          </Box>
        </ShowcaseStack>
      </ShowcaseCard>

      {/* Hoja de presupuesto (no editar) */}
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
