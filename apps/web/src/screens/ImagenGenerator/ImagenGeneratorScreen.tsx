"use client";

import * as React from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Flex,
  Grid,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Text,
  VStack,
  chakra,
} from "@chakra-ui/react";
import {
  ArrowLeft,
  Check,
  Copy,
  Download,
  Eye,
  Layers,
  Search,
  Sparkles,
  SquareCode,
} from "lucide-react";
import { Button } from "@/shared/ui/button";
import { Badge } from "@/shared/ui/badge";
import {
  ALUMINUM_FINISHES,
  GLASS_TINTS,
  SystemArchitecturalSvg,
  type AluminumFinishId,
  type GlassTintId,
} from "@/entities/system";
import { LAB_SYSTEM_DEMOS, type SystemSvgKind } from "./systemVisualSpecs";
import {
  SERVICE_FILTER_OPTIONS,
  SERVICE_SYSTEM_PROMPTS,
  buildNanoBananaPrompt,
  type ServiceFilterId,
} from "./serviceSystemPrompts";

const DEMO_TO_SVG_PARAMS: Record<
  SystemSvgKind,
  { serviceSlug: string; systemName: string }
> = {
  serie42: { serviceSlug: "ventana", systemName: "Serie 42" },
  serie80: { serviceSlug: "mampara", systemName: "Serie 80" },
  duchaKit: { serviceSlug: "ducha", systemName: "Kit de ducha de 1 hoja" },
};

type CompareMode = "both" | "photo" | "svg";

/**
 * Laboratorio visual (/imagen-generator) para comparar renders fotorrealistas
 * estilo Nano Banana frente a planos SVG interactivos de alta fidelidad.
 */
export default function ImagenGeneratorScreen() {
  const [compareMode, setCompareMode] = React.useState<CompareMode>("both");
  const [finishId, setFinishId] = React.useState<AluminumFinishId>("negro");
  const [tintId, setTintId] = React.useState<GlassTintId>("incoloro");
  const [serviceFilter, setServiceFilter] =
    React.useState<ServiceFilterId>("ventana");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [expandedSvgId, setExpandedSvgId] = React.useState<string | null>(null);
  const [copiedId, setCopiedId] = React.useState<string | null>(null);

  const filteredPrompts = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return SERVICE_SYSTEM_PROMPTS.filter((entry) => {
      const matchesService =
        serviceFilter === "todos" || entry.serviceSlug === serviceFilter;
      if (!matchesService) return false;
      if (!q) return true;
      return (
        entry.systemName.toLowerCase().includes(q) ||
        entry.serviceLabel.toLowerCase().includes(q) ||
        entry.resumenTecnico.toLowerCase().includes(q)
      );
    });
  }, [serviceFilter, searchQuery]);

  const svgRefs = React.useRef<Record<SystemSvgKind, SVGSVGElement | null>>({
    serie42: null,
    serie80: null,
    duchaKit: null,
  });

  const activeFinish =
    ALUMINUM_FINISHES.find((item) => item.id === finishId) ??
    ALUMINUM_FINISHES[0];
  const activeTint =
    GLASS_TINTS.find((item) => item.id === tintId) ?? GLASS_TINTS[0];

  const handleCopyPrompt = React.useCallback(async (id: string, prompt: string) => {
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        await navigator.clipboard.writeText(prompt);
        setCopiedId(id);
        window.setTimeout(() => {
          setCopiedId((prev) => (prev === id ? null : prev));
        }, 2000);
      }
    } catch {
      // Clipboard API no disponible en contexto inseguro
    }
  }, []);

  const handleDownloadSvg = React.useCallback((kind: SystemSvgKind) => {
    const svgEl = svgRefs.current[kind];
    if (!svgEl || typeof window === "undefined") return;

    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svgEl);
    const blob = new Blob([source], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `gya-${kind}-${finishId}-${tintId}.svg`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }, [finishId, tintId]);

  return (
    <Box bg="bg.page" minH="100dvh" py={{ base: "6", md: "10" }}>
      <Container maxW="7xl" px={{ base: "4", md: "8" }}>
        <VStack align="stretch" gap={{ base: "6", md: "8" }}>
          {/* Navegación superior de laboratorio */}
          <Flex
            justify="space-between"
            align={{ base: "flex-start", sm: "center" }}
            direction={{ base: "column", sm: "row" }}
            gap="3"
          >
            <HStack gap="2" flexWrap="wrap">
              <Button asChild variant="outline" size="sm" minH="11">
                <Link href="/design-system">
                  <ArrowLeft size={16} />
                  Volver a Design System
                </Link>
              </Button>
              <Button asChild variant="ghost" size="sm" minH="11">
                <Link href="/servicios/ventana">Ver /servicios/ventana</Link>
              </Button>
            </HStack>
            <Badge variant="chipInk">
              Laboratorio Visual · No indexado
            </Badge>
          </Flex>

          {/* Cabecera editorial */}
          <VStack align="stretch" gap="3">
            <Heading
              as="h1"
              fontFamily="heading"
              fontWeight="700"
              fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
              lineHeight="1.1"
              letterSpacing="-0.02em"
              color="text.heading"
            >
              Generador visual:{" "}
              <chakra.span color="brand.coral">SVG</chakra.span> técnico vs.
              render fotorrealista
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} color="text.body" maxW="3xl">
              Comparativa en alta fidelidad para resolver sistemas sin fotografía propia de obra:
              renders arquitectónicos estilo Nano Banana frente a planos vectoriales interactivos
              listos para cambiar color de aluminio y tono de vidrio en tiempo real.
            </Text>
          </VStack>

          {/* Matriz de recomendación técnica */}
          <SimpleGrid columns={{ base: 1, lg: 3 }} gap="4">
            <Box
              bg="surface.card"
              borderWidth="1px"
              borderColor="border.default"
              borderRadius="card"
              p="5"
            >
              <HStack gap="2" mb="2">
                <SquareCode size={18} />
                <Heading as="h2" fontSize="md" fontWeight="700" color="text.heading">
                  1. SVG Técnico Interactivo
                </Heading>
              </HStack>
              <Text fontSize="sm" color="text.body" lineHeight="1.6">
                Peso ~8 KB, nitidez perfecta en cualquier pantalla y cambio instantáneo de color
                (Negro, Mate, Blanco, Madera, Champagne). Ideal para explicar apertura proyectante,
                corrediza, rieles y cotas máximas sin fingir una foto real.
              </Text>
            </Box>

            <Box
              bg="surface.card"
              borderWidth="1px"
              borderColor="border.default"
              borderRadius="card"
              p="5"
            >
              <HStack gap="2" mb="2">
                <Sparkles size={18} />
                <Heading as="h2" fontSize="md" fontWeight="700" color="text.heading">
                  2. Render Fotorrealista (Nano Banana)
                </Heading>
              </HStack>
              <Text fontSize="sm" color="text.body" lineHeight="1.6">
                Excelente para el escenario principal en salas, dormitorios y baños cuando aún no
                hay fotografía de obra instalada en Lima. Debe llevar siempre la etiqueta discreta
                “Render referencial” hasta reemplazarse por foto real de GYA.
              </Text>
            </Box>

            <Box
              bg="bg.tint"
              borderWidth="1px"
              borderColor="border.strong"
              borderRadius="card"
              p="5"
            >
              <HStack gap="2" mb="2">
                <Layers size={18} />
                <Heading as="h2" fontSize="md" fontWeight="700" color="text.heading">
                  Recomendación para GYA: Enfoque Híbrido
                </Heading>
              </HStack>
              <Text fontSize="sm" color="text.body" lineHeight="1.6">
                Use <strong>foto real de obra</strong> (o render fotorrealista marcado como
                referencial) para el fondo editorial de portada, y acompañe la ficha técnica con{" "}
                <strong>SVG arquitectónico interactivo</strong> para que su cliente visualice
                acabados y mecanismo.
              </Text>
            </Box>
          </SimpleGrid>

          {/* Barra de controles interactivos */}
          <Box
            bg="bg.subtle"
            borderWidth="1px"
            borderColor="border.default"
            borderRadius="card"
            p={{ base: "4", md: "5" }}
          >
            <VStack align="stretch" gap="4">
              <Flex
                justify="space-between"
                align={{ base: "flex-start", md: "center" }}
                direction={{ base: "column", md: "row" }}
                gap="3"
              >
                <Text fontSize="sm" fontWeight="600" color="text.heading">
                  Modo de visualización
                </Text>
                <HStack gap="2" flexWrap="wrap">
                  {(
                    [
                      { id: "both", label: "Comparar lado a lado" },
                      { id: "photo", label: "Solo Render IA" },
                      { id: "svg", label: "Solo SVG Técnico" },
                    ] as const
                  ).map((opt) => (
                    <Button
                      key={opt.id}
                      variant={compareMode === opt.id ? "primary" : "outline"}
                      size="sm"
                      minH="11"
                      aria-pressed={compareMode === opt.id}
                      onClick={() => setCompareMode(opt.id)}
                    >
                      {opt.label}
                    </Button>
                  ))}
                </HStack>
              </Flex>

              <Grid templateColumns={{ base: "1fr", lg: "1fr 1fr" }} gap="4">
                <VStack align="stretch" gap="2">
                  <Text fontSize="xs" fontWeight="600" color="text.muted" textTransform="uppercase">
                    Acabado de aluminio en SVG ({activeFinish.label})
                  </Text>
                  <HStack gap="2" flexWrap="wrap">
                    {ALUMINUM_FINISHES.map((item) => (
                      <Button
                        key={item.id}
                        variant={finishId === item.id ? "primary" : "outline"}
                        size="sm"
                        minH="11"
                        aria-pressed={finishId === item.id}
                        onClick={() => setFinishId(item.id)}
                      >
                        <Box
                          as="span"
                          w="3.5"
                          h="3.5"
                          borderRadius="full"
                          borderWidth="1px"
                          borderColor="border.strong"
                          style={{ backgroundColor: item.frameMain }}
                        />
                        {item.label}
                      </Button>
                    ))}
                  </HStack>
                </VStack>

                <VStack align="stretch" gap="2">
                  <Text fontSize="xs" fontWeight="600" color="text.muted" textTransform="uppercase">
                    Tono de vidrio en SVG ({activeTint.label})
                  </Text>
                  <HStack gap="2" flexWrap="wrap">
                    {GLASS_TINTS.map((item) => (
                      <Button
                        key={item.id}
                        variant={tintId === item.id ? "primary" : "outline"}
                        size="sm"
                        minH="11"
                        aria-pressed={tintId === item.id}
                        onClick={() => setTintId(item.id)}
                      >
                        {item.label}
                      </Button>
                    ))}
                  </HStack>
                </VStack>
              </Grid>
            </VStack>
          </Box>

          {/* 3 Sistemas piloto comparados */}
          <VStack align="stretch" gap="8">
            {LAB_SYSTEM_DEMOS.map((demo) => (
              <Box
                key={demo.id}
                bg="surface.card"
                borderWidth="1px"
                borderColor="border.default"
                borderRadius="card"
                p={{ base: "4", md: "6" }}
              >
                <VStack align="stretch" gap="5">
                  <Flex
                    justify="space-between"
                    align={{ base: "flex-start", md: "center" }}
                    direction={{ base: "column", md: "row" }}
                    gap="3"
                  >
                    <VStack align="start" gap="1">
                      <Badge variant="chip">{demo.category}</Badge>
                      <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} color="text.heading">
                        {demo.title}
                      </Heading>
                      <Text fontSize="sm" color="text.muted">
                        {demo.subtitle}
                      </Text>
                    </VStack>

                    <HStack gap="2" flexWrap="wrap">
                      <Button
                        variant="outline"
                        size="sm"
                        minH="11"
                        onClick={() => handleCopyPrompt(demo.id, demo.nanoBananaPrompt)}
                      >
                        {copiedId === demo.id ? <Check size={16} /> : <Copy size={16} />}
                        {copiedId === demo.id ? "Prompt copiado" : "Copiar prompt Nano Banana"}
                      </Button>
                      <Button
                        variant="primary"
                        size="sm"
                        minH="11"
                        onClick={() => handleDownloadSvg(demo.id)}
                      >
                        <Download size={16} />
                        Descargar SVG
                      </Button>
                    </HStack>
                  </Flex>

                  <Grid
                    templateColumns={{
                      base: "1fr",
                      lg: compareMode === "both" ? "1fr 1fr" : "1fr",
                    }}
                    gap="5"
                  >
                    {compareMode !== "svg" && (
                      <VStack align="stretch" gap="2">
                        <Flex justify="space-between" align="center">
                          <Text fontSize="xs" fontWeight="700" color="text.heading" textTransform="uppercase">
                            A · Render fotorrealista (estilo Nano Banana)
                          </Text>
                          <Badge variant="warning">Render referencial · IA</Badge>
                        </Flex>
                        <Box
                          position="relative"
                          borderRadius="card"
                          overflow="hidden"
                          borderWidth="1px"
                          borderColor="border.subtle"
                          bg="bg.subtle"
                          aspectRatio={compareMode === "both" ? "16 / 10" : "16 / 9"}
                        >
                          <chakra.img
                            src={demo.photoSrc}
                            alt={demo.photoAlt}
                            w="full"
                            h="full"
                            objectFit="cover"
                            loading="lazy"
                          />
                        </Box>
                      </VStack>
                    )}

                    {compareMode !== "photo" && (
                      <VStack align="stretch" gap="2">
                        <Flex justify="space-between" align="center">
                          <Text fontSize="xs" fontWeight="700" color="text.heading" textTransform="uppercase">
                            B · Plano técnico SVG interactivo
                          </Text>
                          <Badge variant="success">Vectorial exacto · Editable</Badge>
                        </Flex>
                        <Box
                          borderRadius="card"
                          overflow="hidden"
                          borderWidth="1px"
                          borderColor="border.default"
                          aspectRatio={compareMode === "both" ? "16 / 10" : "16 / 9"}
                        >
                          <SystemArchitecturalSvg
                            serviceSlug={DEMO_TO_SVG_PARAMS[demo.id].serviceSlug}
                            systemName={DEMO_TO_SVG_PARAMS[demo.id].systemName}
                            finishId={finishId}
                            tintId={tintId}
                            onSvgMount={(el) => {
                              svgRefs.current[demo.id] = el;
                            }}
                          />
                        </Box>
                      </VStack>
                    )}
                  </Grid>

                  <SimpleGrid columns={{ base: 1, md: 3 }} gap="4" pt="2" borderTopWidth="1px" borderColor="border.subtle">
                    <Box>
                      <Text fontSize="xs" fontWeight="700" color="text.muted" textTransform="uppercase" mb="1">
                        Medidas y vidrio
                      </Text>
                      <Text fontSize="sm" color="text.heading" fontWeight="600">
                        {demo.dimensionsLabel}
                      </Text>
                      <Text fontSize="sm" color="text.body" mt="1">
                        {demo.glassSpec}
                      </Text>
                    </Box>

                    <Box>
                      <Text fontSize="xs" fontWeight="700" color="text.muted" textTransform="uppercase" mb="1">
                        Herrajes y sellado representados
                      </Text>
                      <VStack align="stretch" gap="1">
                        {demo.hardwareList.map((item) => (
                          <Text key={item} fontSize="sm" color="text.body">
                            • {item}
                          </Text>
                        ))}
                      </VStack>
                    </Box>

                    <Box>
                      <Text fontSize="xs" fontWeight="700" color="text.muted" textTransform="uppercase" mb="1">
                        Uso recomendado y prompt base
                      </Text>
                      <Text fontSize="sm" color="text.body">
                        {demo.recommendedUse}
                      </Text>
                      <Text fontSize="xs" color="text.muted" mt="2" lineClamp={3} fontFamily="mono">
                        {demo.nanoBananaPrompt}
                      </Text>
                    </Box>
                  </SimpleGrid>
                </VStack>
              </Box>
            ))}
          </VStack>

          {/* Biblioteca completa de prompts técnicos por Servicio y Sistema */}
          <VStack align="stretch" gap="5" pt="4" borderTopWidth="1px" borderColor="border.default">
            <Flex
              justify="space-between"
              align={{ base: "flex-start", md: "flex-end" }}
              direction={{ base: "column", md: "row" }}
              gap="4"
            >
              <Box>
                <Badge variant="chipInk" mb="2">
                  Catálogo completo · 13 servicios · 50 sistemas
                </Badge>
                <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} color="text.heading">
                  Prompts por Servicio y Sistema (Nano Banana)
                </Heading>
                <Text fontSize="sm" color="text.muted" mt="1" maxW="3xl">
                  Cada prompt combina geometría real del perfil, herrajes visibles, burletes,
                  acabado ({activeFinish.label}), vidrio ({activeTint.label}) y ambiente residencial
                  o comercial en Lima, sin nombres de proveedores ni texto superpuesto.
                </Text>
              </Box>

              <Button
                variant="primary"
                size="sm"
                minH="11"
                disabled={filteredPrompts.length === 0}
                onClick={() => {
                  const bundle = filteredPrompts
                    .map(
                      (entry, idx) =>
                        `### ${idx + 1}. ${entry.serviceLabel} — ${entry.systemName}\n${buildNanoBananaPrompt(entry, finishId, tintId)}`,
                    )
                    .join("\n\n");
                  void handleCopyPrompt("bundle", bundle);
                }}
              >
                {copiedId === "bundle" ? <Check size={16} /> : <Copy size={16} />}
                {copiedId === "bundle"
                  ? `Copiados (${filteredPrompts.length})`
                  : `Copiar lote visible (${filteredPrompts.length})`}
              </Button>
            </Flex>

            {/* Buscador + Filtros por servicio */}
            <VStack align="stretch" gap="3">
              <Box position="relative" maxW={{ base: "full", md: "sm" }}>
                <Box
                  position="absolute"
                  left="3"
                  top="50%"
                  transform="translateY(-50%)"
                  color="text.muted"
                  pointerEvents="none"
                  zIndex="1"
                >
                  <Search size={16} />
                </Box>
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar sistema (ej. Serie 42, VCO, Ducha, Parapeto...)"
                  aria-label="Buscar sistema para prompt"
                  pl="9"
                  minH="11"
                  bg="bg.page"
                  borderColor="border.default"
                />
              </Box>

              <HStack gap="2" flexWrap="wrap">
                {SERVICE_FILTER_OPTIONS.map((opt) => (
                  <Button
                    key={opt.id}
                    variant={serviceFilter === opt.id ? "primary" : "outline"}
                    size="sm"
                    minH="11"
                    aria-pressed={serviceFilter === opt.id}
                    onClick={() => setServiceFilter(opt.id)}
                  >
                    {opt.label}
                  </Button>
                ))}
              </HStack>
            </VStack>

            {filteredPrompts.length === 0 ? (
              <Box
                bg="bg.subtle"
                borderWidth="1px"
                borderColor="border.default"
                borderRadius="card"
                p="6"
              >
                <Text fontSize="sm" color="text.muted">
                  No se encontraron sistemas que coincidan con “{searchQuery}”. Pruebe otro término o
                  cambie a “Todos los servicios (50)”.
                </Text>
              </Box>
            ) : (
              <SimpleGrid columns={{ base: 1, lg: 2 }} gap="4">
                {filteredPrompts.map((entry) => {
                  const fullPrompt = buildNanoBananaPrompt(entry, finishId, tintId);
                  return (
                    <Flex
                      key={entry.id}
                      direction="column"
                      justify="space-between"
                      gap="4"
                      bg="surface.card"
                      borderWidth="1px"
                      borderColor="border.default"
                      borderRadius="card"
                      p="5"
                    >
                      <VStack align="stretch" gap="2.5">
                        <Flex justify="space-between" align="center" gap="2" flexWrap="wrap">
                          <HStack gap="2" flexWrap="wrap">
                            <Badge variant="chipInk">{entry.serviceLabel}</Badge>
                            <Badge variant="chip">Relación {entry.aspectRatio}</Badge>
                          </HStack>
                          <Text fontSize="xs" color="text.muted">
                            {entry.usesAluminumFrame ? activeFinish.label : "Herraje estructural"} ·{" "}
                            {activeTint.label}
                          </Text>
                        </Flex>

                        <Heading as="h3" fontSize="lg" color="text.heading">
                          {entry.systemName}
                        </Heading>

                        <Text fontSize="sm" color="text.body">
                          {entry.resumenTecnico}
                        </Text>

                        <Box
                          bg="bg.subtle"
                          borderRadius="md"
                          p="3"
                          borderWidth="1px"
                          borderColor="border.subtle"
                        >
                          <Text
                            fontSize="xs"
                            color="text.muted"
                            fontFamily="mono"
                            lineHeight="1.55"
                          >
                            {fullPrompt}
                          </Text>
                        </Box>
                      </VStack>

                      <HStack gap="2" flexWrap="wrap">
                        <Button
                          variant="outline"
                          size="sm"
                          minH="11"
                          flex="1"
                          onClick={() => handleCopyPrompt(entry.id, fullPrompt)}
                        >
                          {copiedId === entry.id ? <Check size={16} /> : <Copy size={16} />}
                          {copiedId === entry.id
                            ? "Prompt copiado"
                            : `Copiar prompt (${entry.systemName})`}
                        </Button>
                        <Button
                          variant={expandedSvgId === entry.id ? "primary" : "ghost"}
                          size="sm"
                          minH="11"
                          aria-pressed={expandedSvgId === entry.id}
                          onClick={() =>
                            setExpandedSvgId((prev) =>
                              prev === entry.id ? null : entry.id,
                            )
                          }
                        >
                          <Eye size={16} />
                          {expandedSvgId === entry.id ? "Ocultar SVG" : "Ver SVG"}
                        </Button>
                      </HStack>

                      {expandedSvgId === entry.id && (
                        <Box
                          borderRadius="card"
                          overflow="hidden"
                          borderWidth="1px"
                          borderColor="border.default"
                          aspectRatio="16 / 10"
                        >
                          <SystemArchitecturalSvg
                            serviceSlug={entry.serviceSlug}
                            systemName={entry.systemName}
                            finishId={finishId}
                            tintId={tintId}
                          />
                        </Box>
                      )}
                    </Flex>
                  );
                })}
              </SimpleGrid>
            )}
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
