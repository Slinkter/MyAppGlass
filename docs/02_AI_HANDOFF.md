# 🤖 AI Agent Handoff Document - MyAppGlass

Bienvenido, próximo Agente de IA. Este documento contiene el estado canónico del proyecto tras la estabilización de los 4 sistemas oficiales de ventanas y la optimización para LLMs locales. El simulador 3D interactivo y su catálogo JSON fueron eliminados (commit `2ca4f3e`, 2026-08-26); ver la regla 6. Léelo antes de sugerir o realizar cambios.

---

## 🏗️ Estado de la Arquitectura (FSD - Feature-Sliced Design)

El proyecto sigue estrictamente los principios de **Feature-Sliced Design** sobre Next.js 16 (App Router con `output: 'export'`):

### Estructura de Directorios:
* **Monorepo pnpm** (`pnpm-workspace.yaml`: `apps/*`, `packages/*`). Ejecutar todos los comandos desde la raíz.
* **`apps/web/src/app/`**: **Capa de Enrutamiento**. Rutas Next.js (`layout.tsx`, `page.tsx`). Wrappers delgados.
* **`apps/web/src/screens/`**: **Capa de Páginas**. Ensamblaje visual de páginas completas (PascalCase).
* **`apps/web/src/widgets/`**: **Capa de Bloques Estructurales**. Componentes globales (`Navbar` con `AuraNavbar`, `Footer`, `FloatingActions`, `AdminNav`).
* **`apps/web/src/features/`**: **Capa de Negocio**. Módulos reales: `admin`, `ai-simulator`, `auth`, `blog`, `contacto`, `home`, `presupuesto`, `products`, `projects`, `reclamation-book`, `services`. Cada feature encapsula sus componentes, hooks y datos en su subcarpeta `/data`.
* **`apps/web/src/shared/`**: **Capa de Fundamentos**. Utilidades (`logger.ts`), API Firebase (`api/firebase`), hooks, constantes y componentes UI Aura.
* **`packages/shared/`** (`@gya/shared`): `companyData`, `SITE_URL` y `CompanyInfo`. Fuente de `company-data.ts`, reexportada desde `apps/web/src/shared/config/company-data.ts`.
* **`apps/functions/`**: Microservicios serverless en Firebase Functions v2 (Node.js 22 - **CONGELADO**).

---

## 🏢 Reglas de Negocio Inmutables

1. **Razón Social:** `"GLASS & ALUMINUM COMPANY S.A.C."` (usar `companyData` de `@/shared/config/company-data`).
2. **Ortografía en Español:**
   - `"antirruido"` (con doble 'r', no 'antiruido').
   - `"vidrio y aluminio"` (en singular).
3. **Catálogo Oficial de Ventanas:**
   - **4 Sistemas Oficiales Únicos:** `Sistema Nova`, `Sistema Serie 25`, `Sistema Serie 35`, `Sistema Serie 62`.
   - Todos los sistemas son **independientes** del tipo de ventana y siempre están disponibles.
4. **Tipos de Ventana:** `Corrediza`, `Proyectante`, `Batiente`, `Luz Fija`.
5. **Tipos de Vidrio (3 únicos):** `Crudo`, `Laminado`, `Templado`.
6. **Simulador 3D (`VentanaConfigurador3DCard`)** — *especificación histórica / pendiente de re-implementación:*
   > Nota (2026-10-29): el componente, `components/configurador3d/*`, `ventanas-catalogo.json` y la dependencia `three` fueron eliminados en el commit `2ca4f3e` (2026-08-26). Hoy el único simulador es `/simulador-ai` (`apps/web/src/screens/SimuladorAI/SimuladorAIScreen.tsx`): superposición visual local de un producto sobre la foto subida y chat con respuestas predefinidas, sin IA generativa ni APIs externas.
   - Es un simulador visual de características técnicas (no un cotizador de precios unitarios).
   - Proporción estándar: **65% Visor 3D (Izquierda)** / **35% Panel de Configuración (Derecha)**.
   - Altura estándar desktop: **`460px`**.

---

## ⚡ Reglas de Ahorro de Tokens para LLMs

* **NO ejecutar suites de tests (`pnpm run test:run`)** salvo petición explícita del usuario para evitar consumo de tokens (regla de `AGENTS.md`). Los tests existen (21 archivos en `apps/web/tests/unit/`, Vitest) y se ejecutan en la CI (`.github/workflows/ci.yml`) o bajo petición.
* Validar siempre cambios con `pnpm run typecheck` y `pnpm run build`.

---

## 🔒 Estado Canónico del Backend Serverless (`apps/functions/`) - 2026-10-29

* **Estado:** **CONGELADO Y 100% OPERATIVO**. NO modificar `apps/functions/`, `firestore.rules` ni `storage.rules`.
* **Cloud Functions Desplegadas:** `submitReclamo`, `submitContacto`, `checkStatus` (todas en `nodejs22` en `us-central1`).
* **Secretos en Secret Manager:**
  - `RESEND_API_KEY`: Versión 3 (Habilitada y verificada contra el dominio `gyacompany.com`).
  - `ADMIN_EMAIL`: `acueva@gyacompany.com`.
  - `RECAPTCHA_SECRET_KEY`: Versión 2 (Habilitada).
* **Colecciones Firestore en Producción:**
  - `libro_de_reclamaciones/{GYA-REC-AAAA-XXXXXX}`: Política persistir primero + 2 años retención legal.
  - `contact_submissions/{GYA-CON-AAAA-XXXXXX}`: Política persistir primero.
  - `rate_limits`: Rate limits atómicos por función con TTL.
* **Calidad y Verificación:**
  - Suite unitaria: 141 tests con `node:test` (`pnpm run test:functions`), 100% pass.
  - Linter: ESLint con 0 errores y 0 warnings (`cd apps/functions && npm run lint`).
  - Colección Postman: `tests/postman/GYA_Company_API.postman_collection.json` verificada en producción vía Newman (23 aserciones en verde).

## 🚀 Estado Técnico y Despliegue

* **Build:** `pnpm run build` genera el export estático en `apps/web/out/` (último build de referencia: 55 páginas SSG).
* **Estado actual (2026-10-30):** migración a monorepo hecha; páginas públicas de servicios y proyectos leen de Firestore con fallback local; reglas de Firestore/Storage con escritura solo para administradores; CSP ampliado. Typecheck, lint y build pasan.
* **Pendiente:** probar admin y páginas públicas en navegador con emuladores (`firebase emulators:start --only auth,firestore,storage --project gya-app-4c8a9` y `NEXT_PUBLIC_USE_EMULATORS=true pnpm run dev`) y con Firestore apagado; desplegar; extraer esquemas Zod y ESLint a `packages/shared`; alinear pnpm de CI con el lockfile (ver `PLAN_MIGRACION.md`, Fase 7).
* **Hosting Live:** [https://gya-app-4c8a9.web.app](https://gya-app-4c8a9.web.app)
* **Despliegue Hosting:** `pnpm run deploy:hosting`

¡Éxito en el trabajo, colega! 🧠✨
