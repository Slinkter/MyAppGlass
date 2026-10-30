# Reclamation Book Feature Module

## Overview

Implements the "Libro de Reclamaciones", a legally required complaint form for Peruvian businesses. It handles complex form data collection and submission.

## Architecture

- **Components**: `ReclamationForm` is the main entry point, utilizing specialized form sub-components (`PersonalInfoSection`, `ProductSection`, `ClaimDetailSection`, `DeclarationSection`), plus `ReclamationFormContext` and `SuccessModal`.
- **Hooks**: `useReclamationForm` manages the complex state and validation of the multi-field form.
- **API**: Connects via `reclamoService` (`src/shared/api/reclamoService.ts`) to submit to the `submitReclamo` Cloud Function (URL from `NEXT_PUBLIC_API_URL`).
- **Utils**: `utils/sanitizer.ts` sanitizes input on the client; `types.ts` and `actions.ts` hold the module types and actions.
- **Backend**: see `docs/07_BACKEND_IMPLEMENTATION.md`.

## Design

- Follows the legal structure required by INDECOPI.
- Integrated with the global design system while maintaining clarity for legal documentation.
- Uses controlled inputs and responsive layout for mobile accessibility.
