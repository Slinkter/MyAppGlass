"use client";

import React, { useState } from "react";
import { Box, HStack, Input, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { GlassSystemCard, type SystemTier } from "../components/GlassSystemCard";
import { SectionHeaderV2 } from "../components/SectionHeaderV2";
import { ARCH_BORDER, ARCH_SURFACE, ARCH_TEXT, LIMA_TOP_DISTRICTS } from "../components/architecturalTokens";

const SYSTEM_TIERS: SystemTier[] = [
  {
    id: "nova",
    code: "SYS-01",
    label: "Sistema Nova",
    price: "Obra Multifamiliar",
    desc: "Carpintería en aluminio versátil para ventanas corredizas y paños de luz fija en departamentos y viviendas.",
    typology: "Corrediza · Luz Fija",
    glass: "Crudo / Templado",
    aluminum: "Negro / Mate / Blanco / Champagne",
    features: [
      "Vidrio crudo o templado en color Incoloro, Bronce o Gris",
      "Adicionales disponibles: Arenado o Diseño según cliente",
      "Fabricación en taller propio e instalación en Lima Top",
    ],
  },
  {
    id: "serie25",
    code: "SYS-02",
    label: "Serie 25",
    price: "Vivienda Estándar",
    desc: "Sistema corredizo calibrado para vanos residenciales medianos con rodamientos de alta durabilidad.",
    typology: "Corrediza",
    glass: "Crudo / Laminado",
    aluminum: "Mate / Blanco / Champagne",
    features: [
      "Deslizamiento suave con felpa perimetral hermética",
      "Compatible con vidrio Laminado o Crudo",
      "Garantía directa de 3 meses por instalación",
    ],
  },
  {
    id: "serie35",
    code: "SYS-03",
    label: "Serie 35",
    price: "Mamparas & Terrazas",
    desc: "Perfilería reforzada para mamparas de piso a techo y vanos amplios con mayor carga estructural.",
    typology: "Corrediza · Proyectante",
    glass: "Templado / Laminado",
    aluminum: "Negro / Madera / Mate",
    features: [
      "Apta para terrazas, balcones y salidas de patio",
      "Acabado aluminio Negro, Madera o Mate anodizado",
      "Cierres multipunto de alta resistencia",
    ],
  },
  {
    id: "serie62",
    code: "SYS-04",
    label: "Serie 62",
    price: "Alto Desempeño",
    desc: "Estanqueidad superior frente a viento y polvo urbano para fachadas residenciales y edificios corporativos.",
    typology: "Corrediza · Proyectante",
    glass: "Laminado / Templado",
    aluminum: "Negro / Blanco / Mate",
    features: [
      "Perfilería de alta inercia estructural",
      "Doble felpa y drenaje oculto en riel inferior",
      "Especificación frecuente en La Molina y San Isidro",
    ],
  },
  {
    id: "acustica",
    code: "SYS-05",
    label: "Acústica",
    price: "Ingeniería Antirruido",
    desc: "Sistema diseñado para atenuación antirruido en avenidas transitadas, dormitorios y salas de directorio.",
    typology: "Batiente · Proyectante",
    glass: "Laminado antirruido",
    aluminum: "Negro / Mate / Blanco",
    features: [
      "Sellado perimetral por compresión con empaque EPDM",
      "Vidrio Laminado de seguridad con lámina acústica",
      "Visita técnica y medición exacta sin costo en obra",
    ],
  },
  {
    id: "pvc",
    code: "SYS-06",
    label: "PVC abatible",
    price: "Máximo Hermetismo",
    desc: "Perfilería termofusionada batiente de baja transmitancia térmica y aislamiento acústico superior.",
    typology: "Batiente · Luz Fija",
    glass: "Laminado / Templado",
    aluminum: "Perfilería termoacústica",
    features: [
      "Esquinas termofusionadas libres de filtración de aire",
      "Herrajes perimetrales anticorrosivos para zona costera",
      "Recomendada en Miraflores y proyectos clínicos",
    ],
  },
];

const WINDOW_TYPES = ["Corrediza", "Proyectante", "Batiente", "Luz Fija"] as const;
const GLASS_TYPES = ["Crudo", "Laminado", "Templado"] as const;

export const FormsV2Section: React.FC = () => {
  const [selectedWindow, setSelectedWindow] = useState<string>("Corrediza");
  const [selectedGlass, setSelectedGlass] = useState<string>("Laminado");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("La Molina");
  const [contactInput, setContactInput] = useState<string>("");
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  return (
    <VStack align="stretch" gap={6}>
      <SectionHeaderV2
        code="04 · Selectores, Formularios & Botones"
        title="Configurador Óptico de los 6 Sistemas Oficiales"
        description="Tarjeta óptica glassmorphism (capa 10%) para inspeccionar los 6 sistemas reales del catálogo, acompañada de bloques sólidos de concreto y grafito para controles táctiles ≥ 44 px."
        spec="6 SISTEMAS · TARGETS ≥ 44PX"
      />

      <GlassSystemCard tiers={SYSTEM_TIERS} />

      <SimpleGrid columns={{ base: 1, lg: 12 }} gap={0} border="1px solid" borderColor={ARCH_BORDER.hairline}>
        {/* Left: Concrete Contrast Block with Button & Config Selectors */}
        <Box
          gridColumn={{ lg: "span 6" }}
          data-theme="light"
          bg={ARCH_SURFACE.concrete}
          color={ARCH_TEXT.onConcretePrimary}
          p={{ base: 5, md: 7 }}
          borderBottom={{ base: "1px solid", lg: "none" }}
          borderRight={{ lg: "1px solid" }}
          borderColor={ARCH_BORDER.concreteHairline}
        >
          <HStack justify="space-between" mb={5} pb={3} borderBottom="1px solid" borderColor={ARCH_BORDER.concreteHairline}>
            <Text fontFamily="mono" fontSize="xs" fontWeight="700" letterSpacing="0.16em" color={ARCH_TEXT.onConcreteMuted}>
              VARIANTES DE BOTÓN & SELECTOR DE VANO
            </Text>
            <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onConcreteMuted}>
              CONCRETO #F3F2EE
            </Text>
          </HStack>

          <Text fontFamily="mono" fontSize="xs" fontWeight="700" color={ARCH_TEXT.onConcreteMuted} mb={2}>
            TIPOLOGÍA DE VENTANA
          </Text>
          <HStack gap={2} flexWrap="wrap" mb={5}>
            {WINDOW_TYPES.map((type) => {
              const isSelected = selectedWindow === type;
              return (
                <Button
                  key={type}
                  variant={isSelected ? "primary" : "outline"}
                  size="sm"
                  minH="44px"
                  bg={isSelected ? "#0B0C0E" : "transparent"}
                  color={isSelected ? "#F3F2EE" : "#0B0C0E"}
                  borderColor="#0B0C0E"
                  _hover={{ bg: isSelected ? "#1E2024" : "#E8E6E0" }}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedWindow(type)}
                >
                  {type}
                </Button>
              );
            })}
          </HStack>

          <Text fontFamily="mono" fontSize="xs" fontWeight="700" color={ARCH_TEXT.onConcreteMuted} mb={2}>
            TIPO DE VIDRIO (3 OFICIALES)
          </Text>
          <HStack gap={2} flexWrap="wrap" mb={6}>
            {GLASS_TYPES.map((glass) => {
              const isSelected = selectedGlass === glass;
              return (
                <Button
                  key={glass}
                  variant={isSelected ? "primary" : "outline"}
                  size="sm"
                  minH="44px"
                  bg={isSelected ? "#0B0C0E" : "transparent"}
                  color={isSelected ? "#F3F2EE" : "#0B0C0E"}
                  borderColor="#0B0C0E"
                  _hover={{ bg: isSelected ? "#1E2024" : "#E8E6E0" }}
                  aria-pressed={isSelected}
                  onClick={() => setSelectedGlass(glass)}
                >
                  {glass}
                </Button>
              );
            })}
          </HStack>

          <HStack gap={3} pt={4} borderTop="1px solid" borderColor={ARCH_BORDER.concreteHairline} flexWrap="wrap">
            <Button
              variant="primary"
              size="md"
              minH="44px"
              bg="#0B0C0E"
              color="#F3F2EE"
              _hover={{ bg: "#1E2024" }}
              onClick={() =>
                setFeedbackMsg(
                  `Solicitud registrada: ${selectedWindow} · vidrio ${selectedGlass} en ${selectedDistrict}.`
                )
              }
            >
              Solicitar cotización <ArrowRight size={16} aria-hidden="true" />
            </Button>
            <Button variant="whatsapp" size="md" minH="44px" color="#FFFFFF">
              <MessageCircle size={16} aria-hidden="true" /> WhatsApp directo
            </Button>
            <Button
              variant="ghost"
              size="md"
              minH="44px"
              color="#0B0C0E"
              _hover={{ bg: "#E8E6E0" }}
              onClick={() =>
                setFeedbackMsg(`Ficha seleccionada: ${selectedWindow} con vidrio ${selectedGlass}.`)
              }
            >
              Ver ficha
            </Button>
          </HStack>
        </Box>

        {/* Right: Matte Steel Intake Form */}
        <Box gridColumn={{ lg: "span 6" }} bg={ARCH_SURFACE.steel} p={{ base: 5, md: 7 }}>
          <HStack justify="space-between" mb={5} pb={3} borderBottom="1px solid" borderColor={ARCH_BORDER.hairline}>
            <Text fontFamily="mono" fontSize="xs" fontWeight="700" letterSpacing="0.16em" color={ARCH_TEXT.onDarkPrimary}>
              SOLICITUD TÉCNICA · CONSTRUCTORAS
            </Text>
            <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkMuted} fontVariantNumeric="tabular-nums">
              {selectedWindow.toUpperCase()} · {selectedGlass.toUpperCase()}
            </Text>
          </HStack>

          <VStack align="stretch" gap={4}>
            <Box>
              <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkMuted} mb={2}>
                DISTRITO DE OBRA (SOLO LIMA TOP)
              </Text>
              <HStack gap={1.5} flexWrap="wrap">
                {LIMA_TOP_DISTRICTS.map((dist) => {
                  const active = selectedDistrict === dist.name;
                  return (
                    <Button
                      key={dist.name}
                      variant={active ? "primary" : "outline"}
                      size="sm"
                      minH="44px"
                      aria-pressed={active}
                      onClick={() => setSelectedDistrict(dist.name)}
                    >
                      {dist.name}
                    </Button>
                  );
                })}
              </HStack>
            </Box>

            <Box>
              <label htmlFor="builder-contact-input">
                <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkMuted} mb={2}>
                  RUC O CORREO DE CONTACTO
                </Text>
              </label>
              <HStack gap={2} flexWrap={{ base: "wrap", sm: "nowrap" }}>
                <Input
                  id="builder-contact-input"
                  aria-label="RUC o correo de contacto"
                  value={contactInput}
                  onChange={(e) => setContactInput(e.target.value)}
                  placeholder={`Ej. RUC 20606432870 · Obra en ${selectedDistrict}`}
                  minH="48px"
                  borderRadius="sm"
                  bg={ARCH_SURFACE.graphite}
                  border="1px solid"
                  borderColor={ARCH_BORDER.hairlineStrong}
                  color={ARCH_TEXT.onDarkPrimary}
                  _placeholder={{ color: ARCH_TEXT.onDarkSubtle }}
                />
                <Button
                  variant="primary"
                  minH="48px"
                  flexShrink={0}
                  onClick={() =>
                    setFeedbackMsg(
                      contactInput.trim()
                        ? `Confirmado para ${contactInput.trim()} (${selectedDistrict}: ${selectedWindow} · ${selectedGlass}).`
                        : `Indique su RUC o correo para coordinar en ${selectedDistrict}.`
                    )
                  }
                >
                  Enviar <ArrowRight size={15} aria-hidden="true" />
                </Button>
              </HStack>
              {feedbackMsg && (
                <Text fontFamily="mono" fontSize="xs" color={ARCH_TEXT.onDarkPrimary} mt={3} role="status">
                  {feedbackMsg}
                </Text>
              )}
            </Box>
          </VStack>
        </Box>
      </SimpleGrid>
    </VStack>
  );
};
