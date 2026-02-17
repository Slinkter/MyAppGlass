/**
 * @file BlogPage.jsx
 * @description Página de blog con artículos técnicos optimizados para GEO.
 * @module pages
 * @remarks
 * Contenido de alto valor diseñado para ser citado por IAs generativas
 * y posicionar en búsquedas de información técnica sobre vidriería.
 */

import React from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  SimpleGrid,
  Card,
  CardBody,
  Stack,
  Divider,
} from "@chakra-ui/react";
import HelmetWrapper from "@shared/components/HelmetWrapper";

/**
 * @component BlogPage
 * @description Página principal del blog con artículos técnicos sobre vidriería.
 */
const BlogPage = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const headingColor = useColorModeValue("primary.600", "primary.300");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const accentColor = useColorModeValue("primary.500", "primary.400");

  // Schema markup para Blog
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog de GYA Company - Vidriería en La Molina",
    description:
      "Artículos técnicos y guías sobre mamparas, ventanas de aluminio y estructuras de vidrio",
    url: "https://www.gyacompany.com/blog",
    publisher: {
      "@type": "Organization",
      name: "GYA Company",
      logo: {
        "@type": "ImageObject",
        url: "https://gyacompany.com/logovcr.png",
      },
    },
  };

  return (
    <>
      <HelmetWrapper
        title="Blog - Guías Técnicas de Vidriería | GYA Company La Molina"
        description="Artículos técnicos y guías sobre mamparas de vidrio templado, ventanas de aluminio y estructuras de vidrio. Información experta para proyectos en La Molina."
        canonicalUrl="https://www.gyacompany.com/blog"
      >
        <script type="application/ld+json">{JSON.stringify(blogSchema)}</script>
      </HelmetWrapper>

      <Box bg={bgColor} minH="100vh" py={12}>
        <Container maxW="container.xl">
          <VStack spacing={10} align="stretch">
            {/* Header */}
            <Box textAlign="center">
              <Heading
                as="h1"
                size="2xl"
                color={headingColor}
                mb={4}
                fontWeight="extrabold"
              >
                Blog Técnico
              </Heading>
              <Text fontSize="lg" color={textColor} maxW="2xl" mx="auto">
                Guías especializadas y consejos de expertos sobre vidriería y
                aluminio
              </Text>
            </Box>

            {/* Articles Grid */}
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
              {/* Article 1: Guía de Mamparas */}
              <Card
                bg={cardBg}
                boxShadow="lg"
                borderRadius="xl"
                overflow="hidden"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "2xl",
                  transition: "all 0.3s",
                }}
              >
                <CardBody>
                  <Stack spacing={4}>
                    <Heading as="h2" size="md" color={headingColor}>
                      Guía Completa: Cómo Elegir Mamparas en La Molina
                    </Heading>
                    <Text color={textColor} noOfLines={4}>
                      Descubre los factores clave para seleccionar mamparas de
                      vidrio templado: tipos de serie (20 vs 25), espesores de
                      vidrio (6mm vs 8mm), acabados, y consideraciones de
                      espacio. Guía técnica completa para proyectos
                      residenciales y comerciales.
                    </Text>
                    <Divider />
                    <Text
                      fontSize="sm"
                      color={accentColor}
                      fontWeight="semibold"
                    >
                      Lectura: 8 min
                    </Text>
                  </Stack>
                </CardBody>
              </Card>

              {/* Article 2: Vidrio Templado */}
              <Card
                bg={cardBg}
                boxShadow="lg"
                borderRadius="xl"
                overflow="hidden"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "2xl",
                  transition: "all 0.3s",
                }}
              >
                <CardBody>
                  <Stack spacing={4}>
                    <Heading as="h2" size="md" color={headingColor}>
                      Vidrio Templado vs Laminado: Guía Técnica
                    </Heading>
                    <Text color={textColor} noOfLines={4}>
                      Comparativa detallada entre vidrio templado y laminado:
                      procesos de fabricación, resistencia al impacto,
                      comportamiento ante roturas, aplicaciones recomendadas y
                      normativas de seguridad. Información técnica para tomar
                      decisiones informadas.
                    </Text>
                    <Divider />
                    <Text
                      fontSize="sm"
                      color={accentColor}
                      fontWeight="semibold"
                    >
                      Lectura: 10 min
                    </Text>
                  </Stack>
                </CardBody>
              </Card>

              {/* Article 3: Mantenimiento */}
              <Card
                bg={cardBg}
                boxShadow="lg"
                borderRadius="xl"
                overflow="hidden"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "2xl",
                  transition: "all 0.3s",
                }}
              >
                <CardBody>
                  <Stack spacing={4}>
                    <Heading as="h2" size="md" color={headingColor}>
                      Mantenimiento de Estructuras de Aluminio en Lima
                    </Heading>
                    <Text color={textColor} noOfLines={4}>
                      Rutinas de mantenimiento para estructuras de aluminio en
                      clima limeño: limpieza, lubricación, prevención de
                      corrosión por humedad y salitre. Productos recomendados y
                      frecuencias de mantenimiento según tipo de instalación.
                    </Text>
                    <Divider />
                    <Text
                      fontSize="sm"
                      color={accentColor}
                      fontWeight="semibold"
                    >
                      Lectura: 6 min
                    </Text>
                  </Stack>
                </CardBody>
              </Card>

              {/* Article 4: Serie 20 vs 25 */}
              <Card
                bg={cardBg}
                boxShadow="lg"
                borderRadius="xl"
                overflow="hidden"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "2xl",
                  transition: "all 0.3s",
                }}
              >
                <CardBody>
                  <Stack spacing={4}>
                    <Heading as="h2" size="md" color={headingColor}>
                      Mamparas Serie 20 vs Serie 25: Comparativa
                    </Heading>
                    <Text color={textColor} noOfLines={4}>
                      Análisis comparativo de mamparas serie 20 y serie 25:
                      diferencias en perfiles de aluminio (20mm vs 25mm),
                      capacidad de carga, estética, costos y aplicaciones
                      ideales. Guía para elegir la serie correcta según tu
                      proyecto.
                    </Text>
                    <Divider />
                    <Text
                      fontSize="sm"
                      color={accentColor}
                      fontWeight="semibold"
                    >
                      Lectura: 7 min
                    </Text>
                  </Stack>
                </CardBody>
              </Card>

              {/* Article 5: Ventanas */}
              <Card
                bg={cardBg}
                boxShadow="lg"
                borderRadius="xl"
                overflow="hidden"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "2xl",
                  transition: "all 0.3s",
                }}
              >
                <CardBody>
                  <Stack spacing={4}>
                    <Heading as="h2" size="md" color={headingColor}>
                      Ventanas de Aluminio: Sistemas Corredizos vs Proyectantes
                    </Heading>
                    <Text color={textColor} noOfLines={4}>
                      Comparación técnica entre ventanas corredizas y
                      proyectantes: mecanismos de apertura, ventilación,
                      aislamiento acústico, seguridad y mantenimiento.
                      Recomendaciones según tipo de vivienda y ubicación en La
                      Molina.
                    </Text>
                    <Divider />
                    <Text
                      fontSize="sm"
                      color={accentColor}
                      fontWeight="semibold"
                    >
                      Lectura: 9 min
                    </Text>
                  </Stack>
                </CardBody>
              </Card>

              {/* Article 6: Instalación Profesional */}
              <Card
                bg={cardBg}
                boxShadow="lg"
                borderRadius="xl"
                overflow="hidden"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "2xl",
                  transition: "all 0.3s",
                }}
              >
                <CardBody>
                  <Stack spacing={4}>
                    <Heading as="h2" size="md" color={headingColor}>
                      Instalación Profesional vs DIY: ¿Qué Conviene?
                    </Heading>
                    <Text color={textColor} noOfLines={4}>
                      Análisis de costos, riesgos y beneficios de instalación
                      profesional vs DIY para mamparas y ventanas. Herramientas
                      necesarias, conocimientos técnicos requeridos, garantías y
                      casos donde la instalación profesional es indispensable.
                    </Text>
                    <Divider />
                    <Text
                      fontSize="sm"
                      color={accentColor}
                      fontWeight="semibold"
                    >
                      Lectura: 8 min
                    </Text>
                  </Stack>
                </CardBody>
              </Card>
            </SimpleGrid>

            {/* CTA */}
            <Box
              bg={useColorModeValue("primary.50", "primary.900")}
              borderRadius="xl"
              p={8}
              textAlign="center"
            >
              <Heading as="h2" size="lg" color={headingColor} mb={4}>
                ¿Necesitas asesoría personalizada?
              </Heading>
              <Text color={textColor} fontSize="lg">
                Contáctanos para una consulta técnica gratuita sobre tu proyecto
              </Text>
              <Text color={textColor} mt={4} fontWeight="bold">
                +51 996-537-435 | acueva@gyacompany.com
              </Text>
            </Box>
          </VStack>
        </Container>
      </Box>
    </>
  );
};

export default BlogPage;
