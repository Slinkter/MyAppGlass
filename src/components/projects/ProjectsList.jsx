import React, { useMemo } from "react";
import {
    Container,
    Heading,
    Text,
    useColorModeValue,
    Flex,
    SimpleGrid, // Added SimpleGrid
} from "@chakra-ui/react";
import ProjectCard from "@/components/projects/ProjectCard";
import HelmetWrapper from "@/components/HelmetWrapper";
import { projects } from "@/data/projects";
import DataLoader from "@/components/common/DataLoader";
import ProjectListSkeleton from "@/components/projects/ProjectListSkeleton";

const Projects = React.memo(() => {
    const headingColor = useColorModeValue("primary.700", "primary.300");
    const textColor = useColorModeValue("gray.700", "gray.200");
    const borderColor = useColorModeValue("primary.500", "primary.300");
    const projectsData = projects;

    const reversedProjects = useMemo(
        () => [...projectsData].reverse(),
        [projectsData]
    );

    return (
        <>
            <HelmetWrapper
                title="Proyectos de Vidriería y Aluminio en La Molina - GYA Company"
                description="Descubre nuestros proyectos de instalación de vidriería y aluminio en La Molina. Calidad y experiencia en cada obra."
                canonicalUrl="https://www.gyacompany.com/proyectos"
            />
            <DataLoader loadingComponent={<ProjectListSkeleton />}>
                <Container maxW={"8xl"} my={6} textAlign="center">
                    <Heading
                        as="h2"
                        color={headingColor}
                        mb={{ base: "2", md: "2" }}
                        fontSize={{ base: "4xl", md: "4xl" }}
                        mt={4}
                        textTransform={"uppercase"}
                        fontWeight={600}
                        letterSpacing={"wide"}
                        textAlign="center"
                        borderBottom={"4px"}
                        borderColor={borderColor}
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

                    <SimpleGrid
                        columns={{ base: 1, md: 2, lg: 3 }} // 1 column on base, 2 on md, 3 on lg
                        spacing={6} // Adjust spacing as needed
                        justifyContent={"center"}
                        alignItems={"center"}
                        mx={"auto"}
                        // GlassSection properties
                    >
                        {reversedProjects.map((project) => (
                            <ProjectCard key={project.id} {...project} />
                        ))}
                    </SimpleGrid>
                </Container>
            </DataLoader>
        </>
    );
});

Projects.displayName = "Projects";
export default Projects;
