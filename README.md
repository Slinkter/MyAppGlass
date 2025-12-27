# GYA Glass & Aluminum - Aplicación Web Corporativa

![GYA Logo](https://www.gyacompany.com/assets/logovcr-5381f09e.png)

Aplicación web de alto rendimiento para GYA Glass & Aluminum S.A.C., una empresa especializada en el diseño, fabricación e instalación de estructuras de vidrio y aluminio. El sitio sirve como portafolio de proyectos, catálogo de servicios y canal de contacto principal.

## 🚀 Arquitectura y Stack Tecnológico

Este proyecto está construido sobre una arquitectura moderna, desacoplada y orientada a componentes, priorizando la mantenibilidad, escalabilidad y rendimiento.

### Stack Tecnológico

-   **Core Framework:** [React 18](https://reactjs.org/)
-   **Bundler & Dev Server:** [Vite](https://vitejs.dev/)
-   **UI Framework:** [Chakra UI](https://chakra-ui.com/)
-   **Animaciones:** [Framer Motion](https://www.framer.com/motion/)
-   **Routing:** [React Router DOM v6](https://reactrouter.com/)
-   **SEO:** [React Helmet Async](https://github.com/staylor/react-helmet-async)
-   **Hosting & Funciones Serverless:** [Firebase](https://firebase.google.com/)

### Arquitectura de Software

La aplicación ha sido refactorizada para seguir un patrón más robusto y escalable:

1.  **Capa de Presentación (UI):** Compuesta por componentes de React. Los componentes son funcionales y utilizan Hooks para gestionar su estado. La UI se construye de forma declarativa utilizando el sistema de componentes de Chakra UI.
2.  **Capa de Servicios:** La lógica de obtención de datos está abstraída en una capa de servicios (`src/services`). Los componentes ya no acceden a los datos estáticos directamente; en su lugar, consumen datos a través de funciones asíncronas, simulando una llamada a una API. Esto desacopla la UI del origen de los datos y prepara la aplicación para una futura integración con un Headless CMS.
3.  **Sistema de Diseño Centralizado:** Todos los estilos, fuentes y tokens de diseño están centralizados en el objeto de tema de Chakra UI (`src/config/theme.js`), asegurando una consistencia visual total y facilitando cambios de diseño globales.

## 📂 Estructura de Directorios

La estructura de archivos está organizada por funcionalidad para facilitar la navegación y el mantenimiento.

```
src/
├── api/                  # Configuración y servicios de API externos (Formulario de Reclamaciones)
├── assets/               # Imágenes, logos y otros archivos estáticos
├── components/           # Componentes React reutilizables
│   ├── common/           # Componentes genéricos (DataLoader, Gallery, etc.)
│   └── ...               # Componentes agrupados por feature (home, projects, etc.)
├── config/               # Configuración de la aplicación (Firebase, tema de Chakra UI)
├── data/                 # (Legado) Archivos de datos estáticos (consumidos por la capa de servicios)
├── doc/                  # Documentación del proyecto (guías de estilo, etc.)
├── hooks/                # Hooks de React personalizados
├── layout/               # Componentes de layout principal (Navbar, Footer)
├── pages/                # Componentes que actúan como vistas de página completas
├── services/             # Capa de abstracción de datos
├── styles/               # Estilos globales mínimos
└── utils/                # Funciones de utilidad genéricas
```

## ✨ Características Clave del Codebase

-   **Component-Driven Development:** UI construida a partir de pequeños componentes reutilizables.
-   **Abstracción de Datos:** Los componentes son agnósticos al origen de los datos, gracias a la capa de servicios.
-   **Carga Asíncrona:** Los datos de las secciones principales se cargan de forma asíncrona, mostrando elegantes skeletons de carga para mejorar la UX.
-   **Rendimiento Optimizado:**
    -   **Code Splitting:** Las páginas se cargan bajo demanda con `React.lazy` y `Suspense`.
    -   **Optimización de Imágenes:** `vite-plugin-image-optimizer` se utiliza para comprimir y optimizar las imágenes durante el build.
-   **Guía de Estilos Definida:** El uso de Chakra UI está estandarizado en el documento [Guía de Estilos de Chakra UI](./doc/chakra-ui-style-guidelines.md).

## 🛠️ Instalación y Desarrollo Local

Para ejecutar el proyecto en un entorno de desarrollo local, siga estos pasos.

1.  **Prerrequisitos:**
    -   Node.js (v18 o superior)
    -   `pnpm` como gestor de paquetes (recomendado)

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

-   `pnpm dev`: Inicia el servidor de desarrollo.
-   `pnpm build`: Compila la aplicación para producción.
-   `pnpm preview`: Sirve localmente el build de producción.
-   `pnpm lint`: Analiza el código en busca de errores con ESLint.
-   `pnpm deploy:hosting`: Despliega la aplicación a Firebase Hosting.
-   `pnpm deploy:functions`: Despliega las funciones serverless a Firebase Functions.

## 📝 Mantenimiento y Actualizaciones

-   **Para modificar contenido (proyectos, servicios, etc.):** Actualmente, se deben editar los archivos en `src/data/`. El plan a largo plazo es migrar esta data a un Headless CMS, momento en el cual solo se necesitará actualizar la capa de servicios en `src/services/`.
-   **Para modificar estilos o añadir variantes:** Edite el archivo `src/config/theme.js` siguiendo las directrices del [documento de estilos](./doc/chakra-ui-style-guidelines.md).