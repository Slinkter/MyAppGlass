# 20 — Plan de trabajo por fases (derivado del análisis del repo)

> Fecha: 2026-11-08. Origen: análisis de solo lectura del repo. Estado inicial: nada implementado.
> Reglas: validar cada fase con `pnpm run typecheck && pnpm run build`; no ejecutar `test:run` salvo pedido; `apps/functions/`, `firestore.rules` y `firebase.json` están congelados (cada actividad que los toque requiere confirmación explícita).

## Decisión sobre CI y despliegue

El despliegue vigente es **manual**: `pnpm run deploy:hosting`. Los secretos de Firebase **no están configurados en GitHub Actions**, por lo que `deploy-prod.yml` y `deploy-preview.yml` fallan y duplican el despliegue manual. Por tanto:

- El **CI (`ci.yml`) se mantiene** como verificación de calidad (no necesita credenciales de Firebase).
- Los workflows de deploy se **desactivan** (pasan a `workflow_dispatch` manual) hasta que se configuren `FIREBASE_SERVICE_ACCOUNT_GYA_APP_4C8A9` y los secretos `NEXT_PUBLIC_*` necesarios.
- Se descarta la idea de encadenar deploy tras CI: no aplica mientras el deploy sea manual.

---

## Fase 0 — Decisión y limpieza de workflows (rápida, sin riesgo) [COMPLETADA]

| # | Actividad | Archivos | Criterio de hecho | Estado |
|---|---|---|---|---|
| 0.1 | Cambiar el trigger de `deploy-prod.yml` y `deploy-preview.yml` a `workflow_dispatch` (dejar comentario de cómo reactivar) | `.github/workflows/deploy-*.yml` | Un push a main ya no dispara deploys fallidos | Concluido |
| 0.2 | Documentar en `docs/` el flujo oficial: `typecheck && build` → commit → `deploy:hosting` | `docs/06_DOCS_DEVELOPMENT.md` | Flujo único descrito | Concluido |
| 0.3 | Registrar el requisito para reactivar CI/CD (secretos en GitHub) | este documento | Lista de secretos anotada | Concluido |

## Fase 1 — Seguridad y dependencias (prioridad alta)

| # | Actividad | Notas |
|---|---|---|
| 1.1 | Rotar `RESEND_API_KEY` y `RECAPTCHA_SECRET_KEY` | Acción manual del dueño en Secret Manager; actualizar `docs/18` |
| 1.2 | Reemplazar `xlsx ^0.18.5` (usos: `shared/utils/excel-export.ts`, `AdminHubScreen`) por alternativa mantenida (p. ej. `exceljs`) | Probar exportación en admin |
| 1.3 | Subir el umbral de `pnpm audit` en `ci.yml` de `critical` a `high` tras 1.2 | |
| 1.4 | Endurecer `contadores` y `presupuestos_solicitados` (App Check o correlativo generado en Function) | **Toca `firestore.rules` y `apps/functions/`: requiere confirmación explícita** |
| 1.5 | Alinear versión de `firebase` JS entre raíz (`^13.2`) y web (`^12.19`) | Verificar con `pnpm why firebase` y build |

## Fase 2 — CI y pruebas

| # | Actividad | Notas |
|---|---|---|
| 2.1 | Añadir `pnpm run test:functions` a `ci.yml` | No requiere credenciales |
| 2.2 | Añadir tests de reglas (`tests/rules`) con emulador de Firestore | Requiere Java y firebase-tools en el runner |
| 2.3 | Job separado de Playwright (nightly o manual) | Opcional |
| 2.4 | Añadir test de `storage.rules` | Hoy no existe |

## Fase 3 — Cumplimiento de reglas de negocio y UI (prioridad media)

| # | Actividad | Archivos representativos |
|---|---|---|
| 3.1 | `100vh` → `dvh` (8 sitios) | `AuraContainer.tsx:24`, `AdminLayout.tsx:59`, `ProjectSkeletons.tsx:23`, `ProjectDetailView.tsx:107`, 4 modales en `screens/Admin/*` |
| 3.2 | `fontSize: "10px"` → token (`xs`) | `ProjectDetailItem.tsx:38` |
| 3.3 | Auditar `colorPalette`: separar botones de otros componentes y migrar botones a `variant` del tema | `ProjectAdminTable`, `ServiceAdminTable`, `AlbumGalleryUploader`, `ReclamationForm`, `CompanyPoliciesView`, `BankAccountsView`, `BlogPostView`, `QuotePrompt` |
| 3.4 | Corregir ortografía "antiruido" → "antirruido" en el texto del test y en el contenido; el slug del blog requiere redirect | `blog-posts.ts:194`, `contact-schema.test.ts:9`. **El redirect toca `firebase.json`: confirmar** |

## Fase 4 — SEO e indexación

| # | Actividad | Notas |
|---|---|---|
| 4.1 | Añadir `robots: { index: false }` a `/tienda*`, `/mi-cuenta`, `/design-system-ubicacion` (y revisar `robots.ts`) | Vía `buildPageMetadata` en `seo-utils.ts` |
| 4.2 | Verificar `generateStaticParams` de `/servicios/[serviceSlug]` y `/proyectos/[projectId]` | Confirmar que el build prerenderiza los slugs de Firestore |
| 4.3 | Revisar exposición pública de `productos` (stock/costo) | Decisión de negocio |

## Fase 5 — Documentación [COMPLETADA]

| # | Actividad | Estado |
|---|---|---|
| 5.1 | Corregir el README: la tienda (`/tienda`, `features/tienda`) sí existe | Concluido |
| 5.2 | Documentar `screens/` y `components/` en AGENTS.md y `docs/01_ARCHITECTURE.md` | Concluido |
| 5.3 | Indexar docs 14–20 y `diplomado/` en `docs/README.md` | Concluido |
| 5.4 | Registrar el cierre de cada fase en `docs/05_CHANGELOG.md` | Concluido |

## Fase 6 — Refactor y deuda técnica (baja prioridad)

| # | Actividad |
|---|---|
| 6.1 | Consolidar galerías (`common/Gallery.tsx` y `common/gallery/GalleryViewer.tsx`) |
| 6.2 | Extraer un modal admin base (4 modales repiten estructura) |
| 6.3 | Partir `seo-utils.ts` (450 líneas) y `FloatingPanel.tsx` (457) |
| 6.4 | Higiene de raíz: mover/eliminar `firestore-debug.log`, decidir el destino de `claude.md` (duplica AGENTS.md); confirmar `.gitignore` del `.xlsx` de `apps/web/` |
| 6.5 | Evaluar migrar `apps/functions` a TypeScript (solo con pedido explícito) |

---

## Orden recomendado

`Fase 0 → 1 (1.1, 1.2, 1.3, 1.5) → 2 → 3 → 4 → 5 → 6`. Las actividades 1.4 y 3.4 (redirect) se agendan aparte porque tocan archivos congelados.

## Verificación por fase

1. `pnpm run typecheck && pnpm run build` al cerrar cada fase.
2. `pnpm run lint` en fases con cambios de UI (3 y 6).
3. Commit con convención `tipo(modulo): descripción` y despliegue manual con `pnpm run deploy:hosting` cuando el usuario lo pida.
