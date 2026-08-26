# Refactor Plan — MyAppGlass

Generated from Composition Patterns + Vercel Best Practices audits.

## Phase 1: State & Context Fixes
**Subagent: state-context-fixes**

| Task | File | Fix |
|---|---|---|
| Wrap OrderDraftContext functions in useCallback | `src/features/products/context<OrderDraftContext.tsx` | addItem, removeItem, updateQuantity, clearDraft, submitOrder → useCallback |
| Consolidate Gallery effects | `src/shared/components/common/Gallery.tsx` | Merge effects 1 & 2 (same dependency: selectedIndex) |
| Remove empty onMouseEnter | `src/features/projects/components/ProjectsList.tsx:147` | Delete `onMouseEnter={() => {}}` |

## Phase 2: Admin Screen Splits
**Subagent: admin-screen-splits**

Split monolithic admin screens into compound components:

| Screen | Lines | Components to Extract |
|---|---|---|
| `InventoryDashboardScreen.tsx` | 894 | MetricsSummary, ProductTable, ReplenishStockModal, CreateProductModal, SearchFilters |
| `SalesOrderScreen.tsx` | 607 | ClientForm, ProductCatalog, OrderSummary, ReceiptView |
| `ClientManagementScreen.tsx` | 482 | ClientList, CreateClientModal, ClientCard |
| `ReportsScreen.tsx` | 472 | MetricCards, OrderList, OrderDetail |
| `LoginScreen.tsx` | 342 | LoginForm, RegisterForm |

## Phase 3: Rendering Performance
**Subagent: rendering-perf**

| Task | Files | Fix |
|---|---|---|
| Add React.memo | Footer, BlogList, ServiceFaqSection, ServiceBentoGrid | Wrap with React.memo |
| Extract inline styles | All admin screens (30+ locations) | Move to module-level constants |
| Fix inline arrows in maps | ServiceHeader, ServiceList, ProjectsList, ServiceFaqSection, StoreSection | Extract to useCallback or stable references |

## Verification
After all phases complete:
```bash
pnpm run typecheck && pnpm run build
```
