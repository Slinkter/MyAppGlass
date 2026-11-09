# 🏗️ Arquitectura de Software - GYA Glass & Aluminum

Este documento detalla la estructura técnica, flujos de datos y patrones de diseño utilizados en el proyecto.

## 📐 Principios Fundamentales
- **Feature-Based Architecture (FBA):** Organización por dominios de negocio.
- **Chakra UI v3 + Aura Components:** Sistema de diseño basado en tokens nativos de Chakra UI (spacing 4px base, color, typography).
- **Clean Architecture:** Desacoplamiento total entre servicios de datos y UI.

## 🔄 Flujo de Datos (Filtrado e Infinite Scroll)

```text
+---------------------+
|    Service/Project  |  <-- Fuente de Datos (Firestore)
|       Data          |
+----------+----------+
           |
           v
+----------+----------+      +--------------------------+
|   Feature Hooks &   | <--- |  projectsRepository.ts   |
|  Repositories Layer |      |  servicesRepository.ts   |
+----------+----------+      |  publicRest.ts (SSG)     |
           |                 +--------------------------+
           |
           v
+----------+----------+      +--------------------------+
|  useFilterableList  | <--- |  useTransition (Concurrent)|
|    (Custom Hook)    |      |  Intersection Observer   |
+----------+----------+      +--------------------------+
           |
           v
+----------+----------+      +--------------------------+
|   ItemGridLayout    | <--- |  Staggered Animations    |
|   (Orchestrator)    |      |  Responsive Grid        |
+----------+----------+      +--------------------------+
           |
           v
+----------+----------+
|    UI Component     |  <-- Rendering (ProjectCard/ServiceCard)
|   (Final Output)    |
+---------------------+
```

## 🧩 Patrones de Composición (Compound Components)

Utilizamos el patrón de componentes compuestos para elementos complejos como la Galería y los Modales, permitiendo una API declarativa y flexible.

```text
<Gallery.Root>
  <Flex>
    <Gallery.Viewer />      <-- Visor Principal
    <Gallery.Thumbnails />  <-- Tira de Miniaturas
  </Flex>
</Gallery.Root>
```

## ⚙️ Backend (`apps/functions/`)

Las funciones de Firebase (Node.js 22, CommonJS) atienden los formularios del sitio: Libro de Reclamaciones (`submitReclamo`), contacto y cotizaciones (`submitContacto`) y consulta del estado de una solicitud (`checkStatus`). El código está organizado en capas (`http/`, `guards/`, `services/`, `adapters/`, `schemas/`, `templates/` y `config/`). La arquitectura, el flujo de un reclamo, la tabla de funciones y el procedimiento de despliegue están en [apps/functions/README.md](../apps/functions/README.md).

## 🧭 Monorepo (pnpm workspace)

El repositorio es un workspace pnpm (`pnpm-workspace.yaml`: `apps/*` y `packages/*`). Todos los comandos se ejecutan desde la raíz.

```text
MyAppGlass/
├── apps/
│   ├── web/          @gya/web        Next.js 16, export estático → apps/web/out/
│   └── functions/    @gya/functions  Firebase Functions v2 (Node.js 22)
├── packages/
│   ├── shared/       @gya/shared     companyData, SITE_URL, CompanyInfo
│   └── eslint-config/@gya/eslint-config  Reglas ESLint compartidas
├── docs/             Documentación, planes, auditorías y material no-producto
├── scripts/          Mantenimiento (contrato OpenAPI, auditorías, migración)
├── tests/            Pruebas transversales (reglas de Firestore)
├── gcp/              Configuración de observabilidad, presupuesto y BigQuery
├── firebase.json     hosting.public = apps/web/out; functions.source = apps/functions
├── firestore.rules   escritura solo administradores
└── storage.rules     lectura pública; subida y borrado solo administradores
```

## 📁 Estructura de Directorios (`apps/web/src/`)

El proyecto sigue una variante **parcial de Feature-Sliced Design (FSD)**: existen las capas `app`, `screens`, `widgets`, `features` y `shared`, pero **no hay capa `entities/`**. Con `output: 'export'`, las rutas se prerenderizan como HTML estático en `apps/web/out/`.

- `apps/web/src/app/`: Rutas de Next.js App Router (wrappers ligeros: `page.tsx`, `layout.tsx`, además de `sitemap.ts` y `robots.ts`).
- `apps/web/src/screens/`: Composición de vistas completas de página (Admin, Auth, Blog, DesignSystem, DesignSystemUbicacion, Error, Home, Legal, Presupuesto, Projects, Services, SimuladorAI, Tienda). Nombres de componentes y subdirectorios en PascalCase.
- `apps/web/src/widgets/`: Bloques globales de UI (AdminNav, FloatingActions, Footer, Navbar).
- `apps/web/src/features/`: Lógica de dominio: `admin`, `ai-simulator`, `auth`, `blog`, `contacto`, `home`, `presupuesto`, `products`, `projects`, `reclamation-book`, `services` y `tienda`.
  - `features/admin/`: CRUD de servicios y proyectos; componentes de formulario comunes en `components/form`; seed en `seed/`.
  - `features/auth/`: `AdminRouteGuard`, `AccountRouteGuard`.
  - `features/tienda/`: Motor de carrito (`cart-engine.ts`), store Zustand (`useCartStore.ts`) y hooks de inventario para la tienda.
  - `features/*/hooks/`: hooks públicos (`useServices`/`useService`, `useProjects`/`useProject`) que leen de Firestore.
- `apps/web/src/components/ui/`: Primitivas y wrappers base de Chakra UI v3 (alert, button, dialog, drawer, popover, toaster, etc.), proveyendo la base atómica del sistema de componentes.
- `apps/web/src/shared/`: Código transversal: `api/firebase` (repositorios de servicios, proyectos, clientes y usuarios), `components`, `config`, `constants`, `data`, `hooks` (incluye `hooks/data/useAsyncResource.ts` y `hooks/ui/useFilterableList.ts`), `lib`, `providers`, `schemas`, `services`, `types` y `utils`.
- `apps/web/public/images/`: Assets WebP optimizados.
- `packages/shared/src/`: `company-data.ts` (fuente real de `companyData`, reexportada en `apps/web/src/shared/config/company-data.ts`) e `index.ts`.

## 🔌 Acceso a datos público y admin

- Firestore es la **única fuente** de servicios y proyectos: los datos locales fueron purgados y no existe fallback local (`features/{services,projects}` y `shared/api/firebase` no contienen catálogos locales).
- Las rutas de listado `/servicios` y `/proyectos` fueron eliminadas (commit `752a5fe`). Quedan las rutas de detalle: `/servicios/[serviceSlug]`, `/proyectos/[projectId]` y las de cliente `/servicios/ver?slug=` y `/proyectos/ver?id=`.
- Los hooks públicos (`useServices`/`useService`, `useProjects`/`useProject`) leen de Firestore en cliente con skeletons.
- El panel `/admin` usa `AdminRouteGuard` y escribe en Firestore/Storage; las reglas permiten escritura solo a administradores.

## 🎨 Aura Design System

- Tema central: `apps/web/src/shared/providers/theme/index.ts` (Chakra v3, tokens semánticos y de estado).
- Showcase en la ruta `/design-system` (`apps/web/src/screens/DesignSystem/`), con variantes de botón `aura`, `outline`, `ghost`, `whatsapp` y `brand`.
- Plan y cierre del pulido: `apps/web/DESIGN.md`.

## ✅ Estado actual (2026-11-02)

- El build prerenderiza **60 rutas estáticas** (`56` archivos `.html` en `apps/web/out/` + `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, `icon.svg`); hay **19 archivos de test unitarios** en `apps/web/tests/unit/`.
- Stack: Next.js 16, React 19, TypeScript 6.0.3; `framer-motion` fue retirado.
- Las reglas de Firestore/Storage ya están desplegadas (ver `docs/05_CHANGELOG.md`, 2026-10-30).
- **Pendiente:** revisión visual de `/design-system` en navegador; probar admin y páginas públicas con emuladores; esquemas Zod y ESLint compartido aún no extraídos a `packages/shared`; alinear la versión de pnpm de CI con el lockfile.

---
*Documentación generada con ascii-diagram-boxflow.*
