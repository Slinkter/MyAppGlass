# MyAppGlass

Sitio web comercial para Glass & Aluminum Company S.A.C.

## Descripción y Propósito

Este proyecto es una aplicación web de una sola página (SPA) creada con React y Vite. Sirve como el sitio web comercial de Glass & Aluminum Company S.A.C., mostrando los servicios, proyectos y la información de contacto de la empresa. La aplicación está diseñada para ser rápida, receptiva y fácil de mantener.

## Instalación y Configuración

Para ejecutar este proyecto localmente, sigue estos pasos:

1.  **Clona el repositorio:**

    ```bash
    git clone https://github.com/tu-usuario/my-glass-app.git
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

Esto iniciará la aplicación en modo de desarrollo y la abrirá en tu navegador en `http://localhost:3000`.

## Arquitectura Aplicada

La arquitectura de este proyecto sigue los principios de Clean Architecture y Clean Code para garantizar la mantenibilidad, escalabilidad y separación de preocupaciones.

### Gestión de Estado con Redux Toolkit

Para una gestión de estado robusta y escalable, el proyecto utiliza **Redux Toolkit**. Esto centraliza el estado de la aplicación en un único `store` y facilita la gestión de la lógica de negocio y las operaciones asíncronas.

*   **Slices:** Se han creado "slices" específicos para `projects` y `services` (`src/features/projects/projectsSlice.js` y `src/features/services/servicesSlice.js`). Cada "slice" contiene su estado inicial, reducers para manejar las actualizaciones de estado y `createAsyncThunk` para gestionar la obtención de datos de forma asíncrona.
*   **`createAsyncThunk`:** Aunque los datos iniciales se obtienen de archivos JSON locales, el uso de `createAsyncThunk` prepara la aplicación para una futura integración con APIs externas (como Firebase Firestore). Esto permite manejar de forma consistente los estados de carga, éxito y error de las operaciones asíncronas.
*   **`useSelector` y `useDispatch`:** Los componentes (`ProjectsList`, `ServiceList`) interactúan con el store de Redux utilizando los hooks `useSelector` para acceder al estado y `useDispatch` para despachar acciones y thunks.

### Separación de Datos

Los datos de la aplicación, como la lista de proyectos y servicios, se han desacoplado del código de la interfaz de usuario. En lugar de estar codificados en componentes de React, los datos se almacenan en archivos JSON (`src/data/projects.json` y `src/data/services.json`). Estos archivos son la fuente de verdad para los thunks de Redux Toolkit.

Este enfoque proporciona varias ventajas:

*   **Mantenibilidad:** Los datos se pueden actualizar fácilmente sin tener que modificar el código de los componentes.
*   **Escalabilidad:** Facilita la transición a un sistema de gestión de contenido (CMS) o una base de datos en el futuro.
*   **Separación de preocupaciones:** Mantiene la capa de datos separada de la capa de presentación.

### Estructura de Componentes

La estructura de componentes está organizada para promover la reutilización y la separación de preocupaciones. Los componentes se dividen en tres categorías:

*   **Componentes comunes:** Componentes reutilizables que se pueden usar en toda la aplicación (p. ej., botones, entradas, etc.).
*   **Componentes de diseño:** Componentes que definen la estructura de la página (p. ej., encabezado, pie de página, barra lateral, etc.).
*   **Componentes de características:** Componentes que son específicos de una característica o página en particular (p ej., `ProjectsList`, `ServiceList`, etc.).

## Build y Deploy

Para compilar la aplicación para producción, ejecuta el siguiente comando:

```bash
npm run build
```

Esto creará una versión optimizada de la aplicación en el directorio `dist`. Luego, puedes desplegar el contenido de este directorio en tu proveedor de alojamiento preferido.

## Contacto

Para soporte o consultas, por favor contacta a [contacto@glasscompany.com.pe](mailto:contacto@glasscompany.com.pe).