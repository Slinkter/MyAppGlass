# GYA Glass & Aluminum - Aplicación Web Corporativa

Aplicación web de alto rendimiento para GYA Glass & Aluminum S.A.C., una empresa especializada en el diseño, fabricación e instalación de estructuras de vidrio y aluminio. El sitio sirve como portafolio de proyectos, catálogo de servicios y canal de contacto principal.

## 🚀 Arquitectura y Stack Tecnológico

Este proyecto está construido sobre una arquitectura moderna, desacoplada y orientada a componentes, priorizando la mantenibilidad, escalabilidad, rendimiento y SEO.

### Stack Tecnológico

- **Core Framework:** [React 18](https://reactjs.org/)
- **Bundler & Dev Server:** [Vite](https://vitejs.dev/)
- **UI Framework:** [Chakra UI](https://chakra-ui.com/)
- **Animaciones:** [Framer Motion](https://www.framer.com/motion/)
- **Routing:** [React Router DOM v6](https://reactrouter.com/)
- **SEO:** [React Helmet Async](https://github.com/staylor/react-helmet-async)
- **Mapas:** [@react-google-maps/api](https://www.npmjs.com/package/@react-google-maps/api)
- **Hosting & Funciones Serverless:** [Firebase](https://firebase.google.com/)

### Arquitectura de Software

La aplicación sigue un patrón **Feature-Based Architecture** (FBA) combinado con principios SOLID y **Vercel React Best Practices**:

1.  **Feature-Based Organization:** El código está organizado por funcionalidad (`projects/`, `services/`, `home/`, `reclamation-book/`), asegurando que cada módulo sea autónomo y escalable.

2.  **Shared Code Separation:** Todo código reutilizable vive en `src/shared/`, incluyendo componentes genéricos (`GlassCard`, `Gallery`), hooks personalizados y utilidades.

3.  **Hooks Personalizados (Logic Abstraction):** Se han creado hooks específicos para desacoplar la lógica de la vista (e.g., `useServiceData`, `useMapProjects`, `useGoogleMapsLoader`). Esto sigue el principio de *Separation of Concerns*.

4.  **Optimización de Rendimiento:**
    - **Lazy Loading:** Uso extensivo de `React.lazy` y `Suspense` para componentes pesados como el mapa interactivo y modales.
    - **Memoización:** Uso estratégico de `React.memo` y `useMemo` para evitar re-renderizados innecesarios, especialmente en componentes de lista y formularios.
    - **Carga Diferida de Imágenes:** Implementación de `loading="lazy"` y `fetchPriority` para mejorar Core Web Vitals (LCP).

5.  **SEO Técnico Avanzado:**
    - **HelmetWrapper:** Orquestador centralizado de metadatos SEO.
    - **JSON-LD:** Implementación de datos estructurados `LocalBusiness` para Google Maps y Knowledge Graph.
    - **Sitemap Dinámico:** Cobertura total de rutas de servicios y proyectos.

6.  **UX/UI Moderno:**
    - **Glassmorphism:** Estética consistente de "vidrio líquido" en tarjetas y contenedores.
    - **Navegación Móvil:** Nueva barra de navegación inferior flotante ("Píldora") optimizada para pulgares.
    - **Mapas Inmersivos:** Integración de Google Maps a pantalla completa en móviles para mejor experiencia de usuario.

## 📂 Estructura de Directorios

La estructura de archivos está organizada bajo **Feature-Based Architecture** para facilitar la navegación, mantenimiento y escalabilidad del proyecto.

```
src/
├── features/                     # Funcionalidades organizadas por dominio
│   ├── projects/                 # Proyectos y galería de trabajos
│   │   ├── components/           # ProjectCard, ProjectsList, ProjectDetailModal
│   │   ├── hooks/                # useProjectModal
│   │   ├── services/             # Lógica API de proyectos
│   │   └── index.js              # Barrel exports
│   ├── services/                 # Servicios y productos
│   │   ├── components/           # ServiceCard, ServiceList, ServiceSidebar
│   │   ├── services/             # Lógica API de servicios
│   │   ├── hooks/                # useServiceData (Data Fetching Hook)
│   │   └── index.js              # Barrel exports
│   ├── home/                     # Secciones de la página principal
│   │   ├── components/           # ClientsSection, FeaturesSection, InteractiveMap
│   │   │   └── map/              # Subcomponentes del mapa (Marker, Loader, etc.)
│   │   ├── hooks/                # Hooks del mapa (useMapState, useMapBounds)
│   │   ├── services/             # Lógica AsyncData
│   │   └── index.js              # Barrel exports
│   └── reclamation-book/         # Libro de reclamaciones
│       ├── components/           # Form sections (PersonalInfo, Product, etc.)
│       ├── hooks/                # useReclamoForm
│       └── index.js              # Barrel exports
├── shared/                       # Código compartido entre features
│   ├── components/               # Componentes reutilizables
│   │   ├── common/               # FadingImage, Gallery, GlassCard, etc.
│   │   ├── Layout/               # ItemGridLayout, HelmetWrapper
│   │   └── ...
│   ├── hooks/                    # Hooks personalizados categorizados
│   │   ├── ui/                   # useGallery, useIsMobile
│   │   └── data/                 # useAsyncData
│   ├── config/                   # Tokens de diseño
│   └── utils/                    # Funciones utilitarias
├── layout/                       # Componentes de layout principal
│   ├── Navbar/                   # Navbar, DesktopNav, BottomNav (Mobile)
│   ├── Footer/                   # Footer
│   ├── MainLayout/               # Layout principal
│   └── FloatingActions/          # FloatingWhatsApp button
├── pages/                        # Componentes de página (vistas)
├── routes/                       # Configuración de routing
├── config/                       # Configuración global (Firebase, Theme)
├── assets/                       # Imágenes, logos, recursos estáticos
├── styles/                       # Estilos globales
├── data/                         # Datos estáticos (clients, features, etc.)
├── utils/                        # Funciones de utilidad (webVitals, constants)
└── App.jsx                       # Componente raíz
```

## ✨ Características Clave del Codebase

- **Component-Driven Development:** UI construida a partir de pequeños componentes reutilizables y atómicos.
- **Abstracción de Datos:** Los componentes son agnósticos al origen de los datos, gracias a la capa de servicios y custom hooks.
- **Interactive Maps:** Implementación personalizada de Google Maps con marcadores dinámicos, clustering y diseño responsivo adaptativo.
- **Mobile-First UX:**
  - **Bottom Navigation:** Menú inferior estilo "app nativa" para fácil acceso en móviles.
  - **Full-Width Maps:** Mapas que aprovechan el 100% del ancho de pantalla en dispositivos móviles.
  - **Tarjetas Optimizadas:** Diseño de tarjetas (Services/Projects) con áreas de toque grandes y feedback visual claro.

## 🛠️ Instalación y Desarrollo Local

Para ejecutar el proyecto en un entorno de desarrollo local, siga estos pasos.

1.  **Prerrequisitos:**
    - Node.js (v18 o superior)
    - `pnpm` como gestor de paquetes (recomendado)

2.  **Instalar dependencias:**

    ```bash
    pnpm install
    ```

3.  **Iniciar el servidor de desarrollo:**
    La aplicación estará disponible en `http://localhost:5173`.
    ```bash
    pnpm run dev
    ```

### Scripts Disponibles

- `pnpm dev`: Inicia el servidor de desarrollo.
- `pnpm build`: Compila la aplicación para producción con optimizaciones.
- `pnpm preview`: Sirve localmente el build de producción para pruebas.
- `pnpm lint`: Analiza el código en busca de errores y consistencia de estilo.
- `pnpm deploy:hosting`: Despliega la aplicación a Firebase Hosting.
- `pnpm deploy:functions`: Despliega las funciones serverless a Firebase Functions.

## 📝 Mantenimiento

- **Documentación (JSDoc):** Todo el código sigue estándares estrictos de JSDoc ("Why over What") para facilitar el mantenimiento futuro.
- **Actualización de Contenido:** Datos estáticos en `src/data/` pueden editarse directamente. Nuevas imágenes deben optimizarse antes de subirse.
