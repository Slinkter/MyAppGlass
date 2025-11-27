import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Stack,
  Heading,
  Grid,
  GridItem,
  Button,
  Text,
  useColorModeValue,
  Icon,
  VStack,
  HStack,
  Divider,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import SidebarItem from "@/components/common/SidebarItem";
import Gallery from "@/components/common/Gallery";

/**
 * ServicePageLayout - Diseño de 2 Cards
 * Card 1 (Izquierda): Panel de Control con toda la información
 * Card 2 (Derecha): Galería de Imágenes Premium
 * Ambas cards tienen altura fija de 85vh para evitar cambios de layout
 */
const ServicePageLayout = ({ pageData }) => {
  const { seo, systems, features, imageLists } = pageData;
  const [activeIndex, setActiveIndex] = useState(0);

  const activeImageList = imageLists[activeIndex] || [];
  const activeSystem = systems[activeIndex];

  // Estilos Glassmorphism Premium
  const glassStyles = {
    bg: useColorModeValue("rgba(255, 255, 255, 0.7)", "rgba(20, 20, 20, 0.7)"),
    border: useColorModeValue(
      "rgba(255, 255, 255, 0.5)",
      "rgba(255, 255, 255, 0.1)"
    ),
    text: useColorModeValue("gray.700", "gray.300"),
    headingColor: useColorModeValue("gray.900", "white"),
    accent: useColorModeValue("blue.600", "blue.300"),
    cardBg: useColorModeValue("whiteAlpha.600", "blackAlpha.500"),
  };

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Helmet>

      <Box
        minH="100vh"
        p={{ base: 4, md: 8 }}
        bgGradient={useColorModeValue(
          "linear(to-br, gray.50, gray.100)",
          "linear(to-br, gray.900, black)"
        )}
      >
        <Grid
          templateColumns={{ base: "1fr", lg: "380px 1fr" }}
          maxW="1800px"
          mx="auto"
          gap={8}
          alignItems="start"
        >
          {/* CARD 1: PANEL DE CONTROL (Sidebar con toda la info) */}
          <GridItem>
            <GlassCard
              styles={glassStyles}
              h={{ base: "auto", md: "85vh" }}
              overflow="hidden"
              display="flex"
              flexDirection="column"
            >
              <VStack
                spacing={6}
                align="stretch"
                flex="1"
                overflowY="auto"
                pr={2}
                css={{
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "transparent",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "rgba(255, 255, 255, 0.2)",
                    borderRadius: "24px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    background: "rgba(255, 255, 255, 0.3)",
                  },
                }}
              >
                {/* Sección: Navegación de Sistemas */}
                <Box>
                  <Heading
                    as="h3"
                    size="md"
                    mb={4}
                    color={glassStyles.headingColor}
                    letterSpacing="tight"
                  >
                    {seo.title}
                  </Heading>
                  <Stack spacing={2}>
                    {systems.map((item, index) => (
                      <SidebarItem
                        key={item.label}
                        icon={item.icon}
                        label={item.label}
                        isActive={activeIndex === index}
                        onClick={() => setActiveIndex(index)}
                      />
                    ))}
                  </Stack>
                </Box>

                <Divider borderColor={glassStyles.border} />

                {/* Sección: Información del Sistema */}
                <Box>
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    color={glassStyles.accent}
                    mb={2}
                  >
                    Sistema Seleccionado
                  </Text>
                  <Heading
                    as="h2"
                    size="lg"
                    color={glassStyles.headingColor}
                    mb={3}
                  >
                    {activeSystem?.label}
                  </Heading>
                  <Text
                    fontSize="sm"
                    color={glassStyles.text}
                    lineHeight="relaxed"
                  >
                    Diseñado para la excelencia. Este sistema combina estética
                    moderna con funcionalidad robusta, ideal para proyectos que
                    exigen lo mejor en calidad y durabilidad.
                  </Text>
                </Box>

                <Divider borderColor={glassStyles.border} />

                {/* Sección: Especificaciones Técnicas */}
                {features && features.length > 0 && (
                  <Box>
                    <Text
                      fontSize="xs"
                      fontWeight="bold"
                      textTransform="uppercase"
                      letterSpacing="wider"
                      color={glassStyles.text}
                      opacity={0.7}
                      mb={4}
                    >
                      Especificaciones Técnicas
                    </Text>
                    <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                      {features.map((item, index) => (
                        <VStack
                          key={index}
                          align="start"
                          spacing={1}
                          p={3}
                          bg={useColorModeValue(
                            "whiteAlpha.500",
                            "whiteAlpha.50"
                          )}
                          borderRadius="lg"
                          border="1px solid"
                          borderColor={glassStyles.border}
                        >
                          <HStack spacing={2}>
                            <Icon
                              as={item.icon}
                              w={4}
                              h={4}
                              color={glassStyles.accent}
                            />
                            <Text
                              fontSize="xs"
                              color={glassStyles.text}
                              fontWeight="bold"
                              opacity={0.7}
                            >
                              {item.label.split(":")[0]}
                            </Text>
                          </HStack>
                          <Text
                            fontSize="sm"
                            fontWeight="semibold"
                            color={glassStyles.headingColor}
                            pl={6}
                          >
                            {item.label.split(":")[1] || "Estándar"}
                          </Text>
                        </VStack>
                      ))}
                    </Grid>
                  </Box>
                )}

                <Divider borderColor={glassStyles.border} />

                {/* Sección: Call to Action */}
                <Box>
                  <Button
                    size="lg"
                    w="full"
                    bg={glassStyles.accent}
                    color="white"
                    rightIcon={<ArrowForwardIcon />}
                    _hover={{
                      bg: useColorModeValue("blue.700", "blue.400"),
                      transform: "translateY(-2px)",
                      boxShadow: "xl",
                    }}
                    _active={{
                      transform: "translateY(0)",
                    }}
                    boxShadow="lg"
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  >
                    Cotizar Ahora
                  </Button>
                  <Text
                    fontSize="xs"
                    color={glassStyles.text}
                    textAlign="center"
                    mt={2}
                    opacity={0.7}
                  >
                    Obtén una cotización personalizada en 24 horas
                  </Text>
                </Box>
              </VStack>
            </GlassCard>
          </GridItem>

          {/* CARD 2: GALERÍA DE IMÁGENES */}
          <GridItem>
            <GlassCard
              styles={glassStyles}
              h={{ base: "500px", md: "85vh" }}
              p={0}
              overflow="hidden"
            >
              <Box h="100%" p={6}>
                <Gallery images={activeImageList} />
              </Box>
            </GlassCard>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

// Componente Base para Tarjetas de Vidrio
const GlassCard = ({ children, styles, ...props }) => (
  <Box
    bg={styles.bg}
    backdropFilter="blur(20px)"
    borderRadius="3xl"
    border="1px solid"
    borderColor={styles.border}
    boxShadow="2xl"
    p={6}
    transition="all 0.3s ease"
    {...props}
  >
    {children}
  </Box>
);

export default ServicePageLayout;
