# GEMINI.md - Project Context: GYA Glass & Aluminum S.A.C.

## Project Overview
**GYA Glass & Aluminum S.A.C.** is a high-performance corporate web application for a Peruvian company specializing in glass and aluminum structures. It serves as a portfolio, service catalog, and primary contact channel.

- **Primary Goal:** Showcase projects, detail services, and provide a seamless UX for potential clients.
- **Architecture:** **Feature-Based Architecture (FBA)** combined with SOLID principles.
- **Design System:** **Aura Flat Premium** (Mathematical Golden Ratio spacing, Solid high-performance colors, zero-runtime blur).
- **Tech Stack:** React 18 (SPA), Vite (Bundler), pnpm (Package Manager), Chakra UI v2, Framer Motion (Animations), Firebase (Firestore, Auth, Functions, Hosting).

## Tech Stack Details
- **Core:** React 18 (Functional Components, Hooks).
- **Styling:** Chakra UI v2, Emotion, Vanilla CSS (Global). Note: Glassmorphism (`backdrop-filter`) has been purged in favor of "Solid Flat" colors to guarantee 60fps on low-end devices.
- **Routing:** React Router DOM v6 (Data Router API) with Route-level Lazy Loading and Suspense.
- **State Management:** Custom Hooks for local/feature state, `useAsyncData` for loading states.
- **SEO:** React Helmet Async.
- **Backend:** Firebase (Firestore for data, Auth for potential admin, Functions for email/logic).
- **Performance Engine (Zen-Throttle):**
  - **O(1) Rendering:** Proactive Infinite Scroll (`useIntersectionObserver`) in lists (Projects, Services).
  - **Virtualization (DOM Culling):** `content-visibility: auto` and internal observers unmount off-screen items >1000px away.
  - **Async Assets:** High-compression WebP/JPG (max 1280px), `decoding="async"`, and `Skeleton` UI for zero Cumulative Layout Shift (CLS).

## Project Structure
```text
src/
├── features/         # Domain-driven features (home, projects, services, reclamation-book)
│   └── [feature]/    # components/, hooks/, services/, index.js (barrel export)
├── shared/           # Reusable components, hooks, utils, and config
├── layout/           # Global layout (Navbar, Footer, MainLayout, FloatingActions)
├── pages/            # View components (route targets)
├── routes/           # Router configuration (createBrowserRouter)
├── config/           # App config (Firebase, Theme)
├── data/             # Static/initial data (clients, features, projects)
├── assets/           # Static resources (images, logos, svgs)
├── styles/           # Global CSS and themes
└── utils/            # General utility functions
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
- `pnpm preview`: Preview production build locally.
- `pnpm deploy:hosting`: Build and deploy to Firebase Hosting.
- `pnpm deploy:functions`: Deploy Firebase Functions.
- `pnpm clean`: Remove `node_modules` and `dist`.

## Development Conventions
- **Feature-Based Organization:** Organize code by domain (`src/features/`). Each feature should be autonomous.
- **Component Design:** Use Functional Components. Wrap exports with `React.memo()` and set `.displayName` for better performance and debugging.
- **Imports:** Avoid barrel files for internal feature components; use direct imports with path aliases (e.g., `import { X } from "@features/home/components/X"`).
- **Performance First (Zero-Jank):**
  - **No Glassmorphism:** Avoid `backdropFilter` and heavy `rgba` overlaps. Use solid semantic colors (`primary.900`, `white`) from the theme.
  - **Skeletons:** Always use `<Skeleton>` placeholders for images to prevent layout thrashing and maintain a 0 CLS.
  - **Animation Throttling:** Use passive animations on mobile (opacity only) and avoid vertical displacements (`offsetY`) that trigger heavy layout recalculations.
- **Styling (Aura Design):** Use Chakra UI tokens based on the Golden Ratio (e.g., `phi_xs`, `phi_sm`, `phi_md`, `phi_lg`, `phi_xl`, `phi_2xl`). 
- **Data Fetching:** Abstraction through a service layer in each feature (`src/features/*/services`). Use chunked loading (e.g., batches of 6) for large lists.
- **Accessibility:** Aim for WCAG 2.1 level AA. Ensure touch targets are at least `44px` on mobile.

## Key Configuration Files
- `package.json`: Main project configuration and scripts.
- `vite.config.js`: Vite plugins, build settings, aliases, and **ViteImageOptimizer** rules (Quality 70, max width 1280px).
- `jsconfig.json`: JavaScript configuration for IDE path resolution.
- `src/config/theme.js`: Centralized Chakra UI theme customization featuring the **Aura Flat Premium** design system.
- `performance_audit_report.md`: Detailed performance benchmarks, bottleneck resolutions, and architectural optimizations applied to the project.
- `UX_UI_IMPROVEMENT_PLAN.md`: Contains current backlog, specific coding conventions, and visual polish status.
- `AGENTS.md`: Documentation for AI agent interactions and skills.