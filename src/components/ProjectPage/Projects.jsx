import {
    Container,
    Heading,
    Text,
    useColorModeValue,
    Flex,
} from "@chakra-ui/react";
import listprojects from "../../data/projects";
import ItemProject from "./ItemProject";
import { Helmet } from "react-helmet-async";

/**
 * Componente Projects
 * Renderiza la lista de proyectos usando ItemProject.
 * @component
 * @returns {JSX.Element}
 */
import React from "react";
const Projects = React.memo(() => {
    return (
        <>
            <Helmet>
                <title>Proyectos</title>
                <meta
                    name="description"
                    content=" Tenemos más de 10 proyectos de construcción entregados"
                />
            </Helmet>
            <Container maxW={"8xl"} my={6} textAlign="center">
                <Heading
                    as="h2"
                    color="primary.500"
                    mb={{ base: "2", md: "2" }}
                    fontSize={{ base: "4xl", md: "4xl" }}
                    mt={4}
                    textTransform={"uppercase"}
                    fontWeight={600}
                    letterSpacing={"wide"}
                    textAlign="center"
                    borderBottom={"4px"}
                    borderColor={"primary.500"}
                    width={"fit-content"}
                    mx={"auto"}
                >
                    PROYECTOS
                </Heading>

                <Text
                    mb={{ base: "2", md: "4" }}
                    fontSize={{ base: "2xl", md: "2xl" }}
                    color={useColorModeValue("gray.600", "gray.100")}
                    textAlign="center"
                >
                    Obras Entregadas
                </Text>

                <Flex
                    direction={{ base: "column", md: "row" }}
                    flexWrap={"wrap"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    mx={"auto"}
                    gap={6}
                >
                    {listprojects
                        .map((project) => (
                            <ItemProject key={project.id} {...project} />
                        ))
                        .reverse()}
                </Flex>
            </Container>
        </>
    );
});

Projects.displayName = "Projects";
export default Projects;
