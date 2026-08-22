import type { Metadata } from "next";
import { AuraARViewer } from "@/shared/components/3d/AuraARViewer";
import { Box, VStack, Heading, Text, SimpleGrid } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "Realidad Aumentada (AR) 3D | Glass & Aluminum Company S.A.C.",
  description:
    "Prueba en tiempo real y a escala 1:1 cómo lucen nuestras mamparas, ventanas antirruido, barandas y techos en tu propia sala o terraza usando la cámara de tu celular.",
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
          Experiencia Inmersiva de Realidad Aumentada (AR 1:1)
        </Heading>
        <Text color="text.muted" fontSize={{ base: "sm", md: "md" }} maxW="3xl">
          Apunta con la cámara de tu <strong>Android</strong> o <strong>iPhone</strong> para proyectar ventanas, mamparas, duchas, barandas y techos en tu espacio real a escala 1:1 con luz y sombras realistas.
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

