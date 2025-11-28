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
      <Box p={{ base: 0, md: 4, lg: 2 }} w="100%" overflowX="hidden">
        <Grid
          templateColumns={{ base: "minmax(0, 1fr)", lg: "1fr 3fr" }}
          maxW="100%"
          mx="auto"
          gap={{ base: 3, md: 5, lg: 6 }}
          alignItems="start"
          px={{ base: 3, md: 0 }}
          py={{ base: 3, md: 0 }}
        >
          {/* CARD 1: PANEL DE CONTROL (Sidebar con toda la info) */}
          <GridItem w="100%" minW={0}>
            <GlassCard
              display="flex"
              flexDirection="column"
              styles={glassStyles}
              h={{ base: "auto", lg: "85vh" }}
              overflow={{ base: "visible", lg: "hidden" }}
              w="100%"
            >
              <VStack
                spacing={{ base: 4, md: 5, lg: 6 }}
                align="stretch"
                flex="1"
                pr={{ base: 0, lg: 2 }}
                overflowY={{ base: "visible", lg: "auto" }}
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
                    size={{ base: "sm", md: "md" }}
                    mb={{ base: 3, md: 4 }}
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

                {/* Sección: Información del Sistema */}
                <Box>
                  <Heading
                    as="h2"
                    size={{ base: "md", md: "lg" }}
                    color={glassStyles.headingColor}
                    mb={{ base: 2, md: 3 }}
                  >
                    {activeSystem?.label}
                  </Heading>
                </Box>

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
                      mb={{ base: 3, md: 4 }}
                    >
                      Especificaciones Técnicas
                    </Text>
                    <Grid
                      templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }}
                      gap={{ base: 2, md: 3 }}
                    >
                      {features.map((item, index) => (
                        <VStack
                          key={index}
                          align="start"
                          spacing={1}
                          p={{ base: 2, md: 3 }}
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
                              w={{ base: 3, md: 4 }}
                              h={{ base: 3, md: 4 }}
                              color={glassStyles.accent}
                            />
                            <Text
                              fontSize={{ base: "2xs", md: "xs" }}
                              color={glassStyles.text}
                              fontWeight="bold"
                              opacity={0.7}
                            >
                              {item.label.split(":")[0]}
                            </Text>
                          </HStack>
                          <Text
                            fontSize={{ base: "xs", md: "sm" }}
                            fontWeight="semibold"
                            color={glassStyles.headingColor}
                            pl={{ base: 5, md: 6 }}
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
                    size={{ base: "md", md: "lg" }}
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
          <GridItem w="100%" minW={0}>
            <GlassCard
              styles={glassStyles}
              h={{ base: "360px", sm: "410px", md: "500px", lg: "85vh" }}
              overflow="hidden"
              p={{ base: 2, md: 4, lg: 6 }}
            >
              <Box h="100%" w="100%" minW={0} maxW="100%">
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
    borderRadius={{ base: "2xl", md: "3xl" }}
    border="1px solid"
    borderColor={styles.border}
    boxShadow={{ base: "xl", md: "2xl" }}
    p={{ base: 4, md: 6 }}
    transition="all 0.3s ease"
    {...props}
  >
    {children}
  </Box>
);

export default ServicePageLayout;
