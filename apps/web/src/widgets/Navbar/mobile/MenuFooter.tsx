"use client";

import React from "react";
import RouterLink from "next/link";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { Phone, User } from "lucide-react";
import { WhatsAppIcon } from "@/shared/components/icons/WhatsAppIcon";
import { Button } from "@/shared/ui/button";
import { ColorModeButton } from "@/shared/ui/color-mode";
import { companyData } from "@/shared/config/company-data";

export interface MenuFooterProps {
  contained?: boolean;
  onClose: () => void;
  onNavClick: () => void;
}

/**
 * Pie sticky de la hoja móvil: CTA "Cotizar por WhatsApp" + cambio de tema + teléfono + Mi cuenta.
 */
export const MenuFooter: React.FC<MenuFooterProps> = React.memo(
  ({ contained = false, onClose, onNavClick }) => {
    const whatsappQuoteUrl = `https://wa.me/${companyData.whatsappNumber}?text=${encodeURIComponent(
      companyData.whatsappMessage
    )}`;

    const phoneHref = `tel:+51${companyData.whatsappNumber.replace(/^51/, "")}`;

    return (
      <Box
        flexShrink={0}
        px="6"
        pt="3"
        pb="calc(env(safe-area-inset-bottom, 0px) + 0.75rem)"
        borderTopWidth="1px"
        borderTopColor="border.warm"
        bg="bg.surface"
      >
        <VStack align="stretch" gap="3" w="full">
          {/* Fila 1: CTA principal + cambio de tema */}
          <HStack align="center" gap="2" w="full">
            <Button
              asChild
              variant="whatsapp"
              size="lg"
              flex="1"
              minH="12"
              borderRadius="full"
              gap="2.5"
              _active={{ transform: "scale(0.98)" }}
            >
              <a
                href={whatsappQuoteUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (contained) e.preventDefault();
                  onClose();
                }}
              >
                <WhatsAppIcon size={20} aria-hidden="true" style={{ flexShrink: 0 }} />
                <Text as="span" fontWeight="600" fontSize="sm">
                  Cotizar por WhatsApp
                </Text>
              </a>
            </Button>
            <ColorModeButton
              aria-label="Cambiar modo claro u oscuro"
              iconSize={20}
              minH="11"
              minW="11"
              flexShrink={0}
            />
          </HStack>

          {/* Fila 2: teléfono y Mi cuenta, texto de 16 px */}
          <HStack justify="space-between" align="center" gap="2" w="full">
            <Box
              asChild
              borderRadius="md"
              _focusVisible={{
                outline: "2px solid",
                outlineColor: "ring.primary",
                outlineOffset: "2px",
              }}
            >
              <a
                href={phoneHref}
                onClick={(e) => {
                  if (contained) e.preventDefault();
                }}
                style={{ textDecoration: "none" }}
              >
                <HStack
                  gap="1.5"
                  align="center"
                  minH="11"
                  minW="11"
                  px="2"
                  borderRadius="md"
                  _hover={{ bg: "bg.subtle" }}
                  _active={{ bg: "bg.subtle" }}
                >
                  <Phone size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                  <Text fontSize="md" fontWeight="600" color="text.heading" whiteSpace="nowrap">
                    {companyData.whatsappDisplay}
                  </Text>
                </HStack>
              </a>
            </Box>

            <Box
              asChild
              borderRadius="md"
              _focusVisible={{
                outline: "2px solid",
                outlineColor: "ring.primary",
                outlineOffset: "2px",
              }}
            >
              <RouterLink
                href="/mi-cuenta"
                onClick={(e) => {
                  if (contained) e.preventDefault();
                  onNavClick();
                }}
                style={{ textDecoration: "none" }}
              >
                <HStack
                  gap="1.5"
                  align="center"
                  minH="11"
                  minW="11"
                  px="2"
                  borderRadius="md"
                  _hover={{ bg: "bg.subtle" }}
                  _active={{ bg: "bg.subtle" }}
                >
                  <User size={16} aria-hidden="true" style={{ flexShrink: 0 }} />
                  <Text fontSize="md" fontWeight="600" color="text.heading" whiteSpace="nowrap">
                    Mi cuenta
                  </Text>
                </HStack>
              </RouterLink>
            </Box>
          </HStack>
        </VStack>
      </Box>
    );
  }
);

MenuFooter.displayName = "MenuFooter";
