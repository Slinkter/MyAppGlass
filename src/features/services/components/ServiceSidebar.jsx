import React from "react";
import {
  Box,
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

const NavigationSection = ({ title, systems, activeIndex, onSelect }) => {
  const textColor = useColorModeValue("gray.600", "gray.400"); // Use a subtle text color
  return (
    <Box>
      <Text
        fontSize="md" // Smaller font size
        fontWeight="bold"
        textTransform="uppercase" // Keep uppercase for clarity as a label
        letterSpacing="wider" // Keep wide letter spacing
        color={textColor} // Use a subtle text color
        opacity={0.7}
        mb={3} // Reduced margin-bottom
      >
        {title}
      </Text>
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
 * @returns {JSX.Element} Barra lateral renderizada.
 */
const ServiceSidebar = (props) => {
  const { seo, systems, activeIndex, setActiveIndex, activeSystem } = props;

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
      p={6}
      borderWidth="1px"
      borderColor={borderColor}
      boxShadow="2xl"
    >
      <VStack
        spacing={{ base: 6, md: 7, lg: 8 }}
        align="stretch"
        flex="1"
        pr={{ base: 0, lg: 2 }}
        overflowY={{ base: "visible", lg: "auto" }}
        css={{
          "&::-webkit-scrollbar": { width: "4px" },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            background: useColorModeValue(
              "rgba(0,0,0,0.1)",
              "rgba(255,255,255,0.1)",
            ),
            borderRadius: "20px",
          },
        }}
      >
        <NavigationSection
          title={seo.title}
          systems={systems}
          activeIndex={activeIndex}
          onSelect={setActiveIndex}
        />

        <Box mt="auto" pt={4}>
          <Divider borderColor={borderColor} mb={6} />
          <CTASection
            label={activeSystem?.label || seo.title}
            accentColor={accentColor}
            textColor={textColor}
          />
        </Box>
      </VStack>
    </GlassCard>
  );
};

export default ServiceSidebar;
