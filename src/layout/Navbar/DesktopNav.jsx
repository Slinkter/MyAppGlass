import React from "react";
import { Stack, Box, useColorModeValue } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import NAV_ITEMS from "@/data/nav-items";

/**
 * @component DesktopNav
 * @description Componente de navegación para pantallas de escritorio.
 * Renderiza los links definidos en NAV_ITEMS.
 */
const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.700", "gray.200");
  const linkHoverColor = useColorModeValue("primary.600", "primary.300");
  const location = useLocation(); // Initialize useLocation

  return (
    <Stack direction="row" spacing={4}>
      {NAV_ITEMS.map((navItem) => {
        const isActive = location.pathname === navItem.href; // Determine if the link is active
        return (
          <RouterLink
            key={navItem.label}
            to={navItem.href ?? "#"}
            aria-current={isActive ? "page" : undefined} // Add aria-current
          >
            <Box
              p={2}
              fontSize="md"
              fontWeight={600}
              color={linkColor}
              transition="color 0.3s ease"
              textDecoration="none"
              _hover={{
                color: linkHoverColor,
                textDecoration: "none",
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
