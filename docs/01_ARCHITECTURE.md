# 🏗️ Arquitectura de Software - GYA Glass & Aluminum

Este documento detalla la estructura técnica, flujos de datos y patrones de diseño utilizados en el proyecto.

## 📐 Principios Fundamentales
- **Feature-Based Architecture (FBA):** Organización por dominios de negocio.
- **Chakra UI v3 + Aura Components:** Sistema de diseño basado en tokens nativos de Chakra UI (spacing 4px base, color, typography).
- **Clean Architecture:** Desacoplamiento total entre servicios de datos y UI.

## 🔄 Flujo de Datos (Filtrado e Infinite Scroll)

```text
+---------------------+
|    Service/Project  |  <-- Fuentes de Datos (Static/CMS)
|       Data          |
+----------+----------+
           |
           v
+----------+----------+      +--------------------------+
|   Feature Service   | <--- |   projectService.ts      |
|  (Logic Layer)      |      |   serviceService.ts      |
+----------+----------+      +--------------------------+
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
│   └── shared/       @gya/shared     companyData, SITE_URL, CompanyInfo
├── firebase.json     hosting.public = apps/web/out; functions.source = apps/functions
├── firestore.rules   escritura solo administradores
└── storage.rules     lectura pública; subida y borrado solo administradores
```

## 📁 Estructura de Directorios (`apps/web/src/`)

El proyecto sigue una variante **parcial de Feature-Sliced Design (FSD)**: existen las capas `app`, `screens`, `widgets`, `features` y `shared`, pero **no hay capa `entities/`**. Con `output: 'export'`, las rutas se prerenderizan como HTML estático en `apps/web/out/`.

- `apps/web/src/app/`: Rutas de Next.js App Router (wrappers ligeros: `page.tsx`, `layout.tsx`, además de `sitemap.ts` y `robots.ts`).
- `apps/web/src/screens/`: Composición de pantallas completas (Admin, Auth, Presupuesto, SimuladorAI, Blog, Error, Home, Legal, Projects, Services). Nombres de componentes en PascalCase.
- `apps/web/src/widgets/`: Bloques globales de UI (AdminNav, FloatingActions, Footer, Navbar).
- `apps/web/src/features/`: Lógica de dominio: `admin`, `ai-simulator`, `auth`, `blog`, `contacto`, `home`, `presupuesto`, `products`, `projects`, `reclamation-book` y `services`.
  - `features/admin/`: CRUD de servicios y proyectos; componentes de formulario comunes en `components/form`; seed en `seed/`.
  - `features/auth/`: `AdminRouteGuard`.
  - `features/*/hooks/`: hooks públicos (`useServices`/`useService`, `useProjects`/`useProject`) con fallback local.
- `apps/web/src/shared/`: Código transversal: `api/firebase` (repositorios de servicios, proyectos, clientes y usuarios), `components`, `config`, `constants`, `data`, `hooks` (incluye `hooks/data/useAsyncResource.ts` y `hooks/ui/useFilterableList.ts`), `lib`, `providers`, `schemas`, `services`, `types` y `utils`.
  - `shared/providers/theme/index.ts`: configuración central del tema (Aura Design System sobre Chakra v3), con tokens de color de estado.
  - `shared/components/Layout/ItemGridLayout.tsx`: orquestador de cuadrícula.
- `apps/web/src/components/ui/`: wrappers de Chakra UI v3 (alert, button, dialog, drawer, toaster, etc.).
- `apps/web/public/images/`: Assets WebP optimizados.
- `packages/shared/src/`: `company-data.ts` (fuente real de `companyData`, reexportada en `apps/web/src/shared/config/company-data.ts`) e `index.ts`.

## 🔌 Acceso a datos público y admin

- Las páginas públicas `/servicios` y `/proyectos` leen de Firestore en cliente con skeletons; si la lectura falla o no hay datos, usan el catálogo local como fallback.
- Las rutas de detalle son de cliente: `/servicios/ver?slug=` y `/proyectos/ver?id=`.
- El panel `/admin` usa `AdminRouteGuard` y escribe en Firestore/Storage; las reglas permiten escritura solo a administradores.

## ✅ Estado actual (2026-10-30)

- **Hecho:** monorepo pnpm; purga de imágenes basura; SITE_URL, dirección y RUC únicos; contacto en `companyData`; FSD corregido; modales admin con componentes comunes; pantallas admin/simulador/presupuesto divididas; hooks públicos con fallback; reglas de Firestore/Storage (escritura solo admin); CSP ampliado para Firestore, Auth y Storage.
- **Verificado:** `pnpm run typecheck`, `pnpm run lint` y `pnpm run build` pasan.
- **Pendiente:** probar admin y páginas públicas en navegador con emuladores y con Firestore apagado; despliegue de reglas y hosting aún no realizado; esquemas Zod y ESLint compartido aún no extraídos a `packages/shared`; alinear la versión de pnpm de CI con el lockfile.

---
*Documentación generada con ascii-diagram-boxflow.*
