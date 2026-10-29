# Refactor Plan — MyAppGlass

Generated from Composition Patterns + Vercel Best Practices audits.

> Nota (2026-10-29): este plan queda como **backlog de refactor**. Su estado fue verificado contra el código (HEAD `d4e6685`); la columna «Estado» indica pendiente / hecho / parcial con su evidencia. Se relaciona con el módulo de refactorización de `docs/diplomado/` (ver [`docs/diplomado/README.md`](./docs/diplomado/README.md)).

## Phase 1: State & Context Fixes
**Subagent: state-context-fixes**

| Task | File | Fix | Estado | Evidencia |
|---|---|---|---|---|
| Wrap OrderDraftContext functions in useCallback | `src/features/products/context/OrderDraftContext.tsx` (la ruta original tenía el typo `context<`) | addItem, removeItem, updateQuantity, clearDraft, submitOrder → useCallback | Hecho | Las 5 funciones usan `useCallback` (líneas 70, 114, 121, 151, 158) |
| Consolidate Gallery effects | `src/shared/components/common/Gallery.tsx` | Merge effects 1 & 2 (same dependency: selectedIndex) | Hecho | Quedan 2 `useEffect`: uno que notifica el cambio y precarga imágenes adyacentes (fusionado) y otro de navegación por teclado (dependencias distintas) |
| Remove empty onMouseEnter | `src/features/projects/components/ProjectsList.tsx` | Delete `onMouseEnter={() => {}}` | Hecho | `grep onMouseEnter` no devuelve resultados en el archivo |

## Phase 2: Admin Screen Splits
**Subagent: admin-screen-splits**

Split monolithic admin screens into compound components:

| Screen (`src/screens/...`) | Lines (plan) | Lines (hoy, `wc -l`) | Components to Extract | Estado | Evidencia |
|---|---|---|---|---|---|
| `Admin/InventoryDashboardScreen.tsx` | 894 | 894 | MetricsSummary, ProductTable, ReplenishStockModal, CreateProductModal, SearchFilters | Parcial | Existen `Admin/inventory/{MetricsSummary,ProductTable,SearchFilters}.tsx`; los modales (reposición y creación) siguen dentro de la pantalla, que mantiene 894 líneas |
| `Admin/SalesOrderScreen.tsx` | 607 | 607 | ClientForm, ProductCatalog, OrderSummary, ReceiptView | Pendiente | Sin subcomponentes extraídos; mismo tamaño |
| `Admin/ClientManagementScreen.tsx` | 482 | 512 | ClientList, CreateClientModal, ClientCard | Pendiente | Creció 30 líneas |
| `Admin/ReportsScreen.tsx` | 472 | 500 | MetricCards, OrderList, OrderDetail | Pendiente | Creció 28 líneas |
| `Auth/LoginScreen.tsx` | 342 | 367 | LoginForm, RegisterForm | Pendiente | Creció 25 líneas |

## Phase 3: Rendering Performance
**Subagent: rendering-perf**

| Task | Files | Fix | Estado | Evidencia |
|---|---|---|---|---|
| Add React.memo | Footer, BlogList, ServiceFaqSection, ServiceBentoGrid | Wrap with React.memo | Hecho | `export default React.memo(Footer)` (`src/widgets/Footer/Footer.tsx`), `React.memo(BlogList)` (`src/features/blog/components/BlogList.tsx`), `React.memo(ServiceFaqSectionInner)` y `React.memo(ServiceBentoGrid)` (`src/features/services/components/`) |
| Extract inline styles | All admin screens (30+ locations) | Move to module-level constants | Pendiente | Aún hay props `style={{ ... }}` en las pantallas admin (25 ocurrencias entre las 5 pantallas de `Admin/`); no se contaron los `sx`/props inline de Chakra |
| Fix inline arrows in maps | ServiceHeader, ServiceList, ProjectsList, ServiceFaqSection, StoreSection | Extract to useCallback or stable references | Parcial | `ServiceFaqSection` usa `useCallback` (`toggleFaq`) y `ServiceList`/`ProjectsList`/`StoreSection` ya usan `useCallback` para otras funciones, pero quedan flechas inline en `ServiceHeader.tsx:52` (`onClick={() => onSelect(index)}`), `ServiceList.tsx:91` y `StoreSection.tsx:169` |

## Verification
After all phases complete:
```bash
pnpm run typecheck && pnpm run build
```
