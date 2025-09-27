import {
    Box,
    Button,
    Heading,
    Icon,
    Link,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    VStack,
} from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";

const FloatWhatsapp = () => {
    return (
        <Box position="fixed" bottom="20px" right="20px" zIndex="tooltip">
            <Popover placement="top-start">
                <PopoverTrigger>
                    <Button
                        colorScheme="green"
                        borderRadius="full"
                        w={16}
                        h={16}
                        boxShadow="lg"
                    >
                        <Icon as={FaWhatsapp} w={10} h={10} />
                    </Button>
                </PopoverTrigger>
                <PopoverContent maxW="280px">
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverHeader fontWeight="bold">
                        Chatea con nosotros
                    </PopoverHeader>
                    <PopoverBody>
                        <VStack spacing={3} align="stretch">
                            <Link
                                href="https://wa.me/51974278303?text=Hola, quisiera una cotización."
                                isExternal
                                _hover={{ textDecoration: "none" }}
                            >
                                <Button w="full">Asesor </Button>
                            </Link>
                        </VStack>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Box>
    );
};

export default FloatWhatsapp;
