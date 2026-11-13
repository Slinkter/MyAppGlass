"use client";

import React from "react";
import { Box, HStack, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import MediaCard from "@/shared/components/Card/MediaCard";
import AuraHeader from "@/shared/components/aura/AuraHeader";
import { CopyButton } from "@/shared/components/CopyButton";
import { CloseButton } from "@/shared/ui/close-button";
import { Alert } from "@/shared/ui/alert";
import {
  FileUploadRoot,
  FileUploadDropzone,
  FileUploadList,
} from "@/shared/ui/file-upload";
import {
  ScrollAreaRoot,
  ScrollAreaViewport,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
} from "@/shared/ui/scroll-area";
import { ShowcaseCard, ShowcaseStack, SubsectionLabel } from "../components";

const BADGES = [
  { key: "neutral", label: "Neutra" },
  { key: "ink", label: "Tinta suave" },
  { key: "inkSolid", label: "Tinta" },
  { key: "success", label: "Publicado" },
  { key: "warning", label: "Borrador" },
  { key: "danger", label: "Error" },
  { key: "info", label: "Información" },
] as const;

const ALERTS = [
  { key: "success", status: "success", title: "Cotización registrada", body: "Guardamos el presupuesto y enviamos una copia al cliente." },
  { key: "info", status: "info", title: "Aislamiento acústico", body: "La Serie 62 ofrece aislamiento acústico alto para vanos residenciales." },
  { key: "warning", status: "warning", title: "Plazo de entrega", body: "Los acabados champagne y madera tardan 5 días hábiles." },
  { key: "danger", status: "error", title: "Revise la medida", body: "La medida del vano debe ser mayor a 0.50 m." },
] as const;

const SCROLL_ITEMS = [
  "Medición del vano en obra",
  "Elección de sistema y vidrio",
  "Presupuesto con membrete",
  "Fabricación de perfiles",
  "Instalación y sellado",
  "Entrega y garantía",
  "Mantenimiento anual",
  "Atención posventa",
];

export const ComponentsExtraShowcase: React.FC = () => (
  <ShowcaseStack>
    {/* Estado: Badge y Alert */}
    <ShowcaseCard
      title="Estados: Badge y Alert"
      description="Variantes de estado del tema, con texto de contraste verificado. Los badges son solo informativos."
    >
      <VStack align="stretch" gap="6">
        <Box>
          <SubsectionLabel mb="3">Badge</SubsectionLabel>
          <HStack gap="3" wrap="wrap">
            {BADGES.map((b) => (
              <Badge key={b.key} variant={b.key as never}>{b.label}</Badge>
            ))}
          </HStack>
        </Box>
        <Box>
          <SubsectionLabel mb="3">Alert</SubsectionLabel>
          <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
            {ALERTS.map((a) => (
              <Alert key={a.key} variant={a.key as never} status={a.status} title={a.title}>
                {a.body}
              </Alert>
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </ShowcaseCard>

    {/* MediaCard */}
    <ShowcaseCard
      title="MediaCard"
      description="Tarjeta con foto protagonista y leyenda de vidrio claro. Base de la tarjeta de servicio y de proyecto."
    >
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={{ base: "4", md: "6" }}>
        <MediaCard
          image="/images/services-products-01.Ventanas-nova-a10.webp"
          imageAlt="Ventana corrediza de aluminio y vidrio"
          badge="Ventanas"
          title="Ventanas Nova"
          description="Sistema corredizo para vivienda y oficina"
          actionIcon={ArrowUpRight}
          rootProps={{ role: "group", tabIndex: 0, "aria-label": "Ventanas Nova" }}
        />
        <MediaCard
          image="/images/services-products-02.Mampara-save-mampara01.webp"
          imageAlt="Mampara de vidrio templado"
          badge="Mamparas"
          title="Mamparas"
          description="Vidrio templado a medida"
          actionIcon={ArrowUpRight}
          rootProps={{ role: "group", tabIndex: 0, "aria-label": "Mamparas" }}
        />
        <MediaCard
          image="/images/services-products-03.Ducha-ducha01.webp"
          imageAlt="Cabina de ducha con vidrio templado"
          badge="Duchas"
          title="Duchas"
          description="Cabinas y puertas de baño"
          actionIcon={ArrowUpRight}
          rootProps={{ role: "group", tabIndex: 0, "aria-label": "Duchas" }}
        />
      </SimpleGrid>
    </ShowcaseCard>

    {/* AuraHeader */}
    <ShowcaseCard
      title="AuraHeader"
      description="Encabezado estándar de las páginas de Proyectos y Servicios: sobretítulo, título en Lora 700 y descripción."
    >
      <VStack align="stretch" gap="8">
        <AuraHeader
          overline="Servicios"
          title="Sistemas de ventanas"
          description="Seis sistemas oficiales para cada vano, con vidrio crudo, laminado o templado."
          headingAs="h3"
          mb="0"
        />
        <AuraHeader
          centered
          overline="Proyectos"
          title="Obras entregadas"
          description="Viviendas y proyectos comerciales en Lima."
          headingAs="h3"
          mb="0"
        />
      </VStack>
    </ShowcaseCard>

    {/* CopyButton y CloseButton */}
    <ShowcaseCard
      title="CopyButton y CloseButton"
      description="Botones de ícono de 44 px. CopyButton copia un valor y confirma con un aviso; CloseButton cierra paneles y diálogos."
    >
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="6">
        <Box>
          <SubsectionLabel mb="3">CopyButton</SubsectionLabel>
          <HStack gap="2">
            <Text fontFamily="mono" fontSize="sm" color="text.body">GYA-2026-0001</Text>
            <CopyButton value="GYA-2026-0001" label="código de presupuesto" />
          </HStack>
        </Box>
        <Box>
          <SubsectionLabel mb="3">CloseButton</SubsectionLabel>
          <HStack gap="2">
            <CloseButton aria-label="Cerrar panel de ejemplo" />
            <Text fontSize="sm" color="text.muted">Ícono X con etiqueta accesible</Text>
          </HStack>
        </Box>
      </SimpleGrid>
    </ShowcaseCard>

    {/* FileUpload y ScrollArea */}
    <SimpleGrid columns={{ base: 1, lg: 2 }} gap={{ base: "5", md: "8" }}>
      <ShowcaseCard
        title="FileUpload"
        description="Zona de carga para fotos del vano. Arrastre archivos o pulse para elegirlos."
      >
        <FileUploadRoot maxFiles={3} accept={["image/*"]}>
          <FileUploadDropzone
            label="Arrastre las fotos del vano aquí"
            description="Imágenes de hasta 5 MB"
            minH="32"
          />
          <FileUploadList showSize clearable />
        </FileUploadRoot>
      </ShowcaseCard>

      <ShowcaseCard
        title="ScrollArea"
        description="Carrusel horizontal con barra personalizada, solo para tarjetas en fila. Nunca se usa para scroll vertical dentro de la página."
      >
        {/* Solo horizontal: carrusel de tarjetas; el scroll vertical es el de la página. */}
        <ScrollAreaRoot borderWidth="1px" borderColor="border.default" borderRadius="card">
          <ScrollAreaViewport>
            <ScrollAreaContent p="4">
              <HStack align="stretch" gap="3" w="max-content">
                {SCROLL_ITEMS.map((item, i) => (
                  <Box key={item} w="44" flexShrink={0} p="3" borderWidth="1px" borderColor="border.subtle" borderRadius="lg" bg="bg.surface">
                    <Text fontSize="xs" fontWeight="700" color="accent.ink">{String(i + 1).padStart(2, "0")}</Text>
                    <Text fontSize="sm" color="text.body" mt="1">{item}</Text>
                  </Box>
                ))}
              </HStack>
            </ScrollAreaContent>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar orientation="horizontal">
            <ScrollAreaThumb />
          </ScrollAreaScrollbar>
        </ScrollAreaRoot>
      </ShowcaseCard>
    </SimpleGrid>
  </ShowcaseStack>
);
