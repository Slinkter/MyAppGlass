"use client";

import React from "react";
import Image from "next/image";
import { HStack, Text } from "@chakra-ui/react";
import { X } from "lucide-react";
import { Button } from "@/shared/ui/button";
import logoGYA from "@/assets/branding/logosvg.svg";
import { companyData } from "@/shared/config/company-data";

export interface MenuHeaderProps {
  onClose: () => void;
}

/**
 * Cabecera de la hoja móvil: logo + razón social / identificador + botón de cierre accesible.
 */
export const MenuHeader: React.FC<MenuHeaderProps> = React.memo(({ onClose }) => {
  return (
    <HStack flexShrink={0} justify="space-between" align="center" w="full" px="6" pt="1">
      <HStack gap="2.5" align="center" minH="11">
        <Image
          src={logoGYA}
          alt={companyData.companyName}
          width={32}
          height={32}
          unoptimized
          loading="eager"
          priority
          style={{ flexShrink: 0 }}
        />
        <Text
          fontFamily="heading"
          fontWeight="700"
          fontSize="md"
          color="text.heading"
          letterSpacing="tight"
        >
          GYA
        </Text>
      </HStack>

      <Button
        variant="ghost"
        minH="11"
        minW="11"
        p="0"
        borderRadius="full"
        aria-label="Cerrar menú"
        onClick={onClose}
      >
        <X size={20} aria-hidden="true" style={{ flexShrink: 0 }} />
      </Button>
    </HStack>
  );
});

MenuHeader.displayName = "MenuHeader";
