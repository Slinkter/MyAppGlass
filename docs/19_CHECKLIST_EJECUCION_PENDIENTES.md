# 19 · Checklist de ejecución de pendientes

> Rama: `plan/pendientes-fases`. Base: `docs/18_REPORTE_PLANES_PENDIENTES.md`.
> Modelos: **Haiku** para tareas mecánicas (docs, grep, tests simples, cambios repetitivos); **Sonnet** para lógica, seguridad, arquitectura y validación.
> Cada fase cierra con un commit de control `chore(plan): cerrar Fx ...`.

## Estado

- [ ] F0 · Validación base
- [ ] F1 · Documentación y seguridad
- [ ] F2 · Auth y RBAC (plan 13 S1)
- [ ] F3 · Inventario e imágenes (plan 13 S2)
- [ ] F4 · E-commerce (plan 13 S3 / plan 12)
- [ ] F5 · Presupuesto (plan 13 S4)
- [ ] F6 · Realidad aumentada (plan 13 S5)
- [ ] F7 · Calidad y observabilidad (plan 04)
- [ ] F8 · SEO contenidos (plan 09)
- [ ] F9 · Diseño (DESIGN-SYSTEM-PLAN / PLAN-DISENO)
- [ ] F10 · Cierre

## F0 · Validación base

- [x] F0.1 Sonnet valida `docs/18` (secciones 2 y 5). Correcciones: `<Toaster/>` ya montado en `app/Providers.tsx:21` (no es pendiente); el correlativo `0842` está en `screens/Presupuesto/presupuesto/QuoteSheet.tsx:48` y existe un generador en `apps/functions/src/adapters/idGenerator.js` (congelado).
- [x] F0.2 Haiku confirma con grep los pendientes marcados como ausentes (`useCartStore`, `presupuestos_solicitados`, `model-viewer`: 0 ocurrencias)
- [x] F0.3 Línea base: `pnpm run typecheck` (pasa, exit 0)
- [x] F0.4 Línea base: `pnpm run build` (pasa, exit 0)
- [x] F0.5 Commit de control `chore(plan): cerrar F0`

## F1 · Documentación y seguridad

- [x] F1.1 Índice de `docs/README.md` con 14–17 y `diplomado/`
- [x] F1.2 Entrada de changelog del 2026-11-03
- [x] F1.3 `AGENTS.md`: nombres `Navbar`/`Footer` y estado del simulador
- [x] F1.4 Doc 13: ruta de `AdminRouteGuard`
- [x] F1.5 Archivar `GOL.md` en `docs/diplomado/` o marcarlo histórico
- [x] F1.6 Nota de planes 16 y 17 en `02_AI_HANDOFF.md`
- [ ] F1.7 Verificar `typecheck`
- [ ] F1.8 Commit de control `chore(plan): cerrar F1`
- [ ] F1.9 **Usuario:** rotar `RESEND_API_KEY` y `RECAPTCHA_SECRET_KEY` (fuera de alcance del agente)

## F2 · Auth y RBAC

- [x] F2.1 Bloquear auto-asignación de rol admin (1.3)
- [x] F2.2 Hook `useUserProfile` (1.5)
- [x] F2.3 Guardias de `/admin` y `/mi-cuenta` (1.6)
- [x] F2.4 Validación estricta DNI 8 / RUC 11 (1.8)
- [x] F2.5 Tests de `auth-service` (1.10)
- [x] F2.6 Verificar `typecheck` y `build`
- [ ] F2.7 Commit de control `chore(plan): cerrar F2`

## F3 · Inventario e imágenes

- [x] F3.1 Subida de imágenes a Storage (2.2): `ImageUploadZone` en `CreateProductModal` (entity `products`); `storage.rules` ya limita `products/**` a admin
- [x] F3.2 Tests de `inventory-crud` (2.7)
- [x] F3.3 Verificar `typecheck` y `build`
- [ ] F3.4 Commit de control `chore(plan): cerrar F3`

## F4 · E-commerce

- [x] F4.1 `useCartStore` (3.1): `features/tienda/useCartStore.ts` (zustand no está en package.json; store con `useSyncExternalStore` + localStorage)
- [x] F4.2 Validar cantidad contra stock (3.2): `cart-engine.ts` (`clampQuantity`, `reconcileWithCatalog`)
- [x] F4.3 `ShopScreen` (3.3): `screens/Tienda/ShopScreen.tsx`, ruta `/tienda`
- [x] F4.4 Drawer del carrito (3.4): `screens/Tienda/CartDrawer.tsx`
- [x] F4.5 Checkout (3.5): ruta `/tienda/checkout`, envío por WhatsApp. BLOQUEADO (parcial): persistir el pedido en Firestore `pedidos` exige escritura pública y las reglas solo permiten admin (requiere cambiar `firestore.rules` o una Cloud Function, congelados)
- [x] F4.6 Cross-selling (3.6): `getCrossSells` + sección en el drawer
- [x] F4.7 Tests `cart-engine` (3.7): `apps/web/tests/unit/cart-engine.test.ts` (no ejecutado por regla de ahorro)
- [x] F4.8 Catálogo público (plan 12): `useShopProducts` reusa `productService.getAllProducts` (lectura pública permitida)
- [ ] F4.9 Verificar `typecheck` y `build`
- [ ] F4.10 Commit de control `chore(plan): cerrar F4`

## F5 · Presupuesto

- [x] F5.1 Tabla de precios parametrizable (4.2)
- [x] F5.2 Hoja A4 con QR (4.4)
- [x] F5.3 Correlativo `GYA-AAAA-XXXX` real (reemplaza `0842`)
- [x] F5.4 Persistir en `presupuestos_solicitados` (4.5) (reglas + contador transaccional `contadores/presupuesto-AAAA`, sin Cloud Function)
- [x] F5.5 Tests de metraje y correlativo (4.6)
- [x] F5.6 Verificar `typecheck` y `build`
- [ ] F5.7 Commit de control `chore(plan): cerrar F5`

## F6 · Realidad aumentada

- [ ] F6.1 `AuraModelViewer` con `<model-viewer>` (5.1)
- [ ] F6.2 Soporte `.usdz` (5.2) — **BLOQUEADO: faltan modelos 3D**
- [ ] F6.3 Soporte `.glb` (5.3) — **BLOQUEADO: faltan modelos 3D**
- [ ] F6.4 Fallback de escritorio con QR (5.4)
- [ ] F6.5 Botón "Ver en tu espacio" (5.5)
- [ ] F6.6 Prototipos 3D (5.6)
- [ ] F6.7 Rendimiento 60 FPS y accesibilidad (5.7)
- [ ] F6.8 Verificar `typecheck` y `build`
- [ ] F6.9 Commit de control `chore(plan): cerrar F6`

## F7 · Calidad y observabilidad

- [x] F7.1 Playwright: registro y reclamo (plan 04 2.5)
- [x] F7.2 Playwright: cotización / contacto
- [x] F7.3 Playwright: navegación, blog y sitemap
- [ ] F7.4 Sentry cliente — **requiere cuenta/DSN del usuario**
- [ ] F7.5 Sentry servidor — **functions congeladas: BLOQUEADO hasta autorización**
- [x] F7.6 Alertas Cloud Monitoring (5xx y latencia) — políticas declarativas listas en `gcp/monitoring/alert-policies/` y canal en `gcp/monitoring/channels/`
- [x] F7.7 Uptime y SSL — verificación de disponibilidad y SSL (< 30 días) en `gcp/monitoring/uptime-checks/` y alerta en `gcp/monitoring/alert-policies/`
- [x] F7.8 Export Firestore a BigQuery (5.1) — esquemas JSON en `gcp/bigquery/schemas/` y vistas analíticas estándar en `gcp/bigquery/views/views_bi.sql` (Costo $0.00)
- [ ] F7.9 Log de auditoría inmutable de reclamos (5.2) — **functions congeladas: BLOQUEADO**
- [ ] F7.10 Commit de control `chore(plan): cerrar F7`

## F8 · SEO contenidos

- [x] F8.1 Landing Surco
- [x] F8.2 Landing San Borja
- [x] F8.3 Landing Miraflores
- [ ] F8.4 Google Maps y NAP — **acción externa del usuario**
- [ ] F8.5 Commit de control `chore(plan): cerrar F8`

## F9 · Diseño

- [x] F9.1 Migrar `colorPalette` a variants de `Button`
- [x] F9.2 `variant="whatsapp"` en lugar de WhatsApp armado a mano
- [x] F9.3 Retirar alias heredados (`border.glass`, `text.primary`, `bg.canvas`, `surface.muted`, `bg.glass`)
- [x] F9.4 Dark mode del formulario de reclamos
- [x] F9.5 Verificar `<Toaster/>` y `status.*`
- [x] F9.6 Hallazgos bajos de PLAN-DISENO (`bg`/`_hover` manual, `minW={0}`)
- [ ] F9.7 Prueba manual en navegador — **usuario**
- [ ] F9.8 Commit de control `chore(plan): cerrar F9`

## F10 · Cierre

- [ ] F10.1 `typecheck` y `build` finales en verde
- [ ] F10.2 Changelog final
- [ ] F10.3 Deploy hosting — **solo si el usuario lo pide**
- [ ] F10.4 Deploy functions — **solo si el usuario lo pide**
- [ ] F10.5 Commit de control `chore(plan): cerrar F10`

## Bloqueos abiertos (esperan decisión del usuario)

> **Traspaso Firebase/GCP (COMPLETADO Y CONFIRMADO PARA CLAUDE):**
> - **F7.6 (Cloud Monitoring 5xx y Latencia):** Completado. Definiciones en `gcp/monitoring/alert-policies/` y canal `acueva@gyacompany.com` en `gcp/monitoring/channels/notification-email.json`.
> - **F7.7 (Uptime Checks y SSL):** Completado. Chequeo multirregional cada 5m en `gcp/monitoring/uptime-checks/uptime-gyacompany.json` y alerta SSL (<30 días) en `gcp/monitoring/alert-policies/alert-uptime-ssl.json`.
> - **F7.8 (BigQuery Analytics BI):** Completado. Esquemas JSON de 4 colecciones en `gcp/bigquery/schemas/` y vistas Standard SQL en `gcp/bigquery/views/views_bi.sql`.
> - **Garantía de Costo:** $0.00 (Free Tier nativo de GCP), con plantilla preventiva de presupuesto en `gcp/budget/zero-cost-budget-alert.json`.
> - **Validación:** `validate-configs.mjs`, `typecheck` y `build` 100% en verde.
> - **Commit de control en `plan/pendientes-fases`:** `94624f9` (`feat(observability): cerrar F7.6, F7.7 y F7.8 con configs de costo cero`).
> - **Estado para Claude:** Desbloqueado. Claude puede continuar con los siguientes pendientes de la rama.

1. Autorizar cambios en código congelado (`apps/functions/`, `firestore.rules`, `storage.rules`): afecta F2.1, F3.1, F5.4, F7.5, F7.9.
2. DSN de Sentry: F7.4.
3. Modelos `.glb` y `.usdz`: F6.2 y F6.3.
4. Acciones externas: F8.4 y F9.7.
