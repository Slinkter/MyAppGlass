"use client";

import React from "react";
import { Stack, Icon, Text, Box } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

export interface SidebarItemProps {
  icon: any;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

const SidebarItem = React.memo(({ icon, label, onClick, isActive }: SidebarItemProps) => {
  const activeBg = useColorModeValue("primary.50", "whiteAlpha.200");
  const activeColor = useColorModeValue("primary.900", "primary.300");
  const hoverBg = useColorModeValue("primary.50", "whiteAlpha.100");
  const inactiveColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Box position="relative" w="full">
      <Stack
        direction="row"
        justifyContent="flex-start"
        align="flex-start"
        p={3}
        borderRadius="xl"
        onClick={onClick}
        cursor={onClick ? "pointer" : "default"}
        bg={isActive ? activeBg : "transparent"}
        color={isActive ? activeColor : inactiveColor}
        transform={isActive ? "translateX(4px)" : "none"}
        transition="background 0.2s ease-out, color 0.2s ease-out, transform 0.2s ease-out"
        tabIndex={onClick ? 0 : -1}
        role={onClick ? "button" : "presentation"}
        aria-current={isActive ? "page" : undefined}
        _hover={{
          bg: onClick ? hoverBg : "transparent",
          transform: onClick ? "translateX(4px)" : "none",
        }}
        _active={{
          transform: onClick
            ? isActive
              ? "translateX(4px) scale(0.98)"
              : "translateX(4px) scale(0.98)"
            : "none",
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
