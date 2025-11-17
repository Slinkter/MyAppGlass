import React from "react";
import { Flex, Icon, Box, Text, useColorModeValue } from "@chakra-ui/react";

/**
 * @component ProjectDetailItem
 * @description Displays a single detail item for a project, including an icon, a label, and its value.
 *
 * @param {{ 
 *   icon: React.ElementType, 
 *   label: string, 
 *   value: string 
 * }} props - The props for the component.
 * @returns {JSX.Element}
 */
const ProjectDetailItem = ({ icon, label, value }) => {
    const iconColor = useColorModeValue("primary.600", "primary.300");
    const labelColor = useColorModeValue("gray.500", "gray.400");
    const valueColor = useColorModeValue("gray.800", "white");

    return (
        <Flex align="center">
            <Icon
                as={icon}
                w={6}
                h={6}
                mr={3}
                color={iconColor}
            />
            <Box>
                <Text
                    fontSize="sm"
                    color={labelColor}
                >
                    {label}
                </Text>
                <Text fontWeight="bold" color={valueColor}>
                    {value}
                </Text>
            </Box>
        </Flex>
    );
};

export default ProjectDetailItem;