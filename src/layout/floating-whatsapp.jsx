import React from "react";
import {
    Box,
    Button,
    Icon,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
    Text, // Import Text component
} from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";

const FloatWhatsapp = () => {
    return (
        <Box position="fixed" bottom={4} right={4}> {/* Standardized bottom and right */}
            <Popover>
                <PopoverTrigger>
                    <Button
                        colorScheme="teal"
                        variant="solid"
                        rounded="full" // Standardized borderRadius to rounded
                        w={16}
                        h={16}
                    >
                        <Icon as={FaWhatsapp} w={10} h={10} />
                    </Button>
                </PopoverTrigger>
                <PopoverContent maxW="xs"> {/* Standardized maxW */}
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                        <a href="https://wa.me/51974278303?text=Quisiera una cotización para ....">
                            <Text>clic aquí para continuar !</Text> {/* Wrapped in Text component */}
                        </a>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Box>
    );
};

export default FloatWhatsapp;