"use client";

import React, { useState, useCallback } from "react";
import { Box, Heading, Text, VStack, HStack, chakra } from "@chakra-ui/react";
import { ChevronDown, HelpCircle } from "lucide-react";
import type { ServiceFaq } from "@/entities/service/model";

interface ServiceFaqSectionProps {
  faqs: ServiceFaq[];
  serviceTitle: string;
}

/**
 * Preguntas frecuentes con superficie `flat` sobre fondo blanco (sin glass fuera de fotos)
 * y botón nativo con `aria-expanded` para navegación por teclado (WCAG 2.1.1).
 */
const ServiceFaqSectionInner: React.FC<ServiceFaqSectionProps> = ({
  faqs,
  serviceTitle,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  if (!faqs || faqs.length === 0) return null;

  return (
    <Box w="full" pt={{ base: "4", md: "6" }}>
      <VStack align="stretch" gap="4" w="full">
        <VStack align="flex-start" gap="1">
          <HStack gap="2" color="text.muted">
            <HelpCircle size={16} aria-hidden="true" />
            <Text fontSize="xs" fontWeight="700" textTransform="uppercase" letterSpacing="label">
              Preguntas frecuentes
            </Text>
          </HStack>
          <Heading as="h2" fontFamily="heading" size={{ base: "xl", md: "2xl" }} fontWeight="700" color="text.heading">
            Dudas comunes sobre {serviceTitle}
          </Heading>
        </VStack>

        <VStack gap="2.5" w="full" align="stretch">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            const panelId = `service-faq-panel-${idx}`;
            return (
              <Box
                key={faq.question}
                borderRadius="card"
                borderWidth="1px"
                borderColor="border.default"
                bg="bg.page"
                overflow="hidden"
              >
                <chakra.button
                  type="button"
                  w="full"
                  minH="11"
                  px={{ base: "4", md: "5" }}
                  py="3.5"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  gap="4"
                  textAlign="left"
                  cursor="pointer"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleFaq(idx)}
                  transition="background-color 0.15s ease"
                  _hover={{ bg: "bg.subtle" }}
                  _motionReduce={{ transition: "none" }}
                >
                  <Heading as="h3" fontSize={{ base: "sm", md: "md" }} fontWeight="700" color="text.heading">
                    {faq.question}
                  </Heading>
                  <Box
                    color="text.heading"
                    transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                    transition="transform 0.2s ease"
                    _motionReduce={{ transition: "none" }}
                    flexShrink={0}
                    aria-hidden="true"
                  >
                    <ChevronDown size={18} />
                  </Box>
                </chakra.button>

                {isOpen && (
                  <Box
                    id={panelId}
                    px={{ base: "4", md: "5" }}
                    pb="4"
                    pt="2"
                    borderTopWidth="1px"
                    borderColor="border.subtle"
                  >
                    <Text fontSize="sm" color="text.body" lineHeight="relaxed">
                      {faq.answer}
                    </Text>
                  </Box>
                )}
              </Box>
            );
          })}
        </VStack>
      </VStack>
    </Box>
  );
};

export const ServiceFaqSection = React.memo(ServiceFaqSectionInner);
ServiceFaqSection.displayName = "ServiceFaqSection";
