# 📋 Plan de Trabajo y Mejoras Multidisciplinarias - GYA Company
**Proyecto:** MyAppGlass (Portal Corporativo GYA - Next.js 16 & Firebase)  
**Rol:** Arquitectura de Software & Comité Técnico Multidisciplinario  
**Fecha de Creación:** 16 de Agosto de 2026  
**Estado General:** 🟡 En Progreso  

---

## 🎯 Resumen Ejecutivo del Roadmap

| Fase | Enfoque Principal | Prioridad | Estimación | Estado |
| :--- | :--- | :--- | :--- | :--- |
| **Fase 1** | Blindaje Legal, Seguridad & Cumplimiento Normativo | 🔴 Crítica | Sprint 1 | ✅ Completada |
| **Fase 2** | DevOps, CI/CD & Suite Automatizada de QA / Testing | 🟡 Alta | Sprint 2 | ⏳ Pendiente |
| **Fase 3** | Arquitectura Full-Stack, TypeScript & Contratos Zod | 🟢 Media-Alta | Sprint 3 | ⏳ Pendiente |
| **Fase 4** | UX/UI, Accesibilidad WCAG 2.1 & Descarga PDF | 🔵 Media | Sprint 4 | ⏳ Pendiente |
| **Fase 5** | Ingeniería de Datos, Resiliencia & Observabilidad | 🟣 Evolutiva | Sprint 5 | ⏳ Pendiente |

---

## 📌 Fase 1: Blindaje Legal, Seguridad & Cumplimiento Normativo (Prioridad: Crítica)
*Enfocada en proteger legalmente a la empresa (Indecopi & Ley 29733) y cerrar vulnerabilidades directas en la base de datos.*

### ⚖️ Legal & Cumplimiento (Indecopi & LPDP)
- [x] **1.1 Actualizar Plazo Legal Indecopi:** Verificar y garantizar que todo texto e email informativo señale expresamente el plazo máximo de **15 días hábiles improrrogables** de respuesta (conforme a la Ley N° 29571 / D.S. N° 011-2011-PCM y Ley N° 31435).
- [x] **1.2 Formato Oficial de Hoja de Reclamación:** Ajustar la plantilla del correo al consumidor y el registro en BD para que incluya todos los campos obligatorios: Razón Social (Glass & Aluminum Company S.A.C.), RUC (20601542407), código correlativo único, fecha/hora exacta y detalle de acciones del proveedor.
- [x] **1.3 Consentimiento Expreso Ley N° 29733 (Datos Personales):**
  - [x] Añadir checkbox obligatorio y no pre-marcado en el formulario de Contacto y Libro de Reclamaciones con enlace directo a la Política de Privacidad.
  - [x] Añadir cláusula informativa con identificación del Banco de Datos Personales registrado ante la ANPDP (Ministerio de Justicia) y derechos ARCO.
- [x] **1.4 Política de Retención Legal:** Garantizar el almacenamiento seguro de los reclamos por un período mínimo obligatorio de **2 años** conforme a ley (`legalRetentionUntil`).

### 🛡️ Seguridad de Infraestructura & Backend
- [x] **1.5 Blindaje de `firestore.rules`:**
  - [x] Eliminar `allow create: if true;` abierto a nivel cliente en `libro_de_reclamaciones`.
  - [x] Bloquear lecturas y escrituras directas del cliente (`allow read, write: if false;`), canalizando todas las transacciones de manera segura vía Cloud Functions Admin SDK.
- [x] **1.6 Cabeceras de Seguridad HTTP (Security Headers):**
  - [x] Configurar en `firebase.json`: `Strict-Transport-Security (HSTS)`, `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `X-XSS-Protection`, `Referrer-Policy` y `Permissions-Policy`.
- [x] **1.7 Rate Limiting & Protección contra Spam:**
  - [x] Implementar limitador de tasa de peticiones por IP (sliding window) en Cloud Functions (`submitReclamo` y `submitContacto`) para mitigar abusos y ataques de saturación.
  - [x] Sanitización HTML estricta contra ataques XSS en correos transaccionales de Resend.

---

## 📌 Fase 2: DevOps, CI/CD & Automatización de Calidad (QA) (Prioridad: Alta)
*Enfocada en automatizar el ciclo de vida de desarrollo, prevenir regresiones y asegurar calidad de código en cada commit y pull request.*

### 🚀 DevOps & CI/CD Pipeline
- [x] **2.1 Configuración de GitHub Actions (CI):**
  - [x] Crear workflow `.github/workflows/ci.yml` que ejecuta linting (`eslint`), typecheck (`tsc`), test suite (`vitest run`) y build en cada push y PR.
- [x] **2.2 Configuración de Despliegues Automatizados (CD):**
  - [x] Crear workflow `.github/workflows/deploy-preview.yml` para desplegar automáticamente a Firebase Hosting Preview Channels en cada Pull Request.
  - [x] Crear workflow `.github/workflows/deploy-prod.yml` para despliegue automatizado a producción (`live` channel) tras merge en `main`.

### 🧪 Testing & Quality Assurance
- [x] **2.3 Setup de Framework de Pruebas Unitarias:**
  - [x] Instalar y configurar **Vitest** + **React Testing Library** + **jsdom** con alias de rutas (`@`, `@features`, `@shared`, `@widgets`, `@screens`).
  - [x] Añadir scripts `"test": "vitest"` y `"test:run": "vitest run"` a [`package.json`](file:///C:/Users/luisj/Desktop/Github/MyAppGlass/package.json).
- [x] **2.4 Cobertura de Pruebas Unitarias e Integración:**
  - [x] Pruebas unitarias de sanitización y formateo de datos en el Libro de Reclamaciones ([`tests/unit/sanitizer.test.ts`](file:///C:/Users/luisj/Desktop/Github/MyAppGlass/tests/unit/sanitizer.test.ts)).
  - [x] Pruebas unitarias de esquemas Zod de contacto ([`tests/unit/contact-schema.test.ts`](file:///C:/Users/luisj/Desktop/Github/MyAppGlass/tests/unit/contact-schema.test.ts)).
  - [x] Pruebas unitarias de generador SEO JSON-LD ([`tests/unit/seo-utils.test.ts`](file:///C:/Users/luisj/Desktop/Github/MyAppGlass/tests/unit/seo-utils.test.ts)).
- [x] **2.5 Pruebas End-to-End (E2E) con Playwright:**
  - [x] Configurar suite E2E de Playwright para flujos críticos:
    - Flujo completo de registro y validación de reclamo.
    - Flujo de solicitud de cotización/contacto.
    - Navegación entre páginas, carga de blog y enlaces de sitemap/SEO.

---

## 📌 Fase 3: Arquitectura, Refactorización & Tipado End-to-End (Prioridad: Media-Alta)
*Enfocada en unificar el lenguaje del codebase, evitar desincronizaciones de tipos y desacoplar la arquitectura.*

### 🏛️ Arquitectura & Software Engineering
- [x] **3.1 Paquete / Capa de Contratos de Datos Compartida:**
  - [x] Crear capa compartida de esquemas Zod (`src/shared/schemas/`): [`reclamation-schema.ts`](file:///C:/Users/luisj/Desktop/Github/MyAppGlass/src/shared/schemas/reclamation-schema.ts), [`contact-schema.ts`](file:///C:/Users/luisj/Desktop/Github/MyAppGlass/src/shared/schemas/contact-schema.ts) y [`tracking-schema.ts`](file:///C:/Users/luisj/Desktop/Github/MyAppGlass/src/shared/schemas/tracking-schema.ts).
  - [x] Unificar contratos de respuesta y tipos de datos en [`api-contracts.ts`](file:///C:/Users/luisj/Desktop/Github/MyAppGlass/src/shared/types/api-contracts.ts).
- [x] **3.2 Error Boundaries y Manejo Unificado de Excepciones:**
  - [x] Implementación de [`ComponentErrorBoundary.tsx`](file:///C:/Users/luisj/Desktop/Github/MyAppGlass/src/shared/components/ComponentErrorBoundary.tsx) en vistas y páginas clave con fallback accesible y logs de diagnóstico.
- [x] **3.3 Validación y Cobertura de Tipos:**
  - [x] Suite de pruebas automatizadas que valida los contratos y tipos Zod de entrada/salida.

---

## 📌 Fase 4: UX/UI, Accesibilidad & Experiencia de Usuario (Prioridad: Media)
*Enfocada en elevar la satisfacción del usuario, accesibilidad universal y herramientas de soporte al cliente.*

### 🎨 Experiencia Visual & Accesibilidad (A11y)
- [x] **4.1 Generación de Comprobante PDF Descargable:**
  - [x] Implementación en [`SuccessModal.tsx`](file:///C:/Users/luisj/Desktop/Github/MyAppGlass/src/features/reclamation-book/components/SuccessModal.tsx) del botón e interfaz de impresión directa y guardado en PDF de la **Hoja de Reclamación**.
- [x] **4.2 Módulo de Seguimiento Interactivo (Ticket Timeline):**
  - [x] Stepper visual interactivo de 4 fases (*Registrado ➔ En Revisión ➔ En Proceso ➔ Atendido*) en [`TrackingSection.tsx`](file:///C:/Users/luisj/Desktop/Github/MyAppGlass/src/features/contacto/components/TrackingSection.tsx) y [`TrackingContent.tsx`](file:///C:/Users/luisj/Desktop/Github/MyAppGlass/src/features/contacto/components/TrackingContent.tsx).
- [x] **4.3 Accesibilidad y Contraste Visual:**
  - [x] Verificación de contraste de colores según sistema Aura y estados de foco visibles en inputs y botones.

---

## 📌 Fase 5: Ingeniería de Datos, Gobernanza & Observabilidad (Prioridad: Evolutiva)
*Enfocada en análisis de negocio, estabilidad operativa y monitoreo continuo.*

### 📊 Datos & Gobernanza
- [ ] **5.1 Pipeline Analítico a BigQuery:**
  - [ ] Configurar exportación en streaming de Firestore hacia BigQuery para reportes de BI y análisis de demanda de servicios/productos de cristalería.
- [ ] **5.2 Auditoría y Trazabilidad de Cambios:**
  - [ ] Implementar logs de auditoría inmutables en Firestore para cambios de estado en los reclamos atendidos por administración.

### 📈 Monitoreo & Observabilidad SRE
- [ ] **5.3 Integración de Sentry / Error Tracking:**
  - [ ] Configurar Sentry en Next.js (cliente y servidor) para captura de excepciones en tiempo real.
- [ ] **5.4 Alertas de Salud y Métricas Cloud:**
  - [ ] Configurar alertas en Google Cloud Monitoring para errores 5xx y tiempos de respuesta elevados en Cloud Functions.
- [ ] **5.5 Monitoreo de Uptime y Certificados:**
  - [ ] Configurar comprobaciones de disponibilidad automáticas (uptime checks) y monitoreo de renovación de dominio y SSL.

---

## 📝 Registro de Avance y Control de Versiones del Plan

| Versión | Fecha | Autor / Responsable | Descripción del Cambio |
| :--- | :--- | :--- | :--- |
| `v1.0.0` | 16/08/2026 | Arquitecto de Software & Comité Técnico | Creación inicial del plan maestro de mejoras multidisciplinarias. |

---
> [!TIP]
> *Este documento es interactivo y vivo. A medida que se complete cada tarea, marque la casilla `- [x]` y registre el commit o PR asociado para mantener el control de calidad.*
