# GEMINI.md - GYA Glass & Aluminum (My Glass App)

## Project Overview

**GYA Glass & Aluminum** is a high-performance corporate web application for a company specializing in glass and aluminum structures. It serves as a project portfolio, service catalog, and primary contact channel.

### Tech Stack
- **Core Framework:** React 18 (Vite 5)
- **UI & Styling:** Chakra UI v3 (Aura Design System), Framer Motion, next-themes (for Color Mode)
- **Routing:** React Router DOM v7
- **Backend & Hosting:** Firebase (Hosting, Cloud Functions, Firestore)
- **Email Service:** Resend (integrated via Firebase Functions)
- **SEO:** React Helmet Async
- **Icons:** Lucide-React, React-Icons, HeroIcons
- **Tooling:** pnpm, ESLint (Strict Zero-Warning), TypeScript (Config & Linting), Vite Image Optimizer

### Architecture: Feature-Based Architecture (FBA)
The project is organized by domain functionality rather than file type, ensuring scalability and maintainability.
- `src/features/`: Domain-specific logic (e.g., `projects`, `services`, `home`, `reclamation-book`).
- `src/shared/`: Centralized reusable components, hooks, and utilities.
- `src/layout/`: Global layout components like Navbar (Hamburger Mobile-First), Footer, FloatingActions, and MainLayout.
- `src/theme/`: **Aura Design System** core (v3 `createSystem`, recipes, and design tokens).
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
- **Production Build:** `pnpm build` (Includes Bundle Analysis and Image Optimization)
- **Linting:** `pnpm lint` (Strict zero-warnings policy enforced)
- **Analyze Bundle:** `pnpm analyze` (Generates `dist/bundle-report.html`)
- **Deploy Frontend:** `pnpm deploy:hosting` (Requires Firebase CLI)
- **Deploy Functions:** `pnpm deploy:functions` (Requires Firebase CLI)
- **Preview Build:** `pnpm preview`

---

## Development Conventions

### Path Aliases
To avoid deep relative imports, use the following aliases configured in `vite.config.ts`:
- `@`: `./src`
- `@features`: `./src/features`
- `@shared`: `./src/shared`
- `@layout`: `./src/layout`

### Coding Standards
- **Component-Driven Development:** Build UI from small, reusable components following Atomic Design principles.
- **Aura Design System (Fibonacci Scale):** All spacing (`phi_xs` to `phi_3xl`) and radii (`phi`) MUST use the Golden Ratio tokens defined in `src/theme/index.js`. Hardcoded pixel or generic rem values are strictly prohibited.
- **Chakra UI v3 Patterns:** Utilize `defineRecipe` and `defineSlotRecipe` for component styling. Use semantic tokens (e.g., `bg.page`, `text.body`, `glass.bg`) for color and background properties to ensure theme consistency.
- **Glassmorphism & Depth:** Surfaces should utilize the `glass` recipe (`variant="glass"`) or manual `backdropFilter` with `glass.border` semantic tokens.
- **Color Mode:** Managed via `next-themes` and `ColorModeProvider` using `attribute="data-theme"`. Avoid direct `class` manipulation for theme isolation.
- **Mobile-First & Compatibility:** Interactions must prioritize touch targets (min 44px). Build target is `es2015` to support older mobile browsers (iOS 10+, Chrome 50+).
- **Performance:** Heavy state updates that trigger UI reflows (like switching gallery categories) MUST be wrapped in React 18 `useTransition`. Large vendor packages are automatically split into manual chunks (Chakra, Framer, Firebase).
- **Error Handling:** Use `ComponentErrorBoundary` for local isolation of crashes and `DevErrorOverlay` for real-time error tracking during development.
- **JSDoc:** Document files, components, and functions using JSDoc.

### Test Labs (Visual Architecture)
The project includes live testing routes for UI/UX architectural review. Do not delete these routes; use them to prototype new designs before merging into production:
- `/test` (Footer Showcase)
- `/test-banca` (Bank Accounts Showcase)
- `/test-servicios` (Service Catalog Showcase)
- `/test-detalle-servicio` (Service Detail Showcase)

---

## Key Files & Locations
- `src/theme/index.ts`: The "Aura Design System" v3 definition (Tokens, Recipes, Semantic Tokens).
- `src/routes/index.tsx`: Central routing configuration (React Router v7).
- `src/components/ui/`: Chakra UI v3 generated/snippet components.
- `src/data/`: Source of truth for portfolio and service content.
- `functions/index.js`: Entry point for Firebase Cloud Functions.
- `vite.config.ts`: Build pipeline, path alias, and bundle optimization config.
