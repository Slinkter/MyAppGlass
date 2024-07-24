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
            {" "}
            <Box position="fixed" bottom="20px" right="20px">
                <Popover>
                    <PopoverTrigger>
                        <Button
                            colorScheme="teal"
                            variant="solid"
                            borderRadius={"full"}
                            w={20}
                            h={20}
                        >
                            {<Icon as={FaWhatsapp} w={10} h={10} />}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent maxW={"260px"}>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                            <a href="https://wa.me/51996537435?text=Quisiera una cotización para ....">
                                solicitar una presupuesto ahora
                            </a>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Box>
        </div>
    );
};

export default FloatWhatsapp;
