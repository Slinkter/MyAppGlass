import type { Metadata } from "next";
import { AuraARViewer } from "@/shared/components/3d/AuraARViewer";
import { Box, VStack, Heading, Text } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "Realidad Aumentada (AR) 3D | Glass & Aluminum Company S.A.C.",
  description:
    "Prueba en tiempo real y a escala 1:1 cómo lucen nuestras mamparas y ventanas antirruido en tu propia sala o terraza usando la cámara de tu celular.",
};

export default function RealidadAumentadaPage() {
  return (
    <Box py="10" maxW="1200px" mx="auto">
      <VStack gap="2" align="start" mb="8">
        <Heading size="2xl" color="brand.primary">
          Experiencia Inmersiva de Realidad Aumentada (AR)
        </Heading>
        <Text color="text.muted">
          Proyecta estructuras de vidrio templado y carpintería de aluminio directamente en tu espacio real antes de iniciar la obra.
        </Text>
      </VStack>

      <VStack gap="8" align="stretch">
        <AuraARViewer
          title="Mampara Corrediza Serie 25 (Vidrio Templado 8mm)"
          category="Mamparas & Terrazas"
          glbModelUrl="/models/mampara-serie25.glb"
          usdzModelUrl="/models/mampara-serie25.glb"
        />
        <AuraARViewer
          title="Ventana Antirruido Hermética Sistema Nova"
          category="Ventanas Acústicas"
          glbModelUrl="/models/ventana-nova.glb"
          usdzModelUrl="/models/ventana-nova.glb"
        />
        <AuraARViewer
          title="Box de Ducha en Cristal Templado & Acero Inox"
          category="Puertas de Ducha"
          glbModelUrl="/models/puerta-ducha.glb"
          usdzModelUrl="/models/puerta-ducha.glb"
        />
      </VStack>
    </Box>
  );
}
