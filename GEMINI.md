# GEMINI.md - GYA Glass & Aluminum S.A.C.

## 🚀 Project Overview
GYA Glass & Aluminum S.A.C. is a high-performance corporate web application for a company specializing in glass and aluminum structures. It serves as a digital portfolio, service catalog, and primary contact channel.

- **Primary Technologies:** React 18 (Vite), Chakra UI, Framer Motion, Firebase.
- **Architecture:** **Feature-Based Architecture (FBA)** combined with SOLID principles and **Vercel React Best Practices**.
- **Serverless Backend:** Node.js 20 functions for server-side logic (e.g., email handling via `resend`).

---

## 🛠️ Building and Running

### Prerequisites
- **Node.js:** v18 or higher (Node 20 recommended).
- **Package Manager:** `pnpm` (required).

### Key Commands
- `pnpm install`: Install project dependencies.
- `pnpm dev`: Start the local development server (http://localhost:5173).
- `pnpm build`: Generate a production-ready build in `dist/`.
- `pnpm preview`: Locally serve the production build for testing.
- `pnpm lint`: Run ESLint to ensure code quality and consistency.
- `pnpm deploy:hosting`: Build and deploy to Firebase Hosting.
- `pnpm deploy:functions`: Deploy serverless functions to Firebase.
- `firebase emulators:start`: Run local Firebase emulators (Firestore, Functions, Hosting).

---

## 📂 Project Structure

- `src/features/`: Independent, autonomous feature modules (e.g., `projects/`, `services/`, `home/`, `reclamation-book/`).
- `src/shared/`: Reusable components (`GlassCard`, `Gallery`), custom hooks (`useAsyncData`), and utility functions.
- `src/layout/`: Global UI structure (Navbar, Footer, MainLayout).
- `src/pages/`: High-level view components.
- `src/routes/`: Centralized routing configuration using `react-router-dom`.
- `src/config/`: Global configurations (Firebase, Chakra theme, darkModeManager).
- `functions/`: Firebase Cloud Functions (Node.js 20).

---

## 📏 Development Conventions

### Documentation (JSDoc)
- **Mandatory:** Use JSDoc for all files, components, and hooks.
- **Principle:** Document **"Why over What"**. Focus on the intent and technical rationale behind the implementation.
- **Skills:** Leverage `jsdoc-typescript-docs` and `jsdoc-best-practices` skills for high-fidelity documentation.

### Architectural Patterns
- **Separation of Concerns:** Keep business logic in custom hooks (e.g., `useProjectModal`, `useServiceData`) and presentation in components.
- **Lazy Loading:** Use `React.lazy` and `Suspense` for heavy components (Maps, Modals, Pages).
- **Memoization:** Employ `React.memo`, `useMemo`, and `useCallback` strategically to prevent unnecessary re-renders in performance-critical sections.
- **Path Aliases:** Use predefined aliases for cleaner imports:
  - `@/`: `src/`
  - `@features/`: `src/features/`
  - `@shared/`: `src/shared/`
  - `@layout/`: `src/layout/`

### UI/UX & Styling
- **Framework:** Chakra UI (Utility-first CSS-in-JS).
- **Theme:** Semantic configuration in `src/config/theme.js`.
- **Aesthetic:** "Liquid Glass" (Glassmorphism) design system.
- **Animations:** Framer Motion for fluid transitions and interactive feedback.
- **Accessibility:** Adhere to WCAG 2.1 AA standards (use `axe-core` via `react-doctor` for auditing).

### Performance & SEO
- **Images:** Automatically optimized via `vite-plugin-image-optimizer`. Use `loading="lazy"` and `fetchPriority` where appropriate.
- **Bundle Optimization:** Manual chunking in `vite.config.js` for heavy libraries (Chakra, Framer, Firebase).
- **SEO:** Centralized metadata management via `HelmetWrapper` (React Helmet Async).

---

## 🔒 Security & Deployment
- **Environment Variables:** Protected via Firebase/Vite standards. NEVER commit `.env` files or secrets.
- **Deployment:** Continuous Deployment via Firebase CLI. Ensure `pnpm build` passes before deploying.
