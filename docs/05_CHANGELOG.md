# Changelog

All notable changes to this project will be documented in this file.

## [2026-08-25] - Unificación Oficial de Ventanas 3D, Layout 65/35 & Optimización de Documentación

### Added
- **Simulador 3D Puro**: Transformación del card `VentanaConfigurador3DCard` en un simulador visual técnico interactivo Three.js de vanos, perfiles y cristales.
- **Independencia de los 4 Sistemas**: Habilitación permanente de los 4 sistemas oficiales (`Sistema Nova`, `Serie 25`, `Serie 35`, `Serie 62`) para todos los tipos de ventana (`Corrediza`, `Proyectante`, `Batiente`, `Luz Fija`).
- **Sección Adicional**: Incorporación de acabados especiales (`Arenado` translúcido y `Diseño según cliente`) reflejados en tiempo real en los shaders PBR de Three.js.
- **Base de Conocimiento para LLMs**: Creación y optimización de `AGENTS.md` para asistentes de IA y modelos locales (Gemma 3/4, Qwen 2.5, DeepSeek).

### Changed
- **Proporción y Altura Compacta**: Configuración del visor 3D al 65% de ancho y panel de controles al 35% de ancho, con una altura estándar sincronizada de `460px` alineada con la galería y la ficha técnica.
- **Integración de Cabecera en Visor 3D**: Reubicación del título `"Ventana 3d"` y el badge dinámico de tipología como un overlay glassmorphism en el visor Three.js.
- **Ocultamiento de Navbar en Servicios**: Ocultamiento automático del navbar flotante de escritorio en rutas `/servicios/*` para una experiencia inmersiva.
- **Limpieza de Tipos de Vidrio**: Normalización estricta a 3 tipos (`Crudo`, `Laminado`, `Templado`) sin etiquetas de grosor redundantes.

### Added
- **Extracción de Catálogos Técnicos**: Incorporación de geometrías de perfiles extruidos precisos para carpintería de aluminio. Catálogo alineado a 4 sistemas oficiales: Nova, Serie 25, Serie 35 y Serie 62.
- **Dimensiones Paramétricas (W x H) y Selector de Sistemas**: Sliders interactivos para ancho y alto con recálculo en tiempo real, presets de vanos arquitectónicos y selector de 6 sistemas de ventanas.
- **Ficha Técnica en Vivo & Cotizador WhatsApp**: Desglose dinámico de materiales en tiempo real y enlace directo a WhatsApp con plantilla pre-llenada.
- **Composición 2.5D y Shaders PBR**: Shader `MeshPhysicalMaterial` con IOR 1.52 para cristal, mapeo de tonos ACES Filmic para aluminio y ambientes con imágenes reales de showroom.



## [2026-07-22] - Google Maps API Key Deployment Fix

### Fixed
- **Google Maps API Key Embebida**: Se solucionó el problema donde el entorno de producción en Firebase Hosting no reconocía la API Key de Google Maps (mostrando el mensaje "For development purposes only"). Se realizó un despliegue forzado (`deploy:hosting`) asegurando que el archivo `.env.local` fuera leído por Next.js durante la construcción estática (`next build`), inyectando correctamente la variable `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` en el bundle final.

## [2026-06-20] - Environment Recovery & Mobile Layout Fixes

### Added
- **Configuración de Entorno Real**: Recuperación y configuración del archivo [.env](file:///C:/Users/LJCR/Documents/GitHub/MyAppGlass/.env) con API Keys de Firebase, Auth Domain, Storage Bucket, Messaging ID, App ID y Google Maps API Key reales de producción usando la sesión activa de Firebase CLI.
- **Endpoints de Producción para API**: Vinculación directa con las URLs reales de producción de las Firebase Functions (`submitContacto`, `submitReclamo`, `checkStatus`) en el entorno local.

### Changed
- **Optimización de Interfaz Móvil**: Ocultamiento del botón flotante de WhatsApp en dispositivos móviles (`display={{ base: "none", md: "flex" }}`) en [floating-whatsapp.tsx](file:///C:/Users/LJCR/Documents/GitHub/MyAppGlass/src/widgets/FloatingActions/floating-whatsapp.tsx) para resolver colisión y superposición con el botón del menú flotante móvil en [MobileNav.tsx](file:///C:/Users/LJCR/Documents/GitHub/MyAppGlass/src/widgets/Navbar/MobileNav.tsx). En pantallas desktop se mantiene en la esquina inferior derecha.

## [2026-04-25] - Production Routing & Reclamation Book Fixes

### Fixed
- **Firebase Static Routing**: Resolved the issue where `/libro-de-reclamacion` was falling back to the home page by enabling `cleanUrls: true` in `firebase.json`. This ensures Next.js static HTML exports map correctly to clean URLs.
- **SSR Build Integrity**: Added `"use client";` to `AuraContainer.tsx` to fix the `prerender-error` caused by importing `framer-motion` in pre-rendered pages.
- **Reclamation Page Rendering**: Fully refactored `/libro-de-reclamacion` to use `AuraContainer`, ensuring the premium dark-mode aesthetic, smooth animations, and zero CLS.
- **SEO & Search Visibility**: Integrated the "Libro de Reclamaciones" into the `seo-utils.ts` JSON-LD Knowledge Graph, improving indexing and brand authority.
- **Layout Cleanup**: Removed redundant `<br />` tags and consolidated Box containers in `ReclamationForm.tsx` for a cleaner, maintainable codebase.

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
- **UX Breathing Room**: Increased the vertical gap dynamically (`gap={{ base: 3, md: 6 }}`) inside `ItemGridLayout.tsx` and `AuraHeader.tsx` to provide better visual separation between main headings and descriptions.

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
