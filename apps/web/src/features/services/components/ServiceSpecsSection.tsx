"use client";

import React, { useMemo, useState, useCallback } from "react";
import { Box, Heading, HStack, Text, VStack, chakra } from "@chakra-ui/react";
import { ChevronDown, ClipboardList } from "lucide-react";
import type { ServiceSpec } from "@/entities/service/model";
import { createGroupMap } from "@/shared/utils/algorithm-utils";

interface ServiceSpecsSectionProps {
  specs: ServiceSpec[];
  serviceTitle: string;
}

/**
 * Ficha técnica compacta en acordeón por grupo: evita saturar móvil con 7 tablas apiladas
 * y mantiene cada dato escaneable con tipografía tabular.
 */
const ServiceSpecsSectionInner: React.FC<ServiceSpecsSectionProps> = ({
  specs,
  serviceTitle,
}) => {
  const [openGroupIndex, setOpenGroupIndex] = useState<number | null>(0);

  const groupedSpecs = useMemo(() => {
    if (!specs || specs.length === 0) return [];
    const map = createGroupMap(specs, (spec) => spec.grupo?.trim() || "Especificaciones generales");
    return Array.from(map.entries());
  }, [specs]);

  const toggleGroup = useCallback((idx: number) => {
    setOpenGroupIndex((prev) => (prev === idx ? null : idx));
  }, []);

  if (!specs || specs.length === 0) return null;

  return (
    <Box id="ficha-tecnica" w="full" pt={{ base: "4", md: "6" }}>
      <VStack align="stretch" gap="4" w="full">
        <VStack align="flex-start" gap="1">
          <HStack gap="2" color="text.muted">
            <ClipboardList size={16} aria-hidden="true" />
            <Text fontSize="xs" fontWeight="700" textTransform="uppercase" letterSpacing="label">
              Especificaciones generales del servicio
            </Text>
          </HStack>
          <Heading as="h2" fontFamily="heading" size={{ base: "xl", md: "2xl" }} fontWeight="700" color="text.heading">
            Detalles constructivos de {serviceTitle}
          </Heading>
        </VStack>

        <VStack gap="2.5" w="full" align="stretch">
          {groupedSpecs.map(([groupName, items], groupIdx) => {
            const isOpen = openGroupIndex === groupIdx;
            const panelId = `spec-group-panel-${groupIdx}`;
            return (
              <Box
                key={groupName}
                w="full"
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
                  py="3"
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  textAlign="left"
                  cursor="pointer"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleGroup(groupIdx)}
                  transition="background-color 0.15s ease"
                  _hover={{ bg: "bg.subtle" }}
                  _motionReduce={{ transition: "none" }}
                >
                  <HStack gap="2.5" minW={0}>
                    <Heading as="h3" fontSize={{ base: "sm", md: "md" }} fontWeight="700" color="text.heading">
                      {groupName}
                    </Heading>
                    <Text fontSize="xs" color="text.muted" flexShrink={0}>
                      ({items.length})
                    </Text>
                  </HStack>
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
                  <Box id={panelId} borderTopWidth="1px" borderColor="border.subtle">
                    <Box display={{ base: "none", md: "block" }} w="full">
                      <chakra.table w="full" borderCollapse="collapse">
                        <chakra.tbody>
                          {items.map((spec, idx) => (
                            <chakra.tr
                              key={`${spec.label}-${idx}`}
                              borderBottomWidth={idx < items.length - 1 ? "1px" : "0"}
                              borderColor="border.subtle"
                            >
                              <chakra.th
                                scope="row"
                                w="38%"
                                px="5"
                                py="3"
                                textAlign="left"
                                fontSize="sm"
                                fontWeight="600"
                                color="text.heading"
                                verticalAlign="top"
                              >
                                {spec.label}
                              </chakra.th>
                              <chakra.td
                                px="5"
                                py="3"
                                fontSize="sm"
                                color="text.body"
                                fontVariantNumeric="tabular-nums"
                                lineHeight="relaxed"
                              >
                                {spec.value}
                              </chakra.td>
                            </chakra.tr>
                          ))}
                        </chakra.tbody>
                      </chakra.table>
                    </Box>

                    <VStack display={{ base: "flex", md: "none" }} align="stretch" gap="0" w="full">
                      {items.map((spec, idx) => (
                        <VStack
                          key={`${spec.label}-${idx}`}
                          align="stretch"
                          gap="0.5"
                          px="4"
                          py="3"
                          borderBottomWidth={idx < items.length - 1 ? "1px" : "0"}
                          borderColor="border.subtle"
                        >
                          <Text fontSize="xs" fontWeight="700" color="text.heading">
                            {spec.label}
                          </Text>
                          <Text
                            fontSize="sm"
                            color="text.body"
                            fontVariantNumeric="tabular-nums"
                            lineHeight="relaxed"
                          >
                            {spec.value}
                          </Text>
                        </VStack>
                      ))}
                    </VStack>
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

export const ServiceSpecsSection = React.memo(ServiceSpecsSectionInner);
ServiceSpecsSection.displayName = "ServiceSpecsSection";
