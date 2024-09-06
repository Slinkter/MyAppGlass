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
                    mb={4}
                    fontSize={{ base: "2xl", md: "4xl" }}
                    mt={4}
                    textShadow="1px 1px #000"
                    textTransform={"uppercase"}
                >
                    PROYECTOS
                </Heading>
                <Text
                    mb={8}
                    fontSize="lg"
                    color={useColorModeValue("gray.500", "white")}
                    textAlign="center"
                >
                    Tenemos más de 10 proyectos de construcción entregados
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
