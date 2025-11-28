import React from "react";
import {
  Box,
  Heading,
  Stack,
  VStack,
  Text,
  Grid,
  HStack,
  Icon,
  Divider,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import SidebarItem from "@/components/common/SidebarItem";
import GlassCard from "@/components/common/GlassCard";

/**
 * Panel lateral con información del servicio, navegación de sistemas y especificaciones.
 */
const ServiceSidebar = ({
  seo,
  systems,
  activeIndex,
  setActiveIndex,
  activeSystem,
  features,
  glassStyles,
}) => {
  return (
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
                  bg={useColorModeValue("whiteAlpha.500", "whiteAlpha.50")}
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
            as="a"
            href={`https://wa.me/51974278303?text=Quisiera una cotización para ${
              activeSystem?.label || seo.title
            }`}
            target="_blank"
            rel="noopener noreferrer"
            size={{ base: "md", md: "lg" }}
            w="full"
            bg={glassStyles.accent}
            color="white"
            rightIcon={<ArrowForwardIcon />}
            _hover={{
              bg: useColorModeValue("blue.700", "blue.400"),
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
  );
};

export default ServiceSidebar;
