# Plan de trabajo — OpenCode, agentes y capa `entities/`

- **Estado:** fase 2 cerrada; pendientes de aprobación en §6 y §8.
- **Última actualización:** 2026-11-11.
- **Alcance:** aplicación real de Feature-Sliced Design en `apps/web/src`, perfiles de agente de OpenCode y arreglo de la experiencia de permisos.
- **Excepción de carpeta:** `docs/README.md` pide que los planes vivan en `PENDIENTES.md`. Este archivo existe por pedido explícito del dueño; el seguimiento de trabajo abierto se refleja también en `PENDIENTES.md`.

---

## 1. Resumen ejecutivo

| Frente | Estado | Evidencia |
|---|---|---|
| P0 — primitivas UI a `shared/ui` y fronteras FSD en ESLint | ✅ terminado y commiteado | `486e1a29` (157 archivos) |
| Agentes de OpenCode (`qa-verify`, `frontend-fsd`, `ux-reviewer`) | ✅ creados, probados y con permisos verificados | `486e1a29`, `f2413fcf` |
| Fase 1 — diagnóstico y mapa de `entities/` | ✅ terminado y commiteado | `26227d08` · `docs/03_ENTITIES.md` |
| Fase 2 — lotes 2.1 a 2.7 | ✅ siete lotes, un commit cada uno | `5fb6399b` · `e7e8ce55` · `2d5c2d4f` · `521aaebb` · `7dcd44b9` · `1f99f5c0` · `4c1286ee` |
| Fase 3 — `features → features` como error | ✅ activo y probado con import ilegal | `8aae92f0` |
| Arreglo de prompts de permiso del agente principal | ⬜ pendiente de aprobación | no existe `opencode.json` (ver §6) |

**Verificación de cierre de la fase 2** (todos en verde, ejecutados desde la raíz):

| Gate | Comando usado | Resultado |
|---|---|---|
| typecheck | `node apps/web/node_modules/typescript/bin/tsc --noEmit -p apps/web/tsconfig.build.json` | exit 0 |
| lint | `node node_modules/eslint/bin/eslint.js src/` (cwd `apps/web`) | 0 errores · 2 warnings previos (`ImageReveal.tsx`, `Gallery.tsx`) |
| build | `node node_modules/next/dist/bin/next build --webpack` (cwd `apps/web`, con `NODE_PATH`, ver §7) | 70 páginas generadas |

---

## 2. Hecho: P0 y agentes

### P0.1 — Primitivas UI ✅
- `src/components/ui/` → `src/shared/ui/` (20 archivos, 114 imports actualizados).
- Colisión con `shared/components/ui` resuelta.
- `ErrorView` → `shared/components`; `QuoteSheet` → `entities/quote/ui`; modales de Admin → `features/admin/components`.
- Sin dependencias nuevas.

### P0.2 — Fronteras FSD en ESLint ✅
- `apps/web/eslint.config.js`: `no-restricted-imports` con orden `app > screens > widgets > features > entities > shared`.
- Validado inyectando un import ilegal: el lint falla como debe.

### P0.3 — Agentes de OpenCode ✅

| Agente | Archivo | Alcance verificado |
|---|---|---|
| `qa-verify` | `.opencode/agents/qa-verify.md` | Corre gates y reporta. Escritura bloqueada. |
| `frontend-fsd` | `.opencode/agents/frontend-fsd.md` | Edita `apps/web/src/**` y `docs/**`. `apps/functions` bloqueado. |
| `ux-reviewer` | `.opencode/agents/ux-reviewer.md` | Solo lectura: marca, copy, UX, WCAG AA. |

Descartados a propósito: `fullstack`, `backend-dev`, `diseñador web`, `ui-dev` (se solapan o chocan con el backend congelado). `backend-firebase` queda en espera hasta descongelar `apps/functions`.

**Regla aprendida (crítica para futuros agentes):** en subagentes, `effect: ask` se resuelve como **permitido**. Solo `deny` es un límite real. Por eso `qa-verify` usa lista blanca de shell y `frontend-fsd` tiene `deny` explícito a `Set-Content`, `Out-File`, `New-Item`, `Move-Item`, `Copy-Item`, `Remove-Item`, `git commit`, `git push`, `pnpm add` y `pnpm install`.

---

## 3. Hecho: fase 1 (diagnóstico)

Documento entregable: [`docs/03_ENTITIES.md`](./03_ENTITIES.md).

Hallazgos medidos sobre 376 archivos de `features/`:

| Hallazgo | Número real |
|---|---|
| Imports feature → feature | **10 líneas en 8 pares** |
| Ciclo de dependencia | **1**: `home ↔ location` |
| Doble suscripción a Firestore | `useLocationData.ts:62-63` |
| Schemas que mezclan modelos | `ecommerce-schemas.ts` mezcla 5 |
| Repositorios de entidad en `shared` | `clients`, `projects`, `services` |
| Entidades propuestas | **8**: product, order, client, project, service, quote, store, window |

Decisiones D1–D8 y orden de migración en 7 lotes están en `03_ENTITIES.md` §4 y §6.

---

## 4. Hecho: fase 2 — ocho entidades y dos widgets

Cada lote se verificó con los tres gates y se commiteó solo, sin mezclar entidades.

### Lote 2.1 — `entities/project` ✅ `5fb6399b`
```
apps/web/src/entities/project/
├── index.ts                          (barrel público)
├── README.md                         (movido desde features/projects)
├── model/index.ts                    (reexporta Project/ProjectPhoto/MapProject)
├── api/projectsRepository.ts         ← shared/api/firebase/
├── api/useProjects.ts                ← features/projects/hooks/
├── api/projectMappers.ts             ← features/projects/hooks/
├── api/useMapProjects.ts             ← features/home/hooks/   (D3/D8)
└── ui/
    ├── ProjectCard.tsx
    ├── ProjectCardContent.tsx
    ├── ProjectDetailItem.tsx
    ├── ProjectSkeletons.tsx
    ├── ProjectsList.tsx
    └── modal/{MapViewer,VisualViewer}.tsx
```
- `features/projects/` eliminado (incluido su `index.ts`); `features/home/hooks/` quedó vacío y se retiró.
- `useMapProjects` bajó en este mismo lote: rompe el ciclo `home ↔ location` y deja a `location` dependiendo solo de `entities/project` (D3 + D8).
- `eslint.config.js` actualizado a `src/entities/project/ui/modal/VisualViewer.*`; el badge de `/design-system` pasó a `entities/project`.

**Aprendizaje:** el barrel de la entidad no puede importarse desde un Server Component si exporta hooks o modales con `dynamic(ssr: false)`. `HomeView` importa `@/entities/project/ui/ProjectsList` directo y así el build no arrastra `useProjects` ni `VisualViewer`.

### Lote 2.2 — `entities/service` ✅ `e7e8ce55`
- `servicesRepository`, `useServices`, `serviceMappers` → `api/`.
- `ServiceCard`, `ServiceList`, `ServiceSkeletons` → `ui/`; la feature conserva solo el detalle (`ServicePageLayout`, `ServiceHeader`, `ServiceBentoGrid`, `ServiceFaqSection`).
- `getServiceHref` → `lib/getServiceHref.ts` (D5).
- `features/services/types.ts` → `entities/service/model` (incluye `ServiceListItem` y `ServicePageData`); se actualizaron los 4 consumidores de la feature.
- `publicRest.ts` no cambió: lee por REST y no importa el repositorio.

### Lote 2.3 — `entities/window` + `entities/quote` ✅ `2d5c2d4f`
- `entities/window/model`: `SystemType`, `GlassType`, `AluminumColor` (D6). `ai-simulator` ya no importa `presupuesto`.
- `entities/quote`: `config/pricing.ts`, `lib/{quoteCalculator,quoteLines,quoteSummary,quoteNumber}`, `model` (`QuoteLineInput`, `QuoteCustomer`, `QuoteRequestParams`), `ui/QuoteSheet`.
- La feature conserva el wizard, el schema de formulario y `quoteService` (acción de envío).

### Lote 2.4 — `entities/client` ✅ `521aaebb`
- `clientsRepository`, `usersRepository` → `api/`.
- `ClientCard` (admin) → `ui/`.
- **No se movió ningún schema Zod:** `ClientProfile` y `UserRole` son contrato de `@gya/shared`; `entities/client/model` solo los reexporta. Así no se toca el contrato frontend ↔ backend.

### Lote 2.5 — `entities/store` + widget ✅ `7dcd44b9`
- `mapConfig` (`mainStore`, `center`, `containerStyle`) → `data/`.
- `useIsStoreOpen` → `lib/`.
- `StoreSection` subió de `features/home/components/store/` a `widgets/StoreSection/` (D3).
- `StoreLocation` se reexporta desde `entities/store/model`.

### Lote 2.6 — `entities/product` ✅ `1f99f5c0`
- `productService`, `useRealtimeProducts`, `initial-products` → `entities/product`.
- `features/tienda` ahora importa la entidad (D1).
- `Product` se reexporta desde el contrato compartido.

### Lote 2.7 — `entities/order` ✅ `4c1286ee`
- `orderService`, `useRealtimeOrders` → `entities/order`.
- `features/products` quedó vacío: `OrderDraftContext` (estado del draft de venta, solo admin) se movió a `features/admin/context/` y la carpeta `features/products` se eliminó.
- `Order`/`OrderItem` se reexportan desde el contrato compartido.

### Cierres de decisiones

| Decisión | Estado |
|---|---|
| D1 `products` baja a entidad | ✅ 2.6 |
| D2 `store` entidad, `location` feature | ✅ 2.5 |
| D3 `useMapProjects` a entidad + `StoreSection` a widget | ✅ 2.1 + 2.5 |
| D4 `AdminLayout` sube a `widgets/` | ✅ `8aae92f0` |
| D5 `getServiceHref`/`getProjectHref` a `entities/*/lib` | ✅ `getServiceHref` en 2.2 · `getProjectHref` sigue en `projectMappers` (re-exportado por la entidad) |
| D6 catálogo baja a `entities/window` | ✅ 2.3 |
| D7 `Budget`/`BudgetItem` | ✅ **en uso** por `quoteCalculator`/`quoteSummary`; no se borra |
| D8 doble suscripción en `useLocationData` | ✅ una sola fuente vía `entities/project` |

---

## 5. Hecho: fase 3 — `features → features` como error

`apps/web/eslint.config.js` ahora:

```
shared   → no importa entities / features / widgets / screens / app
entities → no importa features / widgets / screens / app
features → no importa OTRA feature / widgets / screens / app
widgets  → no importa screens / app
screens  → no importa screens / app
```

Detalle de implementación:
- `FEATURES` se enumera con `readdirSync` sobre `src/features` al cargar la config.
- Por cada feature se genera una entrada de `no-restricted-imports` que bloquea **solo las demás** features (`@/features/<otra>` y `@features/<otra>`), más `widgets`, `screens` y `app`. Así los imports internos de la propia feature siguen permitidos.
- Prueba de aceptación: se inyectó `import { useAuth } from "@/features/auth/context/AuthContext"` dentro de `features/admin` y el lint falló con el mensaje FSD; luego se retiró el archivo temporal.
- El único cruce real que quedaba (`admin → auth`, D4) se resolvió subiendo `AdminLayout` a `widgets/AdminLayout`.

---

## 6. Pendiente: permisos del agente principal

### Síntoma
OpenCode pide confirmación en cada comando, aunque los subagentes ya no lo hacen.

### Causa verificada
No existe ningún archivo de permisos:

| Ubicación | Contenido |
|---|---|
| `~/.config/opencode/cli.json` | solo el tema `catppuccin` |
| `~/.config/opencode/service.json` | solo contraseña de servicio |
| `~/.config/opencode/opencode.json` | no existe |
| `MyAppGlass/opencode.json(c)` | no existe |

Regla de OpenCode: **si ninguna regla coincide, el resultado es `ask`**. Sin reglas escritas, todo cae en el caso por defecto.

### Corrección propuesta
Crear `C:\Users\User\Github\MyAppGlass\opencode.json` con lista blanca. Como `pnpm.exe` está bloqueado por Application Control, la lista blanca va por `node`:

- `read`/`glob`/`grep`/`webfetch`: permitidos.
- `edit`: permitido en `apps/web/src/**`, `docs/**`, `.opencode/**`.
- `edit`: denegado en `apps/functions/**`, `firebase.json`, `firestore.rules`, `storage.rules`, `**/.env*`.
- `shell`: `ask` por defecto, con `allow` para `cd`, consultas `git` de lectura, `git add`/`git commit`, `Get-ChildItem`, `Get-Content`, `Select-String`, `Test-Path` y los tres binarios por `node` (`tsc`, `next`, `eslint`).
- `shell`: `deny` para `git push` y `firebase deploy`.

- [ ] Aprobación del dueño.
- [ ] Crear el archivo.
- [ ] Verificar que desaparecen los prompts rutinarios y que siguen apareciendo en `push`/`deploy`.

---

## 7. Restricción del entorno: `pnpm.exe` bloqueado

`pnpm run ...` falla con **"An Application Control policy has blocked this file"** en `C:\Users\User\AppData\Roaming\npm\node_modules\pnpm\pnpm.exe`. También falla vía `node bin/pnpm.mjs` (spawnSync del binario nativo).

Sustitutos confirmados en esta máquina:

| Gate | Comando confirmado |
|---|---|
| typecheck | `node apps/web/node_modules/typescript/bin/tsc --noEmit -p apps/web/tsconfig.build.json` — exit 0 |
| lint | `node node_modules/eslint/bin/eslint.js src/` desde `apps/web` — 0 errores |
| build | `cd apps/web; $env:NODE_PATH="<repo>/node_modules/.pnpm/@types+node@25.6.0/node_modules"; node node_modules/next/dist/bin/next build --webpack` |

**Nota del build:** Next 16 exige `@types/node`, que no está enlazado en `apps/web/node_modules` (sí está en el store de pnpm). Sin `NODE_PATH`, Next intenta instalar dependencias con npm y falla por `workspace:*`. Con `NODE_PATH` apuntando a la copia del store, el build completa.

Si el bloqueo es permanente, hay que actualizar `AGENTS.md` §1 y `docs/06_DOCS_DEVELOPMENT.md` para no seguir documentando comandos que ya no corren en esta máquina.

---

## 8. Decisiones que necesitan respuesta del dueño

1. **`entities/window` vs `shared/constants`:** resuelto operativamente — el catálogo/tipos viven en `entities/window` (recomendación aplicada en 2.3). Pendiente solo confirmar si futuras reglas de negocio (6 sistemas oficiales) se modelan como `data/` de esa entidad.
2. **Catálogo inconsistente:** `entities/quote/config/pricing.ts` define 6 SKUs (`ventana_nova`, `mampara_serie25`, `ducha_cristal`, `techo_policarbonato`, `ventana_acustica`, `ventana_pvc_abatible`) que no coinciden con los 6 sistemas de `AGENTS.md` §3 (faltan Serie 35 y Serie 62; sobran ducha y techo como "sistemas"). **Sin cambios en este plan:** se movió la tabla tal cual para no alterar precios. ¿Se corrige el catálogo o el pricing se mantiene como SKUs comerciales?
3. **`Budget`/`BudgetItem`:** **siguen en uso** por `quoteCalculator` y `quoteSummary`. No se borran.
4. **`useMapProjects`:** resuelto — se movió a `entities/project/api` en el lote 2.1.

---

## 9. Reglas de ejecución del plan

- Un lote = un commit. Nada de dos entidades en el mismo commit.
- Antes de cada commit: typecheck + lint + build en verde.
- No se toca `apps/functions/**`, `firebase.json`, `firestore.rules`, `storage.rules` ni `.env*`.
- No se despliega (`deploy:hosting`, `deploy:functions`) sin pedido explícito.
- Criterio de aborto: si un lote obliga a cambiar un schema Zod que viaja al backend, se detiene y se consulta.
- `pnpm run test:run` solo bajo pedido explícito (regla del repo).

---

## 10. Aprendizajes operativos

1. **Barrels y Server Components:** un barrel de entidad que exporta hooks o `dynamic(ssr: false)` no se puede importar desde un Server Component; importar el segmento (`entities/x/ui/...`) evita arrastrar cliente al servidor.
2. **`no-restricted-imports` y alias:** `restrictUpwards(["auth"])` genera `@/auth`, no `@/features/auth`. Para bloquear una feature hay que construir el grupo con el prefijo completo (`@/features/<nombre>` y `@features/<nombre>`).
3. **Schemas compartidos:** los tipos cuyo Zod vive en `packages/shared` (contrato con Functions) se reexportan desde `entities/*/model`; no se mueven ni se duplican.
4. **typecheck vs build en paralelo:** `next build` regenera `.next/types`; ejecutar `tsc` al mismo tiempo produce `TS6053` falsos. Correr siempre typecheck después del build.
