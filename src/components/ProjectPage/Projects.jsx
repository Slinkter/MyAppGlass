import React from "react";
import {
    Box,
    Container,
    Heading,
    Text,
    useMediaQuery,
    useColorModeValue,
    Flex,
} from "@chakra-ui/react";
import listprojects from "./db_project";
import ItemProject from "./ItemProject";

const Projects = () => {
    const [isMobile] = useMediaQuery("(max-width: 768px)");

    return (
        <Box>
            <Container maxW={"8xl"} mt={6} mb={6} textAlign="center">
                <Heading
                    as="h2"
                    fontSize={isMobile ? "2.0rem" : "2.5rem"}
                    fontWeight="600"
                    color="red.500"
                    mb={4}
                >
                    PROYECTOS
                </Heading>
                <Text
                    mb={8}
                    fontSize="lg"
                    color={useColorModeValue("gray.500", "white")}
                    textAlign="center"
                >
                    Tenemos una amplia variedad de servicios de instalación en
                    cristales y aluminios
                </Text>
                <></>

                <Flex
                    flexDir={isMobile ? "column" : "row"}
                    flexWrap={"wrap"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={6}
                >
                    {listprojects
                        .map((project) => (
                            <ItemProject key={project.id} {...project} />
                        ))
                        .reverse()}
                </Flex>
            </Container>
        </Box>
    );
};

export default Projects;
