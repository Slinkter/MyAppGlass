# Plan de Trabajo: Migración a Firebase Serverless, CRUD Dinámico y Dashboard Admin

Basado en el análisis de [GOL.md](GOL.md) y las reglas de negocio en [AGENTS.md](AGENTS.md).

---

## 📌 Diagnóstico y Visión del Proyecto
- **Objetivo**: Convertir la aplicación actual (con contenido hardcodeado) en un sistema dinámico respaldado por **Firebase (Firestore + Firebase Storage + Auth)** con un **Dashboard Administrativo** para gestionar Servicios y Proyectos (CRUD de cards, álbumes/galerías de fotos, subida de medios y fichas técnicas).
- **Arquitectura**: Feature-Sliced Design (FSD), principios **SOLID**, **DRY**, nomenclatura estricta (**PascalCase** para componentes/tipos, **camelCase** para funciones/instancias), TypeScript estricto.
- **Restricción Crítica**: Respetar `output: 'export'` (sitio estático en hosting) o diseñar la carga dinámica cliente/híbrida para el dashboard admin y las páginas públicas sin romper las reglas de Firebase Hosting.

---

## 📋 Checklist de Actividades por Fases

### Fase 1: Limpieza, Purga de Código y Saneamiento Arquitectural
- [x] **1.1. Auditoría de código obsoleto e imports huérfanos**:
  - [x] Consolidar los cambios pendientes en `git status` (archivos borrados/movidos en `features/`, `screens/`, `public/images/`).
  - [x] Validar y remover imports circulares o imports a rutas eliminadas.
  - [x] Ejecutar `pnpm run lint` y corregir cualquier advertencia de código muerto o reglas de React Hooks.
- [x] **1.2. Refactorización bajo FSD**:
  - [x] Normalizar la separación clara: `src/features/services`, `src/features/projects`, `src/features/admin`.
  - [x] Asegurar tipados estrictos en `types.ts` de cada feature sin tipos `any`.
  - [x] Validar consistencia con `companyData` y ortografía obligatoria (`"antirruido"`, `"vidrio y aluminio"`).

---

### Fase 2: Configuración del Modelo de Datos Firebase (Firestore & Storage)
- [x] **2.1. Esquemas de Base de Datos (Firestore)**:
  - [x] Colección `/services`:
    - `id`, `slug`, `title`, `shortDescription`, `fullDescription`, `features[]`, `coverImage`, `gallery[]`, `order`, `published`, `createdAt`, `updatedAt`.
  - [x] Colección `/projects`:
    - `id`, `slug`, `title`, `client`, `location`, `serviceId`, `description`, `coverImage`, `gallery[]`, `completedAt`, `published`, `createdAt`, `updatedAt`.
  - [x] Validación de esquemas con esquemas Zod (`zod`).
- [x] **2.2. Firebase Storage**:
  - [x] Estructura de carpetas: `/services/{serviceId}/cover.*` y `/services/{serviceId}/gallery/*`.
  - [x] Estructura de carpetas: `/projects/{projectId}/cover.*` y `/projects/{projectId}/gallery/*`.
  - [x] Utilidades de compresión/subida de imágenes y borrado seguro de carpetas de entidad.
- [x] **2.3. Capa de Servicios/Repositorios (`shared/api/firebase`)**:
  - [x] `servicesRepository.ts` (getAll, getBySlug, create, update, delete).
  - [x] `projectsRepository.ts` (getAll, getBySlug, create, update, delete).
  - [x] Manejo seguro de errores con `@/shared/utils/logger.ts`.

---

### Fase 3: Dashboard de Administración (Backoffice)
- [x] **3.1. Autenticación y Protección de Rutas**:
  - [x] Protección de sesión para el layout administrativo con `AdminRouteGuard`.
  - [x] Navegación unificada en `AdminNav.tsx` con enlaces a `/admin/servicios` y `/admin/proyectos`.
- [x] **3.2. Módulo CRUD de Servicios (`/admin/servicios`)**:
  - [x] Tabla/Lista de servicios con búsqueda y acciones (Editar, Eliminar, Publicar/Ocultar).
  - [x] Formulario de creación/edición de servicio con auto-slug y tags técnicos.
  - [x] Gestor de imágenes `ImageUploadZone` y álbum fotográfico `AlbumGalleryUploader` con miniaturas y reordenamiento.
- [x] **3.3. Módulo CRUD de Proyectos (`/admin/proyectos`)**:
  - [x] Tabla/Lista de proyectos con filtrado por servicio asociado y detalles de obra.
  - [x] Formulario de creación/edición de proyectos y subida de álbum fotográfico.
  - [x] Modal de confirmación para borrado seguro.

---

### Fase 4: Migración del Frontend Público (Consumo Dinámico / Fallback)
- [x] **4.1. Catálogo de Servicios Público (`/servicios` y `/servicios/ver?slug=`)**:
  - [x] Conectar `ServiceBentoGrid` y vistas de detalle al repositorio de Firestore.
  - [x] Implementar estados de carga (Skeletons) y fallback de datos locales (hooks `useServices`/`useService` con `useAsyncResource`).
  - [x] Galería interactiva con visor modal: `ServicePageLayout` usa `Gallery` con `Gallery.Viewer` y `Gallery.Thumbnails` sobre `gallery[]` de Firestore (o el álbum local).
  - [x] Primer render con datos locales (`useAsyncResource`): el HTML exportado trae el contenido real para SEO y Firestore lo reemplaza en el cliente.
  - Nota: la ruta de detalle es cliente (`/servicios/ver?slug=`), sin SEO propio por página.
- [x] **4.2. Portafolio de Proyectos Público (`/proyectos` y `/proyectos/ver?id=`)**:
  - [x] Grid dinámico alimentado desde Firestore (`useProjects`/`useProject` con fallback local).
  - [x] Filtrado reactivo por categoría/servicio.
  - Nota: la ruta de detalle es cliente (`/proyectos/ver?id=`), sin SEO propio por página.
- [x] **4.3. Script de Semillado Inicial (Seeding)**:
  - [x] Script para migrar los 12 servicios locales hardcodeados y proyectos a Firestore de forma segura e idempotente (`seedData.ts`).

---

### Fase 5: QA, Pruebas y Despliegue
- [x] **5.1. Reglas de Seguridad en Firebase** (más estrictas que el plan original):
  - [x] `firestore.rules`: lectura pública y **escritura solo para administradores** (no basta con `request.auth != null`).
  - [x] `storage.rules`: lectura pública; subida y eliminación restringidas a administradores.
  - [x] Prueba de reglas con emuladores: `apps/web/tests/rules/rules-smoke.sh`.
- [x] **5.2. Verificación Estricta**:
  - [x] Ejecución de `pnpm run typecheck` (pasa).
  - [x] Ejecución de `pnpm run lint` (pasa).
  - [x] Compilación exitosa con `pnpm run build` (pasa).
- [x] **5.3. Documentación y Entrega**:
  - [x] Actualizar README, AGENTS.md, `docs/01_ARCHITECTURE.md`, `docs/02_AI_HANDOFF.md` y changelog al monorepo.

---

### Fase 6: Reestructuración en Monorepo (pnpm workspace) — HECHA
- [x] **6.1. Estructura**: `apps/web` (`@gya/web`, Next.js con export estático a `apps/web/out`), `apps/functions` (`@gya/functions`, Firebase Functions v2, Node 22) y `packages/shared` (`@gya/shared`: `companyData`, `SITE_URL`, `CompanyInfo`). Commit `522b52a`.
- [x] **6.2. Configuración**: `pnpm-workspace.yaml` con `apps/*` y `packages/*`; scripts raíz que delegan con `pnpm --filter` (`dev`, `build`, `lint`, `typecheck`, `test`, `test:run`, `test:functions`, `start`, `clean`, `deploy:hosting`, `deploy:functions`).
- [x] **6.3. Firebase en la raíz**: `firebase.json` con `hosting.public = apps/web/out` y `functions.source = apps/functions`; `firestore.rules` y `storage.rules` siguen en la raíz.
- [x] **6.4. Unificación de datos**: `SITE_URL` único, dirección única ("Av. Los Fresnos 1250 - La Molina"), RUC único `20606432870`, contacto (`salesEmail`, `whatsappDisplay`) en `companyData`.

---

### Fase 7: Pendientes Reales (siguiente iteración)
- [x] **7.1. Pruebas en navegador con emuladores**: Playwright (Chromium headless) contra el export estático servido con cleanUrls y los emuladores: 14/14 OK (guard sin sesión, login admin, tabla, borrar desde la UI, público con datos de Firestore, ocultos no visibles, slug nuevo en `/servicios/ver`, detalle con galería, `/proyectos`, subida admin a Storage).
- [x] **7.2. Pruebas con Firestore apagado**: con los emuladores detenidos, `/servicios`, `/servicios/ventana` y `/proyectos` conservan el contenido leído en build. Las lecturas usan `getDocsFromServer`/`getDocFromServer` para que la caché vacía no pise esos datos.
- [ ] **7.3. Despliegue** (BLOQUEADO: pendiente de autorización del usuario): datos e imágenes **ya migrados** a producción (10 servicios, 14 proyectos, 137 imágenes en Storage con `scripts/migrate-to-firebase.mjs`). Falta (requiere permiso del usuario): `firebase deploy --only firestore:rules,storage` (producción aún no tiene reglas de `/services` y `/projects`), el claim `role=admin` para el usuario admin en Storage, y desplegar Hosting.
- [x] **7.4. Esquemas compartidos**: mover los esquemas Zod (servicios, proyectos) a `packages/shared`, extraídos a `packages/shared/src/schemas` (con reexports en web).
- [x] **7.5. ESLint compartido**: extraída a `packages/eslint-config` (`@gya/eslint-config`; `apps/functions` sigue congelado con config propia) (hoy `apps/web` y `apps/functions` tienen configuración propia).
- [x] **7.6. Alinear pnpm en CI**: `package.json` fija `packageManager: pnpm@12.5.1`, los workflows usan `pnpm/action-setup@v4` sin `version` (toma el campo) y `pnpm install --frozen-lockfile` pasa en local. Falta confirmar la ejecución real en GitHub Actions.
- [x] **7.7. Galería con visor modal** de servicios (ver 4.1).

- [x] **7.8. Firebase como única fuente**: borrados los datos locales de servicios y proyectos y sus imágenes (`public/images` 74 MB → 7,8 MB; `src/assets` 139 MB → 19 MB). Las páginas leen Firestore en build (SEO, `publicRest.ts`) y en cliente (cambios del admin).