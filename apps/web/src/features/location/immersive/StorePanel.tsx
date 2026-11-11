"use client";

import React from "react";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { Clock, MapPin, MessageCircle, Navigation } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { companyData } from "@/shared/config/company-data";
import { TOUCH_MIN } from "@/shared/constants/layout";
import {
  STORE_DIRECTIONS_URL,
  STORE_SCHEDULE,
} from "../useLocationData";
import { useIsStoreOpen } from "@/entities/store/lib/useIsStoreOpen";
import { liquidGlassRegular, placeCardAnchor } from "./floatingPanelStyles";

const WHATSAPP_URL = `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(companyData.whatsappMessage)}`;

export interface StorePanelProps {
  address: string;
  projectCount: number;
  selected: boolean;
  onSelectStore: () => void;
}

/**
 * Place Card de la Sede Principal (`maps.md › Place cards`, `liquid-glass.md › Color on glass`).
 * - Una sola acción prominente con relleno (`Cómo llegar`, `variant="aura"`) y secundaria monocromática (`variant="outline"`).
 * - Estado de apertura comunicado con texto + indicador visual (`accessibility.md › Vision`: nunca solo por color).
 */
export const StorePanel: React.FC<StorePanelProps> = React.memo(
  ({ address, projectCount, selected, onSelectStore }) => {
    const isOpen = useIsStoreOpen();
    const statusLabel = isOpen === null ? "Lun–Sáb" : isOpen ? "Abierto" : "Cerrado";

    return (
      <Box
        as="section"
        aria-label="Sede principal de GYA"
        {...placeCardAnchor}
        {...liquidGlassRegular}
        p={{ base: "2.5", md: "5" }}
      >
        {/* Vista compacta en móvil (base): Place Card conciso con separación de 8px entre controles */}
        <HStack gap="2.5" align="center" display={{ base: "flex", md: "none" }} minW={0}>
          <Box
            as="button"
            onClick={onSelectStore}
            aria-pressed={selected}
            aria-label="Centrar el mapa en la sede principal"
            display="flex"
            alignItems="center"
            gap="2.5"
            minW={0}
            flex="1"
            minH={TOUCH_MIN}
            px="1"
            textAlign="left"
            borderRadius="xl"
            cursor="pointer"
            _focusVisible={{ outline: "2px solid", outlineColor: "primary.500", outlineOffset: "2px" }}
          >
            <Box minW={0} flex="1">
              <HStack gap="1.5" align="center">
                <Box
                  w="2"
                  h="2"
                  borderRadius="full"
                  bg={isOpen === null ? "text.muted" : isOpen ? "status.success" : "status.danger"}
                  flexShrink={0}
                />
                <Text fontSize="xs" fontWeight="700" color="text.heading" truncate>
                  Sede La Molina · {statusLabel}
                </Text>
              </HStack>
              <Text fontSize="xs" color="text.muted" truncate mt="0.5">
                {address}
              </Text>
            </Box>
          </Box>

          <HStack gap="2" flexShrink={0}>
            <Button
              asChild
              variant="primary"
              minW={TOUCH_MIN}
              minH={TOUCH_MIN}
              h={TOUCH_MIN}
              w={TOUCH_MIN}
              p="0"
              borderRadius="xl"
            >
              <a
                href={STORE_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Cómo llegar a la sede"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  minWidth: "44px",
                  minHeight: "44px",
                }}
              >
                <Navigation size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              minW={TOUCH_MIN}
              minH={TOUCH_MIN}
              h={TOUCH_MIN}
              w={TOUCH_MIN}
              p="0"
              borderRadius="xl"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Escribir por WhatsApp"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  minWidth: "44px",
                  minHeight: "44px",
                }}
              >
                <MessageCircle size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
              </a>
            </Button>
          </HStack>
        </HStack>

        {/* Vista Place Card completa en tablet y escritorio (md+) */}
        <VStack align="stretch" gap="4" display={{ base: "none", md: "flex" }}>
          <HStack justify="space-between" align="center">
            <HStack gap="2" role="status">
              <Box
                w="2"
                h="2"
                borderRadius="full"
                bg={isOpen === null ? "text.muted" : isOpen ? "status.success" : "status.danger"}
                flexShrink={0}
              />
              <Text
                fontSize="xs"
                fontWeight="700"
                letterSpacing="0.12em"
                textTransform="uppercase"
                color="text.muted"
              >
                {isOpen === null ? "Sede Principal" : isOpen ? "Abierto ahora" : "Cerrado ahora"}
              </Text>
            </HStack>
            <Text fontSize="xs" fontWeight="600" color="text.muted">
              {projectCount} obras
            </Text>
          </HStack>

          <Box
            as="button"
            onClick={onSelectStore}
            aria-pressed={selected}
            aria-label="Centrar el mapa en la sede principal"
            textAlign="left"
            cursor="pointer"
            borderRadius="lg"
            _focusVisible={{ outline: "2px solid", outlineColor: "primary.500", outlineOffset: "2px" }}
          >
            <Heading
              as="h3"
              fontSize="md"
              fontWeight="700"
              letterSpacing="tight"
              color="text.heading"
              lineClamp={1}
            >
              {companyData.razonSocial}
            </Heading>
            <HStack gap="1.5" mt="1.5" color="text.muted" fontSize="xs">
              <MapPin size={14} aria-hidden="true" style={{ flexShrink: 0 }} />
              <Text truncate>{address}</Text>
            </HStack>
            <HStack gap="1.5" mt="1" color="text.muted" fontSize="xs">
              <Clock size={14} aria-hidden="true" style={{ flexShrink: 0 }} />
              <Text>
                {STORE_SCHEDULE.days} · {STORE_SCHEDULE.hours}
              </Text>
            </HStack>
          </Box>

          <Box h="1px" bg="border.default" />

          <HStack gap="2.5">
            <Button
              asChild
              variant="primary"
              size="sm"
              flex="1"
              minH={TOUCH_MIN}
              minW={TOUCH_MIN}
              h={TOUCH_MIN}
              borderRadius="xl"
            >
              <a
                href={STORE_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Cómo llegar a la sede en Google Maps"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  minHeight: "44px",
                }}
              >
                <Navigation size={15} aria-hidden="true" style={{ flexShrink: 0 }} />
                Cómo llegar
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              flex="1"
              minH={TOUCH_MIN}
              minW={TOUCH_MIN}
              h={TOUCH_MIN}
              borderRadius="xl"
            >
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Escribir por WhatsApp"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "100%",
                  height: "100%",
                  minHeight: "44px",
                }}
              >
                <MessageCircle size={15} aria-hidden="true" style={{ flexShrink: 0 }} />
                WhatsApp
              </a>
            </Button>
          </HStack>
        </VStack>
      </Box>
    );
  },
);
StorePanel.displayName = "StorePanel";
