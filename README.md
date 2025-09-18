# Aplicación Web - Glass & Aluminum Company

Este repositorio contiene el código fuente de la aplicación web oficial para [Glass & Aluminum Company](https://gyacompany.com/), construida con React (Vite) y desplegada en Firebase.

## Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu sistema:

-   [Node.js](https://nodejs.org/) (versión 18 o superior)
-   [pnpm](https://pnpm.io/installation) (recomendado) o npm
-   [Firebase CLI](https://firebase.google.com/docs/cli#install_the_cli)

```bash
npm install -g firebase-tools
```

## Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd MyAppGlass
    ```

2.  **Instala las dependencias del proyecto principal (frontend):**
    ```bash
    pnpm install
    ```

3.  **Instala las dependencias de las Cloud Functions (backend):**
    ```bash
    cd functions
    pnpm install
    cd ..
    ```

## Configuración del Backend

Las Cloud Functions de este proyecto utilizan SendGrid para enviar correos electrónicos. Necesitas configurar la clave de la API de SendGrid como un secreto en Firebase.

1.  **Configura el secreto:**
    Ejecuta este comando y, cuando se te solicite, pega tu clave de API de SendGrid.
    ```bash
    firebase functions:secrets:set SENDGRID_KEY
    ```

2.  **Otorga acceso al secreto (si es la primera vez):**
    Asegúrate de que tus funciones tengan acceso a la clave.
    ```bash
    firebase functions:secrets:access SENDGRID_KEY
    ```

## Comandos Principales

### Iniciar en Modo Desarrollo

Ejecuta la aplicación en un servidor local (`http://localhost:5173`). Se recargará automáticamente al guardar cambios.

```bash
pnpm dev
```

### Compilar para Producción

Genera una versión optimizada de la aplicación en la carpeta `dist`.

```bash
pnpm build
```

## Despliegue en Firebase

Asegúrate de haber iniciado sesión en Firebase (`firebase login`).

### Despliegue Completo

Sube la aplicación web (Hosting) y las Cloud Functions al mismo tiempo.

```bash
firebase deploy
```

### Desplegar solo las Cloud Functions

Si solo has hecho cambios en el backend.

```bash
firebase deploy --only functions
```

### Desplegar solo el Frontend

Si solo has hecho cambios en la aplicación de React.

```bash
pnpm run build && firebase deploy --only hosting
```

---

## Scripts de Limpieza del Proyecto

Estos comandos eliminan `node_modules`, cachés y carpetas de compilación para dejar el proyecto en un estado limpio.

### Para Windows

```bash
if exist node_modules ( rd /s /q node_modules ) && if exist functions\node_modules ( rd /s /q functions\node_modules ) && if exist dist ( rd /s /q dist ) && if exist package-lock.json ( del package-lock.json ) && if exist pnpm-lock.yaml ( del pnpm-lock.yaml ) && if exist functions\package-lock.json ( del functions\package-lock.json ) && npm cache clean --force
```

### Para macOS / Linux

```bash
rm -rf node_modules functions/node_modules dist && rm -f package-lock.json pnpm-lock.json functions/package-lock.json && npm cache clean --force
```
