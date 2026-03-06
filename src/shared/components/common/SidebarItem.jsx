import React from "react";
import { Stack, Icon, Text, useColorModeValue, Box } from "@chakra-ui/react";

import { m } from "framer-motion";

/**
 * @component SidebarItem
 * @description Item de navegación de alta calidad para la barra lateral.
 * Incluye indicador visual, cambios de color y animaciones suaves al interactuar.
 */
const SidebarItem = React.memo(({ icon, label, onClick, isActive }) => {
  const activeBg = useColorModeValue("primary.50", "whiteAlpha.200");
  const activeColor = useColorModeValue("primary.900", "primary.300");
  const hoverBg = useColorModeValue("primary.50", "whiteAlpha.100");
  const inactiveColor = useColorModeValue("gray.700", "gray.300");
  const indicatorColor = useColorModeValue("primary.500", "primary.300");

  return (
    <Box position="relative" w="full">
      {/* Sophisticated Active Indicator */}
      {isActive && (
        <Box
          as={m.div}
          layoutId="activeIndicator"
          position="absolute"
          left={0}
          top="15%"
          bottom="15%"
          w="4px"
          bg={indicatorColor}
          borderRadius="full"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      )}

      <Stack
        as={m.div}
        direction="row"
        justifyContent="flex-start"
        align="center"
        p={3}
        mx={2}
        rounded="xl"
        onClick={onClick}
        cursor={onClick ? "pointer" : "default"}
        bg={isActive ? activeBg : "transparent"}
        color={isActive ? activeColor : inactiveColor}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        variants={{
          initial: { x: 0 },
          hover: { x: 8, bg: onClick ? hoverBg : "transparent" },
          tap: { scale: 0.98 },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        tabIndex={onClick ? 0 : -1}
        role={onClick ? "button" : "presentation"}
        aria-current={isActive ? "page" : undefined}
      >
        <Icon
          as={icon}
          w={5}
          h={5}
          transition="transform 0.2s ease"
          transform={isActive ? "scale(1.1)" : "scale(1)"}
        />
        <Text
          fontWeight={isActive ? "800" : "500"}
          fontSize="sm"
          letterSpacing={isActive ? "wider" : "tight"}
          transition="all 0.2s ease"
          flex="1"
          whiteSpace="normal"
          wordBreak="break-word"
        >
          {label}
        </Text>
      </Stack>
    </Box>
  );
});

SidebarItem.displayName = "SidebarItem";
export default SidebarItem;
