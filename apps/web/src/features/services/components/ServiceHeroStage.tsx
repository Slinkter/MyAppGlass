"use client";

import React from "react";
import {
  Box,
  Flex,
  Grid,
  HStack,
  Text,
  VStack,
  chakra,
} from "@chakra-ui/react";
import {
  ChevronLeft,
  ChevronRight,
  Layers,
  Maximize2,
  Palette,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { Button } from "@/shared/ui/button";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogRoot,
} from "@/shared/ui/dialog";
import ResponsiveImage from "@/shared/components/Image/ResponsiveImage";
import { glassLightOnPhoto, glassSurface } from "@/shared/constants/glass";
import { TRANSITIONS } from "@/shared/constants/motion";
import type { ServiceSystemSheet } from "@/entities/service/model";
import {
  ALUMINUM_FINISHES,
  GLASS_TINTS,
  SystemArchitecturalSvg,
  archetypeSupportsAluminumFinish,
  resolveSystemRenderUrl,
  resolveSystemSvgArchetype,
  type AluminumFinishId,
  type GlassTintId,
} from "@/entities/system";
import type { GalleryItem } from "@/shared/types/gallery";

export interface ServiceHeroStageProps {
  serviceSlug?: string;
  serviceTitle: string;
  systemLabel: string;
  systemDescription?: string;
  shortDescription?: string;
  fullDescription: string;
  images: GalleryItem[];
  coverImage?: string;
  activeSystemSheet?: ServiceSystemSheet;
  quoteHref: string | null;
}

const truncateConcise = (text: string, maxLen = 148): string => {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLen) return clean;
  const slice = clean.slice(0, maxLen);
  const lastSpace = slice.lastIndexOf(" ");
  return `${(lastSpace > 80 ? slice.slice(0, lastSpace) : slice).trim()}…`;
};

const pickSpecValue = (
  sheet: ServiceSystemSheet | undefined,
  keywords: string[],
): string | undefined => {
  if (!sheet?.specs?.length) return undefined;
  const match = sheet.specs.find((item) => {
    const label = item.label.toLowerCase();
    return keywords.some((kw) => label.includes(kw));
  });
  return match?.value;
};

/**
 * Escenario editorial adaptado de `Inicio · patrón B` para páginas de servicio:
 * combina foto real (o plano SVG arquitectónico en vivo), tarjeta de vidrio flotante,
 * barra inferior de 4 datos reales y cero solapamiento en móvil/escritorio.
 */
export const ServiceHeroStage: React.FC<ServiceHeroStageProps> = ({
  serviceSlug,
  serviceTitle,
  systemLabel,
  systemDescription,
  shortDescription,
  fullDescription,
  images,
  coverImage,
  activeSystemSheet,
}) => {
  const dedicatedRender = React.useMemo(
    () => (serviceSlug ? resolveSystemRenderUrl(serviceSlug, systemLabel) : undefined),
    [serviceSlug, systemLabel],
  );
  const hasOwnPhotos = images.length > 0;
  const hasDedicatedRender = !hasOwnPhotos && Boolean(dedicatedRender);
  const canExpandPhoto = hasOwnPhotos || hasDedicatedRender;

  const [viewMode, setViewMode] = React.useState<"photo" | "svg">(
    canExpandPhoto ? "photo" : "svg",
  );
  const [photoIndex, setPhotoIndex] = React.useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
  const [finishId, setFinishId] = React.useState<AluminumFinishId>("negro");
  const [tintId, setTintId] = React.useState<GlassTintId>("incoloro");

  // Sincroniza modo inicial y reinicia índice cuando cambia la serie seleccionada
  React.useEffect(() => {
    setPhotoIndex(0);
    setViewMode(hasOwnPhotos || hasDedicatedRender ? "photo" : "svg");
  }, [systemLabel, hasOwnPhotos, hasDedicatedRender]);

  const activePhoto = hasOwnPhotos
    ? images[Math.min(photoIndex, images.length - 1)]
    : dedicatedRender
      ? {
          id: `render-${systemLabel}`,
          src: dedicatedRender,
          title: `${serviceTitle} ${systemLabel} — Render referencial`,
        }
      : coverImage
        ? { id: "cover", src: coverImage, title: `${serviceTitle} — ${systemLabel}` }
        : undefined;

  const archetype = resolveSystemSvgArchetype(serviceSlug, systemLabel);
  const supportsAluminum = archetypeSupportsAluminumFinish(archetype);

  // Descripción única y breve sin truncar a mitad de frase con puntos suspensivos
  const conciseSummary = React.useMemo(() => {
    const firstSentence = fullDescription.split(".")[0] || fullDescription;
    const normTitle = systemLabel.trim().toLowerCase();
    const candidates = [
      systemDescription?.trim(),
      activeSystemSheet?.resumen?.trim(),
      shortDescription?.trim(),
      firstSentence.trim(),
    ].filter((val): val is string => Boolean(val && val.toLowerCase() !== normTitle));
    const chosen = candidates[0] || firstSentence;
    const completeSentence = chosen.split(".")[0]?.trim();
    if (completeSentence && completeSentence.length >= 40 && completeSentence.length <= 220) {
      return `${completeSentence}.`;
    }
    return truncateConcise(chosen, 220);
  }, [systemDescription, activeSystemSheet, shortDescription, fullDescription, systemLabel]);

  // Separa la última palabra para resaltar 1 palabra en brand.coral (DESIGN.md)
  const { leadingTitle, accentWord } = React.useMemo(() => {
    const cleanSystem = systemLabel.trim();
    const parts = cleanSystem.split(/\s+/);
    if (parts.length <= 1) {
      return { leadingTitle: `${serviceTitle} `, accentWord: cleanSystem };
    }
    const last = parts.pop() || cleanSystem;
    return { leadingTitle: `${parts.join(" ")} `, accentWord: last };
  }, [serviceTitle, systemLabel]);

  // 4 hechos reales para el Dock inferior
  const dockFacts = React.useMemo(() => {
    const aperturaRaw =
      pickSpecValue(activeSystemSheet, ["apertura", "sección", "tipo", "configuración"]) ||
      systemLabel;
    const apertura = aperturaRaw.split(",")[0]?.split("·")[0]?.trim() || aperturaRaw;
    const vidrioRaw =
      pickSpecValue(activeSystemSheet, ["vidrio", "espesor", "cristal", "cobertura"]) ||
      "Crudo, laminado o templado";
    const vidrio =
      serviceSlug === "ventana"
        ? "Vidrio de 6 mm"
        : vidrioRaw.split("(")[0]?.split("·")[0]?.trim() || vidrioRaw;
    const acabados = supportsAluminum
      ? "5 tonos de aluminio"
      : "3 acabados herraje";
    return [
      { icon: SlidersHorizontal, title: "Sistema", text: apertura },
      { icon: Layers, title: "Vidrio", text: vidrio },
      { icon: Palette, title: "Acabados", text: acabados },
      { icon: ShieldCheck, title: "Cobertura", text: "Solo La Molina" },
    ];
  }, [activeSystemSheet, serviceSlug, systemLabel, supportsAluminum]);

  const isSvgActive = viewMode === "svg" || !activePhoto;

  const mediaControls = (
    <>
      <HStack
        display={{ base: "none", md: !isSvgActive && canExpandPhoto ? "flex" : "none" }}
        position="absolute"
        top={{ base: "2", md: "3" }}
        right={{ base: "2", md: "3" }}
        zIndex={3}
        gap="1"
        p="1"
        borderRadius="full"
        {...glassLightOnPhoto}
      >
        {!isSvgActive && hasOwnPhotos && images.length > 1 && (
          <HStack display={{ base: "none", md: "flex" }} gap="0.5">
            <Button
              variant="ghost"
              size="xs"
              minW="11"
              minH="11"
              px="0"
              borderRadius="full"
              aria-label="Foto anterior"
              onClick={() =>
                setPhotoIndex((prev) => (prev - 1 + images.length) % images.length)
              }
            >
              <ChevronLeft size={16} aria-hidden="true" />
            </Button>
            <Text
              fontSize="xs"
              fontWeight="700"
              color="text.heading"
              px="1"
              fontVariantNumeric="tabular-nums"
            >
              {photoIndex + 1}/{images.length}
            </Text>
            <Button
              variant="ghost"
              size="xs"
              minW="11"
              minH="11"
              px="0"
              borderRadius="full"
              aria-label="Siguiente foto"
              onClick={() => setPhotoIndex((prev) => (prev + 1) % images.length)}
            >
              <ChevronRight size={16} aria-hidden="true" />
            </Button>
          </HStack>
        )}

        {!isSvgActive && canExpandPhoto && (
          <Button
            display={{ base: "none", md: "inline-flex" }}
            variant="ghost"
            size="xs"
            minW="11"
            minH="11"
            px="0"
            borderRadius="full"
            aria-label="Ampliar imagen en pantalla completa"
            onClick={() => setIsLightboxOpen(true)}
          >
            <Maximize2 size={15} aria-hidden="true" />
          </Button>
        )}
      </HStack>

      {!isSvgActive && canExpandPhoto && (
        <HStack
          display={{ base: "flex", md: "none" }}
          position="absolute"
          bottom="2"
          right="2"
          zIndex={3}
          gap="0.5"
          p="1"
          borderRadius="full"
          {...glassLightOnPhoto}
        >
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="xs"
                minW="11"
                minH="11"
                px="0"
                borderRadius="full"
                aria-label="Foto anterior"
                onClick={() =>
                  setPhotoIndex((prev) => (prev - 1 + images.length) % images.length)
                }
              >
                <ChevronLeft size={16} aria-hidden="true" />
              </Button>
              <Text
                fontSize="xs"
                fontWeight="700"
                color="text.heading"
                px="1"
                fontVariantNumeric="tabular-nums"
              >
                {photoIndex + 1}/{images.length}
              </Text>
              <Button
                variant="ghost"
                size="xs"
                minW="11"
                minH="11"
                px="0"
                borderRadius="full"
                aria-label="Siguiente foto"
                onClick={() => setPhotoIndex((prev) => (prev + 1) % images.length)}
              >
                <ChevronRight size={16} aria-hidden="true" />
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="xs"
            minW="11"
            minH="11"
            px="0"
            borderRadius="full"
            aria-label="Ampliar imagen en pantalla completa"
            onClick={() => setIsLightboxOpen(true)}
          >
            <Maximize2 size={15} aria-hidden="true" />
          </Button>
        </HStack>
      )}
    </>
  );

  const floatingPlaceCard = (
    <Box
      as="section"
      aria-label={`Resumen de ${systemLabel}`}
      position={{ base: "relative", md: "absolute" }}
      top={{ md: "4", lg: "5" }}
      left={{ md: "4", lg: "5" }}
      w={{ base: "full", md: "17.5rem", lg: "26rem" }}
      zIndex={2}
      p={{ base: "4", md: "5" }}
      borderRadius={{ base: "none", md: "card" }}
      {...glassLightOnPhoto}
    >
      <HStack justify="space-between" gap="3">
        <HStack gap="1.5">
          <Box
            w="2"
            h="2"
            borderRadius="full"
            bg="brand.ink"
            flexShrink={0}
            aria-hidden="true"
          />
          <Text
            fontSize="xs"
            fontWeight="700"
            letterSpacing="label"
            textTransform="uppercase"
            color="text.muted"
          >
            {serviceTitle}
          </Text>
        </HStack>
        <Text fontSize="xs" fontWeight="600" color="text.muted">
          {hasOwnPhotos
            ? `${images.length} ${images.length === 1 ? "foto real" : "fotos reales"}`
            : isSvgActive
              ? "Plano técnico"
              : hasDedicatedRender
                ? "Render referencial"
                : "Foto referencial"}
        </Text>
      </HStack>

      <Text
        as="h2"
        mt="2.5"
        fontFamily="heading"
        fontWeight="700"
        fontSize={{ base: "2xl", md: "3xl" }}
        lineHeight="1.15"
        letterSpacing="-0.015em"
        color="text.heading"
      >
        {leadingTitle}
        <Box as="span" color="brand.coral" whiteSpace="nowrap">
          {accentWord}
        </Box>
      </Text>

      <Text mt="2" fontSize="sm" color="text.body" lineHeight="1.55">
        {conciseSummary}
      </Text>

      {/* Botones de acción removidos para mantener el hero limpio dentro del viewport */}
    </Box>
  );

  const dockBar = (
    <Box
      position={{ base: "relative", md: "absolute" }}
      left={{ md: "4", lg: "5" }}
      right={{ md: "4", lg: "5" }}
      bottom={{ md: "4" }}
      zIndex={2}
      p={{ base: "3", md: "1.5" }}
      borderRadius={{ base: "0", md: "card" }}
      aria-label="Resumen técnico rápido"
      {...glassSurface}
    >
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }}
        gap={{ base: "2", lg: "1" }}
      >
        {dockFacts.map((fact) => {
          const IconComp = fact.icon;
          return (
            <HStack
              key={fact.title}
              gap="2.5"
              minH="11"
              p="1.5"
              pr={{ base: "1.5", md: "3" }}
              minW={0}
            >
              <Box
                w="9"
                h="9"
                borderRadius="lg"
                flexShrink={0}
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="bg.subtle"
                color="text.heading"
              >
                <IconComp size={16} aria-hidden="true" />
              </Box>
              <VStack align="flex-start" gap="0.5" minW={0} flex="1">
                <Text fontSize="xs" fontWeight="700" color="text.heading" lineHeight="1.2">
                  {fact.title}
                </Text>
                <Text
                  fontSize="xs"
                  fontWeight="400"
                  color="text.muted"
                  lineHeight="1.35"
                  maxW="full"
                >
                  {fact.text}
                </Text>
              </VStack>
            </HStack>
          );
        })}
      </Grid>
    </Box>
  );

  const hasThumbnailStrip = !isSvgActive && hasOwnPhotos && images.length > 1;

  return (
    <VStack align="stretch" gap="3" w="full">
      <Grid
        templateColumns={{
          base: "1fr",
          md: hasThumbnailStrip ? "1fr 6.5rem" : "1fr",
        }}
        gap="3"
        alignItems="stretch"
        w="full"
      >
        {/* Escenario Pattern B: ocupa todo el alto útil del viewport en md+ */}
        <Box
          position="relative"
          overflow="hidden"
          minH={{ base: "auto", md: "max(26rem, calc(100dvh - 10.75rem))" }}
          h={{ md: "max(26rem, calc(100dvh - 10.75rem))" }}
          borderRadius="modal"
          borderWidth="1px"
          borderColor="border.default"
          bg="bg.subtle"
        >
        {/* Escenario visual: fondo completo en md+, bloque superior 240px en base */}
        <Box
          position={{ base: "relative", md: "absolute" }}
          inset={{ md: 0 }}
          h={{ base: "15.5rem", md: "auto" }}
          w="full"
        >
          {mediaControls}

          {isSvgActive ? (
            <Box
              w="full"
              h="full"
              pl={{ md: "24.5rem", lg: "28rem" }}
              pt={{ md: "14" }}
              pb={{ md: "5.25rem" }}
              pr={{ md: "4" }}
              bg="bg.subtle"
            >
              <SystemArchitecturalSvg
                serviceSlug={serviceSlug}
                systemName={systemLabel}
                finishId={finishId}
                tintId={tintId}
              />
            </Box>
          ) : (
            activePhoto && (
              <ResponsiveImage
                src={activePhoto.src}
                alt={activePhoto.title || `${serviceTitle} ${systemLabel}`}
                isLCP
                w="full"
                h="full"
                objectFit="cover"
                sizes="(min-width: 1280px) 1280px, 100vw"
              />
            )
          )}
        </Box>

        {floatingPlaceCard}
        {dockBar}
      </Box>

        {/* Tira de miniaturas: fila horizontal en móvil y columna vertical a la derecha en md+ */}
        {hasThumbnailStrip && (
          <Flex
            direction={{ base: "row", md: "column" }}
            gap="2"
            overflowX={{ base: "auto", md: "hidden" }}
            overflowY={{ base: "hidden", md: "auto" }}
            maxH={{ md: "max(26rem, calc(100dvh - 10.75rem))" }}
            w={{ base: "full", md: "6.5rem" }}
            py={{ base: "1", md: "0.5" }}
            pr={{ md: "0.5" }}
            aria-label="Galería de miniaturas"
            css={{
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
            }}
          >
            {images.map((img, idx) => {
              const isSelected = idx === photoIndex;
              return (
                <chakra.button
                  key={`${img.id}-${idx}`}
                  type="button"
                  minW={{ base: "24", md: "full" }}
                  w={{ base: "24", md: "full" }}
                  h={{ base: "14", md: "14" }}
                  borderRadius="lg"
                  overflow="hidden"
                  borderWidth="2px"
                  borderColor={isSelected ? "brand.ink" : "border.default"}
                  opacity={isSelected ? 1 : 0.72}
                  flexShrink={0}
                  cursor="pointer"
                  aria-label={`Ver foto ${idx + 1} de ${systemLabel}`}
                  aria-pressed={isSelected}
                  onClick={() => setPhotoIndex(idx)}
                  transition={TRANSITIONS.fadeTransform}
                  _hover={{ opacity: 1 }}
                  _focusVisible={{
                    outline: "2px solid",
                    outlineColor: "ring.primary",
                    outlineOffset: "2px",
                  }}
                  _motionReduce={{ transition: "none" }}
                >
                  <ResponsiveImage
                    src={img.src}
                    alt={img.title || `${systemLabel} foto ${idx + 1}`}
                    w="full"
                    h="full"
                    objectFit="cover"
                    sizes="104px"
                  />
                </chakra.button>
              );
            })}
          </Flex>
        )}
      </Grid>

      {/* Selector rápido de acabado y vidrio cuando se visualiza el plano SVG */}
      {isSvgActive && (
        <Flex
          justify="space-between"
          align={{ base: "flex-start", lg: "center" }}
          direction={{ base: "column", lg: "row" }}
          gap="3"
          px="4"
          py="3"
          borderRadius="card"
          borderWidth="1px"
          borderColor="border.default"
          bg="bg.page"
        >
          {supportsAluminum && (
            <HStack gap="1.5" flexWrap="wrap">
              <Text fontSize="xs" fontWeight="700" color="text.muted" mr="1">
                Aluminio:
              </Text>
              {ALUMINUM_FINISHES.map((item) => (
                <Button
                  key={item.id}
                  variant={finishId === item.id ? "primary" : "outline"}
                  size="xs"
                  minH="11"
                  borderRadius="full"
                  aria-pressed={finishId === item.id}
                  onClick={() => setFinishId(item.id)}
                >
                  <Box
                    as="span"
                    w="3"
                    h="3"
                    borderRadius="full"
                    borderWidth="1px"
                    borderColor="border.strong"
                    style={{ backgroundColor: item.frameMain }}
                  />
                  {item.label}
                </Button>
              ))}
            </HStack>
          )}

          <HStack gap="1.5" flexWrap="wrap">
            <Text fontSize="xs" fontWeight="700" color="text.muted" mr="1">
              Vidrio:
            </Text>
            {GLASS_TINTS.map((item) => (
              <Button
                key={item.id}
                variant={tintId === item.id ? "primary" : "outline"}
                size="xs"
                minH="11"
                borderRadius="full"
                aria-pressed={tintId === item.id}
                onClick={() => setTintId(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </HStack>
        </Flex>
      )}

      {/* Visor ampliado fullscreen (dvh seguro) */}
      {activePhoto && (
        <DialogRoot
          open={isLightboxOpen}
          onOpenChange={(details) => setIsLightboxOpen(details.open)}
          size="full"
        >
          <DialogContent bg="brand.ink" color="white" minH="100dvh">
            <DialogCloseTrigger color="white" />
            <DialogBody
              display="flex"
              alignItems="center"
              justifyContent="center"
              p={{ base: "4", md: "8" }}
              h="100dvh"
            >
              <Box position="relative" w="full" h="85dvh" maxW="6xl">
                <ResponsiveImage
                  src={activePhoto.src}
                  alt={activePhoto.title || `${serviceTitle} ${systemLabel}`}
                  isLCP
                  w="full"
                  h="full"
                  objectFit="contain"
                  sizes="100vw"
                />
              </Box>
            </DialogBody>
          </DialogContent>
        </DialogRoot>
      )}
    </VStack>
  );
};
