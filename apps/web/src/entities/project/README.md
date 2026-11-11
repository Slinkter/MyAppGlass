# Project Entity Module

## Overview

Handles the portfolio section of the application, showcasing completed work through high-quality image galleries and descriptive cards.

## Architecture

- **Components**:
  - `ProjectsList`: The main container for project entries.
  - `ProjectCard`: Individual project summary with glassmorphism styling.
  - `ProjectCardContent` and `ProjectDetailItem`: Card body and detail rows.
  - `modal/VisualViewer` and `modal/MapViewer`: Gallery and map views of a project.
  - `api/useMapProjects`: adapts projects with coordinates into map markers for the home map.
- **Data**: Firestore (`/projects`) is the only source. `shared/api/firebase/publicRest.ts` reads it at build time (REST) for the static export and `api/useProjects.ts` renders with that `initialData` and then refreshes from Firestore on the client.

## Key Features

- **Responsive Grid**: Automatically adapts to different screen sizes.
- **LCP Optimization**: Eager loading for primary portfolio items.
- **Maintainability**: Centralized data management for easy updates to the portfolio.
