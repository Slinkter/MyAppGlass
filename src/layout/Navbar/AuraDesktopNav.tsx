"use client";

/**
 * @file AuraDesktopNav.tsx
 * @description Premium desktop navigation with sliding active indicator and glassmorphism.
 * @module layout/navbar
 */
import React from "react";
import { Stack, Box, Text as ChakraText } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import NAV_ITEMS from "@/data/nav-items";

/**
 * @component AuraDesktopNav
 * @description Navegación de escritorio con indicador animado "Sliding Capsule".
 */
const AuraDesktopNav = () => {
  const pathname = usePathname();

  return (
    <Stack 
      direction="row" 
      gap="phi_sm" 
      position="relative" 
      align="center"
    >
      {NAV_ITEMS.map((navItem) => {
        const isActive = pathname === navItem.href;
        
        return (
          <Link
            key={navItem.label}
            href={navItem.href ?? "#"}
            style={{ textDecoration: "none", position: "relative" }}
            aria-current={isActive ? "page" : undefined}
          >
            <Box
              px="phi_lg"
              py="phi_sm"
              position="relative"
              transition="all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"
              zIndex={1}
              _hover={{
                transform: "translateY(-1px)",
              }}
            >
              {/* Sliding Indicator Background */}
              {isActive && (
                <Box
                  asChild
                  position="absolute"
                  inset={0}
                  bg="bg.muted"
                  borderRadius="full"
                  border="1px solid"
                  borderColor="border.glass"
                  zIndex={-1}
                >
                  <motion.div
                    layoutId="aura-nav-indicator"
                    transition={{
                      type: "spring",
                      bounce: 0.25,
                      stiffness: 130,
                      damping: 18
                    }}
                  />
                </Box>
              )}

              <ChakraText
                fontSize="sm"
                fontWeight={isActive ? "700" : "600"}
                color={isActive ? "text.accent" : "text.body"}
                letterSpacing="wide"
                textTransform="uppercase"
                transition="color 0.3s ease"
              >
                {navItem.label}
              </ChakraText>
            </Box>
          </Link>
        );
      })}
    </Stack>
  );
};

export default AuraDesktopNav;
