import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  VStack,
  Heading,
  Text,
  Icon,
  SimpleGrid,
  Container,
  HStack,
  Button,
  Grid,
  GridItem,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { CheckIcon, ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";
import { LazyMotion, m, domAnimation, AnimatePresence } from "framer-motion";
import Gallery from "@shared/components/common/Gallery";
import GlassCard from "@shared/components/common/GlassCard";
import ComingSoonDisplay from "@shared/components/common/ComingSoonDisplay";
import BackButton from "@shared/components/navigation/BackButton";

const SystemSelector = React.memo(({ systems, activeIndex, onSelect }) => {
  if (!systems || systems.length <= 1) return null;

  return (
    <Flex
      gap={{ base: 3, md: 4 }}
      py={2}
      px={1}
      flexWrap="wrap"
      justify={{ base: "start", md: "center" }}
      w="full"
    >
      {systems.map((system, index) => (
        <Button
          key={system.label}
          onClick={() => onSelect(index)}
          size={{ base: "sm", md: "md" }}
          variant={activeIndex === index ? "solid" : "ghost"}
          colorScheme={activeIndex === index ? "primary" : "gray"}
          borderRadius="full"
          px={{ base: 5, md: 8 }}
          h={{ base: "36px", md: "42px" }}
          flexShrink={0}
          fontWeight={activeIndex === index ? "bold" : "medium"}
          whiteSpace="nowrap"
          boxShadow={activeIndex === index ? "lg" : "sm"}
          _hover={{
            bg: activeIndex !== index && "whiteAlpha.100",
            transform: "translateY(-2px)",
            boxShadow: "md",
          }}
          transition="all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
        >
          {system.label}
        </Button>
      ))}
    </Flex>
  );
});
SystemSelector.displayName = "SystemSelector";

const BentoAbout = React.memo(({ about }) => {
  if (!about) return null;

  return (
    <GlassCard p={8} h="full" display="flex" flexDirection="column" justifyContent="center">
      <Heading size="md" mb={4} color="text.accent" textTransform="uppercase" letterSpacing="widest">
        Concepto
      </Heading>
      <Text fontSize="lg" lineHeight="tall" fontWeight="medium" color="text.body">
        {about.description}
      </Text>
    </GlassCard>
  );
});
BentoAbout.displayName = "BentoAbout";

const BentoBenefits = React.memo(({ benefits }) => {
  if (!benefits) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <GlassCard p={8} h="full">
      <Heading size="sm" mb={6} color="text.muted" textTransform="uppercase" letterSpacing="widest">
        Ventajas Clave
      </Heading>
      <SimpleGrid 
        as={m.div} 
        variants={containerVariants} 
        initial="hidden" 
        animate="show" 
        columns={{ base: 1, sm: 2 }} 
        spacing={6}
      >
        {benefits.map((benefit) => (
          <HStack as={m.div} variants={itemVariants} key={benefit.id || benefit.label} align="start" spacing={3}>
            <Icon as={CheckIcon} color="text.accent" mt={1} />
            <Text fontWeight="semibold" fontSize="sm" color="text.body">{benefit.label}</Text>
          </HStack>
        ))}
      </SimpleGrid>
    </GlassCard>
  );
});
BentoBenefits.displayName = "BentoBenefits";

const BentoCTA = React.memo(({ systemName }) => {
  return (
    <GlassCard
      p={8}
      bgGradient="linear(to-br, primary.600, primary.800)"
      color="white"
      h="full"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Icon as={ChatBubbleBottomCenterTextIcon} boxSize={8} mb={4} />
      <Heading size="md" mb={2}>¿Listo para iniciar?</Heading>
      <Text opacity={0.9} mb={6} fontSize="sm">Cotiza tu proyecto de {systemName} hoy mismo.</Text>
      <Button
        as="a"
        href={`https://wa.me/51974278303?text=Hola, me interesa el servicio de ${systemName}`}
        target="_blank"
        bg="white"
        color="primary.700"
        borderRadius="full"
        px={10}
        _hover={{ transform: "scale(1.05)", boxShadow: "2xl" }}
      >
        Cotizar Ahora
      </Button>
    </GlassCard>
  );
});
BentoCTA.displayName = "BentoCTA";

const ServicePageLayout = ({ pageData }) => {
  const { seo, about, benefits, systems, imageLists } = pageData;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const isMobile = useBreakpointValue({ base: true, md: false });

  const activeImageList = React.useMemo(() => imageLists[activeIndex] || [], [imageLists, activeIndex]);
  const activeSystem = React.useMemo(() => systems[activeIndex], [systems, activeIndex]);

  const handleSelect = React.useCallback((index) => {
    setActiveIndex(index);
  }, []);

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
      </Helmet>

      <LazyMotion features={domAnimation}>
        <Box
          as={m.div}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Container maxW="container.xl" pt={{ base: 6, md: 8 }} pb={20}>
            <VStack spacing={8} align="stretch">
              <VStack spacing={2} align={{ base: "start" }}>
                {isMobile && <Box mb={2}><BackButton to="/servicios" /></Box>}
                <Text
                  fontSize="xs"
                  fontWeight="bold"
                  color="text.accent"
                  letterSpacing="widest"
                  textTransform="uppercase"
                >
                  Nuestra Experiencia
                </Text>
                <Heading size={{ base: "xl", md: "2xl" }} fontWeight="black" letterSpacing="tight" color="text.heading">
                  {seo.title}
                </Heading>
              </VStack>

              <SystemSelector
                systems={systems}
                activeIndex={activeIndex}
                onSelect={handleSelect}
              />

              <Box
                borderRadius="3xl"
                overflow="hidden"
                boxShadow="2xl"
                bg="bg.subtle"
                h={{ base: "400px", md: "600px" }}
                position="relative"
                transition="all 0.5s ease"
              >
                <AnimatePresence mode="wait">
                  <m.div
                    key={`gallery-${activeIndex}`}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    style={{ width: "100%", height: "100%" }}
                  >
                    {activeImageList.length > 0 ? (
                      <Gallery images={activeImageList} />
                    ) : (
                      <ComingSoonDisplay />
                    )}
                  </m.div>
                </AnimatePresence>
              </Box>

              <AnimatePresence mode="wait">
                <Grid
                  as={m.div}
                  key={`bento-${activeIndex}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
                  templateRows={{ base: "auto", lg: "320px" }}
                  gap={6}
                >
                  <GridItem colSpan={{ base: 1, lg: 2 }}>
                    <BentoAbout about={about} />
                  </GridItem>
                  <GridItem colSpan={1}>
                    <BentoCTA systemName={activeSystem?.label || seo.title} />
                  </GridItem>
                  <GridItem colSpan={{ base: 1, lg: 3 }}>
                    <BentoBenefits benefits={benefits} />
                  </GridItem>
                </Grid>
              </AnimatePresence>
            </VStack>
          </Container>
        </Box>
      </LazyMotion>
    </>
  );
};

export default ServicePageLayout;
