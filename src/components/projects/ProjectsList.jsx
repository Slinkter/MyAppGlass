import React from "react";
import {
    Container,
    Heading,
    Text,
    useColorModeValue,
    Flex,
} from "@chakra-ui/react";
import ProjectCard from "@/components/projects/ProjectCard";
import HelmetWrapper from "@/components/HelmetWrapper";
import { useProjects } from "@/hooks/useProjects";
import DataLoader from "@/components/common/DataLoader";
import ProjectListSkeleton from "@/components/projects/ProjectListSkeleton";

const Projects = React.memo(() => {
    const textColor = useColorModeValue("gray.600", "gray.100");
    const { projects, isLoading, error } = useProjects();

    return (
        <>
            <HelmetWrapper
                title="Proyectos de Vidriería y Aluminio en La Molina - GYA Company"
                description="Descubre nuestros proyectos de instalación de vidriería y aluminio en La Molina. Calidad y experiencia en cada obra."
                canonicalUrl="https://www.gyacompany.com/proyectos"
            />
            <DataLoader
                isLoading={isLoading}
                error={error}
                loadingComponent={<ProjectListSkeleton />}
            >
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
                        {[...projects].reverse().map((project) => (
                                <ProjectCard key={project.id} {...project} />
                            ))}
                    </Flex>
                </Container>
            </DataLoader>
        </>
    );
});

Projects.displayName = "Projects";
export default Projects;
