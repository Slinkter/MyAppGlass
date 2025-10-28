import {
    AspectRatio,
    Box,
    Button,
    Container,
    Flex,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import Franja from "../Franja";
import { Icon } from "@chakra-ui/react";
import { FaMapLocationDot } from "react-icons/fa6";
import useIsMobile from "../../hooks/useIsMobile";

const Tienda = () => {
    const isMobile = useIsMobile();

    return (
        <Box
            height={isMobile ? "" : "100vh"}
            display="flex"
            flexDirection="column"
        >
            <Franja
                title="TIENDA"
                text="Av. Los Fresnos MZ. H LT. 16 - La Molina - Lima"
                minHeight={"20vh"}
            />
            <Container maxW={"8xl"} mt={6} mb={6}>
                <Flex
                    alignItems={"center"}
                    justifyContent={"center"}
                    minHeight={{ base: "", md: "80vh" }}
                    flexDir={"column"}
                >
                    <AspectRatio
                        ratio={16 / 9}
                        width={isMobile ? "100%" : "100%"}
                        height={isMobile ? "300px" : "600px"}
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
                            mt={isMobile ? "30px" : "20px"}
                            leftIcon={<Icon as={FaMapLocationDot} />}
                            colorScheme="gray"
                            size="lg"
                            width={isMobile ? "100%" : "200px"}
                            as="a"
                        >
                            Google Mapas
                        </Button>
                    </Link>
                </Flex>
            </Container>
        </Box>
    );
};

export default Tienda;
