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
} from "@chakra-ui/react";
import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const FloatWhatsapp = () => {
    return (
        <div>
            <Box position="fixed" bottom="15px" right="15px">
                <Popover>
                    <PopoverTrigger>
                        <Button
                            colorScheme="teal"
                            variant="solid"
                            borderRadius={"full"}
                            w={16}
                            h={16}
                        >
                            <Icon as={FaWhatsapp} w={10} h={10} />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent maxW={"260px"}>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                            <a href="https://wa.me/51974278303?text=Quisiera una cotización para ....">
                                clic aquí para continuar !
                            </a>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Box>
        </div>
    );
};

export default FloatWhatsapp;
