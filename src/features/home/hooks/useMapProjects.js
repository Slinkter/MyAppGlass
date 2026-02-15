import { useState, useEffect } from "react";
import { getProjects } from "@/features/projects";

export const useMapProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjectsAndSetPositions = async () => {
      try {
        const data = await getProjects();
        const projectsWithPositions = data
          .map((project) => {
            if (project.lat != null && project.lng != null) {
              return {
                ...project,
                type: "project",
                client: project.name,
                position: { lat: project.lat, lng: project.lng },
              };
            }
            return null;
          })
          .filter((p) => p !== null);

        setProjects(projectsWithPositions);
      } catch (error) {
        console.error("Failed to fetch projects for map:", error);
      }
    };
    fetchProjectsAndSetPositions();
  }, []);

  return projects;
};
