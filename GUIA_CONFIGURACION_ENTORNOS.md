# Guía de Configuración de Múltiples Entornos (Vite + Firebase)

## 1. Introducción

Este documento describe el patrón de arquitectura para gestionar múltiples entornos de Firebase (ej. un backend para desarrollo/funciones y otro para producción/hosting) dentro de un único proyecto de frontend basado en Vite. El objetivo es asegurar que las claves de API correctas se usen durante el desarrollo y la compilación, y que los despliegues apunten al proyecto de Firebase correcto.

--- 

## 2. Parte A: Variables de Entorno del Cliente con Vite Modes

Vite permite cargar diferentes variables de entorno según un "modo" especificado. Esto es ideal para decirle a nuestra aplicación React a qué backend de Firebase apuntar.

### 2.1. Estructura de Archivos `.env`

En lugar de un único archivo `.env`, creamos archivos específicos para cada entorno. El nombre del archivo debe seguir el formato `.env.[nombre-del-modo]`.

**Ejemplo:**

```
/proyecto
|-- .env.functions  // Contiene las claves para el backend de Firebase (gya-reclamos)
|-- .env.hosting    // Contiene las claves para el frontend de Firebase (vcrapp-993e5)
|-- package.json
`-- vite.config.js
```

Dentro de cada archivo, las variables deben llevar el prefijo `VITE_` para que Vite las exponga al código del cliente.

**`.env.functions`:**
```
# Credenciales para el proyecto de backend (gya-reclamos)
VITE_FIREBASE_PROJECT_ID=gya-reclamos
VITE_FIREBASE_API_KEY=AIzaSy...
# ...otras variables
```

### 2.2. Scripts en `package.json`

Modificamos los scripts en `package.json` para usar el flag `--mode` y así indicarle a Vite qué archivo `.env` cargar.

```json
"scripts": {
    "dev": "vite --mode functions",
    "dev:hosting": "vite --mode hosting",
    "dev:functions": "vite --mode functions",
    "build": "vite build --mode functions",
    "build:hosting": "vite build --mode hosting"
},
```

- **`pnpm run dev`**: Inicia el servidor de desarrollo usando las variables de `.env.functions`.
- **`pnpm run build`**: Compila la aplicación para producción usando las variables de `.env.functions`.
- **`pnpm run build:hosting`**: Compila la app usando las variables de `.env.hosting`.

### 2.3. Uso en el Código

En el código de la aplicación (ej. `src/config/firebase.js`), se accede a estas variables a través del objeto `import.meta.env`.

```javascript
const firebaseConfig = {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // ...
};
```

--- 

## 3. Parte B: Despliegue al Entorno Correcto con Firebase CLI

Una vez que la aplicación está compilada con las claves correctas, necesitamos asegurarnos de que se despliegue en el proyecto de Firebase correcto.

### 3.1. Alias de Proyectos

La CLI de Firebase permite configurar "alias" para no tener que recordar los ID de los proyectos. Esta configuración es local en tu máquina.

1.  **Añadir un alias:**
    ```bash
    firebase use --add
    ```
2.  Elige un proyecto de la lista (ej. `vcrapp-993e5`).
3.  Asígnale un alias fácil de recordar (ej. `hosting`).
4.  Repite el proceso para el otro proyecto (ej. `gya-reclamos` con el alias `functions`).

### 3.2. Cambiar de Proyecto Activo

Antes de desplegar, simplemente cambia al alias del proyecto que deseas usar.

- Para desplegar en el proyecto de hosting:
  ```bash
  firebase use hosting
  ```
- Para interactuar con el proyecto de backend:
  ```bash
  firebase use functions
  ```

### 3.3. Desplegar

El comando `firebase deploy` siempre actuará sobre el proyecto que esté activo.

```bash
# 1. Asegúrate de estar en el proyecto correcto
firebase use hosting

# 2. Compila la app con las variables de entorno correctas (si es necesario)
# pnpm run build:hosting

# 3. Despliega (ej. solo el hosting)
firebase deploy --only hosting
```

--- 

## 4. Resumen del Flujo de Trabajo

1.  **Desarrollo Diario:** Ejecuta `pnpm run dev`. Automáticamente usará el backend `gya-reclamos`.
2.  **Despliegue del Frontend:**
    a. Activa el proyecto de hosting: `firebase use hosting`.
    b. Compila la app para hosting: `pnpm run build:hosting` (si creaste este script).
    c. Despliega: `firebase deploy --only hosting`.
