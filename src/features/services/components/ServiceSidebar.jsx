import React from "react";
import {
  Box,
  Heading,
  Stack,
  VStack,
  Text,
  Divider,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import SidebarItem from "@shared/components/common/SidebarItem";
import GlassCard from "@shared/components/common/GlassCard";
import SpecItem from "./SpecItem";

const SidebarSection = ({ title, children, show = true }) => {
  const textColor = useColorModeValue("gray.600", "gray.400");
  if (!show) return null;
  return (
    <Box>
      <Text
        fontSize="xs"
        fontWeight="bold"
        textTransform="uppercase"
        letterSpacing="wider"
        color={textColor}
        opacity={0.7}
        mb={{ base: 3, md: 4 }}
      >
        {title}
      </Text>
      <Stack spacing={2}>{children}</Stack>
    </Box>
  );
};

const NavigationSection = ({ title, systems, activeIndex, onSelect }) => {
  const headingColor = useColorModeValue("gray.900", "white");
  return (
    <Box>
      <Heading
        as="h3"
        size={{ base: "sm", md: "md" }}
        mb={{ base: 3, md: 4 }}
        color={headingColor}
        letterSpacing="tight"
      >
        {title}
      </Heading>
      <Stack spacing={2}>
        {systems.map((item, index) => (
          <SidebarItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            isActive={activeIndex === index}
            onClick={() => onSelect(index)}
          />
        ))}
      </Stack>
    </Box>
  );
};

const CTASection = ({ label, accentColor, textColor }) => (
  <Box>
    <Button
      as="a"
      href={`https://wa.me/51974278303?text=Quisiera una cotización para ${label}`}
      target="_blank"
      rel="noopener noreferrer"
      size={{ base: "md", md: "lg" }}
      w="full"
      bg={accentColor}
      color="white"
      rightIcon={<ArrowForwardIcon />}
      _hover={{
        bg: useColorModeValue("primary.700", "primary.400"),
        transform: "translateY(-2px)",
        boxShadow: "xl",
        textDecoration: "none",
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
      color={textColor}
      textAlign="center"
      mt={2}
      opacity={0.7}
    >
      Obtén una cotización personalizada en 24 horas
    </Text>
  </Box>
);

/**
 * @component ServiceSidebar
 * @description Barra lateral con controles para la página de servicios.
 * Permite navegar entre sistemas y muestra especificaciones técnicas.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {Object} props.seo - Información SEO y títulos.
 * @param {Array<Object>} props.systems - Lista de sistemas disponibles para el servicio.
 * @param {number} props.activeIndex - Índice del sistema activo.
 * @param {function} props.setActiveIndex - Setter para cambiar el sistema activo.
 * @param {Object} props.activeSystem - Objeto del sistema actualmente seleccionado.
 * @param {Array<Object>} props.features - Lista de especificaciones técnicas.
 * @returns {JSX.Element} Barra lateral renderizada.
 */
const ServiceSidebar = (props) => {
  const { seo, systems, activeIndex, setActiveIndex, activeSystem, features } =
    props;

  const textColor = useColorModeValue("gray.600", "gray.400");
  const accentColor = useColorModeValue("primary.600", "primary.300");
  const borderColor = useColorModeValue("whiteAlpha.300", "whiteAlpha.100");

  return (
    <GlassCard
      display="flex"
      flexDirection="column"
      h={{ base: "auto", lg: "85vh" }}
      overflow={{ base: "visible", lg: "hidden" }}
      w="100%"
      p={4}
    >
      <VStack
        spacing={{ base: 4, md: 5, lg: 6 }}
        align="stretch"
        flex="1"
        pr={{ base: 0, lg: 2 }}
        overflowY={{ base: "visible", lg: "auto" }}
      >
        <NavigationSection
          title={seo.title}
          systems={systems}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />

        <SidebarSection
          title="Especificaciones Técnicas"
          show={features && features.length > 0}
        >
          {features?.map((item, index) => {
            const [label, value] = item.label.split(":");
            return (
              <SpecItem
                key={index}
                icon={item.icon}
                label={label}
                value={value || "Estándar"}
              />
            );
          })}
        </SidebarSection>

        <Divider borderColor={borderColor} />

        <CTASection
          label={activeSystem?.label || seo.title}
          accentColor={accentColor}
          textColor={textColor}
        />
      </VStack>
    </GlassCard>
  );
};

export default ServiceSidebar;
