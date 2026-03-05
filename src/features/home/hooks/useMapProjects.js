import { useState, useEffect } from "react";
import { getProjects } from "@/features/projects";

export const useMapProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjectsAndSetPositions = async () => {
      try {
        const data = await getProjects();
        // Optimized: Combine map and filter into a single pass (js-combine-iterations)
        const projectsWithPositions = data.reduce((acc, project) => {
          if (project.lat != null && project.lng != null) {
            acc.push({
              ...project,
              type: "project",
              client: project.name,
              position: { lat: project.lat, lng: project.lng },
            });
          }
          return acc;
        }, []);

        setProjects(projectsWithPositions);
      } catch (error) {
        console.error("Failed to fetch projects for map:", error);
      }
    };
    fetchProjectsAndSetPositions();
  }, []);

  return projects;
};
