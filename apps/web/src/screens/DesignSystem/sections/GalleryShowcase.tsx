"use client";

import React, { useCallback, useState } from "react";
import { Box, Flex, Heading, HStack, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import Gallery from "@/shared/components/common/Gallery";
import { TOUCH_MIN } from "@/shared/constants/layout";
import { DUR_CSS, EASE_SOFT } from "@/shared/constants/motion";
import type { GalleryItem } from "@/shared/types/gallery";
import { ShowcaseCard, ShowcasePanel, ShowcaseStack, SubsectionLabel } from "../components";

const sampleGallery: GalleryItem[] = [
  {
    id: "gal-1",
    src: "/images/services-products-01.Ventanas-nova-a10.webp",
    title: "Ventana Corrediza Sistema Nova",
  },
  {
    id: "gal-2",
    src: "/images/services-products-02.Mampara-save-mampara01.webp",
    title: "Mampara de Cristal Templado",
  },
  {
    id: "gal-3",
    src: "/images/services-products-03.Ducha-ducha01.webp",
    title: "Ducha de Vidrio Templado",
  },
];

const catalogSpecs = [
  { sistema: "Sistema Nova", vidrio: "Laminado · Incoloro", aluminio: "Negro" },
  { sistema: "Serie 35", vidrio: "Templado · Incoloro", aluminio: "Mate" },
  { sistema: "Serie 25", vidrio: "Templado · Bronce", aluminio: "Blanco" },
];

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Composición idéntica a la de producción (`ServicePageLayout`): contenedor con
 * altura responsive fija y `Gallery.Viewer` + `Gallery.Thumbnails` como hijos
 * directos de un Flex. El Viewer no tiene alto propio: ocupa el espacio restante.
 */
const GALLERY_HEIGHT = { base: "23.75rem", sm: "27.5rem", md: "26.25rem", lg: "28.75rem" };

interface GalleryStageProps {
  images: GalleryItem[];
  onActiveImageChange?: (image: GalleryItem, index: number) => void;
}

const GalleryStage: React.FC<GalleryStageProps> = ({ images, onActiveImageChange }) => (
  <Box
    h={GALLERY_HEIGHT}
    position="relative"
    w="full"
    minW="0"
    overflow="hidden"
    borderRadius={{ base: "2xl", lg: "3xl" }}
    borderWidth="1px"
    borderColor="border.default"
    role="region"
    aria-label="Galería de imágenes de ejemplo"
    css={{
      "& button[aria-label^='Ampliar imagen']": {
        minWidth: "var(--chakra-spacing-11) !important",
        minHeight: "var(--chakra-spacing-11) !important",
        width: "var(--chakra-spacing-11) !important",
        height: "var(--chakra-spacing-11) !important",
      },
      "& button[aria-label^='Ir a imagen']": {
        minWidth: "var(--chakra-spacing-11) !important",
        minHeight: "var(--chakra-spacing-11) !important",
        width: "var(--chakra-spacing-11) !important",
        height: "var(--chakra-spacing-11) !important",
      },
    }}
  >
    <Gallery images={images} onActiveImageChange={onActiveImageChange}>
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={{ base: "2", md: "4" }}
        h="100%"
        w="100%"
        p={{ base: "0", md: "2" }}
        minW="0"
        overflow="hidden"
      >
        <Gallery.Viewer />
        <Gallery.Thumbnails />
      </Flex>
    </Gallery>
  </Box>
);

/* ---------- A. Galería compuesta ---------- */
const CompositeGallery: React.FC = () => {
  const [active, setActive] = useState({ index: 0, title: sampleGallery[0].title });

  const handleChange = useCallback((image: GalleryItem, index: number) => {
    setActive((prev) =>
      prev.index === index && prev.title === image.title
        ? prev
        : { index, title: image.title ?? "" },
    );
  }, []);

  return (
    <ShowcasePanel
      bg="bg.surface"
      borderRadius="modal"
      borderWidth="1px"
      borderColor="border.default"
      maxW="pageNarrow"
      mx="auto"
      w="full"
      minW="0"
      p={{ base: "4", sm: "5", md: "6" }}
    >
      <Flex justify="space-between" align="center" gap="3" mb={{ base: "3", md: "4" }}>
        <HStack gap="2">
          <SubsectionLabel>Galería compuesta</SubsectionLabel>
          <Badge variant={"neutral" as never} size="sm">
            Referencia
          </Badge>
        </HStack>
        <Text
          fontSize="xs"
          fontWeight="bold"
          letterSpacing="widest"
          fontVariantNumeric="tabular-nums"
          color="text.heading"
          flexShrink={0}
        >
          {pad(active.index + 1)}{" "}
          <Text as="span" color="text.muted">
            / {pad(sampleGallery.length)}
          </Text>
        </Text>
      </Flex>

      <GalleryStage images={sampleGallery} onActiveImageChange={handleChange} />

      <Box
        mt={{ base: "4", md: "5" }}
        pt={{ base: "4", md: "5" }}
        borderTopWidth="1px"
        borderColor="border.default"
      >
        <Flex
          direction={{ base: "column", sm: "row" }}
          justify="space-between"
          align={{ base: "start", sm: "center" }}
          gap="3"
        >
          <Box minW="0" flex="1">
            <SubsectionLabel>Pieza en exhibición</SubsectionLabel>
            <Heading
              as="h3"
              fontFamily="heading"
              fontSize={{ base: "md", md: "lg" }}
              fontWeight="500"
              color="text.heading"
              lineClamp={2}
              mt="1"
            >
              {active.title}
            </Heading>
          </Box>
          <HStack gap="2" flexShrink={0}>
            <Badge variant={"" as never} size="sm">
              Vidriería & Aluminio
            </Badge>
          </HStack>
        </Flex>
      </Box>
    </ShowcasePanel>
  );
};

/* ---------- B. Galería + ficha técnica (como /servicios/[slug]) ---------- */
const specRows = [
  { label: "Sistema", value: "Serie 62" },
  { label: "Vidrio", value: "Templado · Incoloro" },
  { label: "Aluminio", value: "Negro" },
];

const ProductGallery: React.FC = () => (
  <SimpleGrid columns={{ base: 1, lg: 12 }} gap={{ base: "4", lg: "6" }} w="full" minW="0">
    <Box gridColumn={{ lg: "span 7" }} minW="0">
      <GalleryStage images={sampleGallery} />
    </Box>
    <VStack
      align="stretch"
      gap={{ base: "3", md: "4" }}
      gridColumn={{ lg: "span 5" }}
      minW="0"
      p={{ base: "4", md: "6" }}
      bg="bg.surface"
      borderWidth="1px"
      borderColor="border.default"
      borderRadius={{ base: "2xl", lg: "3xl" }}
    >
      <SubsectionLabel>Ficha técnica</SubsectionLabel>
      <Heading
        as="h3"
        fontFamily="heading"
        fontSize={{ base: "xl", md: "2xl" }}
        fontWeight="500"
        color="text.heading"
        lineClamp={2}
      >
        Mampara de Cristal Templado
      </Heading>
      <VStack align="stretch" gap="0" separator={<Box borderTopWidth="1px" borderColor="border.default" />}>
        {specRows.map((row) => (
          <Flex key={row.label} justify="space-between" gap="3" py="2.5" minW="0">
            <Text fontSize="sm" color="text.muted" flexShrink={0}>
              {row.label}
            </Text>
            <Text
              fontSize="sm"
              fontWeight="semibold"
              color="text.heading"
              textAlign="end"
              minW="0"
              fontVariantNumeric="tabular-nums"
            >
              {row.value}
            </Text>
          </Flex>
        ))}
      </VStack>
      <Button variant="primary" size="lg" minH={TOUCH_MIN} w="full">
        Cotizar este producto
      </Button>
    </VStack>
  </SimpleGrid>
);

/* ---------- C. Mosaico editorial ---------- */
interface MosaicCellProps {
  item: GalleryItem;
  ratio: string;
  large?: boolean;
}

const MosaicCell: React.FC<MosaicCellProps> = ({ item, ratio, large }) => (
  <Box
    as="figure"
    m="0"
    position="relative"
    overflow="hidden"
    borderRadius="xl"
    bg="bg.subtle"
    aspectRatio={{ base: ratio, md: "auto" }}
    minH={{ md: "0" }}
    gridColumn={large ? { md: "span 2" } : undefined}
    gridRow={large ? { md: "span 2" } : undefined}
    role="group"
  >
    <Image
      src={item.src}
      alt={item.title ?? ""}
      loading="lazy"
      decoding="async"
      w="100%"
      h="100%"
      objectFit="cover"
      transition={`transform ${DUR_CSS.toggle} ${EASE_SOFT}`}
      _groupHover={{ transform: "scale(1.04)" }}
    />
    <Box
      as="figcaption"
      position="absolute"
      left={{ base: "2", md: "3" }}
      right={{ base: "2", md: "3" }}
      bottom={{ base: "2", md: "3" }}
      p={{ base: "2.5", md: "3" }}
      borderRadius="lg"
      bg="overlay.glass"
      backdropFilter="blur(0.5rem)"
      pointerEvents="none"
    >
      <Text
        fontSize={large ? { base: "sm", md: "md" } : "sm"}
        fontWeight="semibold"
        color="white"
        lineClamp={2}
      >
        {item.title}
      </Text>
    </Box>
  </Box>
);

const MosaicGallery: React.FC = () => (
  <ShowcasePanel bg="bg.surface" borderRadius="card" maxW="pageNarrow" mx="auto" w="full" minW="0">
    <SimpleGrid
      columns={{ base: 1, md: 3 }}
      gap={{ base: "4", md: "6" }}
      gridTemplateRows={{ md: "repeat(2, 11rem)" }}
    >
      <MosaicCell item={sampleGallery[0]} ratio="4 / 3" large />
      <MosaicCell item={sampleGallery[1]} ratio="16 / 9" />
      <MosaicCell item={sampleGallery[2]} ratio="16 / 9" />
    </SimpleGrid>
  </ShowcasePanel>
);

/* ---------- D. Grilla de catálogo ---------- */
const CatalogGrid: React.FC = () => (
  <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} gap={{ base: "4", md: "6" }} maxW="pageNarrow" mx="auto" w="full">
    {sampleGallery.map((item, i) => {
      const spec = catalogSpecs[i];
      return (
        <Flex
          key={item.id}
          direction="column"
          bg="bg.surface"
          borderWidth="1px"
          borderColor="border.default"
          borderRadius="xl"
          overflow="hidden"
          minW="0"
        >
          <Box aspectRatio="4 / 3" bg="bg.subtle">
            <Image
              src={item.src}
              alt={item.title ?? ""}
              loading="lazy"
              decoding="async"
              w="100%"
              h="100%"
              objectFit="cover"
            />
          </Box>
          <Flex direction="column" gap="2" p={{ base: "3", md: "5" }} flex="1">
            <Heading as="h3" fontSize="md" color="text.heading" lineClamp={2}>
              {item.title}
            </Heading>
            <Text fontSize="xs" color="text.muted" lineClamp={2}>
              {spec.sistema} · {spec.vidrio} · Aluminio {spec.aluminio}
            </Text>
            <Button variant="outline" minH={TOUCH_MIN} w="full" mt="auto">
              Ver detalles
            </Button>
          </Flex>
        </Flex>
      );
    })}
  </SimpleGrid>
);

export const GalleryShowcase: React.FC = () => (
  <ShowcaseStack>
    <ShowcaseCard
      title="Galería compuesta"
      description="Gallery real con contador, miniaturas y título de la imagen activa. El visor incluye botón Ampliar (modal a pantalla completa), flechas y gesto de deslizar."
      badge="shared/components/common"
    >
      <CompositeGallery />
    </ShowcaseCard>

    <ShowcaseCard
      title="Galería + ficha técnica"
      description="Composición de la página de servicio: galería real con altura responsive a la izquierda y ficha técnica con CTA a la derecha. El botón es demostrativo."
      badge="shared/components/common"
    >
      <ProductGallery />
    </ShowcaseCard>

    <ShowcaseCard
      title="Mosaico editorial"
      description="Composición tipo bento de tres imágenes con leyenda de vidrio sobre la foto. Solo presentación: sin modal ni navegación."
    >
      <MosaicGallery />
    </ShowcaseCard>

    <ShowcaseCard
      title="Grilla de catálogo"
      description="Tarjetas con imagen 4:3, título y especificaciones de ejemplo. Solo presentación: el botón es demostrativo y no abre modal."
    >
      <CatalogGrid />
    </ShowcaseCard>
  </ShowcaseStack>
);
