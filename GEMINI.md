# GEMINI.md - GYA Glass & Aluminum (My Glass App)

## Project Overview

**GYA Glass & Aluminum** is a high-performance corporate web application for a company specializing in glass and aluminum structures. It serves as a project portfolio, service catalog, and primary contact channel.

### Tech Stack
- **Core Framework:** React 18 (Vite)
- **UI & Styling:** Chakra UI (Aura Design System), Framer Motion
- **Routing:** React Router DOM v6
- **Backend & Hosting:** Firebase (Hosting, Cloud Functions, Firestore)
- **Email Service:** Resend (integrated via Firebase Functions)
- **SEO:** React Helmet Async
- **Tooling:** pnpm, ESLint, Vite Image Optimizer

### Architecture: Feature-Based Architecture (FBA)
The project is organized by domain functionality rather than file type, ensuring scalability and maintainability.
- `src/features/`: Domain-specific logic (e.g., `projects`, `services`, `home`, `reclamation-book`).
- `src/shared/`: Centralized reusable components, hooks, and utilities.
- `src/layout/`: Global layout components like Navbar, Footer, and MainLayout.
- `src/config/`: Global configurations for Firebase and the Chakra UI theme.
- `src/data/`: Static data files (currently driving the app, planned migration to Headless CMS).
- `functions/`: Serverless backend logic (Node.js/Firebase Functions).

---

## Building and Running

### Prerequisites
- Node.js (v18+)
- pnpm (recommended)

### Commands
- **Install Dependencies:** `pnpm install`
- **Development Server:** `pnpm dev` (Runs at `http://localhost:5173`)
- **Production Build:** `pnpm build` (Output in `dist/`)
- **Linting:** `pnpm lint`
- **Deploy Frontend:** `pnpm deploy:hosting` (Requires Firebase CLI)
- **Deploy Functions:** `pnpm deploy:functions` (Requires Firebase CLI)
- **Preview Build:** `pnpm preview`

---

## Development Conventions

### Path Aliases
To avoid deep relative imports, use the following aliases configured in `vite.config.js`:
- `@`: `./src`
- `@features`: `./src/features`
- `@shared`: `./src/shared`
- `@layout`: `./src/layout`

### Coding Standards
- **Component-Driven Development:** Build UI from small, reusable components following Atomic Design principles.
- **Separation of Concerns:** Keep presentation (UI) separate from data fetching/logic (Services/Hooks).
- **Styling:** Use Chakra UI tokens and variants defined in `src/config/theme.js`. Avoid hardcoded colors or spacing; use semantic tokens (e.g., `bg.page`, `text.body`).
- **JSDoc:** Document files, components, and functions using JSDoc (see `App.jsx` or `theme.js` for examples).
- **Performance:** 
    - Use `React.lazy` and `Suspense` for route-based code splitting.
    - Utilize `ViteImageOptimizer` for asset management.
    - Prefer `pnpm` to ensure consistent dependency resolution.

### Testing & Validation
- Run `pnpm lint` before pushing changes to ensure code quality and accessibility (`jsx-a11y`).
- Manually verify responsiveness and dark mode compatibility (Aura Design System supports both).

---

## Key Files & Locations
- `src/config/theme.js`: The "Aura Design System" definition (colors, spacing, fonts).
- `src/routes/index.jsx`: Central routing configuration.
- `src/data/`: Source of truth for portfolio and service content.
- `functions/index.js`: Entry point for Firebase Cloud Functions.
- `vite.config.js`: Build pipeline and path alias configuration.
