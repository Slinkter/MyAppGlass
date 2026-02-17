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
import HelmetWrapper from "@shared/components/HelmetWrapper";

/**
 * @component FAQPage
 * @description Página de preguntas frecuentes con schema markup FAQPage.
 * Diseñada para aparecer en rich snippets de Google y ser citada por IAs generativas.
 */
const FAQPage = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const headingColor = useColorModeValue("primary.600", "primary.300");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const accordionExpandedBg = useColorModeValue("primary.50", "primary.900");
  const accordionHoverBg = useColorModeValue("gray.50", "gray.700");
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

      <Box bg={bgColor} minH="100vh" py={12}>
        <Container maxW="container.lg">
          <VStack spacing={8} align="stretch">
            {/* Header */}
            <Box textAlign="center">
              <Heading
                as="h1"
                size="2xl"
                color={headingColor}
                mb={4}
                fontWeight="extrabold"
              >
                Preguntas Frecuentes
              </Heading>
              <Text fontSize="lg" color={textColor} maxW="2xl" mx="auto">
                Respuestas a las preguntas más comunes sobre nuestros servicios
                de vidriería y aluminio en La Molina
              </Text>
            </Box>

            {/* FAQ Accordion */}
            <Box bg={cardBg} borderRadius="xl" boxShadow="lg" p={6}>
              <Accordion allowToggle>
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} border="none" mb={4}>
                    <h3>
                      <AccordionButton
                        _expanded={{
                          bg: accordionExpandedBg,
                          color: headingColor,
                        }}
                        borderRadius="lg"
                        py={4}
                        px={6}
                        _hover={{
                          bg: accordionHoverBg,
                        }}
                      >
                        <Box flex="1" textAlign="left" fontWeight="semibold">
                          {faq.question}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h3>
                    <AccordionPanel pb={4} pt={4} px={6} color={textColor}>
                      {faq.answer}
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </Box>

            {/* Additional Info */}
            <Box bg={contactBg} borderRadius="xl" p={6} textAlign="center">
              <Heading as="h2" size="md" color={headingColor} mb={3}>
                ¿Tienes más preguntas?
              </Heading>
              <Text color={textColor}>
                Contáctanos al{" "}
                <Text as="span" fontWeight="bold">
                  +51 996-537-435
                </Text>{" "}
                o envíanos un correo a{" "}
                <Text as="span" fontWeight="bold">
                  acueva@gyacompany.com
                </Text>
              </Text>
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default FAQPage;
