import React from "react";
import { Flex, Icon, Box, Text } from "@chakra-ui/react";

/**
 * @component ProjectDetailItem
 * @description Displays a single detail item for a project, including an icon, a label, and its value.
 *
 * @param {{ 
 *   icon: React.ElementType, 
 *   label: string, 
 *   value: string 
 * }} props - The props for the component.
 * @param {React.ElementType} props.icon - The icon component to display (e.g., `HomeIcon`).
 * @param {string} props.label - The label for the detail (e.g., "Residencial").
 * @param {string} props.value - The value of the detail (e.g., "Edificio Torre Sipan").
 * @returns {JSX.Element}
 */
const ProjectDetailItem = ({ icon, label, value }) => {
    return (
        <Flex align="center">
            <Icon
                as={icon}
                w={6}
                h={6}
                mr={3}
                color="primary.500"
            />
            <Box>
                <Text
                    fontSize="sm"
                    color="gray.500"
                >
                    {label}
                </Text>
                <Text fontWeight="bold">
                    {value}
                </Text>
            </Box>
        </Flex>
    );
};

export default ProjectDetailItem;
