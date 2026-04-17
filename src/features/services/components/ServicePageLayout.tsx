import React from "react";
import { Helmet } from "react-helmet-async";
import {
  Box,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  Container,
  HStack,
  Button,
  Grid,
  GridItem,
  Flex,
  Skeleton,
  BoxProps
} from "@chakra-ui/react";
import { CheckCircle2, MessageSquareText } from "lucide-react";
import { LazyMotion, m, domAnimation, AnimatePresence } from "framer-motion";
import Gallery from "@shared/components/common/Gallery";
import ComingSoonDisplay from "@shared/components/common/ComingSoonDisplay";
import BackButton from "@shared/components/navigation/BackButton";
import { ServicePageData, ServicePageSystem, ServicePageFeature } from "../services/serviceService";

interface BentoCardProps extends BoxProps {
  children: React.ReactNode;
}

const BentoCard: React.FC<BentoCardProps> = ({ children, bg, color, ...props }) => (
  <Box
    p={{ base: "phi_md", lg: "phi_lg" }}
    h="full"
    bg={bg || "bg.section"}
    color={color || "text.body"}
    borderRadius="3xl"
    border="1px solid"
    borderColor="border.glass"
    shadow="xl"
    _dark={{ bg: bg ? undefined : "whiteAlpha.50", borderColor: "whiteAlpha.200" }}
    transition="transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
    _hover={{ transform: "translateY(-4px)", shadow: "2xl" }}
    {...props}
  >
    {children}
  </Box>
);

interface SystemSelectorProps {
  systems: ServicePageSystem[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

const SystemSelector = React.memo(({ systems, activeIndex, onSelect }: SystemSelectorProps) => {
  if (!systems || systems.length <= 1) return null;

  return (
    <HStack
      bg="bg.subtle"
      p={1.5}
      borderRadius="full"
      display="inline-flex"
      overflowX="auto"
      maxW="full"
      border="1px solid"
      borderColor="border.glass"
      _dark={{ bg: "blackAlpha.400", borderColor: "whiteAlpha.100" }}
      css={{
        '&::-webkit-scrollbar': { display: 'none' },
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      {systems.map((system, index) => (
        <Button
          key={system.label}
          onClick={() => onSelect(index)}
          size={{ base: "sm", md: "md" }}
          variant={activeIndex === index ? "aura" : "ghost"}
          borderRadius="full"
          px={{ base: 6, md: 8 }}
          flexShrink={0}
          fontWeight={activeIndex === index ? "bold" : "medium"}
          color={activeIndex === index ? "white" : "text.muted"}
          _dark={{ color: activeIndex === index ? "primary.900" : "whiteAlpha.700" }}
          _hover={activeIndex !== index ? { bg: "whiteAlpha.100", color: "text.body" } : undefined}
          transition="all 0.3s ease"
        >
          {system.label}
        </Button>
      ))}
    </HStack>
  );
});
SystemSelector.displayName = "SystemSelector";

interface BentoAboutProps {
  about?: { description: string };
}

const BentoAbout = React.memo(({ about }: BentoAboutProps) => {
  if (!about) return null;
  return (
    <BentoCard display="flex" flexDirection="column" justifyContent="center">
      <Text fontSize="xs" fontWeight="900" color="primary.500" letterSpacing="0.2em" textTransform="uppercase" mb={4}>
        Concepto Técnico
      </Text>
      <Text fontSize={{ base: "md", md: "xl" }} lineHeight="tall" fontWeight="medium" _dark={{ color: "whiteAlpha.800" }}>
        {about.description}
      </Text>
    </BentoCard>
  );
});
BentoAbout.displayName = "BentoAbout";

interface BentoBenefitsProps {
  benefits?: ServicePageFeature[];
}

const BentoBenefits = React.memo(({ benefits }: BentoBenefitsProps) => {
  if (!benefits) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  return (
    <BentoCard>
      <Text fontSize="xs" fontWeight="900" color="primary.500" letterSpacing="0.2em" textTransform="uppercase" mb={8}>
        Ventajas Estructurales
      </Text>
      <SimpleGrid 
        as={m.div} 
        variants={containerVariants} 
        initial="hidden" 
        whileInView="show"
        viewport={{ once: true }}
        columns={{ base: 1, sm: 2, lg: 3 }} 
        gap={{ base: 4, lg: 8 }}
      >
        {benefits.map((benefit, i) => (
          <HStack as={m.div} variants={itemVariants} key={i} align="flex-start" gap={4} bg="bg.page" _dark={{ bg: "whiteAlpha.50" }} p={5} borderRadius="xl" border="1px solid" borderColor="border.glass">
            <Box as={CheckCircle2} color="primary.500" mt={0.5} boxSize={5} />
            <Text fontWeight="semibold" fontSize="sm" color="text.body" _dark={{ color: "whiteAlpha.900" }}>{benefit.label}</Text>
          </HStack>
        ))}
      </SimpleGrid>
    </BentoCard>
  );
});
BentoBenefits.displayName = "BentoBenefits";

interface BentoCTAProps {
  systemName: string;
}

const BentoCTA = React.memo(({ systemName }: BentoCTAProps) => {
  return (
    <BentoCard
      bg="primary.900"
      _dark={{ bg: "black", borderColor: "whiteAlpha.200" }}
      color="white"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
      border="1px solid"
      borderColor="primary.500"
    >
      <Box as={MessageSquareText} boxSize={10} mb={6} color="primary.300" _dark={{ color: "primary.500" }} />
      <Heading size="md" mb={3} letterSpacing="tight">¿Iniciamos tu obra?</Heading>
      <Text opacity={0.8} mb={8} fontSize="sm">Asesoría técnica exclusiva para tu proyecto de {systemName}.</Text>
      <Button
        as="a"
        href={`https://wa.me/51974278303?text=Hola, me interesa el servicio de ${systemName}`}
        target="_blank"
        variant="outline"
        color="white"
        borderColor="whiteAlpha.400"
        borderRadius="full"
        size="lg"
        px={8}
        w="full"
        _hover={{ bg: "white", color: "primary.900", borderColor: "white" }}
      >
        COTIZAR AHORA
      </Button>
    </BentoCard>
  );
});
BentoCTA.displayName = "BentoCTA";

export interface ServicePageLayoutProps {
  pageData: ServicePageData & { about?: { description: string }, benefits?: ServicePageFeature[] };
}

const ServicePageLayout: React.FC<ServicePageLayoutProps> = ({ pageData }) => {
  const { seo, about, benefits, systems, imageLists } = pageData;
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isPending, startTransition] = React.useTransition();

  const activeImageList = React.useMemo(() => imageLists[activeIndex] || [], [imageLists, activeIndex]);
  const activeSystem = React.useMemo(() => systems[activeIndex], [systems, activeIndex]);

  const handleSelect = React.useCallback((index: number) => {
    startTransition(() => {
      setActiveIndex(index);
    });
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
          <Container maxW="7xl" pt={{ base: 8, md: 16 }} pb={32}>
            <VStack gap={{ base: 12, lg: 16 }} align="stretch">
              
              <Flex direction={{ base: "column", md: "row" }} justify="space-between" align={{ base: "flex-start", md: "flex-end" }} gap={8}>
                <VStack gap={4} align="flex-start">
                  <Box mb={2}><BackButton to="/servicios" /></Box>
                  <Heading size={{ base: "xl", md: "4xl" }} fontWeight="black" letterSpacing="tight" color="text.heading">
                    {seo.title}
                  </Heading>
                </VStack>
                <SystemSelector
                  systems={systems}
                  activeIndex={activeIndex}
                  onSelect={handleSelect}
                />
              </Flex>

              <Skeleton
                loading={isPending}
                borderRadius="3xl"
                startColor="bg.subtle"
                endColor="bg.section"
                _dark={{ startColor: "whiteAlpha.50", endColor: "whiteAlpha.100" }}
              >
                <Box
                  h={{ base: "450px", md: "700px" }}
                  position="relative"
                >
                  <AnimatePresence mode="wait">
                    <m.div
                      key={`gallery-${activeIndex}`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.02 }}
                      transition={{ duration: 0.5, ease: "circOut" }}
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
              </Skeleton>

              <AnimatePresence mode="wait">
                <Grid
                  as={m.div}
                  key={`bento-${activeIndex}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                  templateColumns={{ base: "1fr", lg: "repeat(3, 1fr)" }}
                  templateRows={{ base: "auto", lg: "minmax(380px, auto)" }}
                  gap={{ base: 8, lg: 12 }}
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
