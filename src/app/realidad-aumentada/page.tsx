import type { Metadata } from "next";
import { AuraARViewer, AFrameStudioModelViewer } from "@/shared/components/3d";
import { Box, VStack, Heading, Text, SimpleGrid } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "Realidad Aumentada (AR) 3D & Model Viewer | Glass & Aluminum Company S.A.C.",
  description:
    "Visor 3D Studio y Realidad Aumentada a escala 1:1 para mamparas, ventanas antirruido, barandas y techos en tu propia sala o terraza.",
};

const AR_SHOWCASE_ITEMS = [
  {
    title: "Ventana Antirruido Hermética Sistema Nova",
    category: "Ventanas Acústicas",
    glbModelUrl: "/models/ventana-nova.glb",
    usdzModelUrl: "/models/ventana-nova.glb",
  },
  {
    title: "Mampara Corrediza Serie 25 (Vidrio Templado 8mm)",
    category: "Mamparas & Terrazas",
    glbModelUrl: "/models/mampara-serie25.glb",
    usdzModelUrl: "/models/mampara-serie25.glb",
  },
  {
    title: "Box de Ducha en Cristal Templado & Acero Inox",
    category: "Puertas de Ducha",
    glbModelUrl: "/models/puerta-ducha.glb",
    usdzModelUrl: "/models/puerta-ducha.glb",
  },
  {
    title: "Baranda de Vidrio Templado & Pasamanos de Acero",
    category: "Barandas & Escaleras",
    glbModelUrl: "/models/mampara-serie25.glb",
    usdzModelUrl: "/models/mampara-serie25.glb",
  },
  {
    title: "Parapeto de Vidrio Templado para Azoteas",
    category: "Parapetos & Azoteas",
    glbModelUrl: "/models/mampara-serie25.glb",
    usdzModelUrl: "/models/mampara-serie25.glb",
  },
  {
    title: "Balcón Panorámico en Cristal Templado",
    category: "Balcones & Fachadas",
    glbModelUrl: "/models/mampara-serie25.glb",
    usdzModelUrl: "/models/mampara-serie25.glb",
  },
  {
    title: "Techo de Policarbonato Alveolar con Estructura de Aluminio",
    category: "Techos & Coberturas",
    glbModelUrl: "/models/techo-policarbonato.glb",
    usdzModelUrl: "/models/techo-policarbonato.glb",
  },
  {
    title: "Puerta de Cristal Templado con Freno Hidráulico de Piso",
    category: "Puertas de Vidrio",
    glbModelUrl: "/models/mampara-serie25.glb",
    usdzModelUrl: "/models/mampara-serie25.glb",
  },
  {
    title: "Puerta de Aluminio Serie Residencial",
    category: "Puertas de Aluminio",
    glbModelUrl: "/models/ventana-nova.glb",
    usdzModelUrl: "/models/ventana-nova.glb",
  },
  {
    title: "Celosía de Aluminio para Ventilación y Control Solar",
    category: "Celosías & Ventilación",
    glbModelUrl: "/models/ventana-nova.glb",
    usdzModelUrl: "/models/ventana-nova.glb",
  },
];

export default function RealidadAumentadaPage() {
  return (
    <Box py="8" maxW="1280px" mx="auto" px={{ base: "3", sm: "4", md: "6" }}>
      <VStack gap="3" align="start" mb="8">
        <Heading size={{ base: "xl", md: "2xl" }} color="brand.primary">
          Showcase 3D Model Viewer & Realidad Aumentada (AR)
        </Heading>
        <Text color="text.muted" fontSize={{ base: "sm", md: "md" }} maxW="3xl">
          Explora la galería interactiva en 360° inspirada en el <strong>A-Frame Model Viewer Showcase</strong>. Cambia entre modelos con la bandeja inferior, pega cualquier enlace GLTF o proyecta a escala 1:1 en tu hogar con la cámara de tu celular.
        </Text>
      </VStack>

      {/* VISOR ESTUDIO MODEL VIEWER ESTILO A-FRAME */}
      <Box mb="12">
        <AFrameStudioModelViewer />
      </Box>

      <VStack gap="2" align="start" mb="6">
        <Heading size="lg" color="brand.primary">
          Catálogo Detallado por Categoría
        </Heading>
        <Text color="text.muted" fontSize="sm">
          Visores individuales con calibración de medidas reales y disparador directo para Android y iPhone.
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, lg: 2 }} gap="6" alignItems="stretch">
        {AR_SHOWCASE_ITEMS.map((item) => (
          <AuraARViewer
            key={item.title}
            title={item.title}
            category={item.category}
            glbModelUrl={item.glbModelUrl}
            usdzModelUrl={item.usdzModelUrl}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}

