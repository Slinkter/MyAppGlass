import React from "react";
import { Stack, Icon, Text, useColorModeValue, Box } from "@chakra-ui/react";

/**
 * @component SidebarItem
 * @description Item de navegación de alta calidad para la barra lateral.
 * Incluye indicador visual, cambios de color y animaciones suaves al interactuar.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {React.ElementType} props.icon - Icono a mostrar (componente de Chakra UI o icono de React Icons).
 * @param {string} props.label - Texto del item de navegación.
 * @param {function} [props.onClick] - Función a ejecutar al hacer click.
 * @param {boolean} [props.isActive] - Indica si el item está activo actualmente.
 * @returns {JSX.Element} El item de navegación renderizado.
 */
const SidebarItem = React.memo(({ icon, label, onClick, isActive }) => {
    const activeBg = useColorModeValue("primary.50", "whiteAlpha.200");
    const activeColor = useColorModeValue("primary.600", "primary.300");
    const hoverBg = useColorModeValue("primary.50", "whiteAlpha.100");
    const inactiveColor = useColorModeValue("gray.700", "gray.300");

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
                bg={isActive ? activeBg : "transparent"}
                color={isActive ? activeColor : inactiveColor}
                // Use transform for smooth GPU-accelerated movement instead of padding shifts
                transform={isActive ? "translateX(4px)" : "none"}
                transition="background 0.2s ease-out, color 0.2s ease-out, transform 0.2s ease-out"
                tabIndex={onClick ? 0 : -1}
                role={onClick ? "button" : "presentation"}
                aria-current={isActive ? "page" : undefined}
                _hover={{
                    bg: onClick ? hoverBg : "transparent",
                    // Consistent indentation on hover/active prevents "jumping"
                    transform: onClick ? "translateX(4px)" : "none",
                }}
                _active={{
                    // Subtle scale effect on click, maintaining indentation if active
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
