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
            <Container maxW={"8xl"} my={6} textAlign="center">
                <Heading
                    as="h2"
                    color="red.500"
                    mb={{ base: "2", md: "2" }}
                    fontSize={{ base: "4xl", md: "4xl" }}
                    mt={4}
                    textTransform={"uppercase"}
                    fontWeight={600}
                    letterSpacing={"wide"}
                    textAlign="center"
                    borderBottom={"4px"}
                    borderColor={"red.500"}
                    width={"fit-content"}
                    mx={"auto"}
                >
                    PROYECTOS
                </Heading>

                <Text
                    mb={{ base: "2", md: "4" }}
                    fontSize={{ base: "2xl", md: "2xl" }}
                    color={useColorModeValue("gray.600", "white")}
                    textAlign="center"
                >
                    Tenemos más de 10 proyectos de construcción entregados
                </Text>

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
