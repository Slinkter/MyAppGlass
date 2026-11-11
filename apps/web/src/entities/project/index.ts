/**
 * @file index.ts
 * @description Public API for the Project entity.
 * @module entities/project
 */

// UI
export { default as ProjectCard } from "./ui/ProjectCard";
export { default as ProjectCardContent } from "./ui/ProjectCardContent";
export { default as ProjectDetailItem } from "./ui/ProjectDetailItem";
export { default as ProjectsList } from "./ui/ProjectsList";
export { ProjectCardSkeletons, ProjectDetailSkeleton } from "./ui/ProjectSkeletons";
export { default as MapViewer } from "./ui/modal/MapViewer";
export { default as VisualViewer } from "./ui/modal/VisualViewer";

// API
export { useProjects, useProject } from "./api/useProjects";
export { useMapProjects } from "./api/useMapProjects";
export { getProjectHref, toProject, toProjectList } from "./api/projectMappers";

// Model
export type { MapProject, Project, ProjectPhoto } from "./model";
