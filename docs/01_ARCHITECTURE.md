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

## ⚙️ Backend (`functions/`)

Las funciones de Firebase (Node.js 22, CommonJS) atienden los formularios del sitio: Libro de Reclamaciones (`submitReclamo`), contacto y cotizaciones (`submitContacto`) y consulta del estado de una solicitud (`checkStatus`). El código está organizado en capas (`http/`, `guards/`, `services/`, `adapters/`, `schemas/`, `templates/` y `config/`). La arquitectura, el flujo de un reclamo, la tabla de funciones y el procedimiento de despliegue están en [functions/README.md](../functions/README.md).

## 📁 Estructura de Directorios

El proyecto sigue una variante **parcial de Feature-Sliced Design (FSD)**: existen las capas `app`, `screens`, `widgets`, `features` y `shared`, pero **no hay capa `entities/`**. Con `output: 'export'`, las rutas se prerenderizan como HTML estático (55 páginas en el último build).

- `src/app/`: Rutas de Next.js App Router (wrappers ligeros: `page.tsx`, `layout.tsx`, además de `sitemap.ts` y `robots.ts`).
- `src/screens/`: Composición de pantallas completas (Admin, Auth, Presupuesto, SimuladorAI, blog, error, home, legal, projects, services).
- `src/widgets/`: Bloques globales de UI (AdminNav, FloatingActions, Footer, Navbar).
- `src/features/`: Lógica de dominio. Los 10 dominios son: `ai-simulator`, `auth`, `blog`, `contacto`, `home`, `presupuesto`, `products`, `projects`, `reclamation-book` y `services`.
- `src/shared/`: Código transversal, con subcarpetas `api`, `components`, `config`, `data`, `hooks`, `lib`, `providers`, `schemas`, `services`, `types` y `utils`.
  - `src/shared/hooks/ui/useFilterableList.ts`: hook de filtrado y scroll infinito.
  - `src/shared/components/Layout/ItemGridLayout.tsx`: orquestador de cuadrícula.
  - `src/shared/services/projectService.ts` y `src/features/services/services/serviceService.ts`: capa de servicios de datos.
  - `src/shared/providers/theme/index.ts`: configuración central del tema (Aura Design System sobre Chakra v3).
- `src/components/ui/`: wrappers de Chakra UI v3 (alert, button, dialog, drawer, toaster, etc.).
- `public/images/`: Assets WebP optimizados.

---
*Documentación generada con ascii-diagram-boxflow.*
