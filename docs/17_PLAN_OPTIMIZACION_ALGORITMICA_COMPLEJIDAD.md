# ⚡ Auditoría Exhaustiva de Complejidad Algorítmica en Archivos .ts y .tsx (`MyAppGlass`)

> **Documento técnico canónico y catálogo de archivos.**  
> **Ubicación:** `docs/17_PLAN_OPTIMIZACION_ALGORITMICA_COMPLEJIDAD.md`  
> **Objetivo:** Auditar los 311 archivos `.ts` y `.tsx` del frontend (`apps/web/src/`), catalogando exactamente cuáles realizan operaciones lineales $\mathcal{O}(n)$ (`.find()`, `.filter()`, `.indexOf()`, `.findIndex()`) y trazando la ruta para optimizarlas a tiempo constante $\mathcal{O}(1)$ (HashMaps) o logarítmico $\mathcal{O}(\log n)$ (Búsqueda binaria/B-Tree).

---

## 📊 1. Resumen Ejecutivo del Censo de Archivos

```text
Progreso Global: [████████████] 100% (4 / 4 Fases completadas)
├── [🟢 100%] Fase 0: Módulo Central algorithm-utils.ts y Suite de Tests Unitarios
├── [🟢 100%] Fase 1: Motor de Indexación O(1) para Rutas Dinámicas SSG (Subagente 1)
├── [🟢 100%] Fase 2: Lookup O(1) de Marcadores en Mapa Interactivo de Proyectos a 120 FPS (Subagente 2)
├── [🟢 100%] Fase 3: Indexación O(1) y Bucle Único en E-Commerce, Inventario y Admin (Subagente 3)
└── [🟢 100%] Fase 4: Optimización O(1) en Listados de Servicios/Proyectos y Tracking (Subagente 4)
```

- **Total de archivos `.ts` y `.tsx` en `apps/web/src/`:** **`311` archivos**
- **Archivos con operaciones de búsqueda lineal $\mathcal{O}(n)$ detectadas:** **`37` archivos** (52 puntos de escaneo lineal)
- **Archivos que ya implementan $\mathcal{O}(1)$ con HashMap:** [`blogService.ts`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/features/blog/services/blogService.ts) (`blogPostsBySlugMap = new Map()`) y consultas por clave de Firestore.
- **Archivos puros de UI/Presentación (sin colecciones de datos):** **`273` archivos** (componentes JSX/Chakra UI, layouts, constantes tipográficas, themes y wrappers).

---

## 🔬 2. Matriz Completa de Archivos .ts / .tsx con Complejidad $\mathcal{O}(n)$

A continuación se enlistan los **37 archivos** agrupados por dominio de negocio, con su operación exacta y la optimización aplicable:

### Grupo A: Rutas Dinámicas y Prerenderizado SSG (Alto Impacto en Build)
| # | Archivo `.ts` / `.tsx` | Operación Actual $\mathcal{O}(n)$ | Optimización Propuesta |
|---|---|---|:---:|
| 1 | [`apps/web/src/app/servicios/[serviceSlug]/page.tsx`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/app/servicios/[serviceSlug]/page.tsx#L33) | `services.find((s) => s.slug === serviceSlug)` | **$\mathcal{O}(1)$** (`Map.get(slug)`) |
| 2 | [`apps/web/src/app/proyectos/[projectId]/page.tsx`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/app/proyectos/[projectId]/page.tsx#L31) | `projects.find((p) => String(p.id) === projectId)` | **$\mathcal{O}(1)$** (`Map.get(id)`) |
| 3 | [`apps/web/src/shared/api/firebase/publicRest.ts`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/shared/api/firebase/publicRest.ts#L167) | `services.filter((s) => s.published)` | **$\mathcal{O}(1)$** (Filtro único en caché) |
| 4 | [`apps/web/src/features/services/hooks/useServices.ts`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/features/services/hooks/useServices.ts#L48) | `all.filter((s) => s.published)` | **$\mathcal{O}(1)$** (Memoized Index) |
| 5 | [`apps/web/src/features/projects/hooks/projectMappers.ts`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/features/projects/hooks/projectMappers.ts#L60) | `projects.filter((p) => p.published)` | **$\mathcal{O}(1)$** (Memoized Index) |
| 6 | [`apps/web/src/features/services/hooks/serviceMappers.ts`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/features/services/hooks/serviceMappers.ts#L138) | Múltiples `.filter()` sobre galerías y sistemas | **$\mathcal{O}(1)$** (Agrupación por clave Map) |

### Grupo B: Mapa de Ubicaciones Interactivo (Crítico para 120 FPS sin Jank)
| # | Archivo `.ts` / `.tsx` | Operación Actual $\mathcal{O}(n)$ | Optimización Propuesta |
|---|---|---|:---:|
| 7 | [`apps/web/src/features/location/LocationMap.tsx`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/features/location/LocationMap.tsx#L107) | `projects.find((p) => p.id === selectedId)` en render | **$\mathcal{O}(1)$** (`Map.get(id)`) |
| 8 | [`apps/web/src/features/location/ImmersiveLocationMap.tsx`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/features/location/ImmersiveLocationMap.tsx#L24) | `projects.find((p) => p.id === selectedId)` | **$\mathcal{O}(1)$** (`Map.get(id)`) |
| 9 | [`apps/web/src/features/location/useLocationData.ts`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/features/location/useLocationData.ts#L75) | Deduplicación de distritos y años con `.filter()` | **$\mathcal{O}(n)$ único $\rightarrow$ $\mathcal{O}(1)$ lookup** |
| 10 | [`apps/web/src/features/location/useIsStoreOpen.ts`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/features/location/useIsStoreOpen.ts#L18) | `parts.find((p) => p.type === type)` | **$\mathcal{O}(1)$** (`Map` de tipos de fecha) |
| 11 | [`apps/web/src/features/location/immersive/FloatingPanel.tsx`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/features/location/immersive/FloatingPanel.tsx#L278) | `.filter(Boolean)` y `.indexOf()` | **$\mathcal{O}(1)$** (Set deduplicado) |
| 12 | [`apps/web/src/features/location/immersive/ProjectCarousel.tsx`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/features/location/immersive/ProjectCarousel.tsx#L157) | `items.indexOf(document.activeElement)` | **$\mathcal{O}(1)$** (`Map<Element, number>`) |
| 13 | [`apps/web/src/features/home/hooks/useMapProjects.ts`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/features/home/hooks/useMapProjects.ts#L32) | `projects.map().filter()` | **$\mathcal{O}(n)$ único indexado** |

### Grupo C: Módulos de E-Commerce, Inventario y Ventas
| # | Archivo `.ts` / `.tsx` | Operación Actual $\mathcal{O}(n)$ | Optimización Propuesta |
|---|---|---|:---:|
| 14 | [`apps/web/src/features/products/context/OrderDraftContext.tsx`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/features/products/context/OrderDraftContext.tsx#L75) | `items.findIndex((i) => i.productId === product.id)` | **$\mathcal{O}(1)$** (`Map<productId, Item>`) |
| 15 | [`apps/web/src/features/products/services/orderService.ts`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/features/products/services/orderService.ts#L217) | `orders.find((o) => o.id === id)` | **$\mathcal{O}(1)$** (`Map<orderId, Order>`) |
| 16 | [`apps/web/src/features/products/services/productService.ts`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/features/products/services/productService.ts#L113) | `INITIAL_PRODUCTS.find((p) => p.id === id)` | **$\mathcal{O}(1)$** (`Map<productId, Product>`) |
| 17 | [`apps/web/src/screens/Admin/InventoryDashboardScreen.tsx`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/screens/Admin/InventoryDashboardScreen.tsx#L36) | Filtrado lineal de catálogo de productos | **$\mathcal{O}(\log n)$** (Búsqueda binaria por SKU) |
| 18 | [`apps/web/src/screens/Admin/SalesOrderScreen.tsx`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/screens/Admin/SalesOrderScreen.tsx#L123) | `products.filter(p => match)` | **$\mathcal{O}(\log n)$ / $\mathcal{O}(1)$** (Índice por SKU) |
| 19 | [`apps/web/src/screens/Admin/AdminHubScreen.tsx`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/screens/Admin/AdminHubScreen.tsx#L36) | `products.filter((p) => p.stock === 0)` | **$\mathcal{O}(1)$** (Contadores atómicos en stock) |
| 20 | [`apps/web/src/screens/Admin/inventory/MetricsSummary.tsx`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/screens/Admin/inventory/MetricsSummary.tsx#L26) | `products.filter(stock)` duplicado | **$\mathcal{O}(1)$** (Métricas precalculadas) |
| 21 | [`apps/web/src/screens/Admin/ClientManagementScreen.tsx`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/screens/Admin/ClientManagementScreen.tsx#L71) | Búsqueda secuencial en clientes | **$\mathcal{O}(1)$** (`Map<DNI, Cliente>`) |
| 22 | [`apps/web/src/screens/Admin/ReportsScreen.tsx`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/screens/Admin/ReportsScreen.tsx#L40) | Búsqueda secuencial en reportes | **$\mathcal{O}(1)$** (`Map<orderNumber, Report>`) |

### Grupo D: Listados de UI y Filtros de Categorías
| # | Archivo `.ts` / `.tsx` | Operación Actual $\mathcal{O}(n)$ | Optimización Propuesta |
|---|---|---|:---:|
| 23 | [`apps/web/src/features/projects/components/ProjectsList.tsx`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/features/projects/components/ProjectsList.tsx#L63) | `unique.indexOf("Otros")` y `.filter(year)` | **$\mathcal{O}(1)$** (`Map<year, Project[]>`) |
| 24 | [`apps/web/src/features/services/components/ServiceList.tsx`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/features/services/components/ServiceList.tsx#L42) | `items.filter((s) => s.category === category)` | **$\mathcal{O}(1)$** (`Map<category, Service[]>`) |
| 25 | [`apps/web/src/screens/Services/ui/ServiceDetailView.tsx`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/screens/Services/ui/ServiceDetailView.tsx#L28) | `.split("/").filter(Boolean)` | Direct string lookup |
| 26 | [`apps/web/src/screens/Projects/ui/ProjectDetailView.tsx`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/screens/Projects/ui/ProjectDetailView.tsx#L91) | `.split("/").filter(Boolean)` | Direct string lookup |
| 27 | [`apps/web/src/shared/hooks/ui/useImagePrefetch.ts`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/shared/hooks/ui/useImagePrefetch.ts#L33) | `urls.filter(Boolean)` | `Set<string>` deduplicado |

### Grupo E: Formularios y Prototipos de Diseño
| # | Archivo `.ts` / `.tsx` | Operación Actual $\mathcal{O}(n)$ | Optimización Propuesta |
|---|---|---|:---:|
| 28 | [`apps/web/src/features/contacto/components/TrackingSection.tsx`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/features/contacto/components/TrackingSection.tsx#L34) | `STAGES.findIndex((s) => s.id === status)` | **$\mathcal{O}(1)$** (`STAGE_INDEX_MAP[status]`) |
| 29 | [`apps/web/src/features/admin/components/AlbumGalleryUploader.tsx`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/features/admin/components/AlbumGalleryUploader.tsx#L155) | `items.filter((_, i) => i !== index)` | Array slice directo |
| 30 | [`apps/web/src/features/admin/components/form/FeaturesEditor.tsx`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/features/admin/components/form/FeaturesEditor.tsx#L24) | `features.filter((_, i) => i !== idx)` | Array slice directo |
| 31 | [`apps/web/src/screens/DesignSystemUbicacion/prototypes/PrototypeFilters.tsx`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/screens/DesignSystemUbicacion/prototypes/PrototypeFilters.tsx#L46) | `projects.filter(...)` y `.find(...)` | **$\mathcal{O}(1)$** (`Map`) |
| 32 | [`apps/web/src/screens/DesignSystemUbicacion/prototypes/PrototypeTimeline.tsx`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/screens/DesignSystemUbicacion/prototypes/PrototypeTimeline.tsx#L34) | Triple `.filter()` agrupado | **$\mathcal{O}(1)$** (`Map<year, Project[]>`) |
| 33 | [`apps/web/src/screens/DesignSystemUbicacion/prototypes/PrototypeSedeFirst.tsx`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/screens/DesignSystemUbicacion/prototypes/PrototypeSedeFirst.tsx#L41) | `projects.filter((p) => p.yearNumber === year)` | **$\mathcal{O}(1)$** (`Map`) |
| 34 | [`apps/web/src/screens/DesignSystemUbicacion/prototypes/filters/ProjectDetail.tsx`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/screens/DesignSystemUbicacion/prototypes/filters/ProjectDetail.tsx#L45) | `.filter((src, i, all) => all.indexOf(src) === i)` | `Set<string>` |
| 35 | [`apps/web/src/screens/DesignSystemUbicacion/prototypes/sede/SedeProjectCard.tsx`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/screens/DesignSystemUbicacion/prototypes/sede/SedeProjectCard.tsx#L21) | `.filter(Boolean).join(...)` | String template condicional |
| 36 | [`apps/web/src/screens/DesignSystemUbicacion/prototypes/split/SplitProjectRow.tsx`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/screens/DesignSystemUbicacion/prototypes/split/SplitProjectRow.tsx#L23) | `.filter(Boolean).join(...)` | String template condicional |
| 37 | [`apps/web/src/screens/DesignSystemUbicacion/prototypes/sheet/SheetHandle.tsx`](file:///C:/Users/Admin/Github/MyAppGlass/apps/web/src/screens/DesignSystemUbicacion/prototypes/sheet/SheetHandle.tsx) | Array scan | Inline state |

---

## 🚀 3. Módulo Central Reutilizable Propuesto (`algorithm-utils.ts`)

Para no duplicar lógica en los 37 archivos, crearemos:
`apps/web/src/shared/utils/algorithm-utils.ts`

```typescript
/**
 * Crea un HashMap indexado por clave en O(n) para permitir
 * búsquedas instantáneas subsiguientes en O(1).
 */
export function createLookupMap<T, K extends string | number>(
  items: readonly T[],
  keySelector: (item: T) => K
): Map<K, T> {
  const map = new Map<K, T>();
  for (let i = 0; i < items.length; i++) {
    map.set(keySelector(items[i]), items[i]);
  }
  return map;
}

/**
 * Agrupa una colección por clave en O(n) retornando un Map<K, T[]>
 * para consultas instantáneas de categoría o año en O(1).
 */
export function createGroupMap<T, K extends string | number>(
  items: readonly T[],
  keySelector: (item: T) => K
): Map<K, T[]> {
  const map = new Map<K, T[]>();
  for (let i = 0; i < items.length; i++) {
    const key = keySelector(items[i]);
    const group = map.get(key);
    if (group) {
      group.push(items[i]);
    } else {
      map.set(key, [items[i]]);
    }
  }
  return map;
}

/**
 * Búsqueda binaria O(log n) sobre colecciones ordenadas por clave.
 */
export function binarySearchBy<T, K extends string | number>(
  sortedArray: readonly T[],
  target: K,
  keySelector: (item: T) => K
): T | null {
  let low = 0;
  let high = sortedArray.length - 1;
  while (low <= high) {
    const mid = (low + high) >>> 1;
    const midVal = keySelector(sortedArray[mid]);
    if (midVal === target) return sortedArray[mid];
    if (midVal < target) low = mid + 1;
    else high = mid - 1;
  }
  return null;
}
```

---

## 🧪 4. Protocolo de Verificación

```bash
# 1. Pruebas unitarias de algoritmos
pnpm --filter @gya/web test:run tests/unit/algorithm-utils.test.ts

# 2. Typecheck estricto
pnpm run typecheck

# 3. Linter
pnpm run lint

# 4. Build de exportación estática (60 rutas / 56 HTML)
pnpm run build
```

---

## 🗂️ 5. Estado de filas no aplicadas

Verificación del 2026-11-03 de las 25 filas de la matriz sin registro en el commit `63532ae` (filas 1, 2, 6, 7, 8, 10, 16, 19, 20, 23, 24 y 28 sí se tocaron). Se revisó el archivo actual con búsqueda en código.

- **PENDIENTE:** el problema de complejidad sigue existiendo y el cambio sí mejora la complejidad.
- **DESCARTADA:** el archivo ya no existe, o el cambio no mejora la complejidad (p. ej. `.filter(Boolean)`, `slice` directo, filtro único O(n) sin búsquedas repetidas, o búsqueda por substring donde O(log n) no aplica).

| Fila | Archivo | Estado | Motivo |
|---|---|---|---|
| 3 | `apps/web/src/shared/api/firebase/publicRest.ts` | DESCARTADA | Filtro único O(n) por llamada; cachearlo no cambia la complejidad |
| 4 | `apps/web/src/features/services/hooks/useServices.ts` | DESCARTADA | Filtro único O(n) seguido de `map`; no hay búsquedas repetidas |
| 5 | `apps/web/src/features/projects/hooks/projectMappers.ts` | DESCARTADA | Filtro único O(n) seguido de `map`; sin búsquedas repetidas |
| 9 | `apps/web/src/features/location/useLocationData.ts` | DESCARTADA | Deduplicación ya se hace con `Set` en O(n) |
| 11 | `apps/web/src/features/location/immersive/FloatingPanel.tsx` | PENDIENTE | `filter` con `arr.indexOf(src)` es O(n²); cambiar a `Set` dedupe en O(n) |
| 12 | `apps/web/src/features/location/immersive/ProjectCarousel.tsx` | PENDIENTE | `items.indexOf(activeElement)` en cada tecla es O(n); `Map<Element, number>` lo deja en O(1) (n pequeño, impacto bajo) |
| 13 | `apps/web/src/features/home/hooks/useMapProjects.ts` | DESCARTADA | `map` + `filter` en una sola pasada O(n); sin búsqueda |
| 14 | `apps/web/src/features/products/context/OrderDraftContext.tsx` | PENDIENTE | `items.findIndex` por producto es O(n) en cada alta; índice `Map<productId, index>` lo reduce a O(1) |
| 15 | `apps/web/src/features/products/services/orderService.ts` | DESCARTADA | `find` sobre pedidos locales; construir un `Map` por llamada cuesta igual O(n) |
| 17 | `apps/web/src/screens/Admin/InventoryDashboardScreen.tsx` | DESCARTADA | Filtro por substring en nombre, SKU y categoría; búsqueda binaria no aplica |
| 18 | `apps/web/src/screens/Admin/SalesOrderScreen.tsx` | DESCARTADA | Filtro por substring; O(log n) no aplica |
| 21 | `apps/web/src/screens/Admin/ClientManagementScreen.tsx` | DESCARTADA | Filtro por substring en varios campos; O(log n) no aplica |
| 22 | `apps/web/src/screens/Admin/ReportsScreen.tsx` | DESCARTADA | Filtro por substring en varios campos; O(log n) no aplica |
| 25 | `apps/web/src/screens/Services/ui/ServiceDetailView.tsx` | DESCARTADA | `.split("/").filter(Boolean)` sobre la ruta; costo constante |
| 26 | `apps/web/src/screens/Projects/ui/ProjectDetailView.tsx` | DESCARTADA | `.split("/").filter(Boolean)` sobre la ruta; costo constante |
| 27 | `apps/web/src/shared/hooks/ui/useImagePrefetch.ts` | DESCARTADA | `filter(Boolean)` sobre URLs; no mejora la complejidad |
| 29 | `apps/web/src/features/admin/components/AlbumGalleryUploader.tsx` | DESCARTADA | Eliminar por índice con `filter` es O(n) igual que `slice` |
| 30 | `apps/web/src/features/admin/components/form/FeaturesEditor.tsx` | DESCARTADA | Eliminar por índice con `filter` es O(n) igual que `slice` |
| 31 | `apps/web/src/screens/DesignSystemUbicacion/prototypes/PrototypeFilters.tsx` | DESCARTADA | Un `find` por cambio dentro de `useMemo`; un `Map` cuesta lo mismo |
| 32 | `apps/web/src/screens/DesignSystemUbicacion/prototypes/PrototypeTimeline.tsx` | PENDIENTE | `years.map` con `projects.filter` por año es O(Y·n); agrupar en una pasada con `Map<year, Project[]>` lo deja en O(n) |
| 33 | `apps/web/src/screens/DesignSystemUbicacion/prototypes/PrototypeSedeFirst.tsx` | DESCARTADA | Un solo `filter` por año dentro de `useMemo`; sin búsquedas repetidas |
| 34 | `apps/web/src/screens/DesignSystemUbicacion/prototypes/filters/ProjectDetail.tsx` | PENDIENTE | `all.indexOf(src) === i` dentro de `filter` es O(n²); cambiar a `Set` en O(n) |
| 35 | `apps/web/src/screens/DesignSystemUbicacion/prototypes/sede/SedeProjectCard.tsx` | DESCARTADA | `.filter(Boolean).join(...)` sobre 2 elementos; costo constante |
| 36 | `apps/web/src/screens/DesignSystemUbicacion/prototypes/split/SplitProjectRow.tsx` | DESCARTADA | `.filter(Boolean).join(...)` sobre 2 elementos; costo constante |
| 37 | `apps/web/src/screens/DesignSystemUbicacion/prototypes/sheet/SheetHandle.tsx` | DESCARTADA | `indexOf` sobre `SHEET_POSITIONS`, array fijo de tamaño constante |

**Conteo:** 5 PENDIENTE, 20 DESCARTADA (total 25).

**PENDIENTE:** filas 11, 12, 14, 32, 34.

