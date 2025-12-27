import React from "react";
import { Stack, Icon, Text, useColorModeValue, Box } from "@chakra-ui/react";

/**
 * SidebarItem Premium - Ítem de navegación de alta calidad
 * Con indicador visual elegante y animaciones suaves
 */
const SidebarItem = React.memo(({ icon, label, onClick, isActive }) => {
    const activeBg = useColorModeValue(
        "rgba(59, 130, 246, 0.1)",
        "rgba(59, 130, 246, 0.15)"
    );
    const activeColor = useColorModeValue("blue.600", "blue.300");
    const hoverBg = useColorModeValue(
        "rgba(59, 130, 246, 0.05)",
        "rgba(59, 130, 246, 0.08)"
    );
    const inactiveColor = useColorModeValue("gray.700", "gray.300");

    return (
        <Box position="relative" w="full">
            <Stack
                direction="row"
                justifyContent="flex-start"
                align="flex-start"
                p={3}
                pl={isActive ? 5 : 3}
                rounded="xl"
                onClick={onClick}
                cursor={onClick ? "pointer" : "default"}
                bg={isActive ? activeBg : "transparent"}
                color={isActive ? activeColor : inactiveColor}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                tabIndex={onClick ? 0 : -1}
                role={onClick ? "button" : "presentation"}
                aria-current={isActive ? "page" : undefined}
                _hover={{
                    bg: onClick ? hoverBg : "transparent",
                    transform: onClick ? "translateX(4px)" : "none",
                    pl: onClick ? (isActive ? 5 : 4) : 3,
                }}
                _active={{
                    transform: onClick ? "scale(0.98)" : "none",
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
