/**
 * @file FAQPage.jsx
 * @description Página de preguntas frecuentes con schema FAQPage para rich snippets.
 * @module pages
 * @remarks
 * Optimizada para GEO (Generative Engine Optimization) con contenido técnico detallado
 * que responde preguntas comunes sobre vidriería y servicios en La Molina.
 */

import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { m } from "framer-motion";
import HelmetWrapper from "@shared/components/HelmetWrapper";
import GlassCard from "@shared/components/common/GlassCard";

/**
 * @component FAQPage
 * @description Página de preguntas frecuentes con schema markup FAQPage.
 * Diseñada para aparecer en rich snippets de Google y ser citada por IAs generativas.
 */
const FAQPage = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const headingColor = useColorModeValue("primary.600", "primary.300");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const accordionExpandedBg = useColorModeValue("primary.50", "whiteAlpha.100");
  const accordionHoverBg = useColorModeValue("gray.50", "whiteAlpha.50");
  const contactBg = useColorModeValue("primary.50", "primary.900");

  // Datos de FAQ estructurados
  const faqs = [
    {
      question: "¿Qué diferencia hay entre vidrio templado de 6mm y 8mm?",
      answer:
        "El vidrio templado de 6mm es ideal para mamparas de oficina, divisiones interiores y puertas de ducha estándar. El vidrio de 8mm ofrece mayor resistencia y es recomendado para estructuras de mayor tamaño, barandas de escaleras, y proyectos que requieren mayor seguridad. Ambos cumplen con normas de seguridad, pero el 8mm proporciona mayor rigidez y durabilidad en instalaciones expuestas a mayor uso.",
    },
    {
      question: "¿Cuánto tiempo toma la instalación de mamparas en La Molina?",
      answer:
        "La instalación de mamparas en La Molina generalmente toma entre 1 a 3 días hábiles, dependiendo del tamaño del proyecto. El proceso incluye: (1) Visita técnica y medición (mismo día o siguiente), (2) Fabricación de la estructura (3-5 días hábiles), (3) Instalación profesional (4-8 horas). Para proyectos comerciales más grandes, el tiempo puede extenderse. Ofrecemos garantía de 1 año en instalación.",
    },
    {
      question: "¿Ofrecen garantía en sus instalaciones?",
      answer:
        "Sí, ofrecemos garantía de 1 año en todas nuestras instalaciones de vidrio y aluminio. La garantía cubre defectos de fabricación, fallas en herrajes y problemas de instalación. No cubre daños por mal uso, impactos accidentales o modificaciones realizadas por terceros. Todos nuestros proyectos incluyen certificado de garantía y servicio post-venta.",
    },
    {
      question: "¿Atienden fuera de La Molina?",
      answer:
        "Sí, atendemos proyectos en La Molina y distritos aledaños como Santiago de Surco, San Borja, Ate, Miraflores y San Isidro. Nuestro taller está ubicado en Av. Los Fresnos, La Molina, lo que nos permite ofrecer tiempos de respuesta rápidos en toda la zona este de Lima. Para proyectos fuera de estas zonas, evaluamos cada caso de manera individual.",
    },
    {
      question: "¿Qué tipo de mamparas recomiendan para oficinas?",
      answer:
        "Para oficinas recomendamos mamparas de vidrio templado serie 20 o serie 25, dependiendo del diseño arquitectónico. La serie 20 utiliza perfiles de aluminio más delgados (20mm) para un look minimalista y moderno. La serie 25 ofrece mayor robustez con perfiles de 25mm, ideal para espacios de alto tráfico. Ambas opciones están disponibles en vidrio transparente, esmerilado o con vinilo decorativo para privacidad.",
    },
    {
      question:
        "¿Cuál es la diferencia entre ventanas corredizas y proyectantes?",
      answer:
        "Las ventanas corredizas se deslizan horizontalmente sobre rieles, ideales para espacios donde no se puede proyectar hacia afuera (balcones, áreas con rejas). Las ventanas proyectantes se abren hacia afuera mediante bisagras, permitiendo mayor ventilación y son recomendadas para áreas que requieren flujo de aire constante. En La Molina, las corredizas son más populares por su practicidad y facilidad de mantenimiento.",
    },
    {
      question: "¿Hacen instalación de puertas de ducha en vidrio templado?",
      answer:
        "Sí, somos especialistas en instalación de puertas de ducha en vidrio templado. Ofrecemos sistemas batientes (abren hacia afuera) y corredizos (se deslizan lateralmente). Utilizamos vidrio templado de 8mm con herrajes de acero inoxidable 304 resistentes a la humedad. El proceso incluye medición personalizada, fabricación a medida e instalación profesional con sellado hermético para evitar filtraciones.",
    },
    {
      question: "¿Qué mantenimiento requieren las estructuras de aluminio?",
      answer:
        "Las estructuras de aluminio requieren mantenimiento mínimo. Recomendamos: (1) Limpieza mensual con agua y jabón neutro, (2) Lubricación semestral de rieles y bisagras con aceite de silicona, (3) Revisión anual de selladores y empaques. En zonas costeras o con alta humedad como Lima, es importante limpiar con mayor frecuencia para prevenir acumulación de salitre. Evitar productos abrasivos que puedan rayar el acabado.",
    },
  ];

  // Schema markup para FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <HelmetWrapper
        title="Preguntas Frecuentes - Vidriería en La Molina | GYA Company"
        description="Respuestas a preguntas frecuentes sobre mamparas de vidrio, ventanas de aluminio, instalación y garantías. Información técnica detallada sobre nuestros servicios en La Molina."
        canonicalUrl="https://www.gyacompany.com/preguntas-frecuentes"
      >
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </HelmetWrapper>

      <Box bg={bgColor} minH="100vh" py={20} position="relative" overflow="hidden">
        {/* Background Decorative Element */}
        <Box
          position="absolute"
          top="-10%"
          right="-10%"
          w="600px"
          h="600px"
          bg="radial-gradient(circle, var(--chakra-colors-primary-500) 0%, transparent 70%)"
          filter="blur(150px)"
          opacity={0.05}
          pointerEvents="none"
        />

        <Container maxW="container.md">
          <VStack spacing={12} align="stretch">
            {/* Header */}
            <Box textAlign="center">
              <Heading
                as="h1"
                fontSize={{ base: "3xl", md: "5xl" }}
                color={headingColor}
                mb={6}
                fontWeight="900"
                letterSpacing="0.2em"
              >
                Preguntas Frecuentes
              </Heading>
              <Text fontSize="lg" color={textColor} maxW="2xl" mx="auto" fontWeight="500" opacity={0.8}>
                Respuestas técnicas y comerciales sobre nuestros servicios
                premium en La Molina.
              </Text>
            </Box>

            {/* FAQ Accordion with Glass Artifacts */}
            <Accordion allowToggle>
              <VStack spacing={6} align="stretch">
                {faqs.map((faq, index) => (
                  <m.div
                    key={faq.question}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.05, 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 30 
                    }}
                  >
                    <GlassCard boxShadow="xl" _hover={{ boxShadow: "2xl", transform: "translateY(-4px)" }}>
                      <AccordionItem border="none">
                        <h3>
                          <AccordionButton
                            _expanded={{
                              bg: accordionExpandedBg,
                              color: headingColor,
                            }}
                            borderRadius="xl"
                            py={5}
                            px={8}
                            _hover={{
                              bg: accordionHoverBg,
                            }}
                            transition="all 0.3s ease"
                          >
                            <Box flex="1" textAlign="left" fontWeight="700" letterSpacing="0.05em">
                              {faq.question}
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h3>
                        <AccordionPanel pb={6} pt={4} px={8} color={textColor} lineHeight="1.8" fontWeight="500">
                          {faq.answer}
                        </AccordionPanel>
                      </AccordionItem>
                    </GlassCard>
                  </m.div>
                ))}
              </VStack>
            </Accordion>

            {/* Additional Info */}
            <GlassCard p={8} textAlign="center" bg={contactBg}>
              <Heading as="h2" size="md" color={headingColor} mb={4} letterSpacing="0.1em">
                ¿Tienes más preguntas?
              </Heading>
              <Text color={textColor} fontWeight="500">
                Atención personalizada al{" "}
                <Text as="span" fontWeight="800" color={headingColor}>
                  +51 996-537-435
                </Text>{" "}
                o vía{" "}
                <Text as="span" fontWeight="800" color={headingColor}>
                  acueva@gyacompany.com
                </Text>
              </Text>
            </GlassCard>
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default FAQPage;
