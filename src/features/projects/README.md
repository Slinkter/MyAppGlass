# Projects Feature Module

## Overview

Handles the portfolio section of the application, showcasing completed work through high-quality image galleries and descriptive cards.

## Architecture

- **Components**:
  - `ProjectsList`: The main container for project entries.
  - `ProjectCard`: Individual project summary with glassmorphism styling.
  - `ProjectCardContent` and `ProjectDetailItem`: Card body and detail rows.
  - `modal/VisualViewer` and `modal/MapViewer`: Gallery and map views of a project.
- **Hooks**: `useProjectModal` manages the project modal UI state.
- **Data**: `data/projects.ts` holds the portfolio entries.
- **Services**: `src/shared/services/projectService.ts` provides data for the portfolio (shared across features).

## Key Features

- **Responsive Grid**: Automatically adapts to different screen sizes.
- **LCP Optimization**: Eager loading for primary portfolio items.
- **Maintainability**: Centralized data management for easy updates to the portfolio.
