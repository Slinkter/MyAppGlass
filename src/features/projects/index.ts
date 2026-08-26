/**
 * @file index.ts
 * @description Public API for the Projects feature module.
 * @module projects
 */

// Components
export { default as ProjectCard } from "./components/ProjectCard";
export { default as ProjectsList } from "./components/ProjectsList";

// Hooks
export { useProjectModal } from "./hooks/useProjectModal";

// Services
export { getProjects } from "@shared/services/projectService";
