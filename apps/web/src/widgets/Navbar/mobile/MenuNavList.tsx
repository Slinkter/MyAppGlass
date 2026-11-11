"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Box, VStack } from "@chakra-ui/react";
import { MOBILE_NAV_ITEMS } from "@/shared/config/nav-items";
import { MenuLink } from "./MenuLink";
import { ServicesAccordion } from "./ServicesAccordion";

export interface MenuNavListProps {
  isOpen: boolean;
  contained?: boolean;
  onNavClick: () => void;
}

/**
 * Lista de navegación de la hoja móvil: 5 enlaces primarios + acordeón de servicios.
 * Zona scrolleable única del menú.
 */
export const MenuNavList: React.FC<MenuNavListProps> = React.memo(
  ({ isOpen, contained = false, onNavClick }) => {
    const pathname = usePathname();
    const [isServicesOpen, setIsServicesOpen] = useState(false);

    return (
      <Box
        flex="1"
        minH="0"
        overflowY="auto"
        overscrollBehavior="contain"
        px="6"
        pt="4"
        pb="6"
      >
        <VStack as="nav" aria-label="Enlaces de navegación" align="stretch" gap="0.5" w="full">
          {MOBILE_NAV_ITEMS.map((item, index) => {
            const number = String(index + 1).padStart(2, "0");

            if (item.isAccordion) {
              return (
                <MenuLink
                  key={item.href}
                  number={number}
                  label={item.label}
                  isOpen={isOpen}
                  index={index}
                  contained={contained}
                  isAccordionTrigger
                  isAccordionOpen={isServicesOpen}
                  accordionId="mobile-services-accordion"
                  onClick={() => setIsServicesOpen((prev) => !prev)}
                >
                  <ServicesAccordion
                    isOpen={isServicesOpen}
                    onItemClick={onNavClick}
                    id="mobile-services-accordion"
                    contained={contained}
                  />
                </MenuLink>
              );
            }

            const isCurrent =
              item.href === "/"
                ? pathname === "/"
                : item.href.startsWith("/#")
                ? false
                : pathname === item.href;

            return (
              <MenuLink
                key={item.href}
                number={number}
                label={item.label}
                href={item.href}
                isOpen={isOpen}
                index={index}
                contained={contained}
                isActive={isCurrent}
                onClick={onNavClick}
              />
            );
          })}
        </VStack>
      </Box>
    );
  }
);

MenuNavList.displayName = "MenuNavList";
