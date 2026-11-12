"use client";

import React, { useId } from "react";
import { Box, Flex, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { Calculator, CalendarCheck, MapPin } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { QUOTE_TEXTS } from "./quoteTexts";

export interface OptionChooserProps {
  categoryLabel: string;
  systemLabel: string;
  onChooseVisit: () => void;
  onChooseQuote: () => void;
}

const chooserText = QUOTE_TEXTS.chooser;

/** Tarjeta de opción: misma estructura para ambas; el botón se ancla abajo para igualar alturas. */
const OptionCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  zone?: string;
  buttonLabel: string;
  primary?: boolean;
  onChoose: () => void;
}> = ({ icon, title, description, zone, buttonLabel, primary, onChoose }) => (
  <Flex
    direction="column"
    gap="4"
    h="full"
    bg="surface.card"
    p={{ base: "4", md: "6" }}
    borderRadius="card"
    borderWidth={primary ? "2px" : "1px"}
    borderStyle="solid"
    borderColor={primary ? "text.heading" : "border.default"}
  >
    <Box color="text.accent" display="inline-flex">
      {icon}
    </Box>
    <Heading as="h3" fontFamily="heading" fontWeight="700" color="text.heading" fontSize="xl" lineHeight="title">
      {title}
    </Heading>
    <Text color="text.muted" fontSize="md">
      {description}
    </Text>
    {zone && (
      <Flex align="flex-start" gap="2" color="text.muted" fontSize="sm">
        <Box as="span" display="inline-flex" mt="0.5" flexShrink={0}>
          <MapPin size={16} aria-hidden="true" />
        </Box>
        <Text>{zone}</Text>
      </Flex>
    )}
    <Button
      type="button"
      variant={primary ? "primary" : "outline"}
      size="lg"
      w="full"
      minH="11"
      mt="auto"
      onClick={onChoose}
    >
      {buttonLabel}
    </Button>
  </Flex>
);

export const OptionChooser: React.FC<OptionChooserProps> = ({
  categoryLabel,
  systemLabel,
  onChooseVisit,
  onChooseQuote,
}) => {
  const headingId = useId();
  return (
    <Box as="section" aria-labelledby={headingId} w="full" minW="0">
      <Heading
        as="h2"
        id={headingId}
        fontFamily="heading"
        fontWeight="700"
        color="text.heading"
        fontSize="2xl"
        lineHeight="title"
        mb="1"
      >
        {chooserText.heading(categoryLabel, systemLabel)}
      </Heading>
      <Text color="text.muted" mb="4">
        {chooserText.question}
      </Text>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: "4", md: "6" }} alignItems="stretch">
        <OptionCard
          primary
          icon={<Calculator size={28} aria-hidden="true" />}
          title={chooserText.quote.title}
          description={chooserText.quote.description}
          buttonLabel={chooserText.quote.button}
          onChoose={onChooseQuote}
        />
        <OptionCard
          icon={<CalendarCheck size={28} aria-hidden="true" />}
          title={chooserText.visit.title}
          description={chooserText.visit.description}
          zone={chooserText.visit.zone}
          buttonLabel={chooserText.visit.button}
          onChoose={onChooseVisit}
        />
      </SimpleGrid>
    </Box>
  );
};
