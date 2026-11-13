# Tareas: Dashboard admin con catálogo de proveedores y pedido de compra

> Fuente: `plan.md` aprobado por el dueño. Requisitos en `spec.md` §5.
> Una tarea = máximo tres archivos. Orden fijo por fase. `[ ]` pendiente · `[x]` hecha.
> Agente y modelo: tal como figuran en el plan. Haiku por defecto; Sonnet para lo marcado `S`.
> Escalada: Haiku tiene 2 intentos por tarea; si falla dos veces, pasa a Sonnet con el mismo brief más el error. No se insiste una tercera vez con el mismo modelo.
> Gates: `pnpm run typecheck && pnpm run lint && pnpm run build` una vez al cierre de cada fase, con `qa-gates`. `pnpm run test:run` no se ejecuta.
> Sin deploy ni push en ninguna fase. Todo se prueba en el emulador.

## Fase 0. Documentos y rama

- [x] **0.1** Crear la rama `feat/dashboard-proveedores` desde `main`. Archivo principal: ninguno (git). Agente: general-purpose. Modelo: Haiku.
- [x] **0.2** Crear `plan.md` en `docs/claude/specs/dashboard-proveedores/` (parte plan.md hecha). `spec.md` y `tasks.md` se entregan en esta misma tarea; el commit de control de la fase los incluye. Agente: general-purpose. Modelo: Haiku.
- [x] **0.3** Anotar el bloque en `docs/PENDIENTES.md`, con enlace a la entrevista. Archivo principal: `docs/PENDIENTES.md`. Agente: general-purpose. Modelo: Haiku.
- [x] **0.4** Crear `docs/claude/specs/dashboard-proveedores/entrevista.md`: dudas en formato de entrevista (pregunta, por qué importa, ejemplo y línea **Respuesta:**), agrupadas en precios, proveedores, sistemas, pedido y permisos. Cada fase relee el archivo antes de empezar. Archivo principal: `docs/claude/specs/dashboard-proveedores/entrevista.md`. Agente: general-purpose. Modelo: Haiku.
- [x] **0.5** Crear `docs/claude/specs/dashboard-proveedores/flujos.md` con diagramas Mermaid: (a) sincronización API → Firestore, (b) sistema en borrador → publicado o eliminado, (c) pedido de compra: buscar → carrito → por proveedor → A4 → aprobar. Archivo principal: `docs/claude/specs/dashboard-proveedores/flujos.md`. Agente: general-purpose. Modelo: Sonnet.
- [x] **0.6** Crear `docs/claude/specs/dashboard-proveedores/pantallas.md` con el boceto de cada pantalla final a 360 px y a escritorio (`/admin/pedidos`, lista de pedidos, hoja A4, `/admin/sistemas`, menú del panel), para revisión del dueño. Archivo principal: `docs/claude/specs/dashboard-proveedores/pantallas.md`. Agente: general-purpose. Modelo: Sonnet.
- [x] **Commit de control:** `docs(dashboard): spec, plan y tareas del catálogo de proveedores y pedido de compra`

## Fase 1. Sincronización API → Firestore (en paralelo con la Fase 2)

- [x] **1.1** Crear `scripts/sync-proveedores.mjs` (patrón: `scripts/upload-project-photos.mjs`): comprueba `/salud` y sale sin escribir si la API está apagada; pagina `GET /productos`; escribe `proveedores_productos/{proveedor}_{cod}`; marca `activo: false` lo que ya no venga; emulador por defecto, `--prod` solo con visto bueno. Archivo principal: `scripts/sync-proveedores.mjs`. Agente: general-purpose. Modelo: Haiku.
- [x] **1.2** En el mismo script, función aparte: subir imágenes de `/static/img/...` a Storage `proveedores/{proveedor}/{cod}.png` y refrescar `docs/proveedores/*.md` desde `GET /asistente/documentos/{proveedor}`. Se asigna después de 1.1 por compartir archivo. Archivo principal: `scripts/sync-proveedores.mjs`. Agente: general-purpose. Modelo: Haiku.
- [x] **1.3** `entities/supplier`: `model/index.ts`, `api/supplierProductsRepository.ts`, `api/useSupplierProducts.ts` (patrón: `entities/product/api/useRealtimeProducts.ts`). Desbloquea la Fase 3. Archivo principal: `apps/web/src/entities/supplier/model/index.ts`. Agente: general-purpose. Modelo: Haiku.
- [x] **1.4** Reglas de Firestore y Storage: `proveedores_productos`, `sistemas`, `pedidos_proveedor` y `proveedores/**` solo `isAdmin()`; casos nuevos en `tests/rules/firestore.rules.test.mjs`. Archivo principal: `firestore.rules`. Agente: general-purpose. Modelo: Sonnet.
- [x] **1.5** Retirar `apps/web/src/shared/data/proveedores/` (sin uso); mover `catalogo-proveedores-servicios.ts` a `docs/gemini/data/`. Archivo principal: `apps/web/src/shared/data/proveedores/`. Agente: general-purpose. Modelo: Haiku.
- [x] **1.6** Gates con `qa-gates` y correr el script contra el emulador (435 documentos). Sin archivo principal (gate). Agente: qa-gates. Modelo: Haiku.
- [x] **Commit de control:** `feat(proveedores): sincronizar catálogo de la API a Firestore con acceso solo admin`

## Fase 2. Estudio de catálogos y sistemas en borrador (en paralelo con la Fase 1)

- [x] **2.1** Estudio de ventanas, mamparas y puertas de aluminio: sistemas, alias por proveedor, perfiles y accesorios, con documento y página de origen. Archivo principal: `docs/claude/specs/dashboard-proveedores/sistemas-aluminio.md`. Agente: general-purpose. Modelo: Sonnet.
- [x] **2.2** Estudio de ducha, parapeto, baranda, puerta de vidrio y frenos (Corrales y Favitem, más lo descrito en `docs/claude/tareas.md`). Archivo principal: `docs/claude/specs/dashboard-proveedores/sistemas-templado-acero.md`. Agente: general-purpose. Modelo: Sonnet.
- [x] **2.3** Estudio de techos, celosías, espejos y vidrios (Eduhg y fichas de HPD Glass). Archivo principal: `docs/claude/specs/dashboard-proveedores/sistemas-otros.md`. Agente: general-purpose. Modelo: Haiku.
- [x] **2.4** Modelo y repositorio de sistemas: `serviceSlug`, `nombre`, `aliases`, `tipoApertura`, `perfiles`, `accesorios`, `vidrio`, `descripcion`, `fuente`, `estado: 'borrador' | 'publicado'`, `pricePending: true`; más `api/systemsRepository.ts` y `api/useSystems.ts`. Archivo principal: `apps/web/src/entities/system/model/index.ts`. Agente: general-purpose. Modelo: Haiku.
- [x] **2.5** Carga de sistemas en borrador con los resultados de 2.1 a 2.3; crea solo los que no existan (patrón: `entities/service/api/approvedNewServices.ts`). Un archivo de datos por estudio. Archivo principal: `apps/web/src/entities/system/api/seedSystems.ts`. Agente: general-purpose. Modelo: Haiku.
- [ ] **2.6** Textos de los sistemas con `copy-vidrieria`: ensambla e instala, sin garantías ni porcentajes inventados; marcador visible donde falte un dato. Archivo principal: `apps/web/src/entities/system/api/seedSystems.ts`. Agente: copy-vidrieria. Modelo: Haiku.
- [x] **2.7** `SystemAdminTable.tsx` con Publicar y Eliminar (`AdminRowActions`, `ConfirmDeleteDialog`); patrón `ServiceAdminTable.tsx`. Archivo principal: `apps/web/src/features/admin/components/SystemAdminTable.tsx`. Agente: general-purpose. Modelo: Haiku.
- [x] **2.8** `SystemsScreen.tsx` y `app/admin/sistemas/page.tsx`, con botón "Cargar sistemas". Archivo principal: `apps/web/src/screens/Admin/SystemsScreen.tsx`. Agente: general-purpose. Modelo: Haiku.
- [x] **2.9** Actualizar `AGENTS.md` §3 (catálogo oficial = `sistemas` con `estado = 'publicado'`) y gates. Archivo principal: `AGENTS.md`. Agente: qa-gates. Modelo: Haiku.
- [x] **Commit de control:** `feat(sistemas): catálogo de sistemas por servicio en borrador desde los proveedores`

Las páginas públicas y el cotizador no cambian en este plan.

## Fase 3. Pedido de compra (`/admin/pedidos`) (arranca al terminar 1.3)

- [x] **3.1** `groupBySupplier.ts`: agrupa líneas por proveedor y calcula subtotal o `null` si falta un precio (misma lógica que `POST /cotizar`, sin depender de la API). Archivo principal: `apps/web/src/entities/supplier/lib/groupBySupplier.ts`. Agente: general-purpose. Modelo: Haiku.
- [x] **3.2** `SupplierProductPicker.tsx`: búsqueda por código, nombre, categoría y proveedor, con foto (patrón: `screens/Admin/sales/ProductPickerCard.tsx`). Archivo principal: `apps/web/src/features/admin/components/purchase/SupplierProductPicker.tsx`. Agente: general-purpose. Modelo: Haiku.
- [x] **3.3** `PurchaseSummaryCard.tsx`: un bloque por proveedor; sin precio muestra "Sin información de precio" (patrón: `sales/OrderSummaryCard.tsx`). Archivo principal: `apps/web/src/features/admin/components/purchase/PurchaseSummaryCard.tsx`. Agente: general-purpose. Modelo: Haiku.
- [x] **3.4** `purchaseOrderService.ts`: guarda `pedidos_proveedor/{número}` con `createdBy`, `estado` (`borrador` → `por aprobar` → `aprobado`), líneas y fecha; correlativo con el patrón de `entities/quote/lib/quoteNumber.ts`. Archivo principal: `apps/web/src/entities/supplier/api/purchaseOrderService.ts`. Agente: general-purpose. Modelo: Haiku.
- [x] **3.5** `PurchaseOrderSheet.tsx`: hoja A4 con una sección por proveedor, `window.print()`, estructura de `entities/quote/ui/QuoteSheet.tsx` y datos de `companyData`. Archivo principal: `apps/web/src/entities/supplier/ui/PurchaseOrderSheet.tsx`. Agente: general-purpose. Modelo: Sonnet.
- [x] **3.6** `PurchaseOrderScreen.tsx` y `app/admin/pedidos/page.tsx`: une 3.2 a 3.5 (patrón: `SalesOrderScreen.tsx`). Archivo principal: `apps/web/src/screens/Admin/PurchaseOrderScreen.tsx`. Agente: general-purpose. Modelo: Haiku.
- [x] **3.7** `PurchaseOrdersList.tsx`: lista con estado y botón Aprobar (patrón: `screens/Admin/reports/OrdersList.tsx`). Archivo principal: `apps/web/src/features/admin/components/purchase/PurchaseOrdersList.tsx`. Agente: general-purpose. Modelo: Haiku.
- [x] **3.8** Gates. Sin archivo principal (gate). Agente: qa-gates. Modelo: Haiku.
- [x] **Commit de control:** `feat(pedidos): pedido de compra por proveedor con vista A4 y aprobación`

## Fase 4. Menú y cierre

- [x] **4.1** `AdminNav.tsx`: agregar Pedidos, Sistemas y Presupuestos. Archivo principal: `apps/web/src/widgets/AdminNav/AdminNav.tsx`. Agente: general-purpose. Modelo: Haiku.
- [x] **4.2** `AdminHubScreen.tsx`: tarjetas de Pedidos y Sistemas. Archivo principal: `apps/web/src/screens/Admin/AdminHubScreen.tsx`. Agente: general-purpose. Modelo: Haiku.
- [ ] **4.3** Revisión a 360 px de las pantallas nuevas con `espaciado-360` (solo reporta); una tarea Haiku aplica los ajustes. Archivo principal: según el reporte. Agente: espaciado-360 y general-purpose. Modelo: Haiku.
- [x] **4.4** `docs/05_CHANGELOG.md`, `docs/PENDIENTES.md` y `tasks.md` al día; gates finales. Archivo principal: `docs/05_CHANGELOG.md`. Agente: general-purpose y qa-gates. Modelo: Haiku.
- [x] **Commit de control:** `feat(admin): enlazar pedidos, sistemas y presupuestos en el panel`

## Reglas de cierre

- Sin push, sin merge a `main` y sin deploy hasta que el dueño lo pida.
- Si la fase queda a medias al terminar la sesión: commit `wip(admin): ...` con los checks de este archivo actualizados.
- El commit de cada fase incluye el código de la fase y este `tasks.md` con sus casillas marcadas.

## Pendiente al cierre del 2026-11-13

- **1.6** Hecho el 2026-11-13 en el emulador: 435 productos y 360 fotos sincronizados; reglas 45 de 46 (la que falla, "contador read anon", ya fallaba antes de este trabajo). Flujo de pedido y carga de 52 sistemas probados en el navegador a 1280 px.
- **2.6** Revisar los textos de los 52 sistemas con `copy-vidrieria`.
- **4.3** Revisión a 360 px con `espaciado-360` y prueba en navegador de `/admin/pedidos` y `/admin/sistemas`.
- Aplicar las respuestas del dueño en `entrevista.md` y las dudas de los tres estudios `sistemas-*.md`.
