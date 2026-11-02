# 🤖 AI Agent Handoff Document - MyAppGlass

Bienvenido, próximo Agente de IA. Este documento contiene el estado canónico del proyecto tras la estabilización del catálogo y del backend. Léelo antes de sugerir o realizar cambios.

---

## 📌 Dónde está cada cosa

* **Reglas de negocio, comandos y regla de ahorro de tokens/validación:** `AGENTS.md` (raíz). Léelo primero; no se duplican aquí.
* **Estructura del monorepo, FSD y acceso a datos:** `docs/01_ARCHITECTURE.md`.
* **Historial de cambios:** `docs/05_CHANGELOG.md`.
* **Rutas eliminadas:** las rutas de listado `/servicios` y `/proyectos` fueron eliminadas (commit `752a5fe`). Quedan `/servicios/[serviceSlug]`, `/servicios/ver`, `/proyectos/[projectId]` y `/proyectos/ver`.
* **Simulador:** el simulador 3D (`VentanaConfigurador3DCard`, `ventanas-catalogo.json`, `three`) fue eliminado en `2ca4f3e`; hoy el único simulador es `/simulador-ai`.

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

* **Build:** `pnpm run build` genera el export estático en `apps/web/out/` (referencia verificada 2026-11-02: 58 páginas SSG).
* **Estado actual (2026-10-30 - Actualización Handoff):**
  - **Reglas de seguridad desplegadas en producción**: `firestore.rules` y `storage.rules` ya fueron aplicadas exitosamente (`firebase deploy --only firestore:rules,storage --project gya-app-4c8a9`).
  - **Unificación de CSS en Chakra UI v3**: Eliminada la librería `framer-motion` (ahorro ~35 KB en bundle), reemplazada por animaciones y transiciones nativas de Chakra. Eliminados bloques manuales de `@emotion/react` en `Providers.tsx`.
  - **Tokens semánticos oficiales en `theme/index.ts`**: Registrados formalmente `brand.primary`, `bg.surface`, `border.subtle` y `status.dangerBorder`.
  - **Design System**: showcase en `/design-system` (`apps/web/src/screens/DesignSystem/`), con variantes de botón aura/outline/ghost/whatsapp/brand. La revisión visual en navegador sigue pendiente (ver `DESIGN-SYSTEM-PLAN.md`).
  - **Nota de Coordinación**: Otro agente de IA está trabajando en paralelo en auditoría/remediación de vulnerabilidades y backend congelado; respetar áreas sin generar conflictos en archivos bloqueados.
* **Pendiente:** desplegar Hosting con los últimos cambios solo cuando el usuario lo pida (`pnpm run build && pnpm run deploy:hosting`).
* **Hosting Live:** [https://gya-app-4c8a9.web.app](https://gya-app-4c8a9.web.app)
* **Despliegue Hosting:** `pnpm run deploy:hosting`

¡Éxito en el trabajo, colega! 🧠✨
