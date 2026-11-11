# 03 — Capa `entities/` (decisión de arquitectura)

- **Estado:** propuesta, pendiente de aprobación del dueño.
- **Fecha:** 2026-11-11.
- **Fase:** 1 del plan de trabajo (diseño). No se movió código todavía.
- **Base:** inventario real de `apps/web/src` (376 archivos de features) con resolución de alias y rutas relativas.

---

## 1. Por qué existe este documento

El proyecto usa FSD parcial sin `entities/`. El inventario confirma que el costo no es teórico:

| Hecho medido | Evidencia |
|---|---|
| **10 imports feature→feature** en **8 pares** | `admin→auth` (2), `tienda→products` (2), `admin→services`, `home→location`, `home→projects`, `location→projects`, `location→home`, `ai-simulator→presupuesto` |
| **Un ciclo real** `home ↔ location` | `StoreSection.tsx:7` y `useLocationData.ts:12` |
| **Doble suscripción a Firestore** | `useLocationData.ts:62-63` llama `useMapProjects()` (que llama `useProjects`) y otra vez `useProjects()` |
| **`ecommerce-schemas.ts` mezcla 5 modelos** | `Product`, `ClientProfile`, `Budget/BudgetItem`, `Order/OrderItem`, `UserRole` |
| **Repositorios de entidad en `shared`** | `clientsRepository`, `projectsRepository`, `servicesRepository` viven en `shared/api/firebase` |
| **Sin repositorio para product/order/quote/store** | esos viven dentro de features, señal de que ahí está la entidad |
| **Lógica duplicada de rutas** | `projectMappers.getProjectHref` vs reconstrucción manual en `useLocationData.ts:69` |

Corrección al diagnóstico anterior: no eran "24 imports entre features". El número real es **10 líneas / 8 pares**. Las 24 incluían imports internos de la misma feature.

---

## 2. Criterio para decidir qué es una entidad

- **Entidad:** un sustantivo del negocio con datos propios, un repositorio y una representación visual reutilizable. Responde "qué es". No ejecuta un flujo.
- **Feature:** una acción del usuario o capacidad de negocio. Responde "qué hace". Compone entidades.
- **Shared:** infraestructura sin vocabulario del negocio (logger, firebase client, tema, utilidades) o primitivas UI.

Regla de dependencia resultante:

```
app > screens > widgets > features > entities > shared
```

- Una **entidad no conoce ninguna feature**.
- Una **feature no conoce otra feature**.
- Si dos features necesitan el mismo dato, ese dato baja a `entities`.
- Si una feature necesita renderizar el bloque de otra, la composición sube a `widgets` o `screens`.

---

## 3. Mapa propuesto

Ocho entidades. Cada una con los segmentos que realmente use (`model/`, `api/`, `ui/`, `lib/`), no los cuatro por obligación.

### `entities/product`
| Segmento | Sale de | Entra a |
|---|---|---|
| `model/` | `shared/schemas/ecommerce-schemas.ts` → `Product`, `productSchema` | — |
| `api/` | `features/products/services/productService.ts`, `features/products/hooks/useRealtimeProducts.ts` | — |
| `data/` | `features/products/data/initial-products.ts` | — |
| `ui/` | (nada todavía; el catálogo se compone en `features/tienda`) | — |

### `entities/order`
| Segmento | Sale de | Entra a |
|---|---|---|
| `model/` | `ecommerce-schemas.ts` → `Order`, `OrderItem`, `orderSchema` | — |
| `api/` | `features/products/services/orderService.ts`, `features/products/hooks/useRealtimeOrders.ts` | — |

### `entities/client`
| Segmento | Sale de | Entra a |
|---|---|---|
| `model/` | `ecommerce-schemas.ts` → `ClientProfile`, `UserRole` | — |
| `api/` | `shared/api/firebase/clientsRepository.ts`, `usersRepository.ts` | — |
| `ui/` | `screens/Admin/clients/ClientCard.tsx` | — |

### `entities/project`
| Segmento | Sale de | Entra a |
|---|---|---|
| `model/` | `shared/types/project.ts`, `shared/types/map.ts` → `MapProject` | — |
| `api/` | `shared/api/firebase/projectsRepository.ts`, `features/projects/hooks/{useProjects,projectMappers}` | — |
| `ui/` | `features/projects/components/*` (`ProjectCard`, `ProjectCardContent`, `ProjectDetailItem`, `ProjectSkeletons`) | — |
| `lib/` | `getProjectHref` (hoy en `projectMappers`) | usado por `admin`, `location`, `home` |

### `entities/service`
| Segmento | Sale de | Entra a |
|---|---|---|
| `model/` | `shared/api/firebase/types.ts` → `Service` | — |
| `api/` | `shared/api/firebase/servicesRepository.ts`, `features/services/hooks/{useServices,serviceMappers}` | — |
| `ui/` | `ServiceCard`, `ServiceList`, `ServiceSkeletons` | `ServicePageLayout`, `ServiceHeader`, `ServiceBentoGrid`, `ServiceFaqSection` quedan en `features/services` |
| `lib/` | `getServiceHref` (hoy en `serviceMappers:81`) | usado por `admin` |

### `entities/quote`
| Segmento | Sale de | Entra a |
|---|---|---|
| `model/` | `features/presupuesto/types.ts` (`QuoteLineInput`, `QuoteCustomer`), `utils/quoteCalculator.ts` | — |
| `lib/` | `utils/{quoteLines,quoteSummary,quoteNumber}` | — |
| `config/` | `features/presupuesto/config/pricing.ts` (**precios**, no catálogo) | — |
| `ui/` | `features/presupuesto/components/QuoteSheet.tsx` | — |

> `features/presupuesto` conserva el **wizard** (pasos, formulario, envío) y su `schemas/quote-form-schema.ts`. El esquema de formulario es contrato de la acción, no del modelo.

### `entities/store` (sede)
| Segmento | Sale de | Entra a |
|---|---|---|
| `model/` | `shared/types/map.ts` → `StoreLocation` | — |
| `data/` | `shared/components/map/mapConfig.ts` → `mainStore`, `center` | — |
| `lib/` | `features/location/useIsStoreOpen.ts` | — |
| `api/` | horario y dirección desde `companyData` (no se duplica) | — |

### `entities/window` (catálogo de sistemas)
| Segmento | Sale de | Entra a |
|---|---|---|
| `model/` | `features/presupuesto/config/pricing.ts` → `SystemType`, `GlassType`, `AluminumColor` | — |
| `data/` | catálogo de 6 sistemas y sus reglas (AGENTS.md §3) | — |

---

## 4. Decisiones de frontera

| # | Conflicto | Decisión propuesta | Elimina |
|---|---|---|---|
| D1 | `products` vs `tienda` | `products` baja a **entidad**. `tienda` es la **feature** (carrito, checkout, escaparate). | `tienda→products` (2 imports) |
| D2 | `location` vs `store` | `store` es **entidad** (sede, horario, coordenadas). `location` es **feature** (experiencia de mapa inmersivo). | — |
| D3 | `home ↔ location` | `useMapProjects` baja a `entities/project`; `StoreSection` sube a `widgets/StoreSection`. | ciclo completo |
| D4 | `admin → auth` | `AdminLayout` sube a `widgets/AdminLayout`. `auth` sigue siendo feature. | 2 imports |
| D5 | `admin → services` | `getServiceHref` y `getProjectHref` bajan a `entities/*/lib`. | 1 import |
| D6 | `ai-simulator → presupuesto` | `SystemType` y el catálogo bajan a `entities/window`. | 1 import |
| D7 | `Budget` en `ecommerce-schemas` | Se elimina si está muerto; si se usa, se fusiona con `entities/quote`. **Requiere verificación antes de borrar.** | duplicidad |
| D8 | `useLocationData` con doble suscripción | Al bajar `useProjects` a entidad, una sola fuente; el hook compone datos de dos entidades. | bug de rendimiento |

---

## 5. Regla de lint que se activa al terminar la fase 2

```
shared   → no importa features / widgets / screens / app
entities → no importa features / widgets / screens / app
features → no importa features / widgets / screens / app
widgets  → no importa screens / app
screens  → no importa screens / app
```

Hoy `features → features` está permitido porque no existe `entities`. Se activará como **error** al cerrar la fase 2, igual que ya ocurre con `shared` y `screens`.

---

## 6. Orden de migración (fase 2)

El orden no es arbitrario: primero lo que **menos** duele y más desbloquea.

| Lote | Entidad | Por qué en este orden | Riesgo |
|---|---|---|---|
| 2.1 | `project` | Desbloquea `home`, `location` y `admin`; cierra el ciclo | Bajo |
| 2.2 | `service` | Igual que project, sin estado | Bajo |
| 2.3 | `window` + `quote` | Solo tipos y utilidades puras; sin Firestore | Bajo |
| 2.4 | `client` | Mueve repositorio ya aislado | Medio (auth) |
| 2.5 | `store` | Datos estáticos y un hook | Bajo |
| 2.6 | `product` | Toca tienda pública y admin | **Alto** (dinero/inventario) |
| 2.7 | `order` | Toca ventas y reportes | **Alto** |

Cada lote termina con: `typecheck` + `lint` + `build`, un commit propio y sin tocar otro lote en el mismo commit.

---

## 7. Riesgos y criterios de aborto

- **Static export:** `publicRest.ts` lee servicios y proyectos en build-time. Si se mueve a entidades, rompe el orden de importación de Next. **Decisión: `publicRest` se queda en `shared/api`** (es transporte, no modelo).
- **Firestore rules / Functions:** no se tocan. El contrato de datos no cambia; solo cambia dónde vive el tipo.
- **Criterio de aborto:** si un lote obliga a cambiar un schema Zod que viaja al backend, se detiene y se consulta. Eso ya no sería un refactor de capas.
- **Import relativo:** el lint solo controla alias. Al mover, verificar con `grep` que no queden rutas relativas escapando de capa.

---

## 8. Decisiones que necesito del dueño

1. **`entities/window` vs `shared/constants`:** ¿el catálogo de 6 sistemas es una entidad de negocio (mi recomendación) o una constante global?
2. **Inconsistencia detectada:** `pricing.ts` define 6 SKUs (`ventana_nova`, `mampara_serie25`, `ducha_cristal`, `techo_policarbonato`, `ventana_acustica`, `ventana_pvc_abatible`) que **no coinciden** con los 6 sistemas de AGENTS.md (`Nova`, `Serie 25`, `Serie 35`, `Serie 62`, `Acústica`, `PVC abatible`). Falta Serie 35 y Serie 62; sobran ducha y techo como "sistemas". ¿Se corrige el catálogo o se mantiene el pricing como SKUs comerciales?
3. **`Budget`/`BudgetItem`:** ¿siguen en uso o son residuo? Se verificará antes de borrar, pero conviene saber si hay planes de usarlos.

---

## 9. Qué NO entra en esta fase

- No se mueve ningún archivo.
- No se cambia ningún schema que llegue al backend.
- No se toca `apps/functions`, `firebase.json` ni reglas.
- No se reescriben los componentes de UI: solo cambia su ubicación y sus imports.
