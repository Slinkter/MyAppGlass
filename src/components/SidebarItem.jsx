import { Stack, useColorModeValue, Icon, Text } from "@chakra-ui/react";

const SidebarItem = ({ icon, label, onClick, isActive }) => {
    const activeBg = useColorModeValue("red.100", "red.900");
    const activeColor = useColorModeValue("red.600", "red.200");

    const h_activeBg = useColorModeValue("gray.100", "gray.700");
    const h_activeColor = useColorModeValue("red.500", "red.300");

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
            transition="background-color 0.3s, color 0.3s"
            _hover={{
                bg: onClick ? h_activeBg : "transparent",
                color: isActive
                    ? activeColor
                    : onClick
                    ? h_activeColor
                    : "inherit",
            }}
        >
            <Icon w={5} h={5} as={icon} />
            <Text fontWeight={isActive ? 700 : 500}>{label}</Text>
        </Stack>
    );
};

export default SidebarItem;
