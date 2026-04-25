# 🏛️ Documentación de Arquitectura y Stack - MyAppGlass

Este documento proporciona una visión general completa de la arquitectura técnica, dividida en Frontend y Backend, detallando las tecnologías, patrones de diseño y medidas de seguridad implementadas en el proyecto **Glass & Aluminum Company S.A.C.**

---

## 💻 Arquitectura Frontend

El frontend está construido para ser ultrarrápido, SEO-friendly y visualmente impactante, siguiendo el paradigma **Feature-Sliced Design (FSD)** para máxima escalabilidad.

### 🛠️ Stack Tecnológico
*   **Framework Core:** Next.js 16+ (App Router).
*   **Lenguaje:** TypeScript (Strict Mode).
*   **Estilos y UI:** Chakra UI v3 (Sistema de diseño "Aura"), Framer Motion (Animaciones 120Hz a 60fps), Lucide React (Iconos).
*   **Gestor de Paquetes:** pnpm.

### 📐 Estructura de Directorios (FSD)
El código dentro de `src/` está organizado por responsabilidades de negocio, no solo por tipo de archivo:

1.  **`src/app/` (Routing Layer):**
    *   Gestiona exclusivamente el enrutamiento de Next.js (`layout.tsx`, `page.tsx`).
    *   Contiene la configuración global de SEO (`metadata`) y proveedores de contexto (`Providers`).
2.  **`src/screens/` (Pages Layer):**
    *   Contiene la implementación visual de cada página (ej. `HomeView`, `ServiceDetailView`).
    *   Componen (ensamblan) múltiples *widgets* y *features*.
3.  **`src/widgets/` (Structural Layer):**
    *   Componentes de alto nivel, autónomos y complejos (ej. `Navbar`, `Footer`, `FloatingActions`).
4.  **`src/features/` (Business Layer):**
    *   Agrupa componentes, hooks, servicios y **datos estáticos** (`/data`) por dominio de negocio (`home`, `projects`, `services`, `blog`, `contacto`, `reclamation-book`).
5.  **`src/shared/` (Shared Layer):**
    *   Código puramente reutilizable: UI Kit (`AuraComponents`), configuración (`config`), llamadas a API genéricas, hooks (`useFilterableList`) y utilidades (`logger.ts`, `seo-utils.ts`).

### ⚡ Optimizaciones Clave
*   **Imágenes WebP:** Script personalizado `optimize-images.mjs` que convierte y comprime assets estáticos antes del build.
*   **Aceleración por Hardware:** Uso intensivo de `transform: translateZ(0)` en animaciones de Framer Motion.
*   **Skeleton Sync:** Carga progresiva de componentes asíncronos para evitar Cumulative Layout Shift (CLS).

---

## 🖧 Arquitectura Backend e Infraestructura

El proyecto se apoya enteramente en el ecosistema **Serverless de Firebase (Google Cloud)**, garantizando alta disponibilidad, seguridad y mantenimiento nulo de servidores físicos.

### 🛠️ Stack y Servicios de Firebase
*   **Firebase Hosting:** Sirve los archivos estáticos pre-renderizados por Next.js a través de un CDN global rápido.
*   **Firebase Cloud Functions (Node.js):** 
    *   Carpeta `/functions`.
    *   Procesa lógica de negocio pesada o sensible, como el envío de correos electrónicos desde el Formulario de Contacto o el procesamiento del Libro de Reclamaciones.
    *   **Seguridad CORS:** Filtros estrictos mediante Regex para aceptar peticiones *únicamente* desde `gyacompany.com` y sus subdominios.
*   **Firebase Firestore (NoSQL):**
    *   Base de datos documental en tiempo real.
    *   Utilizada para persistir legalmente las entradas del **Libro de Reclamaciones**.
    *   **Seguridad:** Reglas definidas en `firestore.rules` (por defecto deniega escrituras públicas no autenticadas, requiere validación desde las Cloud Functions).
*   **Firebase Storage:**
    *   Almacenamiento de blobs, imágenes de proyectos en alta resolución y archivos generados.
    *   **Seguridad:** Reglas en `storage.rules` que permiten lectura pública (`allow read: if true`) pero **bloquean estrictamente la escritura** desde el cliente (`allow write: if false`).

### 🛡️ Postura de Seguridad (Ciberseguridad)
1.  **Cero Secretos:** Todas las API keys críticas (Google Maps, tokens de Firebase Admin) se gestionan a través de variables de entorno `.env.production` inyectadas en tiempo de build, o mediante el *Secret Manager* de Google Cloud para las Functions. **Nunca** se suben archivos como `service-account.json`.
2.  **Cumplimiento Legal (GDPR/LPDP):** El frontend bloquea el envío de información personal (Contactos/Reclamos) a Firebase a menos que el usuario marque explícitamente el *checkbox* de **Aceptación de Políticas de Privacidad**.

---

## 🚀 Flujo de Despliegue (CI/CD)

El proyecto utiliza un pipeline simple basado en scripts de NPM (`package.json`):
1.  `pnpm run optimize`: Transforma imágenes a WebP.
2.  `pnpm run build`: Ejecuta el compilador de Next.js (Turbopack) para generar los archivos estáticos en `/dist` o `.next`.
3.  `pnpm run deploy:hosting`: Sube el bundle final a Firebase Hosting.
4.  `pnpm run deploy:functions`: Actualiza la lógica del backend en Google Cloud.

> *Documento generado por IA Architect para referencia del equipo de ingeniería.*
