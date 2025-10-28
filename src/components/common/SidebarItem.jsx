import { Stack, useColorModeValue, Icon, Text } from "@chakra-ui/react";

/**
 * Componente SidebarItem
 * Ítem de barra lateral con icono y etiqueta, optimizado con React.memo.
 * @component
 * @param {Object} props
 * @param {React.ElementType} props.icon - Icono a mostrar.
 * @param {string} props.label - Etiqueta del ítem.
 * @param {function} [props.onClick] - Callback al hacer click.
 * @param {boolean} [props.isActive] - Estado activo del ítem.
 * @returns {JSX.Element}
 */
import React from "react";
const SidebarItem = React.memo(({ icon, label, onClick, isActive }) => {
    const activeBg = useColorModeValue("primary.100", "primary.900");
    const activeColor = useColorModeValue("primary.600", "primary.200");

    const h_activeBg = useColorModeValue("gray.100", "gray.700");
    const h_activeColor = useColorModeValue("primary.500", "primary.300");

    return (
        <Stack
            direction="row"
            justifyContent="flex-start"
            align="center"
            p={3}
            rounded="xl"
            onClick={onClick}
            cursor={onClick ? "pointer" : "default"}
            bg={isActive ? activeBg : "transparent"}
            color={isActive ? activeColor : "inherit"}
            _hover={{
                bg: onClick ? h_activeBg : "transparent",
                color: isActive
                    ? activeColor
                    : onClick
                    ? h_activeColor
                    : "inherit",
            }}
            tabIndex={isActive ? 0 : -1} // Added for keyboard navigation
        >
            <Icon w={5} h={5} as={icon} />
            <Text fontWeight={isActive ? 700 : 500}>{label}</Text>
        </Stack>
    );
});

SidebarItem.displayName = "SidebarItem";
export default SidebarItem;
