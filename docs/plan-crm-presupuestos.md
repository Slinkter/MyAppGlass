# Plan técnico: CRM y presupuestos formales

> Plan aprobado por el dueño el 16/11/2026. Todavía no se escribe código: la implementación empieza por la Fase 0 cuando el dueño lo pida.

## 1. Contexto

La empresa necesita emitir presupuestos formales desde el panel: elegir un cliente, agregar productos y servicios, obtener subtotal + IGV 18 % + total, un correlativo `PRES-0001`, estados, validez y un PDF archivado.

El repo **ya tiene la mitad de las piezas**, así que el plan amplía lo existente en vez de crear un módulo paralelo:

| Ya existe | Dónde | Qué le falta |
| --- | --- | --- |
| Catálogo `productos` con alta, edición, stock y `isActive` | `entities/product/api/productService.ts`, `/admin/inventario` | Unidad `ml`, búsqueda y desactivar en la UI, distinguir servicios |
| Directorio `clientes` (alta y listado) | `entities/client/api/clientsRepository.ts`, `/admin/clientes` | Editar, desactivar, persona de contacto, correo opcional |
| Colección `presupuestos` con creación cerrada (`allow create: if false`) | `firestore.rules` | Todo el flujo |
| `/admin/presupuestos` | `screens/Admin/AdminPresupuestosScreen.tsx` | Hoy solo lista las solicitudes web `GYA-AAAA-XXXX` |
| Guard de admin | `features/auth/components/AdminRouteGuard.tsx` | Lee `users/{uid}.role`, no el claim |
| Paquete compartido con Zod | `packages/shared/src/schemas/` | Solo lo consume la web; las functions duplican sus schemas en JS |
| Tres functions HTTP (`onRequest`) | `apps/functions/src/http/` | Ninguna callable ni autenticada |

**Decisiones del dueño (16/11/2026):**

1. Ampliar `productos`, `clientes` y `presupuestos`; no crear colecciones paralelas.
2. Admin = **solo** custom claim `role: 'admin'` (se retira la vía `users/{uid}.role` de las reglas y del frontend).
3. Correlativo `PRES-0001` corrido, sin reinicio anual, independiente de `GYA-AAAA-XXXX`.
4. PDF generado en una Cloud Function y guardado en Storage.

**Fuera de alcance:** el cotizador público `/presupuesto` y `presupuestos_solicitados` no se tocan; convertir un presupuesto aprobado en pedido; envío por correo; descuentos; recargo del 5 % por tarjeta.

## 2. Modelo de datos

Montos en soles con 2 decimales. **Precios unitarios sin IGV** (igual que `entities/quote/config/pricing.ts`); ver decisión pendiente D1.

### `productos/{id}` (existente, se amplía)

| Campo | Tipo | Nota |
| --- | --- | --- |
| `sku` | string | existente |
| `name`, `description` | string | existente |
| `category` | `vidrio \| aluminio \| accesorio \| servicio \| consumible` | existente. `servicio` = instalación, mantenimiento |
| `unit` | `m2 \| ml \| unidad \| barra \| plancha \| kg \| servicio` | **se agrega `ml`**. En pantalla: m², ml, und |
| `unitPrice` | number > 0 | sin IGV |
| `costPrice`, `stock`, `minStockAlert`, `dimensions`, `imageUrl` | — | existentes; un servicio no lleva stock |
| `isActive` | boolean | "desactivar" = `false`; no se borra |
| `createdAt`, `updatedAt` | Timestamp | existentes |

La colección `services` es el contenido de las páginas públicas de servicios; **no** es el catálogo vendible. Los servicios que se cotizan viven en `productos` con `category: 'servicio'`.

### `clientes/{id}` (existente, se amplía)

| Campo | Tipo | Nota |
| --- | --- | --- |
| `fullName` | string (3–200) | razón social o nombre completo |
| `dniRuc` | string, 8 u 11 dígitos | DNI o RUC; el tipo se deduce del largo |
| `contactName` | string, opcional | **nuevo**: persona de contacto |
| `phone`, `address`, `district` | string | existentes |
| `email` | string, **opcional** para clientes creados por el admin | hoy se inventa `cliente_{dni}@gyacompany.com`; se deja de hacer |
| `notes` | string ≤ 500, opcional | **nuevo** |
| `isActive` | boolean, por defecto `true` | **nuevo** |
| `userId`, `role` | string | existentes (cliente registrado: id = uid) |
| `createdAt`, `updatedAt` | Timestamp | |

### `presupuestos/{numero}` (id = `PRES-0001`)

Solo lo escribe la function con Admin SDK.

| Campo | Tipo | Nota |
| --- | --- | --- |
| `numero` | string `^PRES-\d{4,}$` | igual al id |
| `estado` | `borrador \| enviado \| aprobado \| rechazado` | |
| `clienteId` | string | referencia a `clientes` |
| `cliente` | `{ fullName, dniRuc, contactName?, phone, email?, address, district }` | **copia** tomada al guardar: el presupuesto no cambia si luego se edita el cliente |
| `items[]` | `{ productoId?, sku?, descripcion, tipo: 'producto'\|'servicio', unidad, cantidad, precioUnitario, importe }` | 1 a 100 líneas; `importe` lo calcula la function |
| `subtotal`, `igv`, `total` | number | calculados en la function |
| `igvRate` | number (0.18) | se guarda con el documento |
| `moneda` | `'PEN'` | |
| `validezDias` | int 1–90 | |
| `venceEl` | Timestamp \| null | `enviadoEl + validezDias`; se fija al pasar a `enviado` |
| `notas` | string ≤ 1000 | |
| `pdf` | `{ path, generadoEl, version } \| null` | ruta en Storage |
| `creadoPor`, `actualizadoPor` | uid | |
| `createdAt`, `updatedAt`, `enviadoEl`, `resueltoEl` | Timestamp | |

### `contadores/presupuestos-formales`

`{ seq: number }`. Lo lee y escribe solo la function dentro de la transacción. El id no coincide con los patrones que ya abren las reglas (`presupuesto-AAAA`, `pedidos-*`), así que queda denegado al cliente por el cierre por defecto.

### Transiciones de estado

`borrador → enviado → aprobado | rechazado`. Solo un `borrador` se edita. `aprobado` y `rechazado` son finales. No se borra un presupuesto (el correlativo no deja huecos); ver D3.

## 3. Reglas de seguridad

### `firestore.rules`

- `isAdmin()` queda **solo con el claim**: `isSignedIn() && request.auth.token.get('role', '') == 'admin'`. Se quita el `exists/get` de `users/{uid}`. `users/{uid}.role` pasa a ser un dato informativo.
- `presupuestos/{id}`: `allow read: if isAdmin(); allow create, update, delete: if false;` Se elimina la lectura por `userId` (el cliente no ve presupuestos formales).
- `productos`: sin cambio de permisos (lectura pública, escritura admin). Se agrega validación mínima en escritura: `unit` dentro del enum, `unitPrice is number && > 0`, `isActive is bool`.
- `clientes`: la rama admin se mantiene; se agregan a `hasOnly` del registro propio los campos nuevos **solo si** el registro público los envía (no los envía: no cambia).
- `contadores`: sin cambios; `presupuestos-formales` queda cerrado.

### `storage.rules`

```
match /presupuestos/{presupuestoId}/{archivo} {
  allow read: if isAdmin();
  allow write, delete: if false;   // solo la function (Admin SDK)
}
```

Va antes de la regla genérica `/{collection}/{entityId}/{allPaths=**}`, que ya excluye `presupuestos` por su lista blanca.

### Pruebas de reglas

Casos nuevos en `tests/rules/firestore.rules.test.mjs`: admin con claim lee `presupuestos`; usuario con `users/{uid}.role = 'admin'` pero **sin claim** queda denegado; nadie escribe `presupuestos` ni `contadores/presupuestos-formales` desde el cliente.

## 4. Cloud Functions

Todas `onCall` (v2, `us-central1`, `maxInstances: 10`), porque traen el token verificado. Cada una empieza con el mismo guard nuevo `requireAdmin(request)` → `unauthenticated` si no hay sesión, `permission-denied` si `request.auth.token.role !== 'admin'`. Entrada validada con los schemas de `@gya/shared`; error de validación → `invalid-argument`.

El CRUD de productos y clientes sigue escribiendo a Firestore desde el cliente bajo reglas: no necesita function.

| Function | Entrada | Qué hace | Salida |
| --- | --- | --- | --- |
| `setAdminRole` | `{ email: string, admin: boolean }` | Busca el usuario, pone o quita el claim `role`, refleja en `users/{uid}.role`. Un admin no puede quitarse el rol a sí mismo | `{ uid, role }` |
| `guardarPresupuesto` | `{ numero?: string, clienteId, items: [{ productoId?, descripcion, unidad, cantidad, precioUnitario }], validezDias, notas? }` | En **una transacción**: lee el cliente (debe existir y estar activo), completa `sku`/`tipo` desde `productos` cuando hay `productoId`, calcula importes, subtotal, IGV y total. Sin `numero`: incrementa el contador y crea `PRES-000N` en `borrador`. Con `numero`: actualiza solo si está en `borrador` (`failed-precondition` si no) | `{ numero, estado, subtotal, igv, total }` |
| `cambiarEstadoPresupuesto` | `{ numero, estado: 'enviado' \| 'aprobado' \| 'rechazado' }` | Valida la transición en transacción; fija `enviadoEl` + `venceEl` o `resueltoEl` | `{ numero, estado, venceEl? }` |
| `generarPresupuestoPdf` | `{ numero }` | Lee el documento, arma el PDF A4 con membrete (`companyData` de `@gya/shared`), lo guarda en `presupuestos/{numero}/{numero}-v{n}.pdf` y actualiza `pdf` | `{ path, version }` |

El precio unitario llega del admin (puede ajustarlo por línea, como pide el alcance); la function nunca acepta `importe`, `subtotal`, `igv` ni `total` del cliente.

**Cálculo (función pura en `@gya/shared`, `calcularTotales`)**: en céntimos enteros. `importe = round(cantidad × precioUnitario × 100)`, `subtotal = Σ importe`, `igv = round(subtotal × 0.18)`, `total = subtotal + igv`. La web usa la misma función solo para la vista previa mientras se edita; lo que vale es lo que devuelve la function.

**Contrato:** `docs/api/openapi.json` describe los endpoints HTTP y no cambia. El contrato de las callables son los schemas de `@gya/shared` (se documenta en `docs/api/README.md`).

## 5. Paquete compartido

Archivos nuevos en `packages/shared/src/`:

- `schemas/presupuesto-schema.ts`: `presupuestoItemInputSchema`, `guardarPresupuestoInputSchema`, `cambiarEstadoInputSchema`, `presupuestoSchema`, `estadoPresupuestoSchema`, `unidadSchema` y sus tipos.
- `schemas/cliente-crm-schema.ts`: `clienteCrmSchema` (correo opcional, `contactName`, `notes`, `isActive`).
- `lib/presupuesto-totales.ts`: `IGV_RATE`, `calcularTotales`, `formatNumeroPresupuesto(seq)`.
- `schemas/ecommerce-schemas.ts`: agregar `ml` a `unit`. `budgetSchema`/`budgetItemSchema` (correlativo aleatorio, estados distintos) quedan marcados como obsoletos; los usan `quoteSummary.ts`, `quoteCalculator.ts` y un test, así que no se borran en este trabajo.

> **Cambio durante la implementación (16/11/2026):** no se empaquetaron las functions. En su lugar,
> `scripts/sync-shared-to-functions.mjs` (`pnpm run shared:sync`) transpila a CommonJS los módulos
> de `@gya/shared` que usan las functions y los deja en `apps/functions/src/shared/`; un test falla si
> la copia queda desactualizada. Así no cambia cómo se construyen ni se despliegan las tres functions
> que ya están en producción (`main` sigue siendo `index.js`, sin `predeploy`). Tampoco se creó
> `apps/functions/assets/`: el membrete del PDF es tipográfico, como el de la hoja del cotizador.

**Problema a resolver en la Fase 0 (propuesta original, no aplicada):** `@gya/shared` es TypeScript sin compilar y `apps/functions` es CommonJS que se despliega solo (`firebase.json` → `source: apps/functions`); una dependencia `workspace:*` no se resuelve en Cloud Build. Propuesta:

1. `@gya/shared` gana un `build` con `tsup` (salida CJS + tipos en `dist/`) y un export condicional `require → dist`, manteniendo `import/types → src` para la web.
2. `apps/functions` empaqueta con `esbuild` a `apps/functions/lib/index.js` (externos: `firebase-admin`, `firebase-functions`), `main` apunta ahí y `firebase.json` agrega `predeploy`.
3. Se alinea la versión de `zod` entre ambos paquetes.

Las tres functions actuales y sus schemas JS no se reescriben.

## 6. Rutas y pantallas (Next.js, export estático)

Sin rutas dinámicas nuevas: el detalle va por query, como `/proyectos/ver?id=`. Cada `page.tsx` solo renderiza su pantalla.

| Ruta | Pantalla | Estado |
| --- | --- | --- |
| `/admin/inventario` | `InventoryDashboardScreen` | Se amplía: pestaña o filtro "Servicios", buscador, editar, activar/desactivar |
| `/admin/clientes` | `ClientManagementScreen` | Se amplía: editar, activar/desactivar, contacto |
| `/admin/presupuestos` | `AdminPresupuestosScreen` | Dos pestañas: "Presupuestos" (PRES) y "Solicitudes de la web" (GYA, lo actual) |
| `/admin/presupuestos/editor?numero=` | `BudgetEditorScreen` (nueva) | Sin `numero` = nuevo |
| `/admin/presupuestos/ver?numero=` | `BudgetDetailScreen` (nueva) | Detalle, cambio de estado, generar y descargar PDF |

**Capas (FSD, siempre por alias):**

- `entities/budget/` (nueva): `model` (reexporta tipos de `@gya/shared`), `api/budgetsRepository.ts` (lecturas con `onSnapshot`, filtro por estado y texto en memoria con `limit(200)`: no requiere índice compuesto), `api/budgetFunctions.ts` (`httpsCallable`), `ui/BudgetStatusBadge.tsx`, `ui/BudgetTotals.tsx`.
- `entities/client/api/clientsRepository.ts`: `updateClient`, `setClientActive`.
- `features/admin/components/budgets/`: `BudgetItemsEditor.tsx`, `BudgetClientPicker.tsx`, `BudgetForm.tsx`.
- `shared/lib/firebase.ts`: `getFirebaseFunctions()` perezoso, con emulador en `:5001` si `NEXT_PUBLIC_USE_EMULATORS=true`.
- `features/auth/context/AuthContext.tsx`: el rol sale de `getIdTokenResult()` (`claims.role`), no de `getUserRoleDoc`.
- `widgets/AdminNav` y `widgets/AdminLayout`: entrada "Presupuestos".

**Se reutiliza:** `AdminRouteGuard` y `app/admin/layout.tsx`; `AdminNav`; `FormModalShell` / `AdminDialog`; `ConfirmDeleteDialog`; `AdminRowActions`; `NewClientModal` y `CreateProductModal` (pasan a servir también para editar); el patrón de `screens/Admin/sales/` (`ProductPickerCard`, `ClientDataCard`, `OrderSummaryCard`) para el editor de líneas; primitivas de `@/shared/ui` (`button`, `field`, `badge`, `dialog`, `native-select`, `empty-state`, `skeleton`, `toaster`, `confirm-dialog`); `formatSoles` de `@/entities/quote`; `exportToExcel`; `logger`. Sin hex, `rgba` ni `colorPalette` a mano; mobile-first; áreas táctiles ≥ 44 px. Los textos pasan por el agente `copy-vidrieria` (trato de usted).

El CSP de `firebase.json` ya permite `us-central1-gya-app-4c8a9.cloudfunctions.net` y Storage: no cambia.

## 7. Fases

Validación de cada fase: `pnpm run typecheck && pnpm run lint && pnpm run build`. Las pruebas se escriben en cada fase y se corren cuando el dueño lo pida (CI las corre siempre). Nada se despliega sin pedido; todo se prueba antes en el emulador.

### Fase 0. Paquete compartido y build de functions

- Crear: `packages/shared/src/schemas/presupuesto-schema.ts`, `cliente-crm-schema.ts`, `lib/presupuesto-totales.ts`, `packages/shared/tsup.config.ts`, `apps/functions/build.mjs`, `apps/web/tests/unit/presupuesto-totales.test.ts`.
- Modificar: `packages/shared/package.json`, `src/index.ts`, `src/schemas/index.ts`, `ecommerce-schemas.ts`; `apps/functions/package.json`; `firebase.json` (`predeploy`); `.gitignore` (`dist/`, `lib/`).
- **Terminado cuando:** una function de prueba que importa `@gya/shared` carga en el emulador de functions, los tres endpoints actuales siguen respondiendo y los gates pasan.

### Fase 1. Admin por custom claim

- Crear: `scripts/set-admin-claim.mjs` (arranque: asigna el claim a los correos admin con Admin SDK), `apps/functions/src/guards/requireAdmin.js`, `apps/functions/src/callable/setAdminRole.js`, `apps/functions/test/requireAdmin.test.js`.
- Modificar: `apps/functions/index.js`, `AuthContext.tsx`, `AdminRouteGuard.tsx` (mensaje), `firestore.rules`, `tests/rules/firestore.rules.test.mjs`, `shared/lib/firebase.ts`.
- Orden obligatorio al desplegar: **claims → frontend → reglas**. Si las reglas van primero, los admin pierden acceso.
- **Terminado cuando:** en el emulador, un usuario con claim entra a `/admin` y uno con solo `users/{uid}.role = 'admin'` no; las pruebas de reglas lo cubren.

### Fase 2. Productos y servicios

- Modificar: `InventoryDashboardScreen.tsx`, `screens/Admin/inventory/ProductTable.tsx` y `SearchFilters.tsx`, `features/admin/components/inventory/CreateProductModal.tsx` y `productForm.ts`, `productService.ts` (`setProductActive`), `firestore.rules` (validación de escritura).
- **Terminado cuando:** se crea, edita, desactiva y busca un producto y un servicio con unidad m², ml o und; un ítem inactivo no aparece en el selector de presupuestos.

### Fase 3. Clientes

- Modificar: `clientsRepository.ts`, `ClientManagementScreen.tsx`, `NewClientModal.tsx`, `newClientForm.ts`, `entities/client/ui/ClientCard.tsx`, `entities/client/model/index.ts`.
- **Terminado cuando:** se crea, edita, desactiva y busca un cliente con RUC o DNI, sin correo inventado; el registro público de clientes sigue funcionando igual.

### Fase 4. Functions de presupuesto

- Crear: `apps/functions/src/callable/guardarPresupuesto.js`, `cambiarEstadoPresupuesto.js`, `src/services/presupuestoService.js`, `test/presupuesto.test.js` (totales, correlativo con llamadas concurrentes, transiciones, rechazo sin claim; usa `test/fakeDb.js`).
- Modificar: `apps/functions/index.js`, `firestore.rules`, `tests/rules/firestore.rules.test.mjs`, `docs/api/README.md`.
- **Terminado cuando:** en el emulador, dos altas simultáneas dan `PRES-0001` y `PRES-0002` sin repetir; los totales guardados coinciden con `calcularTotales`; el cliente no puede escribir `presupuestos`.

### Fase 5. Pantallas de presupuesto

- Crear: `entities/budget/**`, `features/admin/components/budgets/**`, `screens/Admin/BudgetEditorScreen.tsx`, `BudgetDetailScreen.tsx`, `app/admin/presupuestos/editor/page.tsx`, `app/admin/presupuestos/ver/page.tsx`.
- Modificar: `AdminPresupuestosScreen.tsx`, `widgets/AdminNav/AdminNav.tsx`, `widgets/AdminLayout/AdminLayout.tsx`, `AdminHubScreen.tsx`.
- **Terminado cuando:** de punta a punta en el emulador: elegir cliente, agregar líneas, guardar borrador, editar, enviar, aprobar o rechazar; correcto a 360 px.

### Fase 6. PDF

- Crear: `apps/functions/src/callable/generarPresupuestoPdf.js`, `src/templates/presupuestoPdf.js`, `apps/functions/assets/` (logo), `test/presupuestoPdf.test.js`.
- Modificar: `apps/functions/package.json` (librería de PDF), `storage.rules`, `BudgetDetailScreen.tsx`.
- **Terminado cuando:** el PDF A4 muestra membrete, cliente, líneas, subtotal, IGV, total, validez y número; queda en Storage y solo un admin lo descarga.

### Fase 7. Cierre

- Modificar: `docs/05_CHANGELOG.md`, `docs/PENDIENTES.md`, `docs/01_ARCHITECTURE.md`, `AGENTS.md` (endpoints y entidad `budget`), `apps/functions/README.md`.
- Despliegue, solo con pedido: functions → claims → hosting → reglas.

## 8. Riesgos

- **Bloqueo de admins** si las reglas solo-claim se despliegan antes de asignar los claims. El token además tarda hasta 1 h en refrescarse: hay que cerrar y abrir sesión.
- **Empaquetado de functions:** cambia cómo se construyen y despliegan las tres functions en producción. Se valida en la Fase 0 antes de construir encima.
- **`PENDIENTES.md` marca "en pausa" los cambios en `apps/functions`** (P27–P33) y el endurecimiento de `contadores` (P7). Este pedido los reabre solo para lo nuevo.
- **`productos` es de lectura pública e incluye `costPrice`:** cualquiera puede leer el costo. Existe hoy; conviene mover el costo a una colección solo admin.
- **Datos ya guardados:** `productService` hace `productSchema.parse` al leer; un cambio de schema no puede invalidar documentos existentes (campos nuevos opcionales o con valor por defecto).
- **Contingencia local de `orderService`** (guarda en `localStorage` si Firestore rechaza): no se replica en presupuestos; si la function falla, se muestra el error.
- **Costo:** functions v2 y Storage exigen plan Blaze (ya activo por las functions actuales).
- **App Check** no se activa en las callables (en espera por P7).

## 9. Decisiones pendientes del dueño

- **D1.** ¿Los `unitPrice` de `productos` están sin IGV? El plan asume que sí. `QuoteSheet` dice "Precios incluyen IGV" y `pricing.ts` dice "sin IGV".
- **D2.** ¿El recargo del 5 % por tarjeta (P9) aplica al presupuesto formal? El plan no lo incluye.
- **D3.** ¿Se necesita anular un presupuesto o marcarlo vencido? Hoy: cuatro estados y "vencido" solo como aviso calculado con `venceEl`.
- **D4.** Texto de condiciones del PDF: validez por defecto, forma de pago, cuentas, plazo de entrega y garantía. No se inventan: marcador visible hasta tenerlos.
- **D5.** ¿Qué correos reciben el claim? Se asume `luis.j.cueva@gmail.com`, `acueva@gyacompany.com` y `admin@gyacompany.com` (P2).
- **D6.** Librería de PDF: `pdfkit` (propuesta) o `pdf-lib`.
- **D7.** ¿Una solicitud web `GYA-…` debe poder convertirse en presupuesto `PRES-…`? No incluido; el modelo admite un campo `solicitudOrigen` después.

## 10. Verificación

1. Gates: `pnpm run typecheck && pnpm run lint && pnpm run build`.
2. Emuladores: `firebase emulators:start --only auth,firestore,storage,functions --project gya-app-4c8a9` y `NEXT_PUBLIC_USE_EMULATORS=true pnpm run dev`.
3. Recorrido manual a 360 px y escritorio: alta de producto y servicio, alta de cliente, presupuesto completo hasta el PDF.
4. Con pedido del dueño: `pnpm run test:functions`, `node tests/rules/firestore.rules.test.mjs` y `pnpm --filter @gya/web exec vitest run tests/unit/presupuesto-totales.test.ts`.
