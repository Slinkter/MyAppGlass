# GEMINI.md - GYA Company Project Context

## Project Overview
**GYA Glass & Aluminum S.A.C.** is a high-performance corporate web application for a Peruvian company specializing in glass and aluminum structures. It serves as a portfolio, service catalog, and primary contact channel.

- **Primary Goal:** showcase projects, detail services, and provide a seamless UX for potential clients.
- **Architecture:** **Feature-Based Architecture (FBA)** combined with SOLID principles.
- **Current State:** Active refactoring for UI/UX improvements (documented in `UX_UI_IMPROVEMENT_PLAN.md`).

## Tech Stack
- **Core:** React 18 (SPA), Vite (Bundler), pnpm (Package Manager).
- **UI & Styling:** Chakra UI v2 (Design System), Framer Motion (Animations), Vanilla CSS (Global styles).
- **State & Routing:** React Router DOM v6 (Data Router API), Custom Hooks for local state.
- **Backend & Hosting:** Firebase (Firestore, Auth, Functions, Hosting).
- **Performance:** React Helmet Async (SEO), Vite Image Optimizer (Assets), React Lazy/Suspense (Code Splitting).

## Project Structure
```text
src/
├── features/         # Domain-driven features (home, projects, services, reclamation-book)
├── shared/           # Reusable components, hooks, and utilities
├── layout/           # Global structural components (Navbar, Footer, MainLayout)
├── pages/            # View components (route targets)
├── routes/           # Router configuration (createBrowserRouter)
├── config/           # App configuration (Firebase, Theme)
├── data/             # Static data (clients, features, projects)
├── assets/           # Static resources (images, logos)
└── utils/            # General utilities
```

## Path Aliases
Defined in `vite.config.js` and `jsconfig.json`:
- `@/` -> `src/`
- `@features/` -> `src/features/`
- `@shared/` -> `src/shared/`
- `@layout/` -> `src/layout/`

## Key Commands
- `pnpm dev`: Start development server (`http://localhost:5173`).
- `pnpm build`: Production build (outputs to `dist/`).
- `pnpm lint`: Run ESLint checks.
- `pnpm deploy:hosting`: Build and deploy to Firebase Hosting.
- `pnpm deploy:functions`: Deploy Firebase Functions.
- `pnpm preview`: Preview production build locally.

## Development Conventions
- **Component Design:** Use Functional Components with Hooks. Wrap exported components with `React.memo()` and set `.displayName`.
- **Imports:** Avoid barrel files for internal feature components to ensure better tree-shaking (direct imports). Use path aliases.
- **Styling:** Follow the scale and tokens defined in `src/config/theme.js`. Use responsive objects for Chakra props (e.g., `fontSize={{ base: "md", md: "lg" }}`).
- **Animations:** Prefer `ScrollReveal` (Framer Motion wrapper) for entry animations.
- **SEO:** Every page should use the `HelmetWrapper` from `src/shared/components/` for meta tags.
- **Data Fetching:** Abstraction through a service layer in each feature (`src/features/*/services`). Use `useAsyncData` hook for loading states.
- **Accessibility:** Aim for WCAG 2.1 level AA. Use proper ARIA labels and focus management (Chakra UI handles much of this).

## Firebase Configuration
Firebase is initialized in `src/config/firebase.js`. Environment variables (prefixed with `VITE_`) are required for API keys and project IDs.

## Reference Documents
- `README.md`: High-level project architecture and setup.
- `UX_UI_IMPROVEMENT_PLAN.md`: Current backlog of visual and functional polish tasks.
- `docs/`: Internal project documentation.
- `.agents/skills/`: Custom AI skills for UI/UX, Architecture, and React best practices.
