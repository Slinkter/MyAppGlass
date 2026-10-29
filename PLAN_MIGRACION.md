# Plan de Trabajo: Migración a Firebase Serverless, CRUD Dinámico y Dashboard Admin

Basado en el análisis de [GOL.md](file:///home/liam/github/MyAppGlass/GOL.md) y las reglas de negocio en [AGENTS.md](file:///home/liam/github/MyAppGlass/AGENTS.md).

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
- [ ] **2.1. Esquemas de Base de Datos (Firestore)**:
  - [ ] Colección `/services`:
    - `id`, `slug`, `title`, `shortDescription`, `fullDescription`, `features[]`, `coverImage`, `gallery[]`, `order`, `published`, `createdAt`, `updatedAt`.
  - [ ] Colección `/projects`:
    - `id`, `slug`, `title`, `client`, `location`, `serviceId`, `description`, `coverImage`, `gallery[]`, `completedAt`, `published`, `createdAt`, `updatedAt`.
  - [ ] Validación de esquemas con esquemas Zod (`zod`).
- [ ] **2.2. Firebase Storage**:
  - [ ] Estructura de carpetas: `/services/{serviceId}/cover.*` y `/services/{serviceId}/gallery/*`.
  - [ ] Estructura de carpetas: `/projects/{projectId}/cover.*` y `/projects/{projectId}/gallery/*`.
  - [ ] Utilidades de compresión/subida de imágenes (usando WebP / resizing en frontend antes de upload).
- [ ] **2.3. Capa de Servicios/Repositorios (`shared/api/firebase` o `features/*/api`)**:
  - [ ] `servicesRepository.ts` (getAll, getBySlug, create, update, delete).
  - [ ] `projectsRepository.ts` (getAll, getBySlug, create, update, delete).
  - [ ] Manejo seguro de errores con `@/shared/utils/logger.ts`.

---

### Fase 3: Dashboard de Administración (Backoffice)
- [ ] **3.1. Autenticación y Protección de Rutas**:
  - [ ] Módulo de login administrativo `/admin/login` con Firebase Auth.
  - [ ] Guard/HOC o Context de sesión para el layout `/admin/*`.
- [ ] **3.2. Módulo CRUD de Servicios (`/admin/services`)**:
  - [ ] Tabla/Lista de servicios con búsqueda y acciones (Editar, Eliminar, Publicar/Ocultar).
  - [ ] Formulario de creación/edición de servicio (campos de texto, especificaciones técnicas).
  - [ ] Gestor de imágenes: Subida de imagen principal + Álbum/Galería de fotos múltiple con preview y reordenamiento.
- [ ] **3.3. Módulo CRUD de Proyectos (`/admin/projects`)**:
  - [ ] Tabla/Lista de proyectos con filtrado por servicio asociado.
  - [ ] Formulario de creación/edición de proyectos y subida de álbum fotográfico.
  - [ ] Modal de confirmación para borrado seguro (eliminar documento + eliminar archivos de Storage asociados).

---

### Fase 4: Migración del Frontend Público (Consumo Dinámico / Fallback)
- [ ] **4.1. Catálogo de Servicios Público (`/servicios` y `/servicios/[slug]`)**:
  - [ ] Conectar `ServiceBentoGrid` y vistas de detalle al repositorio de Firestore.
  - [ ] Implementar estados de carga (Skeletons) y fallback de datos offline si aplica.
  - [ ] Galería interactiva con visor modal de fotos de alta resolución.
- [ ] **4.2. Portafolio de Proyectos Público (`/proyectos`)**:
  - [ ] Grid dinámico alimentado desde Firestore.
  - [ ] Filtrado reactivo por categoría/servicio.
- [ ] **4.3. Script de Semillado Inicial (Seeding)**:
  - [ ] Script para migrar los 12 servicios locales hardcodeados y sus fotos a Firestore y Storage automáticamente sin pérdida de contenido.

---

### Fase 5: QA, Pruebas y Despliegue
- [ ] **5.1. Reglas de Seguridad en Firebase**:
  - [ ] `firestore.rules`: Lectura pública (`allow read: if true`), escritura solo admin (`allow write: if request.auth != null`).
  - [ ] `storage.rules`: Lectura pública, subida y eliminación restringida a usuarios autenticados.
- [ ] **5.2. Verificación Estricta**:
  - [ ] Ejecución de `pnpm run typecheck`.
  - [ ] Ejecución de `pnpm run lint`.
  - [ ] Compilación exitosa con `pnpm run build`.
- [ ] **5.3. Documentación y Entrega**:
  - [ ] Actualizar README y documentación de arquitectura.
