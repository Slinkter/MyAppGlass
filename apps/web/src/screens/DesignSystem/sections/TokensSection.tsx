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

  return (
    <ShowcaseStack>
      {/* 1. Jerarquía Tipográfica Source Serif 4 + Inter */}
      <ShowcaseCard
        title="Tipografía Oficial (Source Serif 4 + Inter)"
        description="Source Serif 4 (700/600) para títulos, nombre de empresa y montos; Inter (400–700) para cuerpo, tablas, etiquetas e interfaz."
      >
          <VStack gap="5" align="stretch">
            <Box>
              <Heading size="4xl" color="text.heading" wordBreak="break-word">Heading 4XL · Source Serif 4 (2.25rem / 36px)</Heading>
              <Text fontSize="xs" color="text.muted">Usado en Títulos Hero de la portada y cabeceras principales</Text>
            </Box>
            <Box>
              <Heading size="3xl" color="text.heading" wordBreak="break-word">Heading 3XL · Source Serif 4 (1.875rem / 30px)</Heading>
              <Text fontSize="xs" color="text.muted">Usado en Títulos de secciones principales</Text>
            </Box>
            <Box>
              <Heading size="2xl" color="text.heading" wordBreak="break-word">Heading 2XL · Source Serif 4 (1.5rem / 24px)</Heading>
              <Text fontSize="xs" color="text.muted">Usado en Encabezados de módulos y catálogos</Text>
            </Box>
            <Box>
              <Heading size="xl" color="text.heading" wordBreak="break-word">Heading XL · Source Serif 4 (1.25rem / 20px)</Heading>
              <Text fontSize="xs" color="text.muted">Usado en Títulos de tarjetas y modales</Text>
            </Box>
            <Box>
              <Heading size="md" color="text.heading" wordBreak="break-word">Heading MD · Source Serif 4 (1rem / 16px)</Heading>
              <Text fontSize="xs" color="text.muted">Subtítulos técnicos y encabezados de tablas</Text>
            </Box>
            <Separator borderColor="border.subtle" />
            <Box>
              <Text fontSize="md" color="text.body">
                <strong>Texto de Cuerpo Inter (md / 16px):</strong> Carpintería de vidrio y aluminio de alta precisión para residencias y proyectos comerciales en La Molina y Lima.
              </Text>
              <Text fontSize="sm" color="text.muted" mt="2">
                <strong>Texto Secundario Inter (sm / 14px):</strong> Fichas técnicas, leyendas de cotización y especificaciones de hermeticidad antirruido.
              </Text>
            </Box>
          </VStack>
        </ShowcaseCard>

      {/* 1B. Paleta de Marca v2 (DESIGN-SYSTEM.md §2.2) */}
      <ShowcaseCard
        title="Paleta de Marca v2 (Tokens Base)"
        description="Colores canónicos de marca compartidos entre la web y el presupuesto impreso. Haz clic para copiar el valor."
      >
        <SimpleGrid columns={RESPONSIVE_GRIDS.tokens} gap={{ base: "3", md: "4" }}>
          {[
            { token: "ink", hex: "#111111", label: "Todo el texto principal" },
            { token: "ink-soft", hex: "#4A4A4A", label: "Etiquetas y secundario" },
            { token: "brand-navy", hex: "#002060", label: "Empresa, títulos y acentos" },
            { token: "brand-red", hex: "#D62828", label: "Solo palabra PRESUPUESTO" },
            { token: "logo-coral", hex: "#FF5A5A", label: "Exclusivo del isotipo" },
            { token: "tint-navy", hex: "#F3F5F9", label: "Bloques destacados y totales" },
            { token: "paper-warm", hex: "#F7F6F3", label: "Fondos cálidos y fichas" },
            { token: "line", hex: "#E6E3DE", label: "Separadores suaves" },
            { token: "line-strong", hex: "#D9D6D0", label: "Bordes de tarjetas" },
          ].map((item) => (
            <Box
              key={item.token}
              minW={0}
              p="3"
              borderRadius="lg"
              borderWidth="1px"
              borderColor="border.subtle"
              cursor="pointer"
              _hover={{ borderColor: "text.heading", transform: "translateY(-2px)" }}
              transition="transform 0.2s ease, border-color 0.2s ease"
              onClick={() => copyToClipboard(item.hex)}
            >
              <Box
                h="40px"
                borderRadius="md"
                style={{ backgroundColor: item.hex }}
                mb="2"
                borderWidth="1px"
                borderColor="border.subtle"
              />
              <Text fontSize="xs" fontWeight="bold" color="text.heading">
                {item.token} · {item.hex}
              </Text>
              <HStack justify="space-between" mt="1" gap="2" minW={0}>
                <Text fontSize="xs" color="text.muted" truncate minW={0}>
                  {item.label}
                </Text>
                <Box color="text.muted">
                  <Copy size={12} style={{ flexShrink: 0 }} />
                </Box>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </ShowcaseCard>

      {/* 2. Reglas de Negocio Inmutables (AGENTS.md) */}
      <ShowcaseCard
        title="Catálogo Oficial de Sistemas & Vidrios (Inmutable)"
        description="Definiciones canónicas estrictas que no deben alterarse en ninguna pantalla."
      >
          <VStack gap="6" align="stretch">
            <Box>
              <SubsectionLabel mb="3">
                LOS 6 SISTEMAS OFICIALES DE VENTANAS
              </SubsectionLabel>
              <HStack gap="3" wrap="wrap">
                {["Sistema Nova", "Serie 25", "Serie 35", "Serie 62", "Acústica", "PVC abatible"].map((sys) => (
                  <Badge key={sys} colorPalette="gray" variant="subtle" px="3" py="1.5" borderRadius="full" fontSize="xs">
                    {sys}
                  </Badge>
                ))}
              </HStack>
            </Box>

            <Separator borderColor="border.subtle" />

            <Box>
              <SubsectionLabel mb="3">
                LOS 3 TIPOS DE VIDRIO (SIN SUFIJO DE GROSOR)
              </SubsectionLabel>
              <HStack gap="3" wrap="wrap">
                {["Crudo", "Laminado", "Templado"].map((glass) => (
                  <Badge key={glass} variant="outline" colorPalette="gray" px="3" py="1.5" borderRadius="full" fontSize="xs">
                    {glass}
                  </Badge>
                ))}
              </HStack>
            </Box>

            <Separator borderColor="border.subtle" />

            <Box>
              <SubsectionLabel mb="3">
                ACABADOS DE ALUMINIO REGLAMENTARIOS
              </SubsectionLabel>
              <HStack gap="2" wrap="wrap">
                {["Negro", "Mate", "Blanco", "Madera", "Champagne"].map((color) => (
                  <Badge key={color} variant="subtle" colorPalette="gray" px="3" py="1" borderRadius="md">
                    {color}
                  </Badge>
                ))}
              </HStack>
            </Box>
          </VStack>
        </ShowcaseCard>

      {/* 3. Swatches Dinámicos de Tokens */}
      <ShowcaseCard
 title="Tokens Semánticos de Color"
 description="Variables vivas del tema Aura. Haz clic en cualquiera para copiar la prop de Chakra UI."
>
          <SimpleGrid columns={RESPONSIVE_GRIDS.tokens} gap={{ base: "3", md: "4" }}>
            {[
              { token: "bg.page", label: "Fondo General" },
              { token: "bg.surface", label: "Fondo Tarjeta" },
              { token: "bg.section", label: "Fondo Sección" },
              { token: "surface.container", label: "Contenedor" },
              { token: "brand.primary", label: "Acento Primario" },
              { token: "primary.900", label: "Zinc 900" },
              { token: "primary.700", label: "Zinc 700" },
              { token: "brand.whatsapp", label: "WhatsApp" },
              { token: "brand.red", label: "Red GYA" },
              { token: "status.info", label: "Info / Cyan" },
              { token: "status.success", label: "Éxito / Verde" },
              { token: "status.danger", label: "Peligro / Rojo" },
              { token: "border.subtle", label: "Borde Tenue" },
              { token: "border.default", label: "Borde Base" },
              { token: "border.strong", label: "Borde Fuerte" },
              { token: "text.heading", label: "Texto Títulos" },
              { token: "text.body", label: "Texto Cuerpo" },
              { token: "text.muted", label: "Texto Apagado" },
              { token: "ring.primary", label: "Anillo Foco" },
            ].map((item) => (
              <Box
                key={item.token}
                minW={0}
                p="3"
                borderRadius="lg"
                borderWidth="1px"
                borderColor="border.subtle"
                cursor="pointer"
                _hover={{ borderColor: "brand.primary", transform: "translateY(-2px)" }}
                transition="all 0.2s ease"
                onClick={() => copyToClipboard(item.token)}
              >
                <Box
                  h="40px"
                  borderRadius="md"
                  bg={item.token}
                  mb="2"
                  borderWidth="1px"
                  borderColor="border.subtle"
                />
                <Text fontSize="xs" fontWeight="bold" color="text.heading">{item.label}</Text>
                <HStack justify="space-between" mt="1" gap="2" minW={0}>
                  <Text fontSize="xs" color="text.muted" truncate minW={0}>{item.token}</Text>
                  {copiedToken === item.token ? (
                    <Badge colorPalette="green" size="xs">Copiado</Badge>
                  ) : (
                    <Box color="text.muted">
                      <Copy size={12} style={{ flexShrink: 0 }} />
                    </Box>
                  )}
                </HStack>
              </Box>
            ))}
          </SimpleGrid>
        </ShowcaseCard>

      {/* 4. Ejemplo de Tabs (variante line) */}
      <ShowcaseCard
 title="Ejemplo de Pestañas (Tabs)"
 description="Patrón de Tabs.Root con variante line para alternar contenido relacionado."
>
          <Tabs.Root defaultValue="texto" variant="line" size="sm">
            <Tabs.List mb="4" borderBottomWidth="1px" borderColor="border.default">
              <Tabs.Trigger value="texto">Texto</Tabs.Trigger>
              <Tabs.Trigger value="superficie">Superficies</Tabs.Trigger>
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
