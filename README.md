pnpm run build
npx serve dist -s

# o

python -m http.server 5000 --directory dist

# GYA Glass & Aluminum - Aplicación Web Corporativa

Aplicación web de alto rendimiento para GYA Glass & Aluminum S.A.C., una empresa especializada en el diseño, fabricación e instalación de estructuras de vidrio y aluminio. El sitio sirve como portafolio de proyectos, catálogo de servicios y canal de contacto principal.

## 🚀 Arquitectura y Stack Tecnológico

Este proyecto está construido sobre una arquitectura moderna, desacoplada y orientada a componentes, priorizando la mantenibilidad, escalabilidad y rendimiento.

### Stack Tecnológico

- **Core Framework:** [React 18](https://reactjs.org/)
- **Bundler & Dev Server:** [Vite](https://vitejs.dev/)
- **UI Framework:** [Chakra UI](https://chakra-ui.com/)
- **Animaciones:** [Framer Motion](https://www.framer.com/motion/)
- **Routing:** [React Router DOM v6](https://reactrouter.com/)
- **SEO:** [React Helmet Async](https://github.com/staylor/react-helmet-async)
- **Hosting & Funciones Serverless:** [Firebase](https://firebase.google.com/)

### Arquitectura de Software

La aplicación ha sido refactorizada para seguir un patrón **Feature-Based Architecture** (FBA) combinado con principios SOLID:

1.  **Feature-Based Organization:** El código está organizado por funcionalidad (`projects/`, `services/`, `home/`, `reclamation-book/`), no por tipo de archivo. Cada feature es autónoma y contiene sus componentes, hooks y servicios. Esto mejora significativamente la escalabilidad y mantenibilidad.

2.  **Shared Code Separation:** Todo código reutilizable vive en `src/shared/`, incluyendo componentes genéricos, hooks personalizados, y utilidades. Esto elimina duplicación y centraliza la lógica común.

3.  **Capa de Presentación (UI):** Compuesta por componentes de React funcionales que utilizan Hooks. Los componentes siguen filosofía de composición y se dividen en "presentational" (sin lógica) y "container" (con lógica) para máxima reutilización.

4.  **Capa de Servicios:** La lógica de obtención de datos está abstraída en una capa de servicios (`src/features/*/services`). Los componentes no acceden a datos estáticos directamente; consumen datos a través de funciones asíncronas, simulando una llamada a API. Esto desacopla la UI del origen de los datos.

5.  **Sistema de Diseño Centralizado:** Todos los estilos, fuentes y tokens de diseño están centralizados en `src/config/theme.js`, asegurando consistencia visual total y facilitando cambios globales.

6.  **Componentes Modularizados:** Se utiliza "atomic design" para componentes complejos, dividiéndolos en subcomponentes especializados (ej: `ProjectDetailModal` → `VisualViewer`, `ProjectInfo`). Se estandarizan hooks personalizados y se validan tipos con `prop-types`.

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
│   │   └── index.js              # Barrel exports
│   ├── home/                     # Secciones de la página principal
│   │   ├── components/           # ClientsSection, FeaturesSection, StoreSection
│   │   ├── services/             # Lógica AsyncData
│   │   └── index.js              # Barrel exports
│   └── reclamation-book/         # Libro de reclamaciones
│       ├── components/           # Form sections (PersonalInfo, Product, etc.)
│       ├── hooks/                # useReclamoForm
│       ├── api/                  # Peticiones API
│       └── index.js              # Barrel exports
├── shared/                       # Código compartido entre features
│   ├── components/               # Componentes reutilizables
│   │   ├── common/               # FadingImage, Gallery, GlassCard, Franja, etc.
│   │   ├── Image/                # ImageWithFallback, ImageOverlay
│   │   ├── Layout/               # ItemGridLayout, DataLoader
│   │   ├── HelmetWrapper.jsx     # SEO wrapper
│   │   └── ...
│   ├── hooks/                    # Hooks personalizados categorizados
│   │   ├── ui/                   # useGallery, useIsMobile
│   │   ├── observers/            # useIntersectionObserver
│   │   └── data/                 # useAsyncData
│   ├── config/                   # Tokens de diseño
│   └── utils/                    # Funciones utilitarias
├── layout/                       # Componentes de layout principal
│   ├── Navbar/                   # Navbar, DesktopNav, MobileNav, ColorModeToggle
│   ├── Footer/                   # Footer
│   ├── MainLayout/               # Layout principal
│   └── FloatingActions/          # FloatingWhatsApp button
├── pages/                        # Componentes de página (vistas)
├── routes/                       # Configuración de routing
├── config/                       # Configuración global (Firebase, Theme)
├── assets/                       # Imágenes, logos, recursos estáticos
├── styles/                       # Estilos globales
├── data/                         # Datos estáticos (clients, features, etc.)
├── utils/                        # Funciones de utilidad
├── docs/                         # Documentación del proyecto
└── App.jsx                       # Componente raíz
```

### Patrón Feature-Based Architecture

Cada feature (`projects`, `services`, `home`, `reclamation-book`) es una unidad independiente y cohesiva que contiene:

- **Components:** Componentes específicos de la feature, organizados en subdirectorios si son complejos
- **Hooks:** Lógica personalizada y estado exclusivo de la feature
- **Services:** Acceso a datos, llamadas API, o servicios de la feature
- **Index.js:** Barrel export que expone la API pública de la feature

Esta arquitectura permite que cada feature sea:

- ✅ **Independiente:** Puede ser desarrollada, testada y mantenida por separado
- ✅ **Escalable:** Nuevas features pueden agregarse sin afectar existentes
- ✅ **Reutilizable:** Código compartido vive en `src/shared/`
- ✅ **Fácil de navegar:** Todo lo relacionado a una feature está en su carpeta

### Path Aliases

Para evitar imports relativos complicados, se han configurado aliases en `vite.config.js`:

```javascript
"@features": "./src/features",      // ✅ Importar desde features
"@shared": "./src/shared",          // ✅ Importar desde shared
"@layout": "./src/layout",          // ✅ Importar desde layout
"@": "./src"                        // ✅ Fallback para src/
```

**Ejemplos de uso:**

```javascript
// ✅ CORRECTO - Usando aliases
import { ProjectCard } from "@features/projects";
import { FadingImage } from "@shared/components/common";
import { Navbar } from "@layout/Navbar";

// ❌ EVITAR - Múltiples ../ relativos
import ProjectCard from "../../../features/projects/components/ProjectCard";
```

## ✨ Características Clave del Codebase

- **Component-Driven Development:** UI construida a partir de pequeños componentes reutilizables.
- **Abstracción de Datos:** Los componentes son agnósticos al origen de los datos, gracias a la capa de servicios.
- **Carga Asíncrona:** Los datos de las secciones principales se cargan de forma asíncrona, mostrando elegantes skeletons de carga para mejorar la UX.
- **Rendimiento Optimizado:**
  - **Code Splitting:** Las páginas se cargan bajo demanda con `React.lazy` y `Suspense`.
  - **Infinite Scroll:** Implementado en listados clave (`Proyectos`, `Servicios`, `Clientes`) para cargar contenido bajo demanda y evitar cuellos de botella en el renderizado inicial.
  - **Optimización de Imágenes:** `vite-plugin-image-optimizer` se utiliza para comprimir y optimizar las imágenes durante el build.
- **Experiencia de Usuario (UX/UI):**
  - **Animaciones Scroll Reveal:** Componente reutilizable `ScrollReveal` (basado en Framer Motion) que añade transiciones suaves de entrada ("fade up") a los elementos al hacer scroll.
  - **Guía de Estilos Definida:** El uso de Chakra UI está estandarizado en el documento [Guía de Estilos de Chakra UI](./doc/chakra-ui-style-guidelines.md).

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
- `pnpm build`: Compila la aplicación para producción.
- `pnpm preview`: Sirve localmente el build de producción.
- `pnpm lint`: Analiza el código en busca de errores con ESLint.
- `pnpm deploy:hosting`: Despliega la aplicación a Firebase Hosting.
- `pnpm deploy:functions`: Despliega las funciones serverless a Firebase Functions.

## 📝 Mantenimiento y Actualizaciones

- **Para modificar contenido (proyectos, servicios, etc.):** Actualmente, se deben editar los archivos en `src/data/`. El plan a largo plazo es migrar esta data a un Headless CMS, momento en el cual solo se necesitará actualizar la capa de servicios en `src/services/`.
- **Para modificar estilos o añadir variantes:** Edite el archivo `src/config/theme.js` siguiendo las directrices del [documento de estilos](./doc/chakra-ui-style-guidelines.md).
