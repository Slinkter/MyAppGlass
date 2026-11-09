"use client";

import React, { useState } from "react";
import {
  Badge,
  Box,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  Layers,
  FileText,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { companyData } from "@/shared/config/company-data";
import {
  ShowcaseCard,
  ShowcasePanel,
  ShowcaseStack,
  SubsectionLabel,
} from "../../components";

/**
 * Insignia Antirruido Oficial (AcousticRatingBadge)
 * Conforme a DESIGN-SYSTEM.md §2.7:
 * - Píldora con borde navy y fondo tintNavy.
 * - 5 segmentos discretos donde filledCount = Math.round(percentage / 20).
 * - Etiqueta en texto en negrita: -{percentage}% antirruido (doble 'r').
 */
export interface AcousticRatingBadgeProps {
  system: string;
  percentage: number;
}

export const AcousticRatingBadge: React.FC<AcousticRatingBadgeProps> = ({
  percentage,
}) => {
  const filledCount = Math.round(percentage / 20);

  return (
    <Box
      display="inline-flex"
      alignItems="center"
      gap="2.5"
      borderRadius="full"
      px="3.5"
      py="1.5"
      borderWidth="1px"
      borderColor="accent.navy"
      bg="bg.tintNavy"
    >
      <HStack gap="1" align="center">
        {Array.from({ length: 5 }).map((_, index) => (
          <Box
            key={index}
            w="2.5"
            h="2.5"
            borderRadius="xs"
            bg={index < filledCount ? "accent.navy" : "border.warmStrong"}
            style={{ flexShrink: 0 }}
          />
        ))}
      </HStack>
      <Text fontSize="xs" fontWeight="bold" color="accent.navy">
        -{percentage}% antirruido
      </Text>
    </Box>
  );
};

/* Catálogo Oficial de los 4 Sistemas con Atenuación Acústica Certificada */
const ACOUSTIC_SYSTEMS = [
  {
    name: "Serie 25",
    percentage: 50,
    filledSegments: 3,
    description:
      "Aislamiento residencial equilibrado con felpa perimetral y perfilería esbelta de aluminio hermético.",
    recommendation: "Dormitorios y salas en zonas residenciales moderadas.",
  },
  {
    name: "Serie 62",
    percentage: 70,
    filledSegments: 4,
    description:
      "Perfilería pesada de alto desempeño acústico diseñada para avenidas principales y tráfico continuo.",
    recommendation: "Edificaciones frente a avenidas y vías de alto tránsito.",
  },
  {
    name: "Acústica",
    percentage: 80,
    filledSegments: 4,
    description:
      "Sistema especializado con perfiles de rotura acústica y doble felpa siliconada de máxima atenuación.",
    recommendation: "Estudios de audio, oficinas corporativas y dormitorios críticos.",
  },
  {
    name: "PVC abatible",
    percentage: 80,
    filledSegments: 4,
    description:
      "Perfiles multicámara de PVC de alta masa con cierre perimetral multipunto de máxima hermeticidad.",
    recommendation: "Aislamiento termoacústico integral y protección contra ruidos graves.",
  },
] as const;

/* Catálogo Oficial de los 6 Sistemas Homologados */
const OFFICIAL_SYSTEMS = [
  {
    name: "Sistema Nova",
    openingTypes: ["Corrediza"],
    acousticPercentage: null,
    basePrice: 480,
    description:
      "Carpintería tradicional de aluminio con rodamientos regulables para hojas corredizas estándar.",
    features: [
      "Perfilería de aluminio liviano de alta durabilidad",
      "Rodamientos de nylon con desplazamiento suave",
      "Solución eficiente para ventanas interiores",
    ],
  },
  {
    name: "Serie 25",
    openingTypes: ["Corrediza", "Proyectante"],
    acousticPercentage: 50,
    basePrice: 720,
    description:
      "Perfilería residencial de mayor rigidez con doble sello perimetral y reducción certificada del 50%.",
    features: [
      "Felpa perimetral hidrófuga contra viento y polvo",
      "Aislamiento antirruido moderado de -50%",
      "Cierre embutido hermético con tirador de precisión",
    ],
  },
  {
    name: "Serie 35",
    openingTypes: ["Corrediza", "Luz Fija"],
    acousticPercentage: null,
    basePrice: 890,
    description:
      "Sistema semipesado para mamparas amplias y ventanales con paños fijos de alta rigidez estructural.",
    features: [
      "Refuerzo tubular para paños de gran altura",
      "Guías inferiores reforzadas para tránsito continuo",
      "Hermeticidad reforzada ante corrientes de aire",
    ],
  },
  {
    name: "Serie 62",
    openingTypes: ["Corrediza", "Batiente"],
    acousticPercentage: 70,
    basePrice: 1240,
    description:
      "Perfilería pesada de máxima rigidez para vidrio laminado con reducción acústica certificada del 70%.",
    features: [
      "Cámara perimetral de descompresión y drenaje",
      "Aislamiento de -70% antirruido para alto tráfico",
      "Herrajes multipunto europeos de cierre hermético",
    ],
  },
  {
    name: "Acústica",
    openingTypes: ["Batiente", "Proyectante", "Luz Fija"],
    acousticPercentage: 80,
    basePrice: 1520,
    description:
      "Sistema técnico con doble felpa siliconada y cámaras múltiples para una atenuación acústica del 80%.",
    features: [
      "Aislamiento acústico superior de -80% antirruido",
      "Sello perimetral de doble contacto con caucho EPDM",
      "Capacidad para vidrio laminado acústico grueso",
    ],
  },
  {
    name: "PVC abatible",
    openingTypes: ["Batiente", "Proyectante"],
    acousticPercentage: 80,
    basePrice: 1680,
    description:
      "Perfiles multicámara de PVC con refuerzo interno de acero y sellado hermético perimetral soldado.",
    features: [
      "Aislamiento termoacústico del 80% sin puentes térmicos",
      "Cierre perimetral con bulones de seguridad",
      "Inmune a la corrosión salina y humedad extrema",
    ],
  },
] as const;

/* Vidrios Oficiales (sin sufijo de grosor) */
const OFFICIAL_GLASS_TYPES = [
  { name: "Crudo", modifier: 0, tag: "Vidrio flotado estándar monolítico" },
  { name: "Laminado", modifier: 180, tag: "Vidrio de seguridad con interlámina PVB acústica" },
  { name: "Templado", modifier: 240, tag: "Vidrio tratado térmicamente de alta resistencia" },
] as const;

/* Acabados de Aluminio Oficiales */
const OFFICIAL_ALUMINUM_COLORS = [
  { name: "Negro", modifier: 0, swatch: "#1A1A1A" },
  { name: "Mate", modifier: 40, swatch: "#C0C0C0" },
  { name: "Blanco", modifier: 20, swatch: "#F5F5F5" },
  { name: "Madera", modifier: 120, swatch: "#8B5A2B" },
  { name: "Champagne", modifier: 90, swatch: "#C5B396" },
] as const;

export const BrandModulesV2Showcase: React.FC = () => {
  const [selectedSystemName, setSelectedSystemName] = useState<string>("Serie 62");
  const [selectedGlassName, setSelectedGlassName] = useState<string>("Laminado");
  const [selectedFinishName, setSelectedFinishName] = useState<string>("Negro");

  const activeSystem =
    OFFICIAL_SYSTEMS.find((s) => s.name === selectedSystemName) ??
    OFFICIAL_SYSTEMS[3];

  const activeGlass =
    OFFICIAL_GLASS_TYPES.find((g) => g.name === selectedGlassName) ??
    OFFICIAL_GLASS_TYPES[1];

  const activeFinish =
    OFFICIAL_ALUMINUM_COLORS.find((f) => f.name === selectedFinishName) ??
    OFFICIAL_ALUMINUM_COLORS[0];

  const referenceTotal =
    activeSystem.basePrice + activeGlass.modifier + activeFinish.modifier;

  return (
    <ShowcaseStack>
      {/* SECCIÓN A: Insignia Antirruido Oficial */}
      <ShowcaseCard
        title="Insignia Antirruido Oficial (AcousticRatingBadge)"
        description="Píldora normalizada con 5 segmentos discretos proporcionales a round(%/20) y cálculo de reducción certificada según DESIGN-SYSTEM.md §2.7."
        badge="Marca v2 §2.7"
      >
        <ShowcasePanel p={{ base: "3", md: "6" }} borderRadius="xl">
          <VStack align="stretch" gap={{ base: "4", md: "6" }}>
            <Box>
              <SubsectionLabel mb="2">
                Especificación del componente canónico
              </SubsectionLabel>
              <Text fontSize="sm" color="text.body" maxW="3xl">
                La insignia antirruido se genera con 5 barras discretas de relleno. Cada barra equivale a un 20% de atenuación. El texto utiliza obligatoriamente la grafía correcta en español <strong>&quot;antirruido&quot;</strong> con doble &apos;r&apos;, token de color <code>accent.navy</code> y contenedor de fondo <code>bg.tintNavy</code>.
              </Text>
            </Box>

            {/* Grid responsive en 360px (1 col), 768px (2 cols), 1280px (4 cols) */}
            <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="4">
              {ACOUSTIC_SYSTEMS.map((item) => (
                <Box
                  key={item.name}
                  p="4"
                  borderRadius="xl"
                  borderWidth="1px"
                  borderColor="border.warmStrong"
                  bg="bg.warm"
                  display="flex"
                  flexDirection="column"
                  justifyContent="space-between"
                  gap="4"
                >
                  <VStack align="start" gap="2">
                    <HStack justify="space-between" w="full" align="center">
                      <Text
                        fontFamily="heading"
                        fontSize="lg"
                        fontWeight="bold"
                        color="text.heading"
                      >
                        {item.name}
                      </Text>
                      <Badge
                        fontSize="xs"
                        px="2"
                        py="0.5"
                        borderRadius="full"
                        bg="bg.surface"
                        borderWidth="1px"
                        borderColor="border.warmStrong"
                        color="text.muted"
                      >
                        {item.filledSegments} / 5 barras
                      </Badge>
                    </HStack>
                    <Text fontSize="xs" color="text.muted">
                      {item.description}
                    </Text>
                  </VStack>

                  <VStack align="start" gap="3">
                    <AcousticRatingBadge
                      system={item.name}
                      percentage={item.percentage}
                    />
                    <Box
                      pt="2"
                      borderTopWidth="1px"
                      borderColor="border.warm"
                      w="full"
                    >
                      <Text fontSize="xs" color="text.muted">
                        <strong>Uso:</strong> {item.recommendation}
                      </Text>
                    </Box>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </VStack>
        </ShowcasePanel>
      </ShowcaseCard>

      {/* SECCIÓN B: Explorador Técnico Interactivo & Presupuesto v2 */}
      <ShowcaseCard
        title="Explorador Técnico de Sistemas & Membrete Presupuesto v2"
        description="Selector de los 6 sistemas homologados, tipos de vidrio y acabados con visualización en vivo de la hoja de presupuesto canónica."
        badge="Presupuesto v2 §2.2 & §5.1"
      >
        <ShowcasePanel p={{ base: "3", md: "6" }} borderRadius="xl">
          <VStack align="stretch" gap={{ base: "5", md: "8" }}>
            {/* Barra selectora de Sistemas con touch target >= 44px (minH="11") */}
            <Box>
              <SubsectionLabel mb="2">
                1. Selección de Sistema Oficial (6 homologados)
              </SubsectionLabel>
              <Box
                overflowX="auto"
                pb="2"
                css={{
                  "&::-webkit-scrollbar": { display: "none" },
                  scrollbarWidth: "none",
                }}
              >
                <HStack gap="2" flexWrap={{ base: "nowrap", md: "wrap" }}>
                  {OFFICIAL_SYSTEMS.map((system) => {
                    const isSelected = system.name === selectedSystemName;
                    return (
                      <Box
                        as="button"
                        key={system.name}
                        onClick={() => setSelectedSystemName(system.name)}
                        minH="11"
                        px="4"
                        borderRadius="full"
                        borderWidth="1px"
                        borderColor={
                          isSelected ? "accent.navy" : "border.warmStrong"
                        }
                        bg={isSelected ? "accent.navy" : "bg.surface"}
                        color={isSelected ? "accent.navyContrast" : "text.heading"}
                        fontSize="sm"
                        fontWeight={isSelected ? "bold" : "medium"}
                        display="inline-flex"
                        alignItems="center"
                        gap="2"
                        flexShrink={0}
                        cursor="pointer"
                        transition="background-color 0.2s ease, border-color 0.2s ease"
                        _hover={{
                          borderColor: "accent.navy",
                        }}
                      >
                        <Layers size={14} style={{ flexShrink: 0 }} />
                        {system.name}
                      </Box>
                    );
                  })}
                </HStack>
              </Box>
            </Box>

            {/* Layout Master-Detail: 7 cols ficha técnica / 5 cols presupuesto */}
            <SimpleGrid columns={{ base: 1, lg: 12 }} gap={{ base: "4", md: "6" }}>
              {/* LADO IZQUIERDO: Ficha Técnica (7 columnas) */}
              <Box
                gridColumn={{ base: "span 1", lg: "span 7" }}
                bg="bg.warm"
                borderWidth="1px"
                borderColor="border.warmStrong"
                borderRadius="xl"
                p={{ base: "4", md: "6" }}
              >
                <VStack align="stretch" gap="5">
                  <Box>
                    <HStack justify="space-between" align="start" wrap="wrap" gap="2">
                      <Box>
                        <Text
                          fontFamily="heading"
                          fontSize={{ base: "xl", md: "2xl" }}
                          fontWeight="bold"
                          color="text.heading"
                        >
                          {activeSystem.name}
                        </Text>
                        <Text fontSize="xs" color="text.muted" mt="1">
                          {activeSystem.description}
                        </Text>
                      </Box>
                      {activeSystem.acousticPercentage ? (
                        <AcousticRatingBadge
                          system={activeSystem.name}
                          percentage={activeSystem.acousticPercentage}
                        />
                      ) : (
                        <Badge
                          px="3"
                          py="1"
                          borderRadius="full"
                          bg="bg.tintNavy"
                          color="accent.navy"
                          borderWidth="1px"
                          borderColor="border.warmStrong"
                          fontSize="xs"
                          fontWeight="semibold"
                        >
                          Aislamiento estándar
                        </Badge>
                      )}
                    </HStack>
                  </Box>

                  {/* Tipos de apertura admitidos */}
                  <Box>
                    <SubsectionLabel mb="2">
                      Tipos de Apertura Homologados
                    </SubsectionLabel>
                    <HStack gap="2" wrap="wrap">
                      {activeSystem.openingTypes.map((type) => (
                        <Badge
                          key={type}
                          px="3"
                          py="1.5"
                          borderRadius="md"
                          bg="bg.surface"
                          borderWidth="1px"
                          borderColor="border.warmStrong"
                          color="text.heading"
                          fontSize="xs"
                          fontWeight="semibold"
                        >
                          <Check size={12} style={{ flexShrink: 0, marginRight: 4 }} />
                          {type}
                        </Badge>
                      ))}
                    </HStack>
                  </Box>

                  {/* Selector de Vidrio Oficial */}
                  <Box>
                    <SubsectionLabel mb="2">
                      2. Tipo de Vidrio Oficial (sin sufijo de grosor)
                    </SubsectionLabel>
                    <Box
                      overflowX="auto"
                      pb="1"
                      css={{
                        "&::-webkit-scrollbar": { display: "none" },
                        scrollbarWidth: "none",
                      }}
                    >
                      <HStack gap="2" flexWrap={{ base: "nowrap", md: "wrap" }}>
                        {OFFICIAL_GLASS_TYPES.map((glass) => {
                          const isSelected = glass.name === selectedGlassName;
                          return (
                            <Box
                              as="button"
                              key={glass.name}
                              onClick={() => setSelectedGlassName(glass.name)}
                              minH="11"
                              px="4"
                              borderRadius="full"
                              borderWidth="1px"
                              borderColor={
                                isSelected ? "accent.navy" : "border.warmStrong"
                              }
                              bg={isSelected ? "accent.navy" : "bg.surface"}
                              color={isSelected ? "accent.navyContrast" : "text.heading"}
                              fontSize="sm"
                              fontWeight={isSelected ? "bold" : "medium"}
                              display="inline-flex"
                              alignItems="center"
                              flexShrink={0}
                              cursor="pointer"
                              transition="background-color 0.2s ease, border-color 0.2s ease"
                              _hover={{
                                borderColor: "accent.navy",
                              }}
                            >
                              {glass.name}
                            </Box>
                          );
                        })}
                      </HStack>
                    </Box>
                    <Text fontSize="xs" color="text.muted" mt="1.5">
                      {activeGlass.tag}
                    </Text>
                  </Box>

                  {/* Selector de Acabado de Aluminio */}
                  <Box>
                    <SubsectionLabel mb="2">
                      3. Acabado de Perfilería de Aluminio (5 oficiales)
                    </SubsectionLabel>
                    <Box
                      overflowX="auto"
                      pb="1"
                      css={{
                        "&::-webkit-scrollbar": { display: "none" },
                        scrollbarWidth: "none",
                      }}
                    >
                      <HStack gap="2" flexWrap={{ base: "nowrap", md: "wrap" }}>
                        {OFFICIAL_ALUMINUM_COLORS.map((finish) => {
                          const isSelected = finish.name === selectedFinishName;
                          return (
                            <Box
                              as="button"
                              key={finish.name}
                              onClick={() => setSelectedFinishName(finish.name)}
                              minH="11"
                              px="4"
                              borderRadius="full"
                              borderWidth="1px"
                              borderColor={
                                isSelected ? "accent.navy" : "border.warmStrong"
                              }
                              bg={isSelected ? "accent.navy" : "bg.surface"}
                              color={isSelected ? "accent.navyContrast" : "text.heading"}
                              fontSize="sm"
                              fontWeight={isSelected ? "bold" : "medium"}
                              display="inline-flex"
                              alignItems="center"
                              gap="2"
                              flexShrink={0}
                              cursor="pointer"
                              transition="background-color 0.2s ease, border-color 0.2s ease"
                              _hover={{
                                borderColor: "accent.navy",
                              }}
                            >
                              <Box
                                w="3"
                                h="3"
                                borderRadius="full"
                                bg={finish.swatch}
                                borderWidth="1px"
                                borderColor="border.warmStrong"
                                style={{ flexShrink: 0 }}
                              />
                              {finish.name}
                            </Box>
                          );
                        })}
                      </HStack>
                    </Box>
                  </Box>

                  {/* Características técnicas del sistema */}
                  <Box
                    pt="3"
                    borderTopWidth="1px"
                    borderColor="border.warmStrong"
                  >
                    <SubsectionLabel mb="2">
                      Detalles de Ensamble e Instalación
                    </SubsectionLabel>
                    <VStack align="stretch" gap="1.5">
                      {activeSystem.features.map((feat, idx) => (
                        <HStack key={idx} align="start" gap="2">
                          <Box as="span" color="accent.navy" display="inline-flex" mt="0.5">
                            <Check size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                          </Box>
                          <Text fontSize="xs" color="text.body">
                            {feat}
                          </Text>
                        </HStack>
                      ))}
                    </VStack>
                  </Box>
                </VStack>
              </Box>

              {/* LADO DERECHO: Vista Canónica del Presupuesto v2 (5 columnas) */}
              <Box
                gridColumn={{ base: "span 1", lg: "span 5" }}
                bg="bg.tintNavy"
                borderWidth="1px"
                borderColor="border.warmStrong"
                borderRadius="xl"
                p={{ base: "4", md: "6" }}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <VStack align="stretch" gap="3">
                  {/* Membrete oficial de Marca v2 */}
                  <Box>
                    <Text
                      fontSize="xs"
                      fontWeight="bold"
                      letterSpacing="widest"
                      textTransform="uppercase"
                      color="text.muted"
                    >
                      VIDRIERÍA & ALUMINIO
                    </Text>
                    <Text
                      fontFamily="heading"
                      fontSize={{ base: "md", md: "lg" }}
                      fontWeight="bold"
                      color="accent.navy"
                      lineHeight="tight"
                      mt="0.5"
                    >
                      {companyData.companyName}
                    </Text>
                    {/* Palabra PRESUPUESTO reservada con brand.quoteRed */}
                    <Text
                      fontFamily="heading"
                      fontSize={{ base: "2xl", md: "3xl" }}
                      fontWeight="bold"
                      color="brand.quoteRed"
                      letterSpacing="wider"
                      my="1"
                    >
                      PRESUPUESTO
                    </Text>
                    <Text fontSize="xs" color="text.muted" fontStyle="italic">
                      Color brand.quoteRed (#D62828) reservado exclusivamente para la palabra &quot;PRESUPUESTO&quot;.
                    </Text>
                  </Box>

                  {/* Línea divisoria canónica de 2px de la hoja oficial */}
                  <Box h="2px" bg="text.heading" my="1" />

                  {/* Datos legales y de contacto tomados de companyData */}
                  <VStack align="stretch" gap="0.5" fontSize="xs">
                    <Text color="text.body" fontWeight="medium">
                      RUC {companyData.ruc} · {companyData.direccion}
                    </Text>
                    <Text color="text.muted">
                      WhatsApp: {companyData.whatsappDisplay} · {companyData.contactEmail}
                    </Text>
                  </VStack>

                  {/* Resumen dinámico del ítem presupuestado */}
                  <Box
                    bg="bg.warm"
                    p="3"
                    borderRadius="lg"
                    borderWidth="1px"
                    borderColor="border.warmStrong"
                    mt="2"
                  >
                    <VStack align="stretch" gap="2" fontSize="xs">
                      <HStack justify="space-between">
                        <Text color="text.muted">Sistema:</Text>
                        <Text fontWeight="bold" color="text.heading">
                          {activeSystem.name}
                        </Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text color="text.muted">Vidrio:</Text>
                        <Text fontWeight="semibold" color="text.heading">
                          {activeGlass.name}
                        </Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text color="text.muted">Acabado aluminio:</Text>
                        <Text fontWeight="semibold" color="text.heading">
                          {activeFinish.name}
                        </Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text color="text.muted">Apertura disponible:</Text>
                        <Text fontWeight="semibold" color="text.heading">
                          {activeSystem.openingTypes.join(" · ")}
                        </Text>
                      </HStack>
                      <HStack justify="space-between">
                        <Text color="text.muted">Rendimiento acústico:</Text>
                        <Text fontWeight="bold" color="accent.navy">
                          {activeSystem.acousticPercentage
                            ? `-${activeSystem.acousticPercentage}% antirruido`
                            : "Estándar residencial"}
                        </Text>
                      </HStack>
                    </VStack>
                  </Box>

                  {/* Monto total con Lora */}
                  <Box
                    pt="3"
                    borderTopWidth="1px"
                    borderColor="border.warmStrong"
                  >
                    <SubsectionLabel mb="1">
                      Total Estimado de Referencia
                    </SubsectionLabel>
                    <Text
                      fontFamily="heading"
                      fontSize={{ base: "2xl", md: "3xl" }}
                      fontWeight="bold"
                      color="text.heading"
                      lineHeight="none"
                    >
                      S/ {referenceTotal.toLocaleString("es-PE", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Text>
                    <Text fontSize="xs" color="text.muted" mt="1.5">
                      Incluye suministro, ensamblado en taller e instalación técnica certificada.
                    </Text>
                  </Box>
                </VStack>

                {/* Condiciones comerciales canónicas (§2.5) */}
                <Box
                  pt="3"
                  mt="4"
                  borderTopWidth="1px"
                  borderColor="border.warmStrong"
                >
                  <VStack align="stretch" gap="1" fontSize="xs" color="text.muted">
                    <Text>
                      • 50 % de anticipo a la firma y 50 % a la entrega conforme.
                    </Text>
                    <Text>
                      • Visita técnica sin costo · Garantía oficial en productos instalados.
                    </Text>
                    <Text>
                      • Horario de atención: lunes a viernes (días hábiles).
                    </Text>
                  </VStack>
                  <Button
                    variant="primary"
                    w="full"
                    minH="11"
                    mt="4"
                    fontSize="xs"
                  >
                    <FileText size={14} style={{ flexShrink: 0, marginRight: 6 }} />
                    Generar Hoja Canónica PDF
                  </Button>
                </Box>
              </Box>
            </SimpleGrid>
          </VStack>
        </ShowcasePanel>
      </ShowcaseCard>
    </ShowcaseStack>
  );
};
