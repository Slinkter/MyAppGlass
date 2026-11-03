# 18 · Reporte de planes pendientes (para validación)

> Reporte de solo lectura generado a partir de los últimos commits (hasta `a91a9ab`, 2026-11-03) y de los `.md` del proyecto. Los `.agents/` y `.gemini/` se excluyeron por ser skills, no planes. Pendiente de validación por Sonnet.

## 1. Commits recientes

- **2026-11-03:** optimización O(1) (`63532ae`, mergeado en `a91a9ab`): `algorithm-utils.ts` + test, 12 archivos. Plan 16 de peso del repo cerrado (`1de0226`, `d348851`, `268ca0d`, `c23c5ad`, unos -23 MB de imágenes).
- **2026-11-02:** SEO, GA4 y sitelinks (`ed906ba`, `3d47f61`, `06a1c7f`, `c81483c`, `9d6e0b5`); docs (`8cda55e`, `12ab2fa`); `.gitignore` (`089a45a`); `gya-cms` a Firestore (`18b5a5d`).

## 2. Estado de planes

| Doc | Estado | Pendiente |
|---|---|---|
| 14 SEO y métricas | Completo | — |
| 15 Auditoría | Completo | — |
| 16 Peso del repo | Completo | — |
| 17 Complejidad algorítmica | Marcado completo; ejecución parcial | Sin constancia de test/typecheck/lint/build. 25 de 37 archivos de la matriz sin tocar y sin registro de "descartado". |
| PLAN-DISENO | Completo | Prueba manual en navegador (protos E/F; móvil, tablet, escritorio). Hallazgos bajos: `bg`/`_hover` manual en `TimelineYearChips`, `TimelineProjectItem`, `CardVariantsShowcase`; falta `minW={0}` en `SheetHandle` y `SheetStoreCard`. |
| DESIGN-SYSTEM-PLAN | Etapa 4 parcial | Migrar `colorPalette` a variants; `variant="whatsapp"` en vez de WhatsApp armado a mano; retirar alias heredados; dark mode del formulario de reclamos; verificar `<Toaster/>` y `status.*`. |
| 04 Plan de trabajo | Parcial | 2.5 E2E con Playwright (no hay Playwright en `package.json`). Fase 5: export a BigQuery, auditoría inmutable de reclamos, Sentry, alertas en Cloud Monitoring, uptime checks. |
| 09 SEO contenidos | Casi completo | 5.3 landings por distrito (evolutivo). Acciones externas Google Maps y NAP sin checkbox propio. |
| 13 Scrum por fases | Parcial | S1: 1.3, 1.5, 1.6, 1.8, 1.10, 1.11. S2: 2.2, 2.7. S3: carrito y checkout (3.1–3.7). S4: 4.2, 4.4, 4.5, 4.6. S5 (AR): completo. |
| 12 Ecommerce / AR | Parcial | Subida de imágenes a Storage; catálogo, carrito y checkout; QR y correlativo `GYA-AAAA-XXXX` (hoy `0842` fijo); persistencia en `presupuestos_solicitados`; AR. |
| 02 AI Handoff | Vigente | Rotar `RESEND_API_KEY` y `RECAPTCHA_SECRET_KEY`; aplicar protocolo a `/contacto` y `/presupuesto`; no documenta los commits de 2026-11-03. |

## 3. Desfases documentales

1. `docs/README.md` no indexa 14–17 ni `diplomado/`.
2. `05_CHANGELOG.md` no tiene entrada de 2026-11-03.
3. `AGENTS.md` nombra `AuraNavbar`/`AuraFooter`; el código usa `Navbar`/`Footer`. Además describe el simulador 3D como pendiente, mientras el vigente es `/simulador-ai`.
4. Doc 13: la ruta de `AdminRouteGuard` está desactualizada (real: `features/auth/components/`).
5. `GOL.md` es histórico: archivar o marcar como tal.

## 4. Verificación sugerida

- Confirmar con grep que siguen ausentes `useCartStore`, `presupuestos_solicitados` y `model-viewer` en `apps/web/src`.
- Tras cualquier cambio de código: `pnpm run typecheck && pnpm run build`. No ejecutar `test:run` salvo que se pida.

## 5. Preguntas para validar con Sonnet

- (a) ¿Las 25 filas sin tocar del plan 17 se descartaron a propósito?
- (b) ¿Los puntos dudosos de DESIGN-SYSTEM-PLAN (`<Toaster/>`, `status.*`) están hechos?
- (c) Priorización de los pendientes de 13 y 12.
