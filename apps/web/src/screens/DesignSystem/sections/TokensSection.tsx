"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Badge,
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Separator,
  Tabs,
} from "@chakra-ui/react";
import { Copy } from "lucide-react";
import { RESPONSIVE_GRIDS } from "@/shared/constants/layout";
import { ShowcaseCard, ShowcaseStack, SubsectionLabel } from "../components";

interface ColorToken {
  token: string;
  /** Valor en modo claro y en modo oscuro (documentación del tema). */
  value: string;
  label: string;
}

/** Colores de marca. La muestra se pinta con el token, no con el valor escrito. */
const BRAND_TOKENS: readonly ColorToken[] = [
  { token: "brand.ink", value: "#111111", label: "Negro de marca: texto, botón primario y títulos" },
  { token: "brand.inkHover", value: "#2A2A2A", label: "Hover del botón primario" },
  { token: "brand.inkActive", value: "#000000", label: "Presionado del botón primario" },
  { token: "brand.inkSoft", value: "#4A4A4A", label: "Etiquetas y texto secundario" },
  { token: "brand.coral", value: "#FF5A5F", label: "Único acento: logo y texto grande" },
  { token: "brand.whatsappAccessible", value: "#15803D", label: "Botón y accesos a WhatsApp" },
  { token: "brand.whatsappAccessibleHover", value: "#166534", label: "Hover de WhatsApp" },
  { token: "brand.whatsappAccessibleActive", value: "#14532D", label: "Presionado de WhatsApp" },
];

const SURFACE_TOKENS: readonly ColorToken[] = [
  { token: "bg.page", value: "#FFFFFF / #09090B", label: "Fondo de página" },
  { token: "bg.section", value: "#FFFFFF / #121215", label: "Fondo de sección" },
  { token: "bg.surface", value: "#FFFFFF / negro 80 %", label: "Superficie de tarjeta" },
  { token: "surface.card", value: "alias de bg.surface", label: "Tarjeta" },
  { token: "surface.container", value: "#FFFFFF / blanco 4 %", label: "Contenedor y campos" },
  { token: "bg.subtle", value: "negro 4 % / blanco 4 %", label: "Fondo tenue" },
  { token: "bg.tint", value: "#F4F4F5 / blanco 6 %", label: "Bloque destacado neutro" },
];

const LINE_TOKENS: readonly ColorToken[] = [
  { token: "border.default", value: "#E4E4E7 / blanco 8 %", label: "Borde base" },
  { token: "border.subtle", value: "negro 6 % / blanco 8 %", label: "Borde tenue" },
  { token: "border.strong", value: "#D4D4D8 / blanco 12 %", label: "Borde fuerte" },
  { token: "border.warm", value: "#E6E3DE / blanco 8 %", label: "Línea cálida" },
  { token: "border.warmStrong", value: "#D9D6D0 / blanco 14 %", label: "Línea cálida firme" },
  { token: "ring.primary", value: "#3F3F46 / #D4D4D8", label: "Anillo de foco" },
];

const TEXT_TOKENS: readonly ColorToken[] = [
  { token: "text.heading", value: "#18181B / blanco", label: "Títulos" },
  { token: "text.body", value: "#27272A / #D4D4D8", label: "Cuerpo" },
  { token: "text.muted", value: "#52525B / #A1A1AA", label: "Texto apagado" },
  { token: "text.accent", value: "#52525B / #D4D4D8", label: "Texto de énfasis" },
  { token: "accent.ink", value: "#111111 / blanco", label: "Tinta de acento" },
  { token: "accent.inkContrast", value: "blanco / #111111", label: "Texto sobre tinta" },
];

const STATUS_TOKENS: readonly ColorToken[] = [
  { token: "status.infoSoft", value: "celeste 10 %", label: "Fondo de información" },
  { token: "status.successSoft", value: "verde 10 %", label: "Fondo de éxito" },
  { token: "status.warningSoft", value: "ámbar 10 %", label: "Fondo de aviso" },
  { token: "status.dangerSoft", value: "rojo 10 %", label: "Fondo de error" },
  { token: "status.infoText", value: "#0369A1 / #38BDF8", label: "Texto de información" },
  { token: "status.successText", value: "#047857 / #34D399", label: "Texto de éxito" },
  { token: "status.warningText", value: "#B45309 / #FBBF24", label: "Texto de aviso" },
  { token: "status.dangerText", value: "#B91C1C / #F87171", label: "Texto de error" },
];

const STATE_LAYER_TOKENS: readonly ColorToken[] = [
  { token: "state.hover", value: "negro 8 % / blanco 8 %", label: "Capa de estado al posar el cursor (MD3)" },
  { token: "state.focus", value: "negro 10 % / blanco 10 %", label: "Capa de estado al recibir foco (MD3)" },
  { token: "state.pressed", value: "negro 10 % / blanco 10 %", label: "Capa de estado al presionar/clic (MD3)" },
  { token: "state.drag", value: "negro 16 % / blanco 16 %", label: "Capa de estado en arrastre activo (MD3)" },
];

const SHADOWS = [
  { token: "navDesktop", value: "0 8px 32px, negro 8 %", label: "Barra de escritorio flotante" },
  { token: "elevatedLg", value: "0 8px 32px, negro 12 %", label: "Menús y paneles abiertos" },
  { token: "modalLg", value: "0 20px 50px, negro 30 %", label: "Solo diálogos" },
] as const;

const RADII = [
  { token: "xs", value: "4px", label: "Controles compactos, badges (MD3)" },
  { token: "sm", value: "8px", label: "Chips, elementos pequeños (MD3)" },
  { token: "md", value: "12px", label: "Campos de formulario, selector (MD3)" },
  { token: "lg", value: "16px", label: "Tarjetas base, modales compactos (MD3)" },
  { token: "card", value: "16px", label: "Tarjetas canónicas del sitio" },
  { token: "modal", value: "24px", label: "Diálogos y hojas modales" },
  { token: "xl", value: "28px", label: "Contenedores grandes, tarjetas hero (MD3)" },
  { token: "full", value: "9999px", label: "Botones píldora y badges circulares" },
] as const;

const PAGE_WIDTHS = [
  { token: "pageNarrow", value: "56rem (896 px)", label: "Contenido estrecho" },
  { token: "pageDefault", value: "72rem (1152 px)", label: "Ancho estándar" },
  { token: "pageWide", value: "80rem (1280 px)", label: "Ancho amplio" },
] as const;

const TYPE_SCALE = [
  { name: "Display", font: "heading", size: { base: "4xl", md: "6xl" }, lh: "display", ls: "display", spec: "Lora 700 · 60 px · 1,08", sample: "Vidrio y aluminio a medida" },
  { name: "Headline", font: "heading", size: { base: "3xl", md: "5xl" }, lh: "headline", ls: "headline", spec: "Lora 700 · 48 px · 1,1", sample: "Nuestros servicios" },
  { name: "Title", font: "heading", size: "2xl", lh: "title", ls: undefined, spec: "Lora 700 · 24 px · 1,2", sample: "Ventanas corredizas Nova" },
] as const;

interface SwatchGridProps {
  items: readonly ColorToken[];
  copiedToken: string | null;
  onCopy: (text: string) => void;
}

const SwatchGrid: React.FC<SwatchGridProps> = ({ items, copiedToken, onCopy }) => {
  const onKey = (e: React.KeyboardEvent, text: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onCopy(text);
    }
  };
  return (
    <SimpleGrid columns={RESPONSIVE_GRIDS.tokens} gap={{ base: "3", md: "4" }}>
      {items.map((item) => (
        <Box
          key={item.token}
          role="button"
          tabIndex={0}
          aria-label={`Copiar token ${item.token}`}
          minW={0}
          p="3"
          borderRadius="card"
          borderWidth="1px"
          borderColor="border.subtle"
          cursor="pointer"
          transition="border-color 0.2s ease"
          onClick={() => onCopy(item.token)}
          onKeyDown={(e) => onKey(e, item.token)}
        >
          <Box
            h="10"
            borderRadius="md"
            bg={item.token}
            mb="2"
            borderWidth="1px"
            borderColor="border.default"
            aria-hidden="true"
          />
          <Text fontSize="xs" fontWeight="700" color="text.heading" wordBreak="break-word">
            {item.token}
          </Text>
          <Text fontSize="xs" color="text.muted" fontFamily="mono" wordBreak="break-word">
            {item.value}
          </Text>
          <HStack justify="space-between" mt="1" gap="2" minW={0}>
            <Text fontSize="xs" color="text.muted" minW={0}>
              {item.label}
            </Text>
            {copiedToken === item.token ? (
              <Badge variant={"success" as never} size="xs">Copiado</Badge>
            ) : (
              <Box color="text.muted">
                <Copy size={12} style={{ flexShrink: 0 }} aria-hidden="true" />
              </Box>
            )}
          </HStack>
        </Box>
      ))}
    </SimpleGrid>
  );
};

interface ValueListProps {
  items: ReadonlyArray<{ token: string; value: string; label: string }>;
  render: (token: string) => React.ReactNode;
}

const ValueList: React.FC<ValueListProps> = ({ items, render }) => (
  <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={{ base: "3", md: "4" }}>
    {items.map((item) => (
      <Box key={item.token} p="4" borderRadius="card" borderWidth="1px" borderColor="border.default" minW={0}>
        <Box mb="3">{render(item.token)}</Box>
        <Text fontSize="sm" fontWeight="700" color="text.heading">{item.token}</Text>
        <Text fontSize="xs" color="text.muted" fontFamily="mono">{item.value}</Text>
        <Text fontSize="xs" color="text.muted">{item.label}</Text>
      </Box>
    ))}
  </SimpleGrid>
);

export const TokensSection: React.FC = () => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
      {/* 1. Tipografía */}
      <ShowcaseCard
        title="Tipografía (Lora + Inter)"
        description="Lora 700 para títulos, nombre de empresa y montos. Inter (400 a 700) para texto, tablas, etiquetas e interfaz. Lora no se usa en 900."
      >
        <VStack gap="6" align="stretch">
          {TYPE_SCALE.map((t) => (
            <Box key={t.name}>
              <Heading
                as="p"
                fontFamily={t.font}
                fontWeight="700"
                fontSize={t.size}
                lineHeight={t.lh}
                letterSpacing={t.ls}
                color="text.heading"
                wordBreak="break-word"
              >
                {t.sample}
              </Heading>
              <Text fontSize="xs" color="text.muted" mt="1">
                {t.name} · {t.spec}
              </Text>
            </Box>
          ))}
          <Separator borderColor="border.subtle" />
          <Box>
            <Text fontSize="md" lineHeight="body" color="text.body">
              <strong>Cuerpo · Inter 400 · 16 px · 1,625:</strong> Carpintería de vidrio y aluminio para viviendas y proyectos comerciales en Lima.
            </Text>
            <Text fontSize="sm" color="text.muted" mt="2">
              <strong>Secundario · Inter 400 · 14 px:</strong> Fichas técnicas, notas de presupuesto y especificaciones.
            </Text>
          </Box>
          <Box>
            <Text fontSize="xs" fontWeight="700" letterSpacing="label" textTransform="uppercase" color="text.muted">
              Etiqueta · Inter 700 · 12 px · 0,14em
            </Text>
          </Box>
          <Box>
            <Text fontFamily="heading" fontWeight="700" fontSize="xl" color="text.heading" fontVariantNumeric="tabular-nums">
              S/ 1,250.00 · 2.40 m × 1.20 m
            </Text>
            <Text fontSize="xs" color="text.muted">Montos y medidas con cifras tabulares y la unidad siempre visible.</Text>
          </Box>
        </VStack>
      </ShowcaseCard>

      {/* 2. Paleta de marca */}
      <ShowcaseCard
        title="Marca"
        description="El negro de marca es el único color protagonista. El coral #FF5A5F es el único acento: logo, una palabra de un título grande y PRESUPUESTO. Haga clic en una muestra para copiar el token."
      >
        <SwatchGrid items={BRAND_TOKENS} copiedToken={copiedToken} onCopy={copyToClipboard} />
      </ShowcaseCard>

      <ShowcaseCard
        title="Acento coral"
        description="El coral es el único acento de la marca. Se permite en el logo, en una palabra de un título grande y en la palabra PRESUPUESTO. No se usa en texto corrido, etiquetas, botones ni íconos."
      >
        <VStack gap="5" align="stretch">
          <Box
            p={{ base: "4", md: "6" }}
            borderWidth="1px"
            borderColor="border.subtle"
            borderRadius="card"
            bg="bg.section"
          >
            <Text fontSize="xs" fontWeight="700" letterSpacing="label" textTransform="uppercase" color="text.muted" mb="3">
              Uso permitido · título grande
            </Text>
            <Heading
              as="p"
              fontFamily="heading"
              fontWeight="700"
              fontSize={{ base: "2xl", md: "4xl" }}
              lineHeight="headline"
              letterSpacing="headline"
              color="text.heading"
            >
              Confianza <Box as="span" color="brand.coral">sólida</Box> en cada estructura
            </Heading>
            <Text fontSize="sm" color="text.muted" mt="3">
              Lora 700, 24 px o más. El coral alcanza 3,0:1 sobre blanco: suficiente para texto grande, no para texto pequeño.
            </Text>
          </Box>

          <HStack gap="3" align="start" p="4" borderWidth="1px" borderColor="border.subtle" borderRadius="card">
            <Box w="2" h="10" bg="brand.coral" borderRadius="full" flexShrink={0} aria-hidden="true" />
            <VStack align="start" gap="1">
              <Text fontWeight="700" color="text.heading">Una sola palabra por pantalla</Text>
              <Text fontSize="sm" color="text.muted">
                Si el coral aparece dos veces en el mismo bloque, una sobra. El resto del texto va en negro.
              </Text>
            </VStack>
          </HStack>
        </VStack>
      </ShowcaseCard>

      {/* 3. Superficies */}
      <ShowcaseCard
        title="Superficies"
        description="Fondo blanco en modo claro. Las tarjetas son planas, con borde fino."
      >
        <SwatchGrid items={SURFACE_TOKENS} copiedToken={copiedToken} onCopy={copyToClipboard} />
      </ShowcaseCard>

      {/* 4. Bordes y foco */}
      <ShowcaseCard title="Bordes y foco" description="Valores en modo claro y oscuro, separados por una barra.">
        <SwatchGrid items={LINE_TOKENS} copiedToken={copiedToken} onCopy={copyToClipboard} />
      </ShowcaseCard>

      {/* 5. Texto */}
      <ShowcaseCard title="Texto" description="Jerarquía de color de texto.">
        <SwatchGrid items={TEXT_TOKENS} copiedToken={copiedToken} onCopy={copyToClipboard} />
      </ShowcaseCard>

      {/* 6. Estados y Capas de Estado MD3 */}
      <ShowcaseCard
        title="Estados y Capas de Estado (Material Design 3)"
        description="Textos y fondos accesibles para mensajes (Alert/Badge) y capas tonales de interacción para hover (8%), focus (10%), pressed (10%) y drag (16%)."
      >
        <VStack gap="6" align="stretch">
          <Box>
            <SubsectionLabel mb="3">Mensajes y badges de estado</SubsectionLabel>
            <SwatchGrid items={STATUS_TOKENS} copiedToken={copiedToken} onCopy={copyToClipboard} />
          </Box>
          <Box>
            <SubsectionLabel mb="3">Capas tonales de estado MD3 (State Layers)</SubsectionLabel>
            <SwatchGrid items={STATE_LAYER_TOKENS} copiedToken={copiedToken} onCopy={copyToClipboard} />
          </Box>
        </VStack>
      </ShowcaseCard>

      {/* 7. Sombras, radios y anchos */}
      <ShowcaseCard
        title="Sombras, radios y anchos"
        description="Plano por defecto: la sombra solo aparece en navegación flotante, paneles abiertos y diálogos."
      >
        <VStack gap="6" align="stretch">
          <Box>
            <SubsectionLabel mb="3">Sombras</SubsectionLabel>
            <ValueList
              items={SHADOWS}
              render={(token) => (
                <Box h="14" borderRadius="card" bg="bg.surface" borderWidth="1px" borderColor="border.subtle" boxShadow={token} />
              )}
            />
          </Box>
          <Box>
            <SubsectionLabel mb="3">Radios</SubsectionLabel>
            <ValueList
              items={RADII}
              render={(token) => (
                <Box h="14" bg="bg.tint" borderWidth="1px" borderColor="border.default" borderRadius={token} />
              )}
            />
          </Box>
          <Box>
            <SubsectionLabel mb="3">Anchos de página (sizes)</SubsectionLabel>
            <ValueList
              items={PAGE_WIDTHS}
              render={(token) => (
                <Box h="3" w="full" bg="bg.tint" borderRadius="full" maxW={token} />
              )}
            />
          </Box>
        </VStack>
      </ShowcaseCard>

      {/* 8. Catálogo oficial */}
      <ShowcaseCard
        title="Catálogo de sistemas y vidrios"
        description="Definiciones canónicas que no deben alterarse en ninguna pantalla."
      >
        <VStack gap="6" align="stretch">
          <Box>
            <SubsectionLabel mb="3">Los 6 sistemas oficiales de ventanas</SubsectionLabel>
            <HStack gap="3" wrap="wrap">
              {["Sistema Nova", "Serie 25", "Serie 35", "Serie 62", "Acústica", "PVC abatible"].map((sys) => (
                <Badge key={sys} variant={"neutral" as never}>
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
                <Badge key={glass} variant={"inkSolid" as never}>
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
                <Badge key={color} variant={"neutral" as never}>
                  {color}
                </Badge>
              ))}
            </HStack>
          </Box>
        </VStack>
      </ShowcaseCard>

      {/* 9. Ejemplo de pestañas */}
      <ShowcaseCard
        title="Pestañas (Tabs)"
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
