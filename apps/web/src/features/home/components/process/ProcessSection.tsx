"use client";

/**
 * @file ProcessSection.tsx
 * @description Cómo trabajamos en 3 pasos (Medimos · Fabricamos · Instalamos). Textos basados solo
 * en datos del Brand Kit: visita técnica sin costo, ensamblado en taller propio, instalación con
 * garantía y técnicos capacitados. Íconos Lucide de 20 px, tarjetas con borde fino.
 */

import React from "react";
import { Box, Container, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { Hammer, Ruler, ShieldCheck } from "lucide-react";
import { Reveal } from "@shared/components/motion/Reveal";
import { SectionHeader } from "../shared/SectionHeader";

const STEPS = [
  { icon: Ruler, title: "Medimos", text: "Visita técnica sin costo: tomamos medidas en tu casa u obra." },
  { icon: Hammer, title: "Fabricamos", text: "Armamos tu ventana, mampara o techo en nuestro taller, a la medida." },
  { icon: ShieldCheck, title: "Instalamos", text: "Técnicos capacitados instalan y entregan con garantía." },
] as const;

export const ProcessSection: React.FC = () => (
  <Container maxW="7xl" px={{ base: 4, sm: 6, md: 8 }}>
    <SectionHeader eyebrow="Cómo trabajamos" title="De la medida a la instalación" />
    <SimpleGrid columns={{ base: 1, md: 3 }} gap={{ base: "3", md: "5" }}>
      {STEPS.map(({ icon: Icon, title, text }, i) => (
        <Reveal key={title} index={i}>
          <Flex
            h="full"
            direction={{ base: "row", md: "column" }}
            align={{ base: "center", md: "flex-start" }}
            gap={{ base: "4", md: "0" }}
            p={{ base: "4", md: "6" }}
            borderRadius="2xl"
            bg="bg.surface"
            borderWidth="1px"
            borderColor="border.default"
          >
            <Box
              w="11"
              h="11"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="full"
              bg="gray.900"
              color="white"
              mb={{ base: "0", md: "4" }}
              flexShrink={0}
              _dark={{ bg: "white", color: "gray.900" }}
            >
              <Icon size={20} aria-hidden="true" style={{ flexShrink: 0 }} />
            </Box>
            <Box minW="0">
              <Text fontSize="xs" fontWeight="700" letterSpacing="0.12em" textTransform="uppercase" color="text.muted" mb="1">
                Paso {i + 1}
              </Text>
              <Text fontFamily="heading" fontWeight="700" fontSize="xl" color="text.heading" mb="1">
                {title}
              </Text>
              <Text fontSize="sm" color="text.muted" lineHeight="relaxed">
                {text}
              </Text>
            </Box>
          </Flex>
        </Reveal>
      ))}
    </SimpleGrid>
  </Container>
);

export default ProcessSection;
