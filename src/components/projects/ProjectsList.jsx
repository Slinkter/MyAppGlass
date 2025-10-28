import {
    Container,
    Heading,
    Text,
    useColorModeValue,
    Flex,
    Skeleton,
    SkeletonText,
    Box,
    Stack
} from "@chakra-ui/react";
import listprojects from "../../data/projects-data";
import ProjectCard from "./ProjectCard";
import { Helmet } from "react-helmet-async";

/**
 * Componente Projects
 * Renderiza la lista de proyectos usando ItemProject.
 * @component
 * @returns {JSX.Element}
 */
import React, { useState, useEffect } from "react";
const Projects = React.memo(() => {
    const textColor = useColorModeValue("gray.600", "gray.100");
    const [loading, setLoading] = useState(true); // Simulate loading

    useEffect(() => {
        // In a real application, this would be set to false after data is fetched
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // Simulate a 1-second loading time
        return () => clearTimeout(timer);
    }, []);

    const renderSkeletons = () => {
        return Array.from({ length: 6 }).map((_, index) => (
            <Box
                key={index}
                w="375px"
                maxW={{ base: "full", md: "375px" }}
                mb={4}
                boxShadow={"md"}
                rounded="xl"
                overflow="hidden"
                p={4} // Add padding to mimic CardBody
            >
                <Skeleton height="320px" borderRadius="lg" mb="4" />
                <Stack mt="4" spacing="2">
                    <SkeletonText noOfLines={1} skeletonHeight="20px" width="70%" mb="2" />
                    <SkeletonText noOfLines={1} skeletonHeight="20px" width="90%" mb="4" />
                    <Flex alignItems="center" mb="2">
                        <Skeleton height="20px" width="20px" mr="2" />
                        <SkeletonText noOfLines={1} skeletonHeight="15px" width="60%" />
                    </Flex>
                    <Flex alignItems="center" mb="4">
                        <Skeleton height="20px" width="20px" mr="2" />
                        <SkeletonText noOfLines={1} skeletonHeight="15px" width="40%" />
                    </Flex>
                    <Skeleton height="40px" width="full" />
                </Stack>
            </Box>
        ));
    };

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
                    color={textColor}
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
                    {loading ? (
                        renderSkeletons()
                    ) : (
                        listprojects
                            .map((project) => (
                                <ProjectCard key={project.id} {...project} />
                            ))
                            .reverse()
                    )}
                </Flex>
            </Container>
        </>
    );
});

Projects.displayName = "Projects";
export default Projects;
