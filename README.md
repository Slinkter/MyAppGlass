# Aplicación Web - Glass & Aluminum Company

## formeateo de macos

## Descripción y Propósito

Esta aplicación web es la plataforma oficial para Glass & Aluminum Company, diseñada para mostrar nuestros servicios, proyectos y facilitar la interacción con nuestros clientes. Construida con React (usando Vite) y desplegada en Firebase, la aplicación busca ofrecer una experiencia de usuario moderna, intuitiva y eficiente, reflejando la calidad y profesionalismo de nuestros trabajos en vidrio y aluminio.

## Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu sistema:

-   [Node.js](https://nodejs.org/) (se recomienda la versión 20 o superior)
-   [pnpm](https://pnpm.io/installation) (gestor de paquetes recomendado para este proyecto)
-   [Firebase CLI](https://firebase.google.com/docs/cli#install_the_cli)

```bash
# Instala la CLI de Firebase globalmente
npm install -g firebase-tools
```

## Instalación

1.  **Clona el repositorio:**

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd MyAppGlass
    ```

2.  **Instala todas las dependencias:**
    Este comando instalará las dependencias tanto para el proyecto principal (frontend) como para las Cloud Functions (backend).
    ```bash
    pnpm install -r
    ```
    _Si prefieres hacerlo manualmente:_
    ```bash
    # Instala dependencias del frontend
    pnpm install
    # Instala dependencias del backend
    cd functions
    pnpm install
    cd ..
    ```

## Configuración del Backend

Las Cloud Functions utilizan la API de **Resend** para el envío de correos electrónicos. Debes configurar tu clave de API como un secreto en Firebase.

1.  **Guarda el secreto en Firebase:**
    Ejecuta este comando y, cuando se te solicite, pega tu clave de API de Resend.

    ```bash
    firebase functions:secrets:set RESEND_API_KEY
    ```

2.  **Otorga acceso al secreto (solo la primera vez):**
    Asegúrate de que el servicio de Cloud Functions tenga permiso para acceder al secreto recién creado.
    ```bash
    firebase functions:secrets:access RESEND_API_KEY
    ```

### Verificar Secretos (Opcional)

Si necesitas confirmar que un secreto está guardado correctamente sin exponer su valor, usa:

```bash
# Muestra la información y versiones del secreto (no muestra la clave)
firebase functions:secrets:get RESEND_API_KEY
```

Si necesitas ver el valor real de la clave para una verificación visual (¡úsalo con cuidado!):

```bash
# Muestra el valor de la última versión del secreto
firebase functions:secrets:access RESEND_API_KEY
```

## Comandos Disponibles

### Desarrollo Local

Inicia el servidor de desarrollo de Vite en `http://localhost:5173`. La página se recargará automáticamente al detectar cambios.

```bash
pnpm dev
```

### Compilación para Producción

Genera una versión optimizada y minificada de la aplicación en la carpeta `dist`, lista para ser desplegada.

```bash
pnpm build
```

## Despliegue en Firebase

Antes de desplegar, asegúrate de haber iniciado sesión con tu cuenta de Firebase: `firebase login`.

### Desplegar solo el Frontend (Hosting)

Este comando compila la aplicación de React y sube el contenido de la carpeta `dist` a Firebase Hosting.

```bash
pnpm run deploy:hosting
```

### Desplegar solo el Backend (Functions)

Si solo has realizado cambios en las Cloud Functions.

```bash
pnpm run deploy:functions
```

### Despliegue Completo

Sube tanto el frontend como el backend al mismo tiempo.

```bash
firebase deploy
```

---

## Arquitectura Aplicada

Este proyecto está construido sobre una arquitectura moderna de frontend utilizando **React** con **Vite** para un desarrollo rápido y optimizado. La interfaz de usuario se gestiona con **Chakra UI v2**, un framework de componentes que facilita la creación de interfaces accesibles y responsivas.

Se ha implementado un sistema de diseño basado en tokens a través de `src/config/theme.js`, donde se definen y gestionan colores, tipografías y radios de borde personalizados. Esto promueve la consistencia visual y la adherencia a los principios de **Diseño Minimalista** y **Clean Architecture** en la capa de presentación.

Los componentes se organizan siguiendo el principio de **Separación de Intereses**, con componentes comunes (`src/components/common`) diseñados para la reutilización. La gestión de datos se centraliza en `src/data`, y las utilidades en `src/utils`, buscando mantener el código modular y fácil de mantener.

Se ha iniciado un proceso de refactorización para consolidar la paleta de colores y externalizar textos hardcodeados, mejorando la **consistencia del copywriting** y preparando la aplicación para una futura internacionalización.

---

## Scripts de Limpieza del Proyecto

Estos scripts eliminan las carpetas `node_modules`, `dist` y los archivos de bloqueo (`pnpm-lock.yaml`) para restaurar el proyecto a un estado limpio.

### Para Windows (PowerShell)

```powershell
# Elimina directorios
Remove-Item -Recurse -Force -ErrorAction SilentlyContinue node_modules, functions/node_modules, dist
# Elimina archivos de bloqueo
Remove-Item -Force -ErrorAction SilentlyContinue pnpm-lock.yaml, functions/pnpm-lock.yaml
```

### Para macOS / Linux

```bash
# Elimina directorios y archivos de bloqueo
rm -rf node_modules functions/node_modules dist pnpm-lock.yaml functions/pnpm-lock.yaml
```
