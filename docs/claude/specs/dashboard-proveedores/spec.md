# Spec: Dashboard admin con catálogo de proveedores y pedido de compra

> Estado: **borrador** a partir de `plan.md` (aprobado por el dueño). El plan es la fuente de verdad; lo que el plan no dice queda como **[POR DEFINIR]** y no se inventa.
> Convención: los requisitos siguen el orden del plan. Las preguntas abiertas van a `entrevista.md` (tarea 0.4).

## 1. Problema

- El panel admin tiene servicios, proyectos, inventario, ventas, reportes, clientes y presupuestos, pero no tiene pedidos a proveedor ni módulo de sistemas.
- Los catálogos de los 4 proveedores (Corrales, Eduhg, HPD Glass y Favitem) viven en un backend aparte (`proveedor_info`, FastAPI en `localhost:8000`) que solo funciona en local. La web es un export estático y no puede depender de esa API.
- Armar un pedido de compra y crear los sistemas de cada servicio hoy es manual y está fuera del panel.
- Datos de partida (según el plan): 435 registros (Corrales 386, Eduhg 29, HPD Glass 20 fichas). Favitem tiene 0 productos. Ningún registro tiene precio. 99 registros no tienen categoría.

## 2. Objetivo

Un sistema de pedidos para los 4 proveedores y un catálogo de servicios actualizado con los sistemas de esos proveedores, accesible solo desde el panel admin.

## 3. Alcance

### Dentro

1. Script de sincronización API → Firestore (`scripts/sync-proveedores.mjs`): copia de productos y descarga de imágenes y documentos.
2. Acceso de lectura a los catálogos solo para administradores.
3. Módulo `entities/supplier` (modelo, repositorio y hook) para leer el catálogo desde Firestore.
4. Sistemas por servicio creados en **borrador** desde los estudios de catálogos; el dueño publica o elimina.
5. Pedido de compra en `/admin/pedidos`: búsqueda de productos, carrito, agrupación por proveedor, hoja A4 imprimible y aprobación.
6. Menú del panel con Pedidos, Sistemas y Presupuestos; tarjetas en el hub del panel.
7. Revisión a 360 px de las pantallas nuevas.

### Fuera

- Gestión de estados de presupuestos.
- Rol vendedor (por ahora solo admin).
- Cambios en las páginas públicas y en el cotizador.
- Despiece de taller.
- Deploy de reglas, hosting o functions (solo con pedido explícito del dueño).
- Push y merge a `main` (solo con pedido explícito del dueño).
- Bot vendedor.
- Uso del RAG (`POST /asistente/consultar`) para cargas masivas: tiene cuota gratuita.
- Escritura en Firestore real (`--prod`) hasta que el dueño lo autorice. Todo corre en el emulador.
- Perfiles de aluminio como productos: no están en la API; solo aparecen en las fichas y en `docs/proveedores/*_base_conocimiento.md`.

## 4. Usuarios

- **Administradores:** solo los 3 correos admin del panel. El acceso se valida con `isAdmin()` en las reglas de Firestore y Storage y con `AdminRouteGuard` en la web.
- **Cliente (visitante):** nunca ve proveedores. Ni nombres, ni fotos, ni planos. De los proveedores solo se usan textos y datos técnicos en los sistemas publicados.

## 5. Requisitos funcionales

### Sincronización (Fase 1)

- **RF1.** El script comprueba `/salud` de la API antes de nada. Si la API está apagada, sale sin escribir nada.
- **RF2.** El script pagina `GET /productos` (filtros `proveedor`, `q`, `categoria`, `tipo`, `limit`, `offset`) y escribe cada producto en `proveedores_productos/{proveedor}_{cod}`.
- **RF3.** Los productos que ya no vienen de la API se marcan `activo: false`; no se borran.
- **RF4.** El script usa el emulador por defecto. Escribir en Firestore real requiere la opción `--prod` y el visto bueno del dueño.
- **RF5.** Una función aparte sube las imágenes de `/static/img/...` a Storage en `proveedores/{proveedor}/{cod}.png` y refresca `docs/proveedores/*.md` desde `GET /asistente/documentos/{proveedor}`.
- **RF6.** Una segunda corrida sin cambios no altera datos.
- **RF7.** La copia local de Gemini en `apps/web/src/shared/data/proveedores/` se retira (no tiene uso). El archivo `catalogo-proveedores-servicios.ts` se mueve a `docs/gemini/data/` como insumo del estudio.

### Acceso a datos (Fase 1)

- **RF8.** Las colecciones `proveedores_productos`, `sistemas`, `pedidos_proveedor` y la ruta `proveedores/**` de Storage solo permiten lectura y escritura a `isAdmin()`.
- **RF9.** Los casos nuevos quedan cubiertos en `tests/rules/firestore.rules.test.mjs`. Un cliente no lee `proveedores_productos`, ni `sistemas` en borrador, ni `pedidos_proveedor`.
- **RF10.** `entities/supplier` expone modelo, repositorio y hook de lectura (patrón `entities/product/api/useRealtimeProducts.ts`). Este módulo desbloquea la Fase 3.

### Sistemas (Fase 2)

- **RF11.** Se hace un estudio de sistemas en tres bloques: ventanas, mamparas y puertas de aluminio; ducha, parapeto, baranda, puerta de vidrio y frenos; techos, celosías, espejos y vidrios. Cada estudio entrega un documento con su página de origen.
- **RF12.** Cada sistema tiene: `serviceSlug`, `nombre`, `aliases: [{ proveedor, denominacion }]`, `tipoApertura`, `perfiles`, `accesorios: [{ proveedor, cod }]`, `vidrio`, `descripcion`, `fuente`, `estado: 'borrador' | 'publicado'` y `pricePending: true`.
- **RF13.** Los sistemas se cargan en `borrador`. El script de carga crea solo los que no existan.
- **RF14.** Los textos de los sistemas los redacta el agente `copy-vidrieria`: la empresa ensambla e instala; sin garantías ni porcentajes inventados; un marcador visible donde falte un dato.
- **RF15.** En `/admin/sistemas` se puede publicar o eliminar cada sistema en borrador (`AdminRowActions`, `ConfirmDeleteDialog`). Hay un botón "Cargar sistemas".
- **RF16.** Un sistema sin precio confirmado se muestra como "Precio a definir" (`pricePending: true`).
- **RF17.** `AGENTS.md` §3 se actualiza: el catálogo oficial pasa a ser `sistemas` con `estado = 'publicado'`.

### Pedido de compra (Fase 3)

- **RF18.** En `/admin/pedidos` se busca producto por código, nombre, categoría y proveedor, con foto cuando la hay.
- **RF19.** Las líneas se agrupan por proveedor. El subtotal de cada proveedor es el total de sus líneas, o `null` si falta un precio. Esta lógica replica `POST /cotizar` sin depender de la API.
- **RF20.** Si falta un precio, el bloque muestra "Sin información de precio".
- **RF21.** El pedido se guarda en `pedidos_proveedor/{número}` con `createdBy`, `estado` (`borrador` → `por aprobar` → `aprobado`), líneas y fecha. El correlativo sigue el patrón de `entities/quote/lib/quoteNumber.ts`.
- **RF22.** La hoja A4 tiene una sección por proveedor, se imprime con `window.print()` y usa la estructura de `QuoteSheet.tsx` y los datos de `companyData`. Si el membrete será completo o simple, depende de la pregunta 5 del plan.
- **RF23.** La lista de pedidos muestra el estado y un botón Aprobar.

### Menú y cierre (Fase 4)

- **RF24.** `AdminNav` incluye Pedidos, Sistemas y Presupuestos. (`/admin/presupuestos` hoy no está en el menú.)
- **RF25.** `AdminHubScreen` muestra tarjetas de Pedidos y Sistemas.
- **RF26.** Las pantallas nuevas se revisan a 360 px con el agente `espaciado-360`; los ajustes los aplica una tarea Haiku.
- **RF27.** Al cierre, el changelog (`docs/05_CHANGELOG.md`), `docs/PENDIENTES.md` y `tasks.md` quedan al día.

## 6. Requisitos no funcionales

- **RNF1.** La web sigue siendo export estático. El panel lee Firestore y no llama a `localhost:8000`. Funciona con la API apagada.
- **RNF2.** Los nombres de proveedor y sus fotos o planos no aparecen en `apps/web/out/` fuera de los chunks de `/admin`.
- **RNF3.** Los textos suenan naturales y del rubro (vidrio y aluminio), con trato de usted y "antirruido" escrito así.
- **RNF4.** Las pantallas nuevas funcionan a 360 px y 1280 px, sin desbordes horizontales, con áreas táctiles de 44 px y tokens del tema.
- **RNF5.** Cada fase cierra con `pnpm run typecheck && pnpm run lint && pnpm run build` en verde, antes del commit de control. `pnpm run test:run` no se ejecuta salvo pedido del dueño.
- **RNF6.** Fronteras FSD: ninguna feature importa otra feature; ninguna pantalla importa otra pantalla.
- **RNF7.** Los datos de la empresa salen solo de `companyData`. Nada se inventa: lo que falte queda como marcador visible.
- **RNF8.** Cada tarea toca como máximo 3 archivos y tiene un criterio de hecho comprobable.
- **RNF9.** Un commit de control por fase (`docs(dashboard)`, `feat(proveedores)`, `feat(sistemas)`, `feat(pedidos)`, `feat(admin)`). Sin push, sin merge y sin deploy.

## 7. Modelo de datos

### `proveedores_productos/{proveedor}_{cod}`

| Campo | Descripción |
| --- | --- |
| `activo` | `true` mientras la API lo entregue; `false` cuando deja de venir (RF3). |

Los demás campos (código, nombre, categoría, tipo, foto, etc.) se toman de la respuesta de `GET /productos`. La lista exacta se fija en la tarea 1.1 al leer la API. **[POR CONFIRMAR EN 1.1]**

Imágenes: Storage `proveedores/{proveedor}/{cod}.png`.

### `sistemas/{id}`

| Campo | Descripción |
| --- | --- |
| `serviceSlug` | Servicio al que pertenece el sistema. |
| `nombre` | Nombre del sistema. |
| `aliases` | Lista de `{ proveedor, denominacion }`. Un mismo sistema puede tener nombres distintos por proveedor. |
| `tipoApertura` | Tipo de apertura. |
| `perfiles` | Perfiles que lo componen. |
| `accesorios` | Lista de `{ proveedor, cod }`. |
| `vidrio` | Tipo de vidrio. |
| `descripcion` | Texto para la página, redactado por `copy-vidrieria`. |
| `fuente` | Documento y página de origen del estudio. |
| `estado` | `'borrador'` o `'publicado'`. |
| `pricePending` | `true` mientras no haya precio confirmado. |

### `pedidos_proveedor/{número}`

| Campo | Descripción |
| --- | --- |
| `createdBy` | Quién creó el pedido. |
| `estado` | `borrador` → `por aprobar` → `aprobado`. |
| `lineas` | Productos del pedido, agrupables por proveedor. |
| `fecha` | Fecha de creación. |

## 8. Casos límite

| Caso | Comportamiento |
| --- | --- |
| API apagada | El script sale sin escribir y avisa. El panel sigue leyendo Firestore. |
| Producto sin precio | Ningún registro tiene precio hoy. El bloque del proveedor muestra "Sin información de precio" y el subtotal es `null`. |
| Producto sin foto | Eduhg trae 26 herrajes sin foto. Se muestran sin imagen. Si se muestran igual en el pedido, depende de la pregunta 3 del plan. **[POR DEFINIR]** |
| Producto sin categoría | 99 registros. No se excluyen; aparecen en la búsqueda por código, nombre y proveedor. |
| Favitem sin productos | La API devuelve 0 productos; solo hay un documento de 4 KB. Los kits de ducha y accesorios de acero se cargan a mano o los recolecta el bot, según la pregunta 2 del plan. **[POR DEFINIR]** |
| Mismo sistema con nombres distintos por proveedor | Un solo sistema con `aliases` por proveedor; no se duplica. |
| Pedido con un solo proveedor | El plan no fija un caso especial. Se muestra un único bloque de proveedor. **[POR CONFIRMAR]** |
| Pedido vacío | El plan no lo define. No se permite aprobar un pedido sin líneas. **[POR CONFIRMAR]** |
| Producto que desaparece de la API | Se marca `activo: false` y no se borra (RF3). Los pedidos ya guardados conservan su línea. |
