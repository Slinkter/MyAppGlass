import { useState, useEffect } from "react";
import { getProjects, type Project } from "@/features/projects/services/projectService";

export interface MapProject {
  id: string | number;
  name: string;
  residencial: string;
  address: string;
  year: string;
  image?: string;
  photosObra?: Array<{ id: number; image: string; name?: string }>;
  type: "project";
  client: string;
  position: { lat: number; lng: number };
}

export const useMapProjects = (): MapProject[] => {
  const [projects, setProjects] = useState<MapProject[]>([]);

  useEffect(() => {
    const fetchProjectsAndSetPositions = async () => {
      try {
        const data = await getProjects();
        const projectsWithPositions = data
          .map((project: Project) => {
            if (project.lat != null && project.lng != null) {
              return {
                ...project,
                type: "project" as const,
                client: project.name,
                position: { lat: project.lat, lng: project.lng },
              } as unknown as MapProject;
            }
            return null;
          })
          .filter((p): p is MapProject => p !== null);

        setProjects(projectsWithPositions);
      } catch (error) {
        console.error("Failed to fetch projects for map:", error);
      }
    };
    fetchProjectsAndSetPositions();
  }, []);

  return projects;
};
