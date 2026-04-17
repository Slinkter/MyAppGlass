"use client";

/**
 * @file DesktopNav.tsx
 * @description Desktop navigation links with active-state indicator.
 * Uses semantic color tokens for text and accent colors.
 * @module layout/navbar
 */
import React from "react";
import { Stack, Box } from "@chakra-ui/react";
import RouterLink from "next/link";
import { usePathname as useLocation } from "next/navigation";
import NAV_ITEMS from "@/data/nav-items";

/**
 * @component DesktopNav
 * @description Componente de navegación para pantallas de escritorio.
 * Renderiza los links definidos en NAV_ITEMS.
 */
const DesktopNav = () => {
  const location = useLocation();

  return (
    <Stack direction="row" gap={4}>
      {NAV_ITEMS.map((navItem) => {
        const isActive = location === navItem.href;
        return (
          <RouterLink
            key={navItem.label}
            href={navItem.href ?? "#"}
            style={{ textDecoration: "none" }}
            aria-current={isActive ? "page" : undefined}
            onClick={() => {
              if (isActive) {
                const scrollOptions: ScrollToOptions = { top: 0, left: 0, behavior: "smooth" };
                window.scrollTo(scrollOptions);
                document.documentElement.scrollTo(scrollOptions);
                document.body.scrollTo(scrollOptions);
              }
            }}
          >
            <Box
              p={2}
              fontSize="md"
              fontWeight={isActive ? "bold" : "600"}
              color={isActive ? "text.accent" : "text.body"}
              borderBottom={isActive ? "2px solid" : "none"}
              borderColor="text.accent"
              transition="all 0.3s ease"
              _hover={{
                color: "text.accent",
              }}
            >
              {navItem.label}
            </Box>
          </RouterLink>
        );
      })}
    </Stack>
  );
};

export default DesktopNav;
