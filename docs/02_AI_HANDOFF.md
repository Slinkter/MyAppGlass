# 🤖 AI Agent Handoff Document - MyAppGlass

Bienvenido, próximo Agente de IA. Este documento contiene el estado canónico del proyecto tras la estabilización del catálogo y del backend. Léelo antes de sugerir o realizar cambios.

---

## 📌 Dónde está cada cosa

* **Reglas de negocio, comandos y regla de ahorro de tokens/validación:** `AGENTS.md` (raíz). Léelo primero; no se duplican aquí.
* **Estructura del monorepo, FSD y acceso a datos:** `docs/01_ARCHITECTURE.md`.
* **Historial de cambios:** `docs/05_CHANGELOG.md`.
* **Rutas eliminadas:** las rutas de listado `/servicios` y `/proyectos` fueron eliminadas (commit `752a5fe`). Quedan `/servicios/[serviceSlug]`, `/servicios/ver`, `/proyectos/[projectId]` y `/proyectos/ver`.
* **Simulador:** el simulador 3D (`VentanaConfigurador3DCard`, `ventanas-catalogo.json`, `three`) fue eliminado en `2ca4f3e`; hoy el único simulador es `/simulador-ai`.
* **Contrato de la API frontend ↔ backend:** `docs/api/openapi.json` (generado) y `docs/api/README.md` (cómo consumirlo y cambiarlo). El backend manda; el frontend se adapta.
* **Datos vigentes de la empresa:** dirección **Av. Los Fresnos 1250 - La Molina**, WhatsApp **974 278 303**, correo **acueva@gyacompany.com**, RUC 20606432870 (fuente: `companyData` en `packages/shared/src/company-data.ts`). La Ficha RUC de SUNAT (2022) está desactualizada: no usarla.
* **Raíz del repo:** solo `AGENTS.md`, `README.md` y archivos que las herramientas leen desde ahí (`firebase.json`, `firestore.rules`, `storage.rules`, `.firebaserc`, `.mcp.json`, configs). Documentación y planes van en `docs/` (regla en `AGENTS.md` sección 6).

---

## 🆕 Cambios 2026-11-09

* **Sistema de diseño único (plan 25):** `apps/web/DESIGN.md` y `apps/web/PRODUCT.md` son la fuente de verdad; los documentos viejos de diseño se eliminaron. Migración en 8 fases, mergeada a `main` (`1f6b2902`) y **desplegada en hosting** (https://gya-app-4c8a9.web.app). Detalle y pendientes en `docs/25_PLAN_MIGRACION_DISENO.md`. `functions` no se desplegó.
* **Orden de lectura para agentes:** `claude.md` → `AGENTS.md` → `apps/web/PRODUCT.md` → `apps/web/DESIGN.md` → `docs/gya/catalogo/`. Regla: el proveedor pesa más que los datos locales; no inventar datos.
* **Página principal:** hero, proyectos, servicios, beneficios, clientes y ubicación (la sección para constructoras se retiró por decisión del dueño). Garantía 3 meses; horario lunes a sábado 8:00 a 18:00.

* **Navbar móvil v2 desplegada:** `AuraNavbar` usa `MobileNavbarV2`; barra siempre visible, hoja de menú en tres zonas, acordeón de servicios y pie sticky. Eliminados `MobileNav.tsx` y `useScrollDirection.ts`. Detalle en `docs/24_PLAN_NAVBAR_MOVIL.md`.
* **Purga del monorepo:** raíz sin `.next/` ni `.tsbuildinfo`; material del diplomado en `docs/_material/diplomado/`; tests de reglas en `tests/rules/`; código muerto eliminado. Detalle en `docs/05_CHANGELOG.md` y catálogo en `scripts/README.md`.
* **Deploy hosting (2026-11-09):** `pnpm run deploy:hosting` desde `main` (`cc80e8cb`). `typecheck`, `lint` y `build` en verde (66 rutas).
* **⚠️ Dev y build:** no ejecutar `pnpm run build`/`deploy:hosting` con `pnpm run dev` activo. Comparten `apps/web/.next` y provocan hydration mismatch de Chakra; solución en `docs/06_DOCS_DEVELOPMENT.md`.

## 🆕 Cambios 2026-11-03

* **Commit `a91a9ab`** (merge de `feat(perf)`): optimización de rutas SSG, mapa a 120 fps e inventario/listados con complejidad O(1) (`apps/web/src/shared/utils/algorithm-utils.ts`).
* **Planes cumplidos (borrados el 2026-11-08, recuperables con `git show 1537ee1:docs/<archivo>`):** 15 (auditoría cruzada), 16 (peso del repo, ≈ -23 MB de imágenes) y 17 (complejidad algorítmica; sus 5 filas pendientes están en `docs/PENDIENTES.md`).
* **Trabajo abierto:** `docs/PENDIENTES.md` es la única lista viva. Planes en curso: `docs/20_PLAN_TRABAJO_ANALISIS_FASES.md` (calidad y deuda técnica) y `docs/21_PLAN_FLUJO_PRESUPUESTO.md` (flujo de presupuesto, rama `feat/presupuesto-flujo`).
  - **Auth:** el rol admin sale solo de `users/{uid}.role`. Ya no se asigna por correo desde el cliente. Registro de cliente valida DNI (8) o RUC (11).
  - **Tienda:** `/tienda` y `/tienda/checkout`. El checkout envía el pedido por WhatsApp; **no** se guarda en Firestore (decisión tomada).
  - **Presupuesto:** precios en `features/presupuesto/config/pricing.ts`, correlativo `GYA-AAAA-XXXX` transaccional (`contadores/presupuesto-AAAA`) y persistencia en `presupuestos_solicitados`.
  - **Landings:** `/vidrieria/[distrito]` para Surco, San Borja y Miraflores.
  - **Pruebas:** E2E Playwright (13/13 contra el export estático); tests unitarios 23/23; reglas de Firestore 16/16 con el emulador (`tests/rules/firestore.rules.test.mjs`).
  - **GCP:** configuraciones de alertas, uptime y BigQuery en `gcp/`. Son archivos válidos (`gcp/scripts/validate-configs.mjs`), pero **no verificado** si están aplicadas en el proyecto.
  - **⚠️ Reglas de Firestore:** los cambios de `firestore.rules` de esta rama **no están desplegados**. `presupuestos_solicitados` y `contadores` existen solo en el repo.
  - **Pendiente:** `isAdmin()` en `firestore.rules` da admin a correos `@gyacompany.com` verificados (decisión abierta). Sentry (F7.4, F7.5) y auditoría de reclamos (F7.9) dependen de DSN y de autorizar `apps/functions`. F6 (AR) espera los modelos `.glb`/`.usdz`. F8.4 (Google Maps/NAP) y F9.7 (prueba en navegador) son del usuario. Rotar `RESEND_API_KEY` y `RECAPTCHA_SECRET_KEY` (F1.9).
  - **Deploy hosting (2026-11-03):** hecho manualmente con `pnpm run deploy:hosting` desde `main` (`406fd4b`). Rutas verificadas en `https://gya-app-4c8a9.web.app`.
  - **CI:** corregido en `09b5323` (typecheck después del build). Pasa en `main`.
  - **Deploy automático:** `Deploy Production` falla hasta que exista el secreto `FIREBASE_SERVICE_ACCOUNT_GYA_APP_4C8A9` en GitHub Actions. Ver `docs/PENDIENTES.md`, sección "Acciones externas del usuario".
  - **Functions:** no desplegadas. Solo con petición explícita.

## 🆕 Actualización 2026-11-02 (rama `feat/ux-ui-2026-11-02`, desplegada)

* **Desplegado hoy:** `functions` (3 funciones) y `hosting`. Detalle y commits en `docs/05_CHANGELOG.md`.
* **Backend de reclamos:** además de lo descrito abajo, ahora guarda `nombrePadreMadre`, `aceptaTerminos` y `autorizaEmail` (los consentimientos son obligatorios). Correos rediseñados con layout compartido (`apps/functions/src/templates/emailLayout.js`) y logo por URL pública.
* **Pruebas del backend:** 147 (`pnpm run test:functions`), incluido `openapi.test.js`, que falla si `docs/api/openapi.json` está desactualizado (ejecutar `pnpm run contract:generate`).
* **Fecha para filtrar en Firestore:** usar `createdAt` (timestamp del servidor). Los documentos anteriores al 2026-10-29 tienen como ID el código de Resend; el último registro previo es del 2026-08-17.
* **⚠️ Despliegue de functions:** `apps/functions/.env` (local, ignorado por git) define los 3 secretos que las funciones ya leen de Secret Manager y hace fallar el despliegue ("Secret environment variable overlaps non secret environment variable"). Apartar el archivo durante `firebase deploy` y restaurarlo (o renombrarlo a `.env.local`, que solo usan los emuladores).
* **Pruebas locales de correos:** con emuladores (`firebase emulators:start --only firestore`) se puede ejecutar `sendEmailLogic` real con Resend simulado; un envío real a Resend exige autorización explícita del usuario y **debe apuntar al Firestore de producción** (si se usa Resend real con emulador local, llegan los correos pero no queda registro en producción).
* **Prueba E2E en producción verificada (2026-11-02):** registrada la queja `GYA-REC-2026-LK3SG3` en `libro_de_reclamaciones` de producción con ambos correos `SENT` y verificada en `checkStatus` (`200 OK`). El protocolo paso a paso para replicar en otros formularios está en `docs/api/README.md`.
* **Reglas `firestore.rules` optimizadas y desplegadas (2026-11-02):** `isAdmin()` evalúa primero claims/correo JWT por cortocircuito antes de `exists`/`get`, y habilita `read` + `update` de estado para admin en `libro_de_reclamaciones` y `contact_submissions`.
* **Pendiente:** aplicar el mismo protocolo de actualización a los formularios restantes (`/contacto`, `/presupuesto`), rotar `RESEND_API_KEY` y `RECAPTCHA_SECRET_KEY` (quedaron expuestas en una conversación), y evaluar con el responsable la limpieza de documentos históricos (`docs/_material/diplomado/`, planes antiguos). **Nota importante:** `scripts/generate-openapi.cjs` NO debe eliminarse porque es requerido por `pnpm run contract:generate`.

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
  - Suite unitaria: 147 tests con `node:test` (`pnpm run test:functions`), 100% pass (actualizado el 2026-11-02).
  - Linter: ESLint con 0 errores y 0 warnings (`cd apps/functions && npm run lint`).
  - Colección Postman: `apps/web/tests/postman/GYA_Company_API.postman_collection.json` verificada en producción vía Newman (23 aserciones en verde).

## 🚀 Estado Técnico y Despliegue

* **Build:** `pnpm run build` genera el export estático en `apps/web/out/` (referencia verificada 2026-11-02: **60 rutas estáticas generadas / 56 archivos HTML** en `apps/web/out/`).
* **Estado actual (2026-10-30 - Actualización Handoff):**
  - **Reglas de seguridad desplegadas en producción**: `firestore.rules` y `storage.rules` ya fueron aplicadas exitosamente (`firebase deploy --only firestore:rules,storage --project gya-app-4c8a9`).
  - **Unificación de CSS en Chakra UI v3**: Eliminada la librería `framer-motion` (ahorro ~35 KB en bundle), reemplazada por animaciones y transiciones nativas de Chakra. Eliminados bloques manuales de `@emotion/react` en `Providers.tsx`.
  - **Tokens semánticos oficiales en `theme/index.ts`**: Registrados formalmente `brand.primary`, `bg.surface`, `border.subtle` y `status.dangerBorder`.
  - **Design System**: única fuente de verdad en `apps/web/DESIGN.md` (migración en `docs/25_PLAN_MIGRACION_DISENO.md`). Showcase en `/design-system` (`apps/web/src/screens/DesignSystem/`), con variantes de botón primary, outline, ghost y whatsapp.
  - **Nota de Coordinación**: Otro agente de IA está trabajando en paralelo en auditoría/remediación de vulnerabilidades y backend congelado; respetar áreas sin generar conflictos en archivos bloqueados.
* **Hosting:** desplegado el 2026-11-02 con los últimos cambios. Desplegar de nuevo solo cuando el usuario lo pida (`pnpm run build && pnpm run deploy:hosting`).
* **Hosting Live:** [https://gya-app-4c8a9.web.app](https://gya-app-4c8a9.web.app)
* **Despliegue Hosting:** `pnpm run deploy:hosting`

¡Éxito en el trabajo, colega! 🧠✨
