"use client";

import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { ChevronDown, HelpCircle } from "lucide-react";
import AuraSurface from "@/shared/components/aura/AuraSurface";
import { ServiceFaq } from "../data/serviceFaqs";

interface ServiceFaqSectionProps {
  faqs: ServiceFaq[];
  serviceTitle: string;
}

export const ServiceFaqSection: React.FC<ServiceFaqSectionProps> = ({ faqs, serviceTitle }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <Box w="full" pt={{ base: 6, md: 8 }}>
      <VStack align="flex-start" gap={5} w="full">
        <VStack align="flex-start" gap={1}>
          <HStack gap={2} color="text.accent">
            <HelpCircle size={18} />
            <Text fontSize="2xs" fontWeight="900" textTransform="uppercase" letterSpacing="widest">
              Preguntas Frecuentes
            </Text>
          </HStack>
          <Heading as="h2" size={{ base: "md", md: "lg" }} fontWeight="800" color="text.heading">
            Dudas comunes sobre {serviceTitle}
          </Heading>
        </VStack>

        <VStack gap={3} w="full" align="stretch">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <AuraSurface
                key={faq.question}
                p={{ base: 4, md: 5 }}
                variant="glass"
                cursor="pointer"
                onClick={() => toggleFaq(idx)}
                transition="all 0.2s ease"
                _hover={{ borderColor: "primary.500" }}
              >
                <VStack align="stretch" gap={2}>
                  <HStack justify="space-between" align="center">
                    <Heading as="h3" size="xs" fontWeight="700" color="text.heading" pr={4}>
                      {faq.question}
                    </Heading>
                    <Box
                      color="text.accent"
                      transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                      transition="transform 0.2s ease"
                      flexShrink={0}
                    >
                      <ChevronDown size={18} />
                    </Box>
                  </HStack>
                  {isOpen && (
                    <Text fontSize="xs" color="text.muted" lineHeight="relaxed" pt={1}>
                      {faq.answer}
                    </Text>
                  )}
                </VStack>
              </AuraSurface>
            );
          })}
        </VStack>
      </VStack>
    </Box>
  );
};
