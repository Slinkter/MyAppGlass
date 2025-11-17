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
    Text,
} from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";

const FloatWhatsapp = () => {
    return (
        <Box position="fixed" bottom={4} right={4} display={{ base: 'flex', md: 'flex' }}>
            <Popover>
                <PopoverTrigger>
                    <Button
                        bg='whiteAlpha.200'
                        backdropFilter='blur(10px)'
                        border='1px solid'
                        borderColor='whiteAlpha.300'
                        color='white'
                        _hover={{ bg: 'whiteAlpha.300' }}
                        variant="solid"
                        rounded="full"
                        w={16}
                        h={16}
                    >
                        <Icon as={FaWhatsapp} w={10} h={10} />
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    maxW="xs"
                    bg='whiteAlpha.200'
                    backdropFilter='blur(10px)'
                    border='1px solid'
                    borderColor='whiteAlpha.300'
                    color='white'
                >
                    <PopoverArrow bg='whiteAlpha.200' />
                    <PopoverCloseButton />
                    <PopoverBody>
                        <a href="https://wa.me/51974278303?text=Quisiera una cotización para ....">
                            <Text>clic aquí para continuar !</Text>
                        </a>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Box>
    );
};

export default FloatWhatsapp;