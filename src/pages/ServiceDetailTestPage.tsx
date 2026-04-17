import { useColorMode } from "@/components/ui/color-mode-hooks";
/**
 * @file ServiceDetailTestPage.tsx
 * @description Showcase for 5 Service Detail page variants using "Ventana" data.
 */
import React from "react";
import { Box, Heading, Container, Text, Button } from "@chakra-ui/react";
import { Sun, Moon, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ServiceDetailImmersive } from "../features/services/variants/detail/ServiceDetailImmersive";
import { ServiceDetailTechnical } from "../features/services/variants/detail/ServiceDetailTechnical";
import { ServiceDetailBentoRefined } from "../features/services/variants/detail/ServiceDetailBentoRefined";
import { ServiceDetailNarrative } from "../features/services/variants/detail/ServiceDetailNarrative";
import { ServiceDetailExploded } from "../features/services/variants/detail/ServiceDetailExploded";
import ServiceDetailElite from "../features/services/variants/detail/ServiceDetailElite";

const ventanaData = {
  seo: {
    title: "Sistemas de Ventanas",
    description: "Ventanas de aluminio y cristal de alta gama para proyectos residenciales y comerciales."
  },
  about: {
    description: "Nuestras ventanas combinan la ligereza del aluminio estructural con cristales de seguridad templados, ofreciendo una vista ininterrumpida y un aislamiento térmico superior."
  },
  benefits: [
    { label: "Aislamiento Acústico" },
    { label: "Resistencia Estructural" },
    { label: "Diseño Minimalista" },
    { label: "Bajo Mantenimiento" },
    { label: "Hermeticidad Total" },
    { label: "Variedad de Colores" }
  ],
  systems: [
    { label: "Serie 20" },
    { label: "Serie 25" },
    { label: "Serie 35" },
    { label: "Sistema Sifón" }
  ],
  imageLists: [
    ["https://images.unsplash.com/photo-1503708928676-1cb796a0891e?auto=format&fit=crop&q=80&w=1000"],
    ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000"],
    ["https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=1000"],
    ["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000"]
  ]
};

const ServiceDetailTestPage: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box bg="bg.page" minH="100vh" pb={20}>
      <Button position="fixed" bottom={4} right={4} zIndex={1000} variant="aura" onClick={toggleColorMode}>
        <Box as={colorMode === "light" ? Moon : Sun} /> TEMA {colorMode === "light" ? "OSCURO" : "CLARO"}
      </Button>
      
      <Box bg="primary.900" py={12} textAlign="center" color="white">
        <Link to="/test">
          <Button variant="ghost" color="white" mb={4}>
            <ArrowLeft size={16} /> Volver al Showcase
          </Button>
        </Link>
        <Heading size="xl" letterSpacing="0.2em">DETAIL SERVICE LAB (5 VARIANTS)</Heading>
        <Text opacity={0.7} fontSize="xs" mt={2}>LABORATORIO DE EXCELENCIA UI/UX</Text>
      </Box>

      {/* OPTION 1 */}
      <Box borderBottom="2px solid" borderColor="primary.500" py={4} bg="primary.50" _dark={{ bg: "whiteAlpha.50" }}>
        <Container maxW="7xl"><Heading size="sm" color="primary.900" _dark={{ color: "white" }}>1. IMMERSIVE GLASSHOUSE</Heading></Container>
      </Box>
      <ServiceDetailImmersive pageData={ventanaData} />
      
      {/* OPTION 2 */}
      <Box borderBottom="2px solid" borderColor="primary.500" py={4} bg="primary.50" _dark={{ bg: "whiteAlpha.50" }}>
        <Container maxW="7xl"><Heading size="sm" color="primary.900" _dark={{ color: "white" }}>2. ARCHITECTURAL SPECS</Heading></Container>
      </Box>
      <ServiceDetailTechnical pageData={ventanaData} />

      {/* OPTION 3 */}
      <Box borderBottom="2px solid" borderColor="primary.500" py={4} bg="primary.50" _dark={{ bg: "whiteAlpha.50" }}>
        <Container maxW="7xl"><Heading size="sm" color="primary.900" _dark={{ color: "white" }}>3. BENTO REFINED</Heading></Container>
      </Box>
      <ServiceDetailBentoRefined pageData={ventanaData} />

      {/* OPTION 4 */}
      <Box borderBottom="2px solid" borderColor="primary.500" py={4} bg="primary.50" _dark={{ bg: "whiteAlpha.50" }}>
        <Container maxW="7xl"><Heading size="sm" color="primary.900" _dark={{ color: "white" }}>4. NARRATIVE SCROLL</Heading></Container>
      </Box>
      <ServiceDetailNarrative pageData={ventanaData} />

      {/* OPTION 5 */}
      <Box borderBottom="2px solid" borderColor="primary.500" py={4} bg="primary.50" _dark={{ bg: "whiteAlpha.50" }}>
        <Container maxW="7xl"><Heading size="sm" color="primary.900" _dark={{ color: "white" }}>5. INDUSTRIAL INTERACTIVE</Heading></Container>
      </Box>
      <ServiceDetailExploded pageData={ventanaData} />

      {/* OPTION 6 */}
      <Box borderBottom="2px solid" borderColor="orange.300" py={4} bg="black" color="orange.300">
        <Container maxW="7xl"><Heading size="sm">6. ELITE OBSIDIAN REFRACTION (2026 Trend)</Heading></Container>
      </Box>
      <ServiceDetailElite pageData={ventanaData} />
    </Box>
  );
};

export default ServiceDetailTestPage;
