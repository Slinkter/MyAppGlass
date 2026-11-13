"use client";

import React, { useMemo } from "react";
import { Box, Heading, HStack, Text, VStack, chakra } from "@chakra-ui/react";
import { ClipboardList } from "lucide-react";
import type { ServiceSpec } from "@/entities/service/model";
import { createGroupMap } from "@/shared/utils/algorithm-utils";

interface ServiceSpecsSectionProps {
  specs: ServiceSpec[];
  serviceTitle: string;
}

const ServiceSpecsSectionInner: React.FC<ServiceSpecsSectionProps> = ({
  specs,
  serviceTitle,
}) => {
  const groupedSpecs = useMemo(() => {
    if (!specs || specs.length === 0) return [];
    const map = createGroupMap(specs, (spec) => spec.grupo?.trim() || "");
    return Array.from(map.entries());
  }, [specs]);

  if (!specs || specs.length === 0) return null;

  return (
    <Box w="full" pt={{ base: 6, md: 8 }}>
      <VStack align="flex-start" gap={5} w="full">
        <VStack align="flex-start" gap={1}>
          <HStack gap={2} color="text.accent">
            <ClipboardList size={18} aria-hidden="true" />
            <Text
              fontSize="xs"
              fontWeight="700"
              textTransform="uppercase"
              letterSpacing="widest"
            >
              Ficha Técnica
            </Text>
          </HStack>
          <Heading
            as="h2"
            size={{ base: "md", md: "lg" }}
            fontWeight="700"
            color="text.heading"
          >
            Especificaciones técnicas de {serviceTitle}
          </Heading>
        </VStack>

        <VStack gap={5} w="full" align="stretch">
          {groupedSpecs.map(([groupName, items]) => (
            <Box
              key={groupName || "__general__"}
              w="full"
              borderRadius="2xl"
              borderWidth="1px"
              borderColor="border.default"
              bg="bg.subtle"
              overflow="hidden"
            >
              {groupName && (
                <Box
                  px={{ base: 4, md: 5 }}
                  py={3}
                  borderBottomWidth="1px"
                  borderColor="border.default"
                >
                  <Heading
                    as="h3"
                    size={{ base: "xs", md: "sm" }}
                    fontWeight="700"
                    color="text.heading"
                  >
                    {groupName}
                  </Heading>
                </Box>
              )}

              {/* Escritorio: tabla de 2 columnas */}
              <Box display={{ base: "none", md: "block" }} w="full">
                <chakra.table w="full" borderCollapse="collapse">
                  <chakra.tbody>
                    {items.map((spec, idx) => (
                      <chakra.tr
                        key={`${spec.label}-${idx}`}
                        borderBottomWidth={idx < items.length - 1 ? "1px" : "0"}
                        borderColor="border.default"
                      >
                        <chakra.th
                          scope="row"
                          w="40%"
                          px={5}
                          py={3.5}
                          textAlign="left"
                          fontSize="xs"
                          fontWeight="600"
                          color="text.heading"
                          verticalAlign="top"
                        >
                          {spec.label}
                        </chakra.th>
                        <chakra.td
                          px={5}
                          py={3.5}
                          fontSize="xs"
                          color="text.muted"
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

              {/* Móvil: lista de pares sin scroll horizontal */}
              <VStack
                display={{ base: "flex", md: "none" }}
                align="stretch"
                gap={0}
                w="full"
              >
                {items.map((spec, idx) => (
                  <VStack
                    key={`${spec.label}-${idx}`}
                    align="stretch"
                    gap={1}
                    px={4}
                    py={3}
                    borderBottomWidth={idx < items.length - 1 ? "1px" : "0"}
                    borderColor="border.default"
                  >
                    <Text fontSize="xs" fontWeight="600" color="text.heading">
                      {spec.label}
                    </Text>
                    <Text
                      fontSize="xs"
                      color="text.muted"
                      fontVariantNumeric="tabular-nums"
                      lineHeight="relaxed"
                    >
                      {spec.value}
                    </Text>
                  </VStack>
                ))}
              </VStack>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export const ServiceSpecsSection = React.memo(ServiceSpecsSectionInner);
ServiceSpecsSection.displayName = "ServiceSpecsSection";
