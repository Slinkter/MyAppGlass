# Reclamation Book Feature Module

## Overview

Implements the "Libro de Reclamaciones", a legally required complaint form for Peruvian businesses. It handles complex form data collection and submission.

## Architecture

- **Components**: `ReclamationForm` is the main entry point, utilizing specialized form sub-components.
- **Hooks**: `useReclamationForm` manages the complex state and validation of the multi-field form.
- **API**: Connects via `reclamoService` to handle backend submission.

## Design

- Follows the legal structure required by INDECOPI.
- Integrated with the global design system while maintaining clarity for legal documentation.
- Uses controlled inputs and responsive layout for mobile accessibility.
