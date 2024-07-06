import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
    AspectRatio,
    Box,
    Button,
    Flex,
    useColorModeValue,
    useMediaQuery,
} from "@chakra-ui/react";

import { Link } from "@chakra-ui/react";
import Franja from "../Franja";
import { Icon } from "@chakra-ui/react";
import { MdSettings } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";

const Tienda = () => {
    const bgColor = useColorModeValue("#e9ecef", "gray.600"); // Light mode bg from original CSS
    const textColor = useColorModeValue("black", "white");
    const [isMobile] = useMediaQuery("(max-width: 768px)"); // Adjust breakpoint as needed

    return (
        <>
            <Box>
                <Franja
                    title={"UBICANOS"}
                    text={
                        "AV. Los Fresnos MZ H LT 16 - Urb. El Valle - La Molina - Lima"
                    }
                />
            </Box>

            <Box mx={"auto"} mt={4} mb={8}>
                <Flex
                    justifyContent={"center"}
                    alignItems={"center"}
                    direction={{ base: "column", md: "column" }}
                >
                    <AspectRatio
                        ratio={16 / 9}
                        lele
                        width={isMobile ? "95%" : "92%"}
                        height={isMobile ? "100%" : "500px"}
                    >
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7802.259991971398!2d-76.94203500000003!3d-12.103251999999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c714bd26b5ab%3A0xc27e03d844952799!2sGlass%20%26%20Aluminum%20Company!5e0!3m2!1sen!2spe!4v1704232992639!5m2!1sen!2spe"
                            allowFullScreen
                        />
                    </AspectRatio>
                    <Link
                        href="https://maps.app.goo.gl/Nvr7jiQmJdUvQVd36"
                        passHref
                    >
                        <Button
                            mt="20px"
                            leftIcon={<Icon as={FaMapLocationDot} />}
                            colorScheme="gray"
                            size="lg"
                            width={isMobile ? "100%" : "200px"}
                            as="a" // Asegúrate de usar "as='a'" para que funcione como un enlace
                        >
                            Google maps
                        </Button>
                    </Link>
                </Flex>
            </Box>
        </>
    );
};

export default Tienda;
