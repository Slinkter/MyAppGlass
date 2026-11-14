"use client";

import React, { useMemo, useState, useCallback } from "react";
import {
  Box,
  Grid,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Text,
  VStack,
  chakra,
} from "@chakra-ui/react";
import { ChevronDown, ClipboardList, MessageCircle } from "lucide-react";
import type { ServiceSpec } from "@/entities/service/model";
import {
  ALUMINUM_FINISHES,
  GLASS_TINTS,
  SystemArchitecturalSvg,
  archetypeSupportsAluminumFinish,
  resolveSystemSvgArchetype,
  resolveSystemSvgTechSpec,
  type AluminumFinishId,
  type GlassTintId,
} from "@/entities/system";
import { companyData } from "@/shared/config/company-data";
import { TRANSITIONS } from "@/shared/constants/motion";
import { Button } from "@/shared/ui/button";
import { Field } from "@/shared/ui/field";
import { createGroupMap } from "@/shared/utils/algorithm-utils";

interface ServiceSpecsSectionProps {
  specs: ServiceSpec[];
  serviceTitle: string;
  serviceSlug?: string;
  activeSystemName?: string;
}

const clampMeasure = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, Math.round(value)));

/**
 * Ficha técnica compacta en acordeón por grupo + plano SVG interactivo
 * para que el cliente personalice medidas, acabado de aluminio y tono de vidrio.
 */
const ServiceSpecsSectionInner: React.FC<ServiceSpecsSectionProps> = ({
  specs,
  serviceTitle,
  serviceSlug,
  activeSystemName,
}) => {
  const [openGroupIndex, setOpenGroupIndex] = useState<number | null>(0);
  const [widthCm, setWidthCm] = useState<number>(150);
  const [heightCm, setHeightCm] = useState<number>(120);
  const [widthDraft, setWidthDraft] = useState<string>("150");
  const [heightDraft, setHeightDraft] = useState<string>("120");
  const [finishId, setFinishId] = useState<AluminumFinishId>("champagne");
  const [tintId, setTintId] = useState<GlassTintId>("incoloro");

  const parsedWidth = Number(widthDraft);
  const parsedHeight = Number(heightDraft);
  const widthInvalid =
    widthDraft === "" || Number.isNaN(parsedWidth) || parsedWidth < 40 || parsedWidth > 400;
  const heightInvalid =
    heightDraft === "" || Number.isNaN(parsedHeight) || parsedHeight < 40 || parsedHeight > 300;

  const archetype = useMemo(
    () => resolveSystemSvgArchetype(serviceSlug, activeSystemName),
    [serviceSlug, activeSystemName],
  );
  const techSpec = useMemo(
    () => (activeSystemName ? resolveSystemSvgTechSpec(activeSystemName) : undefined),
    [activeSystemName],
  );
  const supportsAluminum = archetypeSupportsAluminumFinish(archetype);
  const activeFinish =
    ALUMINUM_FINISHES.find((item) => item.id === finishId) ?? ALUMINUM_FINISHES[0];
  const activeTint =
    GLASS_TINTS.find((item) => item.id === tintId) ?? GLASS_TINTS[0];

  const groupedSpecs = useMemo(() => {
    if (!specs || specs.length === 0) return [];
    const map = createGroupMap(specs, (spec) => spec.grupo?.trim() || "Especificaciones generales");
    return Array.from(map.entries());
  }, [specs]);

  const toggleGroup = useCallback((idx: number) => {
    setOpenGroupIndex((prev) => (prev === idx ? null : idx));
  }, []);

  if (!specs || specs.length === 0) return null;

  const customWhatsappUrl = `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(
    `Hola, quisiera cotizar ${serviceTitle} (${activeSystemName || "sistema"}) de ${widthCm} × ${heightCm} cm${supportsAluminum ? `, aluminio ${activeFinish.label}` : ""} y vidrio ${activeTint.label}.`,
  )}`;

  const summaryCards = [
    { label: "Vidrio compatible", value: techSpec?.glass || "Crudo, laminado o templado" },
    { label: "Capacidad por hoja", value: techSpec?.maxLeaf || "A medida según vano" },
    { label: "Cierre y herraje", value: techSpec?.hardware.split("·")[0]?.trim() || "Accesorios de serie" },
    {
      label: "Configuración SVG",
      value: `${widthCm} × ${heightCm} cm · ${supportsAluminum ? activeFinish.label : activeTint.label}`,
    },
  ];

  return (
    <Box id="ficha-tecnica" w="full" pt={{ base: "2", md: "4" }}>
      <VStack align="stretch" gap="4" w="full">
        <VStack align="flex-start" gap="1">
          <HStack gap="2" color="text.muted">
            <ClipboardList size={16} aria-hidden="true" />
            <Text fontSize="xs" fontWeight="700" textTransform="uppercase" letterSpacing="label">
              Especificaciones generales del servicio
            </Text>
          </HStack>
          <Heading as="h2" fontFamily="heading" size={{ base: "xl", md: "2xl" }} fontWeight="700" color="text.heading">
            Detalles constructivos de {serviceTitle}
          </Heading>
        </VStack>

        {activeSystemName && (
          <Grid
            templateColumns={{ base: "1fr", lg: "21.5rem 1fr" }}
            gap={{ base: "3.5", md: "5" }}
            alignItems="stretch"
            w="full"
          >
            {/* Panel izquierdo tonal (M3 Surface Container): controles + acción directa */}
            <VStack
              align="stretch"
              justify="space-between"
              gap="4"
              p={{ base: "4", md: "5" }}
              borderRadius="card"
              bg="bg.subtle"
              borderWidth="1px"
              borderColor="border.default"
            >
              <VStack align="stretch" gap="4">
                <VStack align="flex-start" gap="0.5">
                  <Text fontSize="xs" fontWeight="700" textTransform="uppercase" letterSpacing="label" color="text.muted">
                    Plano técnico SVG · {activeSystemName}
                  </Text>
                  <Text fontSize="xs" color="text.muted" lineHeight="1.5">
                    Ajusta medidas, aluminio y vidrio para actualizar el alzado técnico en vivo.
                  </Text>
                </VStack>

                <Grid templateColumns="repeat(2, 1fr)" gap="3" w="full">
                  <Field
                    label="Ancho (cm)"
                    invalid={widthInvalid}
                    errorText={widthInvalid ? "40–400 cm" : undefined}
                  >
                    <Input
                      id="spec-width-cm"
                      inputMode="numeric"
                      minH="12"
                      borderRadius="md"
                      bg="bg.page"
                      borderColor="border.default"
                      px="3.5"
                      fontSize="md"
                      fontWeight="600"
                      fontVariantNumeric="tabular-nums"
                      value={widthDraft}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/[^\d]/g, "");
                        setWidthDraft(raw);
                        const num = Number(raw);
                        if (raw && num >= 40 && num <= 400) {
                          setWidthCm(num);
                        }
                      }}
                      onBlur={() => {
                        const safe = clampMeasure(Number(widthDraft) || 150, 40, 400);
                        setWidthDraft(String(safe));
                        setWidthCm(safe);
                      }}
                    />
                  </Field>

                  <Field
                    label="Altura (cm)"
                    invalid={heightInvalid}
                    errorText={heightInvalid ? "40–300 cm" : undefined}
                  >
                    <Input
                      id="spec-height-cm"
                      inputMode="numeric"
                      minH="12"
                      borderRadius="md"
                      bg="bg.page"
                      borderColor="border.default"
                      px="3.5"
                      fontSize="md"
                      fontWeight="600"
                      fontVariantNumeric="tabular-nums"
                      value={heightDraft}
                      onChange={(e) => {
                        const raw = e.target.value.replace(/[^\d]/g, "");
                        setHeightDraft(raw);
                        const num = Number(raw);
                        if (raw && num >= 40 && num <= 300) {
                          setHeightCm(num);
                        }
                      }}
                      onBlur={() => {
                        const safe = clampMeasure(Number(heightDraft) || 120, 40, 300);
                        setHeightDraft(String(safe));
                        setHeightCm(safe);
                      }}
                    />
                  </Field>
                </Grid>

                {supportsAluminum && (
                  <VStack align="flex-start" gap="1.5">
                    <Text fontSize="xs" fontWeight="700" textTransform="uppercase" letterSpacing="label" color="text.muted">
                      Acabado de aluminio ({activeFinish.label})
                    </Text>
                    <HStack gap="1.5" flexWrap="wrap">
                      {ALUMINUM_FINISHES.map((item) => (
                        <Button
                          key={item.id}
                          variant={finishId === item.id ? "primary" : "outline"}
                          size="xs"
                          minH="11"
                          px="3"
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
                            bg={item.frameMain}
                          />
                          {item.label}
                        </Button>
                      ))}
                    </HStack>
                  </VStack>
                )}

                <VStack align="flex-start" gap="1.5">
                  <Text fontSize="xs" fontWeight="700" textTransform="uppercase" letterSpacing="label" color="text.muted">
                    Tono de vidrio ({activeTint.label})
                  </Text>
                  <HStack gap="1.5" flexWrap="wrap">
                    {GLASS_TINTS.map((item) => (
                      <Button
                        key={item.id}
                        variant={tintId === item.id ? "primary" : "outline"}
                        size="xs"
                        minH="11"
                        px="3"
                        borderRadius="full"
                        aria-pressed={tintId === item.id}
                        onClick={() => setTintId(item.id)}
                      >
                        {item.label}
                      </Button>
                    ))}
                  </HStack>
                </VStack>
              </VStack>

              <VStack align="stretch" gap="2.5" pt="2" borderTopWidth="1px" borderColor="border.default">
                <Text fontSize="xs" color="text.muted" fontVariantNumeric="tabular-nums">
                  {widthCm} × {heightCm} cm{supportsAluminum ? ` · Aluminio ${activeFinish.label}` : ""} · Vidrio {activeTint.label}
                </Text>
                <Button
                  asChild
                  variant="primary"
                  size="md"
                  minH="11"
                  w="full"
                  borderRadius="full"
                >
                  <a href={customWhatsappUrl} target="_blank" rel="noopener noreferrer">
                    <MessageCircle size={16} aria-hidden="true" />
                    Cotizar estas medidas
                  </a>
                </Button>
              </VStack>
            </VStack>

            {/* Tarjeta derecha limpia: Plano SVG 100% adaptable sin scroll horizontal ni doble marco */}
            <Box
              borderRadius="card"
              borderWidth="1px"
              borderColor="border.default"
              bg="bg.page"
              p={{ base: "2", md: "3" }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Box w="full" maxW="full" aspectRatio="16/10" borderRadius="md" overflow="hidden">
                <SystemArchitecturalSvg
                  serviceSlug={serviceSlug}
                  systemName={activeSystemName}
                  finishId={finishId}
                  tintId={tintId}
                  widthCm={widthCm}
                  heightCm={heightCm}
                />
              </Box>
            </Box>
          </Grid>
        )}

        {/* Resumen rápido M3 en tarjetas tonales escaneables encima del acordeón */}
        <SimpleGrid columns={{ base: 2, lg: 4 }} gap="3" w="full">
          {summaryCards.map((item) => (
            <VStack
              key={item.label}
              align="flex-start"
              gap="0.5"
              p="3.5"
              borderRadius="card"
              bg="bg.subtle"
              borderWidth="1px"
              borderColor="border.subtle"
            >
              <Text fontSize="xs" fontWeight="700" color="text.muted">
                {item.label}
              </Text>
              <Text
                fontSize="sm"
                fontWeight="600"
                color="text.heading"
                lineHeight="1.35"
                fontVariantNumeric="tabular-nums"
              >
                {item.value}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>

        <VStack gap="2.5" w="full" align="stretch">
          {groupedSpecs.map(([groupName, items], groupIdx) => {
            const isOpen = openGroupIndex === groupIdx;
            const panelId = `spec-group-panel-${groupIdx}`;
            return (
              <Box
                key={groupName}
                w="full"
                borderRadius="card"
                borderWidth="1px"
                borderColor="border.default"
                bg="bg.page"
                overflow="hidden"
              >
                <chakra.button
                  type="button"
                  w="full"
                  minH="11"
                  px={{ base: "4", md: "5" }}
                  py="3"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  textAlign="left"
                  cursor="pointer"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleGroup(groupIdx)}
                  transition={TRANSITIONS.interactive}
                  _hover={{ bg: "state.hover" }}
                  _active={{ bg: "state.pressed" }}
                  _focusVisible={{
                    outline: "2px solid",
                    outlineColor: "ring.primary",
                    outlineOffset: "-2px",
                  }}
                  _motionReduce={{ transition: "none" }}
                >
                  <HStack gap="2.5" minW={0}>
                    <Heading as="h3" fontSize={{ base: "sm", md: "md" }} fontWeight="700" color="text.heading">
                      {groupName}
                    </Heading>
                    <Text fontSize="xs" color="text.muted" flexShrink={0}>
                      ({items.length})
                    </Text>
                  </HStack>
                  <Box
                    color="text.heading"
                    transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                    transition={TRANSITIONS.fadeTransform}
                    _motionReduce={{ transition: "none" }}
                    flexShrink={0}
                    aria-hidden="true"
                  >
                    <ChevronDown size={18} />
                  </Box>
                </chakra.button>

                {isOpen && (
                  <Box id={panelId} borderTopWidth="1px" borderColor="border.subtle">
                    <Box display={{ base: "none", md: "block" }} w="full">
                      <chakra.table w="full" borderCollapse="collapse">
                        <chakra.tbody>
                          {items.map((spec, idx) => (
                            <chakra.tr
                              key={`${spec.label}-${idx}`}
                              borderBottomWidth={idx < items.length - 1 ? "1px" : "0"}
                              borderColor="border.subtle"
                            >
                              <chakra.th
                                scope="row"
                                w={{ md: "16rem", lg: "18rem" }}
                                px="5"
                                py="3"
                                textAlign="left"
                                fontSize="sm"
                                fontWeight="600"
                                color="text.heading"
                                verticalAlign="top"
                              >
                                {spec.label}
                              </chakra.th>
                              <chakra.td
                                px="5"
                                py="3"
                                fontSize="sm"
                                color="text.body"
                                fontVariantNumeric="tabular-nums"
                                lineHeight="relaxed"
                              >
                                {spec.value}
                              </chakra.td>
                            </chakra.tr>
                          ))}
                        </chakra.tbody>
                      </chakra.table>
                    </Box>

                    <VStack display={{ base: "flex", md: "none" }} align="stretch" gap="0" w="full">
                      {items.map((spec, idx) => (
                        <VStack
                          key={`${spec.label}-${idx}`}
                          align="stretch"
                          gap="0.5"
                          px="4"
                          py="3"
                          borderBottomWidth={idx < items.length - 1 ? "1px" : "0"}
                          borderColor="border.subtle"
                        >
                          <Text fontSize="xs" fontWeight="700" color="text.heading">
                            {spec.label}
                          </Text>
                          <Text
                            fontSize="sm"
                            color="text.body"
                            fontVariantNumeric="tabular-nums"
                            lineHeight="relaxed"
                          >
                            {spec.value}
                          </Text>
                        </VStack>
                      ))}
                    </VStack>
                  </Box>
                )}
              </Box>
            );
          })}
        </VStack>
      </VStack>
    </Box>
  );
};

export const ServiceSpecsSection = React.memo(ServiceSpecsSectionInner);
ServiceSpecsSection.displayName = "ServiceSpecsSection";
