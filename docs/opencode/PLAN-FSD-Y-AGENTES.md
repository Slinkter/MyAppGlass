# Plan de trabajo — OpenCode, agentes y capa `entities/`

- **Estado:** en curso.
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
| Lote 2.1 — `entities/project` | 🟡 aplicado en el árbol, **sin verificar ni commitear** | `git status`: 21 entradas |
| Lotes 2.2 – 2.7 | ⬜ pendientes | — |
| Arreglo de prompts de permiso del agente principal | ⬜ pendiente de aprobación | no existe `opencode.json` |

---

## 2. Hecho: P0 y agentes

### P0.1 — Primitivas UI ✅
- `src/components/ui/` → `src/shared/ui/` (20 archivos, 114 imports actualizados).
- Colisión con `shared/components/ui` resuelta.
- `ErrorView` → `shared/components`; `QuoteSheet` → `features/presupuesto/components`; modales de Admin → `features/admin/components`.
- Sin dependencias nuevas.

### P0.2 — Fronteras FSD en ESLint ✅
- `apps/web/eslint.config.js`: `no-restricted-imports` con orden `app > screens > widgets > features > shared`.
- Validado inyectando un import ilegal: el lint falla como debe.
- Efecto actual: `shared` y `screens` ya no pueden importar hacia arriba; `features → features` **sigue permitido** hasta que exista `entities/`.

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

## 4. En curso: lote 2.1 — `entities/project`

### Aplicado en el árbol de trabajo (sin commit)

```
apps/web/src/entities/project/
├── index.ts                          (nuevo, barrel público)
├── README.md                         (movido desde features/projects)
├── model/index.ts                    (nuevo, reexporta Project/ProjectPhoto/MapProject)
├── api/projectsRepository.ts         ← shared/api/firebase/
├── api/useProjects.ts                ← features/projects/hooks/
├── api/projectMappers.ts             ← features/projects/hooks/
└── ui/
    ├── ProjectCard.tsx
    ├── ProjectCardContent.tsx
    ├── ProjectDetailItem.tsx
    ├── ProjectSkeletons.tsx
    ├── ProjectsList.tsx
    └── modal/{MapViewer,VisualViewer}.tsx
```

- `apps/web/src/features/projects/` eliminado (incluido su `index.ts`).
- 10 archivos con imports actualizados: `app/admin/proyectos`, `app/proyectos/ver`, `features/home/hooks/useMapProjects`, `features/location/useLocationData`, `screens/Home`, `screens/Projects`, `screens/DesignSystem`, entre otros.
- `git status`: 21 entradas (13 `R`/`RM`, 6 ` M`, 2 `??`).

### Pendiente para cerrar 2.1

- [ ] **`apps/web/eslint.config.js:50`** — sigue apuntando a `src/features/projects/components/modal/VisualViewer.*`; debe pasar a `src/entities/project/ui/modal/VisualViewer.*`.
- [ ] **`screens/DesignSystem/sections/EditorialCardsShowcase.tsx:68`** — badge de ruta con texto `features/projects` → `entities/project`.
- [ ] **`features/home/hooks/useMapProjects.ts`** — aún vive en `home`; según D3 debe bajar a `entities/project/api` para cerrar el ciclo `home ↔ location`. (Queda fuera de este lote si se prefiere aislar el riesgo; decidir antes de commitear.)
- [ ] **Gates**: typecheck + lint + build (ver §7, `pnpm` está bloqueado).
- [ ] **Commit propio**: `refactor(fsd): crea entities/project y retira features/projects`.

### Criterio de aceptación de 2.1
- `grep -r "features/projects"` sin resultados en `apps/web/src`.
- Los tres gates en verde.
- Ningún otro lote mezclado en el commit.

---

## 5. Pendiente: lotes 2.2 – 2.7

Orden definido en `03_ENTITIES.md` §6, de menor a mayor riesgo.

| Lote | Entidad | Contenido | Riesgo | Estado |
|---|---|---|---|---|
| 2.2 | `service` | `servicesRepository`, `useServices`, `serviceMappers`, `ServiceCard/List/Skeletons`, `getServiceHref` | Bajo | ⬜ |
| 2.3 | `window` + `quote` | `SystemType`/`GlassType`/`AluminumColor`, `quoteCalculator`, `quoteLines/Summary/Number`, `pricing.ts`, `QuoteSheet` | Bajo | ⬜ |
| 2.4 | `client` | `clientsRepository`, `usersRepository`, `ClientProfile`, `UserRole`, `ClientCard` | Medio (auth) | ⬜ |
| 2.5 | `store` | `StoreLocation`, `mapConfig` (sede y centro), `useIsStoreOpen` | Bajo | ⬜ |
| 2.6 | `product` | `productService`, `useRealtimeProducts`, `initial-products`, `Product` | **Alto** (inventario) | ⬜ |
| 2.7 | `order` | `orderService`, `useRealtimeOrders`, `Order`/`OrderItem` | **Alto** (ventas) | ⬜ |

Cierres que dependen de lotes ya hechos o por hacer:

| Decisión | Qué cierra | Depende de |
|---|---|---|
| D1 `products` baja a entidad | `tienda → products` (2 imports) | 2.6 |
| D2 `store` entidad, `location` feature | solape conceptual | 2.5 |
| D3 `useMapProjects` a entidad + `StoreSection` a widget | ciclo `home ↔ location` | 2.1 + 2.5 |
| D4 `AdminLayout` sube a `widgets/` | `admin → auth` (2 imports) | 2.2 |
| D5 `getServiceHref`/`getProjectHref` a `entities/*/lib` | `admin → services` | 2.2 |
| D6 catálogo baja a `entities/window` | `ai-simulator → presupuesto` | 2.3 |
| D7 `Budget`/`BudgetItem` | duplicidad en `ecommerce-schemas` | verificar uso |
| D8 doble suscripción en `useLocationData` | bug de rendimiento | 2.1 |

### Fase 3 — activar la regla `features → features` como error
Al cerrar 2.1–2.5, añadir a `eslint.config.js`:

```
entities → no importa features / widgets / screens / app
features → no importa features / widgets / screens / app
```

Probar con un import ilegal inyectado antes de dejarlo activo.

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

Sustitutos confirmados o por confirmar:

| Gate | Comando |
|---|---|
| typecheck | `node apps/web/node_modules/typescript/bin/tsc --noEmit -p apps/web/tsconfig.build.json` — **confirmado exit 0** |
| lint | `node apps/web/node_modules/eslint/bin/eslint.js src/` — por confirmar |
| build | `node apps/web/node_modules/next/dist/bin/next build --webpack` — por confirmar |

Si el bloqueo es permanente, hay que actualizar `AGENTS.md` §1 y `docs/06_DOCS_DEVELOPMENT.md` para no seguir documentando comandos que ya no corren en esta máquina.

---

## 8. Decisiones que necesitan respuesta del dueño

1. **`entities/window` vs `shared/constants`:** ¿el catálogo de 6 sistemas es entidad de negocio (recomendación) o constante global?
2. **Catálogo inconsistente:** `features/presupuesto/config/pricing.ts` define 6 SKUs (`ventana_nova`, `mampara_serie25`, `ducha_cristal`, `techo_policarbonato`, `ventana_acustica`, `ventana_pvc_abatible`) que no coinciden con los 6 sistemas de `AGENTS.md` §3 (falta Serie 35 y Serie 62; sobran ducha y techo como "sistemas"). ¿Se corrige el catálogo o el pricing se mantiene como SKUs comerciales?
3. **`Budget`/`BudgetItem`:** ¿siguen en uso o son residuo? Se verifica antes de borrar.
4. **`useMapProjects`:** ¿entra en el cierre de 2.1 o se difiere a 2.5 junto con `store`?

---

## 9. Reglas de ejecución del plan

- Un lote = un commit. Nada de dos entidades en el mismo commit.
- Antes de cada commit: typecheck + lint + build en verde.
- No se toca `apps/functions/**`, `firebase.json`, `firestore.rules`, `storage.rules` ni `.env*`.
- No se despliega (`deploy:hosting`, `deploy:functions`) sin pedido explícito.
- Criterio de aborto: si un lote obliga a cambiar un schema Zod que viaja al backend, se detiene y se consulta.
- `pnpm run test:run` solo bajo pedido explícito (regla del repo).
