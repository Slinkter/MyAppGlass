# 19 · Checklist de ejecución de pendientes

> Rama: `plan/pendientes-fases`. Base: `docs/18_REPORTE_PLANES_PENDIENTES.md`.
> Modelos: **Haiku** para tareas mecánicas (docs, grep, tests simples, cambios repetitivos); **Sonnet** para lógica, seguridad, arquitectura y validación.
> Cada fase cierra con un commit de control `chore(plan): cerrar Fx ...`.
> Última actualización de estado: 2026-11-03, tras commit `0551de0`.

## Estado

- [x] F0 · Validación base (`796c06d`)
- [x] F1 · Documentación y seguridad (`2368df0`)
- [x] F2 · Auth y RBAC (`dd9b246`)
- [x] F3 · Inventario e imágenes (`a2a5913`)
- [x] F4 · E-commerce (`1340b11`), con bloqueo parcial en F4.5
- [x] F5 · Presupuesto (`8d6013b`)
- [ ] F6 · Realidad aumentada — **bloqueada: faltan modelos 3D**
- [ ] F7 · Calidad y observabilidad — parcial (ver sección F7)
- [x] F8 · SEO contenidos (`b7101cb`), salvo F8.4 (acción del usuario)
- [x] F9 · Diseño (`32c7f75`), salvo F9.7 (prueba del usuario)
- [ ] F10 · Cierre — pendiente

## F0 · Validación base

- [x] F0.1 Sonnet valida `docs/18` (secciones 2 y 5). Correcciones: `<Toaster/>` ya montado en `app/Providers.tsx:21` (no es pendiente); el correlativo `0842` está en `screens/Presupuesto/presupuesto/QuoteSheet.tsx:48` y existe un generador en `apps/functions/src/adapters/idGenerator.js` (congelado).
- [x] F0.2 Grep confirma ausencia de `useCartStore`, `presupuestos_solicitados`, `model-viewer` (0 ocurrencias en la línea base)
- [x] F0.3 Línea base: `pnpm run typecheck` (exit 0)
- [x] F0.4 Línea base: `pnpm run build` (exit 0)
- [x] F0.5 Commit de control `796c06d`

## F1 · Documentación y seguridad

- [x] F1.1 Índice de `docs/README.md` con 14–17 y `diplomado/`
- [x] F1.2 Entrada de changelog del 2026-11-03
- [x] F1.3 `AGENTS.md`: nombres `Navbar`/`Footer` y estado del simulador
- [x] F1.4 Doc 13: ruta de `AdminRouteGuard`
- [x] F1.5 Archivar `GOL.md` en `docs/diplomado/` o marcarlo histórico
- [x] F1.6 Nota de planes 16 y 17 en `02_AI_HANDOFF.md`
- [x] F1.7 Verificar `typecheck`
- [x] F1.8 Commit de control `2368df0`
- [ ] F1.9 **Usuario:** rotar `RESEND_API_KEY` y `RECAPTCHA_SECRET_KEY` (fuera de alcance del agente)

## F2 · Auth y RBAC (`dd9b246`)

- [x] F2.1 Bloquear auto-asignación de rol admin (1.3): `firestore.rules` restringe `role` y `AuthContext` ya no asigna admin por correo. **Confirmar:** la cuenta admin debe tener `users/{uid}.role = 'admin'` en Firestore.
- [x] F2.2 Hook `useUserProfile` (1.5)
- [x] F2.3 Guardias de `/admin` y `/mi-cuenta` (1.6)
- [x] F2.4 Validación estricta DNI 8 / RUC 11 (1.8)
- [x] F2.5 Tests de `auth-service` (1.10): escritos, **no ejecutados**
- [x] F2.6 Verificar `typecheck` y `build`
- [x] F2.7 Commit de control `dd9b246`

## F3 · Inventario e imágenes (`a2a5913`)

- [x] F3.1 Subida de imágenes a Storage (2.2): `ImageUploadZone` en `CreateProductModal` (entity `products`); `storage.rules` ya limita `products/**` a admin
- [x] F3.2 Tests de `inventory-crud` (2.7): escritos, **no ejecutados**
- [x] F3.3 Verificar `typecheck` y `build`
- [x] F3.4 Commit de control `a2a5913`

## F4 · E-commerce (`1340b11`)

- [x] F4.1 `useCartStore` (3.1): store con `useSyncExternalStore` + localStorage (zustand no está en package.json)
- [x] F4.2 Validar cantidad contra stock (3.2): `cart-engine.ts` (`clampQuantity`, `reconcileWithCatalog`)
- [x] F4.3 `ShopScreen` (3.3): ruta `/tienda`
- [x] F4.4 Drawer del carrito (3.4): `screens/Tienda/CartDrawer.tsx`
- [ ] F4.5 Checkout (3.5) — **BLOQUEADO (parcial):** arma el pedido y lo envía por WhatsApp, pero no se guarda en Firestore `pedidos` porque la escritura pública no está permitida por las reglas. Requiere cambiar `firestore.rules` o una Cloud Function.
- [x] F4.6 Cross-selling (3.6): `getCrossSells` + sección en el drawer
- [x] F4.7 Tests `cart-engine` (3.7): escritos, **no ejecutados**
- [x] F4.8 Catálogo público (plan 12): `useShopProducts` reusa `productService.getAllProducts`
- [x] F4.9 `typecheck` y `build` pasan (validado tras integrar F4, F8, F9)
- [x] F4.10 Commit de control `1340b11`

## F5 · Presupuesto (`8d6013b`)

- [x] F5.1 Tabla de precios parametrizable (4.2): `features/presupuesto/config/pricing.ts`
- [x] F5.2 Hoja A4 con QR (4.4): el QR apunta a `/presupuesto?n=<correlativo>`, **ruta aún sin consumir**
- [x] F5.3 Correlativo `GYA-AAAA-XXXX` real (reemplaza `0842`): contador transaccional `contadores/presupuesto-AAAA`
- [x] F5.4 Persistir en `presupuestos_solicitados` (4.5): reglas + transacción, sin Cloud Function. **Pendiente:** el contador es público, así que puede dejar huecos en la secuencia.
- [x] F5.5 Tests de metraje y correlativo (4.6): escritos, **no ejecutados**
- [x] F5.6 Verificar `typecheck` y `build`
- [x] F5.7 Commit de control `8d6013b`

## F6 · Realidad aumentada — BLOQUEADA

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

- [x] F7.1 Playwright: registro y reclamo (`e3a42cd`): 13/13 specs de F7.1–F7.3 pasaron contra el export estático
- [x] F7.2 Playwright: cotización / contacto (`e3a42cd`): solo validación de envíos inválidos; los envíos reales no se prueban
- [x] F7.3 Playwright: navegación, blog y sitemap (`e3a42cd`)
- [ ] F7.4 Sentry cliente — **BLOQUEADO: falta cuenta/DSN del usuario**
- [ ] F7.5 Sentry servidor — **BLOQUEADO: functions congeladas sin autorización explícita**
- [ ] F7.6 Alertas Cloud Monitoring (5xx y latencia) — **archivos listos** en `gcp/monitoring/alert-policies/` (commit `94624f9`). **No verificado si está aplicado en GCP.**
- [ ] F7.7 Uptime y SSL — **archivos listos** en `gcp/monitoring/uptime-checks/` y `alert-uptime-ssl.json` (`94624f9`). **No verificado si está aplicado en GCP.**
- [ ] F7.8 Export Firestore a BigQuery (5.1) — **archivos listos** en `gcp/bigquery/schemas/` y `views_bi.sql` (`94624f9`). **No verificado si está aplicado en GCP.**
- [ ] F7.9 Log de auditoría inmutable de reclamos (5.2) — **BLOQUEADO: functions congeladas sin autorización explícita**
- [ ] F7.10 Commit de control de F7 (pendiente hasta cerrar F7.4–F7.9)

> **Verificación de F7.6–F7.8:** `gcp/scripts/validate-configs.mjs` pasa (exit 0) sobre los JSON y el SQL. Eso prueba que los archivos son válidos, no que estén creados en GCP. Para cerrarlo se necesita la salida de `gcloud` o de la consola de GCP, o confirmación escrita de quien tiene el acceso.
> Traspaso: quien tiene acceso a Firebase/GCP (Gemini Argon 4, según indicó el usuario) debe confirmar la aplicación. Sin credenciales en el repo ni en el chat.

## F8 · SEO contenidos (`b7101cb`)

- [x] F8.1 Landing Surco (`/vidrieria/surco`)
- [x] F8.2 Landing San Borja (`/vidrieria/san-borja`)
- [x] F8.3 Landing Miraflores (`/vidrieria/miraflores`)
- [ ] F8.4 Google Maps y NAP — **acción externa del usuario**
- [x] F8.5 Commit de control `b7101cb`

## F9 · Diseño (`32c7f75`)

- [x] F9.1 Migrar `colorPalette` a variants de `Button`: 4 botones de acción migrados. Los ~24 `Badge` restantes se mantienen, porque `Badge` usa `colorPalette` como forma normal de dar color (requiere receta propia si se quiere retirar).
- [x] F9.2 `variant="whatsapp"` en el CTA del menú móvil
- [x] F9.3 Retirar alias heredados (`border.glass`, `text.primary`, `bg.canvas`, `surface.muted`, `bg.glass`)
- [x] F9.4 Dark mode del modal de reclamos (`SuccessModal`). No probado visualmente.
- [x] F9.5 Verificar `<Toaster/>` y `status.*`
- [x] F9.6 Hallazgos bajos de PLAN-DISENO: chips de timeline migrados; filas `_hover` de `TimelineProjectItem` y `CardVariantsShowcase` se conservan a propósito (no son botones)
- [ ] F9.7 Prueba manual en navegador — **usuario**
- [x] F9.8 Commit de control `32c7f75`

## F10 · Cierre

- [ ] F10.1 `typecheck` y `build` finales en verde (último validado: tras `8d6013b`; `94624f9` y `0551de0` solo añaden JSON y docs)
- [ ] F10.2 Changelog final
- [ ] F10.3 Deploy hosting — **solo si el usuario lo pide**
- [ ] F10.4 Deploy functions — **solo si el usuario lo pide**
- [ ] F10.5 Commit de control final

## Pendientes transversales

- [ ] **Ejecutar tests escritos** (no corridos hasta ahora): `cart-engine`, `inventory-crud`, `auth-service`, `quote-calculator`, `quote-number`. Requiere permiso explícito, porque `AGENTS.md` prohíbe `test:run` sin pedido.
- [ ] **Validar reglas de Firestore con emulador:** las nuevas de `presupuestos_solicitados` y `contadores`, y las de `users`/`clientes`. `tests/rules/rules-smoke.sh` no las cubre.
- [ ] **Confirmar aplicación en GCP** de F7.6–F7.8 (ver sección F7).
- [ ] **Confirmar admin en Firestore:** `users/{uid}.role = 'admin'` para la cuenta del responsable (F2.1).

## Decisiones abiertas

1. Autorizar ejecución de tests y emulador de reglas (transversales).
2. Consumir `/presupuesto?n=` en la ruta, o quitar el QR hasta tenerla (F5.2).
3. Aceptar huecos en el correlativo, o pasar el contador a Cloud Function (F5.4).
4. Permitir escritura pública en `pedidos` para el checkout, o mantenerlo por WhatsApp (F4.5).
5. DSN de Sentry (F7.4) y autorización de functions (F7.5, F7.9).
6. Modelos `.glb` y `.usdz` (F6).
7. Acciones externas: F8.4 y F9.7.
