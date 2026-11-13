# Plan: terminar el dashboard admin con catálogo de proveedores y pedido de compra

## Contexto

El cotizador (Fases 0 a 7) y el CRUD de servicios y proyectos ya están hechos. Lo que quedó abierto en `docs/PENDIENTES.md` y `docs/claude/tareas.md` es conectar el panel con el backend de proveedores (proyecto aparte en WSL, `proveedor_info`, FastAPI en `localhost:8000`) para dos cosas: armar pedidos de compra sin salir del panel y crear los sistemas de cada servicio a partir de los catálogos.

Decisiones del dueño en esta sesión:

- Alcance del panel: **Pedido de compra**.
- Sistemas nuevos: se crean con confianza pero como **borrador en admin**; el dueño publica o elimina.
- Roles: **solo admin** por ahora; el pedido guarda quién lo creó y su estado.
- Ejecución: agentes en **Haiku** por defecto, tareas en paralelo, ahorro de tokens y **un commit de control por fase**.

### Lo que encontré

| Tema | Estado real |
| --- | --- |
| API de proveedores | Encendida y probada. `GET /proveedores`, `GET /productos` (filtros `proveedor`, `q`, `categoria`, `tipo`, `limit`, `offset`), `GET /productos/{id}`, `POST /cotizar` (recibe una lista y agrupa por proveedor), `GET /asistente/documentos/{proveedor}`, `POST /asistente/consultar` (RAG con cuota gratuita: no usar para cargas masivas). |
| Datos | 435 registros: Corrales 386 (369 productos, 17 fichas), Eduhg 29 (26 herrajes sin foto ni categoría, 3 fichas), HPD Glass 20 fichas. **Favitem: 0 productos**, solo un documento de 4 KB. **Ningún registro tiene precio.** 99 sin categoría. |
| Perfiles de aluminio | No están como productos; solo aparecen en las fichas y en `docs/proveedores/*_base_conocimiento.md`. |
| Copia local de Gemini | `apps/web/src/shared/data/proveedores/` **no la importa nadie**. El JSON tiene BOM y acentos rotos. Si se importara desde una página, los proveedores quedarían en el bundle público. |
| `pricing.ts` | Gemini agregó Serie 20, 35 y 62 con `kitCost` y `noiseReductionPct` que no vienen de ningún proveedor. `AGENTS.md` §3 sigue diciendo "solo 6 sistemas". |
| Panel | Existen servicios, proyectos, inventario, ventas, reportes, clientes y presupuestos. `/admin/presupuestos` no está en `AdminNav`. No hay módulo de pedidos a proveedor ni de sistemas. |

## Enfoque técnico

La web es un export estático y la API es local, así que el panel no puede depender de `localhost:8000`. Un script lee la API cuando está encendida y deja una copia en Firestore, con lectura solo para admin. El panel lee Firestore: funciona con la API apagada y los proveedores no llegan al bundle público.

## Cómo se ejecuta

### Modelos

| Nivel | Modelo | Para qué |
| --- | --- | --- |
| Por defecto | **Haiku** | Tareas con archivo de patrón a copiar: tipos, repositorios, hooks, tablas, formularios, enlaces de menú, textos, documentos, gates. |
| Escalada 1 | **Sonnet** | Tareas marcadas `S` (reglas de Firestore, estudio de catálogos, hoja A4) y cualquier tarea de Haiku que falle. |
| Escalada 2 | **Sesión principal (Fable)** | Solo coordinar, revisar el diff de cada fase y destrabar lo que Sonnet no cierre. No escribe código de rutina. |

**Regla de escalada:** Haiku tiene dos intentos por tarea. Si el typecheck o el lint de sus archivos falla dos veces, o reporta que no entiende el patrón, la tarea pasa a Sonnet con el mismo brief más el error. No se insiste una tercera vez con el mismo modelo.

**Tareas a medida de Haiku:** cada tarea toca como máximo 3 archivos, nombra el archivo de patrón que debe imitar y tiene un criterio de hecho comprobable. Si una tarea resulta más grande, se parte en dos antes de asignarla.

### Paralelo

- Dentro de una fase, las tareas tocan archivos distintos y se lanzan juntas en un solo mensaje.
- Entre fases: la **Fase 2 (estudio)** corre en paralelo con la **Fase 1 (sincronización)** porque solo lee documentos; la **Fase 3 (pedido)** arranca en cuanto existe `entities/supplier` (tarea 1.3), sin esperar el resto de la Fase 1.
- Archivos de un solo dueño por fase (nadie más los edita): `firestore.rules`, `storage.rules`, `AdminNav.tsx`, `AdminHubScreen.tsx`, `AGENTS.md`.

### Ahorro de tokens

- El brief de cada agente lleva rutas exactas, el archivo de patrón y el criterio de hecho; el agente no explora el repo.
- Los documentos grandes (`corporacion_corrales_base_conocimiento.md`, 1,2 MB; `hpd_glass`, 544 KB) **no se leen enteros**: se buscan con Grep por "Serie", "Sistema", "Kit" y se lee solo el tramo.
- Los datos se consultan por REST (`/productos`); el RAG (`/asistente/consultar`) no se usa.
- Los gates (`typecheck`, `lint`, `build`) corren **una vez al cierre de cada fase** con el agente `qa-gates` en Haiku, no después de cada tarea. `pnpm run test:run` no se ejecuta.
- Cada agente responde en 10 líneas como máximo: archivos tocados, resultado y dudas.
- El agente `observador` no se usa por fase: el cierre lo anota una tarea Haiku en el changelog.

### Commits

- Rama `feat/dashboard-proveedores` creada desde `main` antes de empezar. Sin push, sin merge y sin deploy hasta que el dueño lo pida.
- **Un commit de control al cerrar cada fase**, solo con los tres gates en verde. Si la fase queda a medias al terminar la sesión, commit `wip(admin): ...` con los checks actualizados en `tasks.md`.
- El commit incluye el código de la fase y `tasks.md` con sus casillas marcadas, así el historial muestra el avance.
- Mensajes: `docs(dashboard): ...`, `feat(proveedores): ...`, `feat(sistemas): ...`, `feat(pedidos): ...`, `feat(admin): ...`.

## Fases y tareas

Leyenda: `H` Haiku, `S` Sonnet. `∥` indica que la tarea corre en paralelo con las demás de su grupo.

### Fase 0. Documentos y rama

- [ ] 0.1 `H` Crear la rama `feat/dashboard-proveedores`.
- [ ] 0.2 `H` ∥ Crear `docs/claude/specs/dashboard-proveedores/spec.md`, `plan.md` y `tasks.md` a partir de este plan (formato de `docs/claude/specs/cotizador-presupuesto/`).
- [ ] 0.3 `H` ∥ Anotar el bloque en `docs/PENDIENTES.md`, con enlace a la entrevista.
- [ ] 0.4 `H` ∥ `docs/claude/specs/dashboard-proveedores/entrevista.md`: mis dudas en formato de entrevista (pregunta, por qué importa, ejemplo y línea **Respuesta:** para el dueño), agrupadas en precios, proveedores, sistemas, pedido y permisos. El dueño responde ahí; cada fase relee el archivo antes de empezar y aplica lo respondido.
- [ ] 0.5 `S` ∥ `docs/claude/specs/dashboard-proveedores/flujos.md`: diagramas Mermaid de (a) sincronización API → Firestore, (b) sistema en borrador → publicado o eliminado, (c) pedido de compra: buscar → carrito → por proveedor → A4 → aprobar.
- [ ] 0.6 `S` ∥ `docs/claude/specs/dashboard-proveedores/pantallas.md`: boceto de cada pantalla final a 360 px y a escritorio (`/admin/pedidos`, lista de pedidos, hoja A4, `/admin/sistemas`, menú del panel), para revisión del dueño. Las fases 2 a 4 se construyen según estos bocetos; lo que el dueño corrija después se ajusta.
- [ ] **Commit:** `docs(dashboard): spec, plan y tareas del catálogo de proveedores y pedido de compra`

### Fase 1. Sincronización API → Firestore

- [ ] 1.1 `H` ∥ `scripts/sync-proveedores.mjs` (patrón: `scripts/upload-project-photos.mjs`): comprueba `/salud` y sale sin escribir si la API está apagada; pagina `GET /productos`; escribe `proveedores_productos/{proveedor}_{cod}`; marca `activo: false` lo que ya no venga; emulador por defecto, `--prod` solo con visto bueno.
- [ ] 1.2 `H` ∥ En el mismo script, función aparte: subir imágenes de `/static/img/...` a Storage `proveedores/{proveedor}/{cod}.png` y refrescar `docs/proveedores/*.md` desde `/asistente/documentos/{proveedor}`. (Se asigna después de 1.1 por compartir archivo.)
- [ ] 1.3 `H` ∥ `entities/supplier`: `model/index.ts`, `api/supplierProductsRepository.ts`, `api/useSupplierProducts.ts` (patrón: `entities/product/api/useRealtimeProducts.ts`). **Desbloquea la Fase 3.**
- [ ] 1.4 `S` ∥ `firestore.rules` y `storage.rules`: `proveedores_productos`, `sistemas`, `pedidos_proveedor` y `proveedores/**` solo `isAdmin()`; casos nuevos en `tests/rules/firestore.rules.test.mjs`.
- [ ] 1.5 `H` ∥ Retirar `apps/web/src/shared/data/proveedores/` (sin uso); mover `catalogo-proveedores-servicios.ts` a `docs/gemini/data/` como insumo de la Fase 2.
- [ ] 1.6 `H` Gates con `qa-gates` y correr el script contra el emulador (435 documentos).
- [ ] **Commit:** `feat(proveedores): sincronizar catálogo de la API a Firestore con acceso solo admin`

### Fase 2. Estudio de catálogos y sistemas en borrador (en paralelo con la Fase 1)

- [ ] 2.1 `S` ∥ Estudio de **ventanas, mamparas y puertas de aluminio**: sistemas, alias por proveedor, perfiles y accesorios, con documento y página de origen. Entrega: `docs/claude/specs/dashboard-proveedores/sistemas-aluminio.md`.
- [ ] 2.2 `S` ∥ Estudio de **ducha, parapeto, baranda, puerta de vidrio y frenos** (Corrales y Favitem, más lo descrito en `docs/claude/tareas.md`). Entrega: `sistemas-templado-acero.md`.
- [ ] 2.3 `H` ∥ Estudio de **techos, celosías, espejos y vidrios** (Eduhg y fichas de HPD Glass, documentos chicos). Entrega: `sistemas-otros.md`.
- [ ] 2.4 `H` ∥ `entities/system/model/index.ts`: `serviceSlug`, `nombre`, `aliases: [{ proveedor, denominacion }]`, `tipoApertura`, `perfiles`, `accesorios: [{ proveedor, cod }]`, `vidrio`, `descripcion`, `fuente`, `estado: 'borrador' | 'publicado'`, `pricePending: true`. Más `api/systemsRepository.ts` y `api/useSystems.ts`.
- [ ] 2.5 `H` `entities/system/api/seedSystems.ts` con los resultados de 2.1 a 2.3 (patrón: `entities/service/api/approvedNewServices.ts`): crea solo los que no existan, todos en `borrador`. Un archivo de datos por estudio para repartirlo entre 3 agentes.
- [ ] 2.6 `H` Textos de los sistemas con el agente `copy-vidrieria` (ensambla e instala, sin garantías ni porcentajes inventados; marcador visible donde falte un dato).
- [ ] 2.7 `H` ∥ `features/admin/components/SystemAdminTable.tsx` (patrón: `ServiceAdminTable.tsx`) con Publicar y Eliminar (`AdminRowActions`, `ConfirmDeleteDialog`).
- [ ] 2.8 `H` ∥ `screens/Admin/SystemsScreen.tsx` y `app/admin/sistemas/page.tsx`, con botón "Cargar sistemas".
- [ ] 2.9 `H` Actualizar `AGENTS.md` §3 (el catálogo oficial pasa a ser `sistemas` con `estado = 'publicado'`) y gates.
- [ ] **Commit:** `feat(sistemas): catálogo de sistemas por servicio en borrador desde los proveedores`

Las páginas públicas y el cotizador **no cambian** en este plan.

### Fase 3. Pedido de compra (`/admin/pedidos`) (arranca al terminar 1.3)

- [ ] 3.1 `H` ∥ `entities/supplier/lib/groupBySupplier.ts`: agrupa líneas por proveedor y calcula subtotal o `null` si falta un precio (misma lógica que `POST /cotizar`, sin depender de la API).
- [ ] 3.2 `H` ∥ `features/admin/components/purchase/SupplierProductPicker.tsx` (patrón: `screens/Admin/sales/ProductPickerCard.tsx`): búsqueda por código, nombre, categoría y proveedor, con foto.
- [ ] 3.3 `H` ∥ `features/admin/components/purchase/PurchaseSummaryCard.tsx` (patrón: `sales/OrderSummaryCard.tsx`): un bloque por proveedor; sin precio muestra "Sin información de precio".
- [ ] 3.4 `H` ∥ `entities/supplier/api/purchaseOrderService.ts`: guarda `pedidos_proveedor/{número}` con `createdBy`, `estado` (`borrador` → `por aprobar` → `aprobado`), líneas y fecha; correlativo con el patrón de `entities/quote/lib/quoteNumber.ts`.
- [ ] 3.5 `S` ∥ `entities/supplier/ui/PurchaseOrderSheet.tsx`: hoja A4 con una sección por proveedor, `window.print()`, estructura de `entities/quote/ui/QuoteSheet.tsx` y datos de `companyData`.
- [ ] 3.6 `H` `screens/Admin/PurchaseOrderScreen.tsx` y `app/admin/pedidos/page.tsx`: une 3.2 a 3.5 (patrón: `SalesOrderScreen.tsx`).
- [ ] 3.7 `H` ∥ `features/admin/components/purchase/PurchaseOrdersList.tsx`: lista con estado y botón Aprobar (patrón: `screens/Admin/reports/OrdersList.tsx`).
- [ ] 3.8 `H` Gates.
- [ ] **Commit:** `feat(pedidos): pedido de compra por proveedor con vista A4 y aprobación`

### Fase 4. Menú y cierre

- [ ] 4.1 `H` ∥ `widgets/AdminNav/AdminNav.tsx`: agregar Pedidos, Sistemas y Presupuestos.
- [ ] 4.2 `H` ∥ `screens/Admin/AdminHubScreen.tsx`: tarjetas de Pedidos y Sistemas.
- [ ] 4.3 `H` ∥ Revisión a 360 px de las pantallas nuevas con el agente `espaciado-360` (solo reporta); una tarea Haiku aplica los ajustes.
- [ ] 4.4 `H` `docs/05_CHANGELOG.md`, `docs/PENDIENTES.md` y `tasks.md` al día; gates finales.
- [ ] **Commit:** `feat(admin): enlazar pedidos, sistemas y presupuestos en el panel`

## Fuera de este plan

Gestión de estados de presupuestos, rol vendedor, cambios en páginas públicas, despiece de taller, deploy de reglas o hosting, bot vendedor.

## Objetivo final

Un sistema de pedidos para los **4 proveedores** (Corrales, Eduhg, HPD Glass y Favitem) y el catálogo de servicios actualizado con los sistemas de esos proveedores.

## Preguntas abiertas (van a `entrevista.md`; no bloquean el inicio)

Mientras no haya respuesta, se trabaja con el valor más seguro: precio "a definir", todo en el emulador, sistemas en borrador.

1. `pricing.ts`: ¿los `kitCost` y los porcentajes antirruido de Serie 20, 35 y 62 que puso Gemini son suyos? Si no, los paso a `pricePending: true` ("Precio a definir").
2. Favitem no tiene productos en la API. ¿El bot los va a recolectar, o se cargan a mano los kits de ducha y accesorios de acero?
3. Eduhg trae 26 herrajes sin foto ni categoría. ¿Se muestran igual en el pedido?
4. ¿Cuándo autoriza escribir en el Firestore real (`--prod`) y desplegar las reglas? Hasta entonces todo vive en el emulador.
5. El pedido en A4: ¿lleva el membrete completo de la empresa o es un documento interno simple?

## Verificación

- Por fase: `pnpm run typecheck && pnpm run lint && pnpm run build` con `qa-gates`, antes del commit.
- Emuladores (`firebase emulators:start --only auth,firestore,storage`) y `NEXT_PUBLIC_USE_EMULATORS=true pnpm run dev`.
- `node scripts/sync-proveedores.mjs` con la API encendida: 435 documentos; segunda corrida sin cambios; con la API apagada sale sin escribir.
- `node tests/rules/firestore.rules.test.mjs`: un cliente no lee `proveedores_productos`, `sistemas` en borrador ni `pedidos_proveedor`.
- En el navegador, con `admin@gyacompany.com`, a 360 y 1280 px: buscar un código, armar un pedido con dos proveedores, ver "Sin información de precio", imprimir el A4, aprobar; publicar y eliminar un sistema en borrador.
- Comprobar que ningún nombre de proveedor aparece en `apps/web/out/` fuera de los chunks de `/admin`.
- `git log --oneline` muestra un commit por fase en `feat/dashboard-proveedores`.
