# MyAppGlass - Aplicación Web de G&A Company

Esta es la aplicación web para Glass & Aluminum Company S.A.C., desarrollada con React y Vite. La aplicación presenta los servicios, proyectos y información de contacto de la empresa.

El código fuente ha sido sometido a un proceso de **revitalización integral** para mejorar su arquitectura, rendimiento y mantenibilidad, aplicando principios de desarrollo de software moderno.

## Tecnologías Principales

*   **React:** Biblioteca para construir interfaces de usuario.
*   **Vite:** Entorno de desarrollo local ultrarrápido.
*   **React Router:** Para el enrutamiento del lado del cliente.
*   **Chakra UI:** Biblioteca de componentes para un diseño de UI rápido y accesible.
*   **Firebase (Firestore):** Utilizado para la funcionalidad del Libro de Reclamaciones.
*   **React Helmet Async:** Para la gestión de metadatos del `<head>` y optimización SEO.

## Mejoras Arquitectónicas y de Rendimiento

Como parte del proceso de refactorización, se implementaron las siguientes mejoras clave:

1.  **Arquitectura Limpia y Organización de Datos:**
    *   Se creó un directorio `src/data` para centralizar todos los datos de la aplicación (proyectos, servicios, galerías), separando los datos de la capa de presentación.
    *   Se eliminó la dispersión de archivos de datos (`db_*.js`) que estaban mezclados con los `assets`.

2.  **Reutilización de Lógica con Custom Hooks:**
    *   **`useIsMobile`**: Se creó un hook personalizado para centralizar la lógica de detección de dispositivos móviles (`useMediaQuery`), eliminando código duplicado en más de 6 componentes.
    *   **`useReclamoForm`**: Se abstrajo toda la lógica del complejo formulario del Libro de Reclamaciones a un custom hook, simplificando el componente `ReclamoForm.jsx` a una capa de UI puramente declarativa.

3.  **Optimización de Rendimiento:**
    *   **Code Splitting por Ruta:** Se implementó `React.lazy` y `Suspense` en el enrutador principal (`main.jsx`). Esto divide la aplicación en fragmentos más pequeños que se cargan bajo demanda, reduciendo drásticamente el tiempo de carga inicial de la página.
    *   **Componente `Suspense`**: Se añadió un fallback de UI con un `Spinner` para mejorar la experiencia del usuario mientras se cargan las diferentes secciones de la aplicación.

4.  **Documentación y Mantenibilidad:**
    *   Se añadió **documentación JSDoc** a los componentes y hooks refactorizados para facilitar su comprensión y futuro mantenimiento.
    *   Se estandarizó el uso de componentes, como `FadingImage`, para asegurar consistencia visual y funcional.

## Cómo Empezar

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### Prerrequisitos

*   Node.js (versión 18.x o superior)
*   `pnpm` (o puedes usar `npm` o `yarn`)

### Instalación

1.  Clona el repositorio:
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd MyAppGlass
    ```

2.  Instala las dependencias:
    ```bash
    pnpm install
    ```

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y añade tus credenciales de Firebase. Sigue el ejemplo de `.env.example` si existe, o añade las siguientes variables:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
```

### Ejecutar la Aplicación

Para iniciar el servidor de desarrollo de Vite:

```bash
pnpm run dev
```

La aplicación estará disponible en `http://localhost:5173` (o el puerto que Vite asigne).

### Build de Producción

Para crear una versión optimizada para producción:

```bash
pnpm run build
```

Los archivos estáticos se generarán en el directorio `dist/`.