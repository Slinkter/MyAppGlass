# Home Feature Module

## Overview

This module contains all components and services related to the main landing page of the application. It is designed to provide a rich, visually appealing entry point with high production value (glassmorphism, scroll animations).

## Architecture

- **Components**: Section-specific components (Hero, Features, Clients, Store).
- **Services**: Data fetching for clients and technical features.
- **Data**: Static data for localized content.

## Key Components

- `LandingPageSection`: The main Hero section with a call to action.
- `ClientsSection`: Displays a grid of clients with subtle animations.
- `FeaturesSection`: Highlights key technical and business advantages.
- `StoreSection`: Information about physical location and contact.

## Performance

- Uses `ItemGridLayout` for standardized responsive layouts.
- Implements LCP candidate optimizations.
