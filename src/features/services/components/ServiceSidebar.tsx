"use client";

import React from "react";
import {
  Box,
  Stack,
  VStack,
  Text as ChakraText,
  Button
} from "@chakra-ui/react";
import { ChevronRight } from "lucide-react";
import SidebarItem from "@shared/components/common/SidebarItem";
import GlassCard from "@shared/components/common/GlassCard";

const NavigationSection = ({ title, systems, activeIndex, onSelect }: any) => {
  return (
    <Box>
      <ChakraText
        fontSize="md"
        fontWeight="bold"
        textTransform="uppercase"
        letterSpacing="wider"
        color="text.muted"
        opacity={0.7}
        mb={3}
      >
        {title}
      </ChakraText>
      <Stack gap={2}>
        {systems.map((item: any, index: number) => (
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

const CTASection = ({ label, isSecondary }: any) => (
  <Box>
    <Button
      asChild
      size={{ base: "md", md: "lg" }}
      w="full"
      bg="primary.500"
      color="white"
      _hover={{
        bg: "primary.600",
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
      <a
        href={`https://wa.me/51974278303?text=Quisiera una cotización para ${label}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {isSecondary ? "Solicitar Cotización" : "Cotizar Ahora"} <ChevronRight size={18} style={{ marginLeft: '8px' }} />
      </a>
    </Button>
    <ChakraText
      fontSize="xs"
      color="text.muted"
      textAlign="center"
      mt={2}
      opacity={0.7}
    >
      {isSecondary ? "Te respondemos en breve" : "Obtén una cotización personalizada en 24 horas"}
    </ChakraText>
  </Box>
);

const ServiceSidebar = (props: any) => {
  const { seo, systems, activeIndex, setActiveIndex, activeSystem } = props;

  return (
    <GlassCard
      display="flex"
      flexDirection="column"
      h={{ base: "auto", lg: "85vh" }}
      overflow={{ base: "visible", lg: "hidden" }}
      w="100%"
      p={6}
      borderWidth="1px"
      borderColor="border.default"
      boxShadow="2xl"
    >
      <VStack
        gap={{ base: 6, md: 7, lg: 8 }}
        align="stretch"
        flex="1"
        pr={{ base: 0, lg: 2 }}
        overflowY={{ base: "visible", lg: "auto" }}
        css={{
          "&::-webkit-scrollbar": { width: "4px" },
          "&::-webkit-scrollbar-track": { background: "transparent" },
          "&::-webkit-scrollbar-thumb": {
            background: "var(--chakra-colors-bg-subtle)",
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

        <Box>
          <CTASection
            label={activeSystem?.label || seo.title}
            isSecondary
          />
        </Box>

        <Box mt="auto" pt={4}>
          <Box borderTop="1px" borderColor="border.glass" mb={6} />
          <CTASection
            label={activeSystem?.label || seo.title}
          />
        </Box>
      </VStack>
    </GlassCard>
  );
};

export default ServiceSidebar;
