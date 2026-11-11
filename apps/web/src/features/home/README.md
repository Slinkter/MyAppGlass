# Home Feature Module

## Overview

This module contains all components and services related to the main landing page of the application. It is designed to provide a rich, visually appealing entry point with high production value (glassmorphism, scroll animations).

## Architecture

- **Components** (`components/`): `hero/`, `features/`, `clients/`, `store/` and `contact/` sections, with their cards and skeletons. The services and projects sections are rendered from `features/services` (`ServiceList`) and `entities/project` (`ProjectsList`); their cards are built on `shared/components/Card/MediaCard`.
- **Location**: the map lives in `features/location` (`ImmersiveLocationMap`, `LocationMap`, `useLocationData`), not in this module.
- **Services**: `clientService.ts` and `featureService.ts` serve clients and technical features.
- **Data**: `data/clients.ts` and `data/features.ts` (static content).

## Key Components

- `LandingPageSection` (`hero/`): The main Hero section. It has no buttons: a floating chevron (`aria-label="Ver servicios"`, animation `floatDown` in `styles/global.css`) links to `#servicios`.
- `ClientsSection`: Displays a grid of clients with subtle animations.
- `FeaturesSection`: Highlights key technical and business advantages.
- `StoreSection` (`store/`): Location section; it renders `ImmersiveLocationMap` from `features/location`. (`InteractiveMap`, `DefaultInfoCard` and `ProjectDetailCard` were removed.)

## Performance

- Uses `ItemGridLayout` (`src/shared/components/Layout/ItemGridLayout.tsx`) for standardized responsive layouts.
- Implements LCP candidate optimizations.
