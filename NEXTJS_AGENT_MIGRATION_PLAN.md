# Plan de Migración Guiada por Agentes: Vite.js a Next.js (App Router)

Este documento define la estrategia paso a paso para completar la migración de **GYA Glass & Aluminum** desde una SPA en Vite.js hacia el **App Router de Next.js**, utilizando un enfoque colaborativo multi-agente con acceso al servidor MCP (`next-devtools-mcp`).

---

## 🎯 Fase 1: Setup Inicial y Modo SPA (✅ COMPLETADO)
**Objetivo:** Migrar la infraestructura base sin romper la aplicación existente (React Router).
* **Ejecutado por:** Agente Generalista.
* **Tareas completadas:**
  - Instalación de `next`, `@types/next`.
  - Configuración de `next.config.mjs` y `tsconfig.json`.
  - Integración de `.mcp.json` para acceso de agentes al servidor de Next.js.
  - Creación de `src/app/layout.tsx` (Metadata + HTML base).
  - Creación de ruta Catch-All (`src/app/[[...slug]]`) para cargar React Router en modo cliente.
  - Migración de variables de entorno (`VITE_` ➡️ `NEXT_PUBLIC_`).
  - Actualización de importaciones de imágenes estáticas a objetos (`.src`).
  - Limpieza de artefactos de Vite.

---

## 🛣️ Fase 2: Migración al Enrutador Nativo (App Router)
**Objetivo:** Reemplazar `react-router-dom` por el sistema de rutas basado en el sistema de archivos de Next.js.
* **Skill requerida:** `vercel-react-best-practices`.
* **Agentes asignados:** 2 agentes en paralelo (Enrutamiento y Layouts).
* **Tareas (Agentes):**
  1. **Reestructuración de Layouts:** Migrar los componentes globales (`Navbar`, `Footer`, `FloatingActions`) desde `src/layout` hacia `src/app/layout.tsx`.
  2. **Traducción de Rutas:** Leer `src/routes/index.tsx` y crear la estructura de carpetas equivalente en `src/app/`:
     - `src/app/page.tsx` (Home)
     - `src/app/servicios/page.tsx` (Services)
     - `src/app/proyectos/page.tsx` (Projects)
     - `src/app/libro-de-reclamaciones/page.tsx` (Reclamation Book)
  3. **Migración de Navegación:** Buscar exhaustivamente y reemplazar `<Link>` y `useNavigate` de `react-router-dom` por `<Link>` de `next/link` y `useRouter` de `next/navigation`.
  4. **Eliminación de dependencias:** Desinstalar `react-router-dom` y borrar `src/App.tsx`.

---

## ⚡ Fase 3: Server Components (RSC) y Optimización de Renderizado
**Objetivo:** Maximizar el rendimiento aislando el estado interactivo y renderizando la UI estática en el servidor.
* **Skill requerida:** `vercel-react-best-practices` (Especial atención a reglas `server-` y `bundle-`).
* **Agentes asignados:** 3 a 4 agentes especializados por dominios de negocio (Home, Servicios, Proyectos, Componentes Compartidos).
* **Tareas (Agentes):**
  1. **Análisis de Interactividad:** Los agentes deben inyectar la directiva `'use client'` **únicamente** en la parte superior de los archivos que requieran interactividad (hooks de React, Chakra UI hooks de estado, animaciones de Framer Motion, Google Maps).
  2. **Refactorización de Hojas (Leaves):** Mover componentes interactivos a hojas del árbol para que las páginas padre (`page.tsx`) sigan siendo **Server Components**.
  3. **Carga de Datos Servidor:** Modificar la forma en que se importan/leen los archivos en `src/data/*.ts` para que se procesen puramente en el servidor, reduciendo el bundle de JavaScript que llega al cliente.

---

## 🖼️ Fase 4: Optimización Nativa de Next.js (Metadata, Imágenes y Fuentes)
**Objetivo:** Implementar las herramientas de optimización nativas (SEO y Core Web Vitals).
* **Agentes asignados:** 2 agentes (Agente SEO y Agente de Assets).
* **Tareas (Agentes):**
  1. **Metadatos y SEO:** Eliminar la dependencia `react-helmet-async`. El agente extraerá la metadata de cada página antigua y la declarará usando la API `export const metadata = { ... }` en cada nuevo `page.tsx`.
  2. **Optimización de Fuentes:** Reemplazar las fuentes importadas vía `<link>` en HTML por el módulo `next/font/google` (`Lora`, `Open Sans`, `Raleway`) inyectándolas a nivel de layout.
  3. **Optimización de Imágenes:** Refactorizar gradualmente las etiquetas `<img>` y `<Image>` (de Chakra) de alto impacto (Hero, Banners) hacia el componente `<Image>` de `next/image` para habilitar compresión automática (WebP/AVIF) y *Lazy Loading*.

---

## 🛡️ Fase 5: Integración Backend y Server Actions
**Objetivo:** Reubicar lógica de cliente hacia el servidor para mejorar seguridad y velocidad.
* **Agentes asignados:** 1 agente especializado en Backend/Firebase.
* **Tareas (Agentes):**
  1. **Migrar Formularios:** Refactorizar el formulario del **Libro de Reclamaciones** y **Contacto** para utilizar **Next.js Server Actions** en lugar de llamadas manuales a la API en el cliente.
  2. **Configuración Firebase:** Asegurar que el SDK de Firebase Client solo se inicialice en los Client Components que lo requieran (o mover lógica privilegiada al Firebase Admin SDK dentro de las Server Actions).

---

## 🚦 Fase 6: QA Activa con Next.js MCP DevTools
**Objetivo:** Identificar advertencias, errores de hidratación y problemas de tipos usando telemetría en vivo.
* **Agentes asignados:** Agente Generalista + Agentes de Reparación en bucle.
* **Tareas (Agentes):**
  1. Levantar el servidor con `pnpm dev`.
  2. El Agente consulta continuamente al MCP (`next-devtools-mcp`):
     - Llama a `get_errors` para resolver errores de hidratación (`text mismatch`, `client/server mismatch`).
     - Llama a `get_logs` para buscar *warnings* ocultos.
     - Llama a `get_page_metadata` para confirmar que el App Router mapeó correctamente las URLs.
  3. Resolver errores identificados de forma iterativa.
  4. Ejecución final de `pnpm build` para asegurar una compilación en producción sin fallos y analizar métricas del bundle.
