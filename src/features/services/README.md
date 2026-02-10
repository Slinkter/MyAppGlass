# Services Feature Module

## Overview

Manages the display of individual services and the detailed service information pages. This module follows a hierarchical structure from a high-level list to specific technical details.

## Architecture

- **Components**:
  - `ServiceList`: Grid display of all available services.
  - `ServicePageLayout`: Structure for the detailed service view.
  - `ServiceSidebar`: Navigation between specific systems within a service.
- **Services**: `serviceService.js` manages synchronous data retrieval for services.
- **Data**: Centralized repository of service metadata and images.

## Design Patterns

- **Glassmorphism**: Applied to cards and sidebars for a premium feel.
- **Lazy Loading**: Detailed pages use lazy-loaded containers to optimize performance.
- **SEO**: Integrated with `HelmetWrapper` for per-service metadata.
