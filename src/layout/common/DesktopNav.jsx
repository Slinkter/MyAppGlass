import React from "react";
import { Stack, Box, useColorModeValue } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import NAV_ITEMS from "@/data/nav-items";

/**
 * @component DesktopNav
 * @description Componente de navegación para pantallas de escritorio.
 * Renderiza los links definidos en NAV_ITEMS.
 */
const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.700", "gray.200");
  const linkHoverColor = useColorModeValue("primary.600", "primary.300");

  return (
    <Stack direction="row" spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <RouterLink
          key={navItem.label}
          to={navItem.href ?? "#"}
          style={{ textDecoration: "none" }}
        >
          <Box
            p={2}
            fontSize="md"
            fontWeight={600}
            color={linkColor}
            transition="color 0.3s ease"
            _hover={{
              color: linkHoverColor,
            }}
          >
            {navItem.label}
          </Box>
        </RouterLink>
      ))}
    </Stack>
  );
};

export default DesktopNav;
