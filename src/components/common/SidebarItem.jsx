import React from "react";
import { Stack, Icon, Text, useColorModeValue } from "@chakra-ui/react";

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
const SidebarItem = React.memo(({ icon, label, onClick, isActive }) => {
    const activeBg = useColorModeValue("rgba(255, 255, 255, 0.5)", "rgba(0, 0, 0, 0.5)");
    const activeColor = useColorModeValue("primary.700", "primary.300");
    const hoverBg = useColorModeValue("rgba(255, 255, 255, 0.3)", "rgba(0, 0, 0, 0.3)");
    const inactiveColor = useColorModeValue("gray.800", "gray.100");

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
            color={isActive ? activeColor : inactiveColor}
            transition="background-color 0.2s ease-in-out"
            _hover={{
                bg: onClick ? hoverBg : "transparent",
            }}
            tabIndex={isActive ? 0 : -1}
        >
            <Icon w={5} h={5} as={icon} />
            <Text fontWeight={isActive ? 700 : 500}>{label}</Text>
        </Stack>
    );
});

SidebarItem.displayName = "SidebarItem";
export default SidebarItem;