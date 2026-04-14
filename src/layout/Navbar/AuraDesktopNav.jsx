/**
 * @file AuraDesktopNav.jsx
 * @description Premium desktop navigation with sliding active indicator and glassmorphism.
 * @module layout/navbar
 */
import React from "react";
import { Stack, Box, Text } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import NAV_ITEMS from "@/data/nav-items";

const AuraDesktopNav = () => {
  const location = useLocation();

  return (
    <Stack 
      direction="row" 
      gap="phi_sm" 
      position="relative" 
      align="center"
    >
      {NAV_ITEMS.map((navItem) => {
        const isActive = location.pathname === navItem.href;
        
        return (
          <RouterLink
            key={navItem.label}
            to={navItem.href ?? "#"}
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
                  as={motion.div}
                  layoutId="aura-nav-indicator"
                  position="absolute"
                  inset={0}
                  bg="bg.muted"
                  borderRadius="full"
                  border="1px solid"
                  borderColor="border.glass"
                  zIndex={-1}
                  transition={{
                    type: "spring",
                    bounce: 0.25,
                    stiffness: 130,
                    damping: 18
                  }}
                />
              )}

              <Text
                fontSize="sm"
                fontWeight={isActive ? "800" : "600"}
                color={isActive ? "text.accent" : "text.body"}
                letterSpacing="widest"
                textTransform="uppercase"
                transition="color 0.3s ease"
              >
                {navItem.label}
              </Text>
            </Box>
          </RouterLink>
        );
      })}
    </Stack>
  );
};

export default AuraDesktopNav;
