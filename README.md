# 🏗️ GYA Company - Plataforma Web Corporativa

> **Arquitectura de Software Moderna para Vidriería y Aluminio**
>
> _Una aplicación web progresiva (PWA) construida con React, Vite y Chakra UI, enfocada en rendimiento, SEO y una experiencia de usuario premium (Glassmorphism)._

[![Deploy Status](https://img.shields.io/badge/Deploy-Firebase-orange?style=flat-square&logo=firebase)](https://gya-app-4c8a9.web.app)
[![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Vite%20%7C%20ChakraUI-blue?style=flat-square)](https://reactjs.org/)
[![Performance](https://img.shields.io/badge/Lighthouse-100%25-green?style=flat-square)](https://pagespeed.web.dev/)

---

## 📖 Tabla de Contenidos

1.  [Visión del Proyecto](#-visión-del-proyecto)
2.  [Stack Tecnológico](#-stack-tecnológico)
3.  [Arquitectura de Software](#-arquitectura-de-software)
4.  [Patrones de Diseño Implementados](#-patrones-de-diseño-implementados)
5.  [Guía de Desarrollo (Paso a Paso)](/src/informes/tutorial.md)
6.  [Optimizaciones y Rendimiento](#-optimizaciones-y-rendimiento)
7.  [Estrategia SEO](#-estrategia-seo)
8.  [Despliegue (CI/CD)](/src/informes/GUIA_CONFIGURACION_ENTORNOS.md)

---

## 🔭 Visión del Proyecto

El objetivo fue crear una presencia digital para **Glass & Aluminum Company S.A.C.** que refleje la naturaleza de su negocio: **transparencia, elegancia y solidez**.

Para lograrlo, nos alejamos de las plantillas genéricas y construimos una solución a medida utilizando la estética **Glassmorphism** (efecto de vidrio esmerilado), que no solo es una tendencia de diseño, sino una metáfora visual directa de los productos de la empresa.

---

## 🛠 Stack Tecnológico

Seleccionamos herramientas modernas que garantizan velocidad de desarrollo (DX) y rendimiento para el usuario final (UX).

### Core

- **React 18**: Biblioteca de UI basada en componentes.
- **Vite**: Build tool de próxima generación. Reemplaza a Webpack ofreciendo HMR (Hot Module Replacement) instantáneo y builds optimizados con Rollup.
- **React Router DOM v6**: Manejo de rutas declarativo y dinámico.

### UI & Estilos

- **Chakra UI**: Framework de componentes accesible y modular. Nos permite iterar rápido manteniendo consistencia visual.
- **Framer Motion**: Biblioteca de animaciones declarativas (usada para transiciones de página y micro-interacciones).
- **React Icons**: Colección masiva de iconos SVG optimizados.

### Datos & Estado

- **Firebase**: Hosting y Backend-as-a-Service (BaaS).
- **React Hooks**: Manejo de estado local y efectos secundarios (`useState`, `useEffect`, `useMemo`, `useCallback`).

### Calidad & SEO

- **ESLint / Prettier**: Análisis estático de código y formateo.
- **React Helmet Async**: Gestión dinámica de metadatos (`<head>`) para SEO.
- **Vite Image Optimizer**: Compresión automática de assets en tiempo de build.

---

## 🏛 Arquitectura de Software

El proyecto sigue una estructura de carpetas basada en **Dominios y Funcionalidad**, evitando el acoplamiento y facilitando la escalabilidad.

```bash
src/
├── api/            # Capa de comunicación con servicios externos (Firebase, APIs)
├── assets/         # Recursos estáticos (imágenes, fuentes)
├── components/     # Componentes de UI reutilizables
│   ├── common/     # Átomos y moléculas globales (Botones, Inputs, Loaders)
│   ├── home/       # Organismos específicos de la página de inicio
│   ├── projects/   # Componentes del dominio "Proyectos"
│   └── services/   # Componentes del dominio "Servicios"
├── config/         # Configuraciones globales (Firebase, Tema, Constantes)
├── data/           # Datos estáticos (JSON-like) que alimentan la UI
├── hooks/          # Custom Hooks (Lógica reutilizable separada de la vista)
├── layout/         # Estructuras maestras (Navbar, Footer, Layout Wrapper)
├── pages/          # Vistas principales (Rutas)
├── routes/         # Definición de rutas y Lazy Loading
└── utils/          # Funciones auxiliares puras (Helpers)
functions/          # Backend Serverless (Firebase Functions)
│   ├── index.js    # Punto de entrada de las funciones
│   └── emailSender.js # Lógica de envío de correos (Resend)
```

### Principios Aplicados

1.  **Separación de Intereses (SoC):** La lógica de negocio (Hooks/API) está separada de la presentación (Componentes).
2.  **Arquitectura Serverless:** El backend reside en `functions/`, desacoplado del frontend pero integrado en el mismo repositorio (Monorepo).
3.  **Atomic Design (Adaptado):**
    - _Átomos_: `FadingImage`, `HelmetWrapper`.
    - _Moléculas_: `ProjectCard`, `ServiceCard`.
    - _Organismos_: `ProjectsList`, `ServicesSection`.
    - _Plantillas_: `Layout`.
4.  **Single Source of Truth:** Los datos de la empresa (teléfonos, dirección) se centralizan en `config/company-data.js`.

---

## 🧩 Patrones de Diseño Implementados

### 1. Container/Presentational Pattern (Adaptado)

En las páginas de servicios dinámicas (`src/components/services/service-pages/`), separamos:

- **Container (`ServicePageContainer`)**: Maneja la lógica de la ruta (`useParams`), busca los datos correctos y gestiona estados de error/carga.
- **Presentational (`ServicePageLayout`)**: Solo se preocupa de renderizar la UI con los datos que recibe.

### 2. Custom Hooks

Extraemos lógica compleja en hooks personalizados para mantener los componentes limpios.

- `useProjectModal`: Encapsula la lógica de apertura/cierre y selección de datos del modal de proyectos.
- `useIsMobile`: Abstrae la lógica de media queries para JS.

### 3. Composition Pattern

En lugar de "prop drilling" excesivo, usamos composición.

- Ejemplo: `Layout` envuelve a `children`, permitiendo que cualquier página herede la estructura base (Navbar + Footer + Background) sin configuración extra.

### 4. HOC (Higher Order Components) & Wrappers

- `HelmetWrapper`: Un componente que envuelve la lógica de SEO, proveyendo valores por defecto seguros y permitiendo sobreescritura específica por página.

---

## ⚡ Optimizaciones y Rendimiento

El rendimiento no es un "feature", es un requisito.

1.  **Code Splitting & Lazy Loading:**
    - Las rutas principales se cargan de forma perezosa (`React.lazy`) en `src/routes/index.jsx`. Esto divide el bundle JS en trozos más pequeños, cargando solo lo necesario para la vista actual.
2.  **Memoización (`React.memo`):**
    - Componentes de alto uso como `ProjectCard`, `ServiceCard` y secciones estáticas (`LandingPageSection`) están memoizados para prevenir re-renderizados innecesarios cuando el padre cambia.
3.  **Optimización de Imágenes:**
    - Uso de `vite-plugin-image-optimizer` para comprimir imágenes al construir.
    - Componente `FadingImage` para carga progresiva con efecto visual suave.
    - **Responsive Backgrounds**: El `Layout` carga imágenes diferentes para móvil y escritorio, ahorrando ancho de banda.
4.  **Virtualización (Concepto):**
    - Aunque no usamos listas infinitas, preparamos la estructura (`ItemGridLayout`) para soportar paginación o virtualización fácil si el catálogo crece.

---

## 🔍 Estrategia SEO

Implementamos un **SEO Técnico** robusto para una SPA (Single Page Application):

1.  **Metadatos Dinámicos:** Cada página actualiza `<title>`, `<meta description>` y etiquetas `OpenGraph` (para redes sociales) usando `react-helmet-async`.
2.  **Datos Estructurados (JSON-LD):** Inyectamos un esquema `LocalBusiness` en el `index.html` para que Google entienda que somos un negocio físico con dirección y horarios (Vital para Google Maps).
3.  **Semántica HTML:** Uso estricto de `<header>`, `<main>`, `<footer>`, `<h1>` (uno por página), y textos `alt` en imágenes.
4.  **Sitemap & Robots:** Archivos generados y optimizados para indexación.

---

## 🚀 Cómo Iniciar (Tutorial)

### Prerrequisitos

- Node.js (v16 o superior)
- pnpm (recomendado) o npm

### Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/MyAppGlass.git

# 2. Entrar al directorio
cd MyAppGlass

# 3. Instalar dependencias
pnpm install
```

### Desarrollo Local

```bash
# Iniciar servidor de desarrollo (con HMR)
pnpm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

### Construcción para Producción

```bash
# Crear build optimizado
pnpm run build

# Previsualizar el build localmente
pnpm run preview
```

---

## � Comandos de Despliegue (Cheat Sheet)

Notas rápidas para recordar cómo subir los cambios a producción:

### 1. Desplegar Solo Frontend (Hosting)

Úsalo cuando solo has modificado archivos en `src/`.

```bash
# Opción A (Script configurado):
npm run deploy:hosting

# Opción B (Manual):
npm run build
firebase deploy --only hosting
```

### 2. Desplegar Solo Backend (Functions)

Úsalo cuando solo has modificado archivos en `functions/`.

```bash
# Opción A (Script configurado):
npm run deploy:functions

# Opción B (Manual):
firebase deploy --only functions
```

### 3. Desplegar Todo

```bash
npm run build
firebase deploy
```

---

## �📄 Licencia

Este proyecto es propiedad de **Glass & Aluminum Company S.A.C.**
Desarrollado con ❤️ y estándares de ingeniería de software.
