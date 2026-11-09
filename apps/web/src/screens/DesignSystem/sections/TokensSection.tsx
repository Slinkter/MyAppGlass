"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Badge,
  Separator,
  Tabs,
} from "@chakra-ui/react";
import { Copy } from "lucide-react";
import { RESPONSIVE_GRIDS } from "@/shared/constants/layout";
import { ShowcaseCard, ShowcaseStack, SubsectionLabel } from "../components";

/** Variantes `studio` del tema (no tipadas en Chakra). */
const STUDIO = "studio" as never;
const STUDIO_INK = "studioInk" as never;
const STUDIO_SUCCESS = "studioSuccess" as never;

const BRAND_TOKENS = [
  { token: "ink", hex: "#111111", label: "Color de marca: texto, logotipo y títulos" },
  { token: "ink-soft", hex: "#4A4A4A", label: "Etiquetas y texto secundario" },
  { token: "brand-red", hex: "#D62828", label: "Solo la palabra PRESUPUESTO" },
  { token: "logo-coral", hex: "#FF5A5A", label: "Solo el isotipo" },
  { token: "paper-warm", hex: "#F7F6F3", label: "Papel cálido: fondos y fichas" },
  { token: "line", hex: "#E6E3DE", label: "Separadores suaves" },
  { token: "line-strong", hex: "#D9D6D0", label: "Bordes de tarjetas" },
  { token: "brand-navy", hex: "#002060", label: "Retirado: acento histórico, no es color de marca" },
] as const;

const SEMANTIC_TOKENS = [
  { token: "bg.warm", label: "Papel cálido v2" },
  { token: "bg.tintNavy", label: "Tinte frío v2" },
  { token: "accent.navy", label: "Azul de foco y enlaces" },
  { token: "brand.navy", label: "Acento histórico (retirado)" },
  { token: "brand.quoteRed", label: "Rojo presupuesto (#D62828)" },
  { token: "border.warm", label: "Línea cálida v2" },
  { token: "border.warmStrong", label: "Borde cálido fuerte v2" },
  { token: "bg.page", label: "Fondo general" },
  { token: "bg.surface", label: "Fondo de tarjeta" },
  { token: "bg.section", label: "Fondo de sección" },
  { token: "surface.container", label: "Contenedor" },
  { token: "brand.primary", label: "Acento principal" },
  { token: "primary.900", label: "Gris 900" },
  { token: "primary.700", label: "Gris 700" },
  { token: "brand.whatsapp", label: "WhatsApp" },
  { token: "brand.red", label: "Rojo GYA" },
  { token: "status.info", label: "Información" },
  { token: "status.success", label: "Éxito" },
  { token: "status.danger", label: "Peligro" },
  { token: "border.subtle", label: "Borde tenue" },
  { token: "border.default", label: "Borde base" },
  { token: "border.strong", label: "Borde fuerte" },
  { token: "text.heading", label: "Texto de títulos" },
  { token: "text.body", label: "Texto de cuerpo" },
  { token: "text.muted", label: "Texto apagado" },
  { token: "ring.primary", label: "Anillo de foco" },
] as const;

export const TokensSection: React.FC = () => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      }
      setCopiedToken(text);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setCopiedToken(null), 2000);
    } catch {
      // Ignorar fallo en contextos no seguros
    }
  };

  const onSwatchKey = (e: React.KeyboardEvent, text: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      void copyToClipboard(text);
    }
  };

  return (
    <ShowcaseStack>
      {/* 1. Tipografía oficial Lora + Inter */}
      <ShowcaseCard
        title="Tipografía oficial (Lora + Inter)"
        description="Lora (700 y 600) para títulos, nombre de empresa y montos. Inter (400 a 700) para texto, tablas, etiquetas e interfaz."
      >
        <VStack gap="5" align="stretch">
          <Box>
            <Heading size="4xl" color="text.heading" wordBreak="break-word">
              Heading 4XL · Lora (2.25rem / 36px)
            </Heading>
            <Text fontSize="xs" color="text.muted">Títulos principales de la portada</Text>
          </Box>
          <Box>
            <Heading size="3xl" color="text.heading" wordBreak="break-word">
              Heading 3XL · Lora (1.875rem / 30px)
            </Heading>
            <Text fontSize="xs" color="text.muted">Títulos de secciones principales</Text>
          </Box>
          <Box>
            <Heading size="2xl" color="text.heading" wordBreak="break-word">
              Heading 2XL · Lora (1.5rem / 24px)
            </Heading>
            <Text fontSize="xs" color="text.muted">Encabezados de módulos y catálogos</Text>
          </Box>
          <Box>
            <Heading size="xl" color="text.heading" wordBreak="break-word">
              Heading XL · Lora (1.25rem / 20px)
            </Heading>
            <Text fontSize="xs" color="text.muted">Títulos de tarjetas y diálogos</Text>
          </Box>
          <Box>
            <Heading size="md" color="text.heading" wordBreak="break-word">
              Heading MD · Lora (1rem / 16px)
            </Heading>
            <Text fontSize="xs" color="text.muted">Subtítulos y encabezados de tablas</Text>
          </Box>
          <Box>
            <Text fontFamily="heading" fontWeight="semibold" fontSize="xl" color="text.heading" fontVariantNumeric="tabular-nums">
              Nombre de empresa y montos · Lora 600
            </Text>
            <Text fontSize="xs" color="text.muted">Nombre de empresa en cabeceras y cifras destacadas, por ejemplo S/ 1,250.00</Text>
          </Box>
          <Separator borderColor="border.subtle" />
          <Box>
            <Text fontSize="md" color="text.body">
              <strong>Texto de cuerpo Inter (md / 16px):</strong> Carpintería de vidrio y aluminio de alta precisión para viviendas y proyectos comerciales en La Molina y Lima.
            </Text>
            <Text fontSize="sm" color="text.muted" mt="2">
              <strong>Texto secundario Inter (sm / 14px):</strong> Fichas técnicas, notas de presupuesto y especificaciones de hermeticidad antirruido.
            </Text>
          </Box>
        </VStack>
      </ShowcaseCard>

      {/* 1B. Paleta de marca */}
      <ShowcaseCard
        title="Paleta de marca (tokens base)"
        description="Marca en negro #111111. El azul aparece solo en foco y enlaces. Haz clic en una muestra para copiar su valor."
      >
        <SimpleGrid columns={RESPONSIVE_GRIDS.tokens} gap={{ base: "3", md: "4" }}>
          {BRAND_TOKENS.map((item) => (
            <Box
              key={item.token}
              role="button"
              tabIndex={0}
              aria-label={`Copiar ${item.token} ${item.hex}`}
              minW={0}
              p="3"
              borderRadius="lg"
              borderWidth="1px"
              borderColor="border.subtle"
              cursor="pointer"
              _hover={{ borderColor: "text.heading", transform: "translateY(-2px)" }}
              _focusVisible={{ outline: "2px solid", outlineColor: "ring.primary", outlineOffset: "2px" }}
              transition="transform 0.2s ease, border-color 0.2s ease"
              onClick={() => copyToClipboard(item.hex)}
              onKeyDown={(e) => onSwatchKey(e, item.hex)}
            >
              <Box
                h="40px"
                borderRadius="md"
                style={{ backgroundColor: item.hex }}
                mb="2"
                borderWidth="1px"
                borderColor="border.subtle"
                aria-hidden="true"
              />
              <Text fontSize="xs" fontWeight="bold" color="text.heading">
                {item.token} · {item.hex}
              </Text>
              <HStack justify="space-between" mt="1" gap="2" minW={0}>
                <Text fontSize="xs" color="text.muted" truncate minW={0}>
                  {item.label}
                </Text>
                <Box color="text.muted">
                  <Copy size={12} style={{ flexShrink: 0 }} aria-hidden="true" />
                </Box>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </ShowcaseCard>

      {/* 2. Catálogo oficial (AGENTS.md) */}
      <ShowcaseCard
        title="Catálogo oficial de sistemas y vidrios"
        description="Definiciones canónicas que no deben alterarse en ninguna pantalla."
      >
        <VStack gap="6" align="stretch">
          <Box>
            <SubsectionLabel mb="3">Los 6 sistemas oficiales de ventanas</SubsectionLabel>
            <HStack gap="3" wrap="wrap">
              {["Sistema Nova", "Serie 25", "Serie 35", "Serie 62", "Acústica", "PVC abatible"].map((sys) => (
                <Badge key={sys} variant={STUDIO} px="3" py="1.5" borderRadius="full" fontSize="xs">
                  {sys}
                </Badge>
              ))}
            </HStack>
          </Box>

          <Separator borderColor="border.subtle" />

          <Box>
            <SubsectionLabel mb="3">Los 3 tipos de vidrio (sin sufijo de grosor)</SubsectionLabel>
            <HStack gap="3" wrap="wrap">
              {["Crudo", "Laminado", "Templado"].map((glass) => (
                <Badge key={glass} variant={STUDIO_INK} px="3" py="1.5" borderRadius="full" fontSize="xs">
                  {glass}
                </Badge>
              ))}
            </HStack>
          </Box>

          <Separator borderColor="border.subtle" />

          <Box>
            <SubsectionLabel mb="3">Acabados de aluminio reglamentarios</SubsectionLabel>
            <HStack gap="2" wrap="wrap">
              {["Negro", "Mate", "Blanco", "Madera", "Champagne"].map((color) => (
                <Badge key={color} variant={STUDIO} px="3" py="1" borderRadius="md">
                  {color}
                </Badge>
              ))}
            </HStack>
          </Box>
        </VStack>
      </ShowcaseCard>

      {/* 3. Tokens semánticos */}
      <ShowcaseCard
        title="Tokens semánticos de color"
        description="Variables vivas del tema. Haz clic en cualquiera para copiar el nombre del token."
      >
        <SimpleGrid columns={RESPONSIVE_GRIDS.tokens} gap={{ base: "3", md: "4" }}>
          {SEMANTIC_TOKENS.map((item) => (
            <Box
              key={item.token}
              role="button"
              tabIndex={0}
              aria-label={`Copiar token ${item.token}`}
              minW={0}
              p="3"
              borderRadius="lg"
              borderWidth="1px"
              borderColor="border.subtle"
              cursor="pointer"
              _hover={{ borderColor: "accent.navy", transform: "translateY(-2px)" }}
              _focusVisible={{ outline: "2px solid", outlineColor: "ring.primary", outlineOffset: "2px" }}
              transition="transform 0.2s ease, border-color 0.2s ease"
              onClick={() => copyToClipboard(item.token)}
              onKeyDown={(e) => onSwatchKey(e, item.token)}
            >
              <Box
                h="40px"
                borderRadius="md"
                bg={item.token}
                mb="2"
                borderWidth="1px"
                borderColor="border.subtle"
                aria-hidden="true"
              />
              <Text fontSize="xs" fontWeight="bold" color="text.heading">{item.label}</Text>
              <HStack justify="space-between" mt="1" gap="2" minW={0}>
                <Text fontSize="xs" color="text.muted" truncate minW={0}>{item.token}</Text>
                {copiedToken === item.token ? (
                  <Badge variant={STUDIO_SUCCESS} size="xs">Copiado</Badge>
                ) : (
                  <Box color="text.muted">
                    <Copy size={12} style={{ flexShrink: 0 }} aria-hidden="true" />
                  </Box>
                )}
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </ShowcaseCard>

      {/* 4. Ejemplo de pestañas */}
      <ShowcaseCard
        title="Ejemplo de pestañas (Tabs)"
        description="Tabs.Root con variante line para alternar contenido relacionado."
      >
        <Tabs.Root defaultValue="texto" variant="line" size="sm">
          <Tabs.List mb="4" borderBottomWidth="1px" borderColor="border.default">
            <Tabs.Trigger value="texto" minH="11">Texto</Tabs.Trigger>
            <Tabs.Trigger value="superficie" minH="11">Superficies</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="texto">
            <Text fontSize="sm" color="text.body">
              Títulos con <strong>text.heading</strong> y párrafos con <strong>text.body</strong>.
            </Text>
          </Tabs.Content>
          <Tabs.Content value="superficie">
            <Text fontSize="sm" color="text.muted">
              Superficies base: <strong>bg.page</strong>, <strong>bg.section</strong> y <strong>surface.container</strong>.
            </Text>
          </Tabs.Content>
        </Tabs.Root>
      </ShowcaseCard>
    </ShowcaseStack>
  );
};
