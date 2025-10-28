# G&A Company - Aplicación Web Corporativa

Sitio web oficial para G&A Company, una empresa especializada en proyectos de vidriería y aluminio. La aplicación está construida con React y sigue principios de arquitectura limpia para garantizar su mantenibilidad y escalabilidad.

## 📜 Descripción del Proyecto

Esta aplicación sirve como la cara digital de G&A Company, mostrando sus servicios, proyectos completados y proporcionando información de contacto. Utiliza un stack tecnológico moderno para ofrecer una experiencia de usuario rápida y fluida.

-   **Tecnologías Principales:** React, Vite, Redux Toolkit, Chakra UI, React Router.
-   **Principios Clave:** Código Limpio, Arquitectura Limpia, Diseño Atómico.

---

## 🚀 Instalación y Setup

Sigue estos pasos para configurar el entorno de desarrollo local.

**Requisitos Previos:**

-   Node.js (versión 18.x o superior)
-   npm (o un gestor de paquetes como pnpm o yarn)

**Pasos de Instalación:**

1.  **Clona el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd my-glass-app
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Inicia el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

4.  Abre tu navegador y visita `http://localhost:5173` para ver la aplicación en funcionamiento.

---

## 🏛️ Arquitectura Aplicada

El proyecto ha sido refactorizado para seguir una arquitectura limpia, promoviendo la **separación de responsabilidades (SoC)** y la **reutilización de código**. Los siguientes patrones son el núcleo de nuestra arquitectura:

### 1. Capa de Servicios (Patrón Repositorio)

-   **Ubicación:** `src/api/`

-   **Descripción:** Toda la lógica de acceso a datos está abstraída en una "capa de servicio". Actualmente, esta capa obtiene datos de archivos `JSON` estáticos, pero está diseñada para ser fácilmente reemplazable. Si en el futuro migramos a una API REST, GraphQL o Firebase, solo necesitaremos modificar los servicios dentro de esta capa, sin tocar la lógica de negocio o los componentes de la UI.

-   **Ejemplo:** `src/api/projectService.js` exporta una función `fetchAllProjects()` que es consumida por los thunks de Redux.

### 2. Hooks Personalizados (Custom Hooks)

-   **Ubicación:** `src/hooks/`

-   **Descripción:** Para evitar la lógica de negocio (como la gestión de estado de Redux) directamente en los componentes, hemos creado hooks personalizados. Estos hooks encapsulan toda la interacción con Redux (`useDispatch`, `useSelector`, `useEffect`) y exponen una API simple y declarativa a los componentes.

-   **Ejemplo:** El hook `useProjects()` se encarga de despachar la acción para obtener proyectos y devuelve un objeto `{ projects, isLoading, error }`. Los componentes simplemente consumen este hook sin saber nada sobre Redux.

### 3. Componente `DataLoader` (Gestor de Estados de UI)

-   **Ubicación:** `src/components/common/DataLoader.jsx`

-   **Descripción:** Para evitar la repetición de lógica de renderizado condicional (mostrar skeletons de carga, mensajes de error, etc.), hemos implementado un componente genérico `DataLoader`. Este componente envuelve a otros y gestiona qué mostrar basado en el estado de `isLoading` y `error`.

-   **Beneficio:** Mantiene los componentes de la UI limpios y enfocados únicamente en la presentación de los datos finales, cumpliendo con el principio **DRY (Don't Repeat Yourself)**.

### 4. Rutas de Importación Absolutas

-   **Configuración:** `vite.config.js`

-   **Descripción:** Se ha configurado un alias `@` que apunta al directorio `src/`. Esto permite importaciones más limpias y mantenibles (ej. `import Component from '@/components/Component';`) en lugar de rutas relativas frágiles como `../../components/Component`.
