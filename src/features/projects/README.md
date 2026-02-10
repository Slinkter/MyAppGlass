# Projects Feature Module

## Overview

Handles the portfolio section of the application, showcasing completed work through high-quality image galleries and descriptive cards.

## Architecture

- **Components**:
  - `ProjectsList`: The main container for project entries.
  - `ProjectCard`: Individual project summary with glassmorphism styling.
- **Hooks**: Custom hooks for managing project-specific UI state.
- **Services**: `projectService.js` provides data for the portfolio.

## Key Features

- **Responsive Grid**: Automatically adapts to different screen sizes.
- **LCP Optimization**: Eager loading for primary portfolio items.
- **Maintainability**: Centralized data management for easy updates to the portfolio.
