# Pendientes del proyecto

> Única lista viva de trabajo abierto. Consolida los antiguos `18_REPORTE_PLANES_PENDIENTES` y `19_CHECKLIST_EJECUCION_PENDIENTES` (borrados el 2026-11-08; recuperables con `git show 1537ee1:docs/19_CHECKLIST_EJECUCION_PENDIENTES.md`).
> Los planes en curso son `20_PLAN_TRABAJO_ANALISIS_FASES.md` (calidad y deuda) y `21_PLAN_FLUJO_PRESUPUESTO.md` (presupuesto). Aquí solo se listan los ítems abiertos y quién los resuelve.

## Seguridad (decisiones o acciones del dueño)

| Pendiente | Detalle | Origen |
|---|---|---|
| Rotar `RESEND_API_KEY` y `RECAPTCHA_SECRET_KEY` | Quedaron en `apps/functions/.env` y en una conversación | F1.9 / plan 20 (1.1) |
| Decidir `isAdmin()` en `firestore.rules` | Da admin a cualquier correo `@gyacompany.com` verificado; el frontend ya no lo hace (inconsistencia) | F2.1 |
| Confirmar admin en Firestore | La cuenta del responsable debe tener `users/{uid}.role = 'admin'` | F2.1 |
| Restringir por dominio la API key web de Firebase | `apps/web/src/shared/config/env.ts` (pública por diseño) | Cierre 2026-11-03 |
| Revisar el commit `f28b102` (`firebase.json`, congelado) | No fue reconocido | Cierre 2026-11-03 |
| Desplegar las reglas validadas en el emulador | `presupuestos_solicitados`, `contadores`, `users`, `clientes` (16/16 en emulador, **no desplegadas**) | Cierre 2026-11-03 |
| Endurecer `contadores` y `presupuestos_solicitados` | Escritura pública sin App Check; el contador admite huecos. Toca `firestore.rules` y `apps/functions/` | plan 20 (1.4) |

## Calidad y deuda técnica → plan 20
`xlsx` vulnerable, umbral de `pnpm audit`, `test:functions` y reglas en el CI, `100vh`/`10px`, `colorPalette` en componentes de admin y legal, slug "antiruido", `noindex` en rutas sin valor SEO, alinear la versión de `firebase`, galerías y modales duplicados. Detalle y estado en `docs/20_PLAN_TRABAJO_ANALISIS_FASES.md`.

## Catálogo de servicios, sistemas y productos (antes del design system y de los precios)

Modelo: la empresa compra a 4 proveedores (Corporación Corrales, HPD Glass, Eduhg, Favitem), ensambla en taller y vende e instala. Hoy no existe relación servicio ↔ sistema (`Service.systems` es texto libre en Firestore) y los nombres difieren entre sitio, cotizador y `AGENTS.md`. Oferta: 13 servicios, los 10 actuales + venta de espejos, frenos hidráulicos y mantenimiento. Decisiones D6, D7 y D8 en `docs/DESIGN-SYSTEM.md`.

| Fase | Contenido | Estado |
|---|---|---|
| C0 | Registrar el alcance real en `DESIGN-SYSTEM.md`, este archivo y el plan 21 | Hecha (2026-11-08) |
| C1 | Cierre de la extracción (`/home/user/github/proveedor_info`, guía en su `RESUMEN.md`): terminada, 46/46 catálogos con texto por OCR. La etiqueta `REVISAR` (`catalogos_ok = 0`) solo indica PDF sin capa de texto para comparar: las cifras no están verificadas automáticamente y los planos están en `imagenes/` | Hecha (2026-11-08) |
| C2 | Leer Firestore (`services`, solo lectura) y el código de servicios. `projects` no se leyó | Hecha (2026-11-08) |
| C3 | Análisis por proveedor → `docs/gya/catalogo/proveedores.md` | Hecha (2026-11-08) |
| C4 | `docs/gya/catalogo/CATALOGO.md` y **puerta de catálogo** (aprueba el usuario) | Propuesta lista; **falta aprobación** |

Preguntas abiertas para el dueño: `docs/gya/catalogo/CATALOGO.md` §6. `AGENTS.md` (6 sistemas, "no inventar Serie 20") se actualiza solo tras aprobar el catálogo.

## Design system → `docs/DESIGN-SYSTEM.md`
Fases 1 a 6 pendientes, con dos puertas de aprobación del usuario (manual y `/design-system`). Incluye la migración de `colorPalette`/`Badge`, hex, `rgba`, modales manuales, tipografía Source Serif 4 + Inter y la reconstrucción de `/design-system`. Decisiones abiertas en su §5.3.

## Presupuesto → plan 21
Listado "Mis presupuestos", hoja A4 con la marca, precios reales (incluye `Acústica` y `PVC abatible`), IGV y precio manual por partida, e2e y fixtures de los 4 casos reales. Detalle en `docs/21_PLAN_FLUJO_PRESUPUESTO.md`.

## Producto

| Pendiente | Detalle | Origen |
|---|---|---|
| Realidad aumentada (F6) | **Bloqueada:** faltan los modelos `.glb` y `.usdz` | F6 |
| Checkout con Cloud Function | Hoy el pedido solo se envía por WhatsApp (decisión tomada); migrar con reCAPTCHA más adelante | F4.5 |
| Optimización algorítmica (5 filas) | `FloatingPanel`, `ProjectCarousel`, `OrderDraftContext`, `PrototypeTimeline`, `ProjectDetail`. El detalle se perdió con el doc 17: `git show 1537ee1:docs/17_PLAN_OPTIMIZACION_ALGORITMICA_COMPLEJIDAD.md` | Plan 17 |

## Observabilidad

| Pendiente | Detalle | Origen |
|---|---|---|
| Sentry cliente (F7.4) | **Bloqueado:** falta cuenta/DSN | F7.4 |
| Sentry servidor y auditoría inmutable de reclamos (F7.5, F7.9) | **Bloqueado:** exige autorizar cambios en `apps/functions` | F7.5 / F7.9 |
| Confirmar en GCP alertas, uptime y BigQuery (F7.6–F7.8) | Archivos listos en `gcp/`; `validate-configs.mjs` solo prueba que son válidos, no que estén aplicados. Hace falta la salida de `gcloud` o confirmación de quien tiene el acceso | F7.6–F7.8 |

## Acciones externas del usuario

- Google Maps y NAP (F8.4).
- Prueba manual en navegador del diseño (F9.7) y del flujo `/presupuesto`.
- Reactivar el despliegue desde GitHub Actions: configurar `FIREBASE_SERVICE_ACCOUNT_GYA_APP_4C8A9` y los secretos `NEXT_PUBLIC_*` (lista en `.github/workflows/deploy-prod.yml`). Hasta entonces el despliegue es manual con `pnpm run deploy:hosting`.
- Deploy de hosting y de functions: solo cuando el usuario lo pida.

## Resuelto desde el último cierre
- El workflow `Deploy Production` fallaba por falta del secreto: ahora es `workflow_dispatch` manual (plan 20, fase 0).
- El QR de la hoja de presupuesto, que apuntaba a una ruta que no lo leía, se retiró (plan 21).
