/**
 * @file index.js
 * @description Feature Projects - Barrel exports
 */

// Components
export { default as ProjectCard } from './components/ProjectCard';
export { default as ProjectsList } from './components/ProjectsList';
export { default as ProjectCardSkeleton } from './components/ProjectCardSkeleton';
export { default as ProjectListSkeleton } from './components/ProjectListSkeleton';

// Hooks
export { useProjectModal } from './hooks/useProjectModal';

// Services
export { getProjects } from './services/projectService';