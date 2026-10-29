# Home Feature Module

## Overview

This module contains all components and services related to the main landing page of the application. It is designed to provide a rich, visually appealing entry point with high production value (glassmorphism, scroll animations).

## Architecture

- **Components** (`components/`): `hero/`, `features/`, `clients/`, `store/` and `contact/` sections, with their cards and skeletons.
- **Hooks**: `useMapProjects` feeds the store map with project locations.
- **Services**: `clientService.ts` and `featureService.ts` serve clients and technical features.
- **Data**: `data/clients.ts` and `data/features.ts` (static content).

## Key Components

- `LandingPageSection` (`hero/`): The main Hero section with a call to action.
- `ClientsSection`: Displays a grid of clients with subtle animations.
- `FeaturesSection`: Highlights key technical and business advantages.
- `StoreSection` (`store/`): Information about physical location and contact, with `InteractiveMap`, `DefaultInfoCard` and `ProjectDetailCard`.
- `HomeContactSection` (`contact/`): Contact block of the home page.

## Performance

- Uses `ItemGridLayout` (`src/shared/components/Layout/ItemGridLayout.tsx`) for standardized responsive layouts.
- Implements LCP candidate optimizations.
