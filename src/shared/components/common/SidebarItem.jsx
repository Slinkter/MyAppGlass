import React from "react";
import { Stack, Icon, Text, Box } from "@chakra-ui/react";

/**
 * @component SidebarItem
 * @description Item de navegación de alta calidad para la barra lateral.
 * Refactored to use semantic tokens for full v3 compatibility.
 */
const SidebarItem = React.memo(({ icon, label, onClick, isActive }) => {
  return (
    <Box position="relative" w="full">
      <Stack
        direction="row"
        justifyContent="flex-start"
        align="flex-start"
        p={3}
        rounded="xl"
        onClick={onClick}
        cursor={onClick ? "pointer" : "default"}
        bg={isActive ? "bg.subtle" : "transparent"}
        color={isActive ? "text.accent" : "text.body"}
        transform={isActive ? "translateX(4px)" : "none"}
        transition="all 0.2s ease-out"
        tabIndex={onClick ? 0 : -1}
        role={onClick ? "button" : "presentation"}
        aria-current={isActive ? "page" : undefined}
        _hover={{
          bg: onClick ? "bg.subtle" : "transparent",
          transform: onClick ? "translateX(4px)" : "none",
        }}
        _active={{
          transform: onClick ? "translateX(4px) scale(0.98)" : "none",
        }}
      >
        <Icon
          w={5}
          h={5}
          as={icon}
          transition="transform 0.2s ease"
          transform={isActive ? "scale(1.1)" : "scale(1)"}
          mt={0.5}
        />
        <Text
          fontWeight={isActive ? 600 : 500}
          fontSize="sm"
          letterSpacing="tight"
          transition="font-weight 0.2s ease"
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
