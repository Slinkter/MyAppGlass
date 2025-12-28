import { projects } from "@/data/projects";

export const getProjects = async () => {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return Promise.resolve(projects);
};
