# Changelog

All notable changes to this project will be documented in this file.

## [2026-10-30] - Firebase como única fuente de servicios y proyectos

### Added
- `scripts/migrate-to-firebase.mjs`: migración ejecutada en producción (10 servicios, 14 proyectos, 137 imágenes en Storage, con FAQ, SEO y álbum por sistema).
- `apps/web/src/shared/api/firebase/publicRest.ts`: lectura de Firestore en build para `generateStaticParams`, metadata, JSON-LD, sitemap y `initialData`.

### Changed
- Las páginas públicas usan los datos de build como `initialData` y se refrescan desde Firestore en el cliente; las lecturas usan `*FromServer`.

### Removed
- Datos locales de servicios y proyectos, el seed del admin y 640 imágenes (`public/images` 74 MB → 7,8 MB; `src/assets` 139 MB → 19 MB).

### Pendiente
- Desplegar reglas de Firestore y Storage, asignar el claim `role=admin` al admin y desplegar Hosting.

## [2026-10-30] - Migración a Monorepo pnpm, Firestore en el Frontend Público y Reglas Admin

### Added
- **Monorepo pnpm**: `apps/web` (`@gya/web`, Next.js con export estático a `apps/web/out`), `apps/functions` (`@gya/functions`, Firebase Functions v2) y `packages/shared` (`@gya/shared`: `companyData`, `SITE_URL`, `CompanyInfo`). Commit `522b52a`.
- **Páginas públicas desde Firestore**: `/servicios` y `/proyectos` leen de Firestore en cliente con skeletons y fallback local (hooks `useServices`/`useService`/`useProjects`/`useProject` y `shared/hooks/data/useAsyncResource.ts`). Rutas de detalle en cliente: `/servicios/ver?slug=` y `/proyectos/ver?id=`.
- **Prueba de reglas con emuladores**: `apps/web/tests/rules/rules-smoke.sh`.
- **Componentes comunes de modales admin** en `features/admin/components/form`.

### Changed
- **Reglas de seguridad**: `firestore.rules` y `storage.rules` con escritura solo para administradores (más estricta que el plan original).
- **CSP de Firebase Hosting**: ampliado para permitir Firestore, Auth y Storage (`firebase.json`).
- **Unificación de datos**: `SITE_URL` único; dirección única "Av. Los Fresnos 1250 - La Molina"; RUC único `20606432870`; contacto (`salesEmail`, `whatsappDisplay`) centralizado en `companyData`.
- **Tema**: tokens de color de estado en el tema.
- **Pantallas divididas**: admin, simulador y presupuesto separadas en componentes más pequeños; constantes en `shared/constants`.
- **Arquitectura FSD**: `AdminRouteGuard` en `features/auth`, `seedData` en `features/admin/seed`, `clientsRepository`/`usersRepository` en `shared/api/firebase`.
- **Nombres PascalCase** para componentes y pantallas (`Providers.tsx`, `ContactPageClient`, `FloatingWhatsApp`, `screens/Blog|Error|Home|Legal|Services|Projects`).

### Fixed
- **Purga de imágenes basura y duplicados**, y eliminación de three.js obsoleto (commit `a7c3e1a`).
- **Dirección y SEO**: centralización de `SITE_URL` y unificación de la dirección (commit `f9e3781`).

### Pendiente
- Probar admin y páginas públicas en navegador con emuladores y con Firestore apagado.
- Reglas, hosting y datos **no desplegados** aún.
- Esquemas Zod y configuración de ESLint aún no extraídos a `packages/shared`.
- Alinear la versión de pnpm de CI (workflows con pnpm 11; lockfile generado con pnpm 12).

## [2026-10-29] - Puesta Operativa de Backend, Resend API Key y Blindaje Serverless

### Added
- **Pruebas de Integración y Errores HTTP**: Agregados `functions/test/captcha.test.js` y `functions/test/httpErrors.test.js` ampliando la suite a **141 tests unitarios**, todos pasando al 100% con `node:test`.
- **Soporte y Blindaje IPv6**: Agrupamiento por subred `/64` (`rateLimitKey`) en `functions/src/guards/rateLimit.js` evitando dispersión de buckets en Firestore.
- **Validación Automatizada con Newman**: Ejecución exitosa de la colección `tests/postman/GYA_Company_API.postman_collection.json` contra producción (9 requests, 23 aserciones, 0 fallos).

### Changed
- **API Key de Resend en Firebase Secret Manager**: Actualizada a la **Versión 3** (`RESEND_API_KEY`) y verificada contra el dominio verificado `gyacompany.com`.
- **Despliegue Completo de Cloud Functions (Node.js 22)**:
  - `submitReclamo`: Actualizada y desplegada con vinculación a la versión activa del secreto.
  - `submitContacto`: Actualizada y desplegada con vinculación a la versión activa del secreto.
  - `checkStatus`: Actualizada y desplegada.
- **reCAPTCHA v3 Hardening**: Envío seguro de credenciales mediante el cuerpo del POST (`application/x-www-form-urlencoded`) y timeout preventivo con `AbortSignal.timeout(5000)`.
- **Protección de Privacidad (PII en Logs)**: Eliminación de correos personales en `logger.warn` dentro de `reclamoService.js` y `contactoService.js`.

### Fixed
- **Subsanación de Test Roto**: Corregido payload de `crearReclamoPayload` en `functions/test/httpErrors.test.js` completando los campos obligatorios de Zod (`tipoDocumento`, `domicilio`, `tipoBien: "producto"`).
- **ESLint en `functions/`**: Subsanados 3 errores (`new-cap`, `quote-props`) y advertencia `max-len` (0 errores, 0 warnings).
- **Conflicto de Secretos en Cloud Run**: Documentado y solventado el solapamiento de variables locales de entorno con Secret Manager durante el despliegue.

## [2026-10-29] - Sincronización de documentación con el estado real del código

### Added
- **`functions/README.md`**: guía de arquitectura del backend (capas, flujo de un reclamo, tabla de funciones, modelo de datos, despliegue y cómo agregar una función nueva).
- **Pruebas automatizadas** con `node:test`: 120 pruebas en `functions/test/` (`cd functions && npm test`), con dobles de Resend, Firestore y reCAPTCHA.
- **Colecciones de Postman** actualizadas al contrato actual del backend en `tests/postman/` (commit `61af7db`).

### Changed
- **Documentación técnica sincronizada**: `docs/01_ARCHITECTURE.md` (estructura real de directorios, FSD parcial sin `entities/`, tema en `src/shared/providers/theme/index.ts`), `docs/06_DOCS_DEVELOPMENT.md` (variables de entorno según `.env.example` y `src/shared/config/env.ts`, scripts reales), `docs/07_BACKEND_IMPLEMENTATION.md` y `docs/08_DOCS_SECURITY_BACKEND.md` (las 3 funciones `submitReclamo`, `submitContacto` y `checkStatus`, rate limit, CORS, validación Zod, captchas y sanitización).
- **Documentos SEO sincronizados**: `docs/09_PLAN_SEO_CONTENIDOS.md`, `docs/10_SEO_JERARQUIA.md` (nuevo bloque de estado y tabla ruta → title real) y `docs/11_MANUAL_SEO_LOCAL.md` contrastados con `sitemap.ts`, `robots.ts`, `seo-utils.ts` y los 10 posts del blog.
- **READMEs de módulos y skill `gya-cms`**: rutas y componentes corregidos según los archivos existentes.
- **Rutas absolutas de Windows** de este changelog convertidas a texto de código.
- **Runtime de Cloud Functions**: migración de `nodejs20` a `nodejs22` en `firebase.json` y `functions/package.json` por el retiro de Node.js 20 (2026-10-30). Desplegado el 2026-10-29: `submitReclamo`, `submitContacto` y `checkStatus` corren en `nodejs22` (ver `docs/08_DOCS_SECURITY_BACKEND.md` sobre el conflicto de `RECAPTCHA_SECRET_KEY` en el despliegue).
- **Backend reorganizado en capas** (`functions/src/`: `http/`, `guards/`, `schemas/`, `services/`, `adapters/`, `templates/`, `config/`). `functions/index.js` solo inicializa `firebase-admin` y exporta; `emailSender.js` y `mathCaptchaValidator.js` quedan como shims de compatibilidad (commit `db5ab7e`). **Desplegado el 2026-10-29.**
- **Reclamos y consultas: se guardan primero** en Firestore con código propio `GYA-REC-AAAA-XXXXXX` / `GYA-CON-AAAA-XXXXXX`, y después se envían los dos correos en paralelo. Antes el código era el ID de Resend y el correo al administrador llevaba el marcador `TEMP_ID` (commit `f565e53`). **Desplegado el 2026-10-29.**
- **Rate limit por función** en transacción de Firestore: `submitReclamo` 8, `submitContacto` 8 y `checkStatus` 30 por IP cada 15 minutos, con campo `expireAt` para TTL (la política debe activarse en la consola) (commit `de58565`). **Desplegado el 2026-10-29.**
- **Reglas de Firestore y Storage endurecidas** (commit `b398036`), ya publicadas en producción: `libro_de_reclamaciones`, `contact_submissions` y `rate_limits` sin acceso desde el cliente, con cierre por defecto.
- **Dependencias de `functions/`**: aplicado `npm audit fix` (commit `a1ace1f`). Quedan 11 vulnerabilidades de producción (1 alta y 10 moderadas), pendientes de una actualización mayor.

### Fixed
- **IP del cliente**: ya no se toma el primer valor de `X-Forwarded-For`, que controla el cliente, sino la entrada que añade la infraestructura (`TRUSTED_PROXY_HOPS = 1`). **Desplegado el 2026-10-29.** Confirmado que un `X-Forwarded-For` forjado no evade el límite; falta confirmar en el log que la IP resuelta es la pública real.
- **Rate limit fail-open**: `submitReclamo` y `submitContacto` responden 503 si Firestore falla, en lugar de dejar pasar la petición. `checkStatus` conserva el modo abierto a propósito. **Desplegado el 2026-10-29.**
- **Marcador `TEMP_ID`** eliminado del correo al administrador: el correo lleva el código real. **Desplegado el 2026-10-29.**
- **Errores internos**: los fallos de persistencia responden un mensaje genérico y el detalle queda en el log. Los handlers aún devuelven `error.message` para otras excepciones (pendiente, ver `functions/README.md`).

### Removed
- **Configurador 3D de ventanas** (commit `2ca4f3e`, 2026-08-26): eliminados `VentanaConfigurador3DCard.tsx`, `components/configurador3d/`, `src/features/services/data/ventanas-catalogo.json` y `scripts/optimize-images.mjs`; la dependencia `three` fue retirada de `package.json`. Las entradas históricas que describen el simulador 3D reflejan el estado de su fecha.

### Notes
- Los sistemas oficiales de ventanas son 4: Nova, Serie 25, Serie 35 y Serie 62.
- `PLAN_OPTIMIZACION.md` fue eliminado en el commit `a743595` (2026-07-24); `ARCHITECTURE.md` y `AI_HANDOFF.md` son hoy `docs/01_ARCHITECTURE.md` y `docs/02_AI_HANDOFF.md`.
- Último build verificado: 55 páginas prerenderizadas.

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
- **Dimensiones Paramétricas (W x H) y Selector de Sistemas**: Sliders interactivos para ancho y alto con recálculo en tiempo real, presets de vanos arquitectónicos y selector de 6 sistemas de ventanas. [Nota 2026-10-29: los sistemas oficiales son 4 — Nova, Serie 25, Serie 35 y Serie 62].
- **Ficha Técnica en Vivo & Cotizador WhatsApp**: Desglose dinámico de materiales en tiempo real y enlace directo a WhatsApp con plantilla pre-llenada.
- **Composición 2.5D y Shaders PBR**: Shader `MeshPhysicalMaterial` con IOR 1.52 para cristal, mapeo de tonos ACES Filmic para aluminio y ambientes con imágenes reales de showroom.



## [2026-07-22] - Google Maps API Key Deployment Fix

### Fixed
- **Google Maps API Key Embebida**: Se solucionó el problema donde el entorno de producción en Firebase Hosting no reconocía la API Key de Google Maps (mostrando el mensaje "For development purposes only"). Se realizó un despliegue forzado (`deploy:hosting`) asegurando que el archivo `.env.local` fuera leído por Next.js durante la construcción estática (`next build`), inyectando correctamente la variable `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` en el bundle final.

## [2026-06-20] - Environment Recovery & Mobile Layout Fixes

### Added
- **Configuración de Entorno Real**: Recuperación y configuración del archivo `.env` (ruta local, no versionada) con API Keys de Firebase, Auth Domain, Storage Bucket, Messaging ID, App ID y Google Maps API Key reales de producción usando la sesión activa de Firebase CLI.
- **Endpoints de Producción para API**: Vinculación directa con las URLs reales de producción de las Firebase Functions (`submitContacto`, `submitReclamo`, `checkStatus`) en el entorno local.

### Changed
- **Optimización de Interfaz Móvil**: Ocultamiento del botón flotante de WhatsApp en dispositivos móviles (`display={{ base: "none", md: "flex" }}`) en `src/widgets/FloatingActions/FloatingWhatsApp.tsx` para resolver colisión y superposición con el botón del menú flotante móvil en `src/widgets/Navbar/MobileNav.tsx`. En pantallas desktop se mantiene en la esquina inferior derecha.

## [2026-04-25] - Production Routing & Reclamation Book Fixes

### Fixed
- **Firebase Static Routing**: Resolved the issue where `/libro-de-reclamacion` was falling back to the home page by enabling `cleanUrls: true` in `firebase.json`. This ensures Next.js static HTML exports map correctly to clean URLs.
- **SSR Build Integrity**: Added `"use client";` to `AuraContainer.tsx` to fix the `prerender-error` caused by importing `framer-motion` in pre-rendered pages.
- **Reclamation Page Rendering**: Fully refactored `/libro-de-reclamacion` to use `AuraContainer`, ensuring the premium dark-mode aesthetic, smooth animations, and zero CLS.
- **SEO & Search Visibility**: Integrated the "Libro de Reclamaciones" into the `seo-utils.ts` JSON-LD Knowledge Graph, improving indexing and brand authority.
- **Layout Cleanup**: Removed redundant `<br />` tags and consolidated Box containers in `ReclamationForm.tsx` for a cleaner, maintainable codebase.

## [2026-04-25] - Performance & UX Optimizations

### Added
- **Performance Plan**: Generated `PLAN_OPTIMIZACION.md` detailing the 4-phase performance execution. [Nota 2026-10-29: `PLAN_OPTIMIZACION.md` fue eliminado en el commit a743595.]
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
- **AI Handoff Documentation (`AI_HANDOFF.md`)**: Created a dedicated handover document (hoy `docs/02_AI_HANDOFF.md`) outlining the new architecture, path alias rules, and quality standards for future AI agents.
- **Technical Architecture Guide (`ARCHITECTURE.md`)**: Drafted (hoy `docs/01_ARCHITECTURE.md`) a comprehensive Full-Stack guide detailing the Next.js/FSD frontend approach and the Firebase (Functions, Firestore, Storage) backend and security stance.

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
