# Changelog

All notable changes to this project will be documented in this file.

## [2026-04-25] - Performance & UX Optimizations

### Added
- **Performance Plan**: Generated `PLAN_OPTIMIZACION.md` detailing the 4-phase performance execution.
- **Git Hooks**: Implemented a `.git/hooks/pre-commit` script to enforce FSD compliance, 100% type safety, and zero linting errors prior to any commit.

### Changed
- **Algorithm Optimization (O(1))**: Refactored array search algorithms (`Array.find()`) in `projectService.ts`, `serviceService.ts`, and `blogService.ts` to utilize HashMaps (`Map`) for instant `O(1)` data retrieval.
- **React Memoization**: Applied `React.memo` and `displayName` to heavily reused components like `GlassCard.tsx` and `AuraHeader.tsx` to eliminate unnecessary DOM re-renders.
- **Lazy Loading (Code Splitting)**: Integrated `next/dynamic` into `Gallery.tsx` to defer the loading of heavy Framer Motion components until they enter the viewport, radically shrinking the initial JS bundle.
- **LCP Asset Optimization**: Replaced `priority` with `loading="lazy"` on below-the-fold assets (e.g., Footer logo) to prioritize bandwidth for critical above-the-fold content.
- **UX Layout Sync (Zero CLS)**: Synchronized the skeleton loading state of `/proyectos/[id]` with its final rendered state, eliminating Cumulative Layout Shift during data hydration.
- **UX Breathing Room**: Increased the vertical gap tokens dynamically (`gap={{ base: "phi_sm", md: "phi_md" }}`) inside `ItemGridLayout.tsx` and `AuraHeader.tsx` to provide better visual separation between main headings and descriptions.

## [2026-04-25] - FSD Architectural Alignment & Documentation

### Changed
- **FSD Architecture Implementation**: Refactored the entire project structure to strictly follow Feature-Sliced Design (FSD). Moved `layout/` to `widgets/`, and legacy `views/` to `screens/` to prevent Next.js App Router conflicts.
- **Data Decentralization**: Migrated global static data files from `src/data/` into their respective domains within `src/features/` (e.g., `features/services/data`).
- **Path Aliases Updated**: Updated `tsconfig.json` to reflect the new architecture (`@screens`, `@widgets`, `@features`, `@shared`) and globally replaced outdated imports.

### Removed
- **Dead Code & Junk**: Conducted a deep clean of the repository, removing unused files (such as `App.css`, `pdf/virtual_archivo.pdf`), empty folders, and debug `console.log` statements.

### Added
- **AI Handoff Documentation (`AI_HANDOFF.md`)**: Created a dedicated handover document outlining the new architecture, path alias rules, and quality standards for future AI agents.
- **Technical Architecture Guide (`ARCHITECTURE.md`)**: Drafted a comprehensive Full-Stack guide detailing the Next.js/FSD frontend approach and the Firebase (Functions, Firestore, Storage) backend and security stance.

### Security
- **Firebase Hardening**: Ensured that `storage.rules` and `firestore.rules` maintain strict zero-trust write access, relying on verified Cloud Functions for data mutations.

## [2026-04-14] - Chakra UI v3 Final Migration & Stabilization

### Fixed
- **Critical Crash (DOMTokenList)**: Fixed the `"DOMTokenList.remove: The token can not contain whitespace"` error triggered by `next-themes` and `ChakraProvider`. Updated the `ColorModeProvider` to use `attribute="data-theme"` instead of `class` to properly isolate Chakra UI's theme variables. 
- **Missing Icon Components**: Restored the `Icon` import from `@chakra-ui/react` in `StoreSection.jsx` which caused a crash when attempting to render Lucide-React icons (`MapPin` & `Clock`).
- **CSS-in-JS Syntax Adherence**: Fixed internal Chakra DOM warnings by replacing all instances of standard CSS kebab-case properties `"-ms-overflow-style": "none"` with their valid camelCase representations `msOverflowStyle: "none"` in `GalleryThumbnails.jsx` and `ServicePageLayout.jsx`.
- **DOM Prop Standardization**: Prevented React reconciliation warnings by swapping `fetchPriority` (camelCase) to `fetchpriority` (lowercase standard HTML attribute) on underlying `img` tags across `GalleryViewer.jsx` and `LandingPageSection.jsx`.

### Added
- **Global Component Error Boundary (`ComponentErrorBoundary.jsx`)**: Added a global boundary wrapper across `Layout.jsx`. It locally isolates and catches sub-component React tree crashes allowing the application header/footer framework to stay alive instead of throwing a blank white screen, and exposes the specific `componentStack` trace back to the developer in Dev Mode.
- **Developer Error Overlay (`DevErrorOverlay.jsx`)**: Engineered a fixed bottom overlay panel that actively registers global DOM events like `window.onerror`, unhandled promise rejections (`unhandledrejection`), and custom `console.error` logs.

### Changed
- **Mass Codebase Linting Cleanup**: Deployed a target cleanup script eliminating un-used `useColorMode`, `Box` and `Link` imports over 23 files generated during the preceding V2 -> V3 migration. This enforced a zero-warning successful build output.
- **Deprecated Motion hooks**: Removed direct usage of Chakra's `usePrefersReducedMotion` per v3 migration protocols.

### Performance
- **Successful Production Build**: Ensured a successful Vite `pnpm run build` with `exit code 0`, optimizing heavy gallery / module assets yielding a total bundle size reduction and valid HTML generation for hoisting.
